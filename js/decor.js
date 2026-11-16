// =====================================================================
//  Decoración navideña: nieve que cae y guirnalda de luces en la barra.
//  Se desactiva sola si el sistema pide "reducir movimiento" o si
//  CURSO.navidad = false (en contenido.js).
// =====================================================================
import { CURSO } from "./contenido.js";
import { trineoVolador, suelo, cuentaRegresiva } from "./escena.js";

const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (CURSO.navidad !== false) {
  document.documentElement.classList.add("navidad");

  // Guirnalda de luces
  const barra = document.querySelector(".barra");
  if (barra) {
    const g = document.createElement("div");
    g.className = "guirnalda";
    g.setAttribute("aria-hidden", "true");
    const n = Math.ceil(innerWidth / 46);
    for (let i = 0; i < n; i++) {
      const b = document.createElement("i");
      b.style.setProperty("--d", `${(i * 0.37) % 2}s`);
      g.append(b);
    }
    barra.append(g);
    const cuenta = cuentaRegresiva();
    if (cuenta) {
      const chip = document.createElement("span");
      chip.className = "cuenta-regresiva";
      chip.textContent = cuenta;
      barra.querySelector(".marca")?.after(chip);
    }
  }

  // Trineo con renos que cruza el cielo cada cierto tiempo
  document.body.insertAdjacentHTML("beforeend", trineoVolador());

  // Suelo nevado con mono de nieve, reno que camina, árbol y bastones
  const pie = document.querySelector(".pie");
  const escena = suelo();
  if (pie) pie.before(escena); else document.body.append(escena);

  // Nieve
  if (!reducido) {
    const cv = document.createElement("canvas");
    cv.className = "nieve";
    cv.setAttribute("aria-hidden", "true");
    document.body.prepend(cv);
    const ctx = cv.getContext("2d");
    let W, H, copos;
    const crear = () => {
      W = cv.width = innerWidth; H = cv.height = innerHeight;
      copos = Array.from({ length: Math.min(110, Math.floor(W / 12)) }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2.6 + 0.8,
        v: Math.random() * 0.6 + 0.3, f: Math.random() * Math.PI * 2,
      }));
    };
    crear();
    addEventListener("resize", crear);
    let t = 0;
    (function caer() {
      t += 0.01;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(255,255,255,.9)";
      for (const c of copos) {
        c.y += c.v; c.x += Math.sin(t + c.f) * 0.4;
        if (c.y > H + 5) { c.y = -5; c.x = Math.random() * W; }
        ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(caer);
    })();
  }
}

/** Adornos colgantes (esferas que se balancean) con texto. */
export function adornos(textos) {
  const cont = document.createElement("div");
  cont.className = "adornos";
  cont.setAttribute("aria-hidden", "true");
  textos.forEach((t, i) => {
    const a = document.createElement("div");
    a.className = "adorno";
    a.style.setProperty("--i", i);
    a.style.setProperty("--largo", `${40 + ((i * 37) % 70)}px`);
    a.innerHTML = `<span class="hilo"></span><span class="bola"><b></b><em></em></span><span class="nombre"></span>`;
    a.querySelector(".nombre").textContent = t;
    cont.append(a);
  });
  return cont;
}
