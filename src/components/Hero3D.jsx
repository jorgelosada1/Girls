import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

// Un punto de luz por cada caso registrado entre enero y junio de 2026.
const CASOS = 13228
const PALETA = ['#c9b27c', '#a9b98a', '#7f9bc9', '#e8e2d0', '#c9b27c'].map((c) => new THREE.Color(c))

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDispersion;
  uniform float uPixelRatio;
  attribute float aSemilla;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlfa;

  void main() {
    vec3 p = position;
    float t = uTime * 0.25 + aSemilla * 6.2831;
    p += 0.07 * vec3(sin(t * 1.3), cos(t * 1.1), sin(t * 0.9));
    p *= 1.0 + uDispersion * (0.5 + aSemilla * 1.8);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.6 + aSemilla * 4.5) * uPixelRatio * (7.0 / -mv.z);

    float brillo = 0.65 + 0.35 * sin(uTime * (0.5 + aSemilla * 1.6) + aSemilla * 40.0);
    vColor = aColor;
    vAlfa = brillo * (1.0 - uDispersion * 0.75);
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlfa;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * a * vAlfa);
  }
`

function crearGeometria() {
  const posiciones = new Float32Array(CASOS * 3)
  const colores = new Float32Array(CASOS * 3)
  const semillas = new Float32Array(CASOS)
  const angulo = Math.PI * (3 - Math.sqrt(5))
  const enEsfera = Math.floor(CASOS * 0.78)
  const inclinacion = 0.42
  for (let i = 0; i < CASOS; i++) {
    let x, y, z
    if (i < enEsfera) {
      // Esfera de Fibonacci con una capa fina, para que se lea como un globo.
      const h = 1 - (i / (enEsfera - 1)) * 2
      const r = Math.sqrt(1 - h * h)
      const theta = angulo * i
      const radio = 2.1 * (0.97 + Math.random() * 0.06)
      x = Math.cos(theta) * r * radio
      y = h * radio
      z = Math.sin(theta) * r * radio
    } else {
      // Anillo inclinado de polvo alrededor del globo.
      const theta = Math.random() * Math.PI * 2
      const radio = 2.7 + Math.pow(Math.random(), 1.5) * 1.6
      const rx = Math.cos(theta) * radio
      const ry = (Math.random() - 0.5) * 0.12
      const rz = Math.sin(theta) * radio
      x = rx
      y = ry * Math.cos(inclinacion) - rz * Math.sin(inclinacion)
      z = ry * Math.sin(inclinacion) + rz * Math.cos(inclinacion)
    }
    posiciones.set([x, y, z], i * 3)
    const color = PALETA[Math.floor(Math.random() * PALETA.length)]
    colores.set([color.r, color.g, color.b], i * 3)
    semillas[i] = Math.random()
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(posiciones, 3))
  g.setAttribute('aColor', new THREE.BufferAttribute(colores, 3))
  g.setAttribute('aSemilla', new THREE.BufferAttribute(semillas, 1))
  return g
}

function Nube({ quieta }) {
  const grupo = useRef(null)
  const inclinacion = useRef(null)
  const { viewport, gl } = useThree()

  const geometria = useMemo(() => crearGeometria(), [])
  const material = useRef(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDispersion: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
    }),
    [gl],
  )

  useEffect(() => () => geometria.dispose(), [geometria])

  useFrame((state, delta) => {
    const dispersion = Math.min(window.scrollY / window.innerHeight, 1)
    const u = material.current.uniforms
    u.uTime.value = quieta ? 0 : state.clock.elapsedTime
    u.uDispersion.value = THREE.MathUtils.lerp(u.uDispersion.value, dispersion, 0.1)
    if (!quieta) grupo.current.rotation.y += delta * 0.045
    inclinacion.current.rotation.x = THREE.MathUtils.lerp(inclinacion.current.rotation.x, -state.pointer.y * 0.25, 0.04)
    inclinacion.current.rotation.z = THREE.MathUtils.lerp(inclinacion.current.rotation.z, state.pointer.x * 0.12, 0.04)
  })

  const ancho = viewport.width > 7
  return (
    <group ref={inclinacion} position={[ancho ? viewport.width * 0.2 : 0, ancho ? 0 : 0.6, 0]} scale={ancho ? 1 : 0.72}>
      <points ref={grupo} geometry={geometria}>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function Hero3D() {
  const contenedor = useRef(null)
  const [visible, setVisible] = useState(true)
  const quieta = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  // Deja de dibujar cuando la portada sale de pantalla.
  useEffect(() => {
    const observador = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    observador.observe(contenedor.current)
    return () => observador.disconnect()
  }, [])

  return (
    <div ref={contenedor} className="portada-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
      >
        <Nube quieta={quieta} />
      </Canvas>
    </div>
  )
}
