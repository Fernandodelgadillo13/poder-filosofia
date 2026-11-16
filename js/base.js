// Inicialización de Firebase y utilidades compartidas
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, getDocs, collection, query, where, deleteDoc, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { firebaseConfig, DOCENTES, DOMINIO_PERMITIDO } from "./firebase-config.js";
import { CURSO } from "./contenido.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { doc, getDoc, setDoc, getDocs, collection, query, where, deleteDoc, serverTimestamp };

export const esDocente = (user) =>
  !!user && DOCENTES.map((e) => e.toLowerCase()).includes((user.email || "").toLowerCase());

export async function entrar() {
  const prov = new GoogleAuthProvider();
  prov.setCustomParameters({ prompt: "select_account" });
  const res = await signInWithPopup(auth, prov);
  if (DOMINIO_PERMITIDO && !res.user.email.endsWith(DOMINIO_PERMITIDO) && !esDocente(res.user)) {
    await signOut(auth);
    throw new Error(`Debes ingresar con tu correo ${DOMINIO_PERMITIDO}`);
  }
  return res.user;
}
export const salir = () => signOut(auth);

/** Llama a cb(user|null) cuando cambia la sesión. */
export const alCambiarSesion = (cb) => onAuthStateChanged(auth, cb);

/** Crea elementos sin usar innerHTML con datos de usuarios. */
export function h(tag, attrs = {}, ...hijos) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
    else if (k === "html") el.innerHTML = v; // solo para contenido propio y fijo
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const hijo of hijos.flat()) {
    if (hijo == null || hijo === false) continue;
    el.append(hijo instanceof Node ? hijo : document.createTextNode(String(hijo)));
  }
  return el;
}

/** Escala chilena 1,0–7,0 con exigencia configurable. */
export function nota(puntos, max) {
  if (!max) return null;
  const { exigencia: e, notaMin: a, notaAprob: b, notaMax: c } = CURSO;
  const p = Math.max(0, Math.min(1, puntos / max));
  const n = p < e ? a + (b - a) * (p / e) : b + (c - b) * ((p - e) / (1 - e));
  return Math.round(n * 10) / 10;
}
export const fmtNota = (n) => (n == null ? "—" : n.toFixed(1).replace(".", ","));

export const idEntrega = (uid, claseId) => `${uid}_${claseId}`;

/** Orden de opciones barajado de forma estable por estudiante y pregunta. */
export function ordenOpciones(n, semilla) {
  let s = 0;
  for (const ch of semilla) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  const idx = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) >>> 0;
    const j = s % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

export const contarPalabras = (t) => (t || "").trim().split(/\s+/).filter(Boolean).length;

export function aviso(msg, tipo = "ok") {
  const el = h("div", { class: `aviso ${tipo}` }, msg);
  document.body.append(el);
  setTimeout(() => el.remove(), 4000);
}

/** Lee config/curso (clases abiertas). */
export async function leerConfig() {
  const s = await getDoc(doc(db, "config", "curso"));
  return s.exists() ? s.data() : { clasesAbiertas: [] };
}
