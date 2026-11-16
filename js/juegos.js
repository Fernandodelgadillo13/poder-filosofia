// =====================================================================
//  Juegos: clasificar (sacos), emparejar, ordenar, memorice y confeti.
//  Funcionan con mouse (arrastrar) y en celular (tocar y tocar).
// =====================================================================
import { h, ordenOpciones } from "./base.js";

const movReducido = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------------
// Motor genérico: tarjetas que se ubican en destinos (sacos o casillas)
// ---------------------------------------------------------------------
function ubicador({ tarjetas, destinos, capacidad, estado, onChange, claseExtra }) {
  let sel = null;
  const raiz = h("div", { class: `ubicador ${claseExtra}` });

  const mover = (tarjetaId, destinoId) => {
    if (destinoId && capacidad === 1) {
      for (const [t, d] of Object.entries(estado)) if (d === destinoId) delete estado[t];
    }
    if (destinoId) estado[tarjetaId] = destinoId; else delete estado[tarjetaId];
    sel = null;
    pintar(tarjetaId);
    onChange();
  };

  const tarjetaEl = (t, recien) => {
    const el = h("button", {
      type: "button", draggable: "true",
      class: `ficha ${sel === t.id ? "sel" : ""} ${recien === t.id ? "pop" : ""}`,
      onclick: (ev) => { ev.stopPropagation(); sel = sel === t.id ? null : t.id; pintar(); },
      ondragstart: (ev) => { ev.dataTransfer.setData("text/plain", t.id); el.classList.add("arrastrando"); },
      ondragend: () => el.classList.remove("arrastrando"),
    }, t.texto);
    return el;
  };

  const zona = (destinoId, contenido, attrs = {}) => {
    const z = h("div", {
      ...attrs,
      onclick: () => { if (sel) mover(sel, destinoId); },
      ondragover: (ev) => { ev.preventDefault(); z.classList.add("encima"); },
      ondragleave: () => z.classList.remove("encima"),
      ondrop: (ev) => { ev.preventDefault(); z.classList.remove("encima"); mover(ev.dataTransfer.getData("text/plain"), destinoId); },
    }, contenido);
    return z;
  };

  function pintar(recien) {
    const libres = tarjetas.filter((t) => !estado[t.id]);
    const montones = destinos.map((d) =>
      zona(d.id, [
        h("div", { class: "rotulo" }, d.texto),
        h("div", { class: "contenido" }, tarjetas.filter((t) => estado[t.id] === d.id).map((t) => tarjetaEl(t, recien))),
      ], { class: `destino ${sel ? "invita" : ""}` }));
    raiz.replaceChildren(
      zona(null, libres.length ? libres.map((t) => tarjetaEl(t, recien)) : h("p", { class: "listo" }, "¡Todo ubicado! ✨"), { class: "monton" }),
      h("p", { class: "ayuda" }, sel ? "Ahora toca el destino 👇" : "Arrastra o toca una tarjeta y luego su destino. Toca una tarjeta ubicada para moverla."),
      h("div", { class: "destinos" }, montones),
    );
  }
  pintar();
  return raiz;
}

// ---------------------------------------------------------------------
export function crearJuego(d, semilla, inicial, onChange) {
  if (d.tipo === "clasificar") {
    const orden = ordenOpciones(d.items.length, semilla + d.id);
    const tarjetas = orden.map((i) => d.items[i]);
    const destinos = d.categorias.map((c, i) => ({ id: String(i), texto: c }));
    const estado = {};
    for (const [k, v] of Object.entries(inicial || {})) estado[k] = String(v);
    const el = ubicador({ tarjetas, destinos, capacidad: 99, estado, onChange, claseExtra: "sacos" });
    return {
      el,
      valor: () => Object.fromEntries(Object.entries(estado).map(([k, v]) => [k, Number(v)])),
      completo: () => d.items.every((i) => estado[i.id] != null),
    };
  }
  if (d.tipo === "emparejar") {
    const orden = ordenOpciones(d.derecha.length, semilla + d.id);
    const tarjetas = orden.map((i) => ({ id: "r" + i, texto: d.derecha[i] }));
    const destinos = ordenOpciones(d.izquierda.length, semilla + d.id + "izq").map((i) => d.izquierda[i]);
    const estado = {}; // tarjeta(derecha) -> izquierda
    for (const [izq, der] of Object.entries(inicial || {})) estado["r" + der] = izq;
    const el = ubicador({ tarjetas, destinos, capacidad: 1, estado, onChange, claseExtra: "parejas" });
    return {
      el,
      valor: () => Object.fromEntries(Object.entries(estado).map(([r, izq]) => [izq, Number(r.slice(1))])),
      completo: () => Object.keys(estado).length === d.izquierda.length,
    };
  }
  if (d.tipo === "ordenar") {
    let lista = Array.isArray(inicial) && inicial.length === d.items.length
      ? [...inicial]
      : ordenOpciones(d.items.length, semilla + d.id).map((i) => d.items[i].id);
    let tocado = Array.isArray(inicial);
    const ol = h("ol", { class: "ordenar" });
    let arrastrado = null;
    const intercambiar = (a, b) => {
      if (b < 0 || b >= lista.length) return;
      [lista[a], lista[b]] = [lista[b], lista[a]];
      tocado = true; pintar(lista[b]); onChange();
    };
    function pintar(movido) {
      ol.replaceChildren(...lista.map((id, n) => {
        const item = d.items.find((i) => i.id === id);
        const li = h("li", {
          draggable: "true", class: movido === id ? "pop" : "",
          ondragstart: () => (arrastrado = n),
          ondragover: (ev) => ev.preventDefault(),
          ondrop: (ev) => {
            ev.preventDefault();
            if (arrastrado == null || arrastrado === n) return;
            const [x] = lista.splice(arrastrado, 1); lista.splice(n, 0, x);
            tocado = true; pintar(x); onChange();
          },
        },
          h("span", { class: "paso" }, String(n + 1)),
          h("span", { class: "txt" }, item.texto),
          h("span", { class: "flechas" },
            h("button", { type: "button", "aria-label": "Subir", disabled: n === 0, onclick: () => intercambiar(n, n - 1) }, "▲"),
            h("button", { type: "button", "aria-label": "Bajar", disabled: n === lista.length - 1, onclick: () => intercambiar(n, n + 1) }, "▼")));
        return li;
      }));
    }
    pintar();
    return { el: h("div", {}, h("p", { class: "ayuda" }, "Arrastra o usa las flechas para ordenar."), ol), valor: () => [...lista], completo: () => tocado };
  }
  throw new Error("Tipo de juego desconocido: " + d.tipo);
}

/** Vista de solo lectura de la respuesta a un juego. */
export function vistaJuego(d, r, clave) {
  const marca = (ok) => (clave ? (ok ? " ✓" : " ✗") : "");
  const cls = (ok) => (clave ? (ok ? "bien" : "mal") : "");
  if (!r) return h("p", {}, "—");
  if (d.tipo === "clasificar")
    return h("ul", { class: "vista-juego" }, d.items.map((i) =>
      h("li", { class: cls(clave?.[i.id] === r[i.id]) }, i.texto, " → ", h("strong", {}, d.categorias[r[i.id]] ?? "—"), marca(clave?.[i.id] === r[i.id]))));
  if (d.tipo === "emparejar")
    return h("ul", { class: "vista-juego" }, d.izquierda.map((i) =>
      h("li", { class: cls(clave?.[i.id] === r[i.id]) }, h("strong", {}, i.texto), " ↔ ", d.derecha[r[i.id]] ?? "—", marca(clave?.[i.id] === r[i.id]))));
  if (d.tipo === "ordenar")
    return h("ol", { class: "vista-juego" }, r.map((id, n) =>
      h("li", { class: cls(clave?.[n] === id) }, d.items.find((i) => i.id === id)?.texto, marca(clave?.[n] === id))));
}

/** Puntaje automático (con puntaje parcial, redondeado a 0,5). */
export function puntajeJuego(d, r, clave) {
  if (!r || !clave) return null;
  let ok = 0, n = 0;
  if (d.tipo === "ordenar") { n = clave.length; clave.forEach((id, i) => { if (r[i] === id) ok++; }); }
  else { const ids = (d.tipo === "clasificar" ? d.items : d.izquierda).map((i) => i.id); n = ids.length; ids.forEach((id) => { if (r[id] === clave[id]) ok++; }); }
  return Math.round((ok / n) * d.puntos * 2) / 2;
}

// ---------------------------------------------------------------------
// Memorice de práctica (no evaluado)
// ---------------------------------------------------------------------
export function memorice(pares, semilla) {
  const cartas = ordenOpciones(pares.length * 2, semilla).map((i) => ({ par: Math.floor(i / 2), texto: pares[Math.floor(i / 2)][i % 2] }));
  let abiertas = [], hechas = 0, jugadas = 0, bloqueo = false;
  const contador = h("span", {}, "0 jugadas");
  const grilla = h("div", { class: "memo-grilla" });
  const fin = h("p", { class: "memo-fin" });
  cartas.forEach((c) => {
    const el = h("button", { type: "button", class: "memo-carta", "aria-label": "Carta boca abajo" },
      h("span", { class: "cara dorso" }, h("span", { class: "copo" }, "❄")),
      h("span", { class: "cara frente" }, c.texto));
    el.addEventListener("click", () => {
      if (bloqueo || el.classList.contains("abierta") || el.classList.contains("hecha")) return;
      el.classList.add("abierta"); abiertas.push({ el, c });
      if (abiertas.length < 2) return;
      jugadas++; contador.textContent = `${jugadas} jugadas`;
      const [a, b] = abiertas; abiertas = [];
      if (a.c.par === b.c.par) {
        setTimeout(() => { a.el.classList.add("hecha"); b.el.classList.add("hecha"); }, 350);
        if (++hechas === pares.length) {
          setTimeout(() => { fin.textContent = `¡Memorice completo en ${jugadas} jugadas! 🎄`; confeti(60); }, 600);
        }
      } else {
        bloqueo = true;
        setTimeout(() => { a.el.classList.remove("abierta"); b.el.classList.remove("abierta"); bloqueo = false; }, 1000);
      }
    });
    grilla.append(el);
  });
  return h("section", { class: "memorice" },
    h("div", { class: "memo-cab" },
      h("h2", {}, "Calentamiento: memorice"),
      h("p", {}, "Encuentra las parejas de conceptos. No tiene nota: es para repasar. ", contador)),
    grilla, fin);
}

// ---------------------------------------------------------------------
// Confeti / nieve de celebración
// ---------------------------------------------------------------------
export function confeti(cantidad = 160) {
  if (movReducido()) return;
  const cv = h("canvas", { class: "confeti" });
  document.body.append(cv);
  const ctx = cv.getContext("2d");
  const W = (cv.width = innerWidth), H = (cv.height = innerHeight);
  const colores = ["#c8102e", "#0b5d3b", "#e8b33d", "#ffffff", "#7a1020"];
  const ps = Array.from({ length: cantidad }, () => ({
    x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.35,
    vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4,
    r: Math.random() * 6 + 4, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3,
    c: colores[Math.floor(Math.random() * colores.length)], estrella: Math.random() < 0.25,
  }));
  let t = 0;
  (function paso() {
    ctx.clearRect(0, 0, W, H);
    for (const p of ps) {
      p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c;
      if (p.estrella) { ctx.font = `${p.r * 3}px serif`; ctx.fillText("★", -p.r, p.r); }
      else ctx.fillRect(-p.r / 2, -p.r, p.r, p.r * 2 * Math.abs(Math.cos(p.a * 2)) + 1);
      ctx.restore();
    }
    if (++t < 200) requestAnimationFrame(paso); else cv.remove();
  })();
}
