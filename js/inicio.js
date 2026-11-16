import {
  db, doc, getDoc, setDoc, getDocs, collection, query, where, serverTimestamp,
  entrar, salir, alCambiarSesion, esDocente, h, nota, fmtNota, aviso, leerConfig,
} from "./base.js";
import { CURSO, CLASES, maxPuntosClase, maxPuntosCurso } from "./contenido.js";
import { adornos } from "./decor.js";
import { arbol, cuentaRegresiva } from "./escena.js";

const app = document.getElementById("app");
const nav = document.getElementById("nav");

function pintarNav(user) {
  nav.replaceChildren(
    ...(user
      ? [
          esDocente(user) ? h("a", { href: "docente.html", class: "btn sec" }, "Panel docente") : null,
          h("span", { class: "usuario" }, user.displayName || user.email),
          h("button", { class: "btn sec", onclick: salir }, "Salir"),
        ].filter(Boolean)
      : []),
  );
}

function portada() {
  app.replaceChildren(
    h("section", { class: "portada" },
      adornos(["Weber", "Arendt", "Foucault", "Lukes", "Bourdieu", "Agamben", "Han"]),
      h("div", { class: "arbol-portada", html: arbol() }),
      h("div", { class: "portada-texto" },
        h("p", { class: "manuscrito" }, "edición de fin de año"),
        h("h1", {}, "El poder", h("br"), h("span", {}, "en la filosofía política")),
        h("p", { class: "bajada" },
          "Diez puertas para abrir antes de las vacaciones. Detrás de cada una hay una lectura, juegos y desafíos para pensar quién manda, por qué obedecemos y cómo el poder se cuela en la sala de clases, en las redes y hasta en el celular."),
        h("button", {
          class: "btn grande",
          onclick: async () => { try { await entrar(); } catch (e) { aviso(e.message, "error"); } },
        }, "Entrar con Google"),
        CURSO.gifPortada ? h("img", { class: "gif-portada", src: CURSO.gifPortada, alt: "" }) : null,
      ),
    ),
  );
}

function formularioPerfil(user) {
  const nombre = h("input", { required: true, value: user.displayName || "", placeholder: "Nombre y apellido" });
  const seccion = h("input", { required: true, placeholder: "Ej: 3°A" });
  const form = h("form", { class: "postal perfil" },
    h("p", { class: "manuscrito" }, "¡bienvenido/a!"),
    h("h2", {}, "Antes de empezar"),
    h("p", {}, "Cuéntanos quién eres. Solo se pide una vez."),
    h("label", {}, "Nombre completo", nombre),
    h("label", {}, "Curso / sección", seccion),
    h("button", { class: "btn", type: "submit" }, "Listo, a las clases →"),
  );
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    await setDoc(doc(db, "estudiantes", user.uid), {
      nombre: nombre.value.trim(), seccion: seccion.value.trim(), email: user.email, actualizado: serverTimestamp(),
    });
    mostrar(user);
  });
  app.replaceChildren(form);
}

function puerta(c, i, { abierta, entregada, cal }) {
  let estado = "cerrada", texto = "Se abre pronto";
  if (abierta) { estado = "disponible"; texto = "¡Abierta! Entra →"; }
  if (entregada) { estado = "entregada"; texto = "Entregada · en corrección"; }
  if (cal) { estado = "corregida"; texto = `${cal.puntos}/${cal.max} pts`; }

  const interior = h("div", { class: "interior" },
    h("span", { class: "autor" }, c.autor),
    h("strong", { class: "titulo" }, c.titulo),
    h("span", { class: "estado" }, texto),
    cal ? h("span", { class: "sello" }, fmtNota(nota(cal.puntos, cal.max))) : null);
  const hoja = h("div", { class: "hoja" },
    h("span", { class: "numero" }, String(c.numero)),
    estado === "cerrada" ? h("span", { class: "candado" }, "🔒") : null,
    estado === "corregida" ? h("span", { class: "estrella" }, "★") : null);
  const cuerpo = [interior, hoja];
  // En pantallas táctiles: el primer toque abre la puerta y el segundo entra.
  const tocar = (ev) => {
    if (!matchMedia("(hover: none)").matches) return;
    const li = ev.currentTarget.parentElement;
    if (!li.classList.contains("tocada")) {
      ev.preventDefault();
      document.querySelectorAll(".puerta.tocada").forEach((p) => p.classList.remove("tocada"));
      li.classList.add("tocada");
    }
  };
  return h("li", { class: `puerta ${estado}`, style: `--i:${i}` },
    abierta ? h("a", { href: `clase.html?id=${c.id}`, onclick: tocar, "aria-label": `Clase ${c.numero}: ${c.titulo}. ${texto}` }, cuerpo)
      : h("div", { tabindex: 0, "aria-label": `Clase ${c.numero}: ${c.titulo}. Cerrada` }, cuerpo));
}

async function mostrar(user) {
  app.replaceChildren(h("p", { class: "cargando" }, "Abriendo el calendario…"));
  const docente = esDocente(user);
  const perfil = docente ? null : await getDoc(doc(db, "estudiantes", user.uid));
  if (!docente && !perfil.exists()) return formularioPerfil(user);

  const config = await leerConfig();
  const abiertas = new Set(config.clasesAbiertas || []);
  const entregadas = new Set();
  const califs = {};
  if (!docente) {
    const [e, c] = await Promise.all([
      getDocs(query(collection(db, "entregas"), where("uid", "==", user.uid))),
      getDocs(query(collection(db, "calificaciones"), where("uid", "==", user.uid))),
    ]);
    e.forEach((d) => entregadas.add(d.data().claseId));
    c.forEach((d) => (califs[d.data().claseId] = d.data()));
  }

  const corregidas = Object.values(califs);
  const pts = corregidas.reduce((s, c) => s + c.puntos, 0);
  const maxCorr = corregidas.reduce((s, c) => s + c.max, 0);
  const maxTotal = maxPuntosCurso();
  const pct = Math.round((pts / maxTotal) * 100);

  const resumen = docente
    ? h("div", { class: "postal" },
        h("p", {}, "Modo docente: puedes abrir todas las puertas, aunque estén cerradas para los estudiantes."),
        h("a", { class: "btn", href: "docente.html" }, "Ir al panel docente"))
    : h("section", { class: "marcador" },
        h("div", { class: "progreso" },
          h("p", { class: "manuscrito" }, "tu camino hasta el 7,0"),
          h("div", { class: "baston", role: "progressbar", "aria-valuenow": pts, "aria-valuemax": maxTotal },
            h("div", { class: "relleno", style: `--p:${pct}%` }, h("span", { class: "trineo" }, "★"))),
          h("p", { class: "cifras" }, h("strong", {}, String(pts)), ` de ${maxTotal} puntos del curso`)),
        h("div", { class: "esfera" }, h("span", {}, "Nota parcial"), h("strong", {}, fmtNota(maxCorr ? nota(pts, maxCorr) : null)),
          h("small", {}, "en lo corregido")),
        h("div", { class: "esfera roja" }, h("span", {}, "Nota final"), h("strong", {}, fmtNota(nota(pts, maxTotal))),
          h("small", {}, "va subiendo")),
      );

  const calendario = h("ol", { class: "calendario" },
    CLASES.map((c, i) => puerta(c, i, {
      abierta: docente || abiertas.has(c.id), entregada: entregadas.has(c.id), cal: califs[c.id],
    })));

  app.replaceChildren(
    h("header", { class: "saludo" },
      h("div", {},
        h("p", { class: "manuscrito" }, docente ? "calendario del curso" : "¡hola!"),
        h("h1", {}, docente ? "Las diez puertas" : perfil.data().nombre.split(" ")[0]),
        cuentaRegresiva() ? h("p", { class: "cuenta-grande" }, cuentaRegresiva()) : null),
      h("div", { class: "arbol-saludo", html: arbol() })),
    resumen,
    h("h2", { class: "titulo-seccion" }, "Calendario de clases"),
    h("p", { class: "tenue" }, "Pasa el cursor (o toca) una puerta para abrirla. Las que tienen candado se abren cuando el profe lo decida."),
    calendario,
  );
}

alCambiarSesion((user) => {
  pintarNav(user);
  if (user) mostrar(user).catch((e) => { console.error(e); aviso("Error al cargar: " + e.message, "error"); });
  else portada();
});
