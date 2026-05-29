const APP_VERSION = "20260528z";
const SESSION_VERSION = Date.now().toString(36);

const siteData = window.EVB_SITE_DATA || {};
const tools = siteData.tools || [];
const infoPages = siteData.infoPages || [];

const elements = {
    infoNavList: document.getElementById("infoNavList"),
    navList: document.getElementById("toolNavList"),
    toolCards: document.getElementById("toolCards"),
    homeView: document.getElementById("homeView"),
    infoView: document.getElementById("infoView"),
    infoPageContainer: document.getElementById("infoPageContainer"),
    toolView: document.getElementById("toolView"),
    toolFrame: document.getElementById("toolFrame"),
    pageTitle: document.getElementById("pageTitle"),
    toolStatus: document.getElementById("toolStatus"),
    openToolButton: document.getElementById("openToolButton"),
    activeToolCategory: document.getElementById("activeToolCategory"),
    activeToolName: document.getElementById("activeToolName"),
    activeToolDescription: document.getElementById("activeToolDescription"),
    currentYear: document.getElementById("currentYear")
};

let activeTool = null;
let carouselAutoplayTimer = null;

document.addEventListener("DOMContentLoaded", () => {
    if (!validateSiteData()) return;

    renderInfoTabs();
    renderNavigation();
    renderToolCards();
    elements.currentYear.textContent = new Date().getFullYear();
    elements.openToolButton.addEventListener("click", openActiveToolInNewTab);
    elements.infoPageContainer.addEventListener("click", handleInfoPageClick);
    elements.infoPageContainer.addEventListener("input", handleInfoPageInput);
    elements.infoPageContainer.addEventListener("change", handleInfoPageInput);
    window.addEventListener("hashchange", routeFromHash);
    routeFromHash();
});

function validateSiteData() {
    if (tools.length > 0 && infoPages.length > 0) return true;

    elements.homeView.hidden = true;
    elements.infoView.hidden = false;
    elements.toolView.hidden = true;
    elements.infoPageContainer.innerHTML = `
        <article class="info-page info-page--error">
            <div class="info-copy">
                <p class="eyebrow">Configuração</p>
                <h2>Arquivo de dados não carregado</h2>
                <div class="info-body">
                    <p>O portal não conseguiu carregar o arquivo <strong>data/site-data.js</strong>. Verifique se a pasta <strong>data</strong> foi enviada junto com o site e se o caminho está correto.</p>
                </div>
            </div>
        </article>
    `;
    return false;
}

function renderInfoTabs() {
    const fragment = document.createDocumentFragment();

    infoPages.forEach(page => {
        const button = document.createElement("button");
        button.className = "tab-button";
        button.type = "button";
        button.dataset.target = page.id;
        button.textContent = page.label;
        button.addEventListener("click", () => navigateToInfo(page.id));
        fragment.appendChild(button);
    });

    const toolsTab = document.createElement("button");
    toolsTab.className = "tab-button";
    toolsTab.type = "button";
    toolsTab.dataset.target = "tools";
    toolsTab.textContent = "Ferramentas";
    toolsTab.addEventListener("click", () => navigateTo("home"));
    fragment.appendChild(toolsTab);

    elements.infoNavList.appendChild(fragment);
}

function renderNavigation() {
    const fragment = document.createDocumentFragment();

    tools.forEach(tool => {
        const button = document.createElement("button");
        button.className = "nav-button";
        button.type = "button";
        button.dataset.target = tool.id;
        button.innerHTML = `<strong>${tool.name}</strong><small>${tool.category}</small>`;
        button.addEventListener("click", () => navigateTo(tool.id));
        fragment.appendChild(button);
    });

    elements.navList.appendChild(fragment);
}

function renderToolCards() {
    const fragment = document.createDocumentFragment();

    tools.forEach(tool => {
        const card = document.createElement("article");
        card.className = "tool-card";
        const statusClass = normalizeStatusClass(tool.status);
        const exampleButton = tool.exampleUrl
            ? `<a class="tool-example-link" href="${escapeHTML(tool.exampleUrl)}" download>${escapeHTML(tool.exampleLabel || "Baixar exemplo")}</a>`
            : "";
        card.innerHTML = `
            <span class="tool-card-topline">
                <span class="category">${tool.category}</span>
                <span class="tool-status-badge ${statusClass}">${tool.status || "Em uso"}</span>
            </span>
            <span class="tool-card-heading">
                <h3>${tool.name}</h3>
                <span class="tool-version">v${tool.version || "2.0"}</span>
            </span>
            <p>${tool.description}</p>
            <span class="tool-details">
                <span>
                    <strong>Arquivos aceitos</strong>
                    <small>${tool.accepts || "Arquivos definidos conforme a rotina da ferramenta."}</small>
                </span>
                <span>
                    <strong>Resultado gerado</strong>
                    <small>${tool.output || "Resultado processado pela ferramenta selecionada."}</small>
                </span>
            </span>
            <span class="tool-card-footer">
                <button class="tool-open-inline" type="button">
                    <span class="open-label">Abrir ferramenta</span>
                    <span aria-hidden="true">&rarr;</span>
                </button>
                ${exampleButton}
            </span>
        `;
        card.querySelector(".tool-open-inline").addEventListener("click", () => navigateTo(tool.id));
        fragment.appendChild(card);
    });

    elements.toolCards.appendChild(fragment);
}

function normalizeStatusClass(status) {
    return String(status || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function navigateTo(target) {
    window.location.hash = target === "home" ? "home" : `tool=${target}`;
}

function navigateToInfo(target) {
    window.location.hash = `page=${target}`;
}

function routeFromHash() {
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));

    if (!hash) {
        showInfoPage(infoPages[0]);
        return;
    }

    if (hash === "home" || hash === "tools") {
        showHome();
        return;
    }

    if (hash.startsWith("page=")) {
        const pageId = hash.slice(5);
        const page = infoPages.find(item => item.id === pageId);
        if (page) {
            showInfoPage(page);
            return;
        }
    }

    const toolId = hash.startsWith("tool=") ? hash.slice(5) : hash;
    const tool = tools.find(item => item.id === toolId);

    if (!tool) {
        showInfoPage(infoPages[0]);
        return;
    }

    showTool(tool);
}

function showHome() {
    activeTool = null;
    stopCarouselAutoplay();
    document.body.classList.remove("is-tool-open");
    elements.homeView.hidden = false;
    elements.infoView.hidden = true;
    elements.toolView.hidden = true;
    elements.toolFrame.removeAttribute("src");
    elements.pageTitle.textContent = "Ferramentas";
    elements.toolStatus.textContent = "Ferramentas";
    elements.openToolButton.disabled = true;
    setActiveNav("home");
    setActiveTab("tools");
}

function showInfoPage(page) {
    activeTool = null;
    stopCarouselAutoplay();
    document.body.classList.remove("is-tool-open");
    elements.homeView.hidden = true;
    elements.infoView.hidden = false;
    elements.toolView.hidden = true;
    elements.toolFrame.removeAttribute("src");
    elements.pageTitle.textContent = page.title;
    elements.toolStatus.textContent = "Informações";
    elements.openToolButton.disabled = true;
    elements.infoPageContainer.innerHTML = buildInfoPageHTML(page);
    startCarouselAutoplay();
    setActiveNav("");
    setActiveTab(page.id);
}

function showTool(tool) {
    activeTool = tool;
    stopCarouselAutoplay();
    document.body.classList.add("is-tool-open");
    elements.homeView.hidden = true;
    elements.infoView.hidden = true;
    elements.toolView.hidden = false;
    elements.pageTitle.textContent = tool.name;
    elements.toolStatus.textContent = tool.category;
    elements.activeToolCategory.textContent = tool.category;
    elements.activeToolName.textContent = tool.name;
    elements.activeToolDescription.textContent = tool.description;
    elements.openToolButton.disabled = false;
    setActiveNav(tool.id);
    setActiveTab("");

    const versionedPath = withVersion(tool.path);

    if (elements.toolFrame.getAttribute("src") !== versionedPath) {
        elements.toolFrame.src = versionedPath;
    }
}

function setActiveNav(target) {
    document.querySelectorAll(".nav-button").forEach(button => {
        button.classList.toggle("is-active", button.dataset.target === target);
    });
}

function setActiveTab(target) {
    document.querySelectorAll(".tab-button").forEach(button => {
        button.classList.toggle("is-active", button.dataset.target === target);
    });
}

function buildInfoPageHTML(page) {
    const paragraphs = page.bodyHtml || page.body.map(text => buildInfoParagraphHTML(text)).join("");
    const imageMode = page.imageMode ? ` ${escapeHTML(page.imageMode).split(" ").map(name => `is-${name}`).join(" ")}` : "";
    const team = buildTeamHTML(page.team || []);
    const map = buildMapHTML(page.map);
    const repository = buildRepositoryHTML(page.repository || []);
    const services = buildServicesHTML(page.services || []);
    const instagram = buildInstagramHTML(page.instagram);
    const help = buildHelpHTML(page.help);
    const mediaGallery = buildPhotoCarouselHTML(page.gallery || [], { compact: true });
    const image = page.image
        ? `<img class="info-image${imageMode}" src="${escapeHTML(page.image)}" alt="${escapeHTML(page.imageAlt || page.title)}">`
        : `<div class="info-image-placeholder">Imagem opcional<br><span>Coloque uma foto em img/ e edite o campo image no app.js</span></div>`;
    const media = team || map || repository || services || instagram || help || mediaGallery || image;
    const action = page.actionLabel
        ? `<a class="info-action ${page.actionUrl ? "" : "is-disabled"}" href="${escapeHTML(page.actionUrl || "#")}" target="_blank" rel="noopener noreferrer">${escapeHTML(page.actionLabel)}</a>`
        : "";
    const pageClass = [
        team ? "info-page--with-team" : "",
        map ? "info-page--with-map" : "",
        repository ? "info-page--with-repository" : "",
        services ? "info-page--with-services" : "",
        instagram ? "info-page--with-instagram" : "",
        help ? "info-page--with-help" : "",
        mediaGallery ? "info-page--with-gallery" : ""
    ].filter(Boolean).join(" ");

    return `
        <article class="info-page${pageClass ? ` ${pageClass}` : ""}">
            <div class="info-copy">
                <p class="eyebrow">${escapeHTML(page.eyebrow)}</p>
                <h2>${escapeHTML(page.title)}</h2>
                <p class="info-summary">${escapeHTML(page.summary)}</p>
                <div class="info-body">${paragraphs}</div>
                ${action}
            </div>
            <div class="info-media">${media}</div>
        </article>
    `;
}

function buildInfoParagraphHTML(text) {
    const escaped = escapeHTML(text);
    const emailPattern = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

    if (!emailPattern.test(text)) {
        return `<p>${escaped}</p>`;
    }

    return `<p class="highlight-contact">${escaped.replace(emailPattern, '<a href="mailto:$1">$1</a>')}</p>`;
}

function buildHelpHTML(help) {
    if (!help) return "";

    const flow = Array.isArray(help.flow) ? help.flow : [];
    const guides = Array.isArray(help.tools) ? help.tools : [];

    return `
        <section class="help-panel" aria-label="Ajuda das ferramentas">
            ${flow.length ? `
                <div class="help-flow">
                    ${flow.map(item => `
                        <article class="help-step">
                            <span>${escapeHTML(item.step || "")}</span>
                            <div>
                                <p>${escapeHTML(item.tool || "Ferramenta")}</p>
                                <h3>${escapeHTML(item.title || "")}</h3>
                                <small>${escapeHTML(item.text || "")}</small>
                            </div>
                        </article>
                    `).join("")}
                </div>
            ` : ""}
            <div class="help-guides">
                ${guides.map(item => {
                    const tool = tools.find(candidate => candidate.id === item.toolId) || {};
                    return `
                        <article class="help-card">
                            <div class="help-card-header">
                                <span>${escapeHTML(tool.category || "Ferramenta")}</span>
                                <strong>${escapeHTML(tool.name || item.toolId || "Ferramenta")}</strong>
                            </div>
                            <div class="help-card-section">
                                <h4>Entrada esperada</h4>
                                <p>${escapeHTML(item.expectedInput || "")}</p>
                            </div>
                            <div class="help-card-section">
                                <h4>Passo a passo</h4>
                                <ol>
                                    ${(item.steps || []).map(step => `<li>${escapeHTML(step)}</li>`).join("")}
                                </ol>
                            </div>
                            <div class="help-card-section">
                                <h4>Erros comuns</h4>
                                <ul>
                                    ${(item.commonErrors || []).map(error => `<li>${escapeHTML(error)}</li>`).join("")}
                                </ul>
                            </div>
                            ${item.exampleUrl ? `<a class="help-download" href="${escapeHTML(item.exampleUrl)}" download>${escapeHTML(item.exampleLabel || "Baixar exemplo")}</a>` : ""}
                        </article>
                    `;
                }).join("")}
            </div>
        </section>
    `;
}

function buildInstagramHTML(info) {
    if (!info || !info.profileUrl) return "";

    const posts = Array.isArray(info.posts) ? info.posts : [];

    return `
        <section class="instagram-panel" aria-label="Instagram do Herbário Evaldo Buttura">
            <div class="instagram-main">
                <div>
                    <span class="instagram-handle">${escapeHTML(info.handle || "@herbario.unila")}</span>
                    <h3>Herbário Evaldo Buttura no Instagram</h3>
                    <p>${escapeHTML(info.callout || "Acompanhe as novidades do herbário pelo Instagram.")}</p>
                    <a class="instagram-button" href="${escapeHTML(info.profileUrl)}" target="_blank" rel="noopener noreferrer">Abrir perfil</a>
                </div>
                <figure class="instagram-qr">
                    <img src="${escapeHTML(info.qrCodeUrl || "")}" alt="${escapeHTML(info.qrCodeAlt || "QR Code do Instagram")}">
                    <figcaption>Aponte a câmera do celular para acessar o perfil.</figcaption>
                </figure>
            </div>
            ${posts.length ? `
                <div class="instagram-posts">
                    ${posts.map(post => `
                        <article class="instagram-post">
                            <span>${escapeHTML(post.tag || "Instagram")}</span>
                            <h4>${escapeHTML(post.title || "Publicação")}</h4>
                            <p>${escapeHTML(post.text || "")}</p>
                            ${post.link ? `<a href="${escapeHTML(post.link)}" target="_blank" rel="noopener noreferrer">Ver no Instagram</a>` : ""}
                        </article>
                    `).join("")}
                </div>
            ` : ""}
        </section>
    `;
}

function buildMapHTML(map) {
    if (!map || !map.src) return "";

    return `
        <div class="map-panel">
            <iframe
                title="${escapeHTML(map.title || "Mapa")}"
                src="${escapeHTML(map.src)}"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen>
            </iframe>
        </div>
    `;
}

function buildRepositoryHTML(items) {
    if (!items || items.length === 0) return "";
    const sortedItems = [...items].sort((first, second) => Number(second.year || 0) - Number(first.year || 0));
    const years = [...new Set(sortedItems.map(item => item.year).filter(Boolean))];
    const types = [...new Set(sortedItems.map(item => item.type).filter(Boolean))].sort((first, second) => first.localeCompare(second, "pt-BR"));

    return `
        <section class="repository-panel" aria-label="Repositório de trabalhos">
            <div class="repository-filters" aria-label="Filtros do repositório">
                <label>
                    <span>Buscar</span>
                    <input type="search" data-repository-search placeholder="Título ou autor">
                </label>
                <label>
                    <span>Ano</span>
                    <select data-repository-year>
                        <option value="">Todos</option>
                        ${years.map(year => `<option value="${escapeHTML(year)}">${escapeHTML(year)}</option>`).join("")}
                    </select>
                </label>
                <label>
                    <span>Tipo</span>
                    <select data-repository-type>
                        <option value="">Todos</option>
                        ${types.map(type => `<option value="${escapeHTML(type)}">${escapeHTML(type)}</option>`).join("")}
                    </select>
                </label>
            </div>
            <div class="repository-list">
            ${sortedItems.map(item => `
                <article class="repository-item" data-repository-item data-year="${escapeHTML(item.year || "")}" data-type="${escapeHTML(item.type || "")}" data-search="${escapeHTML(`${item.title || ""} ${item.author || ""}`.toLowerCase())}">
                    <div class="repository-year">${escapeHTML(item.year || "s/d")}</div>
                    <div class="repository-content">
                        <p class="repository-meta">${escapeHTML(item.type || "Publicação")}</p>
                        <h3>${escapeHTML(item.title)}</h3>
                        <p>${escapeHTML(item.author)}</p>
                        <div class="repository-actions">
                            ${buildRepositoryLinkHTML("PDF", item.pdfUrl || item.url)}
                            ${buildRepositoryLinkHTML("Resumo", item.abstractUrl)}
                            ${buildRepositoryLinkHTML("Link externo", item.externalUrl)}
                        </div>
                    </div>
                </article>
            `).join("")}
            </div>
            <p class="repository-empty" data-repository-empty hidden>Nenhum trabalho encontrado para os filtros selecionados.</p>
        </section>
    `;
}

function buildRepositoryLinkHTML(label, url) {
    if (!url) return "";
    return `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`;
}

function buildServicesHTML(items) {
    if (!items || items.length === 0) return "";

    return `
        <section class="services-list" aria-label="Serviços do herbário">
            ${items.map(item => `
                <article class="service-item">
                    <span class="service-status">${escapeHTML(item.status || "Informação")}</span>
                    <h3>${escapeHTML(item.title)}</h3>
                    <p>${escapeHTML(item.description)}</p>
                </article>
            `).join("")}
        </section>
    `;
}

function buildTeamHTML(members) {
    if (!members || members.length === 0) return "";

    const groups = members.reduce((acc, member) => {
        if (!acc.has(member.group)) acc.set(member.group, []);
        acc.get(member.group).push(member);
        return acc;
    }, new Map());

    const sections = Array.from(groups.entries()).map(([group, groupMembers]) => `
        <section class="team-group">
            <h3>${escapeHTML(group)}</h3>
            <div class="team-grid">
                ${groupMembers.map(member => buildTeamCardHTML(member)).join("")}
            </div>
        </section>
    `).join("");

    return `
        <section class="team-section" aria-label="Equipe do Herbário Evaldo Buttura">
            ${sections}
        </section>
    `;
}

function buildTeamCardHTML(member) {
    const email = member.email
        ? `<a href="mailto:${escapeHTML(member.email)}">${escapeHTML(member.email)}</a>`
        : "";

    return `
        <article class="team-card">
            <img class="team-photo" src="${escapeHTML(member.photo)}" alt="Foto de ${escapeHTML(member.name)}">
            <div class="team-info">
                <h4>${escapeHTML(member.name)}</h4>
                <p>${escapeHTML(member.role)}</p>
                ${email}
            </div>
        </article>
    `;
}

function buildPhotoCarouselHTML(photos, options = {}) {
    if (!photos || photos.length === 0) return "";
    const compactClass = options.compact ? " photo-carousel--compact" : "";

    const slides = photos.map((photo, index) => `
        <figure class="carousel-slide${index === 0 ? " is-active" : ""}">
            <img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt || photo.caption || "Foto do herbário")}">
            ${photo.caption ? `<figcaption>${formatCaptionHTML(photo.caption)}</figcaption>` : ""}
        </figure>
    `).join("");

    const dots = photos.map((_, index) => `
        <button class="carousel-dot${index === 0 ? " is-active" : ""}" type="button" data-carousel-index="${index}" aria-label="Mostrar foto ${index + 1}"></button>
    `).join("");

    return `
        <section class="photo-carousel${compactClass}" data-active-index="0" aria-label="Galeria de fotos do herbário">
            <div class="carousel-header">
                <div>
                    <p class="eyebrow">Galeria</p>
                    <h3>Fotos do herbário</h3>
                </div>
                <div class="carousel-controls">
                    <button class="carousel-button" type="button" data-carousel-prev aria-label="Foto anterior">‹</button>
                    <button class="carousel-button" type="button" data-carousel-next aria-label="Próxima foto">›</button>
                </div>
            </div>
            <div class="carousel-track">${slides}</div>
            <div class="carousel-dots">${dots}</div>
        </section>
    `;
}

function handleInfoPageClick(event) {
    const carousel = event.target.closest(".photo-carousel");
    if (!carousel) return;

    if (event.target.matches("[data-carousel-next]")) {
        moveCarousel(carousel, 1);
        restartCarouselAutoplay();
    }

    if (event.target.matches("[data-carousel-prev]")) {
        moveCarousel(carousel, -1);
        restartCarouselAutoplay();
    }

    const dot = event.target.closest("[data-carousel-index]");
    if (dot) {
        setCarouselIndex(carousel, Number(dot.dataset.carouselIndex));
        restartCarouselAutoplay();
    }
}

function handleInfoPageInput(event) {
    if (!event.target.matches("[data-repository-search], [data-repository-year], [data-repository-type]")) return;

    const panel = event.target.closest(".repository-panel");
    if (panel) {
        filterRepository(panel);
    }
}

function filterRepository(panel) {
    const search = normalizeText(panel.querySelector("[data-repository-search]")?.value || "");
    const year = panel.querySelector("[data-repository-year]")?.value || "";
    const type = panel.querySelector("[data-repository-type]")?.value || "";
    let visibleCount = 0;

    panel.querySelectorAll("[data-repository-item]").forEach(item => {
        const matchesSearch = !search || normalizeText(item.dataset.search || "").includes(search);
        const matchesYear = !year || item.dataset.year === year;
        const matchesType = !type || item.dataset.type === type;
        const isVisible = matchesSearch && matchesYear && matchesType;

        item.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
    });

    const empty = panel.querySelector("[data-repository-empty]");
    if (empty) {
        empty.hidden = visibleCount > 0;
    }
}

function normalizeText(value) {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function startCarouselAutoplay() {
    const carousel = elements.infoPageContainer.querySelector(".photo-carousel");
    if (!carousel || carousel.querySelectorAll(".carousel-slide").length < 2) return;

    carouselAutoplayTimer = window.setInterval(() => {
        const activeCarousel = elements.infoPageContainer.querySelector(".photo-carousel");
        if (activeCarousel) {
            moveCarousel(activeCarousel, 1);
        }
    }, 5000);
}

function stopCarouselAutoplay() {
    if (!carouselAutoplayTimer) return;
    window.clearInterval(carouselAutoplayTimer);
    carouselAutoplayTimer = null;
}

function restartCarouselAutoplay() {
    stopCarouselAutoplay();
    startCarouselAutoplay();
}

function moveCarousel(carousel, direction) {
    const slides = carousel.querySelectorAll(".carousel-slide");
    if (slides.length === 0) return;

    const current = Number(carousel.dataset.activeIndex || 0);
    const next = (current + direction + slides.length) % slides.length;
    setCarouselIndex(carousel, next);
}

function setCarouselIndex(carousel, index) {
    carousel.dataset.activeIndex = String(index);
    carousel.querySelectorAll(".carousel-slide").forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
    });
    carousel.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
    });
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatCaptionHTML(value) {
    return escapeHTML(value)
        .replace(/&lt;(\/?)(em|strong)&gt;/gi, "<$1$2>");
}

function openActiveToolInNewTab() {
    if (!activeTool) return;
    window.open(withVersion(activeTool.path), "_blank", "noopener,noreferrer");
}

function withVersion(path) {
    const separator = path.includes("?") ? "&" : "?";
    return `${path}${separator}v=${APP_VERSION}&reload=${SESSION_VERSION}`;
}
