const APP_VERSION = "20260602b";
const SESSION_VERSION = Date.now().toString(36);
const LANGUAGE_STORAGE_KEY = "evbPortalLanguage";

const siteData = window.EVB_SITE_DATA || {};
const baseTools = siteData.tools || [];
const baseInfoPages = siteData.infoPages || [];
const localizedData = siteData.localized || {};
const languageLabels = { pt: "PT", en: "EN", es: "ES" };
const languages = ["pt", ...Object.keys(localizedData)]
    .filter((code, index, array) => array.indexOf(code) === index)
    .reduce((acc, code) => ({ ...acc, [code]: languageLabels[code] || code.toUpperCase() }), {});
const uiText = {
    pt: {
        ready: "Pronto",
        tools: "Ferramentas",
        information: "Informações",
        tool: "Ferramenta",
        selectedTool: "Ferramenta selecionada",
        openTool: "Abrir ferramenta",
        moreAbout: "Mais sobre",
        lessAbout: "Recolher",
        openToolNewTab: "Abrir ferramenta em nova aba",
        acceptedFiles: "Arquivos aceitos",
        generatedOutput: "Resultado gerado",
        defaultExample: "Baixar exemplo",
        defaultStatus: "Em uso",
        defaultAcceptedFiles: "Arquivos definidos conforme a rotina da ferramenta.",
        defaultOutput: "Resultado processado pela ferramenta selecionada.",
        dataConfig: "Configuração",
        dataErrorTitle: "Arquivo de dados não carregado",
        dataErrorBody: "O portal não conseguiu carregar o arquivo <strong>data/site-data.js</strong>. Verifique se a pasta <strong>data</strong> foi enviada junto com o site e se o caminho está correto.",
        homeEyebrow: "Ambiente integrado",
        homeTitle: "Escolha uma ferramenta para iniciar",
        homeSummary: "Este portal organiza os programas do EVB em uma interface comum, com navegação padronizada e espaço de trabalho adaptável ao monitor.",
        mobileToolNotice: "No celular, esta ferramenta funciona melhor em tela cheia. Use o botão ao lado para abrir em nova aba.",
        optionalImage: "Imagem opcional",
        optionalImageHint: "Coloque uma foto em img/ e edite o campo image no data/site-data.js",
        helpAria: "Ajuda das ferramentas",
        toolsHelpTitle: "Ajuda das ferramentas",
        toolsHelpSummary: "Fluxo recomendado, entradas esperadas, exemplos e erros comuns para usar as ferramentas do Portal EVB.",
        guideAria: "Guias de orientações e procedimentos",
        guideSummary: "Sumário",
        guideImagePlaceholder: "Espaço para foto da etapa",
        expectedInput: "Entrada esperada",
        stepByStep: "Passo a passo",
        commonErrors: "Erros comuns",
        instagramAria: "Instagram do Herbário Evaldo Buttura",
        instagramTitle: "Herbário Evaldo Buttura no Instagram",
        instagramFallback: "Acompanhe as novidades do herbário pelo Instagram.",
        openProfile: "Abrir perfil",
        qrCaption: "Aponte a câmera do celular para acessar o perfil.",
        qrAlt: "QR Code do Instagram",
        instagramPost: "Publicação",
        viewOnInstagram: "Ver no Instagram",
        mapTitle: "Mapa",
        repositoryAria: "Repositório de trabalhos",
        search: "Buscar",
        titleOrAuthor: "Título ou autor",
        year: "Ano",
        all: "Todos",
        type: "Tipo",
        publication: "Publicação",
        abstract: "Resumo",
        externalLink: "Link externo",
        noRepositoryResults: "Nenhum trabalho encontrado para os filtros selecionados.",
        servicesAria: "Orientações e procedimentos do herbário",
        infoFallback: "Informação",
        teamAria: "Equipe do Herbário Evaldo Buttura",
        photoAlt: "Foto do herbário",
        showPhoto: "Mostrar foto",
        galleryAria: "Galeria de fotos do herbário",
        gallery: "Galeria",
        galleryTitle: "Fotos do herbário",
        previousPhoto: "Foto anterior",
        nextPhoto: "Próxima foto",
        footerCredit: "Desenvolvido por Marlon Royer de Morais"
    },
    en: {
        ready: "Ready",
        tools: "Tools",
        information: "Information",
        tool: "Tool",
        selectedTool: "Selected tool",
        openTool: "Open tool",
        moreAbout: "More about",
        lessAbout: "Collapse",
        openToolNewTab: "Open tool in a new tab",
        acceptedFiles: "Accepted files",
        generatedOutput: "Generated output",
        defaultExample: "Download example",
        defaultStatus: "In use",
        defaultAcceptedFiles: "Files defined according to the tool workflow.",
        defaultOutput: "Output processed by the selected tool.",
        dataConfig: "Configuration",
        dataErrorTitle: "Data file not loaded",
        dataErrorBody: "The portal could not load the <strong>data/site-data.js</strong> file. Check whether the <strong>data</strong> folder was uploaded with the site and whether the path is correct.",
        homeEyebrow: "Integrated environment",
        homeTitle: "Choose a tool to begin",
        homeSummary: "This portal organizes EVB programs in a common interface, with standardized navigation and a workspace that adapts to the screen.",
        mobileToolNotice: "On mobile, this tool works better in full screen. Use the button beside it to open it in a new tab.",
        optionalImage: "Optional image",
        optionalImageHint: "Place an image in img/ and edit the image field in data/site-data.js",
        helpAria: "Tool help",
        toolsHelpTitle: "Tool help",
        toolsHelpSummary: "Recommended workflow, expected inputs, examples and common errors for using the EVB Portal tools.",
        guideAria: "Guidelines and procedure guides",
        guideSummary: "Summary",
        guideImagePlaceholder: "Space for a step photo",
        expectedInput: "Expected input",
        stepByStep: "Step by step",
        commonErrors: "Common errors",
        instagramAria: "Herbário Evaldo Buttura Instagram",
        instagramTitle: "Herbário Evaldo Buttura on Instagram",
        instagramFallback: "Follow herbarium updates on Instagram.",
        openProfile: "Open profile",
        qrCaption: "Point your phone camera at the QR Code to access the profile.",
        qrAlt: "Instagram QR Code",
        instagramPost: "Post",
        viewOnInstagram: "View on Instagram",
        mapTitle: "Map",
        repositoryAria: "Works repository",
        search: "Search",
        titleOrAuthor: "Title or author",
        year: "Year",
        all: "All",
        type: "Type",
        publication: "Publication",
        abstract: "Abstract",
        externalLink: "External link",
        noRepositoryResults: "No work found for the selected filters.",
        servicesAria: "Herbarium guidelines and procedures",
        infoFallback: "Information",
        teamAria: "Herbário Evaldo Buttura team",
        photoAlt: "Herbarium photo",
        showPhoto: "Show photo",
        galleryAria: "Herbarium photo gallery",
        gallery: "Gallery",
        galleryTitle: "Herbarium photos",
        previousPhoto: "Previous photo",
        nextPhoto: "Next photo",
        footerCredit: "Developed by Marlon Royer de Morais"
    },
    es: {
        ready: "Listo",
        tools: "Herramientas",
        information: "Información",
        tool: "Herramienta",
        selectedTool: "Herramienta seleccionada",
        openTool: "Abrir herramienta",
        moreAbout: "Más sobre",
        lessAbout: "Contraer",
        openToolNewTab: "Abrir herramienta en una nueva pestaña",
        acceptedFiles: "Archivos aceptados",
        generatedOutput: "Resultado generado",
        defaultExample: "Descargar ejemplo",
        defaultStatus: "En uso",
        defaultAcceptedFiles: "Archivos definidos según el flujo de trabajo de la herramienta.",
        defaultOutput: "Resultado procesado por la herramienta seleccionada.",
        dataConfig: "Configuración",
        dataErrorTitle: "Archivo de datos no cargado",
        dataErrorBody: "El portal no pudo cargar el archivo <strong>data/site-data.js</strong>. Verifique si la carpeta <strong>data</strong> fue enviada junto con el sitio y si la ruta es correcta.",
        homeEyebrow: "Ambiente integrado",
        homeTitle: "Elija una herramienta para comenzar",
        homeSummary: "Este portal organiza los programas del EVB en una interfaz común, con navegación estandarizada y un espacio de trabajo adaptable a la pantalla.",
        mobileToolNotice: "En celular, esta herramienta funciona mejor en pantalla completa. Use el botón al lado para abrirla en una nueva pestaña.",
        optionalImage: "Imagen opcional",
        optionalImageHint: "Coloque una imagen en img/ y edite el campo image en data/site-data.js",
        helpAria: "Ayuda de las herramientas",
        toolsHelpTitle: "Ayuda de las herramientas",
        toolsHelpSummary: "Flujo recomendado, entradas esperadas, ejemplos y errores comunes para usar las herramientas del Portal EVB.",
        guideAria: "Guías de orientaciones y procedimientos",
        guideSummary: "Sumario",
        guideImagePlaceholder: "Espacio para foto de la etapa",
        expectedInput: "Entrada esperada",
        stepByStep: "Paso a paso",
        commonErrors: "Errores comunes",
        instagramAria: "Instagram del Herbário Evaldo Buttura",
        instagramTitle: "Herbário Evaldo Buttura en Instagram",
        instagramFallback: "Acompañe las novedades del herbario en Instagram.",
        openProfile: "Abrir perfil",
        qrCaption: "Apunte la cámara del celular al QR Code para acceder al perfil.",
        qrAlt: "QR Code de Instagram",
        instagramPost: "Publicación",
        viewOnInstagram: "Ver en Instagram",
        mapTitle: "Mapa",
        repositoryAria: "Repositorio de trabajos",
        search: "Buscar",
        titleOrAuthor: "Título o autor",
        year: "Año",
        all: "Todos",
        type: "Tipo",
        publication: "Publicación",
        abstract: "Resumen",
        externalLink: "Enlace externo",
        noRepositoryResults: "No se encontraron trabajos para los filtros seleccionados.",
        servicesAria: "Orientaciones y procedimientos del herbario",
        infoFallback: "Información",
        teamAria: "Equipo del Herbário Evaldo Buttura",
        photoAlt: "Foto del herbario",
        showPhoto: "Mostrar foto",
        galleryAria: "Galería de fotos del herbario",
        gallery: "Galería",
        galleryTitle: "Fotos del herbario",
        previousPhoto: "Foto anterior",
        nextPhoto: "Siguiente foto",
        footerCredit: "Desarrollado por Marlon Royer de Morais"
    }
};
let currentLanguage = getInitialLanguage();
let tools = [];
let infoPages = [];
let toolHelpData = {};

const elements = {
    infoNavList: document.getElementById("infoNavList"),
    navList: document.getElementById("toolNavList"),
    toolCards: document.getElementById("toolCards"),
    toolHelpPanel: document.getElementById("toolHelpPanel"),
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
    currentYear: document.getElementById("currentYear"),
    languageSwitcher: document.getElementById("languageSwitcher"),
    homeEyebrow: document.getElementById("homeEyebrow"),
    homeTitle: document.getElementById("homeTitle"),
    homeSummary: document.getElementById("homeSummary"),
    mobileToolNotice: document.querySelector(".mobile-tool-notice"),
    footerCredit: document.getElementById("footerCredit")
};

let activeTool = null;
let carouselAutoplayTimer = null;

document.addEventListener("DOMContentLoaded", () => {
    refreshLocalizedData();
    if (!validateSiteData()) return;

    renderLanguageSwitcher();
    renderStaticText();
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

function getInitialLanguage() {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage && (storedLanguage === "pt" || localizedData[storedLanguage])) return storedLanguage;
    return "pt";
}

function t(key) {
    return (uiText[currentLanguage] && uiText[currentLanguage][key]) || uiText.pt[key] || key;
}

function refreshLocalizedData() {
    const languageData = localizedData[currentLanguage] || {};
    tools = mergeLocalizedArray(baseTools, languageData.tools || []);
    const photoGallery = mergeLocalizedArray(siteData.photoGallery || [], languageData.photoGallery || [], "src");
    const teamMembers = mergeLocalizedArray(siteData.teamMembers || [], languageData.teamMembers || [], "name");
    const repositoryItems = mergeLocalizedArray(siteData.repositoryItems || [], languageData.repositoryItems || [], "title");
    const serviceItems = mergeLocalizedArray(siteData.serviceItems || [], languageData.serviceItems || [], "title");
    const orientationGuides = mergeLocalizedArray(siteData.orientationGuides || [], languageData.orientationGuides || [], "id");
    const instagramInfo = mergeLocalizedObject(siteData.instagramInfo || {}, languageData.instagramInfo || {});
    if (siteData.instagramInfo?.posts || languageData.instagramInfo?.posts) {
        instagramInfo.posts = mergeLocalizedArray(siteData.instagramInfo?.posts || [], languageData.instagramInfo?.posts || [], "title");
    }
    const toolHelp = localizeToolHelp(siteData.toolHelp || {}, languageData.toolHelp || {});
    toolHelpData = toolHelp;

    infoPages = mergeLocalizedArray(baseInfoPages, languageData.infoPages || []).map(page => {
        const nextPage = { ...page };
        if (nextPage.gallery) nextPage.gallery = photoGallery;
        if (nextPage.team) nextPage.team = teamMembers;
        if (nextPage.repository) nextPage.repository = repositoryItems;
        if (nextPage.services) nextPage.services = serviceItems;
        if (nextPage.guides) nextPage.guides = orientationGuides;
        if (nextPage.instagram) nextPage.instagram = instagramInfo;
        if (nextPage.help) nextPage.help = toolHelp;
        return nextPage;
    }).filter(page => page.id !== "ajuda");
}

function mergeLocalizedArray(baseArray, localizedArray, key = "id") {
    const translations = new Map((localizedArray || []).map(item => [item[key], item]));
    return (baseArray || []).map((item, index) => {
        const translatedItem = translations.get(item[key]) || localizedArray[index] || {};
        return mergeLocalizedObject(item, translatedItem);
    });
}

function mergeLocalizedObject(baseObject, localizedObject) {
    const merged = { ...baseObject, ...localizedObject };
    Object.entries(baseObject || {}).forEach(([key, value]) => {
        if (Array.isArray(value) && !Object.prototype.hasOwnProperty.call(localizedObject, key)) {
            merged[key] = value;
        }
    });
    return merged;
}

function localizeToolHelp(baseHelp, translatedHelp) {
    const translatedGuides = new Map((translatedHelp.tools || []).map(item => [item.toolId, item]));
    return {
        ...baseHelp,
        ...translatedHelp,
        flow: translatedHelp.flow || baseHelp.flow || [],
        tools: (baseHelp.tools || []).map(item => mergeLocalizedObject(item, translatedGuides.get(item.toolId) || {}))
    };
}

function renderLanguageSwitcher() {
    if (!elements.languageSwitcher) return;
    elements.languageSwitcher.innerHTML = Object.entries(languages).map(([code, label]) => `
        <button class="language-button${currentLanguage === code ? " is-active" : ""}" type="button" data-language="${escapeHTML(code)}" aria-pressed="${currentLanguage === code ? "true" : "false"}">
            <span class="language-flag language-flag--${escapeHTML(code)}" aria-hidden="true"></span>
            <span class="language-code">${escapeHTML(label)}</span>
        </button>
    `).join("");
    elements.languageSwitcher.querySelectorAll("[data-language]").forEach(button => {
        button.addEventListener("click", () => setLanguage(button.dataset.language));
    });
}

function setLanguage(language) {
    if (language === currentLanguage || (language !== "pt" && !localizedData[language])) return;
    currentLanguage = language;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    refreshLocalizedData();
    renderStaticText();
    renderLanguageSwitcher();
    renderInfoTabs();
    renderNavigation();
    renderToolCards();
    routeFromHash();
}

function renderStaticText() {
    document.documentElement.lang = currentLanguage === "en" ? "en" : currentLanguage === "es" ? "es" : "pt-BR";
    document.title = currentLanguage === "en" ? "EVB Portal - Digital Tools" : currentLanguage === "es" ? "Portal EVB - Herramientas Digitales" : "Portal EVB - Ferramentas Digitais";
    if (elements.homeEyebrow) elements.homeEyebrow.textContent = t("homeEyebrow");
    if (elements.homeTitle) elements.homeTitle.textContent = t("homeTitle");
    if (elements.homeSummary) elements.homeSummary.textContent = t("homeSummary");
    if (elements.mobileToolNotice) elements.mobileToolNotice.textContent = t("mobileToolNotice");
    if (elements.footerCredit) elements.footerCredit.textContent = t("footerCredit");
    elements.openToolButton.title = t("openToolNewTab");
    elements.openToolButton.setAttribute("aria-label", t("openToolNewTab"));
}

function validateSiteData() {
    if (tools.length > 0 && infoPages.length > 0) return true;

    elements.homeView.hidden = true;
    elements.infoView.hidden = false;
    elements.toolView.hidden = true;
    elements.infoPageContainer.innerHTML = `
        <article class="info-page info-page--error">
            <div class="info-copy">
                <p class="eyebrow">${escapeHTML(t("dataConfig"))}</p>
                <h2>${escapeHTML(t("dataErrorTitle"))}</h2>
                <div class="info-body">
                    <p>${t("dataErrorBody")}</p>
                </div>
            </div>
        </article>
    `;
    return false;
}

function renderInfoTabs() {
    elements.infoNavList.innerHTML = "";
    const fragment = document.createDocumentFragment();
    let toolsTabAdded = false;

    const appendToolsTab = () => {
        if (toolsTabAdded) return;
        const toolsTab = document.createElement("button");
        toolsTab.className = "tab-button";
        toolsTab.type = "button";
        toolsTab.dataset.target = "tools";
        toolsTab.textContent = t("tools");
        toolsTab.addEventListener("click", () => navigateTo("home"));
        fragment.appendChild(toolsTab);
        toolsTabAdded = true;
    };

    infoPages.forEach(page => {
        if (page.id === "ajuda") appendToolsTab();

        const button = document.createElement("button");
        button.className = "tab-button";
        button.type = "button";
        button.dataset.target = page.id;
        button.textContent = page.label;
        button.addEventListener("click", () => navigateToInfo(page.id));
        fragment.appendChild(button);
    });

    appendToolsTab();

    elements.infoNavList.appendChild(fragment);
}

function renderNavigation() {
    elements.navList.innerHTML = "";
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
    elements.toolCards.innerHTML = "";
    if (elements.toolHelpPanel) elements.toolHelpPanel.innerHTML = "";
    const fragment = document.createDocumentFragment();

    tools.forEach(tool => {
        const card = document.createElement("article");
        card.className = "tool-card";
        const statusClass = normalizeStatusClass(tool.status);
        const exampleButton = tool.exampleUrl
            ? `<a class="tool-example-link" href="${escapeHTML(tool.exampleUrl)}" download>${escapeHTML(tool.exampleLabel || t("defaultExample"))}</a>`
            : "";
        const longDescription = tool.longDescriptionHtml
            ? `
                <button class="tool-more-button" type="button" aria-expanded="false">
                    <span data-more-label>${escapeHTML(t("moreAbout"))}</span>
                    <span aria-hidden="true">+</span>
                </button>
                <div class="tool-long-description" hidden>
                    ${tool.longDescriptionHtml}
                </div>
            `
            : "";
        card.innerHTML = `
            <span class="tool-card-topline">
                <span class="category">${tool.category}</span>
                <span class="tool-status-badge ${statusClass}">${tool.status || t("defaultStatus")}</span>
            </span>
            <span class="tool-card-heading">
                <h3>${tool.name}</h3>
                <span class="tool-version">v${tool.version || "2.0"}</span>
            </span>
            <p>${tool.description}</p>
            <span class="tool-details">
                <span>
                    <strong>${escapeHTML(t("acceptedFiles"))}</strong>
                    <small>${tool.accepts || t("defaultAcceptedFiles")}</small>
                </span>
                <span>
                    <strong>${escapeHTML(t("generatedOutput"))}</strong>
                    <small>${tool.output || t("defaultOutput")}</small>
                </span>
            </span>
            ${longDescription}
            <span class="tool-card-footer">
                <button class="tool-open-inline" type="button">
                    <span class="open-label">${escapeHTML(t("openTool"))}</span>
                    <span aria-hidden="true">&rarr;</span>
                </button>
                ${exampleButton}
            </span>
        `;
        card.querySelector(".tool-open-inline").addEventListener("click", () => navigateTo(tool.id));
        const moreButton = card.querySelector(".tool-more-button");
        if (moreButton) {
            moreButton.addEventListener("click", () => toggleToolCardDetails(card, moreButton));
        }
        fragment.appendChild(card);
    });

    elements.toolCards.appendChild(fragment);
    if (elements.toolHelpPanel) {
        elements.toolHelpPanel.innerHTML = `
            <section class="tools-help-block">
                <div class="tools-help-heading">
                    <p class="eyebrow">${escapeHTML(t("tools"))}</p>
                    <h2>${escapeHTML(t("toolsHelpTitle"))}</h2>
                    <p>${escapeHTML(t("toolsHelpSummary"))}</p>
                </div>
                ${buildHelpHTML(toolHelpData)}
            </section>
        `;
    }
}

function toggleToolCardDetails(card, button) {
    const details = card.querySelector(".tool-long-description");
    const label = button.querySelector("[data-more-label]");
    const icon = button.querySelector("[aria-hidden='true']");
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));
    card.classList.toggle("is-expanded", !isExpanded);
    if (details) details.hidden = isExpanded;
    if (label) label.textContent = isExpanded ? t("moreAbout") : t("lessAbout");
    if (icon) icon.textContent = isExpanded ? "+" : "-";
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
        if (pageId === "ajuda") {
            showHome();
            return;
        }
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
    elements.pageTitle.textContent = t("tools");
    elements.toolStatus.textContent = t("tools");
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
    elements.toolStatus.textContent = t("information");
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
    const guides = buildOrientationGuidesHTML(page.guides || []);
    const instagram = buildInstagramHTML(page.instagram);
    const help = buildHelpHTML(page.help);
    const mediaGallery = buildPhotoCarouselHTML(page.gallery || [], { compact: true });
    const image = page.image
        ? `<img class="info-image${imageMode}" src="${escapeHTML(page.image)}" alt="${escapeHTML(page.imageAlt || page.title)}">`
        : `<div class="info-image-placeholder">${escapeHTML(t("optionalImage"))}<br><span>${escapeHTML(t("optionalImageHint"))}</span></div>`;
    const media = team || map || repository || guides || services || instagram || help || mediaGallery || image;
    const action = page.actionLabel
        ? `<a class="info-action ${page.actionUrl ? "" : "is-disabled"}" href="${escapeHTML(page.actionUrl || "#")}" target="_blank" rel="noopener noreferrer">${escapeHTML(page.actionLabel)}</a>`
        : "";
    const pageClass = [
        team ? "info-page--with-team" : "",
        map ? "info-page--with-map" : "",
        repository ? "info-page--with-repository" : "",
        guides ? "info-page--with-guides" : "",
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

function buildOrientationGuidesHTML(guides) {
    if (!guides || guides.length === 0) return "";

    return `
        <section class="orientation-guides" aria-label="${escapeHTML(t("guideAria"))}">
            ${guides.map((guide, guideIndex) => {
                const sections = Array.isArray(guide.sections) ? guide.sections : [];
                return `
                    <details class="orientation-guide" ${guideIndex === 0 ? "open" : ""}>
                        <summary>
                            <span>
                                <small>${escapeHTML(guide.status || t("infoFallback"))}</small>
                                <strong>${escapeHTML(guide.title || "")}</strong>
                            </span>
                            <em>${escapeHTML(guide.summary || "")}</em>
                        </summary>
                        <div class="orientation-guide-content">
                            ${sections.length ? `
                                <nav class="orientation-summary" aria-label="${escapeHTML(t("guideSummary"))}">
                                    <strong>${escapeHTML(t("guideSummary"))}</strong>
                                    <ol>
                                        ${sections.map((section, sectionIndex) => `
                                            <li><a href="#${escapeHTML(buildGuideSectionId(guide, sectionIndex))}">${escapeHTML(section.title || "")}</a></li>
                                        `).join("")}
                                    </ol>
                                </nav>
                            ` : ""}
                            <div class="orientation-chapters">
                                ${sections.map((section, sectionIndex) => buildOrientationSectionHTML(guide, section, sectionIndex)).join("")}
                            </div>
                            ${guide.actionUrl ? `<a class="service-action orientation-action" href="${escapeHTML(guide.actionUrl)}" download>${escapeHTML(guide.actionLabel || t("defaultExample"))}</a>` : ""}
                        </div>
                    </details>
                `;
            }).join("")}
        </section>
    `;
}

function buildOrientationSectionHTML(guide, section, sectionIndex) {
    const paragraphs = Array.isArray(section.body) ? section.body : [];
    const bullets = Array.isArray(section.items) ? section.items : [];
    const image = section.image
        ? `<figure class="orientation-image"><img src="${escapeHTML(section.image)}" alt="${escapeHTML(section.imageAlt || section.title || "")}">${section.caption ? `<figcaption>${escapeHTML(section.caption)}</figcaption>` : ""}</figure>`
        : `<div class="orientation-image-placeholder">${escapeHTML(t("guideImagePlaceholder"))}</div>`;

    return `
        <article id="${escapeHTML(buildGuideSectionId(guide, sectionIndex))}" class="orientation-chapter">
            <div class="orientation-chapter-copy">
                <span class="orientation-step">${String(sectionIndex + 1).padStart(2, "0")}</span>
                <h3>${escapeHTML(section.title || "")}</h3>
                ${paragraphs.map(text => `<p>${escapeHTML(text)}</p>`).join("")}
                ${bullets.length ? `<ul>${bullets.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>` : ""}
            </div>
            ${image}
        </article>
    `;
}

function buildGuideSectionId(guide, index) {
    return `orientacao-${normalizeStatusClass(guide.id || guide.title || "guia")}-${index + 1}`;
}

function buildHelpHTML(help) {
    if (!help) return "";

    const flow = Array.isArray(help.flow) ? help.flow : [];
    const guides = Array.isArray(help.tools) ? help.tools : [];

    return `
        <section class="help-panel" aria-label="${escapeHTML(t("helpAria"))}">
            ${flow.length ? `
                <div class="help-flow">
                    ${flow.map(item => `
                        <article class="help-step">
                            <span>${escapeHTML(item.step || "")}</span>
                            <div>
                                <p>${escapeHTML(item.tool || t("tool"))}</p>
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
                                <span>${escapeHTML(tool.category || t("tool"))}</span>
                                <strong>${escapeHTML(tool.name || item.toolId || t("tool"))}</strong>
                            </div>
                            <div class="help-card-section">
                                <h4>${escapeHTML(t("expectedInput"))}</h4>
                                <p>${escapeHTML(item.expectedInput || "")}</p>
                            </div>
                            <div class="help-card-section">
                                <h4>${escapeHTML(t("stepByStep"))}</h4>
                                <ol>
                                    ${(item.steps || []).map(step => `<li>${escapeHTML(step)}</li>`).join("")}
                                </ol>
                            </div>
                            <div class="help-card-section">
                                <h4>${escapeHTML(t("commonErrors"))}</h4>
                                <ul>
                                    ${(item.commonErrors || []).map(error => `<li>${escapeHTML(error)}</li>`).join("")}
                                </ul>
                            </div>
                            ${item.exampleUrl ? `<a class="help-download" href="${escapeHTML(item.exampleUrl)}" download>${escapeHTML(item.exampleLabel || t("defaultExample"))}</a>` : ""}
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
        <section class="instagram-panel" aria-label="${escapeHTML(t("instagramAria"))}">
            <div class="instagram-main">
                <div>
                    <span class="instagram-handle">${escapeHTML(info.handle || "@herbario.unila")}</span>
                    <h3>${escapeHTML(t("instagramTitle"))}</h3>
                    <p>${escapeHTML(info.callout || t("instagramFallback"))}</p>
                    <a class="instagram-button" href="${escapeHTML(info.profileUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t("openProfile"))}</a>
                </div>
                <figure class="instagram-qr">
                    <img src="${escapeHTML(info.qrCodeUrl || "")}" alt="${escapeHTML(info.qrCodeAlt || t("qrAlt"))}">
                    <figcaption>${escapeHTML(t("qrCaption"))}</figcaption>
                </figure>
            </div>
            ${posts.length ? `
                <div class="instagram-posts">
                    ${posts.map(post => `
                        <article class="instagram-post">
                            <span>${escapeHTML(post.tag || "Instagram")}</span>
                            <h4>${escapeHTML(post.title || t("instagramPost"))}</h4>
                            <p>${escapeHTML(post.text || "")}</p>
                            ${post.link ? `<a href="${escapeHTML(post.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t("viewOnInstagram"))}</a>` : ""}
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
                title="${escapeHTML(map.title || t("mapTitle"))}"
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
    const locale = currentLanguage === "en" ? "en" : "pt-BR";
    const types = [...new Set(sortedItems.map(item => item.type).filter(Boolean))].sort((first, second) => first.localeCompare(second, locale));

    return `
        <section class="repository-panel" aria-label="${escapeHTML(t("repositoryAria"))}">
            <div class="repository-filters" aria-label="Filtros do repositório">
                <label>
                    <span>${escapeHTML(t("search"))}</span>
                    <input type="search" data-repository-search placeholder="${escapeHTML(t("titleOrAuthor"))}">
                </label>
                <label>
                    <span>${escapeHTML(t("year"))}</span>
                    <select data-repository-year>
                        <option value="">${escapeHTML(t("all"))}</option>
                        ${years.map(year => `<option value="${escapeHTML(year)}">${escapeHTML(year)}</option>`).join("")}
                    </select>
                </label>
                <label>
                    <span>${escapeHTML(t("type"))}</span>
                    <select data-repository-type>
                        <option value="">${escapeHTML(t("all"))}</option>
                        ${types.map(type => `<option value="${escapeHTML(type)}">${escapeHTML(type)}</option>`).join("")}
                    </select>
                </label>
            </div>
            <div class="repository-list">
            ${sortedItems.map(item => `
                <article class="repository-item" data-repository-item data-year="${escapeHTML(item.year || "")}" data-type="${escapeHTML(item.type || "")}" data-search="${escapeHTML(`${item.title || ""} ${item.author || ""}`.toLowerCase())}">
                    <div class="repository-year">${escapeHTML(item.year || "s/d")}</div>
                    <div class="repository-content">
                        <p class="repository-meta">${escapeHTML(item.type || t("publication"))}</p>
                        <h3>${escapeHTML(item.title)}</h3>
                        <p>${escapeHTML(item.author)}</p>
                        <div class="repository-actions">
                            ${buildRepositoryLinkHTML("PDF", item.pdfUrl || item.url)}
                            ${buildRepositoryLinkHTML(t("abstract"), item.abstractUrl)}
                            ${buildRepositoryLinkHTML(t("externalLink"), item.externalUrl)}
                        </div>
                    </div>
                </article>
            `).join("")}
            </div>
            <p class="repository-empty" data-repository-empty hidden>${escapeHTML(t("noRepositoryResults"))}</p>
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
        <section class="services-list" aria-label="${escapeHTML(t("servicesAria"))}">
            ${items.map(item => `
                <article class="service-item">
                    <span class="service-status">${escapeHTML(item.status || t("infoFallback"))}</span>
                    <h3>${escapeHTML(item.title)}</h3>
                    <p>${escapeHTML(item.description)}</p>
                    ${item.actionUrl ? `<a class="service-action" href="${escapeHTML(item.actionUrl)}" download>${escapeHTML(item.actionLabel || t("defaultExample"))}</a>` : ""}
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
        <section class="team-section" aria-label="${escapeHTML(t("teamAria"))}">
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
            <img class="team-photo" src="${escapeHTML(member.photo)}" alt="${escapeHTML(t("photoAlt"))}: ${escapeHTML(member.name)}">
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
            <img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt || photo.caption || t("photoAlt"))}">
            ${photo.caption ? `<figcaption>${formatCaptionHTML(photo.caption)}</figcaption>` : ""}
        </figure>
    `).join("");

    const dots = photos.map((_, index) => `
        <button class="carousel-dot${index === 0 ? " is-active" : ""}" type="button" data-carousel-index="${index}" aria-label="${escapeHTML(t("showPhoto"))} ${index + 1}"></button>
    `).join("");

    return `
        <section class="photo-carousel${compactClass}" data-active-index="0" aria-label="${escapeHTML(t("galleryAria"))}">
            <div class="carousel-header">
                <div>
                    <p class="eyebrow">${escapeHTML(t("gallery"))}</p>
                    <h3>${escapeHTML(t("galleryTitle"))}</h3>
                </div>
                <div class="carousel-controls">
                    <button class="carousel-button" type="button" data-carousel-prev aria-label="${escapeHTML(t("previousPhoto"))}">‹</button>
                    <button class="carousel-button" type="button" data-carousel-next aria-label="${escapeHTML(t("nextPhoto"))}">›</button>
                </div>
            </div>
            <div class="carousel-track">${slides}</div>
            <div class="carousel-dots">${dots}</div>
        </section>
    `;
}

function handleInfoPageClick(event) {
    const summaryLink = event.target.closest(".orientation-summary a[href^='#']");
    if (summaryLink) {
        event.preventDefault();
        const target = elements.infoPageContainer.querySelector(summaryLink.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }

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
