import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { cifrasClave, glosario, infografia, lineas, medios, proyecto, texto } from './data.js'
import { Contador, ImagenParallax, ParrafoScroll, Reveal, Tilt, Titular } from './components/efectos.jsx'
import { suave } from './components/animacion.js'
import { Icono } from './components/Icono.jsx'

const Hero3D = lazy(() => import('./components/Hero3D.jsx'))

const navegacion = [
  ['podcast', 'Podcast'],
  ['entrevista', 'Entrevista'],
  ['interactivo', 'Interactivo'],
  ['infografia', 'Infografía'],
  ['texto', 'Texto'],
  ['glosario', 'Glosario'],
]

const formatos = [
  ...medios.map((m) => ({ id: m.id, formato: m.formato, titulo: m.titulo, icono: m.icono })),
  { id: 'infografia', formato: 'Infografía', titulo: infografia.titulo, icono: 'grafica' },
  { id: 'texto', formato: 'Texto informativo', titulo: texto.titulo, icono: 'texto' },
]

// Si el navegador no soporta WebGL, la portada se queda sin la escena 3D.
class SinErrores extends Component {
  state = { fallo: false }
  static getDerivedStateFromError() {
    return { fallo: true }
  }
  render() {
    return this.state.fallo ? null : this.props.children
  }
}

function Encabezado() {
  const [abierto, setAbierto] = useState(false)
  const [solido, setSolido] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useMotionValueEvent(scrollY, 'change', (y) => setSolido(y > 40))

  return (
    <header className={solido || abierto ? 'barra solida' : 'barra'}>
      <a href="#inicio" className="marca" onClick={() => setAbierto(false)}>
        <img src="/favicon.svg" alt="" width="30" height="30" />
        <span>La infancia también es Bogotá</span>
      </a>
      <button
        className="menu-boton"
        aria-expanded={abierto}
        aria-controls="menu"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setAbierto(!abierto)}
      >
        <span />
        <span />
      </button>
      <nav id="menu" className={abierto ? 'menu abierto' : 'menu'}>
        {navegacion.map(([id, nombre]) => (
          <a key={id} href={`#${id}`} onClick={() => setAbierto(false)}>
            {nombre}
          </a>
        ))}
      </nav>
      <motion.div className="progreso" style={{ scaleX: progreso }} />
    </header>
  )
}

function Portada() {
  const aparecer = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: suave, delay },
  })
  return (
    <section id="inicio" className="portada">
      <SinErrores>
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </SinErrores>
      <div className="portada-velo" />
      <div className="portada-contenido contenedor">
        <motion.p className="antetitulo" {...aparecer(0.1)}>
          Proyecto transmedia · Bogotá D.C.
        </motion.p>
        <Titular texto={proyecto.titulo} destacar="jugar" />
        <motion.p className="slogan" {...aparecer(0.9)}>
          {proyecto.slogan}
        </motion.p>
        <motion.div className="portada-acciones" {...aparecer(1.1)}>
          <a className="boton" href="#formatos">
            Explorar el proyecto
          </a>
          <a className="boton fantasma" href="#podcast">
            <Icono nombre="microfono" tamano={18} /> Escuchar el podcast
          </a>
        </motion.div>
        <motion.p className="portada-nota" {...aparecer(1.4)}>
          <span className="punto" />
          <span>
            Cada punto de luz es uno de los <strong>13.228</strong> casos registrados en Bogotá entre enero y junio de
            2026.
          </span>
        </motion.p>
      </div>
      <a href="#problematica" className="indicador" aria-label="Bajar a la problemática">
        <span />
      </a>
    </section>
  )
}

function Cinta({ texto }) {
  const grupo = (
    <div className="cinta-grupo">
      {[0, 1, 2].map((i) => (
        <span key={i}>
          {texto}
          <i>✦</i>
        </span>
      ))}
    </div>
  )
  return (
    <div className="cinta" aria-hidden="true">
      <div className="cinta-pista">
        {grupo}
        {grupo}
      </div>
    </div>
  )
}

function Problematica() {
  return (
    <section id="problematica" className="problematica">
      <div className="contenedor">
        <Reveal as="span" className="etiqueta">
          La problemática
        </Reveal>
        <ParrafoScroll texto={proyecto.problematica} />
      </div>
      <div className="contenedor cifras-clave">
        {cifrasClave.map((c, i) => (
          <Reveal key={c.valor} className="cifra-clave" delay={i * 0.1}>
            <strong>
              <Contador valor={c.valor} />
            </strong>
            <span>{c.etiqueta}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Formatos() {
  return (
    <section id="formatos" className="formatos">
      <div className="contenedor">
        <Reveal as="span" className="etiqueta">
          El proyecto
        </Reveal>
        <Reveal as="h2" delay={0.05}>
          Cinco formas de contar <em>una misma realidad</em>
        </Reveal>
        <div className="formatos-rejilla">
          {formatos.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.08}>
              <Tilt className="formato-tarjeta">
                <a href={`#${f.id}`}>
                  <span className="formato-icono">
                    <Icono nombre={f.icono} tamano={22} />
                  </span>
                  <span className="formato-numero">{String(i + 1).padStart(2, '0')}</span>
                  <span className="etiqueta">{f.formato}</span>
                  <span className="formato-titulo">{f.titulo}</span>
                  <span className="formato-flecha">
                    <Icono nombre="flecha" tamano={18} />
                  </span>
                </a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Muestra la miniatura y solo carga el reproductor de YouTube al hacer clic.
function Video({ id, titulo, formato }) {
  const [activo, setActivo] = useState(false)
  if (activo) {
    return (
      <div className="video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <button className="video miniatura" onClick={() => setActivo(true)} aria-label={`Reproducir: ${titulo}`}>
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
      <span className="play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="30" height="30">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </span>
      <span className="video-rotulo">Reproducir · {formato}</span>
    </button>
  )
}

function Capitulo({ medio, indice }) {
  const [verPreguntas, setVerPreguntas] = useState(false)
  return (
    <section id={medio.id} className={indice % 2 ? 'capitulo invertido' : 'capitulo'}>
      <div className="contenedor">
        <div className="capitulo-cabecera">
          <Reveal className="capitulo-numero" aria-hidden="true">
            {String(indice + 1).padStart(2, '0')}
          </Reveal>
          <div>
            <Reveal as="span" className="etiqueta">
              <Icono nombre={medio.icono} tamano={16} /> {medio.formato}
            </Reveal>
            <Reveal as="h2" delay={0.08}>
              {medio.titulo}
            </Reveal>
          </div>
        </div>

        <div className="capitulo-cuerpo">
          <Reveal y={60}>
            <Tilt className="marco-video" max={5}>
              <Video id={medio.youtube} titulo={medio.titulo} formato={medio.formato} />
            </Tilt>
            <a className="enlace-yt" href={`https://youtu.be/${medio.youtube}`} target="_blank" rel="noreferrer">
              Ver en YouTube <Icono nombre="flecha" tamano={16} />
            </a>
          </Reveal>
          <dl className="ws">
            {Object.entries(medio.w).map(([pregunta, respuesta], i) => (
              <Reveal key={pregunta} delay={0.1 + i * 0.08} y={30}>
                <dt>{pregunta}</dt>
                <dd>{respuesta}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {medio.preguntas && (
          <Reveal className="guion">
            <button className="guion-boton" aria-expanded={verPreguntas} onClick={() => setVerPreguntas(!verPreguntas)}>
              <span>
                <span className="etiqueta">Guion periodístico</span>
                Las {medio.preguntas.length} preguntas de la entrevista
              </span>
              <motion.span className="guion-icono" animate={{ rotate: verPreguntas ? 45 : 0 }}>
                <Icono nombre="mas" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {verPreguntas && (
                <motion.ol
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: suave }}
                >
                  {medio.preguntas.map((p, i) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, ease: suave }}
                    >
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      {p}
                    </motion.li>
                  ))}
                </motion.ol>
              )}
            </AnimatePresence>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function Infografia() {
  const dialogo = useRef(null)
  useEffect(() => {
    const d = dialogo.current
    const cerrarFuera = (e) => e.target === d && d.close()
    d.addEventListener('click', cerrarFuera)
    return () => d.removeEventListener('click', cerrarFuera)
  }, [])
  return (
    <section id="infografia" className="infografia">
      <div className="contenedor infografia-rejilla">
        <div>
          <Reveal as="span" className="etiqueta">
            <Icono nombre="grafica" tamano={16} /> 04 · Infografía
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            {infografia.titulo}
          </Reveal>
          <Reveal as="p" delay={0.1}>
            {infografia.descripcion}
          </Reveal>
          <Reveal delay={0.15}>
            <button className="boton" onClick={() => dialogo.current.showModal()}>
              <Icono nombre="ampliar" tamano={18} /> Ver en grande
            </button>
          </Reveal>
        </div>
        <Reveal y={80}>
          <Tilt className="marco-infografia" max={6}>
            <button onClick={() => dialogo.current.showModal()} aria-label="Ampliar infografía">
              <img
                src="/img/infografia.webp"
                alt="Infografía: delitos contra niños, niñas y adolescentes en Bogotá D.C."
                loading="lazy"
              />
            </button>
          </Tilt>
        </Reveal>
      </div>
      <dialog ref={dialogo} className="visor" data-lenis-prevent>
        <button className="cerrar" onClick={() => dialogo.current.close()}>
          Cerrar ✕
        </button>
        <img src="/img/infografia.webp" alt="Infografía ampliada" />
      </dialog>
    </section>
  )
}

function Texto() {
  return (
    <section id="texto" className="texto">
      <header className="contenedor texto-cabecera">
        <Reveal as="span" className="etiqueta">
          <Icono nombre="texto" tamano={16} /> 05 · Texto informativo
        </Reveal>
        <Reveal as="h2" delay={0.05}>
          {texto.titulo}
        </Reveal>
        <Reveal as="p" className="entradilla" delay={0.1}>
          {texto.entradilla}
        </Reveal>
      </header>

      <div className="contenedor">
        {texto.bloques.map((b) => (
          <article key={b.cifra} className="bloque">
            <div className="bloque-cifra">
              <strong>
                <Contador valor={b.cifra} />
              </strong>
              <span>{b.etiqueta}</span>
            </div>
            <div className="bloque-texto">
              {b.imagen && <ImagenParallax {...b.imagen} />}
              {b.parrafos.map((p, i) => (
                <Reveal as="p" key={i} y={24}>
                  {p}
                </Reveal>
              ))}
            </div>
          </article>
        ))}

        <article className="cierre">
          <ImagenParallax {...texto.cierre.imagen} />
          {texto.cierre.parrafos.map((p, i) => (
            <Reveal as="p" key={i} y={24}>
              {p}
            </Reveal>
          ))}
        </article>
      </div>

      <div className="remate">
        <div className="contenedor">
          <ParrafoScroll texto={texto.cierre.remate} className="parrafo-scroll grande" />
        </div>
      </div>
    </section>
  )
}

function Tarjeta({ palabra, significado, indice }) {
  const [volteada, setVolteada] = useState(false)
  return (
    <Reveal delay={(indice % 4) * 0.07}>
      <button className={volteada ? 'tarjeta volteada' : 'tarjeta'} onClick={() => setVolteada(!volteada)}>
        <span className="tarjeta-interior">
          <span className="cara frente">
            <span className="tarjeta-numero">{String(indice + 1).padStart(2, '0')}</span>
            <strong>{palabra}</strong>
            <small>Toca para ver el significado</small>
          </span>
          <span className="cara reverso">
            <strong>{palabra}</strong>
            {significado}
          </span>
        </span>
      </button>
    </Reveal>
  )
}

function Glosario() {
  return (
    <section id="glosario" className="glosario">
      <div className="contenedor">
        <Reveal as="span" className="etiqueta">
          Glosario
        </Reveal>
        <Reveal as="h2" delay={0.05}>
          Palabras para <em>entender</em>
        </Reveal>
        <div className="glosario-rejilla">
          {glosario.map(([palabra, significado], i) => (
            <Tarjeta key={palabra} palabra={palabra} significado={significado} indice={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor">
        <Reveal as="span" className="etiqueta">
          Rutas de atención
        </Reveal>
        <Reveal as="h2" delay={0.05}>
          Si sabes de un caso, <em>denuncia</em>
        </Reveal>
        <Reveal as="p" delay={0.1} className="pie-intro">
          Actuar a tiempo puede cambiar la vida de un niño, niña o adolescente. Todas estas líneas son gratuitas.
        </Reveal>
        <ul className="lineas">
          {lineas.map(([numero, descripcion], i) => (
            <Reveal as="li" key={numero} delay={i * 0.08}>
              <a href={`tel:${numero}`}>
                <span className="lineas-icono">
                  <Icono nombre="telefono" tamano={18} />
                </span>
                <strong>{numero}</strong>
                <span>{descripcion}</span>
              </a>
            </Reveal>
          ))}
        </ul>
        <div className="firma">
          <p>
            <strong>{proyecto.titulo}</strong> · Proyecto transmedia sobre los delitos contra niños, niñas y
            adolescentes en Bogotá. Las historias del texto informativo son ficticias y representan situaciones que
            podrían estar detrás de las cifras.
          </p>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 } })
    return () => lenis.destroy()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Encabezado />
      <main>
        <Portada />
        <Cinta texto={proyecto.slogan} />
        <Problematica />
        <Formatos />
        {medios.map((m, i) => (
          <Capitulo key={m.id} medio={m} indice={i} />
        ))}
        <Infografia />
        <Texto />
        <Glosario />
      </main>
      <Pie />
    </MotionConfig>
  )
}
