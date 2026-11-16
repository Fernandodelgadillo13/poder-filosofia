// =====================================================================
//  Escena navideña dibujada en SVG (ilustraciones originales):
//  renos, trineo, árbol, mono de nieve, bastones, regalos y suelo nevado.
// =====================================================================

/** Reno de perfil mirando a la derecha. Las patas se animan con CSS. */
export function reno({ collar = false } = {}) {
  return `
<svg class="reno" viewBox="0 -14 132 114" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g class="pata pata-a"><rect x="38" y="56" width="6" height="32" rx="3" fill="#6e4422"/><rect x="36.5" y="85" width="9" height="6" rx="2" fill="#2b1a0f"/></g>
  <g class="pata pata-b"><rect x="76" y="56" width="6" height="32" rx="3" fill="#6e4422"/><rect x="74.5" y="85" width="9" height="6" rx="2" fill="#2b1a0f"/></g>
  <ellipse cx="31" cy="44" rx="7" ry="4.5" fill="#f4ead6"/>
  <ellipse cx="62" cy="51" rx="33" ry="16" fill="#9a6331"/>
  <ellipse cx="64" cy="58" rx="22" ry="7" fill="#e9d3b0"/>
  <g class="pata pata-c"><rect x="46" y="58" width="7" height="32" rx="3.5" fill="#8a5528"/><rect x="44.5" y="87" width="10" height="6" rx="2" fill="#2b1a0f"/></g>
  <g class="pata pata-d"><rect x="84" y="56" width="7" height="32" rx="3.5" fill="#8a5528"/><rect x="82.5" y="85" width="10" height="6" rx="2" fill="#2b1a0f"/></g>
  <path d="M79 50 Q85 31 94 19 L105 24 Q97 39 93 56 Z" fill="#9a6331"/>
  ${collar ? `<path d="M81 44 Q89 50 97 40" stroke="#b5121b" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="86" cy="49" r="3" fill="#e8b33d"/><circle cx="92" cy="47" r="3" fill="#e8b33d"/>` : ""}
  <g class="cabeza">
    <path d="M97 12 C95 3 92 -3 87 -9 M92 1 L85 -2 M95 6 L101 -4 M99 -1 L105 -7" stroke="#d8b47a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M103 12 C104 3 106 -3 112 -8 M105 2 L111 0" stroke="#c49a5e" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="93" cy="14" rx="7" ry="2.8" transform="rotate(-25 93 14)" fill="#8a5528"/>
    <ellipse cx="103" cy="20" rx="12.5" ry="9" fill="#9a6331"/>
    <ellipse cx="114" cy="24" rx="7.5" ry="5.8" fill="#b07a45"/>
    <ellipse cx="120.5" cy="22.5" rx="3.4" ry="2.8" fill="#3a2416"/>
    <path d="M113 28 Q116 30 119 28" stroke="#3a2416" stroke-width="1.2" fill="none"/>
    <circle cx="104" cy="17" r="2" fill="#1a1a1a"/><circle cx="104.7" cy="16.3" r=".7" fill="#fff"/>
    <ellipse cx="101" cy="22" rx="2.5" ry="1.4" fill="#e79a8a" opacity=".6"/>
  </g>
</svg>`;
}

/** Trineo con renos que vuela por el cielo (un solo SVG, con riendas). */
export function trineoVolador() {
  const renoAnidado = (x) => `<g class="reno" transform="translate(${x} 8) scale(.947) translate(0 14)">${reno({ collar: true }).replace(/<svg[^>]*>|<\/svg>/g, "")}</g>`;
  return `
<div class="vuelo" aria-hidden="true"><div class="vuelo-bob">
<svg viewBox="0 0 600 130" xmlns="http://www.w3.org/2000/svg">
  <g class="estela">
    <text x="-30" y="70" font-size="14" fill="#f3d28a">✦</text><text x="-60" y="52" font-size="10" fill="#fff">✦</text>
    <text x="-95" y="78" font-size="8" fill="#f3d28a">✦</text><text x="-125" y="60" font-size="6" fill="#fff">✦</text>
  </g>
  <path d="M140 66 Q200 80 248 62 Q330 84 378 60 Q455 82 505 60" stroke="#7d0c14" stroke-width="2" fill="none"/>
  <!-- Saco y regalos -->
  <path d="M38 50 Q30 18 52 12 Q60 2 70 12 Q90 16 84 50 Z" fill="#a8763e"/>
  <path d="M52 12 Q60 20 70 12" stroke="#7a5229" stroke-width="2" fill="none"/>
  <rect x="78" y="26" width="22" height="24" rx="2" fill="#17583f"/><rect x="87" y="26" width="4" height="24" fill="#e8b33d"/>
  <!-- Viejo Pascuero -->
  <circle cx="112" cy="40" r="15" fill="#c8102e"/>
  <circle cx="114" cy="20" r="9" fill="#f6c9a8"/>
  <path d="M104 22 Q114 42 124 22 Q120 30 114 31 Q108 30 104 22 Z" fill="#fff"/>
  <path d="M104 16 Q112 0 126 6 L124 14 Z" fill="#c8102e"/><circle cx="127" cy="6" r="3.5" fill="#fff"/>
  <rect x="103" y="14" width="22" height="4.5" rx="2" fill="#fff"/>
  <circle cx="117" cy="19" r="1.2" fill="#2a1f1a"/>
  <!-- Cuerpo del trineo -->
  <path d="M22 50 L118 50 Q132 50 134 36 L146 30 Q148 62 122 72 L32 72 Q14 72 16 58 Z" fill="#b5121b"/>
  <path d="M22 50 L118 50 Q132 50 134 36 L146 30" stroke="#e8b33d" stroke-width="3" fill="none"/>
  <path d="M40 61 Q60 54 80 61 Q100 68 118 60" stroke="#e8b33d" stroke-width="2" fill="none" opacity=".8"/>
  <path d="M8 90 L122 90 Q146 90 148 70" stroke="#e8b33d" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M8 90 Q2 90 4 82" stroke="#e8b33d" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <line x1="40" y1="72" x2="40" y2="90" stroke="#e8b33d" stroke-width="3"/><line x1="105" y1="72" x2="105" y2="90" stroke="#e8b33d" stroke-width="3"/>
  ${renoAnidado(160)}${renoAnidado(290)}${renoAnidado(420)}
</svg></div></div>`;
}

/** Árbol de Navidad con luces que parpadean, esferas, estrella y regalos. */
export function arbol(clase = "") {
  const luces = [
    [62, 118], [84, 126], [108, 130], [132, 124], [154, 113],
    [50, 178], [76, 190], [104, 196], [132, 192], [160, 182], [182, 170],
    [36, 236], [64, 249], [96, 256], [128, 254], [160, 246], [190, 232],
  ].map(([x, y], i) => `<circle class="foco f${i % 4}" cx="${x}" cy="${y}" r="4.2" style="animation-delay:${(i * 0.23) % 1.6}s"/>`).join("");
  const bolas = [[90, 100, "#c8102e"], [140, 150, "#e8b33d"], [70, 160, "#3d7bd9"], [120, 220, "#c8102e"], [60, 222, "#e8b33d"], [170, 214, "#3d7bd9"], [110, 168, "#ffffff"]]
    .map(([x, y, c]) => `<g class="bola-arbol"><line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y - 6}" stroke="#a37721" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="7" fill="${c}"/><circle cx="${x - 2.4}" cy="${y - 2.4}" r="2" fill="#fff" opacity=".7"/></g>`).join("");
  return `
<svg class="arbol ${clase}" viewBox="0 0 230 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="115" cy="300" rx="105" ry="10" fill="#000" opacity=".08"/>
  <rect x="102" y="262" width="26" height="30" rx="3" fill="#6b4423"/>
  <path d="M115 40 L40 140 Q60 134 72 142 Q90 132 115 142 Q140 132 158 142 Q170 134 190 140 Z" fill="#1f6b4a"/>
  <path d="M115 40 L115 142 Q140 132 158 142 Q170 134 190 140 Z" fill="#17583f"/>
  <path d="M115 90 L26 200 Q48 192 62 202 Q86 190 115 202 Q144 190 168 202 Q182 192 204 200 Z" fill="#1f6b4a"/>
  <path d="M115 90 L115 202 Q144 190 168 202 Q182 192 204 200 Z" fill="#17583f"/>
  <path d="M115 145 L10 262 Q36 254 52 264 Q82 252 115 264 Q148 252 178 264 Q194 254 220 262 Z" fill="#1f6b4a"/>
  <path d="M115 145 L115 264 Q148 252 178 264 Q194 254 220 262 Z" fill="#17583f"/>
  <path d="M40 140 Q60 134 72 142 Q90 132 115 142 Q140 132 158 142 Q170 134 190 140" stroke="#fff" stroke-width="4" fill="none" opacity=".85" stroke-linecap="round"/>
  <path d="M26 200 Q48 192 62 202 Q86 190 115 202 Q144 190 168 202 Q182 192 204 200" stroke="#fff" stroke-width="4" fill="none" opacity=".85" stroke-linecap="round"/>
  <path d="M10 262 Q36 254 52 264 Q82 252 115 264 Q148 252 178 264 Q194 254 220 262" stroke="#fff" stroke-width="5" fill="none" opacity=".9" stroke-linecap="round"/>
  <path d="M58 112 Q108 140 160 106 M44 172 Q110 204 186 164 M30 230 Q110 266 196 226" stroke="#f3d28a" stroke-width="2" stroke-dasharray="1 5" stroke-linecap="round" fill="none"/>
  ${bolas}
  ${luces}
  <g class="estrella-arbol">
    <circle cx="115" cy="36" r="22" fill="#f3d28a" opacity=".35" class="halo"/>
    <path d="M115 14 L121 30 L138 30 L124 40 L129 57 L115 47 L101 57 L106 40 L92 30 L109 30 Z" fill="#e8b33d" stroke="#fff3c4" stroke-width="1.5"/>
  </g>
  <g class="regalos-arbol">
    <rect x="22" y="270" width="44" height="34" rx="3" fill="#c8102e"/><rect x="40" y="270" width="8" height="34" fill="#f3d28a"/>
    <path d="M44 270 Q30 256 36 264 Q38 272 44 270 Q58 256 52 264 Q50 272 44 270" fill="#f3d28a"/>
    <rect x="160" y="276" width="48" height="28" rx="3" fill="#3d7bd9"/><rect x="160" y="286" width="48" height="7" fill="#fff"/><rect x="180" y="276" width="7" height="28" fill="#fff"/>
    <rect x="134" y="284" width="28" height="20" rx="2" fill="#e8b33d"/><rect x="145" y="284" width="6" height="20" fill="#c8102e"/>
  </g>
</svg>`;
}

/** Mono de nieve que saluda. */
export function monoDeNieve() {
  return `
<svg class="mono-nieve" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g class="brazo-izq"><path d="M36 70 L8 54 M16 59 L10 48 M14 58 L4 60" stroke="#6b4423" stroke-width="3" stroke-linecap="round" fill="none"/></g>
  <g class="brazo-der"><path d="M84 70 L110 46 M102 53 L108 40 M104 51 L116 50" stroke="#6b4423" stroke-width="3" stroke-linecap="round" fill="none"/></g>
  <circle cx="60" cy="118" r="30" fill="#fff" stroke="#dce8f2" stroke-width="2"/>
  <circle cx="60" cy="72" r="23" fill="#fff" stroke="#dce8f2" stroke-width="2"/>
  <circle cx="60" cy="36" r="17" fill="#fff" stroke="#dce8f2" stroke-width="2"/>
  <circle cx="60" cy="68" r="2.6" fill="#2a1f1a"/><circle cx="60" cy="79" r="2.6" fill="#2a1f1a"/><circle cx="60" cy="110" r="3" fill="#2a1f1a"/>
  <path d="M42 52 Q60 60 78 52 L78 58 Q60 66 42 58 Z" fill="#c8102e"/><path d="M68 58 L74 78 L66 78 L62 60 Z" fill="#a50e1a"/>
  <circle cx="54" cy="33" r="2" fill="#2a1f1a"/><circle cx="66" cy="33" r="2" fill="#2a1f1a"/>
  <path d="M60 37 L76 40 L60 41 Z" fill="#f08a24"/>
  <path d="M53 44 Q60 48 67 44" stroke="#2a1f1a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <rect x="44" y="18" width="32" height="4" rx="2" fill="#1d1d1d"/><rect x="48" y="2" width="24" height="17" rx="2" fill="#1d1d1d"/><rect x="48" y="13" width="24" height="4" fill="#c8102e"/>
</svg>`;
}

/** Bastón de caramelo. */
export function baston() {
  return `
<svg class="baston-suelo" viewBox="0 0 50 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M14 108 L14 30 Q14 8 30 8 Q46 8 46 26" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M14 108 L14 30 Q14 8 30 8 Q46 8 46 26" stroke="#c8102e" stroke-width="10" fill="none" stroke-dasharray="7 7" stroke-linecap="butt"/>
</svg>`;
}

/** Suelo nevado con mono de nieve, reno que camina, bastones, árbol y regalos. */
export function suelo() {
  const el = document.createElement("div");
  el.className = "escena-suelo";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = `
    <div class="pos mono">${monoDeNieve()}</div>
    <div class="pos baston1">${baston()}</div>
    <div class="pos baston2">${baston()}</div>
    <div class="pos arbolito">${arbol("chico")}</div>
    <div class="reno-caminante">${reno({ collar: true })}</div>
    <svg class="nieve-suelo" viewBox="0 0 1200 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 40 Q120 10 260 34 T520 30 T800 36 T1060 24 T1200 34 L1200 90 L0 90 Z" fill="#e3eef6"/>
      <path d="M0 54 Q160 28 330 50 T680 46 T1000 52 T1200 44 L1200 90 L0 90 Z" fill="#fff"/>
    </svg>`;
  return el;
}

/** Texto de cuenta regresiva a Navidad (o null fuera de temporada). */
export function cuentaRegresiva(hoy = new Date()) {
  const y = hoy.getFullYear();
  const navidad = new Date(y, 11, 25);
  const inicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const dias = Math.round((navidad - inicio) / 86400000);
  if (dias === 0) return "¡Hoy es Navidad! 🎄";
  if (dias > 0 && dias <= 60) return `Faltan ${dias} día${dias === 1 ? "" : "s"} para Navidad`;
  if (dias < 0 && dias >= -7) return "¡Feliz Navidad y buen fin de año!";
  return null;
}
