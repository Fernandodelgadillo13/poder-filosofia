import {
  db, doc, getDoc, setDoc, serverTimestamp, alCambiarSesion, esDocente, h, nota, fmtNota, aviso,
  leerConfig, idEntrega, ordenOpciones, contarPalabras,
} from "./base.js";
import { claseById, maxPuntosClase, RUBRICA_ABIERTA } from "./contenido.js";
import { crearJuego, vistaJuego, memorice, confeti } from "./juegos.js";
import "./decor.js";

const app = document.getElementById("app");
const claseId = new URLSearchParams(location.search).get("id");
const clase = claseById(claseId);
const ETIQUETA = { seleccion: "Pregunta", clasificar: "Juego", emparejar: "Juego", ordenar: "Juego", abierta: "Desafío escrito" };

function cabecera(user) {
  return [
    h("header", { class: "cabecera-clase" },
      h("div", { class: "esfera-num" }, h("span", {}, String(clase.numero))),
      h("div", {},
        h("p", { class: "manuscrito" }, clase.autor),
        h("h1", {}, clase.titulo)),
      clase.gif ? h("img", { class: "gif-clase", src: clase.gif, alt: "" }) : null),
    h("p", { class: "objetivo" }, h("strong", {}, "Para qué: "), clase.objetivo),
    h("article", { class: "texto" }, clase.texto.map((p) => h("p", {}, p))),
    h("aside", { class: "etiqueta-regalo" },
      h("span", { class: "ojal" }),
      h("p", { class: "manuscrito" }, "para leer"),
      h("p", {}, clase.lectura.referencia),
      h("p", { class: "indicacion" }, clase.lectura.indicacion)),
    clase.memorice?.length ? memorice(clase.memorice, user.uid + clase.id + "memo") : null,
    h("h2", { class: "titulo-seccion" }, "Desafíos ", h("span", { class: "pildora" }, `${maxPuntosClase(clase)} puntos`)),
  ];
}

function rubrica() {
  return h("details", { class: "rubrica" },
    h("summary", {}, "Ver rúbrica"),
    h("ul", {}, RUBRICA_ABIERTA.map((r) => h("li", {}, h("strong", {}, r.nivel + ": "), r.desc))));
}

function formulario(user, modoPrueba) {
  const claveBorrador = `borrador_${user.uid}_${clase.id}`;
  let borrador = {};
  try { borrador = JSON.parse(localStorage.getItem(claveBorrador) || "{}"); } catch {}

  const juegos = {};
  const form = h("form", { class: "desafios" });
  const barra = h("div", { class: "relleno" });
  const textoBarra = h("span", {});
  const progreso = h("div", { class: "progreso-fijo" }, h("div", { class: "baston mini" }, barra), textoBarra);

  const listos = () => clase.desafios.filter((d) => {
    const v = leer()[d.id];
    if (d.tipo === "seleccion") return v != null;
    if (d.tipo === "abierta") return contarPalabras(v) >= d.minPalabras;
    return juegos[d.id].completo();
  }).length;
  const actualizar = () => {
    try { localStorage.setItem(claveBorrador, JSON.stringify(leer())); } catch {}
    const n = listos(), t = clase.desafios.length;
    barra.style.setProperty("--p", `${(n / t) * 100}%`);
    textoBarra.textContent = n === t ? "¡Todo listo para enviar! 🎁" : `${n} de ${t} desafíos listos`;
    clase.desafios.forEach((d, i) => form.children[i]?.classList.toggle("completo", i < t && (
      d.tipo === "seleccion" ? leer()[d.id] != null : d.tipo === "abierta" ? contarPalabras(leer()[d.id]) >= d.minPalabras : juegos[d.id].completo())));
  };

  clase.desafios.forEach((d, i) => {
    const bloque = h("fieldset", { class: `desafio tipo-${d.tipo}`, style: `--i:${i}` },
      h("legend", {}, h("span", { class: "lazo" }), `${ETIQUETA[d.tipo]} ${i + 1}`, h("span", { class: "pts" }, `${d.puntos} pt${d.puntos > 1 ? "s" : ""}`)),
      h("p", { class: "enunciado" }, d.enunciado));
    if (d.tipo === "seleccion") {
      ordenOpciones(d.opciones.length, user.uid + clase.id + d.id).forEach((orig) => {
        const input = h("input", { type: "radio", name: d.id, value: String(orig),
          checked: String(borrador[d.id]) === String(orig), onchange: actualizar });
        bloque.append(h("label", { class: "opcion" }, input, h("span", {}, d.opciones[orig])));
      });
    } else if (d.tipo === "abierta") {
      const contador = h("small", { class: "contador" });
      const ta = h("textarea", { name: d.id, rows: d.minPalabras >= 300 ? 18 : 8, placeholder: `Escribe aquí (mínimo ${d.minPalabras} palabras)` });
      ta.value = borrador[d.id] || "";
      const act = () => {
        const n = contarPalabras(ta.value);
        contador.textContent = `${n} palabras` + (n < d.minPalabras ? ` · faltan ${d.minPalabras - n}` : " ✓");
        contador.classList.toggle("ok", n >= d.minPalabras);
      };
      ta.addEventListener("input", () => { act(); actualizar(); });
      act();
      bloque.append(ta, contador, h("p", { class: "criterio" }, "Se evaluará: ", d.criterio), rubrica());
    } else {
      juegos[d.id] = crearJuego(d, user.uid + clase.id, borrador[d.id], actualizar);
      bloque.append(juegos[d.id].el);
    }
    form.append(bloque);
  });

  function leer() {
    const fd = new FormData(form);
    const r = {};
    clase.desafios.forEach((d) => {
      if (juegos[d.id]) { r[d.id] = juegos[d.id].valor(); return; }
      const v = fd.get(d.id);
      if (v != null && v !== "") r[d.id] = d.tipo === "seleccion" ? Number(v) : String(v);
    });
    return r;
  }

  const enviar = h("button", { class: "btn grande regalo", type: "submit", disabled: modoPrueba },
    modoPrueba ? "Vista previa (docente)" : "Envolver y enviar 🎁");
  form.append(h("p", { class: "nota-envio" },
    "Tu avance se guarda solo en este navegador. Al enviar ya no podrás cambiar tus respuestas."), enviar, progreso);

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const r = leer();
    const falta = clase.desafios.findIndex((d) =>
      d.tipo === "seleccion" ? r[d.id] == null : d.tipo === "abierta" ? contarPalabras(r[d.id]) < d.minPalabras : !juegos[d.id].completo());
    if (falta >= 0) {
      form.children[falta].scrollIntoView({ behavior: "smooth", block: "center" });
      form.children[falta].classList.add("sacudir");
      setTimeout(() => form.children[falta].classList.remove("sacudir"), 600);
      return aviso(`Te falta completar el desafío ${falta + 1}.`, "error");
    }
    if (!confirm("¿Enviar tus respuestas? No podrás editarlas después.")) return;
    enviar.disabled = true;
    try {
      await setDoc(doc(db, "entregas", idEntrega(user.uid, clase.id)), {
        uid: user.uid, email: user.email, claseId: clase.id, respuestas: r, enviadoEn: serverTimestamp(),
      });
      try { localStorage.removeItem(claveBorrador); } catch {}
      confeti();
      aviso("¡Regalo enviado! 🎉");
      setTimeout(() => cargar(user), 900);
    } catch (e) {
      console.error(e);
      aviso("No se pudo enviar. ¿La clase sigue abierta? " + e.message, "error");
      enviar.disabled = false;
    }
  });
  setTimeout(actualizar);
  return form;
}

function vistaEntrega(entrega, cal) {
  const r = entrega.respuestas || {};
  const cont = h("div", { class: "desafios" });
  cont.append(cal
    ? h("div", { class: "resultado" },
        h("div", { class: "sello grande" }, fmtNota(nota(cal.puntos, cal.max))),
        h("div", {},
          h("p", { class: "manuscrito" }, cal.puntos === cal.max ? "¡puntaje perfecto!" : "resultado de la clase"),
          h("strong", {}, `${cal.puntos} de ${cal.max} puntos`),
          cal.comentario ? h("p", { class: "comentario" }, "«", cal.comentario, "»") : null))
    : h("div", { class: "resultado pendiente" },
        h("span", { class: "regalo-anim" }, "🎁"),
        h("p", {}, "Entregaste esta clase. Tu profe la está corrigiendo; aquí aparecerá tu puntaje.")));
  clase.desafios.forEach((d, i) => {
    const pts = cal?.detalle?.[d.id];
    const bloque = h("section", { class: "desafio" },
      h("h3", {}, `${ETIQUETA[d.tipo]} ${i + 1}`, pts != null ? h("span", { class: "pts" }, `${pts}/${d.puntos}`) : null),
      h("p", { class: "enunciado" }, d.enunciado));
    if (d.tipo === "seleccion") bloque.append(h("p", { class: "respuesta" }, "Tu respuesta: ", r[d.id] != null ? d.opciones[r[d.id]] : "—"));
    else if (d.tipo === "abierta") bloque.append(h("div", { class: "respuesta larga" }, r[d.id] || "—"));
    else bloque.append(vistaJuego(d, r[d.id]));
    cont.append(bloque);
  });
  return cont;
}

async function cargar(user) {
  if (!clase) return app.replaceChildren(h("p", {}, "Clase no encontrada. ", h("a", { href: "index.html" }, "Volver")));
  const docente = esDocente(user);
  const config = await leerConfig();
  if (!docente && !(config.clasesAbiertas || []).includes(clase.id)) {
    return app.replaceChildren(h("p", {}, "Esta puerta aún no se abre. ", h("a", { href: "index.html" }, "Volver")));
  }
  const id = idEntrega(user.uid, clase.id);
  const [e, c] = docente ? [null, null] : await Promise.all([
    getDoc(doc(db, "entregas", id)), getDoc(doc(db, "calificaciones", id)),
  ]);
  const cuerpo = e?.exists() ? vistaEntrega(e.data(), c?.exists() ? c.data() : null) : formulario(user, docente);
  app.replaceChildren(...cabecera(user).filter(Boolean), cuerpo);
  document.title = `${clase.titulo} · Poder`;
}

alCambiarSesion((user) => {
  if (!user) return (location.href = "index.html");
  cargar(user).catch((e) => { console.error(e); aviso("Error: " + e.message, "error"); });
});
