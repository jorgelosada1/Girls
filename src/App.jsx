import { useEffect, useRef, useState } from 'react'
import { proyecto, medios, infografia, texto, glosario, lineas } from './data.js'

const navegacion = [
  ['podcast', 'Podcast'],
  ['entrevista', 'Entrevista'],
  ['interactivo', 'Interactivo'],
  ['infografia', 'Infografía'],
  ['texto', 'Texto'],
  ['glosario', 'Glosario'],
]

function Encabezado() {
  const [abierto, setAbierto] = useState(false)
  return (
    <header className="barra">
      <a href="#inicio" className="marca" onClick={() => setAbierto(false)}>
        <img src="/favicon.svg" alt="" width="28" height="28" />
        <span>La infancia también es Bogotá</span>
      </a>
      <button
        className="menu-boton"
        aria-expanded={abierto}
        aria-controls="menu"
        onClick={() => setAbierto(!abierto)}
      >
        {abierto ? 'Cerrar' : 'Menú'}
      </button>
      <nav id="menu" className={abierto ? 'menu abierto' : 'menu'}>
        {navegacion.map(([id, nombre]) => (
          <a key={id} href={`#${id}`} onClick={() => setAbierto(false)}>
            {nombre}
          </a>
        ))}
      </nav>
    </header>
  )
}

function Portada() {
  return (
    <section id="inicio" className="portada">
      <div className="portada-contenido">
        <p className="antetitulo">Proyecto transmedia · Delitos contra niños, niñas y adolescentes en Bogotá</p>
        <h1>{proyecto.titulo}</h1>
        <p className="slogan">{proyecto.slogan}</p>
        <div className="portada-acciones">
          <a className="boton" href="#podcast">Ver los medios</a>
          <a className="boton secundario" href="#texto">Leer la historia</a>
        </div>
      </div>
      <figure className="portada-figura">
        <img src="/img/cierre.jpg" alt="" />
      </figure>
    </section>
  )
}

function Problematica() {
  return (
    <section className="problematica">
      <div className="contenedor estrecho">
        <h2>La problemática</h2>
        <p>{proyecto.problematica}</p>
      </div>
      <ul className="indice contenedor">
        {medios.map((m) => (
          <li key={m.id}>
            <a href={`#${m.id}`}>
              <span className="etiqueta">{m.formato}</span>
              <span>{m.titulo}</span>
            </a>
          </li>
        ))}
        <li>
          <a href="#infografia">
            <span className="etiqueta">Infografía</span>
            <span>{infografia.titulo}</span>
          </a>
        </li>
        <li>
          <a href="#texto">
            <span className="etiqueta">Texto informativo</span>
            <span>{texto.titulo}</span>
          </a>
        </li>
      </ul>
    </section>
  )
}

// Muestra la miniatura y solo carga el reproductor de YouTube al hacer clic.
function Video({ id, titulo }) {
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
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </span>
    </button>
  )
}

function Medio({ medio, indice }) {
  const [verPreguntas, setVerPreguntas] = useState(false)
  return (
    <section id={medio.id} className={indice % 2 ? 'medio alterno' : 'medio'}>
      <div className="contenedor">
        <header className="medio-cabecera">
          <span className="etiqueta">
            {String(indice + 1).padStart(2, '0')} · {medio.formato}
          </span>
          <h2>{medio.titulo}</h2>
        </header>
        <div className="medio-cuerpo">
          <div>
            <Video id={medio.youtube} titulo={medio.titulo} />
            <a className="enlace-yt" href={`https://youtu.be/${medio.youtube}`} target="_blank" rel="noreferrer">
              Ver en YouTube ↗
            </a>
          </div>
          <dl className="ws">
            {Object.entries(medio.w).map(([pregunta, respuesta]) => (
              <div key={pregunta}>
                <dt>{pregunta}</dt>
                <dd>{respuesta}</dd>
              </div>
            ))}
          </dl>
        </div>
        {medio.preguntas && (
          <div className="guion">
            <button className="desplegar" aria-expanded={verPreguntas} onClick={() => setVerPreguntas(!verPreguntas)}>
              {verPreguntas ? 'Ocultar' : 'Ver'} las preguntas de la entrevista
            </button>
            {verPreguntas && (
              <ol>
                {medio.preguntas.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            )}
          </div>
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
    <section id="infografia" className="medio infografia">
      <div className="contenedor">
        <header className="medio-cabecera">
          <span className="etiqueta">04 · Infografía</span>
          <h2>{infografia.titulo}</h2>
          <p>{infografia.descripcion}</p>
        </header>
        <button className="infografia-boton" onClick={() => dialogo.current.showModal()} aria-label="Ampliar infografía">
          <img src="/img/infografia.webp" alt="Infografía: delitos contra niños, niñas y adolescentes en Bogotá D.C." loading="lazy" />
          <span className="ampliar">Ampliar</span>
        </button>
      </div>
      <dialog ref={dialogo} className="visor">
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
      <article className="contenedor estrecho">
        <span className="etiqueta">05 · Texto informativo</span>
        <h2>{texto.titulo}</h2>
        <p className="entradilla">{texto.entradilla}</p>
        {texto.bloques.map((b) => (
          <div key={b.cifra} className="bloque">
            <p className="cifra">
              <strong>{b.cifra}</strong>
              <span>{b.etiqueta}</span>
            </p>
            {b.imagen && (
              <figure>
                <img src={b.imagen.src} alt={b.imagen.alt} loading="lazy" />
              </figure>
            )}
            {b.parrafos.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        ))}
        <div className="bloque">
          <figure>
            <img src={texto.cierre.imagen.src} alt={texto.cierre.imagen.alt} loading="lazy" />
          </figure>
          {texto.cierre.parrafos.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <blockquote>{texto.cierre.remate}</blockquote>
      </article>
    </section>
  )
}

function Glosario() {
  return (
    <section id="glosario" className="glosario">
      <div className="contenedor">
        <h2>Glosario</h2>
        <dl>
          {glosario.map(([palabra, significado]) => (
            <div key={palabra}>
              <dt>{palabra}</dt>
              <dd>{significado}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor">
        <h2>Si sabes de un caso, denuncia</h2>
        <p>Actuar a tiempo puede cambiar la vida de un niño, niña o adolescente. Todas estas líneas son gratuitas.</p>
        <ul className="lineas">
          {lineas.map(([numero, descripcion]) => (
            <li key={numero}>
              <a href={`tel:${numero}`}>{numero}</a>
              <span>{descripcion}</span>
            </li>
          ))}
        </ul>
        <p className="firma">
          {proyecto.titulo} · Proyecto transmedia sobre los delitos contra niños, niñas y adolescentes en Bogotá.
          Las historias del texto informativo son ficticias y representan situaciones que podrían estar detrás de las cifras.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Encabezado />
      <main>
        <Portada />
        <Problematica />
        {medios.map((m, i) => (
          <Medio key={m.id} medio={m} indice={i} />
        ))}
        <Infografia />
        <Texto />
        <Glosario />
      </main>
      <Pie />
    </>
  )
}
