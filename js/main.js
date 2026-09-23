document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelectorAll("#year");
  year.forEach(el => el.textContent = new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  const projects = [
    {title:"BOO", type:"UNITY · C# · MULTIPLAYER", description:"Tower Defense cooperativo em desenvolvimento, com foco em multiplayer e experiências de jogo compartilhadas.", video:"assets/videos/boo.mp4", link:"projetos/boo.html"},
    {title:"Projeto Gamificação", type:"UNITY · C# · GAMIFICATION", description:"Experiência com jogos voltados ao treinamento e avaliação de atenção e concentração.", video:"assets/videos/gamificacao.mp4", link:"projetos/gamificacao.html"},
    {title:"Semáforo", type:"UNITY · 2D · MOBILE", description:"Protótipo mobile de atenção baseado em reação e acompanhamento de veículos.", video:"assets/videos/semaforo.mp4", link:"projetos/semaforo.html"}
  ];

  const video = document.getElementById("showcase-video");
  const source = document.getElementById("showcase-source");
  const placeholder = document.querySelector(".showcase-placeholder");
  const title = document.getElementById("showcase-title");
  const type = document.getElementById("showcase-type");
  const description = document.getElementById("showcase-description");
  const link = document.getElementById("showcase-link");
  const counter = document.getElementById("showcase-counter");
  const dots = [...document.querySelectorAll(".showcase-dot")];
  let current = 0, timer;

  function loadProject(index) {
    current = index;
    const p = projects[index];
    title.textContent = p.title;
    type.textContent = p.type;
    description.textContent = p.description;
    link.href = p.link;
    counter.textContent = `0${index+1} / 0${projects.length}`;
    dots.forEach((d,i)=>d.classList.toggle("active",i===index));
    video.classList.remove("has-video");
    placeholder.classList.remove("has-video");
    video.pause();
    source.src = p.video;
    video.load();
    const ready = () => {
      video.classList.add("has-video");
      placeholder.classList.add("has-video");
      video.play().catch(()=>{});
      video.removeEventListener("canplay", ready);
    };
    video.addEventListener("canplay", ready);
  }
  function startRotation(){ clearInterval(timer); timer=setInterval(()=>loadProject((current+1)%projects.length),5000); }
  if(video && title){
    dots.forEach(d=>d.addEventListener("click",()=>{loadProject(Number(d.dataset.index));startRotation();}));
    loadProject(0); startRotation();
  }

  const reveal = new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");reveal.unobserve(e.target);}});
  },{threshold:.1});
  document.querySelectorAll(".reveal,.service-card,.project-card,.current-card,.exp-item,.contact-card,.case-layout").forEach(el=>{
    if(!el.classList.contains("reveal")) el.classList.add("reveal");
    reveal.observe(el);
  });
});
