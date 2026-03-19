import { useState, useEffect, useRef, useCallback } from “react”;

/* ═══════════════════════════════════════════════
GLOBAL STYLES
═══════════════════════════════════════════════ */
const GlobalStyles = () => (

  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    :root {
      --void:#030202; --ink:#0a0706; --deep:#100c08; --layer:#181210;
      --surface:#201814; --rim:#2c2018; --border:#382a1c;
      --muted:#584838; --smoke:#786858; --parch:#c8b898; --cream:#e8d8b8;
      --gold:#c8a84a; --brass:#a08838; --amber:#d4a030;
      --rust:#8c3010; --blood:#a82820; --crimson:#c83028; --ember:#e05018;
      --jade:#1e7040;
      --fku:'Noto Naskh Arabic',sans-serif;
      --fen:'Cinzel',serif;
      --fdec:'Cinzel Decorative',serif;
    }
    html { font-size:16px; }
    body {
      background:var(--void); font-family:var(--fku); color:var(--parch);
      min-height:100vh; overflow-x:hidden; direction:rtl;
    }
    body::after {
      content:''; position:fixed; inset:0; z-index:9999; pointer-events:none;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='.028'/%3E%3C/svg%3E");
    }
    @keyframes fadeIn     { from{opacity:0}                            to{opacity:1} }
    @keyframes fadeOut    { from{opacity:1}                            to{opacity:0} }
    @keyframes fadeUp     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeDown   { from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn    { from{opacity:0;transform:scale(.82)}       to{opacity:1;transform:scale(1)} }
    @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes pulse      { 0%,100%{opacity:1} 50%{opacity:.42} }
    @keyframes chipIn     { from{opacity:0;transform:scale(.86) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
    @keyframes deadFade   { to{opacity:.18;filter:grayscale(1) brightness(.28)} }
    @keyframes twinkle    { 0%,100%{opacity:.55} 50%{opacity:.06} }
    @keyframes bloodGlow  { 0%,100%{text-shadow:0 0 10px #c83028} 50%{text-shadow:0 0 30px #c83028,0 0 55px rgba(200,48,40,.38)} }
    @keyframes goldPulse  { 0%,100%{text-shadow:0 0 18px rgba(200,168,74,.5)} 50%{text-shadow:0 0 40px rgba(200,168,74,.9),0 0 80px rgba(200,168,74,.3)} }
    @keyframes lineGrow   { from{width:0;opacity:0} to{width:100%;opacity:1} }
    @keyframes titleReveal{ 0%{opacity:0;letter-spacing:.9em;filter:blur(10px)} 100%{opacity:1;letter-spacing:-.01em;filter:blur(0)} }
    @keyframes subtitleIn { from{opacity:0;transform:translateX(-26px);letter-spacing:.7em} to{opacity:1;transform:translateX(0);letter-spacing:.22em} }
    @keyframes roleAppear { from{opacity:0;transform:translateY(10px) scale(.88)} to{opacity:1;transform:translateY(0) scale(1)} }
    @keyframes bloodDrip  {
      0%  {transform:scaleY(0) translateY(-100%);opacity:0}
      20% {transform:scaleY(.3) translateY(-60%);opacity:.85}
      70% {transform:scaleY(.9) translateY(-5%);opacity:1}
      100%{transform:scaleY(1) translateY(0);opacity:1}
    }
    @keyframes splashExit { 0%{opacity:1;transform:scale(1)} 40%{opacity:1;transform:scale(1.03)} 100%{opacity:0;transform:scale(1.07)} }
    @keyframes candleFlicker { 0%,100%{opacity:1;transform:scaleY(1) scaleX(1)} 30%{opacity:.82;transform:scaleY(.93) scaleX(1.06)} 60%{opacity:.95;transform:scaleY(1.05) scaleX(.96)} }
    @keyframes emberRise  { 0%{transform:translateY(0) translateX(0) scale(1);opacity:.9} 100%{transform:translateY(-110px) translateX(var(--dx,8px)) scale(.15);opacity:0} }
    @keyframes nightPulse { 0%,100%{background:rgba(3,2,2,.98)} 50%{background:rgba(14,9,5,.98)} }
    @keyframes scanline   { 0%{top:-2px} 100%{top:100vh} }
    @keyframes slideDown  { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes vignettePulse { 0%,100%{opacity:.72} 50%{opacity:.92} }
    @keyframes urgentPulse{ 0%,100%{box-shadow:0 0 0 0 rgba(200,48,40,.4)} 50%{box-shadow:0 0 0 10px rgba(200,48,40,0)} }

    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:var(--ink)}
    ::-webkit-scrollbar-thumb{background:var(--brass);border-radius:2px}
    input,textarea{direction:rtl;font-family:var(--fku)}
    button{cursor:pointer;font-family:var(--fku);border:none;outline:none}
    button:disabled{opacity:.34;cursor:not-allowed}
    .night-bg{
      position:fixed;inset:0;z-index:800;background:rgba(3,2,2,.98);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      direction:rtl;animation:nightPulse 5s ease infinite;
    }
  `}</style>

);

/* ═══════════════════════════════════════════════
ROLES  —  countdownSec = 15 everywhere
═══════════════════════════════════════════════ */
const ROLES = {
Mafia:     { ku:“مافیا”,       en:“Mafia”,      icon:“🔫”, team:“mafia”, color:”#c83028”, bg:“rgba(168,40,32,.18)”, nightActor:true,  order:1, countdownSec:15,
desc:“هەر شەو یەک کەسی شار بکوژە. مافیا پێکەوە هەدەف دیاری دەکات.” },
Don:       { ku:“دۆن”,         en:“Don”,         icon:“🎩”, team:“mafia”, color:”#e05018”, bg:“rgba(200,80,24,.15)”, nightActor:true,  order:2, countdownSec:15,
desc:“سەرۆکی مافیا. دەتوانی هەر شەو یەک کەس بپشکنیت — ئایا کارآگایە؟” },
Detective: { ku:“کارآگا”,      en:“Detective”,   icon:“🔍”, team:“town”,  color:”#4a9adf”, bg:“rgba(74,154,223,.15)”,nightActor:true,  order:3, countdownSec:15,
desc:“هەر شەو یەک کەس بپشکنە. وەڵامی بەڵێ/نەخێر دەگریتەوە.” },
Doctor:    { ku:“دکتۆر”,       en:“Doctor”,      icon:“💊”, team:“town”,  color:”#28a060”, bg:“rgba(40,160,96,.15)”, nightActor:true,  order:4, countdownSec:15,
desc:“هەر شەو یەک کەس بپارێزە. نەتوانی هەمان کەس دوو شەو پەیدرپەیدا بپارێزیت.” },
Silencer:  { ku:“بێدەنگکەر”,  en:“Silencer”,    icon:“🤫”, team:“mafia”, color:”#9040c0”, bg:“rgba(144,64,192,.15)”,nightActor:true,  order:5, countdownSec:15,
desc:“هەر شەو یەک کەس بێدەنگ دەکات — نەتوانێ رۆژی داهاتوو قسە بکات.” },
Bodyguard: { ku:“جەستەپارێز”, en:“Bodyguard”,   icon:“🛡️”, team:“town”,  color:”#2880d0”, bg:“rgba(40,128,208,.15)”,nightActor:true,  order:6, countdownSec:15,
desc:“هەر شەو یەک کەس بپارێزە. ئەگەر مافیا هاریان کرد تۆ دەمرێی.” },
Townsfolk: { ku:“شارنشین”,     en:“Townsfolk”,   icon:“🎭”, team:“town”,  color:”#c8a84a”, bg:“rgba(200,168,74,.12)”,nightActor:false, order:7, countdownSec:0,
desc:“هیچ تایبەتمەندییەکت نییە. رۆژانە دەنگ بدە بۆ دۆزینەوەی مافیا.” },
};

const PRESETS = {
5: [“Mafia”,“Detective”,“Doctor”,“Townsfolk”,“Townsfolk”],
6: [“Mafia”,“Mafia”,“Detective”,“Doctor”,“Townsfolk”,“Townsfolk”],
7: [“Mafia”,“Mafia”,“Detective”,“Doctor”,“Townsfolk”,“Townsfolk”,“Townsfolk”],
8: [“Mafia”,“Mafia”,“Don”,“Detective”,“Doctor”,“Townsfolk”,“Townsfolk”,“Townsfolk”],
9: [“Mafia”,“Mafia”,“Don”,“Detective”,“Doctor”,“Bodyguard”,“Townsfolk”,“Townsfolk”,“Townsfolk”],
10:[“Mafia”,“Mafia”,“Don”,“Silencer”,“Detective”,“Doctor”,“Bodyguard”,“Townsfolk”,“Townsfolk”,“Townsfolk”],
11:[“Mafia”,“Mafia”,“Mafia”,“Don”,“Silencer”,“Detective”,“Doctor”,“Bodyguard”,“Townsfolk”,“Townsfolk”,“Townsfolk”],
12:[“Mafia”,“Mafia”,“Mafia”,“Don”,“Silencer”,“Detective”,“Doctor”,“Bodyguard”,“Townsfolk”,“Townsfolk”,“Townsfolk”,“Townsfolk”],
};

const shuffle = a => […a].sort(() => Math.random() - .5);
const checkWin = players => {
const alive = players.filter(p => p.alive);
const m = alive.filter(p => ROLES[p.role].team === “mafia”).length;
const t = alive.filter(p => ROLES[p.role].team === “town”).length;
if (m === 0) return “town”;
if (m >= t)  return “mafia”;
return null;
};

/* ═══════════════════════════════════════════════
VOICE
═══════════════════════════════════════════════ */
const speak = (text, opts = {}) => {
if (!window.speechSynthesis) return;
window.speechSynthesis.cancel();
const u = new SpeechSynthesisUtterance(text);
u.rate   = opts.rate   ?? 0.82;
u.pitch  = opts.pitch  ?? 0.78;
u.volume = opts.volume ?? 1;
u.lang   = “en-US”;
const voices = window.speechSynthesis.getVoices();
const deep = voices.find(v => v.name.includes(“Google UK English Male”))
|| voices.find(v => v.name.includes(“Daniel”))
|| voices.find(v => v.lang === “en-GB”)
|| voices.find(v => v.lang.startsWith(“en”));
if (deep) u.voice = deep;
window.speechSynthesis.speak(u);
};
const stopSpeak = () => { try { window.speechSynthesis?.cancel(); } catch(e){} };

/* ═══════════════════════════════════════════════
SOUND ENGINE — Web Audio API procedural sounds
═══════════════════════════════════════════════ */
let _audioCtx = null;
const getCtx = () => {
if (!_audioCtx) {
try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
}
return _audioCtx;
};

const playTone = (freq, dur, type=“sine”, vol=0.18, fadeOut=true) => {
const ctx = getCtx(); if (!ctx) return;
try {
const o = ctx.createOscillator();
const g = ctx.createGain();
o.connect(g); g.connect(ctx.destination);
o.type = type; o.frequency.setValueAtTime(freq, ctx.currentTime);
g.gain.setValueAtTime(vol, ctx.currentTime);
if (fadeOut) g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
o.start(ctx.currentTime); o.stop(ctx.currentTime + dur);
} catch(e){}
};

const playChime = () => {   // card reveal / success
[523, 659, 784].forEach((f, i) => setTimeout(() => playTone(f, 0.4, “sine”, 0.14), i * 110));
};
const playClick = () => {   // button press
playTone(440, 0.06, “square”, 0.08);
};
const playDrip = () => {    // blood drip / night begin
const ctx = getCtx(); if (!ctx) return;
try {
const o = ctx.createOscillator(); const g = ctx.createGain();
o.connect(g); g.connect(ctx.destination);
o.type = “sine”;
o.frequency.setValueAtTime(180, ctx.currentTime);
o.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.5);
g.gain.setValueAtTime(0.22, ctx.currentTime);
g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
o.start(); o.stop(ctx.currentTime + 0.5);
} catch(e){}
};
const playElim = () => {   // elimination
[220, 196, 165, 147].forEach((f,i) => setTimeout(() => playTone(f, 0.3, “sawtooth”, 0.1), i * 140));
};
const playCountTick = () => { // countdown tick
playTone(880, 0.05, “square”, 0.06, false);
};
const playCountUrgent = () => { // last 5 seconds
playTone(1100, 0.08, “square”, 0.1);
};
const playDawn = () => {   // morning / day begins
[392, 523, 659, 784].forEach((f,i) => setTimeout(() => playTone(f, 0.5, “sine”, 0.12), i * 130));
};
const playNightStart = () => { // night begins
[130, 110, 98].forEach((f,i) => setTimeout(() => playTone(f, 0.6, “sine”, 0.15), i * 200));
};
const playWin = () => { // win fanfare
[523,659,784,1047].forEach((f,i) => setTimeout(() => playTone(f, 0.7, “sine”, 0.16), i * 160));
};

const POSTER_IMG = “data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHCAkIBgoJCAkMCwoMDxoRDw4ODx8WGBMaJSEnJiQhJCMpLjsyKSw4LCMkM0Y0OD0/QkNCKDFITUhATTtBQj//2wBDAQsMDA8NDx4RER4/KiQqPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz//wAARCATmArwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDyI0AUuMmlrUyClFJTgKACkpcikFIBKAKXFL2poYlOVRjc33R+vtQi7j1wB1PpQ53EYGFHQUAIzbjzRilA9qXFIQgxmloo60wE+lAGelOGOM07GJD2ApDsMHSl707AIJXp6elNx70wAUuKKXNIBKSnYp4QIMydD0UdTTAYseQeQAOpPanbgvEYx/tHqaRmLdeAOgHQU38aQBQBmlpQPwpgJil+lLilxQA3FAxTvyoxQISlxRSj3oC4mKXHNKBTwhI6cetICPFGKk2qOpz7CjgdF/OgBirk8c0/yvXA+ppcn3pMUxBtXuw/AUm1fc07FJjNADeP7v5mjPoop2KMUBcbuP8AdX8qXcf7q/lS4pcUh3Ggn+6v5Ubv9lfypcc0uKYDdw/uClG09iPxpcGjbQAm1PUj8KNg7MD+lLtoxSAaY29OPamEe1S89uKNzHrg/WmIixSYqbCnqCPpSGPP3SD+lAEWKMU8qR14ppFAxppMU4ijFACUmKd2oxQAzFJ3p1GKBiUBip4pcUUALtV/ujDenY/So8FTzTqkVlYbZM+zDqP8aQEQNB5pzx7DyR7EdDTc0wExQKKO9AXCkpaKAuJSEU7im0gCjrRQfaiwhCKAeNrfd/lSn3pKYxGUqcUdqevzDb37H+lNIxn1oEJ0oozRSGApKVaG60AIeKKDSdKBC0E0UhzTABxS9aUjBNH4UAKKDSGlFIBKOlBxQBTGLQBk4A5NFPPyL/tHr7CgBrHjavQdT6mgCgDNLQIKBj1oFGKQwxzS4p8YDfKevY01lIODQAlOc8Ae2abQaAClz7UAUZoAB1pQOenWlUZIAGSegp5ZYxhDlu7en0piAgRHnBf0/u//AF6jLEtknJNHWgUhhS4oApe+KYCfSlApcUAUCACl+lKKXFADcc0uKcFJPHWnbMfeP4CkIYAewp2zA+Y49u9LkgccUYNACA4PA/OlySck5pcUuKYDaXFOAp2KAGAUoFOxS49KAGYoxT8UuKBEeKMVJjmjaaAI9tAWpMetGKAGbaMU/FLimBHijFSYoxSHcjwKTbUpWk2mgCLFFSYoxQBERSEVKRTdtADMnGOo96TCn/Zp+KQikAxkI5HI9RTcVJ05HFKcHqMH1FAEOOKTFSlCBx09aYRQA3FJTsUYpjG4pKcaKBjTSEU6kxQAK23IIyp6g0rRjbvQ5X9R9abSqxU5U4NICOlqVkDKXTt95fT/AOtUeKYCUEUUvagQIMuvHeiUgyEqOKVfly3foKQAdSeP51IxFA6t0/nSY54pT6/p6UmaYCGjFLxSsuAPXvQA3FOPzjP8Q6+4oApBkEHvQA3ikp7AdR0P6Gm8UAIODS9ab3pwoEIR602nmmkUAGMUhpwNBoAD1zRQB60tMAxS0UdaQxpFL2pcUqDJ64Hr6UwFUbRuP4D1NNGTkk0rNuPTgdBSjpSADSUd6O9AC0tIKXvQAVI7hgWAwR1B7imYoA6/lQAmAaMUvTpSUAFOVSzAAZJ7UKCxwBkngAU9iEXYhyT95h39h7UADEIu1Dkn7zevsPaosUtL2pgGKWiloEFFKPWlxQMSlApcUoGTjFAhKeF4y3ApRgdOTRjPNAgzxhRgfrRjilA/KnY4pAMxTgKdilwaYDcUuPQU7FOxQA0LS4p233pQOaBDcUYp+3ml20AMwPSjFSY4pQtMCPH1ox7VJtpQtICLbRt9ql2+1G2mBFtoC1Lto247UARbRmjbUu0+lG2kBFtpNvtUxWk20ARYpMe1SlaQimBFikxUpWm4pDIsUhFSkUhFAEWKTFSEUmKAIxkdKCAfY04ikI4pARlSO1NxU3bBHFNYDqPyoAiIop1JTASmmnUEUFDMUYpxFGKBDVJVgVOCO9PZVdSyDBH3l/qPam96AxVgynBHQ0hjDSVO4V13xj/eUdvf6VF1pgJnP0FB60UUhDaAORmnqpf6dz6U7cqDCDPuaBjSqgnPI7e9NJ9aCckk9aKBh70mKdik6UEiLgEg9D1pGUq2DQetPB3Lg9R0oGRmig0UwA0UUd6QCYoIPtSmkP0oAWloYGnKAWAJwCRk4zj3oENxSgYpWADEA5AOAcYz70maBhT2+VNvc8mhCB8zdB29TTTzknqaAGilHSkpwGBQAUUtNJNAC8jtTsUrEsQvcdqCrKuTQAlFIKWmAYoxk4xQDUo/dJuP+sYcD+6PX60AB/dKVH3zwx9PaoutA96UUAKKKBS0gFHSigCnUxXEApwFAFPAA60hCBe56UvbHag5P0pQKAExTgKXFOFMBMUuOKdjmlAoAaBTsUuKdigBoFOAp4WnAcUCGBfanBaeBTgtMCPFLt9qk204KaAItvtSheKlCmnBaAItntRsPpU200oU0AQBfajb7VY2elG00AV9vtRt9qn2GjYfWgCDb7Ubfap9po2GgCDbSbfap9pppWgCEj2ppWpypphXnrQBDtppHtU5FNK0WAhI9BTcVMVppFAEJFIRUhWmkUDIyKaRUpHr1puKQEZGKSnkU0igBhAb600jnmnkUHpSAjPSkpxFFMBppop5FJSGNpKdikNMYisVYMpwRTnVWXfGMD+Jf7p/wpuKVGKNnqOhHqKQDKOO4zT3UcMvKnp/hTKYAScYzx6U2nYzSEYoAKQ5pfpSlcfeIHt3pAIKDSHrwfzo5oEPihknaQQoXMUZlfHZR1P61H6EfhTkIViwAJKlTn3pMYFACyAHDjjPUehpmKcvJIY8H9KQ5DYIwaBiUd6DnNAzigLC0h/GlFIfpQA/HFMp+CDSEc0wYh5pQMkAdaKcnygt36CkAj4DbR0WlxxTKevSgBnenUmOaKAFpQOdzdB29abQRzxmgAPXPc0q52sT06fjQD6qDSsxOM4wOgoASilpyKWbGcDufSmA6NQF8xxkDoPU1GxLsWY5J60933kAAhVGFFNxQAAYFLRilHWgApwFJTgKBABS4op4/WgQAY680uM80U4DvQAgFOA/SjFOAoAQCngUAU4CgBAKcBS45pwWmAgFPC0oFPC0hDQvtTwtOC8d6cFPvTAQJTgtOCHPWnhfegBu2lCU8AA/M4H1Naen+H9R1Lm1tbkr/wA9GGxfzNMDLCU4Rk12Nj8OryXBvNSWHP8ABEN7f4Vt2vw802EgzTXlyR/ffYPyH+NS5JBqea+WRSrCznCtn/dGa9ftPDOk2Z3RafDuHd1Mh/8AHs1ofLbriPCD0QBf5VLmh2Z4smn3kgzHDO4/2Yyf6VN/Ymq43fYrrH/XJv8ACvXzdOOkjn/gRprXUg6sx/E0ucfKePnSdQH3rW4H/bI/4VE9jPH/AKxJF/3lIr2Nbp++fzNPNwxH33/76o9oHKeJiMg43A07yz6V7PLbW10uLmCKUHrviU/0rOn8IaLcA408IT/FDKyH+eP0oVRA4M8oMdRlK9FvPhzEy77PUbiH/YmUOB+IwawLzwNrNsxaLZdp/wBMpMN/3yatSiybNHLlDSFfarlzZzWjhLiOWFz/AAyqVP61AV96oRXKU0pVgoaYyGkMrlfSmEVYKc96jKc0AQFaYR61YK0wrQBCRTCKmK00jrQMhIpCKkYU0ikBER60hHFSEU0jmgBlJinEUnSgYwikI9afimkUANwehpMU4000gExSYpe3WimAqEDKv9w9fb3pHQqxBppqRfnTYfvL9339qBkYoNHekoAf9yNSOrd6iPsP8aeH+Xaw3L6U07f4c/jSAASBwaTrQAT07UYoAWjtRjIopgNPpTj8y57jg008nrSqdrc8g8H6UAJzQOKGBVip7UUgENITQacEYjNAD80negdaCeaADBLAAcmlb72B0HApU+VS/foKZzQAEUA4NA60oFAxSM0nTmnYpcAimIbwfY/pRyrehp2zjikzgY6j0pAIwweOh5FFGfSjvTAMcVK4CJ5Y6nl/8KIwFy57fd9zUffJ60gACnUlKKACloxTqYgFKKBTgO9AgAxzS4opQOaAHDrTsUCnY4oABSgUAZp6j1oEAFOApQKeBQAgWnAU4LmnqlMBqrUqrSqtOCqOpxSAVU4NPVPpU1pbS3dwsNtE80rdEjG4122kfD9JNsusye/kRNx/wJv8KG0g3ONstPudQlMVnbvcMOoQZx9T0FdhpXw6klCPqlysQ6mK35P0LHj8q7S2tbXT4FhtYkjiUYCINq//AF6WSdmGN2B7cVDm+haj3ILDQNI0lR9ktIlk6eYy73P4mr2FZudx9M1T8/YByT6d6U3mDg8Gs9WUXQwUjaMfSpRKvdj+dZT3L/LjnNIt5h8N1pcoGjNIucZJP1qlLIB0PNQSXhlwGIGO/SojLnqN2O4600hEolJ7sMe1NdzjOc1X+0srDbx9acZy4xkbvQUx3JhNlcGhTzwTVXzijfMcH0oa+EYBUcnqSaQGmnBB3n8BVhApdf3hIrBOo4GcYNIupknhmT8OKVh3OncF+FcjjoTxUDxyLjcPz5FZttqIXbvKnJxuFaSXayoV6j1HGKQFO6RZY2juI/MiPVXUSL+RrmtS8IabcKZLdDasRw0Jyn4qen4EV2TuuPlbDHvjrVGVpFcGSM7T/Ev+eapNoTSPMr3w3fWRZtgnjXnfESePdetZOARkEEeor1+a2Vk3cAZ45x+R7VkXvh2yvGP2mMB8cTR4Vx9ezfjWqn3M3E80ZO9RsldDqvhu8sVaWIfarccmSMcr9V7VgkKehFaaMkgK9ajK+tWig+tRsoFIZVK0wrVkpxUZWgCuRxTWFTleKYRQBCRTSOalIphFIZERSYqQimkUARmmmnkUlA7jDTccVIaaaBDMUnenkU00hjoYjLuAZAVUt8zbc47fWozwQRTu2KQ0x3HONwDgdThh6Go8c1KjANhvung01kKuVbtSAjIpUTd3AA7mlIpKAHMwCbEHHcnqajxS0Uxh2xRR70ZoELPEYZniJRmQ4LIwZT9COtMxS9uABQKQgb5kB7rx+FNp6jBz2pdm00MY0J3NPo6VGXbPBwKACgfrS06Lht393p9aYCyY3Bc/dGPx70zFOPFJQAAU6m59KXg43cjIyM4zSAWnU1mG44GBngZzilBpgOA5pSobr1pAacKAI2jxzSKNzhR1JxVhRmmvF5cZlHVuB7etICOQgthT8q8D396bTRTqYC4paB0oAzQAopwFIBTgKBCjpSgUClFAhQKcBQBwKcBQAoFOxmgCnAcUwAD86kAzSAVIBQIAKeq0AVKq0ACr6VIEpypUsUbSzpBEjySyHCIiklj6CgCMBRkkgV0nhzwleazGJ5CLWxJ/1zrlnH+wO/1PH1rofDXgq3g2XWuxq9yTuS0JyqD/AG/U+3T61101wifLwcDgL0ArOU7aItR7lfTdM07RLP7PYRCIH77nl5D6saWe6VRjdx2qrLMZXGGwg6n1qpPL+8DAZbsD2FQtStizNdHbkDI/SqzXgXl+naoJ5HCfL8ze/QVVeMhQ7n5jzzTsK5ee/O5di5H5VVa5kySwILdqruSkfzjG7pmlto2lbbz+dLYZPHeyKMlsHHSqUt7NvOXIJ61qCzt1UMw3N79KDDb45gTJ9RRcClFK5UEORn1qyt1j5WA6+nJq2llF5RO3BxwB0qg1tL52CvT0p3FYs+apGGOfY1C7bWBVhjP4ihxtJznd3B4pTAot1JfdnqM9KAIZHEi/LyQabIwI5zuq3bQIxIJA9jUtxaxqgH8Q5+tFxmWSTgMcU8EDheanMav0TinrbbZFPCgckii4WK8OBOAQQM81u28iqMtxnv7Vju5acgDJ9fWr8TAWwLDFJgjT3B0wcfSjYquu2Q5YcqTVKFzJwTmNeo7ipi8ZIGAwPY/z+tSMdJIVVlZcgj7vrVOKdWyqHcvdH6irqAN+7IDKBlfUVRuocN1xn0phYnREGHDFR39RWLrPhi01AtLEEt7k8+Yg+SQ/7S/1FXY3njbaDvT36ipS0kcg5/dno3YexpptCsmeZahYT6bdGC7j8t/4SOVceqnvVQgHvXr95YWuo2T295EJIn5x0IPqp7H3rzzX/DsukHz4WaeyPHmY+aM+j/49K1jJSIcbHPsvFQsvpV0rkGoXSqsSVGWmFasstRMtICuwphFTsKjYUwISKaRUpFMNICIjnimkVIRTTQMZ1ppFPNIfWgLDKaacaTqaAEFG3NOApCcUDDinf6yP/aT9RUeeaAxRgR1H60AhDTfWnMMHj7p5H0plAC0rABiAwYDuO9M709YyTzxSGNzQBmpfL9KXZQBEFFO2gU/aBSHAoAbilb7gPccGkYk0Jy2D34oAYcnrSEU8jBxRigCPtTz8qKvc8mkRdzAdqHO5ifU0wEJ5pDmjFLigYCjNFSK5EZTjaWDdOc4x1/GgQwUUuKUDigEJ704GjFAWgZLHkkAd6sZD8fwjgVUBKqT3PAqeA8UAV5F2SY7UlT3I6GoKQhR0pwpBThTELTqQCnd6AACnAUAU8UEhinAd6BTgKBiqKeBQBTwKYCgU8CgCpVXpQIFFTovNIi1dsbWa8uEt7ZN0j9M9AO5PsKEAljZz315HaWsRkmk6KOw7knsPevTfDmh2mgo8gYT3rDbJPjhf9lPb371n6JY2+mnybZ987f66Yjr7ew9q0Lu6CZVW4Hes5Svoi4rqW7i6zIcNk9zms65vBH8oOWP8I/rWfNO0kuzdwOwPerEFsix8tukPp2qOWxVyvNcSs2eijqo5zVi1EkzGSRTGOo3dTV22tkRWd8bui8VDO+w444607isOneM9Fx245Jpp2HaqkB16t6UyJgzFidoAyfaqM12S5WBlA/vNQMu77OGTE2085Jc5JqzJfW8sarbqqoeuBya5qWIb93nCRz1IqZBGGBVjGAvOecnvUtAS3iX08+Fl8tc8MGwAPpWnCGS3RGQzOBgyE4zWS5kZcpkhRlvUCmKzlQPMPtzTEdNDL5ZUsdqkfdNPdkkYAcEHnPcVgx3MyoimcsgOQp7VpCQyqHxlCMKwPeixVyW5VCuF+ceh/wAapLuEmBkKecGtFWQxKD94nrSFADk8KRSCxWJZQCOQe4pPLmfDbSU7Y7VaSJfvBuvAGOtSlzGm1Vyfr0ouBW2qoOz7xHOelV7nCYG7k+lTuWDEkf8A1qqyzSK5wAMdjzQMfHJGUx5bE+oqx8zQDseozxmqHnlJeGHPOFqU3RZRz8melAicBuSpznvT13YG0g++abG24bioPb3qkty0RkDRgkHoeooA1o3ZcNnnHFSBfNi3gk+o7ioNPkM0Dbuvp/hUw/dgOSMEcHPWgAWQBRuBZl6HoRUj4GGjIww5yODUcQLyHPTrzUyY5XFAEcny4aPK4OCOw/8ArUolUjDryeo6j/69WUj8yNh1qo8JXjn0zQM43xL4dFsrXmmxfuOssK87PdR/d9u30rlWXI9fpXq43qclgrjuOjVyfiXw6yF77T4jtPzT26j7vqy+3qK1jLozOUeqOOdahZauEbhkcioXWrIKjL7VGwqw61Ew5oArkUwjmp2HtUZHPSkBCRTSKkIphFADCKb3p5phoGNPWgAYpetDdKAG0xqcaYaXUaG570ZpTTehqgJMhoiO68j6U1ImkPAqa1iLShm+6OvvVqYrD8sXIHQ0hkKwKgycZpCVqN2dj3qPDE9DSAkLj1phb0oCGnbcdqYDDmkxmpMe1IVPpSGMxR0p+2jaO9Ag+982OvWkOKdn5CB25qEsc0AKpwjn14pmKefuqPbNJ3oGJilFHvSimAmPWlxTsUuKAGgY60velxzS4waBABSYPbrThTlHO7+7SARxkgDooxT4VIpFWpV6UwGTfdquBUs7ZYAVGOOlACinUgpwoEOHTFKOtIKeKBMUCnCkApwHNACipAKaoqRRQAqipAKQCpFHFMQ5RUyLTUWrCLxz0FACwo0kixxoXdyFVV6sfQV2Nnbx6VZlY8G6lGHkHQ+w/wBkfqap6ZbQ6bbiedd1444XP+rB/hHv6n8Kk812ZnkOST26fQVEpdBpGhDcNEm1T8x5J9aoy3M1xNgk7R2p8RLkqCAMZYmtDS7SIqsko3jOfrUIshsoSxUlSSegFbMe1I9pVc9Scc02MLCGSNeCeuarahLtsSw6ucDHp3qW7lJEtzqttGRHGS5zyQeB+NZMl+/nEgKQOme9Z7SBX/pTZpVxuXrjpVJCbLV/qkbDZECAfvVTScO3Axn1qrIufmOeadGufxp2JuaSFQCTTRIwPygYqBXbcAfzqdME4H4UhkjlAys+cdwOtAYY68ds1GePvD2qSMZwB0PQGgZYCKQCD/8AWq7bTS2zH5VZWxlWHB96gjRcDBBX2qzhFUFjntSuFi1E++XOcZPSpmm8l1TaGUjjPas7zMSqFPHepVycNvGAeRmnYLmnFvzvIGG6ZqGQyRyuflKjqSaeXKxiV1B44rndTvJGkdIzweCBUlHQOYjgblbI6g8VBII/LZGBKnpkVzMcsiDliB2FWkvJc5dyc0WFcszZjOI1J/2gKWEhkzK232qJbtIwTv57CmTy+agcHg9apITL8FwWXA/h6D1qpePJ53IHpmord1WVWD9R8wI6VryRCUl4xjAAP09aT0Dcp6fNOhOwgYPrz9a2LOYXBZZkw27PHT8KzILVBKvmbsA5G2tlLdTiRDx0Bxj8x2pMpIuuieWCv3R09RVVwfMDA4IHPvU/zCMKRz/OnogI2v25B9KQDI2ZWOwjI7HvU0m113EYbvUMYPmv1x39qlzl9qgHI6etAGfMED8549Kkjb5VGQ2OVcU6eFeoJBH6fWo418vjoQckf1FMDjPF+iG0kfULVP3Dt++jA/1RPQj/AGT+hrlCM17RN5VxGEkVW3KVYMOGU9jXmXiPQ30i9xGCbSQ/uWPO3/ZPv/MVtCV9GZyRzzqagcVckWoHB9KogqsKjYVYYdjUTDtQBARTCKlYVGaBkZphFSEc000gGDFNandqa1ADDTTTz0pmGJwKAGkE9KfFExbpmtCzsCy75TtU/ma0AIIVxGg+tIoyxDOy4C4FP8h9g3AZHFWZbsDIHWq5uXdsZxnigZGYcdRSbMdhSM7ZwTTdxoAdtPoKaVNLuNIcmgBNuOtIcClPvTTigBDTDTmpppgMHB5qJztYg1Ix7U14WkIYemDSEObBY46dqbS4o/nQBIG/dbNqZ3bt2Du6dPpTO/FGKKYxwpwplOU0CHYNJjH1p6c9jUu0HqKBlanjhB6nmpvs4YgDqaHhbPTpxQIYKV22r703leoNPSVGGHWgCrkls0o5q2bZH5Q/hVd4mjbkUCEHSnCkFOoEOFPFNUU4daBDhTwKRaev0oGKBUij0pFHNSKKYDlFSqtNUVOgoEOQGtbSoUjVrybawjOIoz/E/r9B/OqthaNdXKQodpbq390dzWldmGKRoYkBVQACf4QO31PU0pOwLUBKzsWJJdj1PapUkz1+6vSqQZnbPAJ/QVYHYdhWRZI8zEFVyAe1bGnyziKMElQq81iAM0qovAJHNdCsioiLjgDt3oY0TpKxdcnr1+lVtbuoVgihTO5eaQhlhmk3fKBgVh37/aldS7Ln5QyHBHuDSSux3sMkbc4xn60hVs/OeK5TWY9Z0xhLHqM81oTgPu5U+jf41nNrWrMuDfzEf71aE2O9zt5JpfmOAo59a8//ALW1T/n+l/76oGr6qOl/MP8AgdKw7HohDKwx6c1Yi2/xA59q8zOsasSCdRmJH+3TxrWrcA6hN/33SaHY9Kl3dj3/ADp9u+CM81i+HtWbU7RvPK/aIcK+3+IdmrTTIkPPFJCZoiTYxO3rUqBpD0z6gVRacyOgxgqu3Hr71ch3IwPQ0DJri3lRt6SDoOfSo45tsqoSWYnrV0gywhc4z3qqIBDIGGOvWi4rGjDdgWzickxjjIFczNMPPkfoCTge1adxcr5MIiOTg71zjNZTqJNxIGfUU0gYCRW25608uuMY5qBE2/N+VPj5Y0ANzzkirSFmthjgmogu7hRzXOeM9fm05xYafMEuEANxKnJQ9kHv3P5UDsdKNyc5rT0/VSrgOgLAEBgcfnXjo17WiP8AkJzH6tTl1nVQc/2hLn/ep8tw2Pc7d47hG3YJHT2NaEYYKpzz3NeAr4g1tOU1S4U+okNKfFPiL/oNXf8A3+ao5GNM+hkUhcE/L6VJv3Ebugr55j8XeJyRGutXrFjgKJSST6V654P0jXobBbrxDqtzLcOp22jOCsYP971b+VJqwzro3Ro36bux9arLIpkGe3TFVZpfJhy351H55T/WZ9VcdxUgTyXLtcNuUhQdpyMUpeLgLksOAMVB5izTlck7Rnp1FNuphCwG7k8qw559DTQEzSo2zaclThsHkUup2UWpWMlpccK4wGxyp7MPcVnxXEUkjurBWb5kLdiOoNWra8WZlJyOcY/unuKeqA8v1OznsL+W1nGJI2wSOjDsR7GqMi16N430v7XYrexKPPth8+B9+P8A+t1/OvP5F/Kt07oxkrMpMPzqJhVlxyahcUxFdhUbCpmFRMKAIiKYwqVhTDSAjIpjdKeRTT0oAibNX9NtdzebL9xe3qar28JklA9a3UiCRBQMKooKIpH3NycAVnzylnIXIX+dTzNl/YVXfk8UhkJYcg1GW9Km2j0pjID0FAyN2JYN/eGaATmpkjBTkcg0oQelAiLtSE4qVsDtUJBoAaW5o5pdue1KFxTGNppNONRHrSENJ5pwJA4NKFzTiuKAGshX1+lNqypDdT+NPECPQBT/ABp2Kvpp6OeHqUadEuBvFMLGasZY8VZS371oCzVBwQaiKe9AyERAU8LTttOCUAIgwSfQU5Tz0p6x4TPqacsY9KBCAI3BQH8KbJZRSdDtPvU4jFSiLjPWkIyHtZYG4yRUiOsqGKUdR19K1lAHDgFe4NMutPjx5sXC/wAqdxo5/BVyp6jilAxU1wmJGbr61EKCWOFPA5pop4HNAhwFSKKaBUijmgY5RUqimqKlUUxDkFWY1yRUSCrtpEHk/eZ2Abnx/dH+cUwLtqptoy+SrSrz7L2H49fyqJMZLE5yakurgSgJ/GTufjv2H4U2FBjc3QdqybuWlYkj2jBbvzUsWZJM9hzUAOWz2qzDxnsKQFmFgLkFhkDtU7EFlyx8vpgHmqisFJNICS2XPyihjHXszKNpJBfnbnoO1Uwm5uT70t1uafcec9KlXaOCQPehaC3HBI2iaKVQyOMMp5BFeda3pp0zV3gGTCw3xE/3fT8OlehsSZABxXOeLovNtYZsZaKTBPseP54ppjOUU806kFLVAFFFFAy9oWpNpWsJORmE/LMvqh/qOtekjbI+6J/lPIx0I7V5P713vgK/e+R7KY5ltlBUk8lOn6f4VEgOiiiCjcRuZjgk9hV1AikDbg9OTUjQL823nHJUn+VRSRMQJMgAds1AWLaD5TucH6U0xs067TyeDmsyWSSJsgfN1wT2q1ptzNJJuWI7lycetNDIb6Dy5HTeS3uMVmRvtLIfXnNbl0xn3POwUEcVz7sDK2G4H61SJJnKkcDFLFnnFVjIc57elWrYNIyxxjLueMnGPqewoYINU1NNH0me/GFnRdlsP70p6flyx+g9a8pyzjdISzkksScknuTW74t1WPUdRMdnJ5lrbqY4nHRz/E/4ngewFYdOKGNxQDWjo+mC8drq7fytOtjuuJM8n0RfVm6Ae9UZGDyOyxrGpYkIpyFGen4U2wEFRzLmNsVJU1rbNd3cNrH9+eRYx9SQKLgehfDTwzHFYjxFfDMpYi0RuijoX+ucgV6SkyygbGPPXmspoo4tJFrbt5UMIWOMegXgCotPmKSjdwvfBrHcov36uYu42n0z+Y9KQfLEFI7cdxVuaW3luFSJwzFeRUq22YxhenGPagChOvlQSyqNrsAQay55fMnLevJHoa6K4hX7G6ZPArmLhRApI+8apCZWusKAUPOcmpLTUIoyPPBDgj5xVWXIHJ61UbG/DDKt1qrXJudxHM0qHfjcvpyGU9DXnniHTBpuqPFGP3DjzIfZe4/A/wBK67w/eB4BEWy0YwfcU3xLYC709wnMttmWP3X+Ifl/KlF2Y5ao85kXmoHWrkgBPFV3XmtjIqMKiI5qw4qFhQBAw5phFTMOKjIpARNTGFSkVG3Q00Be0aPdJn0FaV2fLiA9eaqaDjDetWNTOX/Cp6lIzJW3PgU0rjvTsc5qNzubYOtBQ0kbsDrUiQljkmr1lpxePzH+WMd+7fSrf2deiKFHoKVwMxbfnGeoxTWh44NaZg2tTZIRk8gUwMeSMrURFaz2w25qpNbY5ApgU2GKY1SuCp5phxQIiahUJ5NSBRTj7UgIjgCmcmphGT1pflXgUxjVVOxxVmCLJ4qOOPPWrigIm1Bz3oAcWCLjPH86YspzwKBHuPNTCMdAKAEViaJIsrkVMIwMHpThs2nLCkBnkYpQcCnSSRjIyT+FQGYBgACc0wLPmEYHpS+e1UnnJYnHWk84+lAmXfPapYrhldSeR3FZwmPcCrEM8ZKgnHPSkBtlAQD2NW4QCm0jtUUQU2gZeR0qWEgsAKQGLqFnskcqPlbt6VjqMEg9q6y8UOkmP4cmuWbHnuPQ00xMcop4HNNX2p60xD1FSKKYtSqOaBD1FTIKjWp4xTAkRavwyiGzYkYeQ5HuB0/Xn8KrwJvkRO7sFH40+ZHa5kcD92h2rj0FKTHHcekZSAyt1J496ljbcm0DFQyTM6Lu4VelOgy5O0hQBkk1BRYijLHAHJq3tXhV7cE1EpVYRtyWb7uasowVV8zGQMcClew7DCgB6HApWKgZ/SnOyySYj5U9M0yVVDBQecc+maNwIyolccYxSFc5bH0qZDGjcjdjrUTyBuFoAjUkfMegrK8TRBdGkYHILqQfxrQOS+RwPSqXiJ1bw9Ko6qy/zFAjiB3paQd6dVlCUUUUAIcVNpt7Pp2pRXduSskT5HP3h3H0IqL8OKSluB7Zpd1DqVhHdwMfKmG5c9R7H3B4qw6PJkBTkdSeled+AdWkiafTWPBJlh57/wAQ/rXeW7yhAWLHJ5BP8qzasO5ZW1WaVH2k7cj61ZMAgg2qgUgYBB6A9qdaz7WJZVRuwByafIyywvg8UrgZGozfuwr4wBiuanVY3aVmHlIMk+lbOq3dvbWrSXk0cMYON7nGfYetc9o10dZvHn8ny9Mt2/d7+ssnqfYenvVITJrV3lUtINu7kLjlR2B96q+JNYSx0aaxt3H227+RyOscOOfxbp9M+tblwsFjaz311gQwqXwDyx7L9ScCvLbu5mvLua6uTmaZy7Y6D2+g6VSEV1PUHgg4rU0LSpdY1BYY1JiXmVwcAD0z6mq+lafLqeoLBECEGDLIP4F9fr6V3uo3KeG/DXnadGkLyMYbf1Bxln9yBjk9z7UN9Bs5/wAaPDaSwaLaCNUsuZhF0Eh4x9QOvuT6VzAAUYHApSxf5iSS3JJOSc880GmIBWn4c/5GXTCRkLcq2M+nNZfetDQ2xr1ljr5oo3Ge0X2Z4WaH5WJD8Hg1mNM6IrAbSeCKT7WrW5Rmx7VVmcAqB07c1mkDNTTy1xNvJ2snPH866mzuygCyfMufxrg7e4a3u0kz0OPYiuqt5FkbAJ3DseMUmgTOj/0eRWYYbIx/+uuX12JFTITa6tg49K0beYRXeN3ylcMDVm/t47m3AYAhuM0k7FHBT7tuSMrnGaqyDP1FaeqWjW7EAHbn9ao7dzcc8ZNaJmbNDRI8S+aDhl/L6Guilw0IljwSo5HYj0rA8PlxcSpx5ZHJ9D2rci/dMYhkoc5BHTPape5SPOtUtPsl80ajCMNyf7p/yRWc4612XimzU2cc6Ab4Hw3+6f8A6+K5CUVsndGbVmU3WoGFWnHWoGFMRXYUwjipSKYwoAiNRsOKmao2oAtaTJsZhVu4JkUOec8VmWzbJOOtaMRzG6nscipe5a2K2AM1NpVl9oudzj5c5b6UkiYB9K1tHAEJI6k4o6AajQrsVVACgYA9KgkhCLnFWg4GBnmiZQ8TAdcVIznruZhnbWZJctjk+1aF8MHj8ayiqlWZjwpqgFW6YdCRU8d0GPz/AJiqTOnZSKaCvZsUCNGWGORcjFUZYCp+XmnRSvG3Xcv1q4AJFyKLjM9RgU8Jk1YaNSfemmMqOKYELDAwKZ5dPf5TyDURk56GgC5DEM5z0qykf50+GDCZYgAckmqtxfomUt/mP949PwoBluTZCm6RgPQd6pveEk+WMD1NUGd2Ys7FifWgbs0gJ2kdz8zE1ctRlGPpVBcg1oW7BYWJoAqPgsfWodpDA9gCasTAFjiokJCuD6YpgyD60ZpzCmGgQhb2pUzvFGO5qWJcckfSgTOl0ol9JZj/AHqswHazH2oij+y6VFERhioLfU80yJSQTnrUjQlwwW2mY91xXLuB574rZ1WXa4iVunLVjD7xPrQkDHKKlUUwCpR1xVECr1qZKjH0qVKAJEFWIxUKDirMYpoC1BEW3PyNnA+pq4yCG1YBsOeMfzpbUFLaHKn52Z+fyH9arXyGK4MZO5iMn8aiTuy0tCqX3nGelWICoHzDJ64zVRMAEHknvVq2KkndQ9hF+BRJMpk6EjnFbN5axxWyYyWbn5vvY9/Squj2/mSKcgZ/vHp7mtfVo7JbmMWsxkIXEsueHP09qy1bLRjooU4Az9e/tVWUAO3pn1q3OGTODx7VTmjL7cNknsKtCbIpT8wIzg03aRyPrUyxF1YcfKOe1TLGjBRkhR196ZKI/IxEJR93ofrWJ4lQjRpGByu9c/nXTBTsyqjb29qwPFL/APEhmITGWUfrSTKscIOppaapyTTqsYhpKU0GgA/GikGKKQiS2nltLlLiBtssTb0PoRXtXh++g1bQYtQhkDO4KyBusbDqv+exFeInpXU/DzWYtNvZrC6bbBelSrk4COM4z9c4/KpmtBo9KhxEvJPJ4NJJKVn++EXB3ZOAB6n2p0sa+U4Zhz+GK898Z6yUJ0iCbcetywPQdk/qfwFRFXGUNall8WeJlhs2YWqnZCW5CIOrke5/pXa6bpTReRp9lA6xoOB6+pNVPBGjrH4eS924ubolueuzPyj+tVPG/i1oLKXw/p8h83cVvZl4wP8Ankp/9CP4VfXQDE8ba1Hd6j/Z9jMJbS0ON6/dkk6Fh6gdB+J71zdnBNdXEdtBGZZ5X2oi9WJqunEn+9+len/DzQEggGsT7WmlTEK4/wBUp6n6n+VNuyC1yfRdCj8Oae5ndZZpRvuJQPljVQSef7oGT71wfibXH129DohhtYU8u3jPZc5JP+0x5P4DtXe/EPVFtPDcliJgLq+ZRtB58lTkn6Fgo98GvKUG1QOtKKvqDJF6AVPaWtxfXcdraxNLLJwFX+Z9B71FaRy3l2ltaxl5XbCr/X6V1+qNH4X0JbK3Uf2hfJ+8l7rGeC31bkL6AE9TmmI5S68pZlit23RRfKH/AL57t/h7AVZ0P/kO2Z/6af0NZ5HzAjjHFaGhf8h6z5HEn9DTA9ClLeXuAwM8/WohIQMUsrmR2AOB/OgAdxkikSIzBlGOPWtGz1C5t4SMB05C56j8az1KgMcc9MVN5nBjj5DAfnQwNu21tJXUSIxlJ6AZrfsLnz1IPHqK52NI4bNJFhCyj5SD1PvSQak8DbhGTk84PSs2i0zev7RJtwlDHnkg1iS6Xi6JhcLH3B6itu3ukuAGWQGTGSBRIpkAJXOKSdhtXM+CJLa3+VQOPmPrRJK37vJOGbaW7qT0qae3EkTx7iA3JP8ASs+8tpIntImk3JuyxI+9jtTEaF5ALyyeNhh9uyQeoPf+tecSoyO6P95SVP1Fei6WSI8tuKkbQCehHGPy5rjvEcAh1mcqPlkxIPx6/rWkH0ImupguKgYdatOKrtWjIK7Co2qdqibpQBEelRsKlNMbvSAjU7WBNXomwgcdR1qkRxU0EgHDdDQUi3vBHsav6a4jYpng8isl8jp0qRJWChgen6UijorlWKCWM9OopkN3xtb86o2urKMLL0Pcf4VLMisfMiYFD6UgG6nA0qF4/vdx61iLF+5cH1Fb0c+E2tziqjxo0x7K3BqkwMmeL/RzjsKoZ4rcuIGiyjjgjgjoaxHXY5U9RQDE3EVPBdtG3PIqCjHrRYRspIkihs9acYz26VkRSGM8Hj0q/DcBh8rYNIdyYx56imG1UnO0VOs+Ov8AKn/aY+6CmBlXd68/yj5Yx0Uf1qqASc0nHc0cUATKqAZdvwFPPkkcMw+oqs3saCrIxDZBpDJhwwwQRV+Jh5e096zoverbH5EpkjpU9KhZT5Z9c1Oc7M9RSjaUXI65pDRQyT2pvzZ4WtDyR2IqSONc/Nj8qAZRhhZmG4cVv6NYAyC6uAPKj+6p/iNQR+Sv8OTUxu5CAoOFHAAoJZdvpw7jB4qnPerAm1DmTt7VUu5X3qc4BHaqDvluKBoJXLuxY5LHJNNA5pO/NOApksetPHJpi1Io5piHqKlQVGoqZKAJkFWE4GfQVDHV7TojcXkEX99wD9M80AjduBHDa/7MEaRLn16k/wA6xblvtV5PMvCA9fQVo61MvlG3XO7zWds+/Ssd32WhQHAduT7CskakBf5vlHPbPYVbs2JfLn8az+r5xV6DoSapkmzFOQu1ThT196mEoC88+9ZocAj0qTzD0ByvWpsBoRjzflBB+tVpY5YnJXhl6Y7Utpu3AtwDU8sTNlycY6EdTQOxQyxJMm4HOdy81PCWY/K25TwSKhMkqnBAfHpVq23M+549oxw3ehghUjkRsMfl9ayvFsQXwvK/DZkXkdua7C0t0e381nUsOq4rmfHQEfhudF2hS6H3+8KlblWPMlp34UxDyadmtCRat6VYSarqkVjC4SSUNsJHGQMgGqgra8EuV8caZ0wWYfmDQ3oNGPLFJBI8cylZEYqynsR1FMFeh/FbQxA0Gs2kI2v+7utv97+Fz9emfYetedI25ATQndAOpoXqD3pcmjPemB2Vz4xc+HrdYJGGpbPLkY/w443e5I6VjeGfDt1rl+LmWJ/7PjcmWVjjef7oPcnvVDRdPk1jWLPT0fY1y+3dj7o7n8q92/suHT9HitrcJBb20e0FmAVR3JJ/U1DdtEByuralLoOiTXdu6pICIbZD03kdQP8AZHP5V5LgmRyxLEnJJPWt7xZrh1fVisD5sbbKW49fV/qx/TFZVnaXN7cCCzhaWVhnCjoPU+gprRXAl0fTX1TVIbfBEQbMrj+FO9ezJcWNlp8txJN5dlZQ73UHlgOFQe5OB+Nc3oulRWMSWsCjzHI3sf42/wAK5HxTrj39zLY20m3T4ZMAL0mZeN59e+B2pW5mFzK1TULjVtSnvbo5klb7oPCDso9gOKpEso5xgUBirYHTFel+G/CL6ZCl/qdsktxIoaNGGREOo/4F/KqbSEQ+ENCg0i3lv9XkWP5PMmbP+rj67R/tH+eK4vXNSfWdVuLyQbBK+UT+4g4VfwGK634iajssINPA2y3DidwOyDIX8zk/hXBDg0kMkFW9GP8AxO7T/rp/Q1SFXtEGdctB/wBNP6GqA9BUHHHWnk5X5uMUJuXGBxThkyFnwFx1qSRiqW3HGBTkBDqR2NPiPyMVTcSPXpQJCfmxyPekBcaVnuSqFiM8BjzWnDbxuV8zAYDkHgNWTDhplePJJq7Oz27hCcE56+tTYpEBnFncuIhjaSOe9adhq6Txnf8ALIOGGf1rBlJZ8noaqjcshYEqw7inyhzHaSOGBUEpkA5FRXcnmRAkDn5l9Nw7VzUeoXDlFDkAAZyeprRmleKxlVT/ABAgH0NTy2He5rwyrDarj7jPkeoz61zXi1P38EnqpU/z/wAa37dUaDk9eGA5xxWZ4ki3aaCBnYQfwzj+tVHcUtji3FV2FWn6kVXccGtjIrOKiPSpmqI0gImphqQ1G3SmA003pT6aRSGSxS44bkVfhgVlJXoayiPTrWxpKsyMT0FIpGbOhST0qe3uJYfung9vWp50Dzv9ajSIk7etMZbJ3oJMY9qWMbjT5V8q2UH7xqG3I8wikDLDgSQ4PX1NYl9aMz5i5buvc/StqM/MVPQ1VvISPmXn2ouM55sqcHII7Umav3ce8b8fN61RIxVEjTViGIqAzUttFk72HAqWRst7UAOWfbweakE8Z/ixVQkUwgUrjIQDRiijmgY6lJJxk5wKQUUgHxN81XwN0K1mDg1oWr+YhT+IcimJD1yOD0p0oCBPpUifMOafIm5cEcYpDK8b+tTbkPTrVZ0ZPcetKrUCJ+OxpytniowQelL0NAi4kK3EezIDr0z39qz7ixlifoR7GrccnHJIx3q9FdOq4cB09xmgRgeWw6qaAMV0ZWynH3PLb26VXn0s4zG2aLiZjipBUklpKhwRUYUjrVCJFqZBzUKVYSgCaOtfw9Hv1W3POFJP6VkpXQeE1/04seix/wBRQ9EEdyHXMG5mI7OFH1rGm6Kvp/OtbWGH2mV0BKrIevrWUAGPPPeskasjA+b2q3E3y4PrVb2OOOlOiJ3YyetUQXw25sCp1O4AFcfSqCH94CTgelX96mL0Ynge1IZZgf8Ah/StCJwVJZcgLgA1m246EjpWhFG5LMPuseBUsopPEyvkjjPWrQcPIix87erZqS4jYwtjOAOKzkZ0l2gbRnmnuLY6VNqRHY+4jkg1geP1U+ELhuMh4yDj/aFattMIFKs4k2nnb3rG8cyq3hSYKPlLpjP+8KjqUeVpwTTqaO9LmthDlNbPg3B8a6YD03n+RrEFa3hBseMdOJ/vn+RpS2BbntOqRR3cElvOPMikQpIvqprw7WNJm0fUZ7SQ5VDlH/vIeh/z3r2Oe4Y3pQcZA/GuV8fad9s0kXkbbZ7QEkH+NM8j8Ov51nF2Gzzg0UmeKu6Dpc+t61BYQHBmfBb+6vc1qyTtfhTpQ3z6vcxgsD5VqW7f32H06Z+tZ3jzxg+v3X9n2b7dMgc4I63DD+I+3oPxqt4t8SO8z6Nosht9ItR5C+Xw04Xgsx9Cc8VysY5qEuo2JKNpVvevTvAmji18ODUmJa41HIUDosanAH4kE/lXHeGvDtx4k1ZLWI7IUw08v9xfb1J7V7mE0/TdM/fGKzsbNANzcKigcf56mlN9AR534y1CTRtNWCFhHd3gZdw+9HGPvMPQnO0fjXmcefLz71s+LtZXXfFN3ew7/sxwlur8ERrwOO2eT+NVtF0bUNd1KOx02MsWPzyY+WMerHsKpaK4G58PPDUviDxCryRj+z7Vle4dh8pxyE+p/lmvXPGGoppmmXN0salbaIvszgE9APzIq5o+lW2g6DFp9kuIol5fHzOx6sfc1yHxMvo4PA7RSfNcX0yxrnqAvzE/yqN2M8hv7qe/u5Lq8kMk0hyzH9APQDoBTbaGW6uEhhVnkdgqhRkknoB702KN55I441Z2kIVVAyST2FdrdaefAuhmaV1Ot3oMUe3lbZSPnIPdsEDPbPFaEnJ3kCWty0CurmI7HkU5DN3x7Dp+FW/Dy7vEFkP+mv8AQ1kr1HPTtWt4bP8AxUNl/wBdP6GkM9GwAMHpnmnNGgZRnq2KCASOKdbwNcXSqOF9R2pLQRbm0O5EbNAdsfVyxxisyK1nfBjRiCa7u4Mf2OOPex3LiQHvVJYERf3WQg5IPFLmHymFawkIgAPnFuB04FVruWR5w5PI5x7962rsqLZ5VUeaQQuOoJrCxj5Ryx9aE7gwmOAG9ahlbKA/nUspxE0eATxhqgCHbgng1RA+KMZyehrbt4xcK0R5Up1rLtl/eEEZGKu2zMsq7ScZ5pMtGoYjGzNwu4AMAc8iq2qxGTTpmJyNrLj04zU4Y7gcdFp12nm2cgAxlSP0qVuN7HnUn3j9KgccGpyCCQeoGKhbpW9zEquKibpUz9KibrQMhYUw1I1NEbOwVRkmkAzFG0kcCrtvp8sh4G5vTsK1LfTEhAadtzenYUDRj2enTXDZA2oOrt0rVwLeEQWwLHu3rVmR1PygnaOw6VDks22NeaVxldbZh7u3araWyW8Zkk7dfc1KiiBCzkbscmsbUNQaZioOFHYUblDbu93sT79KS0mEkmOjCs8n19aIXKSgjrTtoFzczh8+9LcDj2NRQt5mT6ip5QfKU0rCM6ZRjnoetZrxYY56DrWncdTVJ15+tNANRvkwKidsE5NLnCmq0hyaQhzSegphc560mKQimA80g61prDFKvK/iOoqvPZmJsjlT3oKK2eaUGkxgkU5aAFABp65QhlPNMA5pwJxQBehnWQ5yFbuPWrm4qcEdaxBVqK6ljwAdwx91uRSA1FjSUYPFQy2DKN0ZDD2qGO9U/eDIfbkVZiuAPuurD8jQBT2shwwxTycrV8hJOox7EVC9mvqV/lTEVVOKmjlI5Bwaa1s8fOMr6ikC0CLHmnqRz6ipobp04DED0NUgcVIretIDTEizLhhg1UntwDkf/rpqORjmrAIdRmhaBYobMdOvpUiCpZYsc45pFXuKomxLGK6HwiP31w2fuxj+dc8owK6Dwh808wJ/5Z0S2CK1G6zD/pLxLgruZzx1rDj5bFddf2p853UcMBXL3PyXbcDGM4HSsYmjK7/f60IQjDI7ZpzDcSO5prLv5FWSSocuCBmp2Yvtz2qooP0qVAWwWOMUhGxaRk7dxJQ9x2rasoF+dCST61gWijhi+Aew4robGYKFKHGOnNSy0PMJWF8jjoM1lOnl+cvmDaT+ddFcy5i3HAyKwX2OSfLBHcjihAyJbjYypGBuHfFUPGiv/wAI1ciRSGRkOP8AgQrWtpY1dcLsb1rG8buD4dnVQQC65yefvCjqPoeailpidadWhItafhZgniyxbGcMf5GsvrWp4V/5G2wB4yxGfwNJ7Aj1NrkmcnAxjpUV8FltS23cpG11b0P9KdOqLdEFAGGPx+lNlR2TK42Hjr/OoGeW67px0u/eHB8lhviY91/+t0qPStUm0q3uGs/3dzcJ5fnd40PXb7npn0rqvHht/wCzLVZQfP8ANPlY9MfNn26VxBGRkYrTcQhAIGRTGbHAzk9MU88Ak11HgDw42u6/ukQmztNs0zdic/Kv4n9AaUnYEekfD7QJtG0KKKUYv7tvNlU9UGOFP0Fef/ELxKdb1yW1tZc6ZZvshCn5ZGHBkPrnt7fWus+JGvPo9sNPicfbrxfnwxDRRdzn1bp9M+teSKw3HOBmoguo2DL845AyDXuvwk0cWPhaO5liZZb1jMxYcleifhjn8a8g8P8Ah+78SazHY2YHC75pGOFRM8k/0FfSIi+yCBIflijjCAH0AwKJvoCRS16/stPsZLq8uEt4VHLSNgH2HqfavnrxHr02vai007v5CEi3jb/lmmfT1PU1t/E7xYniHVltbTmys2YI/wDz0foSPbjiuf8AC/h+98SatFaWcTMikNPJnAjTPJJojohvU7P4R6IGvLjXbxdtpaIRE7j5S38Tf8BHf3rlPGWuHX9cmuY932ZPkt1Y5IQHqfcnmvV/ipc2+g+AodM01Ft1upFgCR/LiNRlh+PGfrXh69PrTWotgxWv4ZXf4islzgmQ/wDoJrJ71s+EZVi8W6dI33VlP/oJqmB6W0SxsmScn1q9oyxreOHOPlyCBTZ4vNLDHBbcD6e1OtlCuiKijHBYdTUN3QdTWmMreWVTO4/L7ULIys6kZJXB9BTpCCUILc+varMSB1UNht3UioKMx1A2HgEnPNY97aKhaZDkE5bPb6Vu6hZFmK4IPSufubcxTbVlDYHTdTTEyqFOOc+o+lRuDuCippQSRkBcHGAetROWM2WHOeMVZJYiyknBOCK0NMtZZkeRRwOnvVSFSzYcZFdLoieWMDkCpbKSIUgKo4k4ZcZzUix/KqnoWA/WprkB5pnBzz0qGM5CoRyrZzUjPOLxQl/coOiyMP1qm3QirN2AL65A6CVwP++jVVhXSkYsgeoG5NTsKWC2adwozjPWgCK2tXuJML90dTWvDYLCuOgPUnqatQW6QIFUYNOMZYkk8VI0MDCNdsYwPao2YnjBzUjALVWe/SHO0DNA7Enknq5wPSopr2KAbExmsu41GWR+DgVSaR2bJY0WGXbq+aXI5wKz2bc3SkyaB0pjE7fjSD71B6UicvigSNKxlxPFF/fzzWtcLhBisa3XGqWQ9AxrenUbBU3HYxLnG41XXkiprk5kaoIutMEVbkbXYD1qpn5qtX3E34VU6mmhCjrRxQBR+NMC9FIVOc4rWh2XVsQR8w61jHpWhpLES4PQjmpaLM+7iCSYqEVp6vGFcHHNZqjmgB2KB3pRRTQmNH0p54249BTaeSCq/TFBIqnNOpgpRx3pDsSxyyxnKsRVqLUJAMSKGHr0qoMGnFaBGnHPFIPlfYfRql8oMA2MH17Gsbae1SwzyxnhiBQO9y/JANpYDBHUVDjHI6VZtrpZMB/lb17Gp5bYY3KPlP6UXEUAanifB9qjeIjkUIeaYF4DcvNRhMHFLA56GpSuaBMiC4NdD4IRWv5kbun9awiuVrb8F/LrAHrGf5iiT0EtzpL6MCUpGBx2Ncbq0bLKVcjeOWxxjPau/kiWS5JzkbiPyrlddt0a5LKuGK4+tYxZq0c4Zo1t2jC/vWPX0FR5GxdvXHJpk8ZSYkdRTVbHQ8GrMx+4An3pwdhwBVaUkHNAlLEfNkUAa1k/I3YzWzA7RZyNozkVzcDtkFTgCty3mDxK8uSpO3rSYI27i5EunZxtPb3rKgYFSWbC05pRJEIozwpJAqLAySgwp6g0IbJ2O4hg2TjArC8XZ/4R2XOT86fzFayv5aElgQSQBnkVieKpN/h+Ugk/Muc+uRRbULnAr1p1NHSjgVYhRxWv4SjMvi6xUdckj8jWSK2PBxI8Y2BU8hjj8jSb0Gj1C+QvJvYcEDn3qsuT8rcY5zWjqKBrnKjhhnb/ADrnPF2pRab4emVD+/nBiiB6jPU/gP5ioQM4bxXqb6tqxELeZDG3lW4UdR3I+p/pWr4g8KR6R4ctLyPd9qRVF2pORlu/tg8V0nw98JG2ij1S+izdEfu42X/VD1x/eP6V211p6TKyNGHQ8MHH3h3FDkkyrHz02CleyaBd2fgL4fxTagmNRvQ06wfxSPj5QR2AGMn+tcto3hBLHxFqF3raldI0pmk5B/fY5UD1GMZ/AVy3ibWrnxFrct9c5VW+WKPPEadl/wAfem/eEtClqN9dapqk1/fSma4nYs7n1/w7AVCAWdVVSzFgAAMkn0pCQgya9A+Ffh5by+fWbuPdBbNstg3Rpe5x32j9TTbsg3PTPAnh+Pw74bgjlhEd7MBJcnOSXPbPsOKzfip4qGkaELC0bN/fIyhh/wAso+jN9T0H4ntXUzXCW1nJNcyiOKJS8jN2AHJr5y8Qay+ua1eahKcLLJ+7T+4g4UflURV2NuxmWFlPqF7HZWcTS3MzbI416sa+idG0rT/Ang3zZP3QjjE125+ZmfHP15OAK4/4TeFRbQ/8JDeoftLgi0jYfcXoXI9T29vrXV/FgsfAF6ythSi5H/AlpN62HY8S8YeJLnxPrcl7JuWEfJBETxEnp9T1NZHGKjUfKKfWtiGFavhdS/ibT0HUzY4+hrKrZ8IDd4v0wes/9DQ9gR7G9uVtyqnOOcUy3C+aGOAR2reksiLZZEOQRxxnmsqGzJvfnG2Pu3vWSZTRMGjdOW6fqas2rFPmA4HWsa8juYWIhxweSagt76YEpIx5pDOnjZp3beNofIHtWTdadHa2zSSRb2Uc9siprS7je4RHchzxg1b1CSNoTGTvG3kd8VIznbxPPhLkBVhTjgfkaoMoKow5zW3LpSCWJogdjJlgBnOKpCzBaQRkMq4YH+77VomQQK5jO0nNa2n3fkK2M5AzWXdIsZVR16/Wr8SqIHYjqAM0NAmXEOYw24lj972qROXBAzyM1UR/3Tsh4FW4CRBvPAOT+QpWHc80umDXlyw7yuf/AB41XI461OY8yyE/xMT+ZqaO18wgY/GuhMysU4rcStjPFbNtAkKfKOewqWC1RMYUADpSzOsY4x9aTKsN2gdfyqCSQLn0FQyTu7bV4HrVO6kAQjPA/WpZSIry7JJCn5f51lTSFiSTT55MtxVdskk00DGlsmkNLtpcUwG0mRTiDik20gG1JbJvmp0cDPjA49avwwJFwoyT3p9AIs7NXtcemB+tbN6+23BrHuBs1ezJ7D+tS6hdeY4VT8opWBFaU5yaiix1qXazLk96Ydsal26D9TQFijfnN1j0Wq3enSMXkLMeScmkHWmhBRj3pcUmD6UwLXSrmmtiQVSPer2nDMgOKktD9YYM61mAc1f1U5nAHYVQNIbClpop46UxMQcmnfwijFL/AA/jRcVhKX3opQKAHLUtRAY4pZJUiHzHLf3RRcCTilAqtbyvLIc4CgdKtCgQ5RjkVo2d0yNtY5X0NURT8YxQM2XSORd0YOapSxYPTBp9lPtkGfpWjJGsi5XrQLYyUYqcVbjbcPemSRZyMYIpFBQ0waJwK0/DjGHWLcjuSp/EVnLVm0cw3UMqn7kin9eaHqiFud8rbACe8hP4Vg+JP3dsZEGTv3DHp3ra4aEDvuqhq8e61XuVySvqBXNszXocHdYdsiqxHGehrSuo0WVtnK54qjKuM4rYzKk75iOecVUilxTrhyCVqnG+CcnvQBuWsm7kdD1rRgYtHgHoc1iW0uAMflWzaOAvA6jpQBb84owyTViCQN7eorMaT5sEk+9Woe2c80gNG3ije4zKcoOQAPve1YPix4k8PSx4w7Ov0+9WzCSkqhsgH0rlPH1wkV1b6fGcsB5suO2fuj8sn8RR1GckppaQcGlqxCitnweR/wAJjp+Tgbj/ACNYora8GgHxjp4PTcf5GlLYa3PYtSkjhfLjBCjn0rhbZE1bWzqlymbeH5LNH6HnmQj69K7jUI1nlaGUAjaAc9CKyLqz8oBlI2jgVnEbNnSr3aNrZ+Y4Brdhu4oELyAPjp7VwV5qCaZpst9L9yBchc43HsPxNcde3d9qcQvfEF3JHak5jtY2KqPQYHU0OF2NM3fil4mieV9DsGydwa7YHoRyIx/M/gPWvN8HOT3ranGiT8fZ54mP8aHn64J5qrJpUrIz6fMLpAMmPG2QD/dPX6jNWtEJ6lfTNPk1fWLTToMiS4lCZxnaO5/AZP4V9IaXp9pplpaWVkoS2tl2gevufcnk1876Hrt94du5LizjhE7rt3zR7yo749M1qyfEHxHKc/2q8PtFCoqJJsaO6+K3imO2tn0CyZXnuU/0lw2fLTOdv1P6D61594A0Vdd8a2VncRs9sGMs4HTaozg+xOB+NYTEXE7zSXLtLIxZmcZLE9Sa7Dwb4ou/DUhS2s7W6jk/1oUbJnGfXv8ASnayDqe6yFVkIA5A7dMVy/xRBPw+vmznCpxn/bFX/D2v2PiW3afTpCZE4lgcYkiPuP61n/FSIr4BvD32JnH++KztqUeAL90Uo+lNXlR9Kd1roMg71ueCyv8Awm2jhuAbpR+fFYYqW3mktbqK5hOJYXWRD6MDkfypPYfU+p3RraBx1Q+vY1jTskaMDjc3U1qaLqVpr+gWmo2zbo5137SeVbup+h4qjq9vsyVxmsVuWzAvLj5CQSV6YFZ8IJJJ6e9WJom3ueAMZPNQnIHP3e5qibmrpkamaJnIyW2rn0rU1JrfT4HubohYoY2Z3xnC+uO9c/o05OofN3HA7ACn+OpJX8J6m6HAFsePQZFS1qUi3pd1bauPtdpqVo8AXyk2y4b8R1H40TBbGOQSSI8jfLhDkEV86HOM44HGcVqaFfLDqcH266uUtA3zeXIR9M+3rTsB7FPuuJvM2BFC/dB6CrcmfsuV5FV9DeO+kR4WDwupw+OCPxrVkthBZupbJx1p3JsUYyywHPGccVomUR6U8h48uF2P5VQVSF+Y5zUuqN5Xh+Vf4pAIx+J/wzR1GcdbwbnAP92r6okSc0RxeWNx6moJiWyAeK1JGz3XynZVIs8hyx4qVkA61XeQZwKGAkrBVPpWTdzE89qtXDsw4HFUxbSzvQkO5VPJyaQke9aa6U235iRSHTF/vGmGxmZU+tOwKvHTl/vGgaazH5Sx/CkPUogL3zU0SqRkKcepFaMekvgFiKsixRRy1K4FCNAVz2qdAqrubgCnymKPhfmNZ93vdcs4Ue5wKAKep3Qa7RkHQYH51atoN5DP+VUJzDGB5jAsvPBzkUqalJKp8sbADgetNshbmtcrHEoMjBB2Hc/QVh3k/mvhOEHQU2eSR2JZiSepJ5NQ98GhItiYzS0tJVE2DP1peP8AIpAKX8RSHYnBycVraZxB5mOQcCsdO9bWl/NZsvcHNS9i47lG8y0pJ61U/iq9dD94aqbealFNDVFOxxTsYoxxTuK2gynDoaMUoFMkBSGSNfvSAEduppQOapTf8fD/AFoE9CWS4ZhiP5R696iI565pop560yWyxZ/fb/d/rV0dKo2X+tb/AHf61eoKWw8VIDkCoxipF6UDJYzhga2bWUFcGsVavQSZx69/8aGG5fniDfMo5qvtB4q3E4YYPpSSQ9xRckrqMdKe3+rbHXFG3B5oNNBY7VJDLY2tzHnY6Kzj69f1qWYos8SzchhtB9KpeGZRLoixE5MTFCPbqP51H4ieWG1tmU4AZkLenHFc8lqUijrtgsVnGI4lEiE5YDBx6GuVdGCkNnI9a9KvbYXejRXYGfPiVm9jjmuKv42k3PI2WPFXFikjlLg/I2Rzu61lOdsuCeM1tXsR+YjNZEkW48/nVEotW86q2Ae1acN32zgD9a50JsblsVahkOQOooGdVbSJIu0Dk9+9WFlTHzMEC9cniuftroxsDuII6Yq6jmUZ4IPUHvQIn1TxNawR7bZluLhRgAfcH1Pf6Vw91LJdXclzcSNJNI252Pc11R8O2dyxZGkgJ6iPBH5GqF54R1BEMllLHdIOw+V/yP8ASmrAc+DTqJIZ4JTHcRtG4/hYYNAp3Exa1vCTBPFunsxIG45I+lZOK0PDnHiew93xQ9ho9mluF+0sm5XYjIPtUFxbboS+zjv7VD5RN0JWGAoHXvWhHeD7HKgxkZwKy9CjgPHzF59M0mNvvL9omH14X9Aa5bxJd+dcwwKTiFfm/wB4/wD1q3dSukvfE+qXrNlLfES+wVcH9Qa466cyXBZvvHk/XrWnQOgzHvU8F1Nbn5GyPQ/09KhIIFFBBvQ6na36+VqNsGPQSJgSD3PZ/wBD7mqGoaO0MZuLVhNa5wJF6Z9D3U+x/DNZ9XLHUJ7KTdG7YI2sOoZfQg8EexosUmZ44NTxSsrKOSM/5xWhM2nXfzCIW7n/AJ5k7fyPI+nP1psFpFE/mb/Mx93tQM6Pwte6jZ3s2sWYJudNUPK3QXEWfmRvU45B9q9L+J15He/Dqe8tn3W9zBG6fRmUg1w8ci6NY2GmYAuL5lkuT/snoK0rm4EvwCeOQ/PazG2/FZMj9DWF7s0krJHlC/dH0p9NxjFLXQYsUUEZBFIfaug0LwXr+uQefZ222E9JJiI1b6Z6/hSbQrXJ/B3jPUPCtyEibztPkkDT25A57EqexxXrWneMtE8Rxqtjc7bljj7NP8sh47djXCW3wk1JkDX+qW8X+zDGzn9cCu78J+C9K8OqXiV57g9biVRu+g9BWTaLVxbmychjKfLXP51nPFIpEbD5GOQR0NdXqcIuQoAwF7VBDDHHIkbgYXnntRcLHPLY3EMyTLE21PvAelR+MLgv4K1VQpDfZznPXGRXWajJbq5jaaKMsMlS4UkfjXJeMdi+EtTJkUq9uwRiw+Y8dPWjcLWJraezn8M2dpLZxsht496mMFT8o5IxWSPDmiWtwZotHhLk/KWyyj/gJOK2rGCI2VqVdAgiRS4YYyAO/SteNEuIwkMkZWJSXYMCB9cdKLjsZ+jxeQpfOTwMY/Sr92BJExBzggMAaciRAeXCyufUMDUksPlxg8cnkDvQBmwIDJ8w4HQVV1qTckEXYMXP4DH9a03BUrgfePPpiud1e4H26Rc8IoX+tVFakspSy5zVOWdEzg5PpUc0rOcLwKr7PWtBWI5ZZJSR0HtTFjO3A6dz61YC9gOKfhQpLnCjrQFiCK3Epy7bIx1Pc/SnT3sFsPLt0x79z9aqXVy8zlY/lToKrpDnkmgpIma9nkPGAKUTS/xPj8KjMiRjj86ryTZJwPxNK4NGgt5t44P4U46iqD5sVjM7H+Ij6VEy9800FjWl1fOQgqnJfyP/ABmqeMGmmgLE7XMuOGx9BVC+Yyw4aTcQw4JqbNUrgYnf60rg9EQ7BgZNWLXaEbkfe9agoQfvF+tMhblt+aZgVIe9MHWi5YmKQ/Sn0lMLCdqKcKX86AsOUY+lNOoS2k5SEjA9RnNWEiLDis29UreMD6/0pBLQsPqEjtlsZPtTPtjdgM/SquBSigXMyz9rk9B+VBu5Mfw/lVY04fdoE2y9ayNKjF8ZB7CpuhqCwH7uT6irBpM0jsJiqNyMXD/X+lX+gyTx71QuCGndlIIJ6j6UImQwGn0wU+mQWbL/AFjf7v8AWrvas62kWOQlyQCMcDNaKEOoKkEeooe5pEeKlUVEKkU4IoGSpUsZwwI6iohT1oCxoW8oY/TtWgr7l9axEOD71cguMHDfnSsKxcZTURBFSJKG+tPKg9KYmaPhi4EGovE/CyqCPqP/AK1dDqsC3NtLbucLKMqwGSpHeuPjBikSReqnNdnbSC5slbgsB1rOouo0SQcaKlqhJESADPcDrXN6jbLGrqFyr8j2roChjVfmx7ClubEXKDpuxwMdfb61mnqOx5jNH87xuOc4zWbdadJHbmRB8oYcd67PWNNMb7lXjvkVWtbXzLQs3KqduDWtyLHA3MTBAwHTrUETMGHy8V1E+mA3hiztDnj2rF1awmsJtpx9RRcdizpyrK+JB+NbsNoI1BIwG5HPaua01ynLMTXV6SFu7YgnDKeCO1K4JDldoeU4P0pYbqRctuwCeeKmS0ld/JV92eMY71VMLZMag5zyMd6pEtFq5tbPUrYx3SiVTyOMMp9Qe1efalp82nXZhlBKEny5McOPb3ru0DWsgJHPpV2XSo9b06WFgTHwx29UbswovYFqeWVPpU5t9dsZumyZf51Zv9Hns9Tlso5Y7gxKGeRTtVB/tE8LVXbaRMC88krLyPIXAB/3m/wqm7oaVj2a4u43BDI2/bjjofeqV1epZ2c9y3CRRlzkdcDivKLnVJppS3mXB93uGJ/TAqqZp7p/J8yTDfwmQkfrUJWDc05pGtdB3uc3OoOXY/7Oc1i8k5PU1ZvLp7hLeN1I8iPy/wBar1TBkqEvFjGSnB9x/wDWpCM8Y57e9MRijZHQ8EVZV02hieKEIrHIoq2Vjf5jg/jTHljCFY0BJ74phYqkU6EkXEeScbhS00Ha6n0INIaZ1/jKd/7ZstRgOUmtY5I8dMqMEfmKn1HUxF4M1fSC2Gn1CG6jQ/3XUs364qtY41bTH01iPtFqxntc/wAS/wAaflyPpS/EC2jg8QQmIAI9suPwHFY3tKxu1eNzl2PpSE4Umlhied1SMbnY4AHUmvUvAXw9EHl6r4jhzJ96Czfov+049f8AZ/P0rVyOdK5H4C8DK1pHrWuQhw67re0deCOzv6+w/GvT7SV1jQ4XdjAUdh2qIu7RuCeDwO2Klsk6ADBrJstF8SNlQBubufemTTcBS3AHJ9TUjbIo8HnPX2qsFy5x0zUIY224imeTnAAFeKfEydo/iFcHzJBGggyoY9MZNe67QlswP8fQf1rwX4oQuvju8LhgsiRMpI6jbjitIbikN+Jevab4j1+K70syNGtsIyZEKHduJ6fSpfFfiDStT8GeHtMsd5ubBAJwYyoB2YOD35rjlQKMCjywTnvWlibnXDxFpqfC+Lw+BL9ua78x/kwgXfu+99Kb4P8AEGm6T4W8SWN68i3GoQ+XAFQsCdrDk9uTXJlB6Uwqq88Clyhc9F+CSed4jvt7Eqtnnk553CvUrjdIxzwRXlvwRVhrGpyBWwLQLkDjJavU58Rjyzy7dfapluNFC5n2qS3CAZ/Ac/rXD3EzTXEkjdXYsa6LxLdeXEsCn5pOv+6K5dvmNXEZGxOeKQ5p+MdaaSBzmqAXIVSx4ArPuZ2mOF6dhUs7NIcL0quxVBjOTQNIYAEGXpks3GFpsjFiaiPSgdhrEk880w04imkc0CG96Q9adjmmmgLDTmmkcU8gim4pCIJGEcbOQTj0qjLIJJWYAgE1eu2VYHRj8zDgetZwoQpDu1AOGB9DSdhSUyC4jh13gEZpCOeKZalSgUH5hnipCDmkaDTRilxSgc0wEpfwoxzUMtwkT7WVs9eKANCGQqapakRJdFl7mrKnpWfKT555/iOKAmRUvalcc5po60GY7IpR92m96cPuUMC7YZ8uT6j+VWDUOnD5JP8AeH8qtbRmpvqbR2M29ZvM2E/KADioV6Cp9QGLgf7gqEHgVRlLcWnZ5FNFLQIVjxWnZD/RF+prMP3a1LH/AI8157mhlR3J+wpwpD0FKKLm1iYHgU4UxOlPFAWJFqRTUS9KkHWi4E6Oyng8VdinBGDVBeRUqUCaNFWyK3dCuPkMJPt+HauZSSrltcGGRZAeB1x6Umroi1jrWZhKu8HkAZ7A/wD16dHcSQNkNnaeVboy0kcomtlYd+QexzRDDG9zsmXJC5BPcf8A1q5yhl/smYyDq3JBNZksIa2YIAhB3DjvWg0bbNpBJyR71CFfBUnr3xyRVJiZy5ss3LvNvYnnAP3fpTdU00XNsSwy23jvW5HbuGkbCk7jhMfzq1b2jXBKnC8d+1O4Hj93azWU3DHaDyO9dv4WWK4sWZYQg7gtya57xjELLXPLWRT681saTera26lI9ykdQKoRamjeG9KJIwCn73t60shjtpVkiuzK+4lsKVP+TVG5upLi43KpUYwOeamgbeykglk++oHBHqaZJoMj3ksjtGY1AyBjNLNKdK0W7vYJpFlhjLbccE/w/qRWrC8bWQZCCO5Xgj2NZ+o26XVjc2iv8k8ZT/dJ6Z/HFTcdjzHULuURpahjs+WWU95ZGAYs3r1wKzicnJ61evYmNqkrgrNCRBOp6qy5AP4jj/gNURWiExe1XNIj3XjyEcRoTVM8U+3neCXehOCMMPUUdRIsy7JuZl2k9HUc/iO/86rSQPGpbh4x/GvI/wDrfjVkMhXJwyev+elIsj27+ZbynHseR7Ed6BlKgVYlImfcyKhPdBgH8KiMZzjIoEMpRTzDIBnYxHsM1H0Pp9aAHUAZYfWkB96XNMRqWs0tpex3ELbZI2DKfcV0HjTy9Un0W5hmihW5iKF5W2ohz3PYVy8U2/CQxSTPjsK07+LVrTS7O5uY4ooEdkijOHPzDnI9KyklzXN4t8rR6l4I8HWGjW0V4Sl7fONy3A5RB/sf411Ds7ycZHOMV4r4S8X3WlN5VrIkcbnLWs5Jgc/7LdYz+len+G/E8GuLNDLB9h1GH/WWzNk7ezKe4qXcmx0MEe9iAu9+gHQCpk/cFjnc2eT6n0FOgYRWrSgEv0HvUMiuZVjU4wMsfeouOw+RpWQ4PzHqR2pwOB6Dv71Ii4TB/XgZqnKcdTnPTFMTJ3nLjHAHauT+JumW2q+FZ7ljtn09TJDJjt/Ep9j/ADxXSqSzAYwo6Yqh4qjjPgbXd7Dm0kP0IHFNbjex87Qksn41atLW4vJmitYZp5AN2yGMuQPXAqpaj91+Ne0/BSGFPD2pXO0CVrrYXxztCggfqa1crK5mldnjkkbxSlJEdHHVXUqfyNMkOxd2AdvOD0r1D4420azaZcqgEkkTqzAYJAZcZ/M15nKg+zN/u0KV1cLWZ9CeENOtdC8J2kFuoBkjWeVscu7AH+uPwpt7dPHMRgb3PJ9PQUWssj6ZYxJ2to+SOnyCsjXrjyIyAfnbKJz+ZrJasswtTujd37yZJUfKv0FVM/hQxwajLZNboLClqgd859BT3YBaqSPkEDpTGkNklyNq8D+dQNyKc1MoKGnpUbCpDTD0pMCM00040hGaBWG96SnbcHrSEUBYaaaafjAppobFYp333l/3TVKrt+cNHjupqlQZy3DtS0nakpkliyAM3/ATVp0xVbTv+PjH+yau3DrEgLnGTgfWkzWOxWIpAOaiN6T/AMscfjTGuTs4G1s/Wgm6LVULw/v/AMKka4LAZH5VEzgnlc0WC5p46YrMnJWU4/vGtQEZrNuOHf8A3zSQ5ig5X8KZ3pykbR9Kb3pohimgGijNMRoad/qpP94fyq3gE1W03BhlI7Efyq10NZvc6YL3TMv/APj45/uioB2qzqWPtIx/cFVgOB6Va2MJbijinU0UtMkXsc1rafj7Gv1NZJ6Vr6fzZL9TSZpT3J6UUelFJG9iRPSn1GpqTtTFYcKkFRrT160BYlQ5qZDVdalU8UBYsAmpVY7arhqlXrTJOn8O3QaA2snJTlc919PwrpBCPKjfqycg98elefW0zQzJLH99Dke/tXe2d0k9jHIjEAdD6fWsZKwmSPEmMLz3Q9xVG5iEakx5y3Tj7ta0Ailyh+WQc47U+a3Vl3Yy46Dsai4HNwoVkyxwGHJpb25gsrU3M0qxxxctIx4H1rYFsr58wAEdfWuW+JUS2fg+VYxkTSpHnHTJz/SmtWSeYeMbuHUtclurV1kjKgbkOea0fDkyf2SkJbLqScelc88YGcDFafh/bE0pJA3OBz34raxnc6LacbgD9R2pwDLKSGIY9SO9WGK+UFQ8EfnUQB3LuBI6GgZfs7xraB40x8zA9M/WpFUSozrknPKjqKpwlBIQ+SvqK0IYtwDxneAeCKl6DOY8TaU8bPqdvDvUrsu4c/6xf731H+Brj57URqJoW8y3c/I/f6H0Ne0yiOe3QjaHUnehHA+ntXnPiKxg0rUC9psaK4BLwdY2wf0/pRGQ2jkzRjitGaGznjDWrsj5x5T/AHwf5MPfr7VQI2kqeoPNWQxEZkbcpIPrTy6sckBD6qOPyqOilcCbnGQdw9RRUHTkcGlWQ/WqAmGV5UkH2NTrcSN8r7X/AN4ZqsJV/iB/CnebH2Zh9VpAWwqHrGn5U+NUQ5EUefdQarR3EQ6v/wCO083UP9/9DQUaP2h5AF3sQOiquAKv3bGTwpCjjPlXq/KfQ1gpqCJxGGkJ6ACr1q11O4W5by4NwcQjuw6ZqGrlxlZNEb6XFG7YXKMe/wDDVmwne1lhinnkg8ls214n37Zux909R+VXD97I79R60SIkiYYA02riW56Z4Y8WyX6nR9WRYdXiXIK42Tp/fQ+/XFdLE7DDbhkdiK8Uije60oxxuy3lh+9s5gfmAHO3Neq+HtRGs6HaahEP9dGCy/3WHDD86xsW1Y2GmZ41WRsAcmot6sx4JJ7DtUggaT7/AMqjnJoKxoNqLvI9+KCSL52bg8Dv/hVDxZ/yJWtA45s5P5VonzCxxn+gqh4oVT4J1kN2tH/PFC3B7Hzzaj9x+NehfDXxZYaBbXNjqAlHnzh43RcqOMHPPHSuAthiI59TU2ARyMit2royTszsvib4ntPEdxaJpwZoLeNl3OMEsWGePTCiuKlUmFvpU6qB2pZVHlN9KVrDue7WjlNMtV6fuI8k9vkFcZqd2bu9eX/lmPljHt/9frXQa7erBpVrao37yWCMvjsu0fzrk5Gyc0oI0WpG7Emm5wMmg9aYxqyrDJGJz6VA3Q1K1RN3pgRHpTD0qQj3phwOKQDajbrUnFRsKQ7DDikpxBpMUxWuJgU0in45o289KQ7EZpKcQRSAc0BYo6iPnj+h/nVPvV3UhiSL/dP86pcZpmE9wpKUnnNJnimSWNNH+lD/AHTU2qn9zF/10/oah0w/6Uv+61T6vgW8fr5n9KRovhM2k70UZyaZmGKCPc0uaTI9aVwuai9azbg5lcf7RrSHGKzLj/Xt/vGhGkwXhaQUo6fhSLQiWKaKKKZJsaIu63n4/iH8qtPHtNReHlzBcehcAflV65TgCsG/eOyCvAwNS/4+R/uCqy9BVnU+LkZ/uCquelbo5ZbjsUvekzQTzQSKelbOn/8AHin1NYpPy4rZ04/6An1NSzWluWTRSnpS0kdNhR7U9TxTAaeDTEOA/KnA00HvTx1ouFhw4qRTxUQp46U7isTKamQ1XQ8VMnpRcTLK+ta+h6k1leqkhHkTfKQ3QH1rlbm8lhuCiFcADqM1G99cMuCUx/u0WujGU0mevqyqVdM8Dv2FXVkV025zxXCeF9dku7Y2t1IonjPyt3K+uP51d1LxHBpdysMsc3nbdxCAED8fQ1hytOwX0OllLq+d2T0BxyP8RXnPxZluPOsIWkYRNC7FAeCwPWuv0fX7fWIphGrxtFjO/vn/APVXFfFWcS6rZwgkyRWxZuOzHj+VVFaiexwRGQCe9TabD5ms2KE43zov5mlK/KPpT7JvJ1SykAyVuEOP+BCtnsZ9T1C+0E6fIkMrbon+4y8c+lYr2skUrcZjBxu710+rwi72n58A4256fSsW7mt7aQRz3GJhCZmHT5VOMn3rnU7s3cbIrRWhE0fXD8g4zkVr2kISPy1Zt33sAfy9qp6TOuo2Sz2kylA2drLyjDtWu0ZEQKkqQdysp5Bpt3JOY8SXL22kXPkOQZJAnHYZ55rgS0khcOxYByQD2zXfeKY/K8PTA87rhCM9V61waDJb61skZsZJAjQM5HzKMgjrVX7YJsLeJ5uOj5w4/wCBd/xrRK5iZQOoNYmKbQJlswxSc28gk/2H+Vx/Q/hUQjTcVZWUjseDUJp6TyKMHDr/AHXGRSsBIYk6YP50ghT3/OpFlhbG9XiPqvzL+XWrCxoRujlSQf7Lc/keaYWKhgX1NOFopHU1c/dA8jB9xinYRumKQ7FVLWDOGJJ/3qtJZW4HMQP1zTQrg8Yx7U7JHOHz7CmMmjjjj+5tX/dWplJVsjr9Kqq5HOCKmVywyWVfryaALcch6Nz71KGBXPaq8WGwqbnb/drVhsEhtvO1KYWkHUs5wx+gqJSSNIxbH6KVhjvLyXiKCJixP06Vq+D/ABhp3h3wpaWN/Hcefhpl8uPcCrNx39jXI61q66harp+mRmDTlOWZuGmP+FVdSumvZ1lMSRbIkiWNCcBVGB1qFFvVhUktke5alr9nY+GItanaX7HMEKhVy3z9OM1T8L+I7LxHc3EWnrOrQKGYyqFBBOOOa8ov/E+p3/h2DRJ/J+xwbNuF+b5emTmovDviDUvDs002mmJZJlCv5i7uAc8c0+Uz5j0/UPHmj6frU2mzLeNPFN5LskY27s465roPFUIh8Fa2WPItXBx64rwK9uZ7zU2vp9vnz3IlfaMDcSOgr6A8ZThfButmRdwa0bAHY4/+vU8tmO90fOtupMf41ZVc0y0U+V+Jq2qd8VuZjVSnNHuUj1qZEyOlTFAEPHNIDpDLJKqtK5d9oGT7AAUw9KRD+7X6D+VK1JHUloRmom61I/tULUwsNJqM040w0DsMNMapDUbDmkFhhprttKAj75IzT9uagmmi82JBKm5WORnpxQJizv5Ue/GRkDH1OKzri9lSd1QLtU4Gal1GbeiCOQFAfnAPftWeSCvKndnrntTRlKVticahPnon5U4ajPuG5VI7gDFVMjNIeKCOdl5tR6ZiP/fVWreTzYw+3bkkYrGNa9iV+yoNw3bm4zz1oaLhJt6kesgbrYjuh/nWbV/Vs74P904/Os7NCJqfEBNFFFMgtabzdr/utU+sD/R4v+un9DUGlf8AH6o/2WqxrQxbw/8AXT+lSape6ZNHelpO9WZATS4+n403vTialjRrEHisqf8A17f7xrZOcisa54u3B/vGkjWotAHQUgooqrGLdxwoxSDOaXrQAAkH5XZfocVpaQzM8yszH7vU5x1rNFX9IP76fHov9amSNKbfMN1gYvB/uCqXarutHN2vsgqkOgqlsKfxDgaWmilpECH7tbmnf8g+P6n+dYhAxyeK3NLGdOj5HU9/ek9jWluWe1LSlcDNMmljt4WkkJHZcdz2FRqdbaWo7FOFZg1Vj/yxX/vqnDVH/wCeK/8AfdXZmftImoop9ZQ1R/8Aniv/AH3UsOphpNsqCNcdQSeaXKw9pE0etKKaCCcU4UF7ki9KJrhbZUZgxBOOKEAqK+AItweR5nSmZz0RQLBpGZRgEkjNPBqE8MfqacGqjjZKjMkiujMjqcqynBBq3eXst9Ms1wQZAgUkd8VSU07ODRYL6GjbSTwQbraVoi4KsV7jNJ4pvV1T7BKx3XEVr5Uxx3yaktV3WMZHof51n3afO3FT1NmvdM0p8o9aWyUf2vYA9PtMef8AvoVK44pLRA2rWIPQ3Mef++hQ9iFueq63e2+mwC4uJVjIJ25PEmOdv1rxy+vLm9uWnkkYM8XlnnquScfrXo/xPaBdLtLXJMjT704yMDg/zrzhk54qKcdLl1JdC9omryaVCYlQujS7mwcHGMcV11v4uskdRLIXyMA7a4NUpJUxLGenXpWjimZpnpHjbe/hhTlWjeRHyRyD7GvOok+9/vV6H4miMfgDT3LF1kWEqce3Oa4GJfvf71OK0HIci1Q1ixe18m52/uLkEofcHDD/AD61oySJBE0khwB+vtVDVri5lsoobttghYmOEY+QtgnPqemfTiiTEkZOaWrNpbLPFdtzvhQOMemcH+YqscgkHtSuDFppGetOopgKskiDCSMB6Z4qdL11xvjjce64/lVfFJ3pWC5ox6lEPvWw/wCAyEVch1TTM/vra5H+5Kp/pWIiM4cjogBb88VEeG96RSZ0Mur6WD+7tLpv96VR/SrH9oSRxoYtHkXeu9TPKcEeoAA4rMXSG/su0uJWImvpvLtosfeXOCx9skAfjXb+PoEttcjgj+7DZxxj8MgfypLVlXaOX/tXV24h+z2g9YowW/M5qjPDJPJ5t1PJPJ/ekbNW1zsGfSkaq5UQ5NldECikapSPamladhEWMmnBakC08LxSEanhTRRrniCC0lYrBGPPnI67VI4HuSQK9Z8XXkY8MalFLIoaa2kVFJ5J2k4Fed+BLxNO1HU7yRSyw6eX2jq2HHFUb/W9Q1VmN5MGVs7UCjCA8YH4VNrspPQxbKMm3Q+1WtmKmSNIYQi1Zhg4DuPoKoSVyCOPaBkYNLIPkNOueJz9B/KoCeKLXE9GdCMbF5HQd/akypO0MCT2BzXMsozz/OnLIYgQhIz1wcUWNFVN9+KhJ5qOC4iaKJfOVnIAxnnNSNjrSN46ojNNpTSGgqw000jinE005pDsNHUVz0+37Zcbs53NjA75710eK5u64vZwOfnNNGVXRDAB+NBo/lSq7xyK6HDKcg1Ry7iEYPIIPoeKaeKfNLJNMZJW3Me5pnXcdwGBnBPX6UDEqzpo3aggH901WqzpR/4mcf8AutQ9hx+IsawMPBn+638xWbWprf34P91v5isodaS2Ln8QtHejFI3FPczLmlf8fq/7rVY13/UQf9dP6VV0gn7av+61Wdd/1EGf+en9Kh7m8V7jMqm0poqzAQDmn7f9oimL1pxP1qXcaOgdM44rCuv+Ppv980zPtQecGmlYqc+cUDilFN6ClU8mmyUKBljQByaReppe5pIfQBV/Rxmaf6L/AFqhV/R+J5/ov9aJbFU/iGa1xdL/ALlUl6D1q9rY/wBJQ/7H9azx2oWwp/EyQigUlL/KmQL25pCoIpc0ooAv6MCHk5P3R/OrmqDOnn/fWqelMFMrHoEzx9aZe6gtzGqRbwuckMBU21Ojm9wrDinA+tMU8U8YzVHOOBpc96aDTqBGvpMkksMjSuWKtgE/StAVn6KP3E3++P5VfrJ7nfS+EkU1X1J9iQN/dfOKkEgBwSPzqvqhBgi5/j/pVIVS1ikWyxPrzTlNRBqcDVnCTA0ueRUYNLnmmBu2B/0OMex/nWdcMftEqnkbjj2q5YMfsie2f51Quf8Aj6k/3jULc6J/AiFxTIgUu4HBwUlVvyIqU00rmqMEzU8V3z6i9tvIOwtyD9KwClWtg7Cm7aB7lcJSMmceoqwU9qAmTVCNu91Y3Phy308vu8rbxn0FYYQKGY4A6k1Mic02OCLUL6S3mn8iwtY/Ovph1CD+BfViSAB6mhuyHuU1n+z2w1WdARuZLCNhwzjrKR3C9vVsehrn5GeRi7sWYkkljkknqau6xqD6lfGbYIoVURwQr0ijH3VH9T3OTVKs1qO5qeHCp1KSKTlZ4WjP41nTIUmZG+8jFT+FLbTG3uY5lzlGzxWjrVupdL+AhoLrnI/hfuP60wM2igdKKYhKQ0tNNAHSeENPF5JdK6blktJ8/gmQfzrP0HTBf39qs4JSadYwOm71qbw/dajvlWyvhaBItrlFG5kJ5ArobJY7HS7vVUQf8S+MRwD/AKaPwCfp1rCbaOiEUyPUbyKfx4JbZV+x6OFihUfdyn/2Wfyqx4k1AapqBusbdyKuM5xgetczp5Mdo15Bvfyzi8jJyRk8SD2rT3LIoZCGVhkEd61gkZSZAV4x6UzaasFc1GVPY1ZmQlaTaalI5pMUDGBaeFpwWnqKQi7pFwlqNQ8w48+zaJfclhxVWNaCOKcvFKwXJYVBuEDDP1q+TWfBzcoats1JmkCpdn98T7D+VVyakuiPOP0H8qgzVIzluBpjGnMfSoyaZNiW05uYv98VtGsO2P8ApMXP8Yrbz1zUM6qGwhph5p/1qpeXP2aLeqq/OCCcUjdtImNABxWX/bDf88E/76NSW2ptPcrF5aKD3BJoIVSLL/eubuSy3sxUkHewyK6cFc81zV7g305HTzDjFUiKtiAEgEA8HqKM+lHFIeKZzCE0neijPFAwq1pf/ISi/wB01V7VZ0vP9qRc/wALUnsOHxFrWv8AWQj/AGW/mKy/4q1NbUh7cnurfzFZQ70LYup8Q7mmtS5pGpozLej/APH6v+61W9fH7iA/9NP6VS0qWOK9VpmCoFYZNW9auYJ7eNYZA7CTOB9Kl7m0WlCxlGm96XtSc5qjAUUp+lIKDnPakxoXtRSelLimIU0g60tIcigYo6mlFNFLSsA6rOn3EVvLKZSRuAxgZ9arUlOw4y5Xcs6lcR3MytEcgJg8Y71U7U6k7UA3d3Ae9OpopfpQIUdfalpKXNAixbT+RHKRjcy4GaqrTqM0h30HL06U8UwcindqYhwpw9qZnmlzQBtaMCtvKCP4/wClX+9Z+hn/AEaX/f8A6Vf/AIx9axe530/hMG7UfbZQR/Gf50iYB4GKW7P+my/75/nTQa2RxTvzEoang1EDTs0EEoNOzzxUWeacDzQBoWl4YQFZdyDoBwaZK4klZwMbjnHpVZTTs0WHdtWJM0o9qYp5pwqhD6TbQKcD3zQA0rxSbfaop9QtbfPmSgsP4V5NQrNql7n7FZmGLvNMMAD154/nSuVYs3c4tLVpQMyH5Y17sx6U3X7QaLpdvoxbdfPi61Ig9JGH7uL/AICCSfdvas7TGNrdyaxK/wBpS0cCAyDiWb+HAPYfe/AetVw8txetJcyNLM7GWV2OSzHuajdlbFS6iEXlL/GVy351B7VcvAZdQC/QVUcbZGHocUxE8cPmWckgHMTDd9D3/OpbG5EMcltcAtazffA6oezD3FS6TIYpGZlDRsNrqehFM1Kya1YSRZa3Y/K3of7p9/50CKkq7JCuQcdx0PvSU0NnrS5oQBSqpdwgIBY4yxwKSlVS7KijLMcADuaGBoQab5coZtVtYs8funMjfTCitzxP5Oj+HrLSLZpTJct9quGmGHPZcjt9K2vDtlBBZRyX0MKQWERkuZkUZOOQue5NcJrepS6vq1zfz/emfIX+6vYfgKwV5y9DpdoQ82TeH7qS01IXEZUk/KyP92QHqrexrZvLWHT5o5rMk6ddsfK3dYZP4o29xXL2pIlKj+IV1OnyrfWNzbXALROo81VGTgDiRf8AbXv/AHl9xVy913REbSVhdvGajIplvI8Nw9heMDPH91wciVeoYHvkc1YK5rZNMyasQbaNlSlcUm2hokYBjk0dKcRSGkIKKbmjPFMCWJsTrVhnqnG37xTT3k2jmpsaJ2GTnMh/CoSfenSPuOcVEWpkMGPNNJoJppNAiS3P+kR/74rdNc6khR1YYyCDitGPUVYHzmSM9hSZ0UpJaGkoBOK5NRjd9a3f7QgHSZM1hDuaEFWXYQgUnHpSk0007GAhVT1FH0oz6UGgeoh4pDSE0hyTQIXNJ3oFKMAUDEAq3pJ/4msQ/wBlqqE1Y0r/AJCsX+61J7Dh8SL2un95bj/Zb+YrJNauuf6y2/3W/mKyvWhbF1fjDtzTaU0mKZmFJt5zS0Y5oEIelIKU0DrQACg/SkBzQaAFHWndqYKcDk9KTGthR0pMUo6UtMQzvTqQjHNAoAcOKWmU6gAooooASnDpSUCgYoopBTutAAKKQdacKBCDinjpTDQDjihDHinDoaZk+tL2oEaWlzmG2kwuTv7/AEFWRquHG6IYzyQazrZgsDAsAS5PP0qHcS3WlZGvO1sSzyeZcO4BwSTzQDxUfelzxTM276koPpTwahBPang0CJc04VGDT1NAiQGnA5FR96bNcRwLvkbA/nTDcsrmnPIkUe6Rwi+pOKpw/wBpXihrS08uJuks3AP0z1/DNW/7GtbfFxrN2Zn67CSo/AdT+lNJse25U/tKSeXydOt5LmQ/3VOKtR6BqF26nVb1LOE8kLyFHuR8o/PNE+vtBF5GlWyW8XTJUD9B/XNZM8l1dN5k7vM3q54H0HahxS6lI6DHhzRmDWSvf3K9JJGwgPr/APqH41najq+qazOmnwPlrhggiiG0HPqetY+SMs3zEUlrdSW8jyKMu38WcEfSk5aWQX1NC+2C7WygObSx+RTjHmP/ABP+JH5AVDGu1mbuxqqsqSPjcUfPUmp1Z0/1g4/vDp+PpUpoBNmbySQ/wgAfUiqtwuJc+taRGVBHfmqN2PlJ9DQPoT6ew8pvY8itvTtrK8UqLJERgo3Rl9Pw9awdOwySgfeXDY9V6H8uK3dLyCAR3xR0EjO1vQjZg3VmWlsiec/fiPo3t6GsevRYcg5BwcY+o9PcVyPiS1tbe7DWyiMv1RPu/UDtSQ2jIIqS3uHtpxLFjevQkZxUNdB4Y0WLUpmaR0ZY8Fuc4z7f40N2FFXZvaTdXWt6JFBeQxw6bbEtII8g3TjkbvYVwkpHnybRgbzgenNeq3sSW2jSxwrtVU2gCvLLpPLvZ0/uuRUQNKmw+zTdcKe2f6VuabK1neLMvG09u3vWVYoVY57NWrgKpJOBVtXJg7am5qWkw6xYxyWJVJwc2+DjY55MXsCeV9Dkd6wLe9uYbffqMDogcxmYDow6hh2NXrO++wWslzcMUtWG1Y/4pT149PrWZa6ne32v3F4JI42uDmWMrlHX0YdD9T9ayhzRv2NqnLKz6mpFIkybo2Dqe4OaVhWtd+DNyi50yYW8rKGxC2VPtj/CucujqmmOV1G3LxjjzIx/n9a0jWjLQzlRktSyeDTDUcF3FcDMTg+o7j8KkPrWhg1YaelJQSaYSaAHBsODmmFsnNITTDQA4nimZFBNMJpAKTTSaQnmm5560DFJ/OmuSaU9aax5oAb+JpBSUZoCwNzTTQc0nagApD0pDRQMDRRig0CA9aKbnJp1AxDVnSuNUjPXCsT+VVu9KjtG26NipxjIPahgnZ3L2qXUVy0RiJIQHORjrVDvRQaWw5PmdxD0pKXmjFMQh6UCkNAoEIetFHc0tAxAKDS4pKBB36U+mU8CkxoBS0DoKKYhD0pBxSkUnShgLSjpSUUALQTQaSgYUuc02lpgLSg0goNIY76UZpo9KU0Eju1JQOlLQAA0oNN6UtADjTgaZQKBkuaM0zNGeKBEmaerVEgLHAqzHF60wBWqQH0p3kjHFMxjiiwmPB4qTw3bW+pa9I94N8FsvyKehbPGf1NV538uFn9ATUmmM1n4XuLpf9ZKxwfx2j+tCV2UtDV1PVo7HU5zZgEzbESVjkxAAghc9MmsXbJcSO7PufPO45JrPmLzAgkliMCrVrIzxJIDhuh+tFxsk4jlEbKMnuKLgA4Q/U1FckiZSc5pku5gWzzQFyM7Q2RwKRhGy5b8+lV7h2QADv3rUXRoIrZZ9Q1BRuAPlxjceRnrU3C1zHlCBjhtwq/Y2d86hinlwn+Kbgfh3NWoJ7eFtun2o3/89ZBk/mf6YpJGmdi0sjEn0/xpWHYa0ZiYqT07A8fhUFym6JvpVhh0GMcdKglyWA7EEU7AUIZGglSVOq9vUeldbprRyJE8X3W5H+H4VyQBJx3rT0e6NvcIhJ8qRuP9lv8A6/SgSZ2Ujx29tNcTtsghXdIR19Ao9yeB+J7V57c3RvdQe4mAAdvujoo7AVu6/czX16NNhOYbdt85XoZOh574Hyj8fWsXUrUWt1+7BEbjcoPb2qepTLdqsTSKkkash6g1cs7iDw94uUI7tajCTbuoDAZ+uM/pWXaXEcckbS5wCN2BniriWsmrz3995f7iSbYJCeY2Y5XPt2P1okgiz0y5jUxSxOwKlc7h0I6g/lXkF05luZpf77lh9K6u016T/hE5LCUlb+A/ZUz1Kt0/755H5VzmqIseoSxx/dQKo/AUooqbuT2pBXP0NXUYSSkGF5ynKxJ/F9aoWhwo+grQfdCVlhkdHXo69qtkIx7u5mvL4tfMYyvAQrgIPQDtV22ZIlPlxqynqep/Ot2DV4L2IQ63p8V0oGBLGuHH4dfyqGTQdKuGL6RqTW8naKbn/wCv/Os1K2jRryX1TJ9M1qW0QRxS/u/+ecnGPoa3otagu4wl2gOepbgj8ehriL23vdMIF/BujPSaM5U0Mx+zPsY7WXoKUqUJ6oqNWUNGdFqnhmznUXVnJ5LHkPGMAfUf1FYiia3vZbK6kWSWMAhlGAwNaWi6hLFpF3AWJCWzOme2O1J4njUXWm6igAEq+W5+oyP61FNyjKzKqqMo8y3KTGoyac5OaiJrpOMCaaTQaYTQAE8UwmlNMNMBSabmkJpM0gFJppPNGaaaADNJnikNHagAPNIeKU0nai4CdaMUdDQevFAwzSGlNN5oAAKWgUE8UAJ3pe9JRQAtITxRSGgQoo6UCgmgYlFKKQ0CG4pR0o7UCgAyKQ4z1paQj1oAKkNBTPSkwQaGhrQAeKWmj0paBBSGlooARTS+lN706gBRSdDSU7qKAEoxRS0DDPFGaMUUAFKDmko6GgBTQDRRQIXrRSDpSigBc0oNJQDSAXPPNKelBpUG5gKYyeA7EJPU08SkkCon44FOiViw4oEX4jleRUcv3uKkX5VqJiGJqrgVtQONOkPfIH61pXkPleF7SFuCdhI/M1nTxm4eC1H/AC2lAP0rV8TSrFDFEOiJn+gprS7GtjnEfFxEP72angfyr6SE/dk+ZfrWaZCWRhxsq3fHa8My9Qf/AK9ZXKLeocGMj0NA5jP0pl04kKEdNufzpsEmYFPXK4qrgyrdkbQCMk9Ks2OZ7GRerx9Peo7iPdCSOq8/h3qGxuPs14jH7hOG+lJiRfhOMMPwrShlR0wxAYVSli8mZk7ZyPoalWPcPQ+vrTGLe4JRgc8Hmqu3P4VPIrBdrDvkUxR81AGZIPLuM9gQauWsKSPPaPwZF3RH0YdP8Kgv0IudoHJAwKSdbgNH8jRyRYBZjjBFLoLqd1oGhWsNlHE75uT88o9X9PoP8a5zxYbcXHlxSI7xNyFOfrWO+rai8m43s2R3VsfyqqXds7nJycnJqUim9LF63gh+2WqyglHcb1z+ldl4PaFLfUdKkAJinY7f76Hj+g/OuA8xwysGO5TkH0q7Zate2N+17BKBOy7WJUEEYx0oldii7HT6pogh1dL9eYlUl892H3T+P9K5G4bzbieXsXxXbajqsd74cNypUeZGCyg9GHUfnXFvE0Vou/q+H/A9KcUORPZHKD6VqLkxj6Vj2Jx+da0MgAweucAU2CI2TY4ZeKJ2eWMK2C2eDjnNWJV+U1Xj5mBPRMt+VFguXtYk8rwrtMjfvpxEMnsOSf0FUNoESqpyNuAfUU7xQrI2l2JPCxbiP9pjzSd8DtUQ2Km9R8Enk2d9z/y7MB+OBWxqK+d4DtJSfniVc/VT/hWBcHEDp/z0AT8yK6ZFE/hu7tQMgAMPyIP8qma6lQd9DBc55Hfmos0yB99pEx6lRmhjWxz9Rc5ppzSZ4pM0ABOKYTSmm0AIab3pxppoAQ0hozSd6ACiimnpQAvSjOBTaWgBCcmlopGoGITS02nUAFJS5pKBBRRRQMDTc0uaBQAooJpO1FAhelIetBooBCUZ5opO9AxRSE89aXpSUASBjS5NRA05TQArA5pM+tSZzRtB+tAhmKKDxxRQAhoFFHSgBaVTmm0o4pAKRRS0nSmMO2KTnNLRQIKDRRQUFL1pMUA0CFHWnU00dqBCnpQKUcijGKAAmp4RjJPU1EiE1aG2NOaAECknJqZGVDlj+FVmmzwtC5zmgCy0xYYAwKRelRipUGRQA7TkabxDbKOkSlzUPia4EtwUBySfyUcCreiyeRY6lqb9QCkf4f5Fc2zvKxeRizHqTVP4StiPHFXWIl07P8Sj+VQNCwiLn8qktDmGVPxFZgh9u++Ibv4OPwpbU8SJ/dbI+hqC0OZCn95SKktmxL7lcflTSGWxjNZs0flysvbt9K0R1qG7i3R7x1X+VMRcinF1Yo//AC0h+VvcetPSRl47Vm6bMIbsK33JPlatIpscoeg6UkBZDLLGc9h+VNs7drmd4kJG2J5XKjJCqpJx79B+NQowjljzghnCkH0PX9K0dFv30PUZJkP7zz3ibOOY0Qtt/EkflVIZnwTLpjxm5i8y9dAdufmjU9FB7M3UnqB7ms3Urs3MwjQAv0OwYUf7Kj0H61GsjXN489yzOzku7Z5JPWlaRGkzDGEH3V7YHc/jUtAQlBD94b29AeB+PemZ5qUqZSz7sIvG4/yApn+6vHq1ITGjmloPJ60uKpCAO6xNGrEI3UA8Grs0nm2AYnJBVfoAuBVHFOVioIzwetILliyPzH6itReHB9DWVaD96cdxWrQNbE0khMBJxknAqOwVpr2KFR/rJFT8M5NMkbEY9uas6K6w3X2h+lvA8x+uMClJ6FwV2VNauPt3iuVh9yFgi/QcVIRgA1n6bukkkmflmbJPv1/rWi/+qX60JWQN3dyCZs3MUXfKt+tdLofzxyox+8CP1FcnJn+3ol9Nv8s11GhShdRSLPLoxx9MVM/hHT+I5u1G2OWL/nnIy/rT2zUs8flaxqMXpMT+dIwq4/CZyVpEBJpBmnkDPNLgEZFUIiY02lam8kUgCkxRmkzQIawwcmkzT+oxUfegAzQaMUUAFJmiloGJSdaUn0oFABig+1GKKQhMGiiimMKSlpDQAUUoFHegBDSdBTvekpCEzR7UHvSjpTGIelIKcelIOlAgPNIRS0H6UAJS96XFAFADhTgaEXPWn7QfagdgKbx71AwKnBqcZU809lEic9aQFXNL1pCCpxSimIToaWjrSdKBj1opFpaBDelGacRTKBi0uaQUGgQ6ikHNLQMTtS0dqTvQA9adtPeljFK5wOaAEDFaQsXPPQUwkmlFAiRQBUoqEc1MooAkX3pZ2MdpKwPIU0q1HqJ2afJ/tECm9hoW9kMHha0t14Ejbm9+/wDhVTSrbeJLuYfuLcZwf4m7LU+pI9w1jaRD5mQYH4Af41a1MJa2cVhB92Mb3Pqx/wAk/lQyjLkLOCCeT1qvbNtnAPRuDU+duKqyfLIccEGpJHx/uroH+69KDsuh6B6SYhpSw6Ng/pTZDly3frQBoHgdKDyCD0IwaOoB9aKCrFB02OVPbvWrBN59kjk5ki+V/cetVbmPKB/Tg0yyl8m5G77j/K1MRrWWW1S1UKHySqqTgMxBwM1V16FrbUGaN2eCVjJG5H4FT6MOhHtVqxtorjVrW1uXKQl/nK53Mo52r/tHgD603xqAnii8jQJGu4M0SElY2IGRz39TTWwMw1lChxj7ybaGIMcajsDn86bJG8b4YYoqRC7uFX+Ef5NDsXb0A6AdhSGgUWGFFFFMQUGlpCKBliyP7wZ7itYcqKybQfMh9yK1UPy0gQyYZTaOrHFWZmFtoOoS9GlZLZD7DlqhXBlUnooLGo9fYx2Gm2Q+8yGeQe7nj9P51Mi46JjNNTbar6kZ/OrB+8o96ZvS3Q7yAFAFTW1hqV/ZSXlrb7IIxnfIcF/oKbaS1FFN7FHIPiGQn+HP6ACtDTLhk1+0kB45X86xVkK380nViD+tXrNtmoQseMBG/X/69S9UVF2Zf1cbfEdzj/lrGj/0qvJwKv8AiGPZrsD/AN+Ar+RqhJVU/hJqfEVmY0nmYofmmEVZAMeeKTNIQRTTmkFhSaTvRQTQAvemn71LGfmxSOMPQIaetFFLQMKaT+dKTTTzQAU7tTaXrigQ7tTaO9FAwooooAKKKQUCFpMetKB60UAB6YpBRmg0AFJSilIoGNpBS0+OPPJoENCk07b71KVwKjJGeRSGNxR3peKUDJpiQBsUoc0MtJt9KQyUc0cryKjBIp4INMBsgBGaixipmFNxxzQBHmg80pFIKAEqTqBTDTlNAhRSGlpDQMKQ0UtACZpaSigBaBRRQBYi5FEwG0GmW/Vqkk+7QgIS2eBSjpTT1pwoAetSr0FRLUy00BKv3qi1FTL9lth1lk/+tUyjmi3Xz/EEA6iBNx/z+VD7DW5qG3SPUZbt8BUiCJ7AdTWDdTmWR3J5c7j7Dt+lbeuyeVYiMHDSnp7DrXK3Dk/IPxNEtNBsN+9iR0zTZhmVqWMYjJpW+Yg+oqSCPvSmlCmlIpjLcLboEPtipe9Q2v3GHoasYNAwGGVlPQ8GqJQq5BHINXl4Y02dBkOPoaYFm0nxc6fcn71vcKWJ9M9f0qeJYtV8a20ki7lu3811PIJ5/wABVG0ZRcKG+43yn/GtHw7HGni/Sk3btksiMPT72KFvYCn4htfsmoXMOMBJOB7HmsQ8Eiuz8dWzrq9xKY38p0XD7eCcetcc64OexpzVmISiijtUggpaSlFIYUdqWigTLFqPkX/erSQfIayrSQi4RDyrHH0rYUYDU0NDURnDKv3nwg/HiqmrOb3WpTGeA4jjPoFGB/Kr4YwxGZRlowXH17VlWQzMSew5NS9x30LcLWNpKGnje7lByRmtoa3eahFKmxbe1hhYpEh746k96zVQeWdqhV9AKtWe37DfkfwwkfoaiUVuzSMmtEczGcux7la05OJQV4wuPyrMhH75B68Vv6VatfyzW6/6zaXj9yO34ir2REdWafiHEp0i6Xo+VP4qP/r1mOlX71g/haxlY8wTL+GCVP8AOq74yccjNKm9Cqi1M6VOagORmr0ig1C0fFaGZVJNNPWpWXFNIFIRHRTjjNMoAdH/AKwU6YYekiHzilnPz/hTCxEKM8UZpKQAaMUUgNABS0YooCwtJRRigApKXpSUAFLRilxSAB0ptKfakpgAo60nSnKKBAo5pWHNPxxzikYUDIyKsW67lFV39Kt2I+Q/WgBZVCg/SqTMM1euziPNZzdaBE6j7xI7U+JQW56UzPNPjOH5oGh8ijHFRcg1YYHFREZ7UAMJFKDTCMGgEg0hkuc00inYyMg0nUYoAaaYRUhppFMQ3tSdDSnrQaAHDkUlIDinUAJSUvekoAXtSYoHSl4oASlFJR0oAswL973FKRUcbbcGpxyM0Bcrkc0oH51KUyOBTSuO1MAHFSio1PNSqKaAmT7tT+HkE1zeXOOGYIv0H+RVWRtkDt/dUn9Kt6U32Lw4Zhw7AsPqTgfyoW40VdZuBNezENlIhsB+nX9aw+TyeTU8pO3y85PVjTABgCp3dxXE52Ae9OA+QfWgY9KcOlADQDTtop2KUYoAfa8OR6ireMVWiwJAatLyKAGKP3jD8akddyEetIB85PtUo5FMZTRctzWv4dgMfiPR9SZ1cT3phkUDGxhwPzDA1R8sBs1Np9z5GpqzDKxyRTqc/dKuob9DRsBe8aeJ7yTVbqwtLhTYJiPaFBDHHJz9a5EuzgbsflXSfEDS7ew8TyraKI4pIlmK54BPXH48/jXNDoKUr82ougUdqmMDCyFyQdrSmNT6kAE/zFQ5zSGFKKMUUAFFFIaAJLYZuosf3q3cYBrL0mMPcOxHCJ+prYkGM1SAgvXxYso6yEL+HU1TtEw0h9hVq6+5GvoM0lumFY+ppPcZMp/dn6VLF8mlai396P8ApVY5AH0qyT/xIbxvX5f5VE1oaQOcTiVD7itzSrlrLUEuF6o2fqO/6Vi7cNn0rTVtswYdAc1TV1Yyi7SOr1i0WXTb9IQDFMhuI8evUj8xn8a52CTzLdW9QDXTaNcLPpTQsRmLKf8AASOD/n0rkbE7YCn9xiv5GsqOjaZ0VujJXPNR7geKkccVA4xW5ziSrxVdjzVhXH3W796hlXa1IQw5ppp5po5OKAHxnb8xqJ33uSalk4jqFR145pAFGaQ+9L1FMBDk0tFHalcYZpcUgp1MQUUZppNAgPrRg0Ype1IYlHalpppgwpKXpSqNzACgQKpY4xmp1QCnRoB93n1NPOBQMjIx1qF254qSZsVXOSc0AGMmr9mv7sntmqS84FacK7YgtAiten5QKoke9WbtszbR2qAj6UDJQKRuCKM0poAsxndHTGXFRwvsfB6GrTDjIoApuMGmd6neoiSO1FgBSR0p/B5FMFKvUUh3HGkIp3TikJouBG1GKc1NzzQJjacc4pDSjpTAAc0pFJRnmgVhMUc0oxRnFABg0mKUHJpaAEGR3qeE81ATxT4yQKSGXFIxUoUEdKrIc96txdOatICFowORSovNTsM9Kaq9fanYCpqRKWe1erkLVvVHFvY21qP4RlvwGB+tVrnMl/ZRAZ+cNj8aZrsub9kHOML+VTtcfQoKM8nqalEeE3t07e5pYIyQrsMIT1NSyP5pBA2oOFzSJK4WnAVcg0+eaETKhWE/8tZCET/vpuv4ZpyCyQld8t046i1HA+rMP6UMdipjGCePrVlLCcxeY6eVF2eUhAfpnr+FWIr2VAVtIbeyBGCwHmyn/gR6fhiq1ziRcuru/UvI+ST/AJ96SY7WFESDcYpVl2Y3bQRj8xyKljFU7XEVzD2WQmNx9eh/UH8K0kQjrwe4pp3AjAwRT1HNOC8/jTwvNUIaV4FV7pWihaWNQxUEEeoPBq5inKBnkZHcGhoZN8QWF2uk6ihyJ7YAn34P+Nch3FdbKEv/AAzdaZ/y86ZIZYQf4oic4/DP61yGcmpfcDf1BAvgrSWA/wBZcTMfzx/SsEdauz6k8+kWdgchLZnIGODuOc/Xk1T70AxwoNJRn2oAWm4ZmCqpZj0AHJpc1d0Q51ZMD+Bv5UmJGhYWpt7QKw+djlqssuUqV+OKaOSB71dhlSdQ0jegOKdGuIh9ae65JPqaBwoFIZE44qw/Hh2T/ab+tRMO2KluB/xJUT1b+tRPoXHqYmzJzVoD92p9qZtwKlT/AFYB7VZmjQ0K6NvqsQY/JL+7P9P1qC4tvsmr3lv/AA7hIv0NVirbdyA5Qg5HatbXPmvbO7z/AK+EqfqOaxtadzW94Ge/SoWqd6gatWZELU6QbkBpCMmnP90CgCEihB81KelKh46UkA2U8YqNDhuaV2y3FJQAjDk96QClpaEIbilpaTNMLhRj0pc0UCEP0pKU0goKQooopCcGkJgaSjNHemAtTQJnpwP51HEhdunFXRhV44oAMBRgVBIxzgdalLZFRnC896AImXjmojycCpjuduBxU8UG4c8CgBtrBlt7DgdKtO4RSTS7gAABgCqV1Lvfav40AV2O5y3qaMCj3ooGSYFAHHNLz3pKADFTRv8ALtNRZpOhzQIndeKhIqwjBlqKRCM0hkJFKvUUvUUDrQA/rTT1p1JSGxh5puKeab0qiWJg0lPyKTHOaBBjikIox60uKBjQOaWlIFJQIKMZo6UooGIRUsYzUfU1PEPlNCAcODVyEEpVQKSQBV6IbUxVIANAGQ1DHmnw43NnpimBWswJNeLN92CPP0P+TVOC3N9eSzzHbACWdv1wKs6SklxDeSodrTME3Hsvf9KsagyQW6W8Ywo5IH6Cl0uPYzruQzsRGuyNV+VR2Udq0SkFveC0slAlXIaWRQ7k+oz8qj9fes6MZzuHXrVlLow61bXbRK/7pSyN0cgYYH64NK4izd6VdJ5Ut8xnMhxvkYvt/A//AKqqR6fcXLtHF+8Ccsd4VE+vYfTrXQa5rv8Aa0KRrbGJUywzJubOOBnA4FbGktojCN5rjzbW3t9yxLDgBsck88knOT1zjtRKK6Ci31OXtrNWhDJKsjDgiNcBfbLEfyqrc27o/wA3I6Hocds5Hvx+Vb0txrt1cSm0tI7XTnbcsUSKo2j9TVW5jWW2kxtj3DacnhG/op/QgdqzTsW0mYVxA32eUAcgbx9V/wDrZq+jiaNZR0cBvz6/rmpnUCNi64aM/OrDBHrn8Ko6efLSW1PJhkIHup5FUnqFi2o+Y5pwU0gySD0FSDNaCEA5p4U4zQB69adzjFAECSeXcXJXCzoizRt/eX7rofYjH5VjWVjbtILnUJGjshMUbaPmOOcD+Vad7KlpcWt0yeYFYq8X9+MjDf8A66g8QQra2tvHbtvtpGMsb/3gRwf896gZkXbQvdSNaxeTCTlULZ2j61EKOaDkHBGCOtIkKkiMYJMi7hjgZxUdJmgB7kEkgAD0FWNKnjg1EPM20FSufQ1W2ny954GcD39aYRnmkC0OxYZwcjHYimqPmrE0rUvJxb3B/dfwt3T/AOtW/jkHqParuUV2SmlcqancHcaZtOcUMCAA5GakvOLKBfXJpGGGFFwSyxqeig/zqWNbFLYcU0gqeKsEGmsqhSXYKB1PpVMkS3uDDOkmzcOjr2YelbetxJN4fS4tTvSFhIhHp0YfrWNafYbiYR/agpPTcNoP4mr8F9Y6fK0UV4s0MmVljZSUPGM5xjNZSXVGsHpZlDIMYI5yKYVzUhg8hzFG4kh+9DIDncn+I6Uu3FWnci1isVxUbAk1YkUiomo2FYhYcUN8q05utMlPIFCE0RHrR0paTvTAKKBR35oEFJjJ4oozigDRu9La30qG9BBV2weetZ3WpmuZGgETOxjU5C9hUIqI3W5UrPYKUUlKaoQh60006jFMQ0CnKpZgBR9Ks26EYzQBLGgReaaxp7mq7NlsDqaAHEnoKcsLN97pUsce1c/rTiTQIFjVRSFjnAHFRzTqgx1b0qq8rOeuPYUxlieYKNqnLVTxyT1zS4HWjvSAD04plPNNNAy5TCKdSUrgMIppBp5pnemAqNtbFW8B096p1PEx/GgCMrtYimspB5qxMmRuFMVgyYbt0NIZGKWpHi+TcvNRZpDEamnmn9aaRzTEN70d6U9aOhpiYlLQaSkIOc0UuKTHvQAUhpe1BpgAqxB0quamhOKEBaXip0YCq4bNOzTQybOTRI/lwSN0+Q0iHIqDU3xYuB1OB+tMEXNNKWmjo7dAu4+5NZhdp2LueWOTV29jY2sMY4RVyRVWGLHU0PsDFC4FEqH7MJR1glDH/dbg/qP/AB6rCotSxxebug6CVTGTj16fqBRYQ2CBn+70FW4tsFrJE+CpMiD1AJBP88/hVXTLoC2QPw65Qg9iKmublZDkAdSW9TkAEc8EHA/LrUoYyHVLi0jSMxtI6ghZFJKn3HrTVuJAwyCZGfc6jnHoPqfSq0kiq+VbykJHyksvHfoD/OoZL2CFh9nDEq5JZcrwew/x60rAWbq6PlEFgQEEQA/2SSfwBOB9KgtZP9NgkHSVTE3+8On9Kox/aL67ENpA8sr8JFEpY49ABTovMQSxPlZI23gHqGXr/n2pDOhIxSjqKRXEsaSL0dQwpa0WpNiQDjmh3SKJ5ZDhEGSaAVWMuxCqvVmOAKTQLdde8Qxw8tYW2JZsj7+Og+mf60N9EMtXFudI8Hz6nfRj+0NWXyYY2H+ph6n8SP51gaU/9qaS+kuc3ER8y1J7jPzL/X866D4k3xu9QECHKW6bRj16n/CuFgmltriOeByksbBkYdQRUvRgjQ1iCG01y5ihXEUUhCrnPSs9iWYsxySck1c1S/8A7Sumu5I1SeTmXYMKzdyPTNUutD1JCp7W0kuZCB8saDdJIRwi9yaZEgdgXfy4wfmb29h3rU1jW0ubNLDT4Ps9kmCRgBpCOhNZtu5pFK12Z7Mt3eqsabII1wi+ij19z1P1qqOlaljEIbdmb77DJ/wrPkUK4A9KE9bBJWVxoXnNamm6t9lUQ3GWi/hYclf/AK1ZoGSQOtNODVEI62G6gusmGRX9hwfypzDFcijFDlTir8Ot3MahZFWYDu45/MU0ykzacc01xnFUk1yB/wDWQOv+6QamS+tZvuShWPZ/lNAx5WnWltFdi6lmGbSzXL+kkp+6n0HU1BeStFEBGCZZDsjA9TWnqyx6fa22iW5BFuN87j/lpKw5P4dKGwSMQ7pWEcgEhJ4BAwMdT9KYW/L0qxG20XEoHJ/cp9OrH+QqpPuKhE+9IdoqRjIknhkBgn2x8nBGQPwrQtJjOGWRQsqdQOhHqKrcE/J90cD6VHhJFDgsrdmU4NAGhJjkVAy02yuGkZ4JvmkQZDeoqcjg0xFZhg1FJ9+p3qFvvUgsREUmKeR1puKaJY36UtHQ0hqhBSUppKENiYpRRilpCQoFITSngU3HrQhsO9LSYpKYiSNcsPSrijAqvCvFTucCgCKR+1NtRvmLdhUbN1qzaJiPPrQFy++1Y/YVmzT5yIz+NS3rHyguetUe1DGg69aKX6migYntS0lKOKBBikwPQU6jHuKBlkjFMqUjioyKQCGmGn00igBtKh2v7GkFFArF1fmXFVXXDEVPC2QKSdRnNBQy3bD7T0NNmULIRQn3xRPzJzSAjpTSUtAhhopSOaQ00DDpRRS0xMQUY9aKWgkMUnFIxxxQKQxcVKnrUfFSL65pjuWHilgdVmieMsoZQwxkHofxpw6VHuLHJJPbk5qRaEDHKcGotTI+zqM9ZFqYDpVfUBuSIesgpsET6m2LiFc8BeR+NIoBAINS6omWRx2+U1BFwBQwJlX3qVMqwIPPb60xMVKBTBmffRlb64KHAkUXCj6/e/r+VVvOYKeCcDJIGcVc1X5PImIJ8tirf7p5/wAaf4fuvseuiJ9hinVreQPjYVbpn2ziobswsLZ6TfX8ZbzYrbcVWITttMrMMqq/UdzxVy28N2qag0V7O7wtBHdRSD5cx7wJQR6qN3/fNXr/AFXSHngW3u3tIEjVUYJ5jwPE3y8d8qSufYVRfxIsb5sNNU+RLIbWe5c/JE/3kZejZJJ68ZpXHY07KV21rVdKudHht4xDJCn2YGE4HzohcdQ2zgnk5NcrdqkGoB4khRGCyCKGUyBAR90k9/Wporqe6tYbfUL65uLW3H7qFZMIvp8x/pmqdw0fmjyliVcfdjzgfUnqam47aGxpn/Hu0ZORExH/AAE8iniV7mYw6fA91KOD5Y+UfU1W0ZIpr2CO5XfDMdki5xnadw/TP5V2N34j06wje10KFJDHxuVdsY/Eda1gubqJ6GcNGt9O0+TUfEsgkZF3R2i8LnsMdzWrpMSeHvCk19c7FvrtPtDRjjAPCLjsOlczAX1zxFawahMWt483N256LGvJHtxx+NWNY1OTUzcXMg2i6nG1OyRRj5V/MmtEorVENswdXnaRC7tl26n1J61jGrmpuS8Yzwcmqh6ViMlMYkUMvBI6dqiFSQyALsbjB4NK8WSWTvyRQOxFT4IvNuFXsOTUdX7LbFA0jnBb1pS2HHcmlchSo6nrWbIwaViOnSn3FwZGIXgH8zTNu1OfvHt6CpjHqObuOh5lApjrtkZfQ0+DiYE9qS4ZWl3A8EU+pK2GEEEg9R1pKkl52P8A315+o4NR96a1AUCkbpS1b0iSCPWLVrvHkB/mLDIHufp1oEipFI6uhDn92dwGehFd3qltHdGK9hI/eqr5/vAisu4sZ5ZJZJ4CkKgqnHDZ/iyOMelN0jVYY9Meyu5lVrdz5bE9V9B+P86wqXfwnVStF+91K7IxtYNq5UKc49SxJpGh2rcXDdIFEae7v1/IZqWwnjntPlIyhIP0zkVNarFcWtwf9YjTE49cADNLna3L5Iy2M1FJUKPvOQi/U06ZVVyVGEHT2Aq5b2Za4mMRJFsmQG/vt/gKzNSLwIIZFKyE8/StFJMxlBrULIhtWhYdJU/pWrImKwWd7WWJomw8YyDitiyvBewElQsi8MB/OnclEbLk1C4+arbLioHHNCYMgYUwjmpWFRkVZLI6QinEU2ncnYPrQKKKLiClFJQaBoU02iloDcKTGTSilUfPT2AsxDApJW4NPQYQmq8hyTTEMAycVpwptiFZ0K5kFaUj+Xbk+1IZRuG3yH0FQGpM5FMpMBOwpO9Lg0YouAClAoApM4P0oGOpCTTdxpCaBGiWXuKaxU9qawppPNDGgOPSm4G7npStTe+KAEOAaTHrSmgUAPhOGxU8v+rqCL7+KnkHFK4yCHG/J7Us+CwxSxrwTTJOXoAZ2pO1KaTFMApMU7tTRSADSU7FNpoQtBoFIetMk1fDdhaapqpsrpyjTRsIXBxiTGVz6g9Kyimx2Q8FSQRQjNHIHjYqVOQQec0pYu7M5yWOSfWs1F81zRyTikKMVIuKjFPStDNEygd6lXFRL0qVelNajJRjAqvej5rf/rpVhaivRl7YeslDBE924kneHvgEfWoUHGKS55vWPpinryc0MQ9KmTk1GBUgIjjZ2yAvoM/QD3pjIL9FlgaLG55MKgB5LZ6/Qd6t3fh6z0womsXdxc3LRqxitQqhMjgFm7/hWy6L4asAskaP4hvFV2DAMLCLOQP98/56Vx93LealdStBvkG4mWUnjPuamSRSdi21to4lUww30WB3kjk/9lFQXNjHKd0MsikHrMA36jp+VVW0+TgQ3JL99xwD9DVedLy3fy7jzYyemScH6HvWVim9NiaWA213LBqAdXRTjaQcNjKn6VVDhTkkZq3b6fNPGspR3VyBuPAznAyasSWX2K+e0nXy50GSFx/PmqsyLkti+yL7QikmJ0dQRjcc4IHrkE1cliS2EqAjbG7DI7gGqQxHgooUj+Ict+Z5qCeR5AlupILNjinFNA3oX7GRo9OmZT+/v3+f/ZiU8D8W/RR61I8MskLJEM7E+ZmO1UHckngVQur6K3Aig+baMfLWfc6hc3MQiZtsIORGvAz6n1P1q3LoSS6lG6+SSvyEHa4IKt9CKp1c06bMcllLzHP90n+B+x/pVI5DEMMEHBqUNomjVZU2nhh3o8qaM5Q5Ht/hRGoZfQ56ipcTr/CHHrnFAIrGOUnlDz7VIkEshAY7QPWrALEfMuPxzR838LBR3OKBjGiSAj+OQ9B3P+AqBgRIwYgt3xVgDa3AIz3PU1FaQ/arxIi2FZiXb0Uck/lRcW5LHDAlss92X+c/u406sB3J9KfHDY3K7IpDby9llPyt+NVr2f7Tcs6jbGPljX0UdKgFRa5Sdi/NayRWLrKhV4ZNwz3U8HH6VT7VLHdSrCYSxaIjG0np9PSouwprQTsxDxU2n2xvNRgtgceY4BPoO5/KojV3RyUuppR1S2kIPp8uP60xIhvLt/OngtJZY7NnOyLeSMdq29Lk0OezihmC29wq4YyDhj65rm8cj6CjBHSolHmRcZ8r1Ot/4RmG7kL2l1A+eyTAZ/Coo9J1azZ7ezkiKZztZgSv0rlwzq2V4+hxVlLi4glDB3VxzndWfJNdTbnpt7WNnOo6S8q3kLyCf5gyD+L61mXpmnuWku0Cu0X7sDtitq28VztafZruKGYAfK8xPH5CsS9uvtF3EwdWweiLhRn0zyaIKV9UE2rWTKk53ylvUCptNnW2uw0hxG42sfT3qArhiPekzhgfQ1vbQ5k9Tp5FGBt5BHUVWkXmodIuvMU279cEp/Uf1q7MorLZm6s0UmFRMPSrDDFREc1aZDQSXGdOitRGg2SGRpAPmYkYwT6Cq3HepGHNMIp7El2x083SSPkBIkLux7CqJ68dK1jd/Z9De2UAPMeSPSsjtURu3qaTskrBSGnCjFaoxG4paM0UAhBTl4YUUqj5h9aYFocR1WbrVjny6rnk4oAfbgeYKt3n+oC+tV4RhhxU93yqfSjoCKfRaZ2qRh8tR0mMKSjvTwMc96BiBTjk4pBsB5NDnmmd6ZLJP3dH7nuD+dMCk9qd5Tn+E0CLrioWHNTvULdaGhkeeaSnnGaZ3pDAdKWkoFIY6P74qy/TFQIpyCOmamk7GgYNHIIVm8pxCxKrIR8pI6jNVm+9mrj3U7WSWhkJt0cyKmeAx6mqrUlfqDsSLMgs3hNvGzswImP3l9hVfvS0vFAPUQdKb3p1N70xAaSlx60hFAmOeN0RHK/I33W7H1plO3HbjPGc4ptNCYvQUCl60CmIAaehpgp60DJ1qRaiQ8VMvSmMkWkuBme2/wB+lWkm/wBbAfR6GJDZlzcuc96copH5lc/7Rpy0ASL1rW8HyJP4rW3ZUNyls0liZRmNZsZ3MO+BnFZI61d8OK6eJmliz54sJ/Jx3cKR/KmtxE0tl9nupZ9f8yWZ3JaHf89w395j/Cn6ntWbqmpqQokEcMS/6u3hXaqD2H9TzSQRX+qsojZ3nkUbpG5P/wCuluNOs9LcrIwu70feydyoff1NEikyhbNdz/v4o44oF53THhvYev4Vt200clvtu7YC3P3g3zxZPv1Q+/FY81wzuHuJMnsP6AVf0vUJIG33EJt0zgSAZTH92Qehrmmr7HRTaW5aubq20i3ubSxDtGVAkSbkqr9RnvjqDWBfsUu4JyxJPBJPWrurWscGsXsMIxBLEskQzkBSMgA+g7VlXTGTTYGPVTtP1rZO8Uc8kuZmi1Z08Ukk+d21R0OeauRPvgRvVQaYwpiKE0ccYVVyW6kmoQCx+UE/QVfaCN5NzAk+meKlCDy8AYx0xQFjKdWRirDawq1qG13huU6ToC3s44b9aW+QYV+/Q1F97Tv+ucv6Ef8A1qlgOtz1HuKvkVn23f6itA0AhmM0xuWx2H61IeBTUXLc0FET8BjUEO6O1nkHBfEQP15P8qluDgEe9Rysfs0MXp8x/Gh7CRABxSgcUo6U4DkUgE20oGTz6UuKfGOGPrUtjsREcVa09/LF4cdbRx+ZAqqRxVy2jzFeEdrUn/x5adxJFMAelLgBC7dOwqTy+Qvtk011MjccIO9HMHKRA+1adjDFfWrwsds0PKkdSv8AXFURGSNqrnPepIFe3u4W8wxHcMSL/D70r3QWsxLiznhYjbvHYrzTIreRWEjrtVTnB6mte4uAshW8hEbA/wCsjGVP4dqp3FxAyCKE7y5A47c0lJluKWxUmIEMf97LflmoM8Cp4YDNMwYkIhwf8KjnwLhwAAAcACrT6ENdRYZGgnSVOqHP1rpyVlhWRDlWGRXLnpW5o0oksDETkxNj8DyP61M0VTethZBzULVakXmoGHNSmaNFc/So2FTsKiIq0ZtDHYsOTmmZwOmaeRTcVRJYvY4IpUW3lMy7FLMRj5scgewqvRR9KFoJsSl7UYpaYCe1SRjkUwDNSx9aLjJT9yoQMtmrOPkqMLzTAF4Iqa5/1aGo8c1POP8ARVpICk/3ahHSpX6VGoJOBQAD17CjJOaewwMU2gBMDPNAKg9KRjzSAc5NAE6MOuKlBz3AqsDjipQDimhFmYY6VVdvmFW2+YA1Wli53Ci47DOtNPX3pehpDSA0bayhn0ee58/bcRvgRkcEVnKcjNKrMAVUkbutIoxms0mmaSaaVizEMrUjLlKhhbk1aXBGKolFb+GmMKmkXaaYwyPpTEQ9KQjmnEUh60AAFNP3qeopp60CG4GaKcRTDxS2DcCKQDFOAYjhT+VIKadxtNAKUjikpaZAAU9cU0cU4UASpUyc0/S9PutTvUtbOMvK54x/noKn1PTLvSL1rW+jKSD8QR6g9x71HtY83Lc19nK1yJRSTdEPo1KnIxST/wCr+lamdhhOXb609ajBx1709T25H1FLmSGosmUZp/2l9PubXUYTiS2mDfVTww/Kmr0pzBWXa4BU9Qad7AjR1/VrmNoFs1S3tpwTmNcHOeRn8QfxrHltk3ZkuTj+7GuCfxNaNwBfeDllADS2UvzEegO0/oQfwrIzgVU5EpE0QRGK20QQnq55IHuas/aLfT5lD3Xkz4+7s3Dn+/8AWq6OsEayEbmPKIvJJrOkgaHUpYrkFnID/Mc5zg5/WuX4mdPwRuXbmS3m1a6ltUSO2UBECElPfbntms24GwXEB9Q6/wBauKVJaFhgMpx/Ws+4YuiMx+dco34VslZWOeTvqWrA5tFB/hJFKxxJj1qHTm/dyL6HNOlYCYfWmBKBTl7j1FMztlA7MKkUfOPehDK13ho9vfGarKMWM/uyVYuP9YPpUW3/AIl0h/21FSxLcbaf60Dt1rQ61Qsh8zH2q+vShjQ1hz9KcOBSheaCMc0hmdckmXYOpr0HQfAT6n4cNzdMIZ5Rm3VhjI9W9Ae351xFjDcXGsRC1hMswYbEC7txz0x3+le46F4htdS06WW4KWtxaD/SopOPKx357f8A6q4sVUlG3KdVCGl2eF6rp9xpd7JbXUZR0bGDUEa5XNdZ4/v7vWp472KzkTTeY4JSmN+Dyc+v8hXLQcwr9TW9OTlBNmVSFpaAVFPRcRikYYU1Mq/KKbZKWpVZfmUVoW4Isr8jvFHH+b5/pVdUzN7AVcjIGnxRD79xKZ39kX5V/XJp3CxWlVQxJ78VJbaZPON5aGJB3lcZ/wC+RzRIgfhhnmoUhgEk0Lx9U3Iw6huw+hqYtFyTJprUQ5xdbsd0jXH6mqE4ZvlMgP1A/oamlt2RSdoxVRhWkdTGWhqQ3iSQqtynzqMGRGBz9RSXMMaxM6KpOAwYD8aNJsJ50luEgLpEMs23IUep9OasyYdSD9DWLkuayN4wbjdlKIASzgd33fmKp7C7yvjjJq2ny+WT1IMbfUdKBHtjKj3NaXszPluiiRxirFjcfZblW/gb5WHt/wDWqHHSmsMitbXRjszp3QVWdeafYy+fYRsfvAbW+o4pzrxWGx1bopsMVERmrEgPOFJ96hbjg8GqTIlFohIpMcU8009K1MxmKMU7ANLjFAho6UAU6jHegBKcv3hSe9OUEsMA0N2Glctr92mkYNKDgYIwTTWp7oVrMQdalnb9yFqNBlhTpyNuKaBlQjPFOUbR7UoFNY8Y7UgI3PNIaQ8ninYoAZ3pelP2+1KE9qBXEQHrUuT7UqrT9g9DVICxIhUnHSoSea2HtsjkCqUtmQ2RUstGdIvOe1R9DzVyWEjqKqsCCQaQMZSrTRThQJDkba1Wo2AaqjDvUsbZFAFyRQy8VWwd2KnifdwaJU7ikOxUcYNRmp5FyPpUJHBpiAUhpUFB4NOwiN22iu78E+HNM1XTjeXSzNIshj2BgAeAc+veuAnPFerfDRv+KafnrcHt/srXFjZONPQ6cMk27kfjbTLDT/ChNlaRwnzlBYL83Ru5ry2Fty5PrXrvxGcHwuQBj98v4/K1eP2v3KnAtuGo8T0JzQOlL1FFd9zkDFKW2igU2UEjihgj1r4YRaaNIllt33XxP77PVV7bfY+vrWj45XTDoEkmqD94nFuVxv3+g9vWvG9E1W80a9We2kZCp4K849eO4PcVa8VeJrrxDeI0vyIq7VRQQq+uM+teXLDTdbmvodyqx5BkUgY/KeO1LcyKqqD/ABMBUFouFFM1BsFB/tCvT2icm8j1Dw14V0ifSbO9njmlkuI9xQyYUHJHb6Vn/EiztdOi0xbO2jhVg5bYuM8jr6113hM/8UnpfPHk/wDsxrmfi3/qdMPTh+PxFeLTqSlXs2d8klE4W3csgNPkHn3Vva7iqysS5HB2gZOKgs+YxVzTlMuvpjnyrdm/Pivd3PNF8KXULQ6lZsu2KcEqpOcKcj/Cs4DCgenFNixpeuSDlo2BCH2boae3FTJ6WGizYH53HtVfWMS6uijgi2UE+/b+lLb3CQyMCGdyMBE6n/CqHnvJqsrykF2yvHQY7Csox965rKXuWHM5e2ZxxJGefYiqkjbmZscPz9DVi4/dTiUfckGHFVSNpIz0rUwZNYNiV19Vpb3kA+9RWpxdJ78VPdj5PoaA6Dp5M20My9QasROGKMOhwaoIxayde6NmprF8gof4eR9KBi3ny3AHoKaTjSm9WlH8qdqP/H0f90VHIP8AQIB/ekY/yFKQ1uWtD0u91Sc29hH5kpydo64HXrxV/WtIv9ClWO/QAsoYbTkY+o/KqvhvVn0bXbecAYR/m917j8q9b8b6dHq3hj7TbfO0IE0JHO5TjI/LB/CuKrWlTqJPY6qdOM4nn2k+FdY1aw+2WkIaLcV+8ATj0B61h3BMTtHkblOM165rV0nhnwKlsjqshiEI7EsRlz/P8xXi8jtNvc9XOcU6NSVS76BUjGCPZPh1oVnZ6ImpKVnvLkEM/wDzyHdfr61P4k8M2GqahbXM0/2aR3EcoBwZx1C/73H+cV5h4R8X3Xh65Kn97bNw8THhv8COx/CpPFni6fXNUjlgRlt4DmKMnO31OR3Pr9K55UKrq3uaxqRtc9obT7WfTvsEtsjWu0IIwMBR2x6EeteH+JLK007WZ7exuBPCjkBh0Pr+XSt+6+ItzL4aNrtxeONjzg4Yr9OzHoT/AFrhoneeUu5/D0qsPRnBtyYqk42sTN09jUxUhVPqKaU6fWrlwm2GL6V1NmMUVQCEkPfFSKNs8v8AdQLGPYAf45pypmNh0yDVqxggcz3l5/x5RYdwf4mIGFA7mmtdAempUUvLzAhZR1kKnaP8aSNcROQ7cPy+3huOBS319e37eZKrR26/chQYVR2zjrU0UROmxhY3Lly7/IeOMAflz+NOyS0Ju5Mpy7SPncc/7Jqsio06ozZU/hmrcsTYOY5B/wAArV8IeFZ/EF/ukzHZxEGSTHT2H+0f060pTUItsUYOUj1Pwrp9lYaBAtiyTRzqHklA4kPpjsB0xXBfELTLTR72OWznRWm+ZrXqUHr9D2rpprPU/CszjRFa7sbk4SJwWMMh6H/P41HeeAvt+lvLe3bvq8hMjOzZTP8AdP8Aj/SvMpyUZ87ejO+S92yPKDLmGcjgq4cVbBBj3diM1BeaZdaffy2N1E8Um7BDdRVrYBHt7YxXpNppWOKKavczWQiIP2JxUfUVeuVAgIA6CqW3BINbQd0YTjY09FkwJ4j7OP5H+ldD4asYdZ8QpYXEjpGysSUxnIBPf6Vy2mkrdtj/AJ5nNdZ8OHJ8aIc9Uf8A9ANc+Iuoto6aDuek2PhXRNPiYx2YldQfmnO85x6dK8NaUvdSg/3uK+jCQyEexBP4V83Yxeyj3rkwUnJu5pW+EmYccU09KkIphFenc4xtHNL2pVXmqEIBSnpTwpxQRwaAJtGgivdatrSZmEcsgRivUZIGRXs+meDdCsAM2n2iQdXnbdk/TpXjfhg48Vaec9J0/wDQhX0GXBAXuD1rysbOSkkmdtFLlPB/FRWHxdqMEYCxpMwVVHAHoKzyc8mrfi848b6n/wBfDfzqkOcCvRo/Ajmq/GyaLpk0yY8GplXCVXc5Yj0rYyIzwtRM3bv3p7t+lRAZpDFUZ5p+KVBTmBHUYoQWEUHvUgB7GmKcU4NzTEPCnPJqQLx1NQ7zSb6LgdBvPQ80jYamZ96N3FItDJIww+YVnz2xDcdPWtI9KYcd6Q7HPlSrEHrTlq5ewAMSKpigQ7tSKcGlpCOKBFlG5BBqxGwfIPWqMbYqyhxzSYxZUweKqvV+Ujy91XvD3hi41+dihENtGcSzMMgH0A7ms51FBXZUYOb0MBetDnbyRXsNn4X0OwiVBZJM2OZJ/mJ/oKbP4a0m8V0lsI4/7rRDYR+Vcf8AaEb2sdH1VW3PF5juAx616n8OTs8LNzwbkj/x1a888T2NvpetzWdrKZUjcruIxnH+cfhXovw7x/wixB4/0huPX5Fp4yXPSugoQ5JNDvHxD+FXPORcJgfg1eT233Pxr1nx6W/4RSVuQv2hB09mxXk1t9z8aMB8AsTuiwKOKWJHllCRozsTgBRnNdEvg/VBps19cxLbwxIXIkOGI9l6/nXbOrCOjZzxpyktDmycVNbQTXUyQW8TSyyEBUUZJJqvKdu4eleifC7S0SCbVplzICYoc9jj5iP5fnWder7OHMVSp80rM1NC8B2NpbrJqqrcXDLkx5IRD6cfeP6VdvvBmjXcbR/ZVt2wcSW+Rg+4PBq3rfiC10S2SS7Vw0uSkS43HHfPYe9M0DxFZ6/bP9nLRyR8srYOB0yD3rx3UrP3zu5VseWaxo91oOptaXWCD80ci/ddfUf54rHvzlk/3hXrvjjTRqHh+SULmezHmoR3X+If1/CvHbltzr/vCvVw9b2tPXc5KtPlkmj3Twt/yKWlc/8ALL/2Y1zfxaObbTP+2n9K6PwwceE9L458jOPT5jXMfFUg2ulkdMyf0rzKX+8HVL4ThbL/AFYrR0NhHqGo3DfdhgVT/M1n2fEO49B1q1ZSiDw3dTP9+7Zj9QeAK+gjvc8xlXVoTJ++TO+PPT+71/SqK3PA3jr/ABDkV2GgeEdR1myguZpFtrdkCq5zlwOMgdT9eBU+p/DOVIS2n3aTuP4D8hP0zx+tck8VT5rNm6oStc4r+0BCcRAH6Dv9azhvD7x94HJNTXdpNZXLw3CFXVipBGCCOxFFvjzNr/dcbTXQmmrowldOzJ/MFxauMfMBnHvVMU5S0E/PY4PuKTjecdM8VSEICQwYdjmrd2w2MPUAiqmKu2Jt5NQtheFhAcbygycZ5x71MnZXKguZ2L+l+FNW1HS5761iJij6gHlvYDuR3rJTfbTDzFIYdQfSvoXThaJZWw08x/ZAg8kocjHr9fWvMvidHo0d5utMLfZ/fKmNuf8AH1/xrgo4qU6ji0dlShFRujir5g9wSDkBQP0pzrkWcf8AslvzNVs5Vj7Vbm4v4F/uxgfpXeziRBcxkOJF6jmvVPBnjCwtvDkdrqcrLJB8seELbkPQfhyK84kjBXmn6d4f1HVJdllbSyDPO1TgfXsK5sRCE4+8zpoyaeiNn4heIE1vU4ktWb7JGu2MMME9ySPr/KufRAI61db8K3GgC2e7ZPMmBO1W3Y7cn1+lZknO1B1Y44p0eSMPd2FVUnLUv+GfDU3iLVfLQ+XAnMkhHCj+p9BXqdp4M0WzhRBZidsYZ5mJ/QYAqfwzpX9kaHb2+zbM4Dyn/aI6fgOP/wBdU9S8aaZp98bRt8rq212UgAH0GetebVr1Ks2odDqhTUEZviHwBZXtq0ulReRdAZEe4lH9gTyD+leZrbvbStDKhR0JDBhgg177aTwXdpHcW7q8TrlT0z/gfavP/ibp6QXltfxoFFwpDkd2Hf8ALH5VWHxEubkkKcE1c4gDLgVo3keYR7EVQg5f8RWtcYKeWAWkfhVUZJNdc3ZkQjdGYMKyr3Y4A966/Tfh5qVxaLBeyxQRGTzCpOWz06Cm6X4EvrsxzahItmmdyqwy/wD3z2/E16jEw3gE8/zrkr4nlsoM1jBW1PEtc0CDSPET2CTOyJhWZTtJyoPT8axpPMX7rzbR0+Y9K6fx9MifEK7YHgbC312DNRafokFxbeZOZBI/zkI5AXPIGK7KcnypsxnFdDlJJpQD+9dh6E13/wAP/FsEUA0m98uFckxy42gE9m/x7d6x7vQLZEJWSb8WzXNXVhLbTboiTg9ac4xqx5WRHmpu57N4l8UxaF5SKEkuGYFoy+Nq+/ue1XD4l01tFbVBOPs6DDD+MN/cx/e//XXhM5uLk7ps8dqYXuhCYznYOpxziuf6nCyVzX23kbfiPxFNruuJcSgBE+VFH8K9hnv161CSOmeaTRdBudU1K0trZNzS5J9AB3J7D3ruPE3gu30fw6tzbTPNPG+JWbheehA+vH41rKcINRQopy1Zwkq7lx64qjcf69/rU73RyQgA9zVV2y2Tzk9a6qaaOWo0y/pqjyppCOSQorpPhuAfGUeewc/+ONWFaJt0yP8A2gWP41u/DfA8ZRZ/uv8A+gGscR8DNqKsz2KUjy2yeinNfOIH+my/UV9GuFcsRzuXn6186MMX8v1H8q48DuzWt8JM3FRkjGSQKtWdrcX90ttawvLK5wqqMk131t8Po7fRLl70hr9oiYo0b5UYDPJ7nj6V21K8aejMIUnI83GKkUVGE2Oy9geKnjHFdMXdXMZKzsO9BSOMA1Z060uNSvFtrKJpZWOAqj/PHvUV5G0E8kMow6MVI9xxUqavYbg0ri+HAG8TWQPAMyf+hCve45MxevzHg9a8C8PnHiWyz085P/QhXvaBTjJHJ/KvJx/xo7aPwHhPi4/8Vtqf/Xw386ggGSD6VY8YqF8banjp57H9aituWRQCS3pXqUmlTTZy1FepYdK4Raqk4GepNeg6B4DafF3rZaGFvuwqcO3uf7o/X6VwmrWp0/V7m1YY8pyPyNRDERnJxQ5UnGNym5zxQvJpOvNPUV0WMSazZFuUaZd0asCy5xkelWNSuYru8Z4IvKjJ+VM52j0qmq5OBU8duxPPFHKr3HzO1iMKAaXIq2toD941KtpEPemSZuM0uz3rUEEY/hp4RP7q0wAtijdmmMwqMNnoag0ROG7UuKrkmplbKikUJIgddprJmhKMw9DWxVe6jDRlx6c0E2MundqTHNO78UXsCRGCM9asxNxg9K6e18HCaGFnvY45ZEVyhjJ257E1z2p2v9n6lc2fmJIYHKF16Ej0rKFaM3ZGkqUoq7J9NtpNSvoLGH70sgUH0969dsraHT7OOzs02QxDGc8n1Y/XrXmvw8CP4gLsMlI3Iz67a77V1mu9Hu7S2k23Ese1S3APtntkcV5uMm5VFDodVGNoXMnVPHGkWV1tUyXTqcFoiFT8Cev5Vc0vxXpN8uUuPKdcuEmwu7AzgHoeleQavpd7Z3jpdQyRuT911wfw9fwqpbGWJ8xn6g9DWywdOUdGRKs4ys0T6jM1zqksrnLMxJPueTXqXw/A/wCEZPX/AI+Dz/wBa8oZW3Fm5Zjk16f4HkdPDY2sAPtDE/TatVjI2pJCoPmk2XfH7E+EnB5JnT+TV5LAcRE+5r1HxvMsvhh8ck3Cfj8rV5dF/qW+pp4H4CcTuj0H4VSA3t6pVciIMGx8y/Njj612euSqdH1GM/K32Z8+/Fef/DKTbqd0oHzPbnBPswrsdWlP9m3+QMC2kw2evH61x4hfvzppL3Dxydt0rehNew+DDHB4XsQBjcGfd77jmvHJVO5x3Br0TwHrEU+mDT3cidMlBnG4dSPqPSuvGRcqSsc9BrnaZQ+KAuJ9YV1VzF5KCPjqOc/rWR4FvpNP8QW4YNskfYwJxkHivUHljK4eJJYweVkQMPyNMS30ssGGmWySKdyv5WMdxXLHEL2fI0dDp+9zGxJEssbRtj96pRlPTkEV8/3aGK8eM9Ukx+Rr3qKZHljGTneNwPbmvC9c41y6Ax/rj0/3jWmBerRnXWiZ7L4cZf8AhGNKDZA8k4P/AAI1zfxQJ+y6YCckGTp+Fb/ht0PhrTFOSwhyPb5jXO/E4r9k00qcgeZ/Ssaf8c0l8LOHLMNP8tPvykIv410uhaQusa1a6ec/YbJBJcEH72ONv4nj865a1mAuoyefKVnA9+gr1DwTBHZaAJW/112xkY99o4X+p/GvUxNX2dPTdnFRp80rnUyzBI9yFUCL0ztVVH8gKZ5yyoJFlV1x8pUhgfxHWvPPiPrUkUcWmxSZUqJJcep6L+A5+pqp8OdSma7ksywKSIxwTgBhyD+IyK8r6vJ0/aM7VKKlymz8R9HS705dTiQCeJgkp6FlP3SfoePoa8tzx717nq/7/Rr6CRBl7dzgnpgZH8q8NYZuJF75JFd2BqNws+hy4qCTuOkO8q56kYP1pg4oUnGM8daWvQOMKjYHIPNX9L0681S6+z2MLTSnOFUcnHWrup+G9V0u3M2oWjwR9AzrgE+mfWs3UjezZoqcrXRNoXi7UdHs57eCXCyDjcM7G/vL6GsiKK81rURHAjzTSHCooJNVcBhmtzwTeDT/ABVZzMcKJQrH2Pyn9DWcoqCcorU1jNzaizrvD3w4wUl1uYoCeYYyC34noP1ritXgNr4geHtHIU57YJH9K9xkkZJGDfdAP415F46iWPxXM6D5XcOCPcBv61xYWvKpUfMdFamow0MudtoH+9g17T4YmB8KadjCjyQCBgA4JGa8QvWwh+ua9a8IXCP4RsUb73zgDuQGqsenyIjC63Mv4oLutNPmXBALrn8Qf61wulBZddso3GVMqAj6sK7n4lzIdHsgByZGx7cCvOYpGhu45QcbSOfT3qsKm6I61lUR9ATy/eUAh+dozgA4OP1rwHVre7F/Is0MispwQw5B75r2XTtUh1TTorlDywAZQc7X7g/09RUsnkzR/wClQxyjOB5iBzx9a4qVV0JNNHRKCmjnPhpqLyabcWkxbdCwkAJ7dD/IVofERVu/CRfGXhlDZ7jIINXAbO0lZ7a0hiJ4LRxgEjr+VUvE7NJ4V1BjgBlQ4981PMpVlJA42ieXWbNJsWJS0jEBQO5r13wtoMOjxCacCTUmGXkPPl/7K/1NeffDa0W58Rxu6hlgVpcH1A4/Wu/8UatLo+hS3dv/AK9mEasP4SQSWx64Bx7104iUnNQiZwVo3Lur+IdK0kgXc2ZBz5cY3OD79h+JrXt33lJCMZUMvqARn+tfOq3U15el5nLFsnk55r6Etm2wQMpyojTd/wB8iufE0FSS7lQnzLQ8l8fp5nxEuo+ztHn6bVzWxbXUNvboZDzI+AB3J6Csvxoyt8Rrl+oGw/8AjgrPupyZLVc/KJBxXetaasZq3PqejReGp7gBr6VLeP8AuIdzfn0FclqVtbQ6rf2fJFvJhS3JIxXp0jEoAh3EAZ/KvJfFkpg8Yalk/ebr+Arlw85Tm0zSpZI3PCPh3T9YtZbq5eQiOXZ5ScA8ZGT15q58QdPstP8ADcAtLWKJTcYbaMZ+U9T1NR/DSVW0u8HQ+ev/AKDxVn4mEf8ACNRK33/tGfyU5pc0vb8rY7K2hU+Fmo25S7szGi3GAwf+JgOCufToR+NdvqcCX+m3Vm2P3sTLg9jjj9cV414IumsfGNgQQEmcI30bg/zr2cNidSOcfeqMVHkqJomm+ZHz/KUhupY3Qkg9hmmJbfaZQsKuFP3mIwAK3L5Tb69fQ/3Z2HH1NTfwc16kamiOaVO7ZVmAWIKvAAwBWn8O8f8ACYJkA5R8Z9dprNn5Q1o/D8hfFqE/3Xx/3w1RWf7tl01757E7ARsRwSCTn1xXzrIc3kx9/wCle/O7bA5x5YU9T2wa8A63cvuR/KuXAbsuvpE6X4e6wLDxOkbnCTjyWPseh/A4r1m6eQzAscKhzt7Zr58R2g1BJE6g5H1r3GHUo7qG2ljyRPGsm0DPUCljYWkpDoPmjY8q8T2X9n+IryDHyrK23HoeR+hqPSbdb3U7a0aRYhK4Usx4GTjmtn4joqa6kigfvYUY49cY/pXIzM0U0UykjFd9NuVLQ55pRqHumk6dY6NbLb2SYJ4eVh88h9/b2HFeefEa0+za79rQAJdKH4/vdG/UZ/Gu20HVTquh2tyzhpj+7k46OO/4jB/Guf8AiNF52hRzY+aCbYfUBhn+a15lCco17M6pxTgcR4eIPiSyyMgzJn/voV7ujgoMfe6YrwLw83/E9tB3MqY/76Fe3BmQ5yPL3YwD79q0x/xonDr3Dx/xhz4z1I9P3zfzqPR9SOm65a3CjmJgw/A9PxGad4lIfxbqDLypmfH/AH0ayLvKyBx2r0IR5qKRzSly1bn0LLcieFHjOY5FDD6HpXlPxNtPK1dLpAAtxGrHH977p/UV1vhK/Fz4Wsm3YMQMTjP908foRWN8TYwdIspWHzeZIvH/AAE/1NeVh7069jsqJOmcBHkgGrcMBc89KZZRhkVjzWtBGOw5Ne7ueYRRWyL0XmrHlhOSAKe8iwpx+dZ08zOeuBQMsS3KqcAAmoxJPKrMoO0dSBVNuGqZbqUW5gRiEJ3EZ6n1obfQEl1H727k0u41X57kfnS/lTEWmOTRJKJCnyBSq7SR/F71GzDNR55qWaIkJ5qWM/L1qvmpIjzikUWgO9GMqVPemxnsaceKBMyp02N+lO0qH7XrNtbZ4kkUfmQKffDv+NP8KEf8JVZEngSD+tZVHaDLpq80ei+d5t/kZ2b8gj0Hb8hXlU8z3GoTyuSWY5OfU8n+dekWU6rcoXbKE4yewPB/nXntzbPaalcQyjDq+CPpxXDg7KTOrFJ8pY8O6idL1lJTyM/d9exH5V6gl0slss8TiSJ1ykgPB9fx9q8duo8jI6+tWNN8QahpTbYpcxnqjDcrfUHv79a1xGG9q7rcyo11Fcsj1ZphOnk3ESTQZ+aORQy5P1/mK5nWfCNtOj3Ok7xIAWa3PPA/uHv9Dz9aTTfE9nfAC6zA+PmYZZM/zH610gPlKpRyp4CnPTvmuFOpQZ2NRqI8luUKcMOa7vwfcqNAVeMrO2QOpyq4/ka5zxjHFH4kvYYVCqJCQB2zyR+ZNO8H6ikM0tlK4RZSNrk8K4zjPsckflXoVk6tK5x0rQqtHY6patqmiT2kbjzd4kjDcbiM5GfcGvP20XUYHMbWsoOeMxn/AAr0EMUnWB1+Y+vGD70kd7KrhA8m0HbndxXDSrypaI650Iz1ZmeDbCbSWlnukaOSVQixsMErnJPP4Ct/Vw19plzZweWk8qhQ0h2jrkgntVVyJW3AMxf5QM8n3pPtMc4kiQRsIW2yFGyVPbP+NZynKc+ctQUVY4O88PavbysHspTk5yq7h+YzVOLTNWt5fMjtZwR1xG3+FelRXDrCGXK/NgBWI5FWBeTjgblyBkhj0rp+uStZoweGje6OPs9e8QQrtls5phjHzws369a0rbWtbnuoEGmvbxO6o8vkt8q5568CtiS+ljg3/aH4PABNIupO21WlbDZJJbispVIvXlNFFrqbMU6iVTyAjZJX07fyrxTU38zUpn9Xz+ZzXp91dJFo93dAYaOJlVvVm+Ufzry0rveQ+vSt8FG12YYl2SR65oEjN4f01kwdsO0j6MaoeL7G61nR0MERM1tIxMQ5ZlIHI9cYrL8I6qk+ljT24miJaIZ6g/eH1B5+hrfW6Ju1jKkkj5Xznn61zzvSq3No2nE870jQb+71FVeGSKNcb3ZCAo9ef5V6aJhGnlRLtSIBAeny4wBiqssu/b5kjMXO3BOcY70yXUrOykiivJlikk+ZA4PTsWP8Oe1VUqSrPYUKapowPF2g3Op389/aO0+87mjAw6HA429xx1FUvAVvJba+4lTlI3JBGMcY/DrXWGZRMryp+8bvuz9CP8RUq3SOZQH/AHgzkt1P496ft5cnI0HslzcxYv7pV067lBYqtvICW5zkY/rXjEh/0livZq9B8X6h9l0nyQ37y4bJx02L/i38jXniDPJ6muvBQajc5MVJXsPHJNIx5GKXoadCCZS2OFFd72OJLU7/AOHdoYLSa9GA5wg+nU/0p3xMvpWtbS2JbZsaTnvk7R+gP51oeHtsXhmxxnL72I7N82P6VgfEMbo7OVSSGi2nPqHb/EV48HzYi7PXmuWlocVGPkFSWzGO9Rh64pIwAopCcOCPUV6sldHlwdpJnuFvfRz2sU+5SWjVjj1IBrk/Geh3WpNFeWUfmsihHRBlhjocdwRjn2rU0a5zo1kSgBMar1xkgkVb8/ZuK53DJz6V4UZOlUuj2HFTjZnmbaNqVzIsa2c2c4PyGvVdIthY6PaWe5WMKgFv9o8n+dUp5Jcssm9QoBAJznI705LtVsWZ2EaouWkY/cHTmtK1aVZWZFOlGnsY3jLSL7VBC9ohlWIEMqn5gc5zj0+lchLoeqBSGspwcf8APNv8K9GgO7EijKsoKkHII9RVh758DcW+bj7x4ohiZU1ypBOjGbuzzXS/7e0mcPbQXIwMcRt09DxyPY10yeJ9b8nbJo7Fv732dhXSSXjrIFDvzzu3d6rzX02/C7yOp+Y8USrqb1iNQ5VuZ+g3+o3t3K2oQPDbxRZQNHsBbP064zU/iq4H/CJ3JwQS6qD7cmrUckkrSIzEgYHJz1FYnjqUQeH4LYNlpJGc+4GADShadVWQS0iY3w2ulh1/y3IHnRPGMnHOMj+VejXSQ3NtJBcRiWCQZaNj1HUc9jnvXidtJLYXEVxESrKQwI6gjoa9J0rxRYXyKLiUW9ww5LfcJ9cjp9DW+JpS5ueJjRknGzI28H6P53mLJcRjOSMKcD68fyrrobuMQgJIG2AKO/bHJrDkvrCOB5Jb+32MO0gYn2AFSWdwl3ZxS2sn7mQ4C4xg91I7GuSfPJXkbpR2Rz3jHR7yTxC2qW0Rmt51GTGudrBQCD6dM/jWdpuj3d7qts8kLx28ThpHZTgAHNd0Llrfc4chQSCF4NJdzNMiq0hIPOc5FWsRLl5Q9kr3NSS6DJuGOfTuK818Y6ZfNrk8/ks4lYsropKsD0wf6V1b3cCxQiadIVkfbGWOBIw6geg9+lWbaa4g3IJioRtxXsP/AK9TTlKk+awSipKxS8FWc2laH/pC7Hmk37XHIUDAP86seMLWfWdEWCzHmSRSbyg6kEEZHr9KuJO0qAgbt5GDnJ57YqGOWGUMbeWKTY5jLI33WH+evelzNy5w5Vax55Y6TqFrrtg81rInlzJ95SO4r2EMXu8DGC+QV+tYovXVVBkJZv7xzjHfNUdWvzDazXZZkMCERgdC7cL/AFP/AAGqnOVaSuSoxgtDhL+YXHiK+lU8POxH03HFWf4azNPXzZnk7E8fStUjFeja1kc+7bK8w+Q1Z8EyiHxOM4BaN1GfUoaryn5SKz7K9Ona/bXQOAjgkeuDTkuaDRMXyzuevR3DAgPKpRsgqBwFPBxXl+p+G9Rsr2XZazTRZ+WSNCQw7Hj27V6HDPE8aS2xWWFxuR+zf/XHcdjTjK8bKAxTec5zjmvOp1ZUXodcoKojyxdE1KaZdtjcZzn/AFTf4V6VpCT2Wi2cNwcSRRAOAQSvJIH1xUksr5IMrHb1BJ5NJABNsG0hScEA+tOrXdXRihSUNjjPiBN5urwqc5SCNTn6Z/rXOXEe6AfSr/iO8F9r9zMmShkO0n06D9AKqy/8e/4V61GNqaRwVneZ1vw1vC9veWjEEBRIB7g4P6GtLxQN/hnUFbJ+aNh6Z3//AF6w/h3blVvrpgwXasYPrk5I/IVteJ9kXhq7BfqyBef9rP8AQ15lRJYnQ74K9LU8/wBAcJrtkzYAEqEk/wC8K9ijuSGySD83GDjnNeHxP5ciODjHevWNOuFv7SO5imyJAA4H8DY5B9yefoa1xsXpIywzTTRz3ijw9fHWbi/trdpbaZi6tGu7GeSCByCDmsCXSdRnG1LKcknH+qb/AAr0x7h4NpU43cLg4x9aryXszShRIxJG85brWcMZOMbWLlh4ydyr4SsbvT9AMN1CY3aYuEcYOMAfzFUPiDI/9iWcUhUP5jtjv/CP6Gtre8n7xJGTBOcc59eK47xvdNPq8Voefs6KhOc8/eb9TU0L1K3MVVtCFijp8X7peOgq6zCNcA/WmWYCQ5PpVS5mya9pHlDriXc3X8KqMxPtTXf161Hkk0gHlqZuJPWkJ9qB16UwHKp7mpQOKamTjC5q9FbSMgO0CmBCaQUpik7fypDHID04qbmqDpUkf3qjGQeeKfF9+kUWVPzCnuaiH+sFSMfWnsDKd8f3Yqro1wLTW7aduiOG/I5qxeHdwO1ZkuVIdeqnNZyXMrExfLJM9DlXyrmQbs8kD3HY/liquq6WmqP58LrHeKMMHOBJgdc9Afr1qvoGqQXtqkUsix3MQwjOeJB2UnsR29avSebDM6yqYnHUMuCRXkvnpTPX92pHU5ubQdWHyfYZXJ6bFLA/iKi/4RPWJnx9hlUerIQP1rrbcswaUnaByu2rSGRlJkzuXpxmtXi5ow+qwbMHS/BcNuRPqlzwo3eVE2SfYkcD8zXTiSFyMFVhGS+D91FGT+gqtJK0imNSPIC5aRztVR7ntXL+IfEEK2rWOmksjYEkxGDJjsB2XP4moSnXlqW+SjExNUuft2s3FxjBkcuR6ZOaoOjxyb0OCKltVOSzck8k1YkjDDivUirKx5cm3LmL9h4uuraOOKeKOdIhhPMXJX6N1q1L40V1YfYIRn0Z/wDGudaDk8U7T9Lm1C+WCFCST/n/APXWUqNLdo1jXqvRGneeLbya3MMKpApGD5a7c/U9f1rL0/VryyuvPgkYMOTj+X0rrbzw7pr2Qt7JmN3GnLscLMe+P7uO2etJpfh+0s7P/iZxsZZhjZna0Q/vH/a9B6VmqlGMdEbOFVy1ZVTxq3lgPYW7N1JAZf0BqQ+OAQR/Z0BBHIy/+NY+taJJp12B9+F+Y5AOGH+e1UPsjelONGlNXSM51qsHZnQN4yjKbf7Lgx6b3/xqM+LYj/zDIAMY4Z+P1rCFmT2oNmw7Vp7Cn2M/b1Db1LxQb/T/ALHDarApcMxVmJYgYGcn3rMhh/ddKZDakMDitGNMLg1cYRgrImU5T3MrdNaziWFirA5BBxzXQWnja4hj23NrDO2MbyCrfiQRmqEsAcdKpyWZPQUpU4z+JBGpOGxuv43b/lnYQK3bO5ufXBOK5y/1G6vbxrmaRmkZtxYnJJqOa1eJPMxwp5pZYtsgA+64ytOFKEdkKVab3NHTPEM9moicLJCDko4yv4dx+Fb/APwlenzgSTW0iSAf8s5hg/8AfQzXEFPam7DSlh4Sd7FRxM0rGnrmpHU74uBtjACooOQqjoM9/wD65qiBxTUXFPPFbRioqyMJyc3dgcYq+tv5Ol72BDv8x+nam6XZG6lVnH7lTz/te1ampLm3k9Npob6Al1Oj8P3it4dtl3HKs6dOByD/AFNTazYPrek+RGQbhGLRLx8wOAR9eAR61yvhHU1ikaxunCQzYKu3RH7E+3JB+tdptFoGi2lXA5jYda8iqnSqcyPYpONWFjzSeyvLWQxy28ispxypFXNJ0O/1OfbFAdq8s7cKo9Segrv5b6Q2v+lSOUH8LANj6ZqNL5pDGs28wjsGyV98DitHi5OOxksLFSuSJClvbx28coZI12ozZAOOvHuc1ha14mk0rWHt40injRQrq65G/wDiwevXj8K1dRvYdLjkuusjZMKue46N9B19zxXmdxI1zcPKxJyep6mjD0ue8pBXqcisjrbrx5JctvayhD7QOrY/LNYmo+JL6+Ty2YJH12INq59cDvVvw7oaXMguL0MLZT820csf7o9z+gq5rPh6OS6WXTYj5LPgoTzF7E91/wBr862XsYStYztWlG5S03xZf2Fv5RAeLsrrkfh6fhWi/jx2C/6BBx1zuP8AWrE+hWV1paW9vhbtASshPE3t/s+361yUmnPFO0UilXU4IIwaIxo1HsKcqtNHTL47I66bbn/vv/4qgeO8Z/4ldufxf/GuWktSrAVOLEmFGx6iq9hSXQz9tUZ0f/Cd/NuGmwAnuHf/ABrM1bWZNemiYxiMIAoRc4A/Gs8WJ9K0LCz2jOOlHs6cNUhqpOWjJGsN9sBjtWRPYyRt8mQR6V2EYDRD6VWuLdS4z3qY1GnqXKnpocl5M7MqMzEH3rS0nWr3R2ZYjlXGCp5BH06VoSW6icYA+WJm/UCqy2PnyAKPnVQQOxyTxWrcZLUySlF6M2I/HIVPmsIyxGG+8P8A2aobnxsGU+Rp0SsTnLbmx+BOKzbzShHai6i5jBwc8bT6H3FU47VWc7wFKnnccD86yVGlvY0dWpsMvtUv7+6+0SuS3bPYen09q29P8ZXNtCIrq2WcKMbmJDe3IPOPemQ2dr5fzzwA/wDXUGoZrK3GStzbn/gYqmoSVmiU5p3uXLrxnPJatDa2yQEjbvUEsQfck4/CsbTtYv8ATJmmhYgv94juPTHQip4bWNmbLKyDksvIH41ZawC6dHNINoYfKCOWPYChRhFWsDlUbuXk8eBoVSewjYr3UsmfwBx+lZ+s+Jn1mEW0VssCBi2EJOSeMkk+nA/Gsm4sSkcnHzIAxqTSbcSSvx0ANNUqcfeSJ9pNuzNXT4tka8VbenRrsQDFNkxWd7s2SsiBuhrI1CAsxP61rmq8ybq2iYz1Kuk+Ir3Sf3SEPEWy0bjcrfUevuK6FfiBjrptueOfmc/1rlprXcxOKl07R5L68SJAAOrMegHcn2qalOk/ekiqc6l+VG5J46yQRp0AI/2nP/s1RnxtcsjBIIo8gjMcQzg8Hk5/OrureHLK5sEbS4SLiFcMoPMwHVsdm9u4o0fQLS209hqETGedcjs0Q/vY9T6HtWH7hK6R0WrXscrA3nO0hGAT09KtpbT3kywQxsWY4AAySfStvSLKXS/EixNbxyq6NtJTemD/ABAH/IroWLRrJ5NvDAH4byowpYVdTE8isiI4fmd5EWmoulWUdkpAZcvK2eC57A+gHGfrWL41vAmnwW4IzITKecnH3R/7NWjM0aS7ncxRgZd35C4/r6CuI1i+OparJIF2x5wq5ztUcAflWGHpudTnZtWmqcLIpiItGOKuabq95pLnyHIB6jqCPQjuKliiBiHFQzWpY9K9SUVJWZ5kZSi7o6BfHZ/5aadA5I5wzgflmo28bKzbhpkAPTJZz/Wubi0+Se5SKNSzMcALySfQV2Q8Nac2k/ZgCdRHzeYG+TP9z6f7Xr7VxzhRho0ddOVWaujPPjOXOY7S2AHQeXn+tZK3Emo6lJdTZLOxYn3PWt/w74fghSWbVIJNuSiRH5GY9+ewHr3PFVdR04aZOJIm320h+R8Y/A+h9qdOVKM7RCrGo43Ysh2W/HYVluec1dz5smzkhl7VQl4JGehxXZc4xCMnNIBjvRQKYgzzTkBb60gB3jFW7eMmXp70XBIu2lsqIC3WrobA4FV0JJAFWAPak2aRRWAHpShAe1ItTKQRUmiRE1qJB0xUP2RkbPWtAZFKTkYNBVjNUHzOaSRsA5qeU7Scjn1qhKzMrAUMmRXkO4k9qhMe5TUrkDihQMUiLXM5o5In3ISCKv2niPUbdRCsrOvZGAcfgDnH4UssYKc1Y0XTEkf7VcLuhVsYz989do/qfSs58tryNKane0WWIvFtxDkPZ2xz1/dkZ/I1I3iy/ZC8FvCg6ErFn+ZNamow2urqvnJFDdAAKyptVh2UgdPY/nU9vJb2dk1kkSS2bnbKGAHmH1z1XHbHSuNypb2O1Qqdzi9Q1i/1HHnSuwU8AnhfoOg/KqUMDO+W5NbupaZHb3K+U++GUFo36EgdcjsRUQtwo4rsg420OKpGXN7xXji2CpCBiplTnFMdD2FXcixA/Ck1Lo2sHT70h1zFIuxwOCQfQ9jTGBKkGqFxBQ4qSsyVJwd0d5qE9nY2n255UnEqfuQG+/8AUfw47+9QaRepqdkWEqxyIA0oZsAKP4+f1FcMxmdAjn5RTY/NjBCNgGub6rHlsdH1p3Ol17XPtMq2luxMCMSM9z3Y+5/SoEAZATWPbxHdk9a1oT8gFbxgoKyMZ1HUd2KVANPUAjml25FNHynBqiUO8sDkUU8HigrkUrlWGilwDSYpRTJGuisCCoII5FYtzG9uBC/zJnMbentW7UVxAk8JR+nUEdj61SdiWrmCBS4qxJY3CMQqGRezLSrYXLfwbf8AeOKu5lZlarNnZm5bJysQ6t6+wq1DpiggzMW9ugrRRcBUUYA4AFS5FqJPbII0woAAGAB2qG//AOPSU/7Jq0BtQCqeonFo4/vYH61K3NLaGBcwtAYnTg7Qa29P8WTQwRwXiCaOMbV3HDKPQN1x7HNVdVQDYvoqj9KypIcnIoqQjPRihUlB6HYxeJdMCqWiuODnbvXFVLrxXCuTa2ihifvSOX/TgVywgNKIO5FYLDU0zZ4qbRZnvLjU7ovcSMxY8knrTSm0HAqa1jCEnHRaaw3H2rZJLRGMpOWrOn8OarHcQRWErrC6E+W+cA5PQ+/oat6ve2+l3CW9wrSTMf3i78FAex9T7dq4RiySb0ODSSGW5cvIxYnua53houfMdSxTUbHoizwR2C3cs4e0wQMY3O390DqD69hXL3V+2o6nJcOQSTjjoOMAfgBWMguJAItx2VqQQCGIAde1OFJQJnWc1YZLgyZx1q/b4Nl/uv8A0qjcDaV9MVYtG/0aQe4NaS2M4PUkq3aEYIPaqYqa3bbJ9eKzeqNEy9aPwyd1P6VLOPkDehqnC+y59Aauy/MpHqKwaszdO6M6Vh9okz/Fb4H4NUcEohuI5GOEcbM+jD1/A0s6eaBtIDr0J/UVSMz25eKVMq33kfofp/jXRFXVjnk2nc3JZCyugO0SjD8ZVvQkevvWa0E0M0awODvzgscYwOc+1VrZ5m3GCRkgQ/MX5A9h6n2qyu6N3dSuWH/LQBz/APW+goUeUHPm2EeVwBuSBsgHIAPX8Kh+0NuwqICT2Ap1vE8rHABAPI3YqO9jEWM7U9t+79KqyJbZdt7WS6iEjzqVDfcIJ6eoqWYgP5kshkcDG5uNo9h0FYyyOhDbyM/8tIz/AE70GdSv72QynOQDn+VJwbGqiSLs20abcXb8CYhIlPUgZ5/P+VR6FH+9lbsEA/HNV5ZJtRlihiQlY1wB/U+lbVpbra2ojByx5dvU0TajGwoXlK49261Exp7GoWbmsoo2kMc4qI9ae7CmAZNaoyYyQfKTjip9D1hLWeS1uMLDNjLgcqR0PuPUUkkZZdorIu7bDEjqKGlNWY1J03dHdaleRafam5kkDGVQ0arJnzD/AHuOij86r216mow/akk2BPmnDvwh9Se6+nftXAyPM8YRm4FRpJLGCqtwe1ZrCqxo8VrsdTfeKZYLyJbFj5ULEjcAd5IwSR6Edv61aPjMMoP2FN23Aw7YriwuGBbnnmvRfDjWdxoaZhjVFBgnCRgs+R97Prg/mKKsKcIq6ClUnUb1OO1PV7vVJAo4VeVRRgD3x/Wq9tbMmGcda6vQNHNn4hnklGPsZJyRwT0X885qt4tvf9OitgRviGHbAyWPOD9Bj9aqFRKShFCqUnyuUmUYxhaXFMhUkDJ4qfyziuts5LXK+n6kdP1MMygqwKk9wD1wexrq3uIBZfbDPug27cqQN3+zjsa4y7ttwNUgZwhj3fLXLUoqo7nTTrumrM7rTNQXVkVFYrOhwE8zh1HoT0x3H41jeIdViSE2Nq6yKSC8i/xkdMew9e9c5GJYSTGxGadHEzuWc5J9aUMNGMuYJ4lyjY3tIIZZ5m/5Zx/rWYTuZj6mtiGD7H4UWdsb7uVtvrtXj+dYyg9zW8HdsxnpFIdR9KMcnmgitTIfEMyCtOEALmsyEHea1UGBSZcUWIxipNwHU/nTV4Wq00mZDigvYC2Ohp8b7jjPNQsOaTHNJ6ji7Ggj9jUgAIqlHIRw351aQ5IqTRMeYkk+V+lQXFgIScYPcEHrU5HPFPJDJg1Lvcp2sc5dxBDkdDV3StOF4Sc8CpL+13xMyjp2qnp15NYSloz9QelZ1LtWQU0k9SfWdPNmAUyQeorN0zUWspjHKN8D8Mp7/wCB9DV+/wBQkvGy+PoKyZ4t3NEYtxtIJPllzRNvVtXtreJU06RyXwWkK7SP9n6+pqSLWrOW0NxcBjOn8IGFlJ7n098da5jyCTzk4pRAc+1L2ELWH9YncvG7mvbwzyHOeBxjj+n0rVjTfED3xWVbJsHStW3kBUAflVNW2JV5asb5WDn9DS2giN2q3BxGTyfSrG0OtQSwg54pc19A5bFSSJS7FTxnioWiDHmrnlkDim+WD1HNWmZtFF7cCmeQK0BCSCRjAGTzUckWORVXRDiVlQA4qRTtNLtpH4Q/SmTY09Nsb3UVdrG0luAhAbyxnGemarSKAMscYrsfhecWmo/7yfyNcfp+opZaxbXc0Injhl3tGcfMOeOa51NuTXY15UkiONjLKsUQLuzBQB3J6Crt7p97pskaahbPA0gJQNjnHWptZ1qHWvFVhc21qbZFaNCpIyx3ZycfWtz4lti+00/7Mg/UUOb5ku40tGzl9mRU1lYXd9I6WNvJcOgywjXOBVYMfL3YOPXBx+ddT8NZP+Jzf/8AXBf/AEKnKdlcFG7ObNtP9okg8iQzRkh4wpJUjrkCowjPuCKzFeTtUnH19KuyavPpXjW8vbc/PHdScZwGXdyp9jWzrPi6ybT7uDRLKW2k1Bt1zK4CnkcgY/z1o5noLlRy24DkmnbweM89xRp139l1G1n8gTmKQMISM78dqv8AiTVG1bXDdvZNZExqvluPmbH8R4Gau+tibaFRVz0qaNNnJ602IALQ7YGc02wSJs5qjfjd5Sf3nFWsSRhWkjdVb7pZCAfxNQTYe8gXrjLURd2EtilqJDXDD0qpt+Ue/NT3BzM59TUZFXJ6mdhgUUjYUZPFPNWNLuVsdVtrt4EuBDKHMTjhx6VLY0irFkq4UZJIUAd6c8M0c3kSwyJN/wA82QhufatXxZq0erat9stLQ2ahFUDgMSP4jjAzW/beOrCSO21DUdLebXLOMxxTDGxs9ye3/wBc461PM7XsXyq9jh5Ld/NKOjIy/eDDBH4VPFAOAop9zcy3U8lxMxeaVy7se5NWIra4S289raYQH/lqYzt/PpVN2WpKWo2OJV+YYwO9BcO/HReKs2l3Ha3kE8sCzxRuGaI9GA7Vd8Ta1bazqUc9pZm2RI9h3ABnOepx6Vnd3LtoYl0wLAe1a+m6HcXHhq81dJ4hDDkFD1IXrz0HsKw7hws0byLvQEblzjIzyK7eTxX4ZF9aNDpkgtxEyzKECrnjblM4YjB5PrRNvoELdTlEcEZp4bBpt/cWtzqtzNp8JgtXfMcZ4wPp2+lAwVoKuTeZlsmtCGUPECTyODWUCPWpreRlYkBih4JAJxWclc0hKw+T5ZGA7HimXw8yy7ZUgjj8KWZxuz1zULtvkjjLYBbOfpVR3FJqwy5M1hL9lYpKsY+RgMcHn86i+0o33iU/UVdjsrjVNYjtLZBLNMcDc2Ae5JNQ+JNJGjXn2UzwzSbNz+Uc7DzwfQ1o7N2MldFrUNC1HT7KO9vINkEmAjhwc5GR0NY8mP8A69ei+O3I8A6Rzj5ov/RZrgLLS9U1JC1hYT3CDq6J8v5mopyursc10RA80mM+b+GeagzuPPer97pGpabFG+o2clusuQm/HOOvFV0QkZA4+la3RnZm5paqtjhVA+Y5Pr9amZqz7CUqrRk9DyKsyNjrx9RXNJe8dUfh0B2FPttPvry2kuba1klgjJDOuMDAyf0qjPMORuGa7XwK2/wbqf8Avy/+i6cnyq5K1dji9wYAjoamjXAyaq2p+VByeOlWxyccj2IxVtiihxO76CqFyAc1ff5VxVCXljRBahIpeSKaLdS1WcZp8cfc9a3MeW5QmgGDgVteCr77JqotZThLjEeSehz8p/P+dRQ2clzJ5cUbOx7KM1m3STWtxvTKOh/EVnO004msIum+Y9HvLp7KGR5oAgiG6RimC5XhQfzwK82mke+1B55DuZmLE+56019Rvp0Mck8rKx5DOSKtWcO0DiooUfZ3bKq1faWii9bJ8oFWjnb1pkS7VpWOBk1o3zMXLyopzffIqv5Y3GpWOXJ9aZuUHGa1SsYSV2IYQR2poj25yKvQanNBZy2qhGhl5YMgJ/PrVLOaFfqDSVmie7umlt4YA2UiXao9B1/nVQDin96THNNKxMm5CA8mkPUUN1NApiJ7UZk/GtZR8wrJtjicD3rWQfMPrSbNYK5K2RGSKzJHO81qP/qiKypI2Lng0XKcS3jNJgjqKkQZ5qQLmpuVy3K+R61PA5AGelNMO48DmlVChKMCCDgg0rhytFzOabnB+tNiPakk9qCx8n3eawbiPZIw7Z4rbdsrWZdr0ape47XM/BBqT5WwD1oIyKQrxTItYcIhnilEQpYAd2O1TFe+KTGiJQKXeEOScU1TUU27eM9O1Frjk7I0YrjI65x3FX7UxTSqkr7A3G7sKw7aQKrqSAWA6nrzVpC38J/Cspw7DjI1dS097G48uTacjcrqchh6iqewd6UTuQFckgdAe1SDBrNJrcqST2ITGM8UjJxgirGOKQrmq5jOxnvFg1FInyN9K02jyMVSuEIBA9KuM7kSidh8MuLXUf8Afj/ka5Hw0VPi7TlcBl+04IIz3Na/g3xFp2hwXi37yAyshXZHu6DmsbwtG9z4tsWhRmUXG8nacBck5NQotOTY272R0fjmONPG+llEVdyxk7RjPzmpPiidt7pn0k/mKq/EibyfElhLHgvHCHAPs5IrQuvFnhbWrSL+2rGbzU52bCdpPXDAjioSdoy3KdtUTQSbvhDINx4hf/0Osv4XuTq98f8Apgv/AKFVt/Gfh2K0isILCZrFlKSRFANq/TPOaLLxX4U0mCZtKsZklccqEILEdAWJOBStPlatuP3brU5DUnH/AAkl8T/z9t/6HXd/E51GmaaAAAZGPAx/CKzzr/gma7+3T2Dm5c7nJhJw3qRnBqxe+NPDupStbalp81xaJhonZOd2OeM5FOXM2tNhJRs9SXw1HbaJ4Ik10wiS6dC+e+N21VB7D1qc3cXizwTdXNxAsVzbbypBzsZRnIJ5wRxim2/i/wAKR6d/Z6Q3CWe0r5LQllweo61AfEnhi00a7stKjnhE6PhfKbBYrjqTUNSbvbUtWta5yMT5Qe4rrPA1jBN9r1CdQxtyFTcMheMlseuMYrjoM+WPpWx4b8Rf2DczLPG0lrNgvt+8jDv78dq1qJuNkZx0Z1vh3XE8Wx6jYXlsoiUDb8xOVOQDz0IxnIrzxCRqjoxyYlZT9Qcf0r03wpcaJdzXN3otm0OSolk2FFY8nAGcflXle7GtXLA5WRnIP/AjSw7tNjqr3ULFaz3dw6W0EszDqIoy5H5VVk/duyMCGU4IIwQfSu4+Gc4j1XUVJwxjjYDPUBua47X7eSy8Q30NwCjeezAnuCcgj1rbnvNxMeW0UyvJmOQxyqyOOqsMEfhV3w4yjxPpxbG37TH1+tdnoWu6b4omj07UtHjlmjiO2ThxgD14K1Yu7jwb4e1RY5LAQ3kWHUrE0m3PII5xmspVH8NtTRQW9zJ+KODq9pwM/Z+wx/FVvTIov+FSXB8tNxhlJO0ZJD9aW78WeFdWCHVNOmd4sqm+MscfUEflTX8ZeHLawSwtbCZ7JwUki27VVTyepyTULn5UrF+7du5h+BNOg1XxAqXSCSGCPzSjdGOQAD7ZNdzpHican4ovtISCNrSGMhX679pAII6YOeB7Vn+Er7w5LqEsOg2729w0eW3qRlQR3JPcirvh680Q61e6fp0H2S+jLebui2tJg84PPQnOKmo227ocIpJanDSxQ2vjtbSDBhi1AKo6gDcOPw6VvfE7aNS0/aAP3DdB/tCn3uoeD9J1mWK402Vr23ly0iIx+frnJbn1rF8Ya9Z6/eWstiJQkURVvNXacls1pG7knbQh2Sauc5cjKjNeg+BLeCbwLqBkhidt0w3MgJ+4O9cDMMqteg+CY3tfAd+86NGrNM43DGRsAzV1naJNNanntsv7tT/sir9gwXUrXPTz4/8A0IVStv8AUIfYVe063mudSgS3ieRhIjEIucDcOT7VUthLc6v4oGKKfTvLVVYpJnaoHGVqb4bfPoup5/56/wDslaPjC+0O0ktotdtzOXDNFiPdtGQD347Vl2Pi7wtpcEsdjBcQpLyypFwTjHc1zrmlCyRropXucR5oKCum8LaBp2saVfXV6Z/MtmbaI5NowF3dMVyCHcmRXR+D/FEOgyzxXkUj20zBt0YBKMBjp3BFbST5fdIi1fUzNC1ttEv1voraK4mVCqCUkbCe4x3pniPWE1q5FyNOtrJwh8zyM/vCe5966uTVvh853tpjbmOSBC4x+TUxtQ+HhU40+T/v3J/8VSUtb8rDl6XLvjXZP4N0ONmwjTQqx9AUNSeMdVv/AA/Fp1po0Yitzld4j3AYOAo/n71heLvEGl6to9vY6Z5gWGRSA0ZUKoUjHP1pmm+PtQsLFba5tI7sxjakjOVbA6Z9frUKEmloXdJmr8T3xZ6Xu+8TJ/IVY+HLK/hDU1YD779v+mdVbnxb4X1qyhj1uzn3p8wUKTtbvhgelLbeMvDWlWwttLsJjbsx3qBtHIwSSxOTii0lDlsLTmvc43S3I1O1GesqD/x4V3XxUZY7jTtvBIk6fUVSi1fwMsqSppMyOCGXAPB/76rN8ceIbPXZLRrPzR5IcOZFC8kiizlNOwbRNzRIYZPhfeyNHGziOc7igJ496b8PWJ8E6me4eT/0XT9ER4PhXemYFQ8MzrnuDwDWB4J8TW2iW9xZ38bvbTnduRc4OMEEehFFnKMrdx3s0Q+Cn3eLNLH/AE0/9lNbfjs7fFA97dD/ADp9jrfgmyvI7m0sLiOeM5R1Vjg/QtWT4m1e11rXFurLzPKEKod64ORmjVyvYa0RTkORVRx83SroHyVC681rF2E1crY5qeFfUU3GKfH94HNW3oEVqdHaXNtpOjGRUEl7Nzg9F9M/4Vy92fPYs53MxyT6mrN5MXXAPFZ1xwnQ8/KPQHvWdKnZts0rTTVkRiBVOQKvWqZ5xWapYfxGtezH7vNbTdkc1PVlhQOlVbpwFIz0q13zVK8XBPvWUHqdE9iqHGeTUiKhV9x69KgxVm2QyEIOprobsrmEVd2Kw6daCcfWpLiF4JtjqR6VERl6pO6uZyjyuw4fdz2pD0pybUV9ybiy7V5+6c5zTTzTFYQDjnrRxQVxSY5oFYfAcOPrW1GMkVmWtsztuI4rZjXbEBjmpZtTQjFcYJqI7c9RUuzJpwQDjGaRpYrR/KeelWVZG6daryLimcg1DKjoW84okZpGBYknGMmo0kGMN+dP4IyDmkPUIvvGlkOKUYFMb5jxT5hWGseKpXXKAehq5KcKapyj90MnvSuNXKpAxQenIp2DS4qrktDU+VwR1q5ImV3gdetVVHzCtaJAYQPUVlOVi4RuY4Hz7cc1DOVLAKc47in3gxdbO2M1FitI66mU77EsCho2ACltwwD1I9qtIOKoEVftZGlTD/MV43HriiXcUexKoJ78VOuOMcGle3kjCMy8ONyn1FOVSTzWDkma8rQ5c9CMinhaaowamTk+lZSY0iNkz2qtMmeo4rSC1QurmPHyY+rcA/QdTTg7hJWMO6iCuwxwDiug8L+KU0HSZrU2LzyPKXVg4UdBwe/asiYiWVmC4DGlVFZgdqjtjp+VdDs1ZnOlZ3QzUby61jU5L68xvfACr0RR0AqHyMc7a1o7cAdKf5IByB0qee2iK5O47+2bJfBjaO2lq10SdtxgYBJzuz1zjisGOAleVrpZ7W2ltg6JtlHUDoarLbADpUqokN02V/Dd9b6NrIu7yz+0x7Cu3AJUnuAePb8a05te0qbw7eadDoixSTyu6EEFUJPDZ65A7VRktN3amx2YDDIpOSeocrWhQS1yOlTJagHla147cADgVJ5HsKTqFKkUFiCrjFS6Pqa6LqzXUtoLlGjKFCQOpHPP0qyYu2KrTWu89M1PMnuNwa2NfVPHEtzZPa6ZYi0EgILlgSAeu0DgH3rlBbsoWQcbf5VpxWWGBxUt3CEs3Ppj+dOMoxegnFyWpk217c6Zex6hp7hZUyCGGQwPUEeldPH8Q43QC90VHYDqsoI/UVzc9tskKjoearG29q1moSd2YrmjojqLn4hsI2XT9HhhYj7ztn9ABn865C4luNRvnurtzJLK252Pc1Otr7VYjhAPToKS5Y7DfNLcooqxzxyNEsiqwYo3RgD0Psa7pvGejf2mt6nhpTIbcwuzMoOPQDpjtnriuUMOR0pFt+emaHZ7jSa2K1lfTaZrK6jZxqhV2PlZO3aeq/TFdknj3TVlN4NCP29l2mXcoYj0LdcfhXLvbAj7tMW1G77tD5ZbguZFW8ll1G/nvbnHmzuXbA4Gewp8MQA6GtKO3AFSeTjoKfOhcjKEEi297bzvF5qxSBzGTjcAeldD4o8avq2mGwsLN7WKTiV3cFiP7ox0HrWTJAzDpUAtsHkUvdbux2a0RVhQrAtbfhvxHHoAumaya4efbjDhQMetUvKwmAKrSW/PSm7S0YrNBq+tXesa6moXscbeWV8uHqiqDnb757mu/e4sY7EeLH0OPyXgVNgKlsbsbsfdx/D647V501vxSlro2otTPKbcNuEW87QfXFJq9rDTtuMyJZ5ZVjESyOzBF6KCc4FNaEHtVmKLAHFOIAPSncVij9nycAVctrHdFuZOM8e9SKo4OK3bNFks4jj+GolOxpCCZhfYAP4aa9iCPu10jQqO1QtGPSpVQ0dI5l7IbSdvTsa7A+KtIXVbO8OgoDFA0UmFXIJxjaOhAwevPNZs8aKpOPoKzJoCTnFXfm3MnHl2NS18QabDZaxC2ixgXzs0QXGEBHCk9QAeRin3fiiwefSZLXRIkNkCsqOFw6lcbR7Z5ye9YZt/lzTktAT0607Im8jY8ReK7jWrD7DbWgtLZiPM+fczAdBx0Fc4ttheRWrFaAdqnNuNvSp5lHRFcjlqyWx1ywtvCEuj3WliaYuWSQYAbnOSeoI6UeINZs9YvbaWy08WaQxeWRgZbnjp2Has+S056c0Q2+w5xRpuOz2J0+5TWUHkipUGOKcEyDUt2NYx0KscMkzlYo3dgM4UZ4qLo1attd3NlDKtsQhlGGfHOPY1ntH8uauErg42RWmJNQOrMrAEYXDEfpU8hVBukJAzgADJP0qK4lEhAjUpGowFJz/k1ujCRXA5rUsjlCPSszHFW7OQp97kd/aieqIg9TQqtMrTTJEilndgqgdyat4BXIpg3RyrLGdrocqw7GufY7ErlC/s5LG6aCYAOvXBzVjSLlbK9huWjEixtkoe9RXbTXN00kzFnPc1Nb2cjrgL171tvCzMlH39Ctq17Lf6g85QLuPCqOAKgihlZs7T+Vb8NikYBK7m9TU3lAH7gpxkoqyJnBt3ZgvbSkcDn6VA8U0f3k/IV0uzHOBTGjzwVFXzozcTm8OeAM/hVq0tnkf50wtbJgQ8hBmnKmONmKfMgUGMgjRF4U4FK7gtgCpHO1cVCwwaV7lrTQXevvRkepqJsCm7/Y0WFzWGSSfNjrSAg/WgopNIEx61DNUP2nqKBkc8ihMjHepwOKkdiISEkg0oYHPrT2jB6dajEbAnIpsaEfBHNVZc4watEVE65FJMpoqdKd2p5Q04wSLGHKHae9VdENMZGuXrViGIwD2FUIVO4HFagX9wTWFU0pmJqCfvgRVMitW7hf5XKkBhlT61nuuDV05aGNRWkRgZFS20nlS8jIYbT/SmgHHSnBT5qAjqRVt3RC3ude/l3nhqFgMTWb4OO6N/gR+tZxTHbip9OlEZMUn+rmQxt7Z6H8DipDEfK6cjg1w35XY7Wrop4pwGBUm056UFSBnFNsyGTuEt2JPUYrA6sSOhNaWqyHiMdTwf61RCYbBFbU1ZXMqmugzvxSjPQ1Js9KXYc1dzOxYsHLEoxq6UIPSsuMmOVW98VtoQQpPQ1nLQ1jqiNF7EVIEqbyzjPanonY1g5Gtiv5ee1AjGelWzHgZpuw9qXMOxCEx2qQJnoKeFNSIpzSchpEBjPpTfL55FXhGSPu0GLA5FJSBoqBPaq2oD/RCv95lH61phV7q2Kp6jJZC3Ie5iikUhl3OOo9qqN2yXaxkXQzMxx0OKhC+1JLf2hY4mDsT0QE1IiX0vMGmXJX+9Ivlr+Zrp1MrdhAntTggCn1oaK6DbZbmygP8AdVzKw/Bc1MtjZGPdd6heyeyIsK/mxz+lL1Hysiwqrl3VR/tHFQte2qttEokb0jUsamhstNMp8mFZm7b3aY4/8dFW1uJYCEhjEY7BJVh/RAD+tO6QlBszJ57tU3RabOE/vzKUX9ajN3dwDdcadJs/vxHcv5jIrb8yEZdk+ccglPmY+zHP86l3pIBMXLT4wVIw4PplTk1PtUuhfsW1uYkGr2D8SSPE3pIv+FW0kt5f9VPE/wDuuKnnkE0eL2z+XofMKOf/AB7DfrWbLpWjy8rhCf7khQj8CCP1qrxZm4SRohB6ZpCg7Cs1NJlhOdO1GZPRZE3L+ak/yp32jWYDhvslyB2DqG/LIP6Ucl9mK7W6L2zkjHao3hyOlVv7YmhIN7pc8S/3lBA/UVOmtaXKvExQ+joRT5ZITkiN4qi8vnpV4TW04zDJG/8AusP5UhjH0+opaoWjKm0jtTGTnpVwxGo3Q+lK47FYD5cVt6Qd1inHQkfrWZBbPcTiNeO5PoK6K2tlggVEGABWdSaSNqUXcY4yOahcCrLriq7rngVlFm7RSuDnAA4zVRxVxVLqzntkCqrDrXTFnPJELDinW4zMoPvinbaChXDCrM7al+NQygryD0NPKcU2w3NACRjkgD2q0V4rmk7M3WxRaPnGKjMeO1XHXmmsh20cwWKgQ56VMEwOlSJGS44qwUOMVMpmkYlF0+XpVWVQsZb0rVlj4qjdoBDz071dOVyZIwbh97IpzlM5/HmmGkUNNIzDq2W/ClxXoLY4HqxOali6UzFXLC1M5yc7f50pySWpUItvQs2AeRCpGADwTVt0jRcYyaYziAhFHtxVmCHo78t/KuS99TsStoRxWw4dkA9BVxFIThcCnhelSEYHNVzF2IgOKjlYBcgZp5JPQVDICAcmqRlIhM3saBKvfNROR61GWX3rZIxaLiOhOM09mUVno6hu9TySgp0NDWokxzSjfnFBDNziqu9c96spOojxTdxJ6kLDmmkc96czDPFML89DWi2IluREkd6er+ooKU3aRWL1NouxKuD35qRW2jB6VXAp+4gVLTRalcsBh2NOHJ4qurA1NG2D7VF2VYV48jKiqzqcVfHNRyRZBIppjRRKZ4xXZahDbS+CLfaqpLGnBxySK5NkqyL6d7EWbHdGDxWNRNtNGsWrNMgtYywBxWi0ZW3NLYW48nIq48OYKyqVLsIxsig8scuiyWzAebDJvQ+qt1H51zro27BrZuY8P6VnvGdxranoZVVcqKpzUmMtCe+3+Rp/l1KIsojDqCa1cjFLU1EX7tXEHaq6jCJ9BVqPlvrXFNnWkQSIVbFMKtxV6aPcmR1FQFflqVK5LiYmoQsLtieh5H0qBYyxG7866FkDDDKCPcVnTwhbhwvAz0FdEZ6WMZQ1Koi45pNhzV+OPjBpTAM9KOcOQoSwrsiK9WTLfXJrQtFY2yZ61HNAdyBB1GK0khCRqn90YqZT0HGOoQNtOCOKstGDyvSoAnNTrKkEEs85xFEpdvoKx1b0Nb2Wo5IyeME1HIscXzSusY/22AqgLbVNR0IatfauNKtbgkWttDEWkkX14INYdvoTC6d7iM6nF/dWYxSD32tzW6opfEyFNy+FG7NrGkwZ8y+jJ7iMFj+lVP8AhJLN5PLsbS7unPQKuM/1qm0+h2Mxi+y3FjLnrPAkwH1DDP5Gm2t7czSFYLi3dOypIbUsPwwK0VKNtiW3ezZqSXmu4GNNgtFIzm6mxj8yKqtLq9w206tAM/w2cRkP5gf1qSK3tbciW6s54pDyWulMy/g4yPzWnsVniZoy5XP345N4C/3flyM/UCpvbZFcqa1ZRk06NsNez31zn/npMsY/L5j+lNhi06N2CWMPy9yrSN/4+wH6VPDaqZnbzIg5Hyoqgce4HU/hUhCJcQwzIyvIcKTjb+JxRzsOVF22mt0sjNJLc24biNI9qb/cKgHHvmsia5uGb5GX/edFLfmc1oX8kTW4zCqXIYIhZvnIHJYjHTFZTSDccdKmOurHJ9AJlb/WSMT35phiXOcZNO38VLDGZCuc4JwAOprQz3IAgBzjB9alaNmRd4JDHA3c1ba0uZX22NqzAHltuc/Q/wD1qsx6Dq8w/eRTIvYFD/WpcktxqLMpYZYidr+XjssmP5VMkkjKFe9lHb7zEAVebw1qi/8ALCT2/dt/hTT4b1VVJMEv08pv8KXPF9R8skY7RRliTIeemV5NSR20LMw2vPxhRE2D9ehrZ0qz1HS9Tjnm02aWD7soMG75fUZ7jrXUXF6LDW4bedYxZ3q5t7hVC7G/ut6g9j70pVLbDUL7nnj2wiViZJI3XkoVyQO3vSrLMi4W6DrkfJJ0/I8V3F5ZW0utJYX6r9nuQWt2kX7kg+9Hnrg9RzVG+8LaSlyIP7SNhdEZEczB1I/2ScEj8TRGqnuKUGtjnIri8hXdFHgMM5gJTI/4AQP0qCe5t5m/0q1jc9y0ak/mNp/U1t3XhTU7UCSGa1mjz8rxzhCfwbFZd1Z3tpL/AKdbSox6GRMgj69K1Uk9jNlFtP0ublUMTf7EpX9GH9aYbOW3INnfzxr/AHZVyPzBIq8sMUny4CH1Uf0/wP4VFJaNHgoflPIdTwfp/nNXzslwRGlxqy9Db3IHpjP6UHWChxdWToe5Rv8AGk3PnDFX/wB5QaeG4+ZOP9ls/oc0XXVCUezLmk6zpSXoe4leJSpHzIeD+FdRFc2V0ubS6hmHorjP5VxD29rIpJRQfdSv8sioBpsMjgQhw/bYQf5H+lYzpQn5GkZzgd5Ih9CPqKrMjK2QK5dLfWbEI0OoTIhOBuDFfx4q7FqWvL1itL1R1KEZ/Q1HsGtmX7bujR8po4ZM8gAmqAXPPepP+EqtreJ4dR0m4gmII3Bsj8jj+dVYtYsJelyqn0kUr/8AWq4Qmt0TKpB9SfyyRxUqx7kAboRSxPHNzE6OP9hgauwwEx5II+opzbSCNmxtlGVQJ6CrBBoij+fipSp3VyyldmyRXePkY4oZDsqx5ZJqTysoM1DkXGJTjQjmpFU96nMfNTJbN5LSEYQd6hyLsZ0inaTVC+XNlJn+6a0pyAhrOujusZD7GumluYz2ObhGxG9fLpMGpQn+iSP7haAh216SZwtEaoXYKO9dHbRrDaAgY4rGto8zj0FdC64tcD+7XLWldpHVQj1MyJC8/mP+ArVjU7RVa3iG0E1oqmFGetQ5JI15bCbTgU9VHU80hPSgt2qLtgyGXOTiq0gJFW2FQSLwa2TJauUJU9KhKGr3lluAMk1C8ZRiprWMjOUCsFPpT/4cGnnAFRmtlqYSVhpUUoHrS0uRTIsN5pNvtTic9KTBp3Cwhop+0Uba5ze1hhxSVJ5dOEXHBovYdrkQqSMnNBQY680qLzUsdmmWYmHQip9ucYqqoqzE/bvWbbRrHUrzx4bioo0zIKuuNz8UixfPnGKnnG46mlZLiGrIUFCKhsh8m2rQU4rjlua9DAvo8TVQZOa6G9gDHJrMazlZHkRCY0+82OBW8J6Gco3M9Y+eas28IkUpnGGzmlWPBzU9suC1aOV0Soq5KFCAKOg6ZqzCRULLk5q/pdm11LIAPurmsJuyNUtR6pkVDNCBytXIkIGD1pJY+OtYqWpVjO2ZqlcR5uHI9a1igBqk6fvn+tbxZjJFUJtNTIMnFSeXkUnl46UnIhKwsURNwvHerWz1pbbKqG9elWjEGXNZuepuoKxTC81neIVaa1tNNjJDX90kRI/u9/51sCPBrMv1I8Y+HVx8vmsfxrbDu9QwraQM7X9Qa41eZLYkQ2wFtboOigYUYpfEXlRXotkHyW6i3XPPCAFz+Ln9KybaVTqcUjHg3akj6HP9KTULxp71ZHOTIm76lmLH+ddfJqQp2RIFnZGMbs6JyVcB1A9cHtSjT47oNusIyR1aBin6cip4IgLfy3Pkuxw7HqfRRSLczRIYJBtMbEkdwe4pcz2RLa6kUVvdWUM9zp2oXFssGAyyHhmPRRjqT6YplzdagH3alp0csi9ZI1CyL9SvQ/WpNYke1utOtv8AnjAbph6yNk5/DAH4VSUybgzAsepbODn1zWiva7FdE0eqQudpupk/2ZwJR/49z+taEF0jpt81GU9RFIUB/wCAvuX+VVIpGIw6QzL3WeIN+vWnw6VbX01x8g09baLzZ5lcsqjsNp5yT0Gal2Ki2aMypLZGISRxqWDbmiMRyP8AaG5D+Yqi1lOqFxh0/vDlf++hlf1qj5N1aoklndmRZBlQymNmHTPWo/7SuIH33FmyN/z0QFD/AN9LikodglNdSd1kXlkYL69R+Y4p0U3GOGH1qSDVopsEXBD/APTVRn/voYJ/OrBZJh+8jVgehADfzwf1os+ol5EMm6chkuG3k/xkKfz7/jipI7/UrB/3d3cKOoVjkH8DkVILO3JASdY2PQOduf8AvvA/Jqe+m3UA3JNCA3Tc/l7vxPyn8GpWQ9S5Z+M5Ewt5EJF7tGdhP4dDWzaanZ6lxY6xc2kp/g39P+At/Q1xkyXNq5kurfYr8bniBU/Q9PyNMjELkfukYdiB/hWbox3RSqy6ndyQa+hIg1iyuinDJNHsYfpWTrlxrEmmiz1DSkEaOHWaLLBT7EEjmsNmjI53g8fxdMdOabJLENpgSSJx1fzic/4UlDUpzNaXXEvdGWx1FZPPiw0NynJDDpuH6ZFQ3erzX2li21JRcvHzBN/Gh7hv7wP59Kou9vIFJErS/wATu4P5USCI7dsZUD7wL53f4VSikS22NtrueynSa1coynIHVT7EdCKsXviDVbwGKW6MUJ48mBRGh+oHWqoZFJ/dqQegYk4qwdQZLT7OscSp1JVBub6nrV2t0M9+pXhRpOFUqPUg4H6UsxZUAyTjJyepPA/kPrSm7Tb96qr3CknmnZsLpIbg7sml70glUngjNKXGarUlNDgDnrUd1EsifOM+461KrA06TYU5YA+hNIe45rIjyrmQuk3BPkjAkGPlcY7HkHHce9PVtztKJMop+YMwYn6Zz/OrMKbLZLiaVQXG0QofmRB0I5yCT2qkkly+HnSyt8cE3MYDH8PvEn6UleVytESXTScLKBIQDgRk4A/UVRkt7SQAvFsz3aP+q4/lVqbyprnzNohRem/ECgfqx/KnG7iiRmtivmE8NDF/7O+T+QFVHmRD5WUZtFCIkkSuC33TE5OfzFPiGrWnNvfTqP8AayR/WrD6vPGGlGxXP/LR8yP/AN9Nx+QrNl1YtK0kkskzt1JPWrXO9zN8i2NOLxLq9q5SdLa529cgA/mKuR+MY8f6Vp0ierRvkfr/AI1zBvJppEjhhCtIQFGOTmuvtvARNsZNW1IrKRxFAN2PqTx+VRONKKvPQcZ1G7QZvWU0N7Zxz27EpINyk1eEQIAqLTLCKws47eEny4xgbutXQoyMV5NRrmfLsenC/Kr7j9P00XM4L8RA/N7+1LrlzE5EFsAIo+MjoTV6SVbewCIRuYY4rAn6HFYxvKV2HmZM+cN9azr/ACdPcL61pTcg1DDErIVcZB9a9GDsrmbV9DAjRjCyEcbs1KYGEQIGSeAK2JrSGJcoMbu1OEI2LgcgYFausZey1Mm2tirYPXq3t7VssmUx7VAyhSqL65Jq4F3CspS5nc2hFR0I7eMFsDoKndtop6oI1qvOc96FqymMaXB4p6HdioGAAFTxjgU5aIVtB7rxUD9KsPwBVd+QRTi9BWIQxQ5HXtVZ+TmrDjioyuBW0CJFcjFNPSpWFMIrdSMJK5HijHNSYo2jrTuRYYFowPWn4o6UCJGh7r+VR7SDU6HtTyoPUVm12NSuBxmlHSpNo6UbRQUiIjmnbelOAGcGnsmw4zmsm7M3ULq5H3xTgSCCO1PwG+tNcbevFZuQ1CxYQhuRVlEzzVKA8j0rQiIxWbY2iWLKHI7VcUhlBquuKUSBD7GsHqNaC3CbkNaWkvDb+Gr1ZACzvgg98iqQAdfamSIdhHY9anfQdkzFKFXIxT4l+U/WrZUDOajVFBPauhPQhrUQDNbvh+dIPNVuN68GsXHNWIGKtms6i5lYpGjgbqRlBojcOOO3apAK53oUiq0Xz1Vmg/eEj61qhQTQ8SAqcZ4qlMdkzJWHJxTWTBrUWNfPA7VA8QyR3BxVqVyHAhgT9yo9M1aQcYpI4sIMVIq4rORSVhDHWJrx8jXPD10eFjvAhPpuxXRBdw461n61pj6npkttGQs4xJAx7OpyP8K1w8+WomzGvG8GeburW+rSRSZDRXRVh6YbFAuTb3SgqrqYhGwIB6HGR6EYq54ta5GtSXd5pkunyXIBkVjuUyAcsp9Dwayp5UuJN8bDOSfz6j8817TV0eZz2NR7rcvUFgeBn/PWpb2YSPFIQQ78MCMZHY1lxEiPacfKcj39qJWYPu3Fl6qT6elZcmpSncm1i7a51tpH4/cKg+mKA7etVL1la8hk7NCKcsgJ4NXy6Ane5oQyEMC3TNW55nTwrIwwJNRvOT/soOB+ZrJWQ4I7YNXbxsaPoOfusWOP+BColE0joWHZGkf5EkQHYucg4UbRgj6U1BHn93K8R/uv8w/Mf4VWkuEW4kRTgb2wPxNPMymNiCN2OKnVFXuyw9osozJBFKP7yYz+YwaqPZpG37iaaFvTO4f41qSnTTe2aWVy0ME0SmWW4BIjY5yT7cdqi80sOWDjpyNw/DNJSY7IpI+oINqSRzr6A7T+VPTU3tCd8E1sT1KZUH8uD+INTnyjnMeP9w/0NSIq8eTc4B/hlBX/ABH607rsGoWup2xJaOaMOf8ApnsP5xlf1Bq6gtpsgwQSgj5SpUsPx+Rv51n3FkjKWuLNGH99B1/EVWu9Mt7WETpdTRAMQV+9yBk4/EgfnRZSE247mi1nGW2LIwbsGIyfwbB/U1VuLKeI4AUk/wAJOxvybH6VUWW+VNqul3H/AHc4Yfgakh1RoflJmtx3X+H8uR+lHK0HMmM8m7WVU+zSq7dAy7c/ieKs/ZbwR7nSMH+5vy35VYh1Rtp8soyHr5TmI/kMr+a04zWdwcSgwnvmPaD/AMCj4/NKWo0kZrJMOGUIfRmGT+A5qY2MzRFiHOPYL/PmtvTolgV3srkoG+8VjWZfxZMMP++abABLJcLFOkl4z7zsfBB6A84bGPUZqHNotQRh/wBnzqc7WOf9k4H4jIqOWymyFVN+ccqQR+J7fjXVXMFjbui3dkz3Mi5YSHyxnsAc5x+BNUpoQUc3F1GisflWXEe1P7od/mP4KacZyYpU4nPNpl0MeX5Tsf4Vk5H9P1pRpOrPkrathepHIH5cVtG7sbTaY2E8o4BCbgf+By5Ofogqlfa7PPIXn8kLjAST5x9cNxn6Cr5pt6GbhCK1KVrp91POyHzGC8ExKXGfw4H4mtBLGytjieRQ2c4kk8xj7bI/6tWVda/JONsskk6gYVScKPw6fpVI6jO/EaqijsBmtOWTM/aRWx1M+qW0Fr5NvbSBc93EKn6qnJ/4E1c5c36gkIyxj+7Cu3P1PU/iarFJ7o5Ys59F6D8qeLSJcCUop9C/P5DJqowSM5VW9iEXhU5iiAPqaUSXNySNxPso/wAKvw2sXGy0kl92UIv5nJq2C0Q+eW3tl/2Pmb8z/QVWhF2zOj0qZ0DzFlX1c7R+ZqWG1gjk/dOXb1jTI/76NXN0L/Msctyw/jk5/nRJJOcZRFHcZzSuFi74PsV1Dxc8jjdFYx7h9RwP1JNeivHuye1cZ8Kyr6nrCkfM0akf99HP8679o8RkAc15GPk/aJHpYNLkbKOzijIT61M4wOlVXznJrkR1CO+Ryaq3CMoIIIJqzbKst2iv9zOT9KNQkSW4dl6DgVWzDoYzx5NKsIUcirZUGjZmtud2IKksYZ0HoM1J5O4AAcVYWLe3A6d6kdQo2Dr3NCdwMi5TnbGv1NWIl2gZ64qaRFBo2+graL0KsGwuOOlVZoR3rQhVtrcVXcfMaLjSTK3krgU8KF6CpGXGMUbTjNDegSsQTZwKrmrUikjNV9uT7U4iSuRkcZqKQ1O2MYqvIMmt4uxDRHtLNxTSMcVZQiNCe9VzgnNXF3ZlNJDQPWnY5oxz70E1rcxGsQBUZPPSn9TzS7RTuJkoqQciojT4z2NY3NULilApwFLinzGqjoRlc0pJKgHt3p+KACM+9S0mUm1oMUgGtWCS1MGJADkc5rJ281Q1PVIbNNq/vZmOFjU8596wdKUnoW6sYLU1GVBORDkp2qGTWdPtCVmuAXHGxBuP6Vn2mjalqOJtUme3gPIgj4bHv6V02madpGnrmCyO7++zAt+ZFdEMMvtM4Z4tv4UYya1dXA/4l+j3k4/vFdo/kakS710gsfDlxIo6+WxJ/ka6uOWC4G0Wcjr/AH2m4q3Y28dtIHhLofQNkVo6MEtEZe3qPqcfZeJbET/Z71JrCXONtwmB+fb8q6WFFn2bGDK+NrKcg/Q1vXX2LUoRBrFnb3kZ4/erlh9D1FcX4g0a28KTJceHtaSCSRg39k3b7i+Txt9Pxx9a5J0FP4dGbRxEo/EXdT0+W1lYMOAecVBCqumGUZFTweL7bU7z7Hqts+makAFaCYYVj7E/1/WrEli4YyQL8vpXK1OGk0dUKkZq6KRhUDhaZtweBVlZxu2sCpHrT2COvHBqLs1aTK0bEPwcVeik3deDVMxlGzU8IzzmmyNi4gFOdc4piDA4qXqvNZNFJkYjzIDUc8eZSR1qxH9+nyR7myByRTTsPmIIkzHg+tOMWOakhH3gR3qwUDLUN6k8xmahdw6bp815cf6uJdxx1J7AfU1xmo3fiO+tkl+1R28cgDm2gfbIqnpuOOuK3PGTpJLpOnvzHcXW+UeqJzj+dcRLdS3upNcRuUuLicKhXgjc2B+VerhqSUFLqzhrVLysM1C2t5Lc5gvoplOfMlbzVb2JFZAtSxzEyuR2U4P5GunuHeKXzFkZ3WUqrsBnAJAJx3OKme8tblR/aGmW8xx9+L5GrrUzllFXORZp4T82R7MKcLw7drqce1dFNaaRKMQXtxaH+5cJuX8+f51Sn0OUgtAbe5X+9BJg/l0q1JMjlaMkzLIkeThozj6g1JjFJNYtDnzFkjx/fTj8xxUQEoHy5I9uaoV2TgkdCR2p8s7vp9oGclYXKqPToaqifHDrzR5itFIg4BO9c+tFhqTR0WnxSal4fubS2QPdW9z5yqPvMpGDj1q3a6LHe2OEaWxu4l/epdKQjf7QbtXNW8jq4ntpTHKP7rbWBrRuNZ1a4tGtri+meFhhkYjkelZSi+htGa6nW/2eLrXtOvIViuNPhhEcjqQVBUEYI+uKz7GyiSa9tbvTneTzD5MkjGNAvJwG7HHSuas5IolKyS3UW5hkwPjj3Hc9K0h4k1GC4IFyL6BcBRcxDnHfHY1m4S6GynHqW202We7tRpj+Zb3URlRpm/1YBwwYjrg028tZdOe3M0scsc/3HtznOCMge9B8TqYrQDTUiMJZXWJsI0bD5gB1B71pJHZ61bacmkXCQSae/wDx73L7XK5ByD36UmmtwunsV7mS0jvLhrJ3a0RiYy2QxUDOD057VneIAY/s1sxO4Qxl/wDef52/nVvxNcKdd1IIpAeTkEY5IGaq+LJVfXp2Tld2F+gQCnBaoUnoyjB8wBq9GXYYzuHoy7qybdnyQo3EDOBWpby78RIxBU7gD/E2O/t2H/16uQo7DHsreQ5a3KN/fgbH6U1LC4Yt9lvdwUZYTKRt+pq1aXVstq6Tht+flIGCv1q1dTiz0+J8cxwi6kHUGRjiIH6Lz+JqeZ7CtcyybmCdorm2UujbS0Tcg9aSW/3yBZWdxn7k6b/55/nTrWdGjQTnkjzHyf4m7/kBWfqV+x/dW/yhu464q1FNic2lc0rrW1ZQGkS3ccH7P8oI/Dn9axZtQHmHyEOCep6n61VSAnkgke3A/OrENuzfcUkeoH9atRijJ1ZMYZrh+d2zPpSJayOC5BI7sxwPzNacFqsS5dlT1J+Y/rxUgSCRgVR52HRjyPzPFO5Gr3M6K08wfId/+4uR+ZwKux2LADPlqff5z/QVaCTt8qhEH/fX+AqN/s8bFZbiWZ/+ecf+ApXYWQPBCgAnkd89ELYH/fIp6xTEbba3SFf7zDb+g5pq3JjGIoobcH++ct+QoJdxmWSRl/228pPy6mgrQR4lU7bi7Z2P8Ef+A5p6xxwgMtqI8/xTEA/lyaWOTEZW3Vm9fIj2j8WNVppREd0ksMLf7J8x/wA+gosK5cyZBkuSP9ldo/M1XldM7VcM391fmNZkt6jNhEkmb1lbP6Cmu91ImGcRR/3R8o/IUWFe5u+Gdah8NeJZp7lJHt5oipEeCecEH8xXqtlqVlqVolxZ3UTo4yBvAYexHUGvBmESn7xkb8hUtnaXV7NssreSWQdolJx/hXPXw0KvvPQ3o1pU9Ee6zKRzVKZTjil0kXSaNbR3x3XKRKJDnPzfXualdc140lyyaPSUrq5nHcrfKaUIx6g1dWNQeV5pWUelO4FMR+xpxj9qsYFNClm46dzRcBuNkeQKh4Ay2PUk1ZmIEbegrJ1dZZdFvFgHzmI4+nf9M1tSVweiuPnabEWyFY/O5i80MXlHqsa/MR7naKsQ6Tq8wJyUGOPmSP8AQBz+tT2GredbxXd4D562wU3UCBzJHnjcvUgeorSt9a0uSVZIb63ZsfdM/lf+OsBSrTqR0hEwU77sxm0q9tQDqdyLZHGFY3THJ9OKibSbooJYLzeuM5MmAR/wJTXQm/t/Pe4uJLR36IwuY8IPQc9fU1TkvNOaYyXV1bP/AHVWYED6hQc1gqtW+xomrbmA8V7G6rLGh3cKXXaGPoHXI/MCpF3iWSCaJ4LiLAeJxyM8g+hB7GptS8Q2kkRhgl87PGyNdqnHTLHnH0ArF0y/utU8Sane3Mm/ISM46AjsB6Cu6kpTi3JWFz2aRpSDjFVSuOBV6YcZqk52g+tNeR0JpFeTriou9Pkaoz0rdGUmMkOT7U09acRSYq1oZPUbTTzT8UoXviqRDVhgAFLilJppqyGh+eKcPUU0DNOXis3E1RID61IORUY5FPAqXE6Isdj2p6r7UijNOlmjt4Hml/1calm+g/zipu72KaSVzG12/a0VLe2G67m4QAfdHr/hUugaIlnIJ7giW6PJY8hPp7+9Y+nTPNqjancgb5WOwf3R04/lXWwOCgYH8q7YQsjx6lRzlcvkcCpJhZ6fEs2q3UVsG5VZGxn/AICOT+WKo6hqf9lWxWDab90D72XcLdD0O3+J2/hH4muNnsbvUJmmuXk3Py25tzH3Zj1P6U7Gdztm8XeH4kYi5uJyo4SO3IB9gTV7Q/FOmasCkSyRTDkwvy2PUeorz+Lw5Kwyomx7Z5/Sl/sa5srmOWC4lgnjbchZcEGqjFCuz2KWGVdHu7yyQS3KW7yW6YzucKccd+e1eVaPZ+dbrrFxN9qu7glmlc5KNnofeui07xrqOmwBZLaCXBydjFRn29Kinm8O6vPLcWl/ceG7y45mQxeZBK3rgcKfcflWb9yWpW4+QaX4jsU0TUbqGPVFBFjKxwyN2Qn+6T2J+lWfBmtS3kculamCuo2eUYMMFgDjn3HQ1ysvg23iV5E8V6PN/FyX3H8NuahupNc07XzJLb/aL7TGXzrqEFjJGR8u49wV6NjPrWVWmqkWi4VHGVz0bUrIOC8Y/eD9aykZ0ODVnS/EthrSj7K5EoGWhfhx/iPpVloUkbcoAz1968lpwdpI9GM76oroRIuKeEKnIFDWuDuTg09JHjOHXikXe5LCCcVduAphiKjB2c/Wq8e1iGQ5B7elWxGWTHWspbhexXi+9VgDJFQKCHwRipQSKTFclEQIYgc0qjjFPjbjFK3qKhk31OK8YJt8Q6E7fdKzL+ODXA6ZIF1GwYnpOrflXoXxEgm/suz1GEEiynPmEDorjGfzH615jbyYKEMN0bBuPrXv4Vp0UcFZ2mzeaWF45i33CRu55zjr+dNZ8oC0O1MfIyj+frWaHBUAng8Gn/bCgABG1egHWq5COdMsM+Dhhz9aZmMtnbtP94cH8xVZbjfwQB7U4Opp2JuaMU8648ucuPR8N/8AXpW+zuT59jEzf3ozsNUQwNSiZhgbsj0PNKw+YbNY2EuSss0LHs65FU30Sc8wPHKPY4NaHmgjlce4NOiG5iYwWIGeFOQPwquZoWjMWTT7yEEtbygDvtyPzFRpPNGMHOPQ11UF3On+rmYdsHBH60s9wk//AB8WsEp/vAbTRz3DlXc5b7SrH5lK+4qaORW4VlPt0NaE+n2ExJHm27H1GRVV9Cnxut5Y5l9jg1d0w1QpGBgjH1FNKqetQkXtqdjK4x2IyKQXi9JoQD/s/KaVh8xYMh8t89iDnPvT9Rm8y53Z6k/yFVhLbsG2uQWUrhh/WiY7wjjrx/LB/lSsPmLltPGmCE/eDoM4Dc/zq41zF9mTb8sh4dl7qex/kKxQpY4zz2q0pDLgkKo5J9CKlx1LU9C3fRP886KcH5WYnOT6/j/PNaWqyJJ4dnXPzzXiRj/dRMD9TWG95Ko8pceWygdOcZyefrUt3cA6YgJ+YXDN+oqXFtoamkmQXIKyzbegYr+XH9KqWyrNcyM7qoUcZOM9uKvsRJ5mTyXJ/Ws/T4vMkf1AyOvr7VqkZyd0i6IsP82eO2MZ/PJ/lUyzM3CBVA67fmP4noKiMaE7XlLn+6Bn9Bx+dSBI0Ayu7HTeen4UMhj1ER+YguR6/N/9arHnMEyQqL/ec5qAeY/TIHqPkH5moJJbaBvnuCzdxHyf++jSsF7E8pMi5ZyV9ZG2L+XU1Gke7iJZJR6KNiVVbUEDf6NbDd/ec7mqCaa7l/10xUf3QcVSQXNILHCT513DB6rEMt+dQvfWqH/RIGlk/wCekvJrOX7OnUNI3p0FO+1SqMRqsQ9hzTEWpWv7lcyyFE/2jtFUWSJDy5c/7PSnYmmOWy3ux4qT7IduXYD0HSgV0Q+ewG2MBB7dadFDLM+MEn8zWhbWDmMMYwid2fK/p1P6VKHsovkd3nPZEXap/AdfxoDUr2umtNcxQAqZJpFiQA5wWOK9vg02y0mxSysbdI4kABIHzOfVj3NeTaQPL8V6N5qCMNcKdo7c4Fev3LfMw9683HzaSSO3CRTu2VzgDgYqNhxSknNNPNeUd43uemKae9O6U0mmhMYQc4FPwFAApmcMKeTmqEiOVSyECqGq27S6c1nEpNxdq0cQ37BkDcST2GB+taidahaKS61mCCO5NtPFC09mSm5ZJQcMrDuNvUdec9q6aK1uTVlaBi63PaJLGunCW0uJUxcwbPkjYY4ZOx9WXg9ayIopba+E8EsCcHO1ymeMdGBqzezXUdu1rd2pcq5YMy+ainPIVxyB+IqnFe2lwmya3mE3UGO7BH5OrEfnXZuccdEa11Nq76WXkP2iAphlWWDJ/k1cxKL1EZBbGI5z80gzg/St154Y7YzwTXEN0OPLktY3+vIYY/KsieYvL5k11Mc9T5Uafhkk04RXYrVlKOGaHcZJhGrcMU6j8T0re8IpGTeva5+zbkVTzhnAO4j9Kwo2aS4BhhNxIDlDIdyg+5Py/pXU+Emz4aidhh3kkLEfxHd1rSekGOmrzSNCc4yKoSAmr0o3dPzquUwPmrmWh2vUpmMnnFNKHoRVhjjgUzqapSE0QFD6U1lI7VZPFRueaaZNiDvQ3AxStUbZzjtWsWZyQhpNwpCR0FRnFaoycrFlKeF5pFU+lTKre351i5M6oqIwCpB0p3AHzFB9WApA8Q6yRf8AfwUlJsv3V1HqKxfEtwWih0+M4e5cbj/sj/6/8q2RPbDg3EKn3lX/ABrl9SZLjxNI0cisluiqCpyCcc8/UmtIRvK5zYipaFkO2qDhRhVG1R7Cr2n3XlXEYmY+UDk/SqR4GKY43IR6jFdZ5hes5Wvm+2zk75XaUg+p4H5DAFSa/qn9jx/Y7RUbUAAZpGGRb56Ko7v6nt0HOaq294tmFmIHl243hT0Yj7o/PFc0Wkup2kkdpZpWLNtBZixOSaGhXFe6up5TJPdTO5OSS5rW0rVNXa5hsoHkvfNbalvL84J9s9PrVi08E63Nbrc3caadbMflkvG2Fv8AdTlj+ArsdA0Wz0QGRS0krDDSONrOPTH8C+3U9/Sk5JC1M/VdJmtjh1C5HrnH41jQwq0wjIwc/Su9vHS+jYPnf1U1w2qM9heiRgY4ijYkEe7bJ2BHpVcykWvMtK0VrqsNki/vWhMrtnkZ6D8ufxFbtldvZ+J9Hv8A+G7ibTrjnqy8xk/ht/75Ncp4Ys7q7vZdTvNzPJ8qbursfT+Qrbn8RaNo8/lyyS3VyrAukKqyxsOh3HjcOelZTV0NPqauveGLfU7nz7ILY6kzZtrmL5FeTr5cgHQnsw69DVbw3rEl8ZbHUIzBqdqSsqEY3Y4zj19aq2PjnS7u5+z3IuLZJfl8yUhk/wCBY5H1HSr/AI002b7PF4lsMf2hZBWmdDlbiHoHyOpHQ+xrjcXJck/kdMZJPmibQfsaUqHGOPoao6bex6lYQ3kP3JV6f3T3H4VdRSe4/OvNnCUXY6009UNjjKvxmta33beaqRIB1IJrRt14FYyYNjWiD9RUEkTIRnp2NaJXj0qCfmPaxFJNkplUcCl3ZGKjZsHkik3L/eFOzKHTKs0DwSqrwuCrowyGB6giuWuPh7oUyTTK1zaqiM58uQMoAGe4/rXTFvRqq+ILk2vg3Vpgfm8gqD9cD+tdNCdSMlGLM6kYtXZ4gqzbQy58skhWYcHH+RTWaRfvLn6Vr3gEfh3TYR1KPKfqXx/JRWTJxb5PWvcTuefKNhFlUnnj61ZSQEAjP4c0y6thEsAC8mJWfPctk/yxUBiKnK5WnoTZl4P7j8eKkDHPt7HNZnmSp1OR704XB6spHuKXKFzSYlY2KnnFal6h06S1nsjJHHNbKWcncCSOR/8AWrn4rjPcH2Natlrd7ZxCGGQGEdIpVDLUSixxaL8Mc2pxXl55katCqARheG7AZ7U670i6t4pH82GRol3SRoTuUVE3iBTZ3EaWEUMsyjMkJwMg5BIq1a6pbag11x9mvrmHYTI/7tiPT0rL3ka+6ylarb3MtjBDdOJpm2zKyZ2ehHqKWWIQXMsLFWaJypZeM1ow2zWVvoizxqkyXJDEYOQc45HWqTW/2rWNTRpWjMQeVcD72P6U1LUTjZEXmgsFL7vZuajmtYpgd0YHpgVb0yG4u9HmS2ktJHkO4wniVCO4PvWd5jA9WBzgg8YNaJkPQo3GlFcmPke3NUzbzp93n6GtwTNjnn60xyr9Rg+4zV3MzGEsqHDr+YxUy3EbDLgg1dkt1cd8exqu9kvYf0p6Mq7Q1ikgHlsOBipp499i7A88OP6/qKpPakZwT+NNBuIgcEkD3yKLBzEoZg+QeODRpzJFfFJVcq4KEI20n8e1QpcAAKy9BjIpwxMxZWAb3OPxoAvtdwR5UycDokQwo/HqagbUWJxbxc+p5qqVRTkDzD+QpyJPP8sSMR6IuB+dArhK08hzcTbR6E/0FRHyl+6Gc+p4FPeFIf8AWSoW/uxncR+PShQTjaoX03ck0wBPNK5UBF9egppQf3i59un51MkDyN0Z27DGf07fjWlDp5wHuJQp9Bgn8+goAyUhfGfur69P1NWreykc5jjJH948D8z/AEFXy9tCSYY/McfxH5v1PAqL7RPO2IyfpGM/+PHgfrSuFieO3gtoy10wz3VDj9etD3IjXNrbQwR4/wBbIcZ/qaiEKxndNKsZPZfnc/if6CpQIUHmJAqn/nrcnJ/KgZVPmXDcmW5/8hx/4mnpHg7TKqH/AJ52yc/i1JPfwdMvdP7/ACoPw71SnuJ5BiSQRJ/cQY/QUWFcu3MiWZtp7dwJ4JRIAWySevP4ivQv+FhaDNAJZkuo5iPmiCA4Psc8ivLbW2lu5DFZWk1zKeyKWP5Cuo0/4earPEst/JHZKeiN8z/kOn51hXhSkv3hrSlNP3T0WyvrPUrGO7sHLxSdCeCD3BFTN0qho+mQ6RpqWdtuKqSSzdWJ6mrjZ+teFNLmfLsepBvl1BmAHNQS3NtGSJZkRvQnn8utRXMql3twSJvK3pGH2eaT0Tf/AA9CexPQGo9PtGEo82MTKV5t4T5TI3ckcFh9TWnKoxvITld2RJHdQyP+6Ej/AETGfzxQ99Aknlusgf0G0/yNacOmaW9wu2GS1KfwiHaH/Eg5/OlvdPMku2z0yFo+Q0l1gKT/ALIAz/KsvaRb0QtTOW7tVx5krQ56ebGyj8yMVWv76xtNWhTUQssc1sfs7JJgxvu++CPunsGH0rWS3jtsR20wguSOYYMyoT6FDnI/KuV+INhYWUNjfxBbXU3IF1ZwHKbT1J7Lz27/AIV2Ydxm7GNVu1mJPdvpuqP9muTLEwB8xz5b/XIyCffiryS32oqbhtPg1ARHn9xHNx6kqSa5Rp7UXCMsktvHnBTgY9wGyuPpWnAVBRY7y0UOCPNltmTGfUoTn8q6XCxFxdRurKeRRLptum08eTZspJ9+OaybiSBP9TYlD2PlBAPxNWb+1vbWaKMy2cqTIZI5YJGdWwcEY4IPsayrkMh2yzovrtQD9Sa1jEXNpoWETdbNc3VyIoAcMiElmHpu/wABUuk62IPD0UcSLH5TspaQ5BJJIAUck4PfArJdozA5jRpXAPzschePXp+VTaZ5P2KMOAFb7zbcj6MO/wBRyPetHH3dQUnzKx0mmf2hqYzDc7VPT5VXPrwMn9a1/wCwNVkIMU3yFc75CV/yKoaQvlptt44JnHMLJLkj27MPxFdDbS6vPakX6OynBC7CPrkAcivJrVKkXdHXHY5m703VbV8tLGyFtoYFXUn0zxz+NMt/t/mrDNaBpG4VYzhmPoFbqfYEmty+KEbLzKw5z5bARIPzIGaoXGsWTIIjIsqbwTFA25mIORl8bV+oya1p1ZyWqCStsyos0ciFozkAlTxggjqCOx9qY54zUZv2udd1SSfy0nlmDbYxhcBQOPUjoT6052FdLjYIy5lcjY0wtzTmx2qM4/GqiTIQmmEjPNBbHWmF1zzj863RjKxzjahfv1useyjFRNLdP9+7lOf9o0zavrS4ro5Ynn80u40xsx+aVz9TS/Zxjlmpc4IUZLHoBR5qrw8nP92MZP50WQXfcBbKf7351LaD7Jerk4ikG0k9j/8ArquZCeVgJ93Yn/CmGOaTjBA9M8UC1OkbI6jHqKackVQs7lpovIkJE8Y4/wBsD+o/WrNm5khJY5+YgUDL0EImXaMH1Vhmut0aVbGzjEUxhbHPkokZ/MLn9a4vcyHKMQfUGp4tWvI+DKzj3ODSYrHdm6iwzpzM/WV2LOf+BHmqMtwqnGdzVgwaw8nDFc+jjH6ipHupmGV2gewpJXKib9rMJG9GpdQgh8s3Er7AB8x9aw7a+ZXAdeexFZXijWLghUVsBs7Me3f/AOvTtYptBrGtuC9lYkrIRteQH/VL3A/2j3PboO9c49upjCqACvQ062eOJOXBY8mrAliP8S0yL3KMSKGIK8/xDHSuo8N+JJ9GKwy7rnTGJWe0c5GxhhtnpwenQ1iSxJJho3VJB0bsfY1CGKvskXa3XHY/Sk0pKzC7WxqajYT6VrEtnY6jILR0E9rIjkCWNuVPHfHB9waZHfa7Cw8rVZePVif51Vmvm8iyifkQOwjb0RuSv0zz+Jqxnmp5V1RSbfUtx+IvEyj5NT3AeoH+FWI/FniqP/l7LD2C/wCFZgJz0/WpVlIH3D+dZypw/lNVzdzTPjnxBjEs90nuiL/hUZ8W3Up/e63fRN6Mi/0FU1cnqCKVkD/eUN9RUqnT7F+93NCLVbm4Py+IpTn/AGwD+RFXFF+y5OsXbD2audaxt5PvW4X3Xj+VNj0ySNs2t3LF6DPFDhAFKS6HRmO9/wCgre/991X1aO9Oh3aPqF1KmzJjdsg4NZP/ABNoPvqLlR3U4NPi1CG6DW0jvE7gqVkOM596lU1e6G56WaM2S5E9paKD/qodh/Bj/jUE+37NgjqQBUKI0W+NwQyOVIp0vzQoc/dcVvazMua6NLVkAmJTGx3BHsAoGKpjen3eRUk0jH5GOQrHGfrSZqdRpIh8sTMsewBnYKuPUmpZLMPl043M2B0AAOB/WrGluE1i0fGSsm4D3ANPBO2E/wCwT+ZJNDbQKKbM77Fnpg/Xik+zSIcAsPxzWsdjLkjmmlFIxjP1oU2DpoyT5qHld304NIJl6MCPYitRrdGB457Ux7JW6gH61XMmZ+zZVS5I2eXKw2HcuGPyn1FdJpOp6hdjfLJZyqMowlGJMfh2rnZNNQ8hih96iNjPEcplgO6mk1GQ1zROks7vR1vI5vKlsZo24KNuQ+30qjq0kTavcPAyvFIQ4KnIyRz+tYxmljbDr+mDUi3ScbsqfcUKFnclzbVmi6rDsafuXHPBqss6MfvIfoalLAiixI8P6H8qkTEhwoyfbr+VVufSnCUoMYyPyP50nEdyeSONRh2OR1C9qhurPypMMOePxBp6zIiBJy+0/MjjofapY4Vki8wNj96gCsecE9aV2i0kzPvrVSsj4KlCq8DqT/8AWpkenMwADjPuK2NTVFtXXPJ1IqfoEH+NOd4VgWNI/mYhQfT1qlJ2FKNjBkiaG4ESASSYzjGcUlyt0QBcOQvZc8fkOKktz5lxLJk7ieABkmrGwRtukbYT053P/wDW/AVZCRSjtioBI256F+M/1/KrUUAUZK5HfPyD/E/pUy7uTGgj9ZJOp/r+dL5SOc4e5bPfhR/SgdhEnIXyoOf9mJc//W/M08wyMMzuka/7bbj+XSkecQttmlWFR/BHyarvfhj/AKLb5P8Az0l5NAy2q24IJV5iOhfp+A6fpUdzfxYw0hAH8ERx+tZ0srSZ+0Ts3+ylQ7wP9VEB7nk0WFcufbmwfs8CxA/xtVZpEdt1xI8rdgOlRtucgyMT7VJFEW+6hP4UXSCzYZZv9WgjX9aTyO7GrSwqozJKq+wPNNMtvGeBvPvzUuTHypBYz3tm5awup4Cephcrn64610EfivxHb25MmqKwA4WVQSf0rCEtzIP3UIRfVuBS2dnLqV4YmkURx8u6p+n1qZRUviLi7fCdLpnijW9TkeMX8MLqu75ohyPatKLUdYR8vq1s5/24QRWTaaTFag+WhyerMck1K1vjtWLhT6I6IudtTcWzj1DR7nUG1OFL3zjDdRu2yNwD8mP7vHQnIOarzatqFhfQLMZIbIfL+8iEiDA6q3IwfZqwW062uIL13dkvEcFR1Bjxx8vfnPPaq1gt1azbrczIw6NbzEfpxQ6cGSpSO3j8RhYpHnMEjxYMXlSv8+ewwSKbJ4v3oG/s63B65eWST9M4rmsxTAG6tZXfoS9tuP5gZNTJBDjbBpkjjPayY5/MVz+xh2Nbvqy9qvia4W3wL9V3HmG3CxD/AMd5P51hatqD3OlRRpbiKySRWcvw0h/w+vNSS6HNOzTGCeKMdQQkSj9c/pTNZ01LbSkDSFpFYNHGhO0L3JzyfrW1OME1YiXNZi2khiDmJ0mVl4Wb68c9D+IqeOexcsbrTysj94k4HuNh/pWLzFIMFoDgfKSP/wBRq/FBKJEK3EO09HkBUD6kZrRx6i5rly602KwVWu9PuImc4Rp0kG8Y6gVlSCANiKA/7wiIz+LVNP8AaLK5G0xS5GQ0VzuGD74qvNJcTyB5NjMPUlsfkBQkK4TvuiVZBhWOGO7Jx/IUWKwtbYjdlk3E4xkMOxI7/UU5rgSxSR3zlkCkpGoxlsccDn86isiqWKiZMr1VznAz7jkGr6CvqXXhnjhhlxHco67wYJNxTnkMDgg/nVyw1q4tLgkW1w4LAiI5CfzqG1lktpfOsb1xIvKjAkBHfpg1JDbm6Z5X1G1hZjvbzY5V5/I1lKEZboq7Q64v4Xlz9iiSUnLMzx9fwyarRiN5/OuHIBOfLgBXI9N56fgKku5rmOE2cclvJEpxvjVm3d/as53lPyyzFfTGF/D1pxgktAcm9y5qdxLDcWUVuqQyxRs7LjPlhui/lzzzzmoTqF93nT/vioJoJLe98uW3eAmFWQMu0spP3sf400k/StowVjBzlfQn+3XuP9en/fFN+2Xmf9en/fFVyD/eo2+9Xyx7Eucu5Obq7P8Ay2T/AL4pplus/wDHwn/fFR4x0J/Og/U07IV33M0Yp3OKZxThVmaIpCcuBkZIB+lLGUH3WAPvxT3jDc9G9aA86DACuPcA0hjwOOXXH+9TTIi9GDH2qPMmeIU/74py28z8kAfkKQEbSEyBwdrDoR2rS026VlMMjBZNxZSeA2eo+tUmt3T+HP05qNkJ7ZpiOjZSBkio24rKtdQuLYbHHmxf3X7fQ1eTULJxl/Oj9iN36ikUSg1NDNLH9w8eh6VW+1WGcidvp5Zpk2oxIuLZGdv7zjAFAGoNRit8ve4VApIVPvOf7o9M+vauZurmW9unuJsbm6AdFHYD2FNctNKXmfe57mpFtmbkcfXimJtsjUZ7gVIEB/iFWY4No+9+lTqgHUmk2NRKIUDrQy7l5PTp7Vo49KMGlcrlMwpLMyoduM5LVpgj1oCn1p232oY0rChV/wCeqD8aePaZD7ZphVccg/lTcp7/AJVJa0JRn+8D+VPGeuKrkxD7z4+vFNE0AOFm3k9lGT+lS0aJl4M3/wCsVKHbjjHvSWmmategfYtMvHB6Ow2L+ZrUTw9e2q+Zq+q2lhH/AHAwkkP9KzbiupaTfQzmlBT98y7R/Fu2kfjXQeGdAXXtO1D7cgktpFCWszph9394HuB696z2n8PacRKtpcajIvSW64X8AcD9K6LRdbvZNMutTuk8mJl8qytwMbj6/niuec2l7pqoJ7nkcnmLPKrHdKrbWz3xxSeYfLZHXBPQirjWytq92kb5RGI3dcn/ADmlmtXUZK7h7V3qzR5zTvoQb94yDk9cUvmjvxUTRDseR601iwHzDI9/8aLApNF60fbfW7qRnzMfmCKk8zPlhh0TH61nRTLG6OMgq4bH0NXX4YgHIBOPoalo0jIvx2zS6Zc3ayALA6oUI65qS6ubKWOR47V4Jzs2qjZTP8XHvUemahFbR3Ftdwma0uAN4U4ZSOhFTGxs7iRTpupIzAg+VcDY351i9Hqb3uimXKuUdWRl6qwwRUqS7iqrlixwABkk1vNNKl7q/wBkVZLvEbIrAHIx+tZ2qh31/T0iK287ohZkX7rEnnFLmuFrFZRlmBBUqcMCDwfQ1KsSHqMe6nFX0aWPR9dSeXzJROu58Y3HjnFZQmGM5pXuWiSS1SRcEq3swxWdcaYATtG32rWlimgigeYLsnXchVsg+x96QdPl4H04/KmpNClBSOfk02RW+Qq4/I/lUJE0BKhmU9MH/wCvXRNhjIzoCFARSP7x/wDrVeu7aNZJIHijcRBRIH4w5GSoPsMVaqdzF0b7HHi6cffX8uKlF0pHLEfUVqXOm22OrQH/AGuVP4//AKqoyaW0eSyMy/3ojnH4VqpRZi4SQxJcjA2smc496cHbzBLklgc1AtnuyYJkcj+HO1vyNNb7RCcPuH+8KdkyVoXLq4d927nFyJPzFTPOCyAHkE/yrN88sDvXqMErTjMhOc4P0osDdyXTSQk3zhBwSe/4VbSNtpeNBGneSXjP4dTWYs3kSM8YB3Dp/dNJLO0p3TSNIfTsKdgvYvtdWsRzhrmQdCfu1DcX1zIMM6wJ/dXrVNXkdsRAg/7IyamWxfG6YrGP9tufypaD1ZCJI1Pypvb+8/8AhQzyynDHA9Bx+lSk2sXClpT7cCmieXH7pAg/2R/WgNB8dpJgHZgf3nOBUuy2jH764Ln+7GP6moI45bh+Wdj6KN1W4tMc/eUL/vHcfyHFKw7roQG5iBxbWwz6t8xprPPIf3kgX2J/oKui2tkO2SdpD/cT/AVMilBiC1EY9XO39OtGg9WUorEuM7WPu52D/GrsFosPzb4wf9hM/qacA7HDMM/7Ip21EwXIB9zk1NwsNuDthdx2UmtbwxCkfhvzhjzZZiTzzgcD+tZN3zZS4BHy96uaQu/Q4fLYcEg89DmplrEuGkrmzvyKYze1URFL2I/OmMk4bgfrWPIjp52WEktkuLsXluzRtCg84A/umyccjkZ9fbms22aZWLRzRuvYvxn8RUtzJeQoxRvkkADqehxnB9jzVKE2xYC4BhYnqSVz+I4rSxnd3NdNZurKTJtlDoeCJRir1/441O/s2ha1hjldQgnSXawA9B0B96xbuNBMy2940sX8J3K/FUJY2B5mcY9ABUqnB62BtnS3OqXNxaIJ/s0CqMkxqWY/UnC/oawtQv45IBbW8skssuFd/vHbnp7/AEFOtNEmu3QzeYA43KrH52XscdFHuevYGut03w/a2q/cwQPmIzj8+p/SsZ1aVBmyhOaOTuIL1thSIzL/ABZXZ9ODTUhYNk2LnPXyx0/75NegfYLNXURIjKuCcqAT7g+lS3OmWjR7hbxkpzu2AHPpkVksbFu1h+wt1PM5JbVZ/wB19ojUDDIzHO6nLGLhQI4riUHpjcc10Nzp9nd6nbQnzGZSxPBfHykgNjnGcdan+xYY+bDcHb0/dtiuh1kloQqbb1ZzMcM0ayiG12sFIJfjHH5moreUfZVUbVZQAyHjn+YNdBNFFFlYIFikbrvyn4+5pl3pbT2BunCyBj+73AtuH81z25qlWj1IdKXQxWmjiYmSBCD1ZkD4/EVZXU9NazaJYFgmOMTRSuOfUqWx0q3HocaMQ0bSMpw4LF0U+i+uOhJ/CrdtYRsrCHBKtgLjGPwHb3olWghKEzBaeyPAcu3puY5/WlhdVYGGAoc8s2EH59a3bqzCx4KZcgk5xjr0qobJTzCxXA48sdP+A9D+GDSjViwcWUr+eSfUWM0zSnyUVHZdowOyjrj3PJ696rGpZ7ItIXlmkkd/+Wm7cGx6Z549OCKqPZ3KpvRgyZ69P/1V1RnFKxhKEr3JKM4qozTw485HQHoWHB+hpyyswwrAH3rTRmepYLUm76/lUG24P/LQUnlXX/PUD8aQERgYfxCjy2FVPm7E/nS7n/vN+dO5NkW9rAUoRiKp7n/vN+dHzf3j+dAF0RP7U8LIOjD8Kz/m9T+dHPqaQ7mkFl/vUMhP3tv41mgDux/KnBY+7Of+A0wL3kqe4H0ammBO8gH5VUHkdzJ+QpwNr/dkNAFkRwjrMPwxShbRfvSBvq1QKbbtDIaf5tovW2P40gLAntk4VkH0o+1QZ/1gqFZbbqLEn65qQXMYGU06L8RmgpMd9rgH/LQfkaBew54Dt9FpRqMqcJawJ/wFaQ6nd/w+Uv0IpWHckSWWU4hs7hz7IasLY6rJ9zTZB/vkD+dUTqN+eBchR/smmNcXkgw11M2fTilZhdGwujaywz5VvEP9uZf8akXQ9RP+s1GwiH/XTP8ASsERXL9XkP8AvOacLKc9doHvmpsy012N3+zLKM/6b4mhAHVYVLGnZ8Hwf6y51G9b/Z+UGsRbdU+/JEPoBSl7dOsuf92ly36j510Rtrqnh2L/AI9PDTSkfxXU5/lUw8W3UQ26fZadYDsUi3MPxNc95unAZcSOfQ5py6nBD/x72Sg+rUuQftPM15tW1zUP9bqF3Ip7IfLX+lMhtJVbzJJVQ92+835mseXVr1/ussY9FHNRbLu72b5GYSMFXc3U0cgKodLDd6LY5nuHW4mXlVkPmHP06Cs7UNe1LWJ8QloYgMDHGB/n0rOawNpqsUEw38bmyOK1Cyhvu/lSUIrXcbqSemxFa2628W1ee5Pqam7dKN+furS845z+VVcm1iGWOOQfMvPr3qpLbEf6v5h6GrzEetNxmmmJq5ktEu7BBU0gV0PyE/hWwUVh8yg/UVC9qOqfL7dqrmRHIUFmzw64PqP8KUgOOGDAVLJEV4dfxqu0XORzilZBdomjeSOQukjpIBkMGOa2rTWYZZoH1K0DyxEbbhDgj3I71z6s6n5jn2NTI49Sp9DUSimaRnY6aCWPUV1e1tZV825kDwhzt3gdcZ+lJfW0ll4WtlvYCjx3XzL32nPf3rnWyR79q2U1Ge3hZ7HUjIiRKZIbobtx6EDNZOHY2Urkvk2OqW0kulCSGa2Uv9ldtwK9ytVbeXeowetXNN1uxS6864sI7ebBHnQDjn1WsWKRlZmHTJOKLMakjZtJUXULISYKK7XTj12/dH6frUlkZLmMK5UzTlpn3dGZjWbFzePk8JbhfzAp0MxAhYhguNu4dPofSk0aKVjRntJYYfM+UR5KkE5BPcVS8vZl03ReoA4/L/Ch79yjxHhSMDJz3q3bSxTLNFzG0keNm7IJHOQT/Kkrpag+WT0Kf2VLxiGhV2XqynB/Oq1xYyQnakm4EA7JBg4PQ5rUjC4htEODO2139AfvH8Fz+dWbVxqU15dYVDK+5M8BEHAz7YGarncdSfZKWhy8iomPtVqQD/F0P/fQqJrK3mDG1mfcBnY65/UVv6rJFbsRDGVBG8Bv7uOCfqe1cxKzzTF4lEQxgheK2hJyRzVIqLsPNiIxm4nSP2HJphezjPyo8p9WOB+VEdnJI33WP14q0LSKLAmlVD2VBk1Rn6Fdrudo9sarCn+yMVHFbyTt8qvKfYcfnWpHAow0Nrn/AG5z/SrQhkdcyztsHUR/Io/Gi6QWbM1bERAG4kihHofmJqaJbdj+5tpbkj+JuF/wqyqWitmGMSv6ou/82PFJJNKTgbEx77z+nAouCiSKtzIAC8Vug/hjG4/4UgSzBw7y3TDtksPyHFQEM+PMO8/9NDkf98jipWZAoE8vHZTwPwUUirEn2pFPlwQhT2VBk/ktMKTycuNg/wBs/wBBT1aV1xDEwT1YbB+XWoHySVE5kbukA/maAHMoj/1s2AegyEB/qacoXGYwqj1xjP581UZooCTI0cLd8He9VZbvc2IIy3+1Jz+nSnYm5rlFlidc5G05I6Dj1rL06+a1jZAH5ORs/rUM00soAuJyQOiDoPwHFNSYoMRjHuaVgudDZ6rFcLhuo68cj8K0AQQGBBB7iuRt7a4WTzR8vrnjNakN3JFgBgR3HY1EoLobQm+ptllCksOO9F1pLLCJvKZY25DLyp/pUcUiTRKykFWHNa+nC+XTpWhCy28X3gTyB9O4rCcnDVHTBRlozl5dNUnOyBvfaVP6VDp9qtpqtvfzwLLZQ3KiSMPncAeevbNasssTOSrouecbhxVRreQqyRgSwuxOBzjPUcVSqaEumrnbactncTySWl4lyzOWfeQsuT/eU85HTjIrcjtkj37be6Rm+8FHyn3weK8me0vpXEcKGZj0HRj7VX2Xn3DbTHHbFcMsGpy5lI6fbWVj1LUprKBC1/e29vEn/LOWVST/AMAjyT+NV5JpL+GM7XCTR+YqMdh2H7rvjlQeyDkjkkCvMLuO4ePYIMbfvBecfXHA/GvX4n+0s17aviC8ijmhI9NgVk/AqQfSipRjQhzLcw9o5SsS6Pp9u0YJQKi8Oh+UZ6/dHH55qzqFha28TNdQHy5GwAsa9McfQ1FeW91M/mFfLh8sh/n5z2PH3vSkWGVbRjJMBbsowXI2geprznJt3bLM1YrS6aSGJQkgGGQqMY9dvINZl/fPpNtMihpIIwAIx0XDBsrn+HPBXtnIrYVLe2tjOsa72Jw2SpZexx2HtWFq7b4ZJZBIU2l3bPYjGMe5IA9a6qEm5WeqE3ZEkaw31k/2V2ddjSKF4Zo85Dr6kE4YdQR6Gsr7TNC5by0kkA2hw2zcPcVjaFrBsSsMhZMkMAzlQG6B0Yco3bPIPQg1vXE9teXH7qeJn/iLBYWc/j8jH3UjPpXdOjyvQzVS6GrOXbz5+qjhYxu5qK3M5mLy/KhH3SB/kVIlvOblIYon81yAiYwTnpj1qC9trlGEZyW5IKdwDgnJ7ZBGe+OKzURpjblFnlZY3CsD85GPlP8AC31B49wagsr61SKORUlV2GWHlEg1WazkjZvLLBiM/K4P9KrC0MEIAXIHRmHb6jNdEYxas2JyaNeS8099z26yqjcSI8G6M/UEgf1965a/jRL+UQRPDAfmiVzk7fr6ZzU1xcTo4WK2Ch+FJAYE+2ODVWSK4DF5fvHqWzXTTiodTln72yFjlK8PyPWrAJYZViR7GqWJAM7CR6jmmeYOxrbQys0Myn9w/wDfVHy57iik70yB2F7sfyown9/9KbSGgCZPJH3iW/Sn5tj2I/Oq1FAyzm2//XmnA2wOcqPbBNVcUlAF5ZoR0YD/AIDS/al/vH8qo4oxQFy99rUfxOaDdxf3WP1FUcGigLlw3cZ6xsfyqM3ER/5YVXxRigLk3nLniFPxFJ53PEaD8KiApcHsDQIsC7lX7oQf8BFL9uuMf6wf98Cq4jkPRGP4U7yJf7mPqcUh6j2urhusz/gcfyqFmZz8zsfqc1J5QH35kHsOTUsVujfdSaQeoXaKNB6lQjFKqsfugn6CtBYSp+W3Uf77ZqwgkA5dEH+yv+NJyLUbmYlrcP0Qj68Vai02QkeZIoHtVsOoODKXb/PpUgz1xj61Dmy1TQsFtDCpIG5sHmo9HxLdaen92dR+pqUsBGzHoFOaq6G/l3+nsehnGfzxUO7iy0kpI1PFI8rxcFUfL5IKj6iqjHJ5rU8cJs8UWLDq9uoP6isxkfPQD8adN3gmKek2hvmTRnMWCPpSm+uRwYAaUI2e350rxtsJwDinoLUgbUJc/NbD9aQXpbrbj8CRWlqWnvY3YiVt6PGsik9cEdDUAjfH3RSUkw5ZEAuh/wA8H/A04XK/3XH1FS+U/pQUYdRTuh2ZGZUfsfyqCWA9UAP04q3g0vAHNFxWMtgejL+BFMMfp+taxaMjBIIqJ4oT9xtp/MU7k8pmgOg7gfpQJAfvDHvVwwt2w1QNDzggqaNBaodGyt1/MU9sDO05BFV/KZTkfmKcrkfeGfcVLRal3LsUp+0S/wC2i4/Ko4pHHyqeSOnrTBIgMUgP3fkYHrjsanPlBMYxKjdfWoehqncdBOm9jLGrBl2njOPce9PQOMMh3HOQwNQuikZjAKkZ9x7UpQCNm3EMMbR60tB6osyO4LsD8/lMB9W4q5boI47i3B+QSBT7gAcVmq37osecFP51ahud13Mp6yMzD86mS0N6ckZ2sSZkfBzvb+VNj2RwpsUE45duB/iah1A/v4sjPG765NWHXLFnOSf0raOkTiqO82NPz/fdmHoPlH+NPRgg/cxY91G0fmajA5+UVPhAcNIGb+6nzH9KYg3uR8zqn+4u4/meKQBGwAm8jvIS5/Lp+lBVsZ2iNf70rf0H+NIFDggGSX6fIn+fzpoQ55EDBZZMn+71/QUNLgYWMKPWQ7f0601PsqMd9yFPdIB0/GoJruMPi0thn+/JyTTEWEG8E+ZI/qIl2j86YbiG2Bw0MR/2fnb/AD+NU5EuplzNKVT3OB+VQYgjPygyt69BQLUtvf8Am8RxPMfWVuP++RxUMks8i7Z7nYn9xOB+QqINLINqrhfRRj9aelqertj2FArkWYouUjL+78fpS/v5z0wvoOBVxYoo+ijPqeacFZugwPU0wsyBLVR99s+y/wCNWowI/wDVRgH1xk04IB1OacCVGF4FItIZ5ckj5kbGfXk1ciht4kLy8heSW/wqoSc8HmmXEsiwhtx+V1P5Gk0NM6aKyleTynQxuuC0UZAMYPQO5BAPsAT64rQ/s23tYRJM8Iz98sc8fVyf0AqVNTsJLpmkkjtbmQh5Y24UkgHcrdMHrg8in3i21yyzhRKQCo2gMCPw6H3rzKk6jlZqyO+MYpaEVtLBDcpHbx3UzSAlFSNl4HpgDNW5Lee+Hmx2sgUrkC42lwR1GCNw/OtOxljMZji+2A4ACkBtmPRm6VoGWC3tv9PmjQA7i00q5z9c1zucr+6gfmcatpd25kjtI9l5cR7AHJJ55KqTyGIGMHIPrWPFdia4itVDjf8AeK9doBOB6E4xW/rfiawtbkXOmhrq5RSkUwB8uJj/ABZP3iO3YVxQczyvcW7u2wqBk4LYHPPrmu+jGTV5IzlKxrQxXeqhoYbb7PatxsXIAHt6n9av6Zrtz4cuGsdYixbFsoxUmN2/vKRyjeuM+471S03xIsb7buMuc/MwIVz9VPBPuMVqXV3o9zGEuDcKzc7ZA+GHrtwy03e7UloZT11ibb+K9N+zmeO9nRVwSE2S4/Ig/pWcniHQZZS4kdnJyCLRzz64JxmuZuNI8MNISdYkgc87FgZz+ACis+S20aElbe8v5j2Mipbr+pY/pSWEpPVIzVWSdmdrN4k01WLsLiRh/FMyxL/7Mx/AVyus+KTcDybRFQAnDBdqpnglQcktj+JiTjoBWWlmr8iZ5j6ICAP+BH+gpBZRwMWlZdx6AnpWtKhCnsVOblsatvYx3cSWkKrJIf8AUCRsbx3UN2bPQd/rTY9I1GymBhRlKNysikgH0P8A9eqEEkcBIFwnlkcxueDXUaV4gkkjEM88FwqLhI5iSR7Bwd34HNFTnS0Khyvc5+4udT0+/tdTW3WJ7eQHzIz8rEHIBArtjqUOqWVvNCqpsiCnHeMH5W/4Dnaw7cHoaxNUv4Jlmt5LI7HXDCO4BB9+VrM8OpPBe/Z0nwWYNAhfZvfphW6I+OmeD0NTy+1hZqzDWnK62Nm4je3b5D5oLZ5+8B/WqwSRRJJHI25jlonXbk+orS3QzrIiLiWM4lV02FW7hk5KH3GV+lZ0rEFlCgZ4LKMgfj0rnScdGatpleeNZfmjTDn724Dr/tL3/nVfzto8uWPoRuOclQeMg91+vIq00e/BZiWXowODRDaLc3sEbvsQBmlcjhYwp3sfbp+OK3i76Mh6ajXsIR85VT6gnB/MU7/Rewb33QpL/wCPEZrOXUY3QEszqBgb2CA/XuaDq7Dhb1o1HASCPCihQmU5wOeoFFGMGu880KMUtFACUYHc4/Cilz7CgYAZ6MtOETnoV/Om5H90UBWJ+VT+ApASeRJ6r+dH2eX0H50gjuPRh+NBScd2/OmAvkS/3R+dJ5LjqVH1NAjnJ4DH8af5E2MmEfVjmgBhVFHzSj6KM0zeuflQt9am8qX0QfhQIpB/y1x9BigY1TIekC/981IJZ1/ijj/KmFF/jmJ/4FTQIFPJzSAkMwP+tuHb2XikEkB6Rs315pBLCvRP0pTcEnCLQBMs5A+S3P6ClF1csMIqL+tRpJcdoS3/AAE1Kpv2HyIEHqQBSGPVbl+XkIHsMU7Fun+vkBP+02aia1vJf9bMMf73+FKmmoPvyMfoMVNikyX7fZx8Ijt9BgVG+q8/uoFHu5zUy2Nuv/LPP1JqiYhDevH1A6Z9KEkDlISaa5uc+a5CenQflVlV8pY2TrGQwP0OaryH5D+VXLUeasX5GlLYqG50PjzEmsaXcD7kkAwf1/rWOygnpWr4jBn8L6fcfxQ4XP04rODNtHyjpwazg7QsaVFabItvuaDuxjJ/OpMOf4RTSj+lXckJLi4dl3yltihVz2A7U5Zbgjhh+VNEbnPFMMLA8g/nS0HqWPMuj3Uf8BqMi4PWX8hTNjdiwP1NKUl/vv8AnQDHeXIesxpRC+P9aaQLL2dqdtlx97n6UXCwnkN2f9KPJkHRwfqKcPNHcflRmTu36UrhYAkuP4D+NMfd0ZR+VSh29f0prBmPJouFiFo+MjioXiOeR+NXQpo2e1O4rGa0XHrTQzoRzuA4wa0mhz04qJ4v7y0rhytECSqTz8pqbcSAGyRUZtweh/A0ixOh7j+VJopSZdSMG3YDuo/Q/wD16hsjnU4ge7FfzBp8E/lcOOM9v1piptnEqHOGyCKku/Yg1JSfszj+KED8QeanSJpIg2QMjqaS6XdGR2Rtw+h61EJJWjEaKWxxVX0IcdRwjQfeJkHqx2rSyXkca7Vf/gMK8fmf8KE02eY7pXwKla20+0/1773/ALucn8qOdB7N9TPa6d3Hkwjd/ebLmnNbXc/MzNj/AGjgVYk1FFXbawKg9SOfyqpIbic/O5x7nA/Kqu2S1FDhHbw8PJuP91KQ3BHEEap7nk0R2yj7xJP5VMIwvQAUydyo8U0p3SOT/vf4U5YUX1Y+9W/KJGcfiaBHGD8z59hTuHKQDPRR+AqVYnP3jj6c1Mrxj7uAKDLH/fH50XDlGCMDt+JpTmgyx5+/+QpPMQ9Cfyp3GLSc/hSGRP8Aa/KgM7fdjY/Wi4DgKSRN6FeMGjEx/hC/hS+VKf4yPoKVwKkk1zCdm/cm3Ztfkbc9KIrpI85tOv8AccirMkEi4EjNzyNw6iojbp/kU7JheSY1b84f91MMsSoEhwo7Co2uC6YS1Xf/AM9GOTUpgUdCa0tG0pLpLq5nBkhtdimIHaXdzhQT2XjJP4d6lqMVdlLmk7GVFHe3SrBGXkA/giUsf0qaPStTjbahSEf3ZJkU/lnNdxHp7pCgZEeMHmGMbUH0Xv8AU5NXEhWGAtHBlRyFjXaT+VcUsaouyR1rC3V2zgZdD1d0BkETDtmVR/M1D/ZN5Eu9naIL1ZQWA/FcivTB58UaFpI9w7MzD8Aafc/Z53JmiEcydARh8+zDnH0NQsc76omWGXRnlrWbOwkkneY4wG3Zz+NRNbiE7gowOcnmu41LSUks57qNSssMTTMwGAyr1V+xJHRuDng5zXI3mPJbb0IzXfTqqoro5J0+Vmra6dKpjjnWSSVlDGMEpHGpGRuYck4IO0fnW7DottDAskqzFicCOCMKCf1P5mqVpraS6dBFfMBIiKiyg/LIAMKc/wALAccjBwOhrTWVJYVxLIVXH7wA8f8AAlyv61xV5Vb6bHZRjC2pUvLDyXwttcBD/EJQ+PwrJls7ecHY0UjdxJGM/mMEV0E9xKw+W5tX9MyKGP15rMn/AH1xl5VlC/8ALKFS354zms6dSp1KnCJz19p8kI3IzR8f3yy/n1H4/nWUzSbsOWODyCa7C4eKZGilKomMFQQXx7Dt+OK5y7hAvrhWQR7XwEDbsDHHPfiu+jJyXvI46seXYiW4mE6TLcOXU5Bdzn8G61fOrAOpZCu7O8n5s/iMGqr2oZFI9KYLI5+6PzrZwTMlNo0f7aQJtXn04b/Gqsl/cyQTQRSFI5wBLjq4BzgnqR7UwW7DjaKlSAjqQKSpKI3UciolunA2gmrSWa7eTj6VYVFXoKlBx2FaEHP/AGWb+4fzo+zTf882q8H9alUgrQIzPs039xqUW039w1pGigLGb9lm/uH86QWs/wDcP51pmkFFwM/7LOOiHPsaj3uP4mz9a2IwpOGGaybhdl1IvYMaVwaG+ZJ/fb86XzZP77fnTKKZI5pZMffb86sC0ncAtN19STVRulbKngfSkykUvsDd5v0NAsB3kP5VocGkKg0rl8pSFjH3ZjTxZwj+En6mrYTCZpQtK4+UrpBEvSJfxGanTKj5QAPYVbtLOS7cpCu+TGQo6mongaNirAgjgg9RU86vYp02lcj3MaTccdBT9uBQq5NO5KRHubNOBJqYRAinfZ/Q0uYtRZCMg1QvsJexP2ZcGtN4ip5qjqcX7pG9Gx+dCZLiVJB80g9CDV3TOIyD1VqhRC8j9y0QarOnRkvLgdADSk9BwWp0wgF14EvA3WJ5CD9MGsC0Je0jY+mK6LSm8zwfrduB88YMg+hXn+VYekWs91ZotvBLMeeEQmsIuyZ0TV2hu0+ppuGz3rVOhzRjdfXFnYL/ANPM4z/3yMmoGfQrY4k1aa7I/htLbAP/AAJjVp32M7dyntb3p6o0xEcYZ2P8MYLH9KsHxBpkH/HpoiSt2e9nMn/jowKr3Pi7WJUMcN0tnEf+WdlCIh+Y5/WmlJkuUV1Lq+H9Q2eZNH9lj/v3UqxD9earyR6ZanFxrSSsP4LSEyf+PHArDdJrpzJL5srnq0rEn9alg06WTq6qB174q/ZvqR7VdDUW60l2CrLfxD++8SOPxAOafcwPAVy6SI6745YzlJF9R/UdRWfPYG3tzKkhYqeRjtVvTX8/TZoT/wAsHEij0DcN+oBpSjyocanMxhPvjFXHsY7W2in1S9SyEy7oovLMkrr/AHto6D61BBBvv7aNxmOSeNG+hYA1nazcy6l4kupJG+ea4KLnoqg4A+gFQlzMuT5UagfRf+gtcf8AgD/9enBtE/6C8/8A4An/ABrIawhExjTUEkbOMLGxyambSgkKyveIFY7QNpJz9KbigU32NLdov/QXn/8AAE/40GTRR/zFpv8AwBP+NYwtImbCXe4+0LGrH9jSGPeJ8L6mM0uVdw5n2NAvov8A0F5v/AE/403zNHz/AMhiUD/ryP8AjWSbBREsgvUKOcKdjcmiPTjI+1bpSe/yninyruHM+xqk6IT/AMhmT/wBb/GkYaPjC64w+tk3+NZy6V8xDXIGO+3/AOvTjpQ423anccD5Dk0WXcV32L3kaO3/ADHh+Nk9MNrpQ5XxAgP/AF6SVR/s8ecYVu90o6p5TA0S6bJGcNK3/fpqLLuF/I0Fj0wDB1+NvraPTtunL9zXIB9bSSstbFv+erf9+mqVdMd1JE68dtpz+VDiu4+ZluaO2lG0+IrcL6CCRf6VXu9DeGFbwTw3Nm7bVmtmJQN/dbPKn61WGntJHI8MySmNdzJgq23ucHrVnwzPjUms5G/0S+RoZl7dMq31BAIp2stCXK71K6wqg+UAU/y2I4FTIoKAnritCGKzis1utQuZIkckRxQxhpJMdSMkAKDxk/gKXMVyozBFgfMefal2AHgVpNc+HpYCF/tWGTszeVIv4gYNNWwhuDix1Gynb+47mF/ybFPmsCSKKjPXml2D0q9JpWoW67pbGVFH8WCy/mMioAhIONh+jUudD5SsyrnoPypNnPAqdgw7Jn3puZOxjH51VxWGBGPQGl8pvX9ad+8P/LSOnAE9ZR+Ao5hpEe0pzuoEjnrUhRByzbvxprCM9SPzouLlAuO5/WmM4C9QfxphW3z1/Wk2wY4P86YrlrVL/wC3rakxpGYIRFhB1A6E+9URTiseeGxQAv8AezVR0RLd2NJqXT9Sm0y9kkhcKJlCsGG5GH91h3FN2A9qQwKwwRxQ0pKzHFuLujpbXxPZgBZkltG/2f3sf4Z5FWjr1owPl6hAPfYV/Q1xLWH/ADzkK+3WoWtbpDwc/hXJLBwk7nSsU7ancnXbFRzdxM395mLEfTjip28UaMsYMxluWUfKscJ4PrliBXn4guvp+FBs7p/vvgfWksFAiWJbOj1Txh9strm1S2EVvKuPL37mkbszt3A6hRgZ9a5sSvLtjVegxUiWG3q4z9KmSMRDgZ9zXXCmoKyOaUnLcriOWDBjfjrtPIp66hJEMeSFbHEkTFWB9cipmJPaonTPQCr5UxKTWxZ/4SK48xd73LKvrcPkj86LrXvPjIW3cse8js+PzJqp5YzzRsT0qfZxK9pIh864kfKts424QdqekBx6fU5NTAgDA4ozVpJbENt7jl4AXOcVKOlMjGak2nu3HsKaEGcDJNCyKe+aawQfx/rTC0eOX/WmImMyDqaQ3UYqvuh9jSeZF6fpQFyHGe9SJkVUEjDvUyyGkIvxDfHyORTCCGNMhlYMPQ1NLuxkHNBRESaXqKiLn2o3t2xSAlGR0rPvf+Ptz3ODV5XbPIqje83BOMZAoEyGiiimSGM1rEGssLyh/vH+taRlP900ikLyO9OBJ71Hv46GgSc9P1pFJlpGIXBoB56VD5noKekmRyKg1RatbiW0u4riA4kjbIrb8QXdpqUUN7CojuMBZV9f/rj1rns+1L5hI5BrNxu7mqnZWH7RmnqlMV8n3qVW9APzptkKJIqZFSLGx6KTipENvBbrPfTCCNjhAq73f6L6e5qObxDpcCYttMlunH8d3Nhf++VxUavZGnux3ZG6ZO3qfQcmpm8Nane2p8u0kRTgh5sRr+bYrNl8XaqRttXhsk6YtYVQ/wDfXWqLT3l6264ae4J/ilct/OrUJGUqkDbOg2FmM6l4htYGAwY7XMz49OOKgS68P2DMLWPUrwngl5BCrfgMmqCWkrDBVUFSLYIfvOxPsKtQb3M3WS2NBPFlxaIyaZp1nZK/DEKZGYe5Y81m3Wu6tfDy5b24ZP8AnnGdi/kuKtJZQL/yz3Ef3jmrccSLkHAIXdtXAwPUk8Ae5NUqcURKvKRhRWkznd5e0nux5q3FpJY5lf8A75FaUVzbMG2TWrOBwhkcbj6btu3+X1qyA0cVu120Ecs3/LuFYSLzjjqG+nB9M09EQ3JmammQpyFLfU1J9nVfugD6CtULGwOxlYA4OD0PpTfKHpTuZ3ZlmGtrwjPHaanMZCAZI9gDqCjZ7NntnFVjCD0qJoRgjv2+tDV1YcZWYXIhlmuYoEeOI5UI5yVPcZ7gGsK0na1ug3Y/I49QetdFKfMuJJgu3e+7Hv3rndSj2XsgAwCdw/GiS90qnL3jchYJJHJ/cdW/Jga5wvnU/N7eeW/8erfsj5tiJPbn6isC3XfdRgjhpP61zw6nXU1SNS1CC0kCMEeWV1L5xnAyqk9gST+VMSFPOa3dntpGHUjoRz/iPypzoElURKNksYPT7p5w3+expbfUVgDGS47AIoj3bT6gn+XvTBERWSfdHDGyxgjBORu+vqT6VPLZxwMn2mNC4+XylG4K3ocfeb/ZHA71bjmltrYGQu1ySY1C8FCeSi+jY+838I4HNUbmSeXbDbEBmwnnD5RgnG2MHovqerd6aE7DxulnKElmIIIL8KB13MOgH91enTOabOSkLFGVmj4IYYC8ccdB9OtWIHghjXcCnAcBR/CG2qP0Le5xWbPseeZvKKKXyQ/Qj396W7LVkiW2aTzS32k7SvzMSCBx15/lVgbtqhOCwzlMFXH06Z9j+FUREC5Bh+8QCO2Mdau2jRgKpVVVlOOcbeeGH0PNJlJk0VwssaxXQV1U/IHchOemH+9GfTkqfamXFiVjzE7NDGT5kUvDwsem8DqD2YcH2qG5O62S4hVd/wArEAZBDEqy47jcM496ltLtoRGZiYkU7I5HGTbk/wADj+KM+hp2ujN2TFjhMSRq4G5mCnY2cA8c+/ekNvAty0ccu91YorliGyP4qkdEt5xOkZUqduwNnynxwM91PVTUMQmkBjJLuORH93g/xOf6VJVtBusXJmYAEbkt23Y98f8A66z9MJW/gI/vn+Rq5NBJ5M0snLeQ5JPUnIqlYf8AH/B/v1a2M/tGjGu8Iq/ebCj6niotWlE99IsePLjIgi/3V4/U5P41OhMIM3TyVL/iOn64rOslLXKA8hOTSpq7HUdlYtnTFOBHIc+hGail025QEbA4Hb/6xrdtIblJ7SSLdEZ32xSDvzg4/Oti9ht5pbq8u5J1h8820LxruVdi4y31PFbtpOxzq9rnEQ3d9prj7NNNbn0SRk/TpV3/AISO7lwL+C3vB6yxDd/30uDV8kMoDAe4PNQtYW83WEA+q8GqdGMkCrSiQi+0e4/1kN5Zt6xuJk/75bB/Wnpa2U5At9St2bssoMJ/Xj9aRtCVuYpHXPZhkVXm0i5iGco49jz+RrJ0WtjRV+5bk0u6hG57dyn99BuX8xUIiB4/Ss9ZLmybMZntz6oStWY9cujxcGG7X0uIgT/30MGodOSNVViyRoVHqKjMSk9aeNStHOJoJoCe8L7wPwb/ABqVIYbgH7HqtqW7JcqYGP4nK/rU6rdFXT2KxgTPf86FhQfw1LPYatEhdrZ2iH/LSHEq/mpIrPM0vQPk+nerTJ6ltgB0A/Km9OlUWklzyzimhpD1Z6ols0dwHemtIM8En6CqDM/95qbvf+8350BcviT0Vvyp/mHHCkVmb2z95vzpTI/dm/OgLmgXb0xTWZzWcXc9Gb86aZH/ALzfnVIzcjQJamndVFGy2HdwMdjUfmSdmb86Yrmlk+9MLMOkbmqQnmHRz+NPF1N3UH8KBFgySdoG/E4phac/8s1X6movtM39wflSC4mLAbR+VMC0schX5pMewFMMLE8yNQZpAvQflUazSlu35UAWlgG37zfnTxCMdSahSSX/ACKk81/X9KoB32dP7tL5CY+7UTTlRlmxUf2lyOCcUhaFnyVH8Io8pf7o/Kqxkc/xN+dMLtnq350hkHvSildSDwKQUE2Jo3IrQhcSRbT17VljrxViFyrcUFIlkTaxpg96tH94uR171FIpU9KQ7EYODVS8/wBYp9Vq0fpVW7+8n0/rQJkAoxQOlOHJAHU0xEu3a1vn0z+tXVAINVrkYngHooH61ZT7xFJlIRlxSKKlIoUe1Tcqwzb6UoODUhXjimjrUlWJFY8VcVIDbBhKfO3YMZXjHrmqgUCpFGDUM0RYCDHSnhMcimITkYqZeWwRWbNEkY+ryM99Jk5CBVX2AFLb6ekxQIrzO/RVHX8BS60my9DdnQH8uK0PCV0bXVrCZjwkwVvoeP610Q+E5Km4n9iXcVzBbvYvDJOwWPzE27ifetm38Pf6RaCS8iltZZ/s8ktvkmJ/Qg/zrYutlpZlLJpZk07UfNuvPOXTngqP7ppLsxWFpq8onheK7njmtBHIGZiG3Zx2wPWlzMyZnaFpcMup3tpeW32iaGJ/Ki3ldzqenHqKoajE0epTI9pHZuuAYI23BOPWt6bUdNh8RDVbOW4nMkhaWLytgAZcHBJ5Oazbv7BIqCxspLchiWeSbeWHpiqTdyXsZyqEXewB64DHA46knsB1JrNFxFKWfLSQ5O/afvt/eIxjp0B6CtO9d41nMUIk8q25DjK5LZ6HrwP0q14O8P2V/k6o0zl0WVY0fYhU59KU5qKuzWjTc9jDm1FIh+42tx12jBHowp+n6XqWs3fmW9m5j/vyHYi/if6V61B4a0O28uSHRbVXj5V2G4g+vJ5/GrN1sHzeYGJ7CuaWI00R3Qwt37zPI4biW21GaC83R3ELYYScsyjqpPfjlT14x3romg25HUA9fWqPjvy4NZtbh4htmtzGzj1zj8wDW3GI5YxJCd0ZztOMcDsR2PtW0ZcyTOGvDkk0ZrQ5BxVO5HljAHzHkVuNGM9Kx7990oYD5V4FaIwG4VYvMPQjgep9KxdcgdI4p2+9u2t7Z6VtWjx7yZmAWNcqD6mm6pb+fYyqAcumQCOcjkVV+g07MydCm3Wt7E3UAOB/Osmy/wCPq3/66D+dWNKl2XiHoJFKN+IqKzGLy2B/56j+dZWs2dTd0i1E7sBFuAUls+pwxwKXToWZ/OLbCuSrYzsA6tjuewH94+1QtA0kkCocNIzgH0+c81py3KadbxGJAWYb8N24wg/AZb6tSNFsU9RmdV2BAirhHBPEa9dme/qx7k01IpJJ4pSNhVgY/tEoXABzwDzipo0dFjLqxuHcYUDJQnoFHdz/AOOj3qleSwi6eOMMUV+WU9fXk8n6k0yC/qdsyxtt5jB2K2eDgll5HqCf++TVMW4hkAMhIJ2ncMK2fQ1bijNrF50Ugu9Plk8qRRlWVsZHy9m7g9DilMBSYy4M6naFJGdyHvj36Y7GpNLXKyrl9pHyr/tf5xmmiKJ3LSFnLH5gqAlv901Okdx52wwM8cX3QUPzHoufXHpVuOxEBlnAQgJ5ghDYQYHzMT2QHj3PHrRcLELWskenwq21FJHzNIF4BLHGevzMBn/ZNVHikgyUBaBhtYs4cNn1I6fjTrjzQVvdQ8zzpcbI+FZl9f8AZXsOPpRBLHcSn7OskdztwqFgwf2BwM/7p600SyW1k2g28oLgIQo7yR9Sn1HUfSpZUMGWjf8AeYCh88MvUN+IpkRgayEx3rIpBQpyEb/Dv+GKsShLi3JUbQDgL6Ankfgxz9GqJFQZSLn7LKoOY5IXbnrkECqNmf8ATIj/ALdaMoC2aKoxiGbr+FZ9kM3kQ9ZBWi2Ie5c1GXZbiMdZCM/Qc/zxUenISrv3Jxmo9W+W72k/cAGKvaCjSeYh5RMY47mrprQzqu7Omtr+zCWFw5l+0WEBRLfy8q79m3duea0oWMGgS+ckiuIDEoEgMdw0h3Agf3hnn0rn0x9v+zIMlYvMf2ycCr0SyRurxMyOhyrDqD7Vbpoy5h2q2wt1sdPVV86CLdMwHJd+cE+wxWTe3sNkrRjJmI+XAzn6D+p4+taU9tI1vM6lpJGG5hu+Zx1IB9SK4Oe4M827oX7d/p9B0AqtYqwJX1NF9UncMHI+buzM238iB+lbOj6dcXkwWd0B25IReVX1PPX2rlwjKOUJ+orsbW/0p7ZJmLo/KvGjgbU6455Bz3qdR3Kc00drP5Lyqqldys2drjOPqp/MUyW3tp92+2UOuNwI2suemcfz6GsvU7lZ9QeWKVnQcKc9PYe1RWd3JFcoGbK7uA3QZ7ewP6HBppi3L8mnQ5/dl09jzVaWwlXOzbJ+h/WuiiSJkV+gIzz1H1/lTmS1xhitVypi5mjj901rKHUSQuP4lyp/MVb/ALaupUxc+Vdr/wBPMayH/vrhv1rdZEJ/d5x71C1jBM2JLZCf7wGD+lS6RSqtGN51nMCHtZLcn+KGQuo/4C3P5GkeLyz8rq6HlXU8Ef0+lWNUs4rPyzCzHeSCrc4/GqMbctnispR5WbQnzDmWm4pSw/vU0sv940iwxTTS5XHU1Ezr6E0yGKabnr1OKRXUt904rvPDvhWzfw/Jq2ql0jZGaOMcfKP4jUVKqprUunSdTY4PIz1prOo/iFPkljErBU4zxULSAn7grWLujGSs7B5ijvQZV7ZpBJ6IKUu3ZRVE3GmXPQGnw5Zs44pqs7HAAq0g2Lz1oAbITio4jl+KSWQnoetJCTu60AWwMLmmuwUZNLuwoqKQ7vpTAiJLNk0o60hOO1G7npQKxMOlNIOelM38dKaT9aAJZOtRd6ln+U+9RUDHA1NHyagAqWM4NIexdjOOlTEhl5FQRnK1KrYqepfQjaLPSqN8m1Y/xrbSB5U3IAf61maspVISR3Ip3E07GYOlS24zcJ9c1GoJHSrVohEucdjQTZi3PN1EKlVsPz3pJUJu4uO1EinOO9Idi0BkZp4GBVeGTjBNW8ZTNZs1WqI+ppQvPSgDmnikykOVfapAtKnNW4bSaW2mnjUGOHBf1ArOUrGsY3K68VKDTcYxTwKhstIp61DvtEmHWM8/Q/8A16o6a213XoeGBrdki8+0mh7uhA+vUVz9qwSeNjxng/jW9GV1Y5cRGzNszT3Mkkk0rySSffYty31o4Th1wSeopbXkcVLdRExBh2PNbnGTxxHFXIbfcQO1Q2fzxLjqODWlApHapbJbKuq2ZGnM6vt3YiZjwACflJ/Hj8aXw472OjCWaeNFtJngLg5DDIIAx1OScCtp4hLZFZI1kjzmSNhkOvcY7+v4Vi6Dpoa2nsyGgFtP9oUqd2zI2Nj1wSpB9DWNSzWp14VtHQ2firTpbtLZkvBIf4pYSi5/pVDxFr+onUG0zSYBEy/fmYZfpn5AeB9TV1/DljawyTt+8cp97JO446nP51o3UsI07TtRvIkdWj8uQPgEkfd69/b3rkvFO6R6dpNWbOIubW/v/D92t8J5YokFxE8zBmVxyQGHqucitjw/JLe2t3cT7iz3G8bvdf8A7EVvatcQPo8i2oQIfkKEbShIxyO1UPC1pPD4ei+0IEaU7woOSBjHPuSDx2ralNyOLGRUY+YrQgN0rndQhCXMidga654657WYiL0N2ZAfy4roTPMT1MW0CreQlwCu7HPatW6T5Se45rLlXDEDg9Qa2GbzbdJB/Euf8atlM4G6g+zX08Q6K2V+h5FNtj/ptv8A9dFrU8QQ7ZY58fezG31HIrIgP+mW/wD10FSzog7o2LWFHgSRzgZeLPpudtx/BQ350sAW6u3u5sLFGS43Dgd+ncAY47nAqCN5JdPSCMFVRpd7ngZY46/QfrQLjZbusJEix45PQsfugeozlj64FRY3uHmXcd29xtmQmNwijG4Bhx1575J65qnBY+bbCVMqADkH1HaiSESAGUAMxzvPLN6mtHSy0hZn2SKB80j5JAPCggcs2fugcnp05D6aAt9Ssst1pUlzZB/KeXYkhU5HBDY+v0rRDm4thcTEQzD51EjbNxzggfUc59QfWq+qX0UN3K0MYNxISZsNyG/2mHf/AGVwB6msqS7uGJxIEz/zzUL+vWly3HzJaGnHGGlBmvPlZgMq4+THcZ71eeeVbO4uFgIEaKCRh1OThf8AgKDn3Y5rmRPOGyJ5Qf8AfNTwajcQyBg24jv91vzH9c0OIlMtm2+1xtcksZAdpZjuLnHH51HawAsFS3M1xzIMylBEB3P485Jq9Y3kcvmvGqIxUlxjA/3io/8AQl6dxUOou5ZocJGjEPIXwMnHA46gdRjg5zS1TK0auRxC4huzNO0Zhmcq7qQ8Z3HnlelWYAkcs8O/zI1bO4dxjB/8dP8A47WdAXicPEwK/wAZUc49weo9jWhB5a3Jkjx5i8SWzN94EdUJ6gg5x1HvQxDbxGRGVh8wjlz9cDP8qzLAgX0BPQSAmtOe5+0WzBoyjxQPkn+L5cfnxWICV5U4NVHYiejJbp2ubwuBlpJOB6+ldxe6Mnh3Q5bi1nMly+1tkyjHoRxXJaJJ5GrWs+xHELB9rjINdp4w1GG6UJaSboiF3cd61SMmzK8LxyXep6hczgb3RMhegyeAPwFbmpsmnaZPdOP9Wh2j1Y8AfnWf4XvNP060vJr+5WHzJY40G0sThSScDt70zx1fWstnaW9jdR3DFjM4iYMAAPlyR79vaqvYVrmvpcZOm2bq2SYVbI55xXM63YbNVktLIyR29zMrTt5fyROBycgdBnPHvXd6XZRWuladFHygt48HrnIyawtOtLm7v71reFfKjsnJIyGwXOF+uA2TU1J2RVOnzOxwUnmxPh5Mjs7Lw3uD6Um8nlo1b3H/ANeukfSrlNskIjjRWKsiZGF7Hng1Q1W0NnIyvaRysBkmNCh/8d9qzjWizWeGktTJcwuuGzE3ZiKquSMocgnj86159Klexae3RmBx8iyhic/hmt/SLGNrc3FwolulYJ5r4Y7No2gDtx+NaJqWxg4OO5Ut4nFpGSS27LDPXBxj88Z/GmnKmttraadZZILa4nWJtsjxQs6qcZwSB1xWJfTqLyG2QqjS5y5/gx2we5960TsQ0AnYHtj6U5blu2BVGKYzJIyBy0Q3NHIAG2jqQR1x6YqSBhI4A701K5LRT1ebfcIn9xefqaooDjPqaSebzLiVxzljj6VNt2qB6Cueo9TppR0IiKTFSEcUzp2pJmjG4wtQtVmThagI9KaIkPs4hNcpGeAx5rufF3iaJtEj06xOFKKr47AD7tcJG2xs5I+lJO7SNknPpWM6XPNN9Dop1lTg0tyAj5ue9IF3MAKefepEHlrnHzH9K6Ucb1Y5Ih0qXylxjFLGuFyetOZwOtMdhoRV6DFQTSdQtNklLAhTx61F1oIADNPTg0g6VatYCxyw4osAwB5PujpUy2jMfm4q9FGF4Vac7qg+Y8+lMZS+xL3zS/Y09xUklx2WoWmY0AO+yRjvR9miqPf6vS7x/eoAini3DcvUVV71fz+VQSxc7l6dxSAi7UqnHNN5HWnKaALcTcVOBVeP7oqyvbFQ9zWJdsLoROA33ad4iSGW2hkQAEk5/KqY+U02+O63QZ/i/pUcuty76WMyNDtxirdsvzn6UyNe1WbZP3v4U7gkLsBuk9hSzwZGRUyp/pQP+zU5XI5pXG4mK6MjdKuwtujxTp4iPpUSKVPBoeoJWJQOeKeo+ZQTjJAzUYznmn5z1qXsWrJmleWMthc+VMAcqGVh0YHvTra4kg3iM8OpVlPQioTcy3KRCeQv5S7Uz2FOCjtXO0+p0Jq+ghFOAIoINXohHJp6tjEqPtYeoPQ1MnYuMeZkMPBB9Oa5rVITbahNEOAG3L9DyK6hV2v7VieJY8XNvMOjpsP1H/1jWlGXvGGJj7pbsG3qH/vDNaojD27rjkisHSJP9GUd0bb+FdFbngZ7129DypaMrWrFJFK/lXQ2gWWNWA/CueVTHcFf7rV0WknJZPxFTIhmjFGRgg8g5FMSz+w3MN95StYhnjuimRJFC64JI/iVTg56gD2rQt1GBxzV4MkEbzPxEikycZ+XHOR9KzaCFRwehh+dutZba+k8mG33JdTE44HQg+/BrEso4n1AT2/9p6pDCx8lboBIQ/8Af3N/hVbTvECRYWfakKnyNx+6VU/KjZ6MB0J6j6V0anw3LGL7UZGmZ/8AlmZSFH4A8/nXK1yOx7sZqcUxlzNdy2FxfXcNoA21IzASzKdw5Zj96tHw7cWt3oMJtZC3kDZKrDDI+SSCPx4PcVm6zqulajposdLYLFkGUxjhEBGQPVicKB6mqk2kalperRS6dO0N3PZvI8AwQSH+eMZ44DDGe47ZrSlFnJi1zpJHRzR9aw9Yg3RxyDqpwfxq1pOsJeWTm7ljSaEKWkfEayIxwr4PQ5BUjswIqW8j8y1k9CMqexx71tszy7NM4+4j2up/Crdm2bVk/uNx9DUcwDZ796bbuqylf7wxWvQsz9di83TpwB8yYkX8Ov6VycPNxCR0Liu4vANvPQ8H6GuHCtb3BUjmJ/5GlbQ1psvQxuyeeQDuV8HuHU9fyxU4Gw2+1AzSSs3JxnaAo/XNNhkT7HGic5nYj6HGRSF0NsjSjgD5TnG0nLfzNZnUkiaCw8zdtl3tOjKGIwE75P4Ak+wpl7OtlAkVnuT5dyn+JVI++f8AbYc/7K4A60lrcPJcyM7nysbXGeGGNzj8QAPxrPuJXnleWQ5eRizfU01cJNdDSh8LeIJ4o5LfSbiRHUMjIAQQRkEc1kyRyQzPFOjRyIxV0YYKkdQRXsvwxvRbeBo5LiX5FmkALtwgzgAegz/OuK+JNhKddl1VIv3c2BNtH3XHGT9fX1rKNW83BjdJ8vMcVIcDIrR07QNX1OxuLyytGlt7biV9wULxnueeKr2Vhe39zBHZW5meSZYkA6M55A/rXsdrapYaWdKgkj+waOu/ULk8LLcn5iufRep/4CK0qScVdEQipOzPKLvRtW0mKO7uoDbgMNreYu4E9OM5qY7dRsgyqomizhQOFbk4HswyQOzAjvWp8QpXbU7JHYkfZzJz3LMefyArn9MkZLwKDjzRs+h6qfwYClBuUbsqS5Z8qJ4YpHhjdEBXZ25yT0FWI4tslrIUAZd6FW5wVGVz+B/Sjz2imZVAEDESgA4K55H5EkfhUwfzTgtuPmKc465UilcppWKl9v2Rb3ZpGtndsnop6D+ZrIXmtORi0ZcklmiKknrgAVlKcKD7VpEzma2lQsyu+OM4Fal9E4WPI6rnpUPh+aJYYoJRy3OcdzXRXl1HHahJANqjCjHNbrY53qzlXXA6c1EY/kYKBkg1cba8h2ggHoDR5Y9Kdij0PStQ06+t4bWwuGkkggQFWjK8AAd/en28b2L6kqj9zJArxbRgpvkIYE9xnJH1rnvDE1tYJNdzyCIKNrFvT29foKsR64JtSmuZgYbSWMQhHP3V3fK59PnBB9NwrGsvdNaD99G9qyRpGhkjcwI2ZfL6gDocdwO+Kxo/st7PcOqvJbOQY5HXaGPQ47kYxzV+6t5ZAJ4mYs/3s3LJ+QwVrL8maMssrSLx915FYD33DGBXmRiew33JNWsYI9DhhtgsTTN5sjAY8uJSA2PdmIApjRJZWzboliYsZJFH8PoPwAAqzZeVfXNxdNCSltFBFbF/TaXLY9ywIz7VSvg94wtVzvuXWAf8CYL/AFr06UOWNzx69TmlY6jQbb7N4c0+KRR50ym5kPQ7pDu69uNtUpNa0/UL37CNPuNVYZIYqkmcdSofnH4ipPE168FneGD5VA8tcfwrkL/KqPgxtE8xJ3E39pWqvM8hyEVB29DxWU3K9kbU4R5HJjTpHh7UpZvsAa1vNrJLEGaGRR3BRsg/hXP6j4dOmaVfXdvdFkt4ckSx4PJCjDKcZyR2rUlt9NXxFYz6VqMl75m+5ldv4T6Z9T6VV8cXxg8NLbA4N5cDd/uRjcf/AB4r+VaU27amNWEU1Y87gTddLGOgP8q0GXBqnpyk3Dyegx+daRBC1E37xrSj7pWZfSmhctUuCaXbgZxzSuXYrTdKhIqxIM1Ew7VaMpEJFIakIqNgapMzaFjXc3PTvUoXdJk02Phee9TqAF6VQATVeck/KPxqZqrOf1oJZHilA54p0kbxhSwI3DIyOtKgyaE7iasSW8ReQDHA61sRRBQB+ZqrZIV7dat3Mghh46mqAZLMEXA4qhI+TljTJZdx681VaQZ9aAJ2kHamGQdzURJNAHtSESbge9Lke9NA46UfhTAtZ5pR0qPJzTlNIYxo+ajMZBq0RnmlVM0ARx/dqeNuRS+QO1J5bD6VLRpEsEZFRT/6nB7GnqTTLgEx8etQaMjQYqzbj95+FVFzVy35P4VDLRMg/fH/AHalzUIO2X8Ka91DF/rJVX2zzSVym0TMARiojFk8D8qgbVbfdhBJIfRVp/8AZ+v6qP8AQtLu1gPdYyM/UnFVbuQ5dhsskMB/fSKD6d6sWGm3+sH/AIlWm3t0P70cZC/n0qOLwTrTsTNHFbAdWuJ1H8smprxdat1WJdcN1HGMbLeeTYvt0ApO3Rk3l2NCbwb4ptQjnRLl1b/nnIGI+vpUc+mavp6br7RdThX+9s3D9Ko2mtanZfOb3Urdh0ZZTIn4g1vWHxQ1SzYJcuLqP/npGSD+INRJS6K4KTXUyLe8tZX2CXa4/hkG0/rWhAAsoJ+6eD9K6uPWtG8X2TLc6VDdsgy2FCTJ7jHP4is2+8Jxx2zXPhbU1nCjL2F443f8Bb/P1rnfLLTZnTCo46szJogkzL1x0PqKy/EEG/THYdYnDj6dD/SrVtfCa4NrcxvbXkfymCYYP4VceATxPE/IdSp/GhXpyVzadqkXY5PTH2yun94ZH1FdNbPmNTXHwu0F5Fv4Kvtb+RrqbRuNvpXorVHi1FZlydP34bswrW01tk0Tdm+U1myLuiRvQ4NWbVyFI9DkVD2MkdfbgZAqr4nuSsNppUBYXF9IgYI3IUnjPpnBP4U1LqWWaO106NZ7+RQwRshIQf45D2X0HVu1Ynh+0R/ihDE1zLcyR3Jlllm+9IyxNk47DJ4HYCkioU9bsZY6Fb3M95pcjiK4tpWVGKhg6N86hl/iUg/UEHBqg3gxrOf/AEmBVizgMrFovxbqv0YfjXS+NNPuLIDXLHdvtMJc7Rn93nKP/wABJIPs3tSeLNQa58EWskHmAak6K4jBJMeCzg47fLg/Whq51xk4kfhLSrdS16kiSWlhKVhRWDBpx/Fx/Cvb1Jz2FX9Wc/8ACU+H4Cfmlt7rP0IH9RXBaBdSp4itY9Cnt0nm3B0bPlygKTtYD1xweo612ljqlpq/xA0STynge0sZ/PtpR80TZ6Z6EHPBHUU7WE5cxS8b6K9vDHqkEYbzmDFGUFfNGCUI7rIFz/vr/tVu6Vouk6xZpcQWE+lSTRiQNYztHG6kZBXHyEexGR3q94u1JAYdJls400y+TEmpTMfJiOeANo4cEAjJAqv8P7uVbO90a5ws9lIWAH3cFiGA9gwyPZxR0J0uVZ/AM+1jYawH9I7yAH/x9MfyrktY0PVdFmWS9jgMIYZmt5t6pk4G4EAqCeMkYzXsylYsZcFicYrmt0EviSa1uY1lguLOaOSNhkMA4JB/BqnmG4Jnm9x80bY+tcpq8Wy9LjpIAfxHB/pXX6lYvpGoS2EjFo1Ae3kbrJCfuk+4+6fce9c7rUe613d42z+B4rVbGCXKzLsiTOig8K2cVba0PkxLOv7uRFK/vlTt6c1RtWbzdqffPKkdiKts2YmZVBYgYOOvyis5HVFkrRiDT22gDcsh++H7qOo9qy371as0Jt5EHOdy/muR+q1UJyM00TJnqHgBorjwSbSfmJ5pYnHs2P8AGpLbVbS78F6hLdBbmfTf3F0pPMqBgu7/AIEv6isjwJOE8Osucf6YckfRa5C2aKPxDJFd3Dw2Mlwy3W0/fjD7sEd+lc6gpTdzeVRqCsej6Zpn9gLCNHZLq+ugYNIc9943SXLeyrgfh71rraW8zRaBZsZdK0hhJfzMebq5+9sJ78/M34DtWPb399HaxX8SIviHXh5GmwAfLZWo747ADn8KbBqEFp4msPDmnSM1np0cslxLnmefb8xJ78n8/pVzvysyp25lc5j4juJNas5M5Zrcgj6Oa5WNirqw6qwI/Ouh8dln1a0Yj5Tb8H/gRzWFZx+bcxoRwzAH6Zyf0FVT/hoKjvUZtSx4QytHA8aySRHzZfL24bIwc+hxTowNjyKEETSxCMJJvA5ORnr3qncOEu1kZcsq79pHQsdx/Qins4k2SAYDyIW7dCTQU9iFBvnIJAQQlj7cVlIpdUUdWwKt3DlIVA6vGB+FGlIr36b/ALqAn/CtIoymy3ENhq40vlwmRw7cdByeOp9h71eFjE0ZlDARKMsf7oHWs7VLtUhEEI2M7o849AD8sf0UHJ9WPtWrZkkSoI2wRdRf7qRPJ/49gL+tKrxZ2kyN33F1jAHuFDH9RWf5zFsnkj15psrllwWbr0HelqVzGjFdQSqWEUSbH/dugYsf9oliT9AMetdBY2rX3hm2miCyToJE2Y4kBY70P14I965CPcOXILD0AGPyrq/C+pQWPh+5M29zFcvsiQZdyQGwBUyWg4y1KUUuqWtvss73zIx8qRzKTtHpkcjHTB6UltHqOqzol6wnVG4t4OFY/wC2ew+v5GsK58Rz3ettO9qEhkkBkto8gvjjk9S3vXcX95DpmhJNZMqNdALaqgwMsPvY9hk1koanRKrdFXQtTabWtVsZpxMZX3xMBjcyDawA9MdP92rq3NvpurWt7eCTyYJC/wAilju2kLx6ZNcZFcfZGt7iApkFgNwPI7cjkHjII6Gt+LVkvoi8rFWXmR3wNoPQsB0/3h8p77TW60Vjlau7mxJ4k027ZlzuR8gqw6g+1VYIUjtbuDR9QjhjuRh0mTJx6BuoFZ89pHKT5kat9RUH2RoseTLJH7A7h+RpuCY1UlE3tL0z+z4mkeZJJHUD930UVyvj258zVoLUMSLeBQR/tOdx/mPyq2dQvbVtodHB4/umuW1a9k1HV7q6kPzyyE4/QCpsorQbm5u7Lmm2+LMSH+Mk/h0FTuuTwKu+SIrWOIfwIBUSxbue1cLl71z0owtFIrLBk5pky4BHWrzgKtVHQGMsT1OAP5009RNaFJl4qNl4zU7ioXrdHNJFvTbm1tbW/M8PmXEsXlw5HC5PLflWU3WpWJPFNxk00rEyd1Ycq7j7CpccUKP3X1p2K0RLRC4zUSor3MSOcKzgMfQZ5qxtyaa6hRnHNDehGzuXfFOoRajrrG2ULbQIIYgBjheM1Qt48tmoSxkfPpxVuL5VFKC5VYJy5ncuRkKD+VQXzkgCnM/OBVS9ck4FWIrSN2H4mo6cwpvegljgKcB6Ck61Pbx7nz2FADo7ZnGT+AFWU09dv7xiG9B2qQZGAKftz1yTQ7lWKTL3pAKlK0wr6UCHJjFSCogDTx+lAEyt61LgEZqm11FFwzg+w5qB76WTKW0TZPfGTUtlK5oSNFGMyOqfU1Wku4XxHDvlYnoq1XXTbjiSUOX67TC7Z+vFaMWt61pkYNvNJaAdPKtli/UDJqHZ7F+91LFjoOu3hBg0W5Kf3pBsH5nFTz6J4htkOzQbjcP4lHmD9KtWPxP12ABbloroD/nqnJ/EV0um/E+zmGL2xNux/wCWkZ3J+PcVzzdVfZNY2fU8/ttNvL6R0vr+HT2Q4MdyWR/wXGTW5beGNHtYPPup5732x5CH8+TXbXnijTby1B1TTTc2T8LMFWeM/wBQfyNcheaVpep7bvTo2swhO2OVmkg/EH5kHuMikqrno9ClHl1auXtP1iysUxpOlwNIDjbbR72/Fuf51oz3uu3sfzKlkp/ilk8xv++V/qa5Z7m6sp1t7+LyyRlFyAjj1Qjhh7irC6gdv7uMj/gXSspwaZ1QlFoty6fEGL3U015L6zHCD6KP61WcQGQIzqz9k9Poo6VnXt60nBlZl7qhwPxNZ76osClI3WMd1jHJ+p6mrjCT3IlOEToZreMJmZo4l9X6/go5rFuNKtZCzltg7P8AdqO2Go3fzwxiGM/8tpjj8s9asNY268zyy3s59TtQfh1rWK5eplJ8/Qob/wCy8Pb3scoVgdqNh1PqCK6vSNc0/WWEWqSraXr8LdhcJJ7SgdD/ALQ/Guea0iZCoCbx/Coz+dZslsYXLw5wOqen0pyjGZjdxPSrvRLS5iFpqLB0A/cXKtueE9vmH3k/l2rE3S6TqDafrMqxyIN0Vwx+WRevX6dD3rM0rxBJpumkSlZYDny4yfmz7eg9a1NP0K71cQ6x4qaUWgXbZ2QJDSDqPdU9+prLlsvf2NlPVcm5xeqzxXGo3EtuGETuWTIwSD3/ADre0+bzIo3z95Qfxqv4xCvqUUqbABGImSNcLGV6L+VQ6JIfK2H+Bv0NddNpx0OOsmm7nWwgvAQvUjIqzo9nc6q5ktMxWaHbLeFdwDf3Ix/G/wCg6n0rInk/4lrRgZMjpHgHBIZgCM/QmvRZJ5bSQ6a7Lu0/57ZkUKHhzgfKOAykbTj2PehmUI31NvSNIg0rTysUexm+YgtuYn1ZurN6n8BgV5PFqjaJ8TJL1o2eKGZzIi4BKncDjPGcMDjvXrOr6sLfw5dakiq7Q2zzBOxIXOPzrynw1pi+JYdQnuZWdkYB3CrukZl3OzMQe/AA7Ul3NWemeHNYt9ejvZ2t447JX+zqknMr8ZYuvQAgjA571gQ2iaRq0mhznK2aNcafIT963bqPqhyp9sVzGjaovhfxRdWLOz2gCo4P3jF1R/dkyQfVSfSuy8V6cdb0hFtplW+gUyWM6NwwYcpn+644/KgDx+zuxHK89sfKfz2lidRyh3ZUivVfAV/BrWr291sQTWumvHOoH3XaXp9MDI9jXjGGt28shgBkAEYIx1B9xXpnwrYWWn6pfSD55Jljx3IVc4/MimxHoPiq9j0rw/fTRKHkkT7PFF1EksnyquO/XNcdaw/8Il40sLMSk28sEKOxOc7l8tjn/rokZqVtROseJYCWDWWjyZYjkS3bdceoQcD3rk9S1ZtVuYrnUXCRLCDGNpPlIWLAYHJ4XOT3oWgHpupX7R20r8homVvyPNYJu8eJ/NB+4tyP/HFP9KwNN1SeeS6spJfMhkgdhuZmKMCOPm55DDIOcEVTa+ZtQHzYaSIj/vpAp/lSsO502uwi+8JwXJXNzZJ5ykdXjI/eJ/3zhh7rXn1ziRXiLBgQVyO/oa7eTVRCE8ogBJBtzyMAYxj0ritXtks9QdbcEW0o82Dn7qk8r/wE5H0xVRJl3OdjJjlRx95Tmrbt5canqwQce/I/wqCdNszDseRSrI0ikOCSvTA6juP0z+FKSKiy/bLAmwowQzAKdx4VxypP4jB9jWfeRGKZl2lVbJUHqOeQfcHimsvmbfMlBABwfQVajAvFMMgYyrgDbyX44I/2sdv4h7ipRctTpfBWrWU8EOj3jw2MiPuhnPypKc8hz2b0PfpXMa3avBrl7bzrtKXDBvpnOfyqs8JiIEgDK33WH3W/z6daa5JJJzz60KKTuiG3ax02m+JpLX+1dXkcNqksaWliD/ywTHJA7AKAB71U8GTImuvLcXCwxRW0heWRsAZ9ff8AU1gkcUzaC2SKbSasCdmdD4l1qDVpILeyh221sW2TSD95IT1OOw46VW0uBQjXE2ViKtyP7g++3/sg9S3tVazszLtklDCNvuqvDS/7voPVjwKs3lyrosIIWN8F2UfKVGdqr/sr69zzRZJWQ93dluVlltIJlZZJZJDIyoM4z1B+nA/CoZ2At/NyCMtjByMhcfzaqfmLDGI4TuduhFAP+rQqzRRDGFOOSeefc/yqbFt3I78IHhVWzthXd7Gl08bfMf6Corpla6kKoUUEAKeowKt2iAQqG4zya1gjGT1Lv2horUrndvwSueDzwPxOPwBrLfLB2ZixPOT1POc/iefxqxM4YE46/wCf0HH4moT901TJJF+97U5sEYPSoycY5x+FLgnoVP0NAhytnr1Bwf8AGtXSb6C0W/aUDKRCVR0LdsD8cfnWOOGz07NUUy/OpPbik1dDTsy74YIOvtNdY3ujuHP8J6k/lmpLq682VRGW+zw7lt0b+FSxYn8SfyxVG3Ugk5IA4+tOllwxAG5vT/GhK2oOV9CPdIFWNmLKCSq56euKniYpIHVirr91lOCP8+nQ0wwzIiyyRvh0DBtpwAfftQvPINPcDodGuyqrbyZZv4EH8X/XP3/6Zn/gPpWjK6sgaP5lYZDAVyW8sAgAZVIdlboQOx+tdZayxrp+QCUWRwm5txK53DJ78MKcdwk9DD1FjGrytxtBNc5aRTy3ka20LTy53CNRktjk8fhXReJZ42sEWPG6R8H6Dms7wxdmy12GddnmoDsDg4OeDyOnGeamo7IqlG7Niwu49QTKnDj7yHqKsPGE4ArZvtFtvEaNqWjstrqqffQkASH0b0J7N0PeudS9k86SzvomgvYjteNxg5rzWufWJ6sZ8vuyGXPQ1CtrO9lJdBCYI2CM/YE9BU7jNLLdSJpRslOI2k8xvc4wKrVDaRlOKgep36VCeTXSjkkQ4pQvBqQrS7flqrkWET/V0/GRSIME1KkZb6VV7AlcYq8VDOQRirTrsU1TYZJzQtSJqxAgx+dWVOBUBGDgU7dxVmZLv71DNyc0oz3pHGaAIT1poFSOmBkUBMUyRUXJ61eiXYnSqsCZfHqa0FUZoKSFVTjNKXC8U8nC1Tlc7+M0AQQvc3LbbaDJ/wBpqvRaJrcxBVY0B/6aLWjL4ogH+q8O2n/bTB/kBTU8Uwk/vPD1qPeIlSP51zuVXojVRp9WMj8J6/L92S3/AO/oFRXHg/X45RvtHuV7+TIGrSj13TpiPOXULI+sRyP8/hV9ba1v0D6XrxnlHIimmCN+uKy9pVT1Rfs6b2ZhQxaVpbbdW0W/hk/6bH5f5CtL+27OO2MliLK2iBx85JfPsoGa0DqWs6Zi3vZJPLPGy4XzEP55FVbm10HUjuudO+xyt/y3sWwPxjPH5YpOUZO8jRc0VaJnPqN9d4w9wVbuQIUP48k1Zt9PWRMzzwoD1EMBdj/wJ/6Uj+HtUtomuNFu/wC0rdBlhBnzEH+1EefxGayG1a6LbZGVMHBIXv7+lVa/wApr7ZqSeH9LMZWBn3nPMvP8q57UNKm06TMcqv8A9c23fnV3fczDmRivXrxSrII1xvMp7heF/E1UXJbkyUHsUdG1270m6823ZQG4kjYZjkHoy/1rv9E1LS75TJaf6LKQXa0POPUof4h7dRXnl88EzMzACTsUH+c1DELi1KsyOgb5l3AjPuD/AFpzpxmiIVHF26Hptxf6NcWrwMYZ4mOTBIpCE+qkco3+0v4g1zeqWv2SA3Nm0lzYKQGSQ4lgY9FkxwQezjg+x4pLbVLLU9OdL791fx8pcAcS/wCy47N6N370W1xLGVeNuQpX5huVlPVWHdT3FZwThozV2lrEqDTJ7iNZNTu0soiMrCo3yN9FH9TUiJaWa4srMBh/y3uDvf8AAfdWnXEQhIuLfcLVyEZWOTA3ZSe6n+E/geRUM8MUgDys2B/BnjPsO9aE3QxrySZztZpmHVs8D8afj5czy5/2V4H49zVSe7EJ8tQEx0GOfyqESSOckbQe7ck/hRykuZclu0RQFGB0AAwPwAqolxLdXKQWsLy3EjbY41Xkn6VbsLS91e8TTdGt/MuJPvMo5A7lm/hH0r0jTNL0bwRpshWYXOqOu2S5UZO7+5H6e5/P0qZ1I015kpObsil4f8Kad4eVdR8SyQXGqkgxWhIKQk8jI/ib9BVHxRrLXkr3gnK2ifIHDYaZu6oP5ntVXWvEstskTX2DIykraoMMVPd364Ptya4fUdTudRu1nmKrtG2ONBhY19AOwrOnTnUfNM1c40lZbjb27luLoByFRTwi/dX/AD61d0xtlwV7Mv6jkVlH9fWrccnlskg/hIau1KxyN82519q6ve6cGI2teQ5H/AxXc+IbiMMNSiJItpmMg7mNjtlX8OG/4CK83hkIu7TaelzGR/31muynvlM6ztj7Pcf61T0DdCf6H2PtUy3CGxs212J9Iu7CVgQyvGcdCGUj+tc98MQbPS7+C4ADtLG+fVWQ4/lWfY3b2dwbZ2OYv3eSfvKOUP5cfhT9Fv8A7OZbY4GxmA+gYkfo1K2gzd8VabZzJJexhUuFURh8crzlWH0YD8CaoW+ovY6fHJYlpLKVd72RPzQsepiPpnOUPHpVfU9SM0DIG4ZSv6VmaQzXtn5SyYmCbkU9H9R9aFsDIPEMFtfRnVbaRGMjYlUDG8/3h6N/eH40abqc+neFDFbZN3d3D+WB2J4z+AGadqdp9ndEkYedIA8iI3T0B9/epp5dKisy0UjzXbAbARgxkn5vai4ie0nOm2NjZwEkrJuYjks3Un8/5Vn3OxpS9o3lsTjDHgKTllBHQZzxg9a3pnfSLAta2zT3TL88oGdnHJ9cD2rm9N+zy3qJeSskRB5Bxlu2T2oTA0NNuPIjkUsWOTjJyFUnOBnn6nvWbPMRqCFT908fn/8AXqa+tptNuyjncjjMb/3h/jWdI5Nwr55zVLURqXdw/wAm09KrXcjS23z8mE71+h4Yflg/hVZ5ckUxpfXnPBp2BlK7/hPpxTbV1DFTnnHAPX6ehHUUr8xle4/pUCnac/yoYRJAqlnIugIt3JMTZ/LFTIi+S3lkmPBxu65/vEevt2ogL+Y8ALETIRx0yRwfof51S8xovlbKMOoYYNQaJ2Nq4ubffFFKHLSRgs/BOcfxg8N9eD71TeG3JGyReRkYYrx9G/xqO3hFvaG8uk3GTiCNxnP95yPQdB6n6GrCqu7JUA8KsZPKKe2f7x/QfWlsG5ELVDgl+G77lH9alhht1kQAqzMcLj94Sfxwo/HNQuiKu9SRhjtUjp/j6U5W8sgmMmEHDLnkd8Z7EdQaBtWJkvVWVw8O6RuNrnPPbeT976cAelVY43BETMu5ifLYnjJ6g+gP86ju0ZLh5PMMsUh3LLjG76+h9qSJZLuZYlbnu/ZB3JpiuXo7eKGJ5psyLHgskQKj6Fz/AEGaS5k3RjcgVnO91UYC8cL+C/qapySI0pdFPkodsanJ3nsT/M/lUtw2LcjO4sdu715yzficD8KLBcrFjK5J6u2T+NXZGKx4XqeKpwDMmfSrDHLe1aIyeouegoJwDTa0rTTDc6VcXzTCKOE4AK53H/OBQ3YLGfu4pOD15rV0Gyt7u4uWu03QQQ7iNxHP1HsDUKWER8Oyak0rq4kKonBUjOPr60uYLFNcdO1NPzYXvmtHUdOWwhtXE5lM8e8qUxt6f4/pTNQ06bTjC05jJlTcuwk4+v50XQrFQsAQiEcdT6U+1gWS5iib7skgDfSt3XkW20nTLEKodY97ttGc49fqTVG6bR8Q3NtI4Yx82sR6SDvn+EZ/PtRzXQWOiVInRJILkRyY2OoHP0x7CuTv/LF9cNHtCbzjau0ce3arh16+a1WHZCpA++o7+uKy5Dubk89T7mohFp6lzaewqthST1PWtGC7zYLGMhic/wDjq/4VlN901cjYO25ccKg49doFbIh7FC/bdOqE52rn8TVEu0dyHQlWQjBHarNw+66lftnA/CqY5f61L1GtDsNC1h3lV4HEN0n8PY+vHdT3Fddqdtp/iq0jiuwtlqaJ+6uOpT0Vj/FGex6ivIlLI4ZCVYHIIOCK6TRdWee4jSaXZcr9xicB/b2NclSi0+aB3QqqouWZYkjutLv203WYTb3KdGPKuOxB7g+tNuhg4HSu332WvaT9g1yPMafcmX/WWzeo/wBn1HSuI13S9R8N3S29+PPtZObe6TlXX/H261nCSm+zNbunpIoSCkluI2eNVjwI0C49T3Jp4IkUFeQfSuj8LeH7SdH1HVm2WsWSFPQ46k+3tVymoLUSg5vQ5ZlxwwwaDxV3UpI7i+lnhUpGznap7L2qqRk1ondGclZ2Ehj3tVsKFXHanW8YCdOtLIMKalyuylCyKVzkOF9RmqxGKlkcyTMxPNRtzW0djnlqyFhg+1NAz3qRxTVBFW2Z8oo96a9PBBGaOM9KaYmiFm4xRkE4FOcDNMUc0xWLNtjePrV5BzWfbffH1rQQ8mgpCSnAas2RvnPNXpjgNms1wd5xQSwy3rTkdhKq7sAnkkdKTdH/AHh+dKFBOVPPtUXAkknljkKgqcdCvQj1pPNjlGJk59cUmzB55pCgouCL0VxchALe8Z0U58uQ71/I9K14NWspWVL22awlPHnQ/PC31XqPwrmQpU5BII7irUNzj5ZRkHqcfzFZygpbmsZOJ2awTwmO5gYhOsd1bvuTP+8OVPsasXzWOtJjXIdtzjC6hbKBJ/wNejj9a5bTb670q5FzpVw0Z7opyGHcY6MPY1sNqVvrN2rW0AsrthmWOPmJ/VlHb3HUVzOnKDujfmjPc53WdKvdEIZitxYyE+VPCSYn/qrf7J5qGCxa5RJb28jghYZCRjexHsB/U10jX4sZnt59jJKNskTjdHKPf1+vUVm6lpQt4GvtJMhtF5mt3O57fPfP8SHs34Gt4zujGUeVktrJYWGP7NsS0v8Az8XQDN/wFegqDU5BcLsuC0kzdMnO339vpVOOXzI9wbbjr6ionkCjjgevc07O5XMrWKkqSWsoBx/st2Yelb9jdx3lkRtK3UQ4H/PQdx/vD9R7isWRZJlCN8iZyC3WoopJLa4zkqykHK9eOhHv3puPMiIycWdSuqwR2nlvB5oI2up6Oh6qf5g9iAazLgmNSkMx8r7ySEfM0Z6fQjofcUvmxvcrPIqmNnBdQPlz9PQ9f0pup3EKh2Dgkncm0Yy3fjsCOv0FTFW0KlK+pQdkiBdRtHdjyx/Gtfwr4Z1LxXdlLYfZrFD++unHA9h6n2rS8J+B5tXhGra65stHjG/LHa0o9vQe/wCVbGs669zGumaMhsNJtxtVIxsLD1PoP8mplVs+WO4lFyOnmtdN8L6YmlaIVQyDM0u7Ms31b+Ef5FcL4i1K1052aS4F3f8ARIUH7uIe/t7d+9YWo68YwYLCQn+/NnP5ev1rnWyx3MSc8knvSp0G3zTLlVUI8sR1xPLdTvcXDmSRzksx6mmDO73pevJ/AelHTp0rr2OZsXPp0qVGzHiojTo+pFBJt2Mxb7Jk8pIufwNbouyQEJ+Utn6H1rlrSTYTg/dYMK02mw+M8CpaGtCzcyMpVu6DGe+M8flTUkJuFkU/e5b8sf4VC8gdcE1VRymVPY0DNB5i7gZHJxyeKntLC4tdStbKR/LkJ3K8Zzxycj8sVkl9w+tb2o3ji20jUkx5q8HPfjp+h/OpYFq8is7tL1rQym7t/mkLsTv9f5VStma+8Nz28Sb5IpdyAD72ef8AGtbSpLW4lluorGaAzKTJLIRsP09frXNXmt3MitDD5cEX3R5Qwcex7VKuBqaVDrUd1GZN6QA/OJXB49h1zVYrpjaleNPdFIVf5FjH389ce2ayWu7iZdstxK6+jOcVDnsDn6c07AbmsalbXFvb2tmreVD0Z+vTGBWMz803a/cBR/tHFJhB1k3eyD+pqloFhxc0wtuOAcn25pC6AcRg+7nNIGllbYgY/wCygwP0p3CwjgqeRjPPNVjwSKtSxPC5ilUo69VPaq8g5BpiW4iyLtVJQduflYfw+oPtViH7S2fKkaXDA5RwcD055FVigK9Mk9QO4/xpYEDCVSQSUOOOvcGpKLAKxySzySeZNngE7wh7ZPQn9BULlmX5n/Lk59z60zIESbTjjdjHrTAqCTfknnp70ihXYg4Lt0wSDnFWYX2ZDNlCMHPIP19v5VFIoCqM7j3x3qIqNuVA59+tAFpgYnHkS7RnlGbDfQ9j9aPtNwsissrJg5CKw5P4dvrUUyl1UgZ+Yrx64FMVONka7mbjjv7CmIkUmSXezYxkhvT1b/PtS3EmYUG3bu6L/dUdB/M0r4jiPQnPJH8Teg9h/Oq7MWILdhigTZJAcAn1NS7gB0P1xUaL8gqUrLEFYh0Djcp5AI9aokAc9Dmt/Sby0l0WfSryf7MXYskp6HoefxFYAOfvBW/DB/SlKoejMv15FS9RnRxXFpoWnSrDcw3t1O4JC/dwPX8M/nTG1jTLy3+y3tlJDAp3KITxn8MVz6wM33CrewPP5GlKFD84Kn3GKVkOx090NL1h4Zv7SFsyIqmKVcDAOSOe9W9UsH1a/sru3aOSzAAYhuQM5P19K5mzuo7eK4SS1juPOQKC/wDB7inXk9st0H0pZbaPaMjeQd3c9aVhHRSRw6l4ruftI3w2cKjZ2J+n41QvpbXUfDlxfiyW3eF9kRXAJ5H+NVNCS6nvp54L5YZ1GT5o3eZn1HcVq6rqcSGLTpLVdRlkGZo4uAD14A796NhGRDYRnw5LqLu6urlUUYw3IA/XNZhbJrX1DUYJfD1vbW1vJbjzfmQqdq7c8bj1OcVig1pF3E0Ob0qS2fyoWz6k1GaZIf3ZHqaoCo52p74qJeT0p8/UCmIMnpmkMUqevU/z/wDr1ImGxnr3ooCknI5Pp61JdrHX6LqUc6QLDeNFqEY27ZzlZvo3r/sn866uw1W0ubaXTNXtvNsZDh4m6wn1Xvx+YryRhx6g1t6LqHmTiG6n2SEYjlc4B9mPY+hrlq0b+8jrhWuuWRu+IvCd14dP9oWDG/0aTnzV5aPPZ8f+hdPWjUdUiu9KtorMkQYG8Z7jsf51u6Xrt3pz7OCgBWWGQfK49CKoa54ctry1l1rwkpATm703q0fqUHp7fl6VinztKe5onKltscs4G7FKiZkAxUNvOk4yp57j0q3CP3gNbu6QlaTuiwBgYxUM/wBw4q1ioZl+Q1lF6m01oY7D5zTRVgozyFVUlvQDmowOeldKkcbgxmK1tK0lruye5yoUMVxnniszFKJZo0ZYpXRW+8FOM0Su1oOFk7siVUQOrZJ2lRj1z1php2OKQj1q0ZtEZ5NNp7Cm4PpV3M2h8HEgq/ESSSOlVoIGPJByavqu1QBTGkQS45BGarMoz92rTLlvakIpktGEUA7/AKU3bzwal2+vNG1fX9aRAgklQfeOPfmpFuu0i/iKjOwfxU3ZnkBj+FLQE2XFdX5Q59u/5UrH5GI7VRKspzgg1ZhugTtmH/AwP5jvSaKuT/NAVeOQMrdccc+9TpMWdZVZkkU7g6HDKfUGqjR7SPTqOcj8KcpIIIpFI6u2vIdaiFjqix/aXP7mcYVZW9P9l/0NS25Om3caLK2wMUVnX5kbujA9QfQ8EVy8Lg5VlDI33k9fcehrbtpXv1+zyMZ7tRuhc/euUH8B/wCmi9Qe/T0rKUOxrGfRkGt6bFbMb/TlAtif39uDnyT6r6oe3p0PrWWjIPmUDcf4m/pWul3h1lUhwQRyOGHQgj+YrHuoVtrkCPP2eXJizzt9VP0/wpwd9GTONthC/wA3HzH1NRTruAY8sKdnFRSPvlWNWUMxxljhV+prQhsI5psi2gjMskh2qqjJOe2PXNej+F/BVrpMJ1nxaPMmjXelmfmC+hf1Pov50vhu58H+GLLfFqUF5q7j57kqdqeoTjge/U1mXetWOpXbPd62oQn5YxG4Qf4n3NctSU5PlirLuawjHeTNbV/E0/iCWCKBGhhTLCDr8w7n1IHQdq47VrXXbvMMWn3EVvnpjl/c/wCFa1xJoQVWj1a3V/7yRuxpkLaPJy/iMJ7eQ2f1NTD3NkbuEZLc5YeH9XJwLCbP0p58Pa1gZ0+f/vkV2iS6DDHkeJFbH/TM5NFrqmkTySLHrLqsY6yrsDfTPWt/ay7GHsoXtc4s+HtZI/48J/yFN/sDWR/y4T/981202uaTE206ix91JNA1nRiMnUz9CT/hR7SfYp0odziBoWrt/wAuM35UDQ9XU5+xTfkK7M6vojHjUXH509L7RyN39r8ehaj2suwlSh3OOTRdaz8tlNkjHQU5tN14NzZz5/3BXXNqmig4GrPn2Jpo1bRncL/a0o9znFHtJdg9jDucn9g14f8ALnN/37pP7O1xufsc3/fArrmv9Iz/AMhth+dK2qaPCg/4m5c+wNHtJdg9jHuch/ZWvMP+PG4P0jqxdL4ilgSCe1m8uMgqvkgYwMV1EfiDSx01Jh9VNRS6xpcshJ1Lr15aj2kuweyh3OZEPiWS1FuIrswgYCBeMelNXQfEMg3Lp10R/wBc66621LQ/+WmsFD7FquQa3owJgXXSqHuVP88VLqyW0Q9jDucJ/Y2vL1sLn/v3SNpmvHj7Jcj2CYr0L7V4f3bm8Sp9Ov8ASmtceHSc/wDCRxfkf8KPay/lD2Ue552dH1sHmxuP+/dOGka72sbn/v3Xom/w/wCXuPiK2dfQnmoBdaGZMLrluB/tCp9vL+UpUIvqcIula8hyLCc5GPmizU8Nh4lijCxWM4UAgfuQSM816B5vh/yxnxFaj6GkR/DrHnxNAPxxR7d/yi9jHuedzaZ4gmYeZYz7gMf6oD/9dRNouuAfNYXH/fFenFvDka5TxLak/wC02aIrjQWOF8SWAP8Atbh/Wj6w/wCUXsYdzzFNE118+Xp9ycdcR9KcNA19SCNNugQcj93Xqkd94ftgceILDzD95ldhn8jUv9q6Qyk/8JFppX3lfP8AOp+sy/lD2UO55KdA17AzptzwMD93QfD+vL8502647+XXraa14dxh9ass+0r/AONKmp6Edzf27prj3dsj9aX1mf8AKP2MP5jyIaDrzdNNujj/AKZmnjw74g6jS7v/AL9GvVY9b8PpMzHXbNvRSX2j9alj1rQSWJ8Q2PPsRj9af1if8oOlD+Y8lbw94hVQp027xzx5ZpV0XxCj5XTboNtK8Q9q9WGraHnDeJbHHb5TUjar4dEXPiGyL5yHUkYo+sS/lF7KHc8nfQ/EbxLG2mXW1cYHk4qA6BrmcHTrn/v3Xry6n4edefEdqD7SMP61Gup+GI3YPrdtJ/tCVv8AGl9Zn/KP2MP5jyf+xNdH/Lhcf98VPFpviWLYUsrnCZ2gxZHIx/KvSpNT0YufK1/TNnYO8mf51ONT8Nqo87V7Fj6rM/8AjT+sT/lD2MO55ZJpOvvub+y5lzjJWDGMelVv7N1rP/Hlc/8Afo16pJf+HmU7Nb0wg9neUH9Gpsd74X2DzNctg3/TOSQD9TVe3n/KL2UP5jy8aVrR5+w3J/7ZVINO15RgWVzj08qvRDf6QJW2eI7Mx9g27P51Wn1bTo2+XV7ST3VzVKrJ9B+xj3OBbTtaY82EwPtDik/s3Wh/y5T/APfuu6Gs2Geb+3P/AAOmtrGnn/l+gH/A6ftX2H7CPc4b+zNZbrYzH/tnU9nYa9aXSXEFjMHQ8fu+D612D6vYKv8AyEYP+AtmohqtkTk6qgHpuo9o+wvYx7nO6mPEWolBLYypGnKxpHwD61Q/szWl/wCXKf8A7912q6npuOdUhP1Jpw1PTD01SD8WNHtZLoHsI9zh/wCz9Y/59Jv+/dB0zWSObObj/YrsW1PS8/8AIUjH4E1LHeaW4y2uWw9iCP6Ue2l2H7CHc4Y6PqzHJsZz/wAAoGi6sp4sZx/wGu2kvdOjPy6rC49Vkpv9q6eBzqSH/gdP2suwvYR7nHf2JrJ5+wzf98ilXRNa5xYzf98iuvXWtOL7TqRU+uePzqT+1NMwf+JuufduP5UvaS7B7KH8xxn9h60T/wAeU2f90U5fD+uE7f7OuDntsrsV1PSmYE6pDn1NXZNR0mKME6tFkj+CU5H4UnVkug1Rg/tGDpeleJ02R3OmXMkIGFYgbkHtzyPatLfqWjakjIXtbxFDgZ6qfUdx7VHJeaVIfl1+RB6M+RVRprBZSy61buT/ABOpz+YrN3k9Uaq0Va5e1TRYfEhfUdCjS11lBvnshws/qye/tXL2V27XbQzxmKdCQ0bDBBHUYPf2rftNRtrS6S4j1mzWRGyGAbI/Srvi3UfCfiO0+1C9Wz1uIfLMkbFJsdmwPyPUe9VG/wAMkZN8j5oszAQwyKikTINUtH1E3ZaKQDzUXJI6MPX61qbc8YrKS5HY7ISVSN0XdGl0+w0y8urmNZLlkZI1PXngYrle5xWrLAxOMU2Kw+bc/A9KcGlqFSN9EZoSRj8q1Mtm5HzVrpEqDAAFBHvWymYOnYy/sQx0qCSyYDK1rsKjYcVaZm0YrW0mcYqWC1YNl8VosM0wfWrTM2hmNoxTCaexqJiO5qkyBpNRluaHYZwBTKom5k4jxy7t+GKB5QP3M/7zUCM980CPHoKRA4zAfcCr/urTTMzd2NKSoxg5+lAfB4UmhCG5c9FNMKnPvUu9s/c/M0pLFcbR+dO4CW9x5Y2OCYz27j3FWihUK3VG5Vh0NUSufrU9ncBMwyn9056/3T61LQ0ywOD1q0jF0DRuUkRgyspwUYdGFUZVKSFW4Ip8UhRgR26j1FIq5s3F7BfR/a/JEN5v/wBKVRhS/wDeA7Z6/nVRVW5ikt5CAJDuRv7r9vz6VF5qW9ylyQWgkGyYeo7H6/4VIU8uRkJzt6N6jsazaszRO6KsBBz5oxIhwwPapdBEUviu0WQK0TzYwwyOlF1HHJcrMzfeH7xR1JFV7e4W21u1uFUIqSKSB7HmrvdGezN/Ur147yWFYbdfLcr/AKoDpWe2ptGcNBaknsUHNPvyWu5XY5JYnNUorlFheHyoyxdjIzqCWXAwM9gPalFaFzlZlo6s+cfZLYf9shQNUfp5FsP+2VZkEhaHaeQCQpPpUignoKdhKTLept5mii5kVA8s+xNq4wqjn9TWQkalRu/Grl9c+fFbWqf6u2Bzj+Jicmo1zGcjr601oiXqyLZEB/8AroAiPQj86laRj1Y03aD15piGmOM9/wBaBGnr+tOMSHqo/CjyUH8NADdif3qeFTpn+VN8lD/DSiFAfu0BcPLTtmgxL6kU4IoPA/WnEZBHrQMQWszWTXcdvK1urbDL2z6U0IpUMCcGn/aLlbRbXLGJCSoB45602NdqBfSkCE8tfejyl96fS8UDIzGuD1pBGv8AeNS568A/WkyP7i0AR+SD0yaPIPo35U/I/uD86P8APWmAzycdm/KjyT6H8qfk+v60c+tADPJ/3vypPK/3qlycdT+dAJ9T+dAEXlqO5oCD1NS7j60BvxoDQi8tPU0GJM//AFqm3e1G/wBqVw0IREM8bj+FHk/735VNvak3tTAj8k+9Hkn3p+5vWjcf7xoAZ5BJ/i/Kj7P7N+VPyfU/nS5PvQFhnkgdc/kKPJX1P5Cn4pcUgI/JX1NL5K+p/Sn0H6GgBnlL2J/Sl8tfU0pNFAXE8tfejy0FKBTuKAuRsETk/gAKkePykRpV2q/Q8Go5FJKsnLKenrTpS91NvddiqoULQK4rJHj/AOtTCI/T+VSGNB7/AI0Db6UDIj5f92jCdoz+VTZ9Fpcv2wKAINgP/LE03yQx4jNWfn7tS/MP46LgVvspP8H60fZCOqn86sE/9NDRgd8n8aBWKjRKqtwQQPWt+31SRPD1uTFBJIsrIXkjDHGMgZrJkQFeKSzm/wBHe0bqH3r78YNJq44vlZo/2xNj/UWf/foU+PWZgx/0e0P/AGyWs0gD0qKbAC5HylsN9KLD5mb8XiKYZ22lm2Ov7pT/AEqaz1ua61K2gaysgkkgVgLdelZFzdPPa28bpEGhbEbJGFO30JHUfWpdOlMGoW8yKGZHBAPSpcRqTJLYKfF98IFCR5cbQMADNbrEIMAc1iaAwk1DUbk9zgfiSf6VvImeW61y137x34Ze5cjCH7zHJ9KkVSetShKmtYVluURztTPzH2rLmsjosUnG0ZNVZZPStPVBCbl/IGIxwKyZeM4rWErq5jUREzH1NN3H1prEkUwjjvW6OdoeZD3pjNUZJpCD1zVmTFYk9+KjYUHJNIBirRmxu3vQR70pNIasgxio75P1NKFH9wUhkHYfnTTIaCCXaOxxTcYPJH50xQ8hwiM30GamW0uW/wCWW0erECkBGWX1pPMx0FWV09mP72aNPpk1KbKzT71yzH2AFF0OxR8zPYU1sGrxS0X7ilvc5NJ5oHCIAKVxWI45t8Sq/wB9OAfUf/WoLY5prAEnt3B9KfG7RyRyBclTnFA0T27CVDA33X6H3p8EknkbW5aL5Tn07frUG8NIzquzJBx796mZ1juUlI+SUYcfz/xpNFJlpBbyadFIvy3KMVlXd970OKx7zibj1q2WRJMlgcdx3qjcy+a+QuFFCQNm5eNmUH1UH9KzZI1dssMmtG4eKVIJIpFbMYDAHkHFU5DGhy7gD25NJDkMVeiqOewFRT3AQFIzljwWHQewp8kjSxssalIwCc92qmg+cDAqkiLjo5QmPlBIp5uj/dH50uxSegpfLHoKYDftJ/ur+dAuW7IDT/L45ZR+NL5OejCkBH57/wBxfzpfPf8Aur+dO8j/AGlpTCuPvigCPznz91aBPJ/dWn+QP74pPKH98UAN89/7q0G4f0UU/YncA/Q0pVBxgUAR+e3+zR9of0Wn7E7gUbIz2/Si4yP7Q/otKLh/Raf5adl/SlEY/uii4akf2hx2Wj7S/wDdWpfKH90UeXz2oCzIvtD5+6tKbh/7q1J5Y9RS+X70BZkXnSH+BaPOk/uL+dS+WPU0ojXuTQBD5smfuL+dJ5sn9xasCJKPKT0/WgCAzSY+4PzpBNL/AHBU5jX0P50eWnpSAg82T+4KBO442D86n8tPSjy4/QUwITcOf4F/Ojz2/ugfjUpiT0pPKT3oHYj89/QfnR57eg/OpPKT1NJ5S+poCwwzt/dH50faHx/qx+dP8pfWjyh/eFAhn2hh/B+tBnb+4Pzp/lD+8KTyv9r9KQWY3z2x9wfnR57f3B+dO8v3FGw56inoFmME7j+AfnS/aH/ufrTth9qPLb2/OgBv2hv7n60ouW/uD86Xy29B+dJsb+6aAAzN/cUfjQJ2H8I/Ol2n0NLtPoaAsN+0nP8Aqx+dH2r/AGP1pdp/umk2n+6aNB6h9pY/w/rQLhx2J+rU7afQ0uw9gaNBajftT/8APMfnSfaHz9yn7G9DRsb+6aQDBcuP+WeRTvtL/wDPIfnS+W3p+tBjPt+dMY37Q/8AzyH51HKxchwhVx3BqQxt32imlH6grihEtkkd0snEvyv/AHux+vpU0iEEqwHI6etUHBLjdj8KteY0K+WwLxfwkdVoaBMljUKOBVq3++D/AHQT+lUopUc8MPxrQtwi29wzMoKxnAJqWUi54XizYzyEfek/kP8A69dAi8VQ8NIF8NRcfM8rN+HStMLtXNedWlebR7FGNqaG4xUgIC5qB3waTzMnrUWKYydSwPPeqEo61oyt8hqjJyDWtNmM0VGHapLqdHt4IVUDy1wT6mmvxUDc10JXMW7IYevFJjNPC0EVsjBkJGDSdDUjVGetUjNjDSGgnmmljnpVXJsZwFmvUO59z/hThPCh/dwKD6kZ/nUITJ607ygOppEErX0543ED0zUTXEp/iP4Uh8ru4/Dmm7oh/CxosICxP3sn6mlGM8cfSmGRf4Y/++jR5z/w4H0FFhkoVj0Bpfu8Nx+NRKk8nQOf0qQWsnWTav1OaYhC6Y5YfhTTMBwOlSC3iH35x9AKcI7VeSHf9KAK/mntStLNJGQSxQc9OBVwSQKp8uAAjuaRJNzEE4UfeHsaVx2IraDz4nlll2xpxgfeY+gpk3MJCjao5AFWLWEx3s1oT1B2n19Ka0REAlLAhmZCvcY70X1HbQr21v5qs+eFOKfGgJ4AH4Zqxpf+ouQe21v1xUY+Vz6ZouFie3TJdTzlGHPvWYn3lrTt2HnjnqpFZqja4B7GhCZLsYjlz+FJ5Q7ljUvB6MKevTtRqGhB5QJ4Bp32cejVOFYdCo/CnYkHdf1ouOxVMK9gaBb57MasM0inlQfoaaZZMHEZ/Oi7CyI/sz9tw/GnLbyA8yY/WjfMf4B+dKpnP8K/iaNQ0F8j+87H8aUIq9AKAJv4mUfQZpDu7yY/KjUBTxyeKAcio2xnmQH8abu9JB+dFguTU7bUAcngSCn5l7MPyosHMSYpMYpgaX0BoLuOqD8DRYLjsimtIB/Cx+go3k9qN59KVh3GmVscRn8TTPNkP8IFS+ZjtSiQelMRFmc9AB+FGLk9/wCVSmQ9hxSb2/u0CG+XcHq4FHkS95P1pwZ8dzTg0n92i47IaID/AHz+dO8o9yT9aMy+go3Se1IBNpA6UUuXzycU4AkfeoHcZS4p233oxQO42jHtSkUYUHoT+NAthMH0o2se1BK9l/Wmlj2H6mgLj9ho8v3qPc/vR+97MfyosFyUR+9L5fvTVaQdcH8KdkEcrQFw2H1FGw+tMIOfkZl/HNMxOOkgP1FAXJdjeoo2N6io91wOyGkLzd4x+BosFyTaw9PzpcN6frUXmuOsZH40nn+xFFguiX5/T9aNz/3TUYmXuSPwpwmT+9RYWgpeT+4fypA7k/Mv6Uecn94UhkjPVqLAOyc5yBTuoqLfEP8A9VHmp/CKdguObf2pvOBnml35FJngZI/OhCZXPM+P9oCr86gSMvaqMI3XKd8tV+4/1remachorNbq54H5cUktm0ZhO7PmkACp0YY+lTXbBL/T1PRQpI/EVNyrI7iGBYII4EGFjUKAKSY4UjoBUuSQxHXmr97d2cWlx2luA77QZGx1Y9a8dt8zPc0UUjnZGOaYrEHrT3Uim44rdRujFy1HFyR1qBsdqkYjGKiaqjGxEpEL81ERzUzU3HrW6djFq5ERTG68VK2KiatE7mUlYjbrTGFSP1qJjiqMxjVGetOJzUZ61RBlhppPuh2/3RU6addyc+SQPVzipWu7hhj7Rt9kAFQtvfl3ZvqxNMzJP7P2f666hT2B3GgQ2SfelllPoq7RUOzFAznrQBN5luh/d2gPu7Zoa5cjCJHGP9laioxmgBW+0MMlm9cbsH8qj68k5+tL8wOQw+ppAVA5YUwFHApwGRTd8Y7k0hlGPlU/jQBMq/um5qWXa8yOp/1keG+tV4pCyuuMdxSqdrZFIZYdytxaXXfhW/CiePbcyc8Zzj6018tZyqOqNvFOuJBtikP8aipGJpR/fzp2aM01oHluUjQgGQ4yaTTeNTVfXcP0qS5UnOCQytwfSm9wWw/yY45gscnmKV3AkYIPQg1mv/rm+tX7USO7PIxLEYJNUp1KzuD601uJ7DzGD0FAQgcE/jUq8qKWi7FYj/eAcY/A4oDyjt+tSZpRigZGJJT/AAA/jTg0pP3B+JpSinqBSeWnYfrQAuJT3UfhmkKSHrK34DFNKAYxu/76qaSyuoo/Mlt7lI8feZGA/PFFxWZF5I7sx/Gjy41HO38TSeWp65P1NAVR0AH4UAKphHQg/QVICpHC/pTFJHepAaBiYGeEFN2gnoKfQSBSuFhAqj+AH8TS7wBzGfwOaTNGaADzY+6sPqKPMi9qM89asWen3V8szWluZRCu+QjHyj1/SjRBqQeZH6ik3x+1NAVh0GPpVmXTrqGxivZLZktpjiOQ4w3+cGjQNSHzIx6UnnRjoBTdo/yKUcd6YhfOTsD+VAmHZGoPTrTo0klbbFE8jYzhFLH9KWg9RPN9EP4mjzD/AHf1qRre5RSz2k6gdSYmH9Ki3A9qB2AytjhRTTI5/gFOozzQIYHf+7+tODH0pdwFT/Y7s6cb8W7/AGQPs83jGemKBpEG45+7S7/9kU0GpnhmSBJ3hkWGQ4SQqQrfQ0ARmQD+Ck8z/Y/Wk3VZubG8trO3u57dkt7j/VSEjDd6AIBIO6Y/GjzB/k0wZZgqqWZjgADJJqb7DeHrZXP/AH5b/Ci6BXGeatHmr60PDJCwWaF4mIyA6FSfzpBQLUXzQex/KkMn+yaM+9SWttcXtyILSFppSCQq9cCgBok/2f1pQ+ew/Oo2DI7I42spKsD2I7UfjQMk3ey/nSE/7K00etI2O4FAmKRn/lmn40hUEf6uOpbbT7i8inltrZ5I4BulZT90e9QBVxx/Oi4rCeWueQg/Gl2RjoFNGwCjAFMAKIf4RTGQfwqPxp5+lNLAHkgUahoRmL1OPoKPLUH1+tKZF9aPMB9aeotBlvn7Qu3rmrsSfaL7ymlEKDlnYZxVWyGboY9CamuVIuS0ZwT196T3GloOVCJGQnJBxkdwatXEfneJ7aEc4ZF/rUdlGXuIkzlncZNW9JAuPG6v1VZWb8FH/wBapeiZcd0dmyHYfeqzKAauTuMbR6VQdst615sFdnrTloNfGKgY4qR2wKgJzW5iMY5PFM+tONIelJCGnFNJ4pcUxjzVoljGNRORUhNQOa1RlLUY7VC2SakbrUbHmqIaGNSYJ7U8L3Ipxb2p6k6GWFA6D9KCyDqwqsST1JP1NGK0sYXJzLH2yT7CmGXnhfzNR4pQB3YCiwXHGRj0AFISx6saMr6k0qk9kB+tMWozGaXY3ZTUgMnbAoxKf4qBjRG3cYpSmF68075x1IpcnONwH4UgsNt/9cuehyv51NEiySSRtkPt+Q5wM/1qsDsYH0OatzKplyB3yKTGiS2G8FSPvoR+NJbv/okbldxjYjHtTrZgrKT2YfrUcIwbqL+6cj8DSKIo3WPVEdQQu8YB7Cr96m19w6MAayrg4lyPQVrSru09JOeDg0MERW3RvpVG7H78n1ANXICcOB1Kmqtz95Ce6f1ojuKWwJnYCKdlv8mmI37sU5Sc8rmqJQ4M/wDdH/fVKMnqMfjSgZHSjFIYuKQnAo2+5pCKAOs8HwQW1lf65cRiQ2anylboCBkn68gfnTNO8b6n/aSNqMkc1k7Yli8oYVT6d+PfrVjwmpvvCut6bDzOylkX1yox+ox+NcrptjPfalFZRKVlkfadyn5PUn6VjZNvmNrtJWNldKtNb8S3Nvos4itWUyxmSM/L0yuPqaq6t4dutNithJcRS3c8nli2i5Kn61v+FNPOl+N7iyeZJmhgIZ0BAyccc1h+GnV/HUDzncWmfBY9+cUJu7t0BpdS4ngqfKwTatZRXzDItiST+dZdnompXOtNpSw7blCfMz0Uf3ifTp+db+s3eiWniaZ7rTL03yyht6zYDHsQM9OlOs4D4h8Y3cz/AGywWKEGZN22U4GMcdM0c0rXYcquVj4OllhmOn6taXtxCPngjyD9Kt+C9JtZ7O6nuJbWV5IWXyXXLwEZG456Vb8HXGlz67LHpmlPb7ImzO0xYkZHBHQZqp4GG691wYyTE382qHKVmilFJnODRppdbGmafcw3rEA+dETsxjJ59q05/B8/lzCy1O1u7mEZkt04YVP8OPL/ALRvsgtJ9n+UKcE88496dpmraFpur+bY6TqRuxuUoZNx98ircpXsieVWuzC0PRLvWZ5BG6wwwjMsr9F9setdj4d0j+zbPWJI723vIZLZlWSFuQQDkEdqzrB/tngjXjZIwke4aQoPvBSQcflmo/AIItNbbB2G2xntnDVMm2mOKSORj6Cu+OnHU/AelRm6htY4jvklmOFA+Yfia4GMdK7HV0LfDbSSoJVZPm46fe61dToTDqZOs+HptMtIbxLyG7s5W2+dD0U+/wCtQ65o0ujzQK06zpPHvR0UgH25/CtayDR/DXUfOBCSTjysjryvI/EGtPRoB4j8PaYshDS6fdAPnug7fiMVPO1uPkTOV1zSZNH+zLNcJJLPHvKKpGz2P+e1avw6P/FS/wDbB/6Vn+Lb5dQ8Q3citlIz5SfReD+ua0Ph2AfEuP8Apg39Kcr8mol8eg+38Y63/bQgMyXEZn2eV5YyRuxxjmjxTpDT+NPsemRL5lyiyFBwAccn26ZrZ0PxBbXXiOawfT7S1l3OsU8afMWB759qwLPTL/UPHctre3kkdwjM0kycMVHTb6ZBFStHfYt6ok/4RBpJJbaDV7SW+jGWtwCPwzWLpWjXup6hJaxbYjDkytJwI8HHNdZok2kR+LRaWGmTrPGzqbmSYk8dSV96z7K5vrLxPrktrYNeWvmOtyg4wuTz/OmpS1E4xKNx4Zl+wzXWn6hbagsAzKsOcqK19Ks21D4ctbpLFFm5LGSVtqqA2SSagtNP0jWrS8k0GW7sLiKPc8TN8jD0PPT/ADimxY/4VW+R/wAvP/s4obbXzBJJlLU/DktjpY1CC+gvbbdtdogfl7Z9xmnX8eoDwRp8016r2TSkR2/l4KHn+Lv3/Or2j8/DfWB6SHH/AI7UepsP+Fa6UD93z+fzajmd7PuFkVbTwvJJp0d7qGoW+npMMxLN1b0z6VpeMoGs/CmhWrsrNESpZDkH5eoPpVb4hq5vLCZebY2+Iz/CD/8AqxS+Jty+DfDyuCCF5BHP3aLttMGkk0YOjEjXtO/6+U/9CFdV4s8R6zYeIJrayu2igVVIURg9RzziuV0c/wDE80//AK+E/wDQhXX+KfE+o6Xr0tparbeUqKR5kIY8j1py1mtBR0ic5G2seKtWihkkM86oQGZQoRM5JOBWgfCLSrOljq1rdXUAJeBQQeO2aTQUuPE3iae5urhrfEQaX7N8hYDAAGOlbPhS70iXxG8Wl6VLAyIwad5SeM919/rSlJrYcYp7nK6JoFzrYuvImSJrcD5ZAfmJzx7dK2fDumDSvF9rE17DcyNA5kERyIz6Zp3hk7bPxSVyMK2CO336y/h8ufFMI9Yn/kKG20xJJNF1/CM11e3ONTtEumd5Ftt25gCSRkjpWVpehahqWpy2MUYSWDPnFzxHg45/GrvhvP8AwsFees83/s1aFrpi6j4w1ySa4mhtrZmaVYWIaQen04NPma0bCyZSn8KSG0mm07U7W/aAZkjizkfSs7RNCudaaVklSC2hGZJpOg74rrfB93pdxc3w0vTHtQsBDSPKX3DsMdvWszTAX+GmqrAD5gnO8KOcZX+lLnkrobijQ0XSV03QtbeG+gvYZbchZIT0IU5BFcCD0rrvBqsvhvXmIOxoiFPYnYc1yC44ycVUPiZM9kLjJ60mMd6dvT+8KMg9K1MhuAe9JtX+6Kdmk4oATj0FI5+U9uKdUcn3DmmhMk08fvXPtirEigyE1BYZxJirMvErD0NJ7lrYl05Ge+gC9Q2fyq14QQvrNxOf4I2/NjiodMbZLLIOscbEfkau+DF/d3kn+4v8zWVR+6zSmvfR0kzcmqjsc8CppSSD61BjuTXDHQ9Ce4wgnk1G2AcCpWJxmoGNaEDGPNNzmgnjrTc1SQmwZuwqMnnrTm4qImtUjNsax5qM9KeelRn9aohkTdaQLzmnkc00mqSIY0mm5oJHemEjNWQZQU460hAHVqUjPWk6VZgJ8voaUAegp3Wg8daQw49RTvlHUimFl74oDoP4QfwoAdvXovJpck+1R78/dX8qULKRwpA+lADgvvTtoFR7X/iYD8aXZxkuTQMRxz9atnlEPqoqowAxtzU8BzCB/dJFJgtyWM9celPjXGrMvaVf5io0++KcSUu7aT2x+RpFlO5GMe2RWorl9Lb0G0/pVLUEAkfHQP8AzqzaH/iXyD1Qfzo6C6kUTbWB96jvBgRfRh+tCHg0XXNrGe4YimtxMbEf3YFPyM1DD/q+tSc02JDt2Oppd3uKiLA9ifwpPl7ITSsFyYsB3FISDUWG7R4/GgLL04FOwrlqxvrjTbtbqzlMci8dMgj0I7it6TxzqbRkRxWsMrfemSL5j+dcuY5PUfnRtYdVB/GpcIvcpSkjS03WbrTdQe9hKyTSKQxl+bOTkn68Vn+Y3necrFZA24MvBBznilAPdMfjTtvHSiyQXZvr41vzGn2i2s55kGFmki+YVn23iHUYNYfU1n3XMnDll4YemPTis/ZRtpcqHzM6VfHGoJOHgtrOFSSXRIsCQ+pPWszTdcutN1KW9tRGHlLF4yvyEE5xis4IKCOKXLEfMzQuNdun1kalAsdrOFCgQLhcAY6e9XpvGupOrGOK1hnYYa4jhxJ+dYBTNNKjPJp8qFzMu6Nrd5o9009o4JcYdHGVf6/41qSeMtQcSqkNrFFIjIYkiwoz1P1rncJ60uU9DQ4JhzNCxkAfSt6y8W3tlY29mkVu9vECpSRCwkHvWCNv0+tGV/vChxT3EpNbGnrniK81iNIpljht4jlYYlwoPr710OhxXXhvw9fajeOiC5iX7PEGySxHB/X9K4o7cfeH50rSu6qryllUYUFicD29KThdWRSnrdgMnqcnuavaPq1xot99qtVRpNpTEgyMGqIZAPvUbo+5qrdCb9R5u5Rffa0OybzfNBXjBznitO68S3txq8OphYoLuJdu+JeHHowPXjisndF6ikzH2YUcqBSaOmk8cagZVkjtrSNycyMsfMnsT1xWXb+ILy21ifUbfYkk7EyR4yjZ7YNZuVPQikAX1FJQiug+ds3bvxVeT2klvb29tZpLxIbdMFvx7VSXWLgaAdI2R/ZzJv3YO7Oc1RBX2pflx1FHKg5mXrbWLi20a50xEjMFycuSDuHTp+VNn1a5n0WDS3VPs8DblIHzZ56/nVP5P7wpflHcUWQXZsWHiu+s7BLNore5jj/1fnpuK+n1xVbVNdu9WtbeC6EZELFg6g7mJ9azyB60DAPajlV7hzO1h9vK1tcw3EeC8Th1z0yDmrGralNq2oNd3KosjKFIQYGBVU4NAXFO2txXdrFnTdRuNLvFurN9kijByMhh6EVs/wDCb6ks6yRW9nEM5dUjx5h9Setc8RmmkKOq5pOKe41JrYv2Wu3NmuoLFFDtvs+YCD8uc9PzqHSNTm0i+S7tVRpFUqBIMjmquF7RtTSPSM0+VC5mXbPVJrLVxqUSxmYOz4YfLls5/nU1r4hvrTWbjUoTGJbgkypj5GzzjFZmxv7g/Ol28cxr+dHKg5mdCnjXUUlYwwWccbAgxJFhcnvx1NUNG1270eeSS0ZNsgxJG4yrfhWeFUDnAo/djuKXKuw+Zm7c+MdQnhmh8u1jhljMflpHgKD1I96wVAwMkYoJipfMj7EU1FLYTk3uIXQcAj8BRvB6c0GVewBppkZum0fjVCFLf7JpN3rxSZ45cfhSAoPf9aBDg6nqaZIcocDj1pfMXstJKwKAe9MLljTR1/3hUjHLE+pqOyOy3aTHO6pB1qHuWtie0cR2l/I3aHaPqTitfweuNKnbu0uPyA/xrBlbbp9yv94p/Ouj8MAJoKnuzs36gf0rKr8DNKXxo1W+6ahY09j19KjJriR3MY/OBUD8EjvUjv8ANkdqhdskmtEmybjDTSaUmmsRWyRm2NYmmHpTjTGIqiLjWNRn1pzGo2OapEsaxqMnrTmPNMNMkaTUTEZ609jxUTHmqRLM8MT91CacI5D/AAY+tO85+2BTS7nqxq9TEf8AZ2I5kApDDGv3pc/Sozk9aUCiwDsQr0BalWVV+7Cv1NMxzS4GKAHG5kPoB7CmmRj1JNJuX1H4UBieFH4mgA5b1FKF9WNJtJ+8x+gpwUDGBQxgwwOKkg/iH40m35TToj+8PuCKm40SxKpjdizB1bgcYxT5FzEnqr00RgkHvUjA+W34GpbNEiO9XKyt7A0lsc2UgH0/WrDDzYJj3MZqlZti1l+ooTuhSVmKo6065H+gZ9JP6URwmWNnEm0gkKNuQSBzk9qGO/TZfYq39KsgqIoZOvOacN46NTIuSRnFPKsR979KokcHlHoaUSSf3Aaj+YdRn6UBwOuR+FGgaknmyf3FpQ0x6IPwFM3r2IoDDsf1pAS7Lg9sUeVOe+KjyT/Efzo5Pc/nQMk+zSHq9H2R/wDnpTOfU/nRk+po1Ak+zSf89eKX7K//AD1qIluxNN3SAfezRqBN9mb/AJ60G2bvLUPmHuDR5i45P50agS/ZvWUUG2XvMKhLr2NIJPQE/hQBP9mj7zD8qDbR4/1wqHex6Ifxpcyf3QKBEn2eMf8ALRTQIox/Ep/Go/n9V/KlGe5oGS+WvoPwpdi+gqHBxS7aLDJMJ6CjavoKZijHtRYQ/CD0pMJ7U3FG2gBcRnsKNsXtSbaNo75oCwbYv8ml2RHvz9aNg96NtAWE8uL+8fzpfLi/vn86ayH1FN8thyGxQA/y4/75o8pMf601Htf1Bow/oDQIlECnpLS/Z89Jah/ef3DQd/dDQBN9mP8Az0pPsx/56VEHcdFanCaX+6aQyT7M3/PSj7M+PvimedMenH1pd8p+9Jj6CjUNB32V/wC+KQ22Orr+dAQE/MzN9TS+Wn9wUXYWE+zr/wA9BThbr3Yn6Unlp/dH5UhjTsPyouFhxhj/ANr86PKj9P1qMp6M350mw/32/OgCbyU9P1pphTvmoyjdnak2N60wJPKjB6n86DFGf4iPxqLY/pR8w6inYRL5CY/1nFQOu0ex6U8Z702U8j6UAy3DxZoPUkn86eOagDGO3B7gVPcwG1MLCYyB8BgVxg4zx7VBSZFc8QP7la6vQ12aHAv+xn8yTXI3h+RR6muw08+XpsCdxGv8qyq/CbUdZFonC5qF34pGkyKjJz1rmSOtiMc1E1PY1ESe9aozEzSd6XtTTVXJsIajannpUbGmmIYxqM05jzUbGqJYjVGTTmNRk0yRpph+v6U40hq0SzOzS0UVZgGOaD6UUUDEx6k0oQGiikIULjpRRRQMXOBmnKGbuBRRSY0Sqh7mlSP51+tFFQWWxHxTgmUI9qKKk1J7WPdEw9VI/Ssi0H+jT+xX+tFFOHUmfQQSTR70ikKpJ94etWY4/wDQrlfSLP6iiitDIz4R849xUjHFFFMQmRS5B4oopAO8paTyVzRRTARoQDkAYpCoFFFMQZ+tOHIoooGLTvJYgEEc0UUmMeLUnqwpfsR/vj8qKKkdhPspB+8PyqMpgkelFFMQBc0uKKKY0JijAoooBiDmlxRRQIMUlFFIQppKKKYCZozRRSAXNG6iigBN1KMkdqKKADkdhSEkUUUAG80pY0UUDAEnpijB9qKKBBjFJRRTAM0bvSiimAbjS7vXmiikwE3UoNFFIBe9JniiigAzmm/e+lFFCAXHFRS/e/CiigC7cRfuTjH3RUdrE80o81ywjHAJzRRQDE1FdrRjtgmutTKxhfQAfpRRWNXZHRQ3YhzigZNFFYHU9hrVGRRRWi2MhOcU0g0UUhoYxNQvmiikhtETZqJs5oorVGYw5puDRRVEsRhQoyKKKtGbP//Z”;

/* ═══════════════════════════════════════════════
STARS
═══════════════════════════════════════════════ */
const Stars = ({ count = 60 }) => {
const stars = useRef(
Array.from({ length: count }, (_, i) => ({
id: i,
x:  Math.random() * 100,
y:  Math.random() * 100,
sz: .3 + Math.random() * 1.8,
d:  Math.random() * 6,
du: 2  + Math.random() * 4,
}))
).current;
return (
<div style={{ position:“absolute”, inset:0, overflow:“hidden”, pointerEvents:“none” }}>
{stars.map(s => (
<div key={s.id} style={{
position:“absolute”, left:`${s.x}%`, top:`${s.y}%`,
width:s.sz, height:s.sz, borderRadius:“50%”,
background:”#fff”, opacity:.4,
animationName:“twinkle”,
animationDuration:`${s.du}s`,
animationDelay:`${s.d}s`,
animationIterationCount:“infinite”,
}}/>
))}
</div>
);
};

/* ═══════════════════════════════════════════════
COUNTDOWN RING
═══════════════════════════════════════════════ */
const Ring = ({ total, left, color = “#c8a84a”, size = 96 }) => {
const r = 42, circ = 2 * Math.PI * r;
const offset = circ * (1 - left / total);
const urgent = left <= 5;
return (
<div style={{ position:“relative”, width:size, height:size }}>
<svg width={size} height={size} style={{ transform:“rotate(-90deg)” }}>
<circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="5"/>
<circle cx={size/2} cy={size/2} r={r} fill=“none”
stroke={urgent ? “#c83028” : color} strokeWidth=“5”
strokeDasharray={circ} strokeDashoffset={offset}
strokeLinecap=“round”
style={{ transition:“stroke-dashoffset 1s linear, stroke .3s” }}/>
</svg>
<div style={{
position:“absolute”, inset:0,
display:“flex”, alignItems:“center”, justifyContent:“center”,
fontFamily:“var(–fen)”, fontWeight:700, fontSize:size * .3,
color: urgent ? “#c83028” : color,
animationName: urgent ? “pulse” : “none”,
animationDuration:”.55s”, animationIterationCount:“infinite”,
}}>{left}</div>
</div>
);
};

/* ═══════════════════════════════════════════════
UI ATOMS
═══════════════════════════════════════════════ */
const Btn = ({ children, onClick, v=“gold”, sz=“md”, disabled, sx={} }) => {
const V = {
gold:    { bg:“linear-gradient(135deg,#c8a84a,#a08838)”, c:”#080604”, b:“1px solid #d4b850” },
crimson: { bg:“linear-gradient(135deg,#a82820,#c83028)”, c:”#f0e0d0”, b:“1px solid #d84030” },
ghost:   { bg:“transparent”,                             c:”#c8a84a”, b:“1px solid #382a1c” },
dark:    { bg:“linear-gradient(135deg,#181210,#201814)”, c:”#c8b898”, b:“1px solid #382a1c” },
}[v] || { bg:“transparent”, c:”#c8a84a”, b:“1px solid #382a1c” };
const ps = { sm:“6px 14px”, md:“10px 24px”, lg:“13px 34px”, xl:“16px 52px” }[sz];
const fs = { sm:”.73rem”,   md:”.85rem”,    lg:”.95rem”,    xl:“1rem”      }[sz];
return (
<button onClick={onClick} disabled={disabled}
style={{ background:V.bg, color:V.c, border:V.b, padding:ps, fontSize:fs,
borderRadius:3, fontFamily:“var(–fku)”, fontWeight:600,
letterSpacing:”.03em”, transition:“all .2s”, …sx }}
onMouseEnter={e=>{ if(!disabled){ e.currentTarget.style.filter=“brightness(1.14)”; e.currentTarget.style.transform=“translateY(-1px)”; }}}
onMouseLeave={e=>{ e.currentTarget.style.filter=“none”; e.currentTarget.style.transform=“none”; }}
>{children}</button>
);
};

const Badge = ({ label, color=”#c8a84a”, bg }) => (
<span style={{ background:bg||`${color}1a`, border:`1px solid ${color}44`,
color, borderRadius:2, padding:“2px 8px”, fontSize:”.67rem”,
fontFamily:“var(–fku)”, letterSpacing:”.04em”, whiteSpace:“nowrap” }}>
{label}
</span>
);

const Card = ({ children, sx={}, glow }) => (

  <div style={{ background:"linear-gradient(160deg,var(--layer),var(--surface))",
    border:`1px solid ${glow||"var(--border)"}`, borderRadius:6, overflow:"hidden",
    boxShadow: glow ? `0 0 22px ${glow}33,0 4px 20px rgba(0,0,0,.55)` : "0 3px 18px rgba(0,0,0,.5)",
    ...sx }}>
    {children}
  </div>
);

const CH = ({ children }) => (

  <div style={{ borderBottom:"1px solid var(--border)", padding:"11px 18px",
    background:"linear-gradient(90deg,rgba(200,168,74,.05),transparent)",
    display:"flex", alignItems:"center", gap:10 }}>
    {children}
  </div>
);

const Sep = ({ label }) => (

  <div style={{ display:"flex", alignItems:"center", gap:10, margin:"16px 0" }}>
    <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,var(--border),transparent)" }}/>
    <span style={{ fontFamily:"var(--fen)", fontSize:".63rem", letterSpacing:".18em", color:"var(--muted)" }}>{label}</span>
    <div style={{ flex:1, height:1, background:"linear-gradient(90deg,var(--border),transparent)" }}/>
  </div>
);

/* ═══════════════════════════════════════════════
ROLE CARD (flip)
═══════════════════════════════════════════════ */
const RoleCard = ({ role, revealed, size=“md” }) => {
const r = ROLES[role] || ROLES.Townsfolk;
const w = size === “lg” ? 176 : 148;
const h = size === “lg” ? 244 : 208;
return (
<div style={{ width:w, height:h, perspective:900 }}>
<div style={{ width:“100%”, height:“100%”,
transition:“transform .72s cubic-bezier(.4,0,.2,1)”,
transformStyle:“preserve-3d”,
transform: revealed ? “rotateY(0)” : “rotateY(180deg)”,
position:“relative” }}>
{/* FRONT */}
<div style={{ position:“absolute”, inset:0, backfaceVisibility:“hidden”,
background:`linear-gradient(155deg,var(--layer),${r.bg},var(--surface))`,
border:`1.5px solid ${r.color}55`, borderRadius:10,
display:“flex”, flexDirection:“column”, alignItems:“center”, justifyContent:“center”,
boxShadow:`0 0 30px ${r.color}22,0 8px 28px rgba(0,0,0,.7)` }}>
<div style={{ position:“absolute”, top:9,  left:11,  fontSize:”.6rem”,  color:r.color, opacity:.55 }}>{r.icon}</div>
<div style={{ position:“absolute”, bottom:9, right:11, fontSize:”.6rem”,  color:r.color, opacity:.55, transform:“rotate(180deg)” }}>{r.icon}</div>
<div style={{ fontSize: size===“lg”?“3rem”:“2.5rem”, marginBottom:10,
animationName:“float”, animationDuration:“3s”, animationIterationCount:“infinite” }}>{r.icon}</div>
<div style={{ fontFamily:“var(–fku)”, fontWeight:700,
fontSize: size===“lg”?“1.1rem”:”.95rem”,
color:r.color, textAlign:“center”, padding:“0 10px” }}>{r.ku}</div>
<div style={{ marginTop:7 }}>
<Badge label={r.team===“mafia”?“مافیا”:“شار”}
color={r.team===“mafia”?”#c83028”:”#28a060”}/>
</div>
</div>
{/* BACK */}
<div style={{ position:“absolute”, inset:0, backfaceVisibility:“hidden”,
transform:“rotateY(180deg)”,
background:“linear-gradient(155deg,var(–layer),#0a0706)”,
border:“1.5px solid var(–border)”, borderRadius:10,
display:“flex”, alignItems:“center”, justifyContent:“center”,
backgroundImage:“repeating-linear-gradient(45deg,rgba(56,42,28,.25) 0,rgba(56,42,28,.25) 1px,transparent 1px,transparent 50%)”,
backgroundSize:“10px 10px” }}>
<span style={{ fontSize:“2.2rem”, opacity:.1, color:“var(–gold)” }}>♠</span>
</div>
</div>
</div>
);
};

/* ═══════════════════════════════════════════════
PLAYER CHIP  —  roles NEVER shown during game
only shown after elimination
═══════════════════════════════════════════════ */
const PlayerChip = ({ player, revealRole=false, glow }) => {
const r  = ROLES[player.role] || ROLES.Townsfolk;
const dead = !player.alive;
return (
<div style={{
background: dead ? “rgba(8,6,4,.55)”
: “linear-gradient(135deg,var(–layer),var(–surface))”,
border:`1.5px solid ${dead?"var(--rim)":glow?glow:"var(--border)"}`,
borderRadius:6, padding:“11px 14px”,
transition:“all .25s”,
animationName: dead ? “deadFade” : “chipIn”,
animationDuration: dead ? “.8s” : “.35s”,
animationFillMode:“forwards”,
boxShadow: glow ? `0 0 16px ${glow}44` : “0 2px 8px rgba(0,0,0,.4)”,
}}>
<div style={{ display:“flex”, alignItems:“center”, gap:10 }}>
{/* avatar circle — shows role icon ONLY if dead or revealRole */}
<div style={{
width:34, height:34, borderRadius:“50%”, flexShrink:0,
background: dead||revealRole ? `linear-gradient(135deg,${r.color}18,${r.color}06)` : “rgba(200,168,74,.06)”,
border:`1.5px solid ${dead ? "var(--muted)" : revealRole ? r.color+"44" : "var(--rim)"}`,
display:“flex”, alignItems:“center”, justifyContent:“center”,
fontSize:“1rem”,
}}>
{dead ? “☠” : revealRole ? r.icon : “?”}
</div>
<div style={{ flex:1, minWidth:0 }}>
<div style={{ fontWeight:700, fontSize:”.9rem”,
color: dead ? “var(–muted)” : revealRole ? r.color : “var(–parch)”,
overflow:“hidden”, textOverflow:“ellipsis”, whiteSpace:“nowrap” }}>
{player.name}
</div>
{revealRole && !dead &&
<div style={{ fontSize:”.7rem”, color:“var(–smoke)”, marginTop:1 }}>{r.ku}</div>}
{dead &&
<div style={{ fontSize:”.7rem”, color:“var(–muted)”, marginTop:1 }}>
{r.ku} • کوژراو
</div>}
{!revealRole && !dead &&
<div style={{ fontSize:”.66rem”, color:“var(–rim)”, marginTop:1 }}>
ڕۆڵ نهێنییە
</div>}
{player.silenced && !dead &&
<div style={{ fontSize:”.66rem”, color:”#9040c0”, marginTop:1 }}>🤫 بێدەنگ</div>}
</div>
</div>
</div>
);
};

/* ═══════════════════════════════════════════════
SPLASH SCREEN
═══════════════════════════════════════════════ */
const SplashScreen = ({ onDone }) => {
const [phase, setPhase] = useState(0);
const [exiting, setExiting] = useState(false);

const starsData = useRef(
Array.from({ length:80 }, (_,i) => ({
id:i, x:Math.random()*100, y:Math.random()*100,
sz:.3+Math.random()*1.7, d:Math.random()*6, du:2+Math.random()*4,
}))
).current;

const drips = [
{ left:“6%”,  w:16, h:155, delay:0    },
{ left:“16%”, w:10, h:105, delay:.14  },
{ left:“27%”, w:20, h:195, delay:.07  },
{ left:“38%”, w:13, h:125, delay:.21  },
{ left:“50%”, w:18, h:170, delay:.04  },
{ left:“61%”, w:11, h:92,  delay:.17  },
{ left:“72%”, w:17, h:150, delay:.09  },
{ left:“83%”, w:22, h:180, delay:.26  },
{ left:“91%”, w:9,  h:115, delay:.13  },
];
const candles = [
{ left:“4%”,  h:80,  fd:0   },
{ left:“91%”, h:65,  fd:.4  },
{ left:“11%”, h:55,  fd:.7  },
{ left:“86%”, h:90,  fd:.2  },
];
const embers = useRef(
Array.from({ length:16 }, (_,i) => ({
id:i, left:18+Math.random()*64, delay:Math.random()*4,
dur:2.5+Math.random()*3, dx:(Math.random()-.5)*38,
sz:2+Math.random()*3, color:Math.random()>.5?”#e05018”:”#c8a84a”,
}))
).current;

useEffect(() => {
const ts = [
setTimeout(() => setPhase(1), 250),
setTimeout(() => setPhase(2), 850),
setTimeout(() => setPhase(3), 1700),
setTimeout(() => setPhase(4), 2650),
setTimeout(() => setPhase(5), 3450),
setTimeout(() => setPhase(6), 4350),
];
return () => ts.forEach(clearTimeout);
}, []);

const enter = () => { playClick(); setExiting(true); setTimeout(onDone, 850); };

return (
<div style={{
position:“fixed”, inset:0, zIndex:1000,
background:“var(–void)”,
display:“flex”, flexDirection:“column”, alignItems:“center”, justifyContent:“flex-end”,
overflow:“hidden”,
animation: exiting ? “splashExit .85s ease forwards” : “none”,
}}>
{/* ── Poster image background ── */}
<img src={POSTER_IMG} alt=”” style={{
position:“absolute”, inset:0, width:“100%”, height:“100%”,
objectFit:“cover”, objectPosition:“center top”,
opacity: phase >= 1 ? 1 : 0,
transition:“opacity 1.2s ease”,
pointerEvents:“none”,
}}/>
{/* dark overlay — light in middle to show character, dark at bottom for text */}
<div style={{ position:“absolute”, inset:0, background:“linear-gradient(180deg,rgba(3,2,2,.3) 0%,rgba(3,2,2,.1) 25%,rgba(3,2,2,.2) 50%,rgba(3,2,2,.75) 68%,rgba(3,2,2,.95) 82%,rgba(3,2,2,.99) 100%)”, pointerEvents:“none” }}/>

```
  {phase>=1 && <div style={{ position:"absolute", left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,rgba(200,168,74,.06),transparent)", animationName:"scanline", animationDuration:"9s", animationIterationCount:"infinite", animationTimingFunction:"linear", pointerEvents:"none" }}/>}
  {/* edge vignette */}
  <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 85% 85% at 50% 50%,transparent 42%,rgba(0,0,0,.7) 100%)", pointerEvents:"none" }}/>

  {/* text content — anchored to bottom where poster is darkest */}
  <div style={{
    position:"relative", zIndex:10,
    display:"flex", flexDirection:"column", alignItems:"center",
    textAlign:"center", padding:"0 20px 24px",
    width:"100%", maxWidth:460,
    /* push to bottom 35% of screen */
    marginTop:"auto",
  }}>
    {phase>=3 && <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:26, animation:"fadeDown .7s .1s ease both" }}><div style={{ height:1, width:80, background:"linear-gradient(90deg,transparent,var(--brass))", animation:"lineGrow .8s .2s ease both" }}/><span style={{ color:"var(--gold)", fontSize:"1rem", opacity:.8 }}>◆</span><div style={{ height:1, width:80, background:"linear-gradient(90deg,var(--brass),transparent)", animation:"lineGrow .8s .2s ease both", transform:"scaleX(-1)" }}/></div>}
    {/* ── Roles row — small, tight, glass pill background ── */}
    {phase>=5 && (
      <div style={{
        display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap",
        marginBottom:18,
        background:"rgba(3,2,2,.52)",
        backdropFilter:"blur(6px)",
        border:"1px solid rgba(200,168,74,.14)",
        borderRadius:40,
        padding:"10px 16px",
        animation:"fadeUp .6s ease both",
      }}>
        {Object.entries(ROLES).map(([name,r],i) => (
          <div key={name} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, animation:`roleAppear .45s ${i*.07}s cubic-bezier(.34,1.56,.64,1) both` }}>
            <div style={{
              width:38, height:38, borderRadius:"50%",
              background:`rgba(0,0,0,.55)`,
              border:`1.5px solid ${r.color}70`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"1.1rem",
              boxShadow:`0 0 10px ${r.color}30`,
            }}>{r.icon}</div>
            <span style={{ fontFamily:"var(--fku)", fontSize:".58rem", color:"#e8d8b8", fontWeight:600, textShadow:"0 1px 4px rgba(0,0,0,.9)" }}>{r.ku}</span>
          </div>
        ))}
      </div>
    )}

    {/* ── Title block — solid dark glass behind all text ── */}
    {phase>=3 && (
      <div style={{
        background:"linear-gradient(180deg,rgba(3,2,2,.0) 0%,rgba(3,2,2,.78) 18%,rgba(3,2,2,.88) 60%,rgba(3,2,2,.96) 100%)",
        borderRadius:16,
        padding:"4px 20px 0",
        marginBottom:0,
      }}>
        {/* Kurdish label */}
        <div style={{ fontFamily:"var(--fku)", fontSize:".68rem", letterSpacing:".4em", color:"rgba(200,168,74,.7)", marginBottom:6, animation:"fadeIn .6s .2s ease both", textShadow:"0 2px 8px rgba(0,0,0,.8)" }}>
          یاری شەوانەی
        </div>

        {/* MAFIA title */}
        <h1 style={{
          fontFamily:"var(--fdec)",
          fontSize:"clamp(3.2rem,11vw,7rem)",
          fontWeight:900, lineHeight:.95,
          color:"transparent",
          backgroundImage:"linear-gradient(165deg,#fffbe0 0%,#f5d060 20%,#c8a84a 40%,#f0d870 55%,#c8a84a 70%,#a08030 88%,#c8a84a 100%)",
          WebkitBackgroundClip:"text", backgroundClip:"text",
          filter:"drop-shadow(0 2px 12px rgba(0,0,0,.9)) drop-shadow(0 0 30px rgba(200,168,74,.5))",
          animation:"titleReveal 1.35s .1s cubic-bezier(.16,1,.3,1) both, goldPulse 4s 2.2s ease infinite",
          marginBottom:8,
        }}>MAFIA</h1>

        {/* Kurdish subtitle */}
        {phase>=4 && (
          <div style={{
            fontFamily:"var(--fku)", fontWeight:700,
            fontSize:"clamp(.85rem,2.5vw,1.2rem)",
            color:"rgba(200,185,150,.9)",
            letterSpacing:".18em", marginBottom:16,
            textShadow:"0 2px 10px rgba(0,0,0,.9)",
            animation:"subtitleIn .8s ease both",
          }}>گەمی مافیا</div>
        )}

        {/* Gold divider */}
        {phase>=4 && (
          <div style={{ position:"relative", height:1, marginBottom:18, overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,transparent,var(--brass) 20%,var(--gold) 50%,var(--brass) 80%,transparent)", animation:"lineGrow 1s ease both" }}/>
            <div style={{ position:"absolute", top:-3, left:"50%", transform:"translateX(-50%)", width:7, height:7, borderRadius:"50%", background:"var(--gold)", boxShadow:"0 0 10px var(--gold)", animation:"fadeIn .5s .8s ease both" }}/>
          </div>
        )}

        {/* Quote */}
        {phase>=6 && (
          <p style={{
            fontFamily:"var(--fku)", fontSize:"clamp(.78rem,1.2vw,.92rem)",
            color:"rgba(180,165,135,.85)",
            fontStyle:"italic", lineHeight:1.9,
            marginBottom:22,
            textShadow:"0 2px 8px rgba(0,0,0,.9)",
            animation:"fadeUp .7s ease both",
            padding:"0 4px",
          }}>
            «لەم شارەدا باوەڕت بە هیچکەسێک مەبێت»
          </p>
        )}
      </div>
    )}

    {/* ── Enter button ── */}
    {phase>=6 && (
      <button onClick={enter} style={{
        background:"linear-gradient(135deg,#c8a84a,#a08838)",
        color:"#080604", border:"none",
        padding:"clamp(13px,2vw,16px) clamp(36px,6vw,64px)",
        fontFamily:"var(--fku)", fontWeight:700,
        fontSize:"clamp(.9rem,1.5vw,1.05rem)",
        letterSpacing:".1em", borderRadius:4,
        cursor:"pointer",
        boxShadow:"0 0 0 1px rgba(200,168,74,.5), 0 8px 32px rgba(0,0,0,.8), 0 2px 0 rgba(255,240,160,.3) inset",
        transition:"all .25s",
        animation:"fadeUp .6s .15s ease both",
        marginTop:4,
        textShadow:"0 1px 3px rgba(0,0,0,.3)",
      }}
        onMouseEnter={e=>{ e.currentTarget.style.filter="brightness(1.15)"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 0 28px rgba(200,168,74,.6),0 12px 36px rgba(0,0,0,.8)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.filter="none"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 0 0 1px rgba(200,168,74,.5),0 8px 32px rgba(0,0,0,.8)"; }}>
        داخلبوون بۆ ئۆتاقەکە ←
      </button>
    )}

    {/* ── Footer ── */}
    {phase>=6 && (
      <div style={{ marginTop:20, animation:"fadeIn .8s .4s ease both" }}>
        <p style={{ fontFamily:"var(--fen)", fontSize:".52rem", color:"rgba(90,70,50,.8)", letterSpacing:".18em", textShadow:"0 1px 4px rgba(0,0,0,.9)" }}>
          Created by Rashid Farhad
        </p>
      </div>
    )}
  </div>
</div>
```

);
};

/* ═══════════════════════════════════════════════
SETUP
═══════════════════════════════════════════════ */
const SetupScreen = ({ onStart }) => {
const [cnt, setCnt]     = useState(6);
const [names, setNames] = useState(Array(6).fill(””));
const [preset, setPreset] = useState([…PRESETS[6]]);
const [err, setErr]     = useState(””);
const [tab, setTab]     = useState(“players”);

const updateCnt = n => { setCnt(n); setNames(Array(n).fill(””)); setPreset([…(PRESETS[n]||PRESETS[5])]); setErr(””); };
const rc = preset.reduce((a,r)=>({…a,[r]:(a[r]||0)+1}),{});

const go = () => {
const filled = names.filter(n=>n.trim());
if (filled.length < cnt)   { setErr(`تکایە هەموو ${cnt} ناوەکە پڕبکەرەوە.`); return; }
if (new Set(filled.map(n=>n.trim().toLowerCase())).size !== filled.length) { setErr(“ناوەکان دەبێت جیاواز بن.”); return; }
const roles = shuffle([…preset]).slice(0, cnt);
onStart(filled.map((name, i) => ({ id:i, name:name.trim(), role:roles[i], alive:true, silenced:false })));
};

return (
<div style={{ minHeight:“100vh”, direction:“rtl” }}>
<div style={{ background:“linear-gradient(180deg,rgba(30,24,16,.98),rgba(10,7,5,.96))”, borderBottom:“1px solid var(–border)”, padding:“26px 20px”, textAlign:“center” }}>
<h2 style={{ fontFamily:“var(–fdec)”, fontSize:“1.7rem”, color:“var(–gold)” }}>ڕێکخستنی یاری</h2>
<p style={{ color:“var(–muted)”, fontSize:”.8rem”, marginTop:4 }}>ناوی یاریزانان دابنێ</p>
</div>
<div style={{ maxWidth:700, margin:“0 auto”, padding:“22px 14px 80px” }}>
<Card sx={{ marginBottom:18 }}>
<CH><span style={{ color:“var(–gold)”, fontWeight:700 }}>⚙ ژمارەی یاریزانان</span></CH>
<div style={{ padding:“14px 18px” }}>
<p style={{ color:“var(–muted)”, fontSize:”.8rem”, marginBottom:11, lineHeight:1.7 }}>هیچ ڕیفریک پێویست نییە — هەموو کەس یاریزانە. تەلەفۆن لە ناوەندا دادەنرێت.</p>
<div style={{ display:“flex”, flexWrap:“wrap”, gap:8 }}>
{[5,6,7,8,9,10,11,12].map(n => (
<button key={n} onClick={()=>updateCnt(n)} style={{ background:cnt===n?“linear-gradient(135deg,var(–brass),var(–gold))”:“var(–layer)”, border:`1.5px solid ${cnt===n?"var(--gold)":"var(--border)"}`, color:cnt===n?“var(–ink)”:“var(–smoke)”, padding:“8px 16px”, borderRadius:3, fontSize:”.83rem”, fontWeight:cnt===n?700:400, transition:“all .2s”, fontFamily:“var(–fku)” }}>{n} کەس</button>
))}
</div>
</div>
</Card>

```
    <div style={{ display:"flex", borderBottom:"1px solid var(--border)", marginBottom:16 }}>
      {[["players","👥 یاریزانان"],["roles","🃏 ڕۆڵەکان"],["rules","📜 یاساکان"]].map(([id,lb]) => (
        <button key={id} onClick={()=>setTab(id)} style={{ background:"none", border:"none", color:tab===id?"var(--gold)":"var(--muted)", padding:"9px 16px", fontSize:".83rem", fontFamily:"var(--fku)", borderBottom:`2px solid ${tab===id?"var(--gold)":"transparent"}`, transition:"all .2s", fontWeight:tab===id?700:400 }}>{lb}</button>
      ))}
    </div>

    {tab==="players" && (
      <Card>
        <div style={{ padding:"14px 16px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
            {names.map((nm,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(200,168,74,.1)", border:"1px solid var(--border)", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fen)", fontSize:".7rem", color:"var(--muted)" }}>{i+1}</div>
                <input value={nm} onChange={e=>{const a=[...names];a[i]=e.target.value;setNames(a);}} placeholder={`یاریزانی ${i+1}`} maxLength={14}
                  style={{ flex:1, background:"var(--ink)", border:"1px solid var(--border)", borderRadius:3, padding:"8px 11px", color:"var(--parch)", fontSize:".88rem", outline:"none", transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor="var(--brass)"}
                  onBlur={e=>e.target.style.borderColor="var(--border)"}/>
              </div>
            ))}
          </div>
        </div>
      </Card>
    )}

    {tab==="roles" && (
      <div>
        <Card sx={{ marginBottom:14 }}>
          <CH><span style={{ color:"var(--gold)", fontWeight:700 }}>ڕۆڵەکانی {cnt} یاریزان</span></CH>
          <div style={{ padding:"12px 16px", display:"flex", flexWrap:"wrap", gap:8 }}>
            {Object.entries(rc).map(([rl,c]) => { const r=ROLES[rl]; return (
              <div key={rl} style={{ background:r.bg, border:`1px solid ${r.color}33`, borderRadius:4, padding:"6px 12px", display:"flex", alignItems:"center", gap:6 }}>
                <span>{r.icon}</span><span style={{ color:r.color, fontWeight:700, fontSize:".8rem" }}>{r.ku}</span>
                {c>1 && <Badge label={`×${c}`} color={r.color}/>}
              </div>
            ); })}
          </div>
        </Card>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
          {Object.entries(ROLES).map(([n,r]) => (
            <Card key={n} glow={rc[n]?r.color:undefined} sx={{ opacity:rc[n]?1:.38 }}>
              <div style={{ padding:"11px 13px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                  <span style={{ fontSize:"1.1rem" }}>{r.icon}</span>
                  <span style={{ fontWeight:700, fontSize:".85rem", color:r.color }}>{r.ku}</span>
                  <span style={{ marginRight:"auto" }}><Badge label={r.team==="mafia"?"مافیا":"شار"} color={r.team==="mafia"?"#c83028":"#28a060"}/></span>
                </div>
                <p style={{ fontSize:".74rem", color:"var(--smoke)", lineHeight:1.6 }}>{r.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )}

    {tab==="rules" && (
      <Card>
        <div style={{ padding:"18px" }}>
          {[
            ["📱","چۆن یاری دەکرێت","تەلەفۆن لە ناوەندا دادەنرێت. کەسی خۆی تەلەفۆنی دەگرێت کە نۆبەتی ڕۆڵەکەیەتی."],
            ["🔒","نهێنی تەواو","ڕۆڵی هیچ کەسێک نەیخەنێت. تەلەفۆن بگرە بەخۆشی، کار بکە، بیدەرەوە."],
            ["🌙","شەو","دەنگ دەڵێت «هەموو چاوەکانتان داخەن». ١٥ چرکە. پاشان هەر ڕۆڵێک."],
            ["🔫","مافیا - ٢ قۆناغ","یەکەم ١٥ چ: چاوی بکەنەوە یەکتری بناسن. دووەم ١٥ چ: دەنگدان بۆ کوژتن."],
            ["☀","ڕۆژ","قسە بکە، نیشانەی مافیا بدە، دەنگ بدە."],
            ["🗳","دەنگدانی نهێنی","هەر کەسێک بەتایبەتی تەلەفۆنی دەگرێت و دەنگی خۆی دەدات."],
            ["🏆","بردن","مافیا: بگە بە ژمارەی شار. شار: هەموو مافیا بکوژێ."],
          ].map(([ic,t,d],i) => (
            <div key={i} style={{ borderBottom:i<6?"1px solid var(--rim)":"none", padding:"11px 0", display:"flex", gap:11, alignItems:"flex-start" }}>
              <span style={{ fontSize:"1rem", flexShrink:0, marginTop:2 }}>{ic}</span>
              <div>
                <div style={{ fontWeight:700, color:"var(--gold)", fontSize:".83rem", marginBottom:2 }}>{t}</div>
                <div style={{ color:"var(--smoke)", fontSize:".78rem", lineHeight:1.6 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )}

    {err && <div style={{ marginTop:14, padding:"9px 14px", background:"rgba(168,40,32,.1)", border:"1px solid var(--blood)33", borderRadius:4, color:"var(--crimson)", fontSize:".83rem" }}>⚠ {err}</div>}
    <div style={{ display:"flex", justifyContent:"center", marginTop:26 }}>
      <Btn v="gold" sz="xl" onClick={go} sx={{ letterSpacing:".06em", fontWeight:700 }}>🃏 دابەشکردنی ڕۆڵەکان</Btn>
    </div>
  </div>
</div>
```

);
};

/* ═══════════════════════════════════════════════
PRIVATE ROLE REVEAL
═══════════════════════════════════════════════ */
const RoleRevealScreen = ({ players, onDone }) => {
const [idx,   setIdx]   = useState(0);
const [stage, setStage] = useState(“hand-over”); // hand-over | tap | revealed
const [fading, setFading] = useState(false);

const advance = () => {
setFading(true);
setTimeout(() => {
setFading(false);
if (idx + 1 >= players.length) onDone();
else { setIdx(i => i+1); setStage(“hand-over”); }
}, 380);
};

const p = players[idx];
const r = ROLES[p?.role] || ROLES.Townsfolk;

return (
<div style={{ minHeight:“100vh”, display:“flex”, flexDirection:“column”, alignItems:“center”, justifyContent:“center”, padding:“24px 16px”, textAlign:“center”, direction:“rtl”, position:“relative”, overflow:“hidden”, background:“var(–void)” }}>
<div style={{ position:“absolute”, inset:0, background:“radial-gradient(ellipse 80% 65% at 50% 40%,rgba(40,20,8,.9),var(–void))”, pointerEvents:“none” }}/>
<Stars count={40}/>

```
  {/* progress dots */}
  <div style={{ position:"absolute", top:18, left:"50%", transform:"translateX(-50%)", display:"flex", gap:5, zIndex:1 }}>
    {players.map((_,i) => <div key={i} style={{ width:i===idx?18:5, height:5, borderRadius:3, background:i<idx?"var(--brass)":i===idx?"var(--gold)":"var(--rim)", transition:"all .3s" }}/>)}
  </div>

  <div style={{ position:"relative", zIndex:1, animation: fading?"fadeOut .38s ease both":"fadeUp .5s ease both", maxWidth:380, width:"100%" }}>

    {stage==="hand-over" && (
      <>
        <div style={{ fontSize:"1.8rem", marginBottom:16, animationName:"float", animationDuration:"2.5s", animationIterationCount:"infinite" }}>📱</div>
        <div style={{ fontFamily:"var(--fku)", fontSize:".72rem", color:"var(--muted)", letterSpacing:".18em", marginBottom:6 }}>{idx+1} / {players.length}</div>
        <p style={{ color:"var(--smoke)", fontSize:"1rem", marginBottom:8 }}>دستگا بگەیەنە</p>
        <h1 style={{ fontFamily:"var(--fku)", fontWeight:900, fontSize:"clamp(2rem,7vw,2.8rem)", color:"var(--cream)", marginBottom:24 }}>{p.name}</h1>
        <div style={{ background:"rgba(200,168,74,.06)", border:"1px solid var(--border)", borderRadius:8, padding:"16px 18px", marginBottom:22 }}>
          <p style={{ color:"var(--smoke)", fontSize:".86rem", lineHeight:1.8 }}>⚠️ دڵنیابە کەسی تر نەیبینێت — پاشان ڕۆڵەکەت ببینە</p>
        </div>
        <Btn v="gold" sz="lg" onClick={()=>setStage("tap")} sx={{ width:"100%" }}>ئامادەم ←</Btn>
      </>
    )}

    {stage==="tap" && (
      <>
        <div style={{ fontFamily:"var(--fku)", fontSize:".72rem", color:"var(--muted)", letterSpacing:".18em", marginBottom:8 }}>{idx+1} / {players.length} — {p.name}</div>
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", marginBottom:16, cursor:"pointer" }} onClick={()=>{ playChime(); setStage("revealed"); }}>
          <RoleCard role={p.role} revealed={false} size="lg"/>
        </div>
        <div style={{ fontFamily:"var(--fku)", fontSize:".78rem", color:"var(--muted)", animationName:"pulse", animationDuration:"2s", animationIterationCount:"infinite" }}>👆 بانگی بکە بۆ ئاشکراکردن</div>
      </>
    )}

    {stage==="revealed" && (
      <>
        <div style={{ fontFamily:"var(--fku)", fontSize:".72rem", color:"var(--muted)", letterSpacing:".18em", marginBottom:8 }}>{idx+1} / {players.length} — {p.name}</div>
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", marginBottom:16 }}>
          <RoleCard role={p.role} revealed={true} size="lg"/>
        </div>
        <h3 style={{ fontFamily:"var(--fku)", fontSize:"1.2rem", fontWeight:700, color:r.color, marginBottom:6, animation:"scaleIn .4s ease both" }}>{r.icon} تۆ {r.ku} ی</h3>
        <p style={{ color:"var(--smoke)", fontSize:".83rem", lineHeight:1.75, marginBottom:14 }}>{r.desc}</p>
        {r.team==="mafia" && (
          <div style={{ background:"rgba(168,40,32,.14)", border:"1px solid var(--blood)33", borderRadius:4, padding:"9px 14px", marginBottom:14 }}>
            <span style={{ color:"var(--crimson)", fontSize:".8rem", fontWeight:700 }}>🔫 تۆ لەگەڵ مافیادایت — کەسی تر نەزانێت</span>
          </div>
        )}
        <div style={{ background:"rgba(200,168,74,.05)", border:"1px solid var(--border)", borderRadius:6, padding:"9px 14px", marginBottom:16 }}>
          <p style={{ color:"var(--muted)", fontSize:".75rem", lineHeight:1.7 }}>✅ دستگا پاس بدە بەبێ ئەوەی کەسی تر ببینێت</p>
        </div>
        <Btn v="gold" sz="lg" onClick={advance} sx={{ width:"100%" }}>
          {idx+1 < players.length ? "تەواو — پاس بدەرە ←" : "هەموو تەواوبوون ✓"}
        </Btn>
      </>
    )}
  </div>
</div>
```

);
};

/* ═══════════════════════════════════════════════
NIGHT PHASE — automated, voice, countdowns
KEY FIX: Mafia gets TWO sub-phases:
1. “look at each other” — 15 seconds, no action needed
2. “do you want to shoot?” — 15 seconds, yes/no + pick
ALL targets shown as NAME ONLY — zero icons/roles
═══════════════════════════════════════════════ */
const buildScript = (players) => {
const alive = players.filter(p => p.alive);
const steps = [];

// ── Step 0: everyone close eyes ──
steps.push({
id: “close”,
type: “auto”,
title: “هەموو چاوەکانتان داخەن”,
sub: “سەریان بخەنە خوار — شەو دەستپێکرد”,
voice: “Everyone, close your eyes.”,
icon: “😴”,
color: “var(–smoke)”,
duration: 5,
});

// ── Build per-role steps ──
const ordered = Object.entries(ROLES)
.filter(([,r]) => r.nightActor)
.sort((a,b) => a[1].order - b[1].order);

for (const [roleName, roleDef] of ordered) {
const rolePlayers = alive.filter(p => p.role === roleName);
if (!rolePlayers.length) continue;

```
// Mafia gets a special "meet each other" step first
if (roleName === "Mafia") {
  steps.push({
    id: "mafia-meet",
    type: "auto",
    title: "🔫 مافیا — چاوەکانتان بکەنەوە",
    sub: "مافیا یەکتری بناسن — ١٥ چرکەت هەیە",
    voice: "Mafia, open your eyes. Look at each other.",
    icon: "🔫",
    color: "#c83028",
    bg: "rgba(168,40,32,.18)",
    duration: 15,
  });
}

// Wake + action step
const validTargets = alive.filter(p =>
  roleName === "Doctor" || roleName === "Bodyguard"
    ? true
    : !rolePlayers.map(x => x.id).includes(p.id)
);

const actionVoice = roleName === "Detective"
  ? `${roleDef.en}, do you want to investigate someone?`
  : roleName === "Doctor" || roleName === "Bodyguard"
  ? `${roleDef.en}, do you want to protect someone?`
  : `${roleDef.en}, do you want to eliminate someone?`;

steps.push({
  id: `${roleName}-act`,
  type: "action",
  role: roleName,
  roleDef,
  title: `${roleDef.icon} ${roleDef.ku} — کارەکەت بکە`,
  sub: roleName === "Mafia"
    ? "دەتەویت کەسێک بکوژیت؟"
    : roleName === "Detective"
    ? "دەتەویت کەسێک بپشکنیت؟"
    : roleName === "Doctor" || roleName === "Bodyguard"
    ? "دەتەویت کەسێک بپارێزیت؟"
    : "دەتەویت کار بکەیت؟",
  voice: actionVoice,
  icon: roleDef.icon,
  color: roleDef.color,
  bg: roleDef.bg,
  duration: 20,
  targets: validTargets,   // ← names only, NO roles shown
});

// Sleep
steps.push({
  id: `${roleName}-sleep`,
  type: "auto",
  title: `${roleDef.ku} — چاوەکانتان داخەن`,
  sub: "باشە. سپاس.",
  voice: `${roleDef.en}, close your eyes.`,
  icon: "😴",
  color: roleDef.color,
  duration: 3,
});
```

}

// ── Dawn ──
steps.push({
id: “dawn”,
type: “manual”,
title: “هەموو چاوەکانتان بکەنەوە”,
sub: “ڕۆژ دەبێتەوە — کاتی قسە و دەنگدانە”,
voice: “Everyone, open your eyes. The night is over. Day begins.”,
icon: “☀️”,
color: “var(–gold)”,
duration: 0,
});

return steps;
};

const NightPhase = ({ players, round, onNightComplete }) => {
const script = useRef(buildScript(players)).current;
const [si, setSi]         = useState(0);         // step index
const [actions, setActions] = useState({});
const [ui, setUi]         = useState(“main”);    // main | picking
const [picked, setPicked] = useState(null);
const [cd, setCd]         = useState(null);       // countdown seconds
const cdTotal             = useRef(null);
const timers              = useRef([]);

const cur = script[si];

const clearAll = () => {
timers.current.forEach(t => { clearTimeout(t); clearInterval(t); });
timers.current = [];
stopSpeak();
};

const goNext = useCallback((acts) => {
clearAll();
setUi(“main”);
setPicked(null);
setCd(null);
cdTotal.current = null;
const next = si + 1;
if (next >= script.length) {
onNightComplete(acts || actions);
} else {
setSi(next);
}
}, [si, actions, script.length]);

useEffect(() => {
const step = script[si];
if (!step) return;
clearAll();

```
// speak after short delay
const voiceT = setTimeout(() => { if (step.voice) speak(step.voice); }, 350);
timers.current.push(voiceT);

if (step.type === "auto") {
  // run countdown, then auto-advance
  const total = step.duration;
  cdTotal.current = total;
  setCd(total);

  // play start sound
  if (step.id === "close") { setTimeout(playNightStart, 100); }

  const interval = setInterval(() => {
    setCd(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        goNext(actions);
        return 0;
      }
      // tick sounds
      const next = prev - 1;
      if (next <= 5 && step.id === "close") {
        next <= 3 ? playCountUrgent() : playCountTick();
      } else if (step.id !== "close" && step.id.endsWith("-sleep")) {
        // no tick on sleep steps
      } else if (next <= 5) {
        next <= 3 ? playCountUrgent() : playCountTick();
      }
      return next;
    });
  }, 1000);
  timers.current.push(interval);
} else if (step.type === "action") {
  // show yes/no + countdown
  const total = step.duration;
  cdTotal.current = total;
  setCd(total);
  setUi("main");
  const interval = setInterval(() => {
    setCd(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        // time's up — treat as "no action"
        const newA = { ...actions, [step.role]: null };
        setActions(newA);
        goNext(newA);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  timers.current.push(interval);
}
// manual: nothing auto

return clearAll;
```

}, [si]);

const handleYes = () => {
clearAll();
setUi(“picking”);
};

const handleNo = () => {
clearAll();
const newA = { …actions, [cur.role]: null };
setActions(newA);
goNext(newA);
};

const handlePick = (targetId) => {
clearAll();
setPicked(targetId);
const newA = { …actions, [cur.role]: targetId };
setActions(newA);
// confirm flash then advance
setUi(“confirmed”);
const t = setTimeout(() => goNext(newA), 1400);
timers.current.push(t);
};

const handleManual = () => goNext(actions);

const pct = Math.round((si / script.length) * 100);
const isLast = si === script.length - 1;

return (
<div className=“night-bg” style={{ padding:“0 20px” }}>
<Stars count={70}/>

```
  {/* progress bar */}
  <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"var(--rim)" }}>
    <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,var(--brass),var(--gold))", transition:"width .55s ease" }}/>
  </div>
  <div style={{ position:"absolute", top:14, left:18, fontFamily:"var(--fen)", fontSize:".63rem", color:"var(--muted)", letterSpacing:".1em" }}>{si+1}/{script.length}</div>
  <div style={{ position:"absolute", top:16, right:22, fontSize:"1.3rem", opacity:.28, animationName:"float", animationDuration:"4s", animationIterationCount:"infinite" }}>🌙</div>

  <div style={{ maxWidth:420, width:"100%", textAlign:"center", position:"relative", zIndex:1, animation:"fadeIn .4s ease" }}>

    {/* icon */}
    {ui !== "picking" && (
      <div style={{ fontSize:"clamp(2.8rem,8vw,3.8rem)", marginBottom:14,
        filter: cur.color && !cur.color.startsWith("var(--smoke") ? `drop-shadow(0 0 16px ${cur.color}55)` : "none",
        animationName:"float", animationDuration:"3s", animationIterationCount:"infinite" }}>
        {cur.icon}
      </div>
    )}

    {/* role badge */}
    {cur.role && ui !== "picking" && (
      <div style={{ marginBottom:10 }}><Badge label={cur.roleDef?.ku||""} color={cur.color||"var(--gold)"} bg={cur.bg}/></div>
    )}

    {/* title / sub */}
    {ui !== "picking" && (
      <>
        <h2 style={{ fontFamily:"var(--fku)", fontWeight:700, fontSize:"clamp(1.1rem,4.5vw,1.6rem)", color:cur.color||"var(--cream)", marginBottom:7, lineHeight:1.4 }}>{cur.title}</h2>
        <p style={{ color:"var(--smoke)", fontSize:".85rem", lineHeight:1.65, marginBottom:20, maxWidth:320, margin:"0 auto 18px" }}>{cur.sub}</p>
      </>
    )}

    {/* countdown ring */}
    {cd !== null && cdTotal.current !== null && ui !== "confirmed" && ui !== "picking" && (
      <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
        <Ring total={cdTotal.current} left={cd} color={cur.color||"var(--gold)"} size={90}/>
      </div>
    )}

    {/* ── ACTION step UI ── */}
    {cur.type === "action" && (

      <>
        {/* Yes / No buttons */}
        {ui === "main" && (
          <div style={{ display:"flex", gap:14, justifyContent:"center", animation:"fadeUp .4s ease both" }}>
            <Btn v="crimson" sz="lg" onClick={handleYes}>✓  بەڵێ</Btn>
            <Btn v="dark"    sz="lg" onClick={handleNo}>✕  نەخێر</Btn>
          </div>
        )}

        {/* ═══ TARGET PICKER ═══
            CRITICAL: shows ONLY names, absolutely zero role info */}
        {ui === "picking" && (
          <div style={{ animation:"fadeUp .35s ease both", width:"100%" }}>
            {/* small header */}
            <div style={{ marginBottom:16, textAlign:"center" }}>
              {cur.role && <div style={{ marginBottom:6 }}><Badge label={cur.roleDef?.ku||""} color={cur.color} bg={cur.bg}/></div>}
              <p style={{ color:"var(--gold)", fontSize:".9rem", fontWeight:600, marginBottom:2 }}>
                {cur.role==="Detective" ? "کێ دەتەویت بپشکنیت؟"
                  : cur.role==="Doctor"||cur.role==="Bodyguard" ? "کێ دەتەویت بپارێزیت؟"
                  : "کێ دەتەویت هەدەف بکەیت؟"}
              </p>
              <p style={{ color:"var(--muted)", fontSize:".75rem" }}>تەنها ناو نیشان دراوە — ڕۆڵ نهێنییە</p>
            </div>

            {/* name-only grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10, maxHeight:260, overflowY:"auto", padding:"2px 0", marginBottom:14 }}>
              {cur.targets.map(p => (
                <button key={p.id} onClick={() => handlePick(p.id)}
                  style={{
                    background: picked===p.id ? `${cur.color}22` : "linear-gradient(135deg,var(--layer),var(--surface))",
                    border: `2px solid ${picked===p.id ? cur.color : "var(--border)"}`,
                    borderRadius:8, padding:"16px 10px",
                    cursor:"pointer", transition:"all .2s",
                    boxShadow: picked===p.id ? `0 0 18px ${cur.color}44` : "0 2px 8px rgba(0,0,0,.4)",
                    textAlign:"center",
                    /* ← no icon, no role color, just the name */
                    color:"var(--cream)",
                    fontFamily:"var(--fku)", fontWeight:700, fontSize:"1rem",
                    lineHeight:1.3,
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=cur.color; e.currentTarget.style.boxShadow=`0 0 16px ${cur.color}33`; e.currentTarget.style.transform="translateY(-1px)"; }}
                  onMouseLeave={e=>{ if(picked!==p.id){ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.4)"; e.currentTarget.style.transform="none"; }}}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div style={{ textAlign:"center" }}>
              <Btn v="ghost" sz="sm" onClick={()=>{ setUi("main"); setPicked(null); }}>← گەڕانەوە</Btn>
            </div>
          </div>
        )}

        {/* Confirmed flash */}
        {ui === "confirmed" && (
          <div style={{ animation:"scaleIn .4s ease both", textAlign:"center" }}>
            <div style={{ fontSize:"2.5rem", color:"var(--gold)", marginBottom:8 }}>✓</div>
            <p style={{ color:"var(--smoke)", fontSize:".9rem" }}>
              {picked !== null
                ? `${players.find(p=>p.id===picked)?.name} — تۆمارکرا`
                : "کارێک نەکرا"}
            </p>
          </div>
        )}
      </>
    )}

    {/* auto: just show spinner dots */}
    {cur.type === "auto" && (
      <div style={{ color:"var(--muted)", fontSize:".78rem", animationName:"pulse", animationDuration:"1.5s", animationIterationCount:"infinite" }}>
        بەخۆی دەچێت…
      </div>
    )}

    {/* manual: button */}
    {cur.type === "manual" && !isLast && (
      <Btn v="ghost" sz="lg" onClick={handleManual}>بەردەوامبە ←</Btn>
    )}
    {cur.type === "manual" && isLast && (
      <Btn v="gold" sz="lg" onClick={handleManual}>☀️  ڕۆژ دەستپێبکە</Btn>
    )}

  </div>
</div>
```

);
};

/* ═══════════════════════════════════════════════
GAME LOG
═══════════════════════════════════════════════ */
const GameLog = ({ entries }) => {
const r = useRef();
useEffect(() => { if (r.current) r.current.scrollTop = r.current.scrollHeight; }, [entries]);
return (
<div ref={r} style={{ background:“rgba(3,2,2,.65)”, border:“1px solid var(–border)”, borderRadius:4, padding:“9px 13px”, maxHeight:140, overflowY:“auto” }}>
{entries.length === 0 && <p style={{ color:“var(–muted)”, fontSize:”.78rem”, fontStyle:“italic”, textAlign:“center” }}>تانوژ خالی یە…</p>}
{entries.map((e,i) => (
<div key={i} style={{ borderBottom:i<entries.length-1?“1px solid var(–rim)”:“none”, padding:“3px 0”, display:“flex”, gap:8, alignItems:“baseline” }}>
<span style={{ color:“var(–muted)”, fontSize:”.63rem”, fontFamily:“var(–fen)”, flexShrink:0 }}>{e.t}</span>
<span style={{ color:e.c||“var(–smoke)”, fontSize:”.8rem”, lineHeight:1.5 }}>{e.msg}</span>
</div>
))}
</div>
);
};

/* ═══════════════════════════════════════════════
PRIVATE VOTE
═══════════════════════════════════════════════ */
const PrivateVote = ({ alivePlayers, onComplete }) => {
const voters = alivePlayers.filter(p => !p.silenced);
const [vi, setVi]       = useState(0);
const [votes, setVotes] = useState({});
const [stage, setStage] = useState(“hand-over”);
const [fading, setFading] = useState(false);

const voter = voters[vi];

const castVote = (targetId) => {
const newV = { …votes, [voter.id]: targetId };
setVotes(newV);
setFading(true);
setTimeout(() => {
setFading(false);
if (vi + 1 >= voters.length) onComplete(newV);
else { setVi(i => i+1); setStage(“hand-over”); }
}, 380);
};

return (
<div style={{ minHeight:“100vh”, display:“flex”, flexDirection:“column”, alignItems:“center”, justifyContent:“center”, padding:“24px 16px”, direction:“rtl”, background:“var(–void)”, position:“relative”, overflow:“hidden” }}>
<Stars count={35}/>
<div style={{ position:“relative”, zIndex:1, maxWidth:440, width:“100%”,
animation: fading?“fadeOut .38s ease both”:“fadeUp .4s ease both” }}>

```
    {stage === "hand-over" && (
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"1.8rem", marginBottom:14 }}>🗳</div>
        <div style={{ fontFamily:"var(--fku)", fontSize:".72rem", color:"var(--muted)", letterSpacing:".18em", marginBottom:6 }}>{vi+1} / {voters.length}</div>
        <p style={{ color:"var(--smoke)", fontSize:"1rem", marginBottom:8 }}>دستگا بگەیەنە</p>
        <h1 style={{ fontFamily:"var(--fku)", fontWeight:900, fontSize:"clamp(1.8rem,6vw,2.6rem)", color:"var(--cream)", marginBottom:22 }}>{voter?.name}</h1>
        <div style={{ background:"rgba(200,168,74,.06)", border:"1px solid var(--border)", borderRadius:8, padding:"14px 18px", marginBottom:20 }}>
          <p style={{ color:"var(--smoke)", fontSize:".85rem", lineHeight:1.8 }}>⚠️ دڵنیابە کەسی تر نەیبینێت</p>
        </div>
        <Btn v="gold" sz="lg" onClick={()=>setStage("picking")} sx={{ width:"100%" }}>ئامادەم — دەنگ بدەم ←</Btn>
      </div>
    )}

    {stage === "picking" && (
      <>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <h2 style={{ fontFamily:"var(--fku)", fontWeight:900, fontSize:"1.6rem", color:"var(--cream)", marginBottom:4 }}>{voter?.name}</h2>
          <p style={{ color:"var(--smoke)", fontSize:".88rem" }}>کێ دەتەویت دەربکرێت؟</p>
          <p style={{ color:"var(--muted)", fontSize:".74rem", marginTop:4 }}>ڕۆڵەکان نهێنین — تەنها ناو دیاریە</p>
        </div>

        {/* NAME-ONLY vote targets — no icons, no roles */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:10, marginBottom:16 }}>
          {alivePlayers.filter(p=>p.id!==voter?.id).map(target => (
            <button key={target.id} onClick={()=>castVote(target.id)}
              style={{
                background:"linear-gradient(135deg,var(--layer),var(--surface))",
                border:"1.5px solid var(--border)",
                borderRadius:8, padding:"18px 12px",
                textAlign:"center", cursor:"pointer", transition:"all .22s",
                color:"var(--cream)", fontFamily:"var(--fku)",
                fontWeight:700, fontSize:"1rem",
                boxShadow:"0 2px 8px rgba(0,0,0,.4)",
              }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--crimson)"; e.currentTarget.style.boxShadow="0 0 18px rgba(200,48,40,.33)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.4)"; e.currentTarget.style.transform="none"; }}>
              {target.name}
            </button>
          ))}
        </div>

        <div style={{ textAlign:"center", color:"var(--muted)", fontSize:".75rem" }}>
          دەنگت تەنها سیستەمەکە دەزانێت
        </div>
      </>
    )}
  </div>
</div>
```

);
};

/* ═══════════════════════════════════════════════
MAIN GAME
═══════════════════════════════════════════════ */
const GameScreen = ({ initialPlayers, onWin }) => {
const [players, setPlayers]   = useState(initialPlayers);
const [phase,   setPhase]     = useState(“night”);
const [round,   setRound]     = useState(1);
const [log,     setLog]       = useState([]);
const [nightRes, setNightRes] = useState(null);
const [eliminated, setElim]   = useState(null);
const [voteTally, setTally]   = useState(null);
const [timerSec, setTimerSec] = useState(0);
const [timerOn, setTimerOn]   = useState(false);
const [modView, setModView]   = useState(false);
const timerRef = useRef();

const addLog = useCallback((msg, c=“var(–smoke)”) => {
const d = new Date();
const t = `${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`;
setLog(l => […l.slice(-50), { msg, c, t }]);
}, []);

const alive = players.filter(p => p.alive);
useEffect(() => { const w = checkWin(players); if (w) onWin(w, players); }, [players]);

const startTimer = sec => {
clearInterval(timerRef.current);
setTimerSec(sec); setTimerOn(true);
timerRef.current = setInterval(() => setTimerSec(s => {
if (s <= 1) { clearInterval(timerRef.current); setTimerOn(false); return 0; }
return s - 1;
}), 1000);
};
useEffect(() => () => clearInterval(timerRef.current), []);

/* ── resolve night ── */
const handleNightDone = (actions) => {
const mT  = actions[“Mafia”]     ?? null;
const donT= actions[“Don”]       ?? null;
const dS  = actions[“Doctor”]    ?? null;
const bS  = actions[“Bodyguard”] ?? null;
const sT  = actions[“Silencer”]  ?? null;
const deT = actions[“Detective”] ?? null;

```
let np = [...players].map(p => ({ ...p, silenced:false }));
const finalTarget = mT ?? donT ?? null;
const prot = finalTarget !== null && (dS === finalTarget || bS === finalTarget);
const res  = { killed:null, saved:false, silenced:null };

if (finalTarget !== null) {
  if (!prot) {
    np = np.map(p => p.id===finalTarget ? {...p,alive:false} : p);
    const t = players.find(p => p.id===finalTarget);
    if (t) { res.killed=t; addLog(`☠ ${t.name} شەوانە کوژرا.`, "var(--crimson)"); }
  } else {
    res.saved = true;
    addLog(`💊 هەدەف پارێزرا — کەسێک نەمرد.`, "#28a060");
  }
} else {
  addLog("شەوەکە بێ رووداوەوە تێپەربوو.", "var(--muted)");
}

if (sT !== null && sT !== undefined) {
  np = np.map(p => p.id===sT ? {...p,silenced:true} : p);
  const t = players.find(p => p.id===sT);
  if (t) { res.silenced=t; addLog(`🤫 ${t.name} بێدەنگ کرا.`, "#9040c0"); }
}
if (deT !== null && deT !== undefined) {
  const t = players.find(p => p.id===deT);
  if (t) addLog(`🔍 [تەنها خۆت بزانە] ${t.name} → ${ROLES[t.role].team==="mafia"?"مافیا":"بێگوناه"}`, "#4a9adf");
}

setPlayers(np); setNightRes(res);
setPhase("morning");
addLog(`— ڕۆژی ${round} —`, "var(--gold)");

const voiceMsg = res.killed
  ? `The city woke to find ${res.killed.name} dead.`
  : res.saved
  ? "The night passed. Someone was targeted but survived."
  : "The city woke peacefully. No one was killed tonight.";
speak(voiceMsg);
```

};

/* ── private vote done ── */
const handleVoteDone = (votes) => {
const tally = Object.values(votes).reduce((a,id) => ({…a,[id]:(a[id]||0)+1}),{});
const sorted = Object.entries(tally).sort((a,b)=>b[1]-a[1]);
setTally(sorted);
setPhase(“vote-result”);
addLog(“دەنگدانی نهێنی تەواوبوو.”, “var(–gold)”);
};

const finalizeVote = () => {
if (!voteTally?.length) { nextNight(); return; }
const tie = voteTally.length>1 && voteTally[0][1]===voteTally[1][1];
if (tie) { addLog(“یەکسانی — کەسێک نادەردرێت.”, “var(–muted)”); nextNight(); return; }
const target = players.find(p => p.id===parseInt(voteTally[0][0]));
if (!target) return;
setPlayers(ps => ps.map(p => p.id===target.id ? {…p,alive:false} : p));
setElim(target);
addLog(`⚖ ${target.name} (${ROLES[target.role].ku}) دەرکرا.`, “var(–crimson)”);
speak(`${target.name} has been eliminated by vote.`);
setPhase(“elim-reveal”);
};

const nextNight = () => {
setElim(null); setTally(null);
setRound(r => r+1); setPhase(“night”);
addLog(`— شەوی ${round+1} —`, “var(–gold)”);
};

const aliveM = alive.filter(p=>ROLES[p.role].team===“mafia”).length;
const aliveT = alive.filter(p=>ROLES[p.role].team===“town”).length;
const phaseLabel = { night:“🌙 شەو”, morning:“🌅 بەیانی”, “day-discuss”:“☀ ڕۆژ”, “private-vote”:“🗳 دەنگ”, “vote-result”:“📊 نتیجە”, “elim-reveal”:“⚖ دەرکراو” }[phase]||phase;

return (
<div style={{ minHeight:“100vh”, direction:“rtl” }}>
{phase===“night”        && <NightPhase players={players} round={round} onNightComplete={handleNightDone}/>}
{phase===“private-vote” && <PrivateVote alivePlayers={alive} onComplete={handleVoteDone}/>}

```
  {/* ── top bar ── */}
  {phase!=="night" && phase!=="private-vote" && (
    <div style={{ background:"linear-gradient(180deg,rgba(20,16,10,.98),rgba(8,6,4,.96))", borderBottom:"1px solid var(--border)", position:"sticky", top:0, zIndex:100 }}>
      <div style={{ maxWidth:860, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, padding:"9px 14px", flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <Badge label={phaseLabel} color="var(--gold)"/>
          <Badge label={`ڕۆژی ${round}`} color="var(--smoke)"/>
          <Badge label={`${alive.length} زیندو`} color="var(--parch)"/>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <Badge label={`مافیا ${aliveM}`} color="var(--crimson)"/>
          <Badge label={`شار ${aliveT}`} color="#28a060"/>
          <button onClick={()=>setModView(v=>!v)} style={{ background:modView?"rgba(200,168,74,.1)":"none", border:`1px solid ${modView?"var(--gold)":"var(--border)"}`, color:modView?"var(--gold)":"var(--muted)", padding:"3px 10px", borderRadius:2, fontSize:".68rem", fontFamily:"var(--fku)", transition:"all .2s" }}>
            👁 {modView?"ڕیفری":"نهێنی"}
          </button>
        </div>
      </div>
    </div>
  )}

  {/* ── page content ── */}
  {phase!=="night" && phase!=="private-vote" && (
    <div style={{ maxWidth:860, margin:"0 auto", padding:"18px 14px 80px" }}>

      {/* MORNING BANNER */}
      {phase==="morning" && nightRes && (
        <Card glow={nightRes.killed?"var(--blood)":nightRes.saved?"#1e7040":"var(--border)"} sx={{ marginBottom:18, animation:"slideDown .45s ease both" }}>
          <div style={{ padding:"18px 20px" }}>
            <div style={{ fontFamily:"var(--fku)", fontWeight:700, fontSize:".74rem", color:"var(--gold)", letterSpacing:".1em", marginBottom:10 }}>ڕاپۆرتی بەیانی</div>

            <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
              <span style={{ fontSize:"2rem", flexShrink:0 }}>{nightRes.killed?"☠":nightRes.saved?"💊":"🌅"}</span>
              <div>
                <p style={{ color:nightRes.killed?"var(--crimson)":nightRes.saved?"#28a060":"var(--parch)", fontSize:"1.05rem", fontWeight:600, lineHeight:1.55 }}>
                  {nightRes.killed
                    ? `${nightRes.killed.name} لە شارەکەدا کوژراو دۆزرایەوە.`
                    : nightRes.saved ? "ئاسایش سەرکەوتوو بوو — کەسێک نەمرد."
                    : "شارەکە بە ئارامی خەو کرد."}
                </p>
                {nightRes.silenced && <p style={{ color:"#9040c0", fontSize:".82rem", marginTop:6 }}>🤫 {nightRes.silenced.name} بێدەنگ کرا.</p>}
              </div>
            </div>

            {/* reveal killed player's card — ONLY this moment */}
            {nightRes.killed && (
              <div style={{ marginTop:16, borderTop:"1px solid var(--rim)", paddingTop:16, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
                <RoleCard role={nightRes.killed.role} revealed={true} size="md"/>
                <div>
                  <div style={{ fontWeight:700, color:ROLES[nightRes.killed.role]?.color, fontSize:".95rem", marginBottom:4 }}>
                    {nightRes.killed.name} — {ROLES[nightRes.killed.role]?.ku}
                  </div>
                  <Badge label={ROLES[nightRes.killed.role]?.team==="mafia"?"مافیا":"شار"} color={ROLES[nightRes.killed.role]?.team==="mafia"?"#c83028":"#28a060"}/>
                  <p style={{ color:"var(--smoke)", fontSize:".76rem", lineHeight:1.6, maxWidth:240, marginTop:6 }}>{ROLES[nightRes.killed.role]?.desc}</p>
                </div>
              </div>
            )}
          </div>
          <div style={{ padding:"12px 20px", borderTop:"1px solid var(--rim)" }}>
            <Btn v="gold" sz="md" onClick={()=>setPhase("day-discuss")}>☀ ڕۆژ دەستپێبکە</Btn>
          </div>
        </Card>
      )}

      {/* DAY DISCUSS */}
      {phase==="day-discuss" && (
        <div style={{ animation:"fadeUp .35s ease both" }}>
          {timerOn && (
            <div style={{ textAlign:"center", marginBottom:18 }}>
              <div style={{ fontFamily:"var(--fen)", fontWeight:700, fontSize:"3rem",
                color:timerSec<30?"var(--crimson)":"var(--gold)",
                textShadow:`0 0 28px ${timerSec<30?"rgba(200,48,40,.5)":"rgba(200,168,74,.4)"}`,
                animationName:timerSec<10?"pulse":"none", animationDuration:".5s", animationIterationCount:"infinite" }}>
                {Math.floor(timerSec/60)}:{(timerSec%60).toString().padStart(2,"0")}
              </div>
            </div>
          )}
          <div style={{ display:"flex", gap:9, flexWrap:"wrap", justifyContent:"center", marginBottom:18 }}>
            <Btn v="gold" sz="md" onClick={()=>setPhase("private-vote")}>🗳 دەنگدانی نهێنی</Btn>
            <Btn v="ghost" sz="md" onClick={()=>startTimer(180)}>⏱ ۳ خولەک</Btn>
            <Btn v="ghost" sz="md" onClick={()=>startTimer(300)}>⏱ ۵ خولەک</Btn>
            <Btn v="dark"  sz="md" onClick={nextNight}>🌙 شەوی داهاتوو</Btn>
          </div>
        </div>
      )}

      {/* VOTE RESULT */}
      {phase==="vote-result" && voteTally && (
        <Card sx={{ marginBottom:18, animation:"fadeUp .45s ease both" }}>
          <CH><span style={{ color:"var(--gold)", fontWeight:700 }}>📊 نتیجەی دەنگدانی نهێنی</span></CH>
          <div style={{ padding:"16px 18px" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
              {voteTally.map(([id,cnt],i) => {
                const p = players.find(x => x.id===parseInt(id));
                if (!p) return null;
                const tie = voteTally.length>1 && voteTally[0][1]===voteTally[1][1];
                const isTop = i===0 && !tie;
                const barW  = Math.round((cnt / alive.length) * 100);
                return (
                  <div key={id} style={{ animation:`fadeUp .3s ${i*.08}s ease both` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, alignItems:"center" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        {/* name only — no role icon in vote result */}
                        <span style={{ fontWeight:700, color:isTop?"var(--crimson)":"var(--parch)", fontSize:".9rem" }}>{p.name}</span>
                        {isTop && <Badge label="بیشترین دەنگ" color="var(--crimson)"/>}
                      </div>
                      <span style={{ fontFamily:"var(--fen)", fontWeight:700, color:isTop?"var(--crimson)":"var(--smoke)", fontSize:".9rem" }}>{cnt}</span>
                    </div>
                    <div style={{ height:6, background:"var(--rim)", borderRadius:3, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${barW}%`, borderRadius:3, transition:"width .6s ease",
                        background: isTop ? "linear-gradient(90deg,var(--blood),var(--crimson))" : "linear-gradient(90deg,var(--muted),var(--smoke))" }}/>
                    </div>
                  </div>
                );
              })}
            </div>
            {voteTally.length>1 && voteTally[0][1]===voteTally[1][1] && (
              <div style={{ background:"rgba(200,168,74,.07)", border:"1px solid var(--border)", borderRadius:4, padding:"10px 14px", marginBottom:14 }}>
                <p style={{ color:"var(--amber)", fontSize:".85rem", fontWeight:600 }}>⚖ دەنگەکان یەکسانن — کەسێک نادەردرێت</p>
              </div>
            )}
            <div style={{ display:"flex", gap:10 }}>
              <Btn v="crimson" sz="md" onClick={finalizeVote}>⚖ دەرکردنی دەنگ</Btn>
              <Btn v="ghost"   sz="md" onClick={nextNight}>بەبێ دەرکردن ←</Btn>
            </div>
          </div>
        </Card>
      )}

      {/* ELIM REVEAL — role shown here */}
      {phase==="elim-reveal" && eliminated && (
        <Card glow="var(--crimson)" sx={{ marginBottom:18, animation:"fadeUp .5s ease both", textAlign:"center" }}>
          <div style={{ padding:"28px 20px" }}>
            <div style={{ fontSize:"2.2rem", marginBottom:8 }}>⚖</div>
            <h2 style={{ fontFamily:"var(--fku)", fontWeight:900, fontSize:"1.75rem", color:"var(--crimson)", marginBottom:4,
              animationName:"bloodGlow", animationDuration:"2s", animationIterationCount:"infinite" }}>{eliminated.name}</h2>
            <p style={{ color:"var(--muted)", fontSize:".8rem", marginBottom:20 }}>بەدەنگی گشتی دەرکرا</p>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
              <RoleCard role={eliminated.role} revealed={true} size="lg"/>
            </div>
            <div style={{ marginBottom:8 }}>
              <Badge label={ROLES[eliminated.role]?.ku} color={ROLES[eliminated.role]?.color}/>
              &nbsp;
              <Badge label={ROLES[eliminated.role]?.team==="mafia"?"مافیا":"شار"} color={ROLES[eliminated.role]?.team==="mafia"?"#c83028":"#28a060"}/>
            </div>
            <p style={{ color:"var(--smoke)", fontSize:".83rem", lineHeight:1.7, maxWidth:300, margin:"10px auto 22px" }}>{ROLES[eliminated.role]?.desc}</p>
            <Btn v="gold" sz="lg" onClick={nextNight}>🌙 شەوی {round+1} دەستپێبکە</Btn>
          </div>
        </Card>
      )}

      {/* ── PLAYER GRID  (names + ? avatar — NO roles shown) ── */}
      <Card sx={{ marginBottom:18 }}>
        <CH>
          <span style={{ color:"var(--gold)", fontWeight:700 }}>👥 یاریزانان ({alive.length} زیندو)</span>
          {modView && <Badge label="ڕیفری — ڕۆڵ دیاری" color="var(--gold)"/>}
        </CH>
        <div style={{ padding:"14px", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))", gap:9 }}>
          {players.map(p => (
            <PlayerChip key={p.id} player={p}
              /* roles only shown in modView or when dead */
              revealRole={modView || !p.alive}
              glow={
                phase==="morning" && nightRes?.killed?.id===p.id ? "var(--crimson)" :
                phase==="morning" && nightRes?.silenced?.id===p.id ? "#9040c0" : undefined
              }
            />
          ))}
        </div>
      </Card>

      <Sep label="GAME LOG"/>
      <GameLog entries={log}/>
    </div>
  )}
</div>
```

);
};

/* ═══════════════════════════════════════════════
WIN SCREEN
═══════════════════════════════════════════════ */
const WinScreen = ({ winner, players, onNew }) => {
const isMafia = winner === “mafia”;
const alive   = players.filter(p => p.alive);

useEffect(() => {
speak(isMafia
? “The Mafia wins. The city has fallen into darkness.”
: “The town wins! Justice has been served.”);
}, []);

return (
<div style={{ minHeight:“100vh”, display:“flex”, flexDirection:“column”, alignItems:“center”, justifyContent:“center”, padding:“36px 18px”, direction:“rtl”, position:“relative”, overflow:“hidden” }}>
<div style={{ position:“absolute”, inset:0, background:isMafia?“radial-gradient(ellipse 80% 55% at 50% 35%,rgba(90,10,10,.55),var(–void))”:“radial-gradient(ellipse 80% 55% at 50% 35%,rgba(10,55,28,.5),var(–void))”, pointerEvents:“none” }}/>
<Stars count={70}/>
<div style={{ position:“relative”, zIndex:1, textAlign:“center”, maxWidth:540, animation:“fadeUp .8s ease both” }}>
<div style={{ fontSize:“4rem”, marginBottom:14, animationName:“float”, animationDuration:“3s”, animationIterationCount:“infinite” }}>{isMafia?“🔫”:“🎭”}</div>
<div style={{ fontFamily:“var(–fku)”, fontSize:”.75rem”, letterSpacing:”.3em”, color:“var(–muted)”, marginBottom:7 }}>یاری تەواوبوو</div>
<h1 style={{ fontFamily:“var(–fku)”, fontWeight:900, fontSize:“clamp(2rem,8vw,3.8rem)”, color:isMafia?“var(–crimson)”:”#28a060”, marginBottom:7, lineHeight:1.2, animationName:isMafia?“bloodGlow”:“goldPulse”, animationDuration:“2s”, animationIterationCount:“infinite” }}>
{isMafia?“مافیا بردی!”:“شار بردی!”}
</h1>
<p style={{ color:“var(–smoke)”, fontSize:“1rem”, fontStyle:“italic”, marginBottom:36, lineHeight:1.8 }}>
{isMafia?“شارەکە کەوتە دەستی سێبەرەکان.”:“دادپەروەری جێبەجێکرا.”}
</p>
<Sep label="زیندووان"/>
<div style={{ display:“flex”, flexWrap:“wrap”, gap:10, justifyContent:“center”, marginBottom:30 }}>
{alive.map(p => { const r=ROLES[p.role]; return (
<div key={p.id} style={{ background:`linear-gradient(135deg,${r.color}14,var(--surface))`, border:`1.5px solid ${r.color}44`, borderRadius:6, padding:“12px 14px”, textAlign:“center”, minWidth:100, animation:“chipIn .4s ease both” }}>
<div style={{ fontSize:“1.4rem”, marginBottom:4 }}>{r.icon}</div>
<div style={{ fontWeight:700, color:r.color, fontSize:”.85rem” }}>{p.name}</div>
<div style={{ color:“var(–smoke)”, fontSize:”.7rem”, marginTop:2 }}>{r.ku}</div>
</div>
); })}
</div>
<Sep label="هەموو ڕۆڵەکان"/>
<div style={{ display:“flex”, flexWrap:“wrap”, gap:7, justifyContent:“center”, marginBottom:36 }}>
{players.map(p => { const r=ROLES[p.role]; return (
<div key={p.id} style={{ background:“var(–layer)”, border:`1px solid ${r.color}2a`, borderRadius:4, padding:“4px 11px”, display:“flex”, gap:6, alignItems:“center”, opacity:p.alive?1:.42 }}>
<span>{r.icon}</span>
<span style={{ color:“var(–parch)”, fontSize:”.76rem”, fontWeight:700 }}>{p.name}</span>
<Badge label={r.ku} color={r.color}/>
{!p.alive && <span style={{ color:“var(–muted)”, fontSize:”.65rem” }}>☠</span>}
</div>
); })}
</div>
<Btn v=“gold” sz=“xl” onClick={onNew} sx={{ letterSpacing:”.07em” }}>🃏 یارییەکی نوێ</Btn>
</div>
</div>
);
};

/* ═══════════════════════════════════════════════
ROOT
═══════════════════════════════════════════════ */
export default function App() {
const [sc,      setSc]      = useState(“splash”);
const [players, setPlayers] = useState([]);
const [winner,  setWinner]  = useState(null);

useEffect(() => { try { window.speechSynthesis?.getVoices(); } catch(e){} }, []);

return (
<>
<GlobalStyles/>
{sc===“splash”  && <SplashScreen  onDone={()=>setSc(“setup”)}/>}
{sc===“setup”   && <SetupScreen   onStart={ps=>{ setPlayers(ps); setSc(“reveal”); }}/>}
{sc===“reveal”  && <RoleRevealScreen players={players} onDone={()=>setSc(“game”)}/>}
{sc===“game”    && <GameScreen    initialPlayers={players} onWin={(w,ps)=>{ setWinner(w); setPlayers(ps); setSc(“win”); }}/>}
{sc===“win”     && <WinScreen     winner={winner} players={players} onNew={()=>{ setSc(“splash”); setPlayers([]); setWinner(null); }}/>}
</>
);
}