import { Fragment, useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { formatear, suave } from './animacion.js'

// Aparece al entrar en pantalla.
export function Reveal({ children, as = 'div', delay = 0, y = 40, ...resto }) {
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: suave, delay }}
      {...resto}
    >
      {children}
    </M>
  )
}

// Título que sube palabra por palabra.
export function Titular({ texto, destacar, retraso = 0.3 }) {
  const palabras = texto.split(' ')
  return (
    <h1 className="titular" aria-label={texto}>
      {palabras.map((p, i) => (
        <Fragment key={i}>
          <span className="palabra" aria-hidden="true">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: suave, delay: retraso + i * 0.07 }}
            >
              {p === destacar ? <em>{p}</em> : p}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </h1>
  )
}

// Número que cuenta desde cero cuando se ve.
export function Contador({ valor }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!visto) return
    const control = animate(0, valor, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => control.stop()
  }, [visto, valor])
  return (
    <span ref={ref} aria-label={formatear(valor)}>
      <span aria-hidden="true">{formatear(n)}</span>
    </span>
  )
}

// Párrafo que se ilumina palabra por palabra mientras se hace scroll.
export function ParrafoScroll({ texto, className = 'parrafo-scroll' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const palabras = texto.split(' ')
  return (
    <p ref={ref} className={className}>
      {palabras.map((p, i) => (
        <Palabra key={i} progreso={scrollYProgress} rango={[i / palabras.length, (i + 1) / palabras.length]}>
          {p}
        </Palabra>
      ))}
    </p>
  )
}

function Palabra({ children, progreso, rango }) {
  const opacity = useTransform(progreso, rango, [0.16, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

// Inclina el contenido en 3D siguiendo el ratón, con un brillo que lo acompaña.
export function Tilt({ children, className = '', max = 8 }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const muelle = { stiffness: 180, damping: 18 }
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), muelle)
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), muelle)
  const gx = useTransform(x, (v) => v * 100)
  const gy = useTransform(y, (v) => v * 100)
  const brillo = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 55%)`

  const mover = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const salir = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={mover}
      onPointerLeave={salir}
    >
      {children}
      <motion.span className="tilt-brillo" style={{ background: brillo }} aria-hidden="true" />
    </motion.div>
  )
}

// Imagen que se descubre al entrar y se desplaza un poco con el scroll.
export function ImagenParallax({ src, alt, foco = '50% 50%' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  return (
    <motion.figure
      ref={ref}
      className="imagen-parallax"
      initial={{ clipPath: 'inset(14% 10% 14% 10% round 22px)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 22px)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.3, ease: suave }}
    >
      <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale: 1.16, objectPosition: foco }} />
    </motion.figure>
  )
}
