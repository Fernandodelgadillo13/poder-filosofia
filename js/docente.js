import {
  db, doc, setDoc, getDocs, collection, deleteDoc, serverTimestamp,
  alCambiarSesion, esDocente, h, nota, fmtNota, aviso, leerConfig, idEntrega,
} from "./base.js";
import { CLASES, claseById, maxPuntosClase, maxPuntosCurso, RUBRICA_ABIERTA } from "./contenido.js";
import { vistaJuego, puntajeJuego } from "./juegos.js";
import "./decor.js";

const app = document.getElementById("app");
const S = { estudiantes: [], entregas: {}, califs: {}, claves: {}, config: { clasesAbiertas: [] }, claseSel: CLASES[0].id };

async function cargarDatos() {
  const [est, ent, cal, cla, config] = await Promise.all([
    getDocs(collection(db, "estudiantes")),
    getDocs(collection(db, "entregas")),
    getDocs(collection(db, "calificaciones")),
    getDocs(collection(db, "claves")),
    leerConfig(),
  ]);
  S.estudiantes = est.docs.map((d) => ({ uid: d.id, ...d.data() }))
    .sort((a, b) => (a.seccion || "").localeCompare(b.seccion || "") || (a.nombre || "").localeCompare(b.nombre || ""));
  S.entregas = Object.fromEntries(ent.docs.map((d) => [d.id, d.data()]));
  S.califs = Object.fromEntries(cal.docs.map((d) => [d.id, d.data()]));
  S.claves = Object.fromEntries(cla.docs.map((d) => [d.id, d.data()]));
  S.config = config;
}

// ---------- Sección: clases abiertas ----------
function seccionApertura() {
  const abiertas = new Set(S.config.clasesAbiertas || []);
  const checks = CLASES.map((c) => {
    const cb = h("input", { type: "checkbox", value: c.id, checked: abiertas.has(c.id) });
    return h("label", { class: "chip" }, cb, ` ${c.numero}. ${c.titulo}`);
  });
  const guardar = h("button", { class: "btn", onclick: async () => {
    const ids = checks.map((l) => l.querySelector("input")).filter((i) => i.checked).map((i) => i.value);
    await setDoc(doc(db, "config", "curso"), { clasesAbiertas: ids, actualizado: serverTimestamp() }, { merge: true });
    S.config.clasesAbiertas = ids;
    aviso("Clases abiertas actualizadas");
  } }, "Guardar");
  return h("section", { class: "tarjeta" },
    h("h2", {}, "1. Clases abiertas"),
    h("p", {}, "Marca las clases que tus estudiantes pueden ver y responder. Al desmarcar una clase ya no se aceptan nuevas entregas."),
    h("div", { class: "chips" }, checks), guardar);
}

// ---------- Sección: claves ----------
function seccionClaves() {
  const cargadas = CLASES.filter((c) => S.claves[c.id]).length;
  const input = h("input", { type: "file", accept: ".json,application/json" });
  input.addEventListener("change", async () => {
    try {
      const datos = JSON.parse(await input.files[0].text());
      const ids = Object.keys(datos).filter((k) => claseById(k));
      await Promise.all(ids.map((k) => setDoc(doc(db, "claves", k), datos[k])));
      ids.forEach((k) => (S.claves[k] = datos[k]));
      aviso(`Claves importadas para ${ids.length} clases`);
      render();
    } catch (e) { aviso("Archivo inválido: " + e.message, "error"); }
  });
  return h("section", { class: "tarjeta" },
    h("h2", {}, "2. Claves (alternativas y juegos)"),
    h("p", {}, `Claves cargadas: ${cargadas} de ${CLASES.length} clases. `,
      cargadas < CLASES.length ? "Importa el archivo privado/claves.json (no está en GitHub)." : "✓ Todo listo."),
    h("label", { class: "btn sec archivo" }, "Importar claves.json", input));
}

// ---------- Sección: corrección ----------
function seccionCorreccion() {
  const clase = claseById(S.claseSel);
  const selector = h("select", { onchange: (e) => { S.claseSel = e.target.value; render(); } },
    CLASES.map((c) => h("option", { value: c.id, selected: c.id === S.claseSel }, `${c.numero}. ${c.titulo}`)));
  const max = maxPuntosClase(clase);
  const zona = h("div", { id: "zona-correccion" });

  const filas = S.estudiantes.map((e) => {
    const id = idEntrega(e.uid, clase.id);
    const ent = S.entregas[id], cal = S.califs[id];
    const estado = cal ? `${cal.puntos}/${max} · ${fmtNota(nota(cal.puntos, max))}` : ent ? "Por corregir" : "Sin entrega";
    return h("tr", { class: cal ? "ok" : ent ? "pend" : "" },
      h("td", {}, e.nombre), h("td", {}, e.seccion), h("td", {}, estado),
      h("td", {}, ent ? h("button", { class: "btn chico", onclick: () => abrirCorreccion(e, clase, zona) }, cal ? "Revisar" : "Corregir") : ""));
  });
  const pendientes = S.estudiantes.filter((e) => S.entregas[idEntrega(e.uid, clase.id)] && !S.califs[idEntrega(e.uid, clase.id)]).length;

  return h("section", { class: "tarjeta" },
    h("h2", {}, "3. Corregir entregas"),
    h("div", { class: "fila" }, selector, h("span", { class: "badge" }, `${pendientes} por corregir`)),
    S.claves[clase.id] ? null : h("p", { class: "alerta" }, "⚠ Esta clase no tiene claves cargadas: la selección múltiple y los juegos no se autocorregirán."),
    h("table", { class: "tabla" },
      h("thead", {}, h("tr", {}, ["Estudiante", "Sección", "Estado", ""].map((t) => h("th", {}, t)))),
      h("tbody", {}, filas.length ? filas : h("tr", {}, h("td", { colspan: 4 }, "Aún no hay estudiantes registrados.")))),
    zona);
}

function abrirCorreccion(est, clase, zona) {
  const id = idEntrega(est.uid, clase.id);
  const ent = S.entregas[id], cal = S.califs[id], clave = S.claves[clase.id] || {};
  const inputs = {};
  const bloques = clase.desafios.map((d, i) => {
    const resp = ent.respuestas?.[d.id];
    let auto = null, vistaResp;
    if (d.tipo === "seleccion") {
      const correcta = clave[d.id];
      if (correcta != null) auto = resp === correcta ? d.puntos : 0;
      vistaResp = h("div", {},
        h("p", { class: auto === d.puntos ? "bien" : auto === 0 ? "mal" : "" },
          "Respondió: ", resp != null ? d.opciones[resp] : "—", auto != null ? (auto ? " ✓" : " ✗") : ""),
        correcta != null && auto === 0 ? h("p", { class: "tenue" }, "Correcta: ", d.opciones[correcta]) : null);
    } else if (d.tipo === "abierta") {
      vistaResp = h("div", {},
        h("div", { class: "respuesta larga" }, resp || "—"),
        h("p", { class: "tenue" }, "Criterio: ", d.criterio));
    } else {
      auto = puntajeJuego(d, resp, clave[d.id]);
      vistaResp = vistaJuego(d, resp, clave[d.id]);
    }
    const valor = cal?.detalle?.[d.id] ?? auto ?? "";
    inputs[d.id] = h("input", { type: "number", min: 0, max: d.puntos, step: 0.5, value: valor, class: "pts-input" });
    return h("div", { class: "desafio" },
      h("h4", {}, `${i + 1}. ${({ seleccion: "Alternativas", abierta: "Escrito", clasificar: "Juego", emparejar: "Juego", ordenar: "Juego" })[d.tipo]}`, h("span", { class: "pts-edit" }, inputs[d.id], ` / ${d.puntos}`)),
      h("p", { class: "enunciado" }, d.enunciado), vistaResp);
  });
  const comentario = h("textarea", { rows: 3, placeholder: "Comentario para el estudiante (opcional)" });
  comentario.value = cal?.comentario || "";

  const guardar = h("button", { class: "btn", onclick: async () => {
    const detalle = {};
    for (const d of clase.desafios) {
      const v = Number(inputs[d.id].value);
      if (inputs[d.id].value === "" || isNaN(v) || v < 0 || v > d.puntos) return aviso(`Revisa el puntaje del desafío ${d.id}`, "error");
      detalle[d.id] = v;
    }
    const puntos = Object.values(detalle).reduce((a, b) => a + b, 0);
    const datos = { uid: est.uid, claseId: clase.id, puntos, max: maxPuntosClase(clase), detalle,
      comentario: comentario.value.trim(), corregidoEn: serverTimestamp() };
    await setDoc(doc(db, "calificaciones", id), datos);
    S.califs[id] = datos;
    aviso(`Guardado: ${puntos} pts · nota ${fmtNota(nota(puntos, datos.max))}`);
    render();
  } }, "Guardar calificación");

  const reabrir = h("button", { class: "btn peligro", onclick: async () => {
    if (!confirm(`¿Borrar la entrega de ${est.nombre} para que pueda responder de nuevo? También se borra su calificación.`)) return;
    await Promise.all([deleteDoc(doc(db, "entregas", id)), deleteDoc(doc(db, "calificaciones", id))]);
    delete S.entregas[id]; delete S.califs[id];
    aviso("Entrega borrada"); render();
  } }, "Permitir reenvío");

  zona.replaceChildren(h("div", { class: "panel-correccion" },
    h("h3", {}, `${est.nombre} · ${clase.titulo}`),
    h("details", { class: "rubrica" }, h("summary", {}, "Rúbrica de abiertas"),
      h("ul", {}, RUBRICA_ABIERTA.map((r) => h("li", {}, h("strong", {}, r.nivel + ": "), r.desc)))),
    bloques, comentario, h("div", { class: "fila" }, guardar, reabrir)));
  zona.scrollIntoView({ behavior: "smooth" });
}

// ---------- Sección: libro de notas ----------
function filasNotas() {
  const maxTotal = maxPuntosCurso();
  return S.estudiantes.map((e) => {
    const pts = CLASES.map((c) => S.califs[idEntrega(e.uid, c.id)]?.puntos ?? null);
    const total = pts.reduce((s, p) => s + (p ?? 0), 0);
    return { e, pts, total, nota: nota(total, maxTotal) };
  });
}

function seccionNotas() {
  const filas = filasNotas();
  const exportar = h("button", { class: "btn sec", onclick: () => {
    const cab = ["Nombre", "Sección", "Correo", ...CLASES.map((c) => `C${c.numero} (${maxPuntosClase(c)})`), `Total (${maxPuntosCurso()})`, "Nota final"];
    const lineas = [cab, ...filas.map((f) => [f.e.nombre, f.e.seccion, f.e.email, ...f.pts.map((p) => p ?? ""), f.total, fmtNota(f.nota)])];
    const csv = lineas.map((l) => l.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";")).join("\n");
    const a = h("a", { href: URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" })), download: "notas-poder.csv" });
    a.click();
  } }, "Exportar CSV (Excel)");

  return h("section", { class: "tarjeta" },
    h("h2", {}, "4. Libro de notas"),
    h("p", {}, `Nota final = puntos acumulados sobre ${maxPuntosCurso()} pts totales, escala 1,0–7,0 con 60 % de exigencia. Las clases sin entrega cuentan 0.`),
    exportar,
    h("div", { class: "scroll" }, h("table", { class: "tabla notas" },
      h("thead", {}, h("tr", {}, h("th", {}, "Estudiante"), CLASES.map((c) => h("th", { title: c.titulo }, `C${c.numero}`)), h("th", {}, "Total"), h("th", {}, "Nota"))),
      h("tbody", {}, filas.map((f) => h("tr", {},
        h("td", {}, `${f.e.nombre} (${f.e.seccion})`),
        f.pts.map((p) => h("td", {}, p ?? "·")),
        h("td", {}, String(f.total)),
        h("td", { class: f.nota < 4 ? "mal" : "bien" }, fmtNota(f.nota))))))));
}

function render() {
  app.replaceChildren(
    h("h1", { class: "titulo-seccion" }, "Panel docente"),
    h("p", {}, `${S.estudiantes.length} estudiantes registrados · ${Object.keys(S.entregas).length} entregas · ${Object.keys(S.califs).length} corregidas`),
    seccionApertura(), seccionClaves(), seccionCorreccion(), seccionNotas());
}

alCambiarSesion(async (user) => {
  if (!user) return (location.href = "index.html");
  if (!esDocente(user)) return app.replaceChildren(h("p", {}, "No tienes acceso al panel docente. ", h("a", { href: "index.html" }, "Volver")));
  try { await cargarDatos(); render(); }
  catch (e) { console.error(e); app.replaceChildren(h("p", { class: "alerta" }, "Error de permisos o configuración: " + e.message + ". Revisa que tu correo esté en firestore.rules.")); }
});
