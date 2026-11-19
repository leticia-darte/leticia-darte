import { portfolioData } from "./data.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);
const escapeAttribute = (value = "") => escapeHTML(value).replace(/`/g, "&#96;");

function renderSkills() {
  $("#skills-grid").innerHTML = portfolioData.skills.map((group, groupIndex) => `
    <article class="skill-group" data-reveal style="--group-delay: ${groupIndex * 90}ms">
      <h3><span class="skill-group-mark">0${groupIndex + 1}</span>${escapeHTML(group.category)}</h3>
      <div class="skill-items">${group.items.map((item) => `
        <div class="skill-item"><span class="skill-mark mark-${escapeAttribute(item.tone)}">${escapeHTML(item.mark)}</span>
          <span>${escapeHTML(item.name)}</span><span class="skill-item-arrow" aria-hidden="true">↗</span>
        </div>`).join("")}</div>
    </article>`).join("");
}

function renderProjects() {
  const grid = $("#projects-grid");
  const count = portfolioData.projects.length;
  $("#project-count").textContent = `${count} ${count === 1 ? "projeto" : "projetos"}`;
  if (!count) {
    grid.innerHTML = `<article class="project-empty" data-reveal>
      <div class="empty-orbit empty-orbit-one"></div><div class="empty-orbit empty-orbit-two"></div>
      <div class="empty-mark" aria-hidden="true">&lt;?&gt;</div>
      <div class="empty-copy"><span class="empty-label">ESPAÇO RESERVADO</span><h3>Seu próximo projeto<br />começa com uma ideia.</h3>
        <p>Este espaço está pronto para receber seus projetos reais.</p></div>
      <div class="empty-code" aria-hidden="true"><span>const</span> projetos = <b>[]</b><i>;</i></div><span class="empty-index">01 — ∞</span>
      </article><aside class="project-note" data-reveal><span class="project-note-icon">✳</span>
        <p>Adicione projetos reais em <code>src/data.js</code>. Cada card pode mostrar descrição, tecnologias, demonstração e repositório.</p>
        <span class="project-note-tail">&lt;/próximos passos&gt;</span></aside>`;
    return;
  }
  grid.innerHTML = portfolioData.projects.map((project, index) => {
    const preview = project.image
      ? `<div class="project-preview"><img src="${escapeAttribute(project.image)}" alt="Prévia do projeto ${escapeAttribute(project.title)}" loading="lazy" /></div>`
      : `<div class="project-preview project-preview-fallback"><span aria-hidden="true">&lt;${String(index + 1).padStart(2, "0")}/&gt;</span></div>`;
    const tags = (project.technologies || []).map((tag) => `<span class="project-tag">${escapeHTML(tag)}</span>`).join("");
    const actions = [
      project.demoUrl && `<a href="${escapeAttribute(project.demoUrl)}" target="_blank" rel="noreferrer">Ver projeto ↗</a>`,
      project.repoUrl && `<a href="${escapeAttribute(project.repoUrl)}" target="_blank" rel="noreferrer">GitHub ↗</a>`,
    ].filter(Boolean).join("");
    return `<article class="project-card" data-reveal>${preview}<div class="project-card-copy">
      <div class="project-card-heading"><h3>${escapeHTML(project.title)}</h3><span>0${index + 1}</span></div>
      <p>${escapeHTML(project.description || "")}</p><div class="project-tags">${tags}</div>
      <div class="project-actions">${actions || "<span>Links em breve</span>"}</div></div></article>`;
  }).join("");
}

function renderEducation() {
  $("#education-timeline").innerHTML = portfolioData.education.map((item, index) => `
    <article class="education-item" data-reveal><span class="timeline-marker" aria-hidden="true"><i></i></span>
      <div class="education-meta"><span>${escapeHTML(item.type)}</span><span>${escapeHTML(item.status)}</span></div>
      <h3>${escapeHTML(item.course)}</h3><p>${item.institution ? escapeHTML(item.institution) : '<span class="pending-value">Instituição a informar</span>'}</p>
      <span class="education-index">0${index + 1}</span></article>`).join("");
}

function renderContact() {
  const entries = [
    { key: "email", label: "E-mail", value: portfolioData.contact.email, mark: "@" },
    { key: "linkedin", label: "LinkedIn", value: portfolioData.contact.linkedin, mark: "in" },
    { key: "github", label: "GitHub", value: portfolioData.contact.github, mark: "◉" },
  ];
  $("#contact-links").insertAdjacentHTML("beforeend", entries.map(({ key, label, value, mark }) => `
    <div class="contact-link-row"><span class="contact-link-mark">${mark}</span><span class="contact-link-label">${label}</span>
      ${value ? `<a href="${key === "email" ? `mailto:${escapeAttribute(value)}` : escapeAttribute(value)}" ${key === "email" ? "" : 'target="_blank" rel="noreferrer"'}>${escapeHTML(value)} <span aria-hidden="true">↗</span></a>`
      : `<button class="placeholder-link" type="button" data-action="${key}">Adicionar ${label.toLowerCase()} <span aria-hidden="true">↗</span></button>`}</div>`).join(""));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

function setupActions() {
  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    if (action === "resume") {
      if (portfolioData.resume) {
        const link = document.createElement("a");
        link.href = portfolioData.resume;
        link.download = portfolioData.resume.split("/").pop() || "curriculo.pdf";
        link.hidden = true;
        document.body.append(link);
        link.click();
        link.remove();
      } else showToast("Currículo temporariamente indisponível. Configure o PDF em src/data.js.");
      return;
    }
    if (action === "email" && portfolioData.contact.email) {
      window.location.href = `mailto:${portfolioData.contact.email}`;
      return;
    }
    showToast(`Adicione seu ${action === "email" ? "e-mail" : action} em src/data.js para ativar este contato.`);
  });
}

function setupTyping() {
  const target = $("#typing-text");
  const phrases = ["desenvolvimento web", "soluções digitais", "novas possibilidades"];
  if (reduceMotion) return;
  let phraseIndex = 0;
  let characterIndex = phrases[0].length;
  let deleting = true;
  const tick = () => {
    const phrase = phrases[phraseIndex];
    characterIndex += deleting ? -1 : 1;
    target.textContent = phrase.slice(0, characterIndex);
    let delay = deleting ? 42 : 72;
    if (characterIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 360; }
    else if (characterIndex === phrases[phraseIndex].length) { deleting = true; delay = 1550; }
    window.setTimeout(tick, delay);
  };
  window.setTimeout(tick, 1800);
}

function setupNavigation() {
  const header = $(".site-header");
  const toggle = $(".menu-toggle");
  const navigation = $(".primary-navigation");
  const navLinks = $$(".nav-link");
  const sections = navLinks.map((link) => $(link.getAttribute("href"))).filter(Boolean);
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
    navigation.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const current = navLinks.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
      if (current) navLinks.forEach((link) => link.classList.toggle("is-active", link === current));
    }), { rootMargin: "-36% 0px -54% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }
}

function setupScrollEffects() {
  const progress = $("#scroll-progress-bar");
  let ticking = false;
  const update = () => {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${range > 0 ? (window.scrollY / range) * 100 : 0}%`;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });
  update();
  const items = $$("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach((item) => item.classList.add("is-visible")); return; }
  const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    currentObserver.unobserve(entry.target);
  }), { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  items.forEach((item) => observer.observe(item));
}

function initialize() {
  $("[data-name]").textContent = portfolioData.name;
  $("#current-year").textContent = new Date().getFullYear();
  renderSkills(); renderProjects(); renderEducation(); renderContact();
  setupActions(); setupNavigation(); setupScrollEffects(); setupTyping();
  window.setTimeout(() => document.body.classList.add("is-ready"), reduceMotion ? 0 : 120);
}

initialize();
