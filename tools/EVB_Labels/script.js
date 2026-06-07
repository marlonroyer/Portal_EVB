const DEBUG = false;

const state = {
    imagens: new Map(),
    registros: [],
    planilhaCarregada: false
};

const elements = {
    imagensFile: document.getElementById('imagensFile'),
    excelFile: document.getElementById('excelFile'),
    imagensUploadArea: document.getElementById('imagensUploadArea'),
    excelUploadArea: document.getElementById('excelUploadArea'),
    statusImagens: document.getElementById('status-imagens'),
    statusPlanilha: document.getElementById('status-planilha'),
    previewCard: document.getElementById('previewCard'),
    gerarPdfBtn: document.getElementById('gerar-pdf'),
    etiquetaCount: document.getElementById('etiquetaCount'),
    emptyPreview: document.getElementById('emptyPreview'),
    progressCard: document.getElementById('progressCard'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    progressDetail: document.getElementById('progressDetail'),
    etiquetasContainer: document.getElementById('etiquetas-container')
};

function debugLog(...args) {
    if (DEBUG) console.log(...args);
}

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    hide(elements.previewCard);
    hide(elements.gerarPdfBtn);
    hide(elements.progressCard);

    elements.imagensUploadArea.addEventListener('click', () => elements.imagensFile.click());
    elements.excelUploadArea.addEventListener('click', () => elements.excelFile.click());
    elements.imagensFile.addEventListener('change', handleImagesChange);
    elements.excelFile.addEventListener('change', handleSpreadsheetChange);
    elements.gerarPdfBtn.addEventListener('click', gerarPDF);
}

async function handleImagesChange(event) {
    const files = Array.from(event.target.files || []);
    state.imagens.clear();

    if (files.length === 0) {
        updateStatus(elements.statusImagens, 'Nenhuma imagem selecionada', 'status-pendente');
        atualizarPreview();
        return;
    }

    updateStatus(elements.statusImagens, `Carregando ${files.length} imagens...`, 'status-carregando');

    try {
        const loadedImages = await Promise.all(files.map(readImageFile));
        loadedImages.forEach(({ name, dataUrl }) => {
            state.imagens.set(name, dataUrl);
            state.imagens.set(normalizeFileName(name), dataUrl);
        });

        updateStatus(elements.statusImagens, `${files.length} imagens carregadas`, 'status-sucesso');
        debugLog('Imagens carregadas:', Array.from(state.imagens.keys()));
        atualizarPreview();
    } catch (error) {
        console.error('Erro ao carregar imagens:', error);
        updateStatus(elements.statusImagens, 'Erro ao carregar imagens', 'status-erro');
    }
}

function readImageFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve({ name: file.name, dataUrl: event.target.result });
        reader.onerror = () => reject(new Error(`Erro ao carregar imagem: ${file.name}`));
        reader.readAsDataURL(file);
    });
}

async function handleSpreadsheetChange(event) {
    const file = event.target.files[0];

    if (!file) {
        state.planilhaCarregada = false;
        state.registros = [];
        updateStatus(elements.statusPlanilha, 'Nenhuma planilha selecionada', 'status-pendente');
        atualizarPreview();
        return;
    }

    updateStatus(elements.statusPlanilha, 'Carregando planilha...', 'status-carregando');

    try {
        const data = await readArrayBuffer(file);
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

        if (rows.length === 0) {
            state.planilhaCarregada = false;
            state.registros = [];
            updateStatus(elements.statusPlanilha, 'Planilha vazia', 'status-erro');
            alert('A planilha está vazia.');
            atualizarPreview();
            return;
        }

        state.registros = processarDadosExcel(rows);
        state.planilhaCarregada = true;
        updateStatus(elements.statusPlanilha, `Planilha carregada (${file.name})`, 'status-sucesso');
        atualizarPreview();
    } catch (error) {
        console.error('Erro ao processar o arquivo Excel:', error);
        state.planilhaCarregada = false;
        state.registros = [];
        updateStatus(elements.statusPlanilha, 'Erro ao processar planilha', 'status-erro');
        alert('Erro ao processar o arquivo Excel. Verifique se o arquivo está no formato esperado.');
        atualizarPreview();
    }
}

function readArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.onerror = () => reject(new Error('Erro ao ler arquivo.'));
        reader.readAsArrayBuffer(file);
    });
}

function processarDadosExcel(rows) {
    const cabecalhos = rows[0] || [];
    const mapeamentoColunas = {
        numtombo: encontrarIndice(cabecalhos, ['numtombo']),
        family: encontrarIndice(cabecalhos, ['family']),
        genus: encontrarIndice(cabecalhos, ['genus']),
        sp1: encontrarIndice(cabecalhos, ['sp1']),
        author1: encontrarIndice(cabecalhos, ['author1']),
        detby: encontrarIndice(cabecalhos, ['detby']),
        detdd: encontrarIndice(cabecalhos, ['detdd']),
        detmm: encontrarIndice(cabecalhos, ['detmm']),
        detyy: encontrarIndice(cabecalhos, ['detyy']),
        collector: encontrarIndice(cabecalhos, ['collector']),
        number: encontrarIndice(cabecalhos, ['number']),
        projeto: encontrarIndice(cabecalhos, ['projeto'])
    };

    const colunasFaltantes = Object.entries(mapeamentoColunas)
        .filter(([, indice]) => indice === -1)
        .map(([nome]) => nome);

    if (colunasFaltantes.length > 0) {
        throw new Error(`Colunas não encontradas na planilha: ${colunasFaltantes.join(', ')}`);
    }

    const registros = [];

    for (let i = 1; i < rows.length; i++) {
        const linha = rows[i];
        if (!linha.some(celula => celula !== '' && celula !== null && celula !== undefined)) continue;

        const numtombo = cleanCell(linha[mapeamentoColunas.numtombo]);
        const codigoBarras = getBarcodeFileName(numtombo);

        registros.push({
            evb: numtombo ? `EVB ${numtombo}` : '',
            familia: cleanCell(linha[mapeamentoColunas.family]),
            genero: cleanCell(linha[mapeamentoColunas.genus]),
            epiteto: cleanCell(linha[mapeamentoColunas.sp1]),
            autor: cleanCell(linha[mapeamentoColunas.author1]),
            determinador: cleanCell(linha[mapeamentoColunas.detby]),
            dia: cleanCell(linha[mapeamentoColunas.detdd]),
            mes: cleanCell(linha[mapeamentoColunas.detmm]),
            ano: cleanCell(linha[mapeamentoColunas.detyy]),
            coletor: cleanCell(linha[mapeamentoColunas.collector]),
            numeroColeta: cleanCell(linha[mapeamentoColunas.number]),
            codigoBarras,
            projeto: cleanCell(linha[mapeamentoColunas.projeto])
        });
    }

    if (registros.length === 0) {
        throw new Error('Nenhum dado válido encontrado na planilha.');
    }

    debugLog(`Processados ${registros.length} registros.`);
    return registros;
}

function encontrarIndice(cabecalhos, possiveisNomes) {
    const normalizedHeaders = cabecalhos.map(cabecalho => normalizeHeader(cabecalho));

    for (const nome of possiveisNomes) {
        const exactIndex = normalizedHeaders.indexOf(normalizeHeader(nome));
        if (exactIndex !== -1) return exactIndex;
    }

    for (let i = 0; i < normalizedHeaders.length; i++) {
        for (const nome of possiveisNomes) {
            const normalizedName = normalizeHeader(nome);
            if (normalizedHeaders[i].includes(normalizedName) || normalizedName.includes(normalizedHeaders[i])) {
                debugLog(`Coluna "${cabecalhos[i]}" encontrada como correspondência parcial para "${nome}"`);
                return i;
            }
        }
    }

    return -1;
}

function atualizarPreview() {
    elements.etiquetasContainer.innerHTML = '';

    if (!state.planilhaCarregada || state.registros.length === 0) {
        hide(elements.previewCard);
        hide(elements.gerarPdfBtn);
        show(elements.emptyPreview);
        return;
    }

    const fragment = document.createDocumentFragment();
    state.registros.forEach(registro => fragment.appendChild(criarEtiqueta(registro)));
    elements.etiquetasContainer.appendChild(fragment);

    show(elements.previewCard);
    show(elements.gerarPdfBtn);
    hide(elements.emptyPreview);
    elements.etiquetaCount.textContent = `${state.registros.length} etiqueta${state.registros.length > 1 ? 's' : ''}`;
}

function criarEtiqueta(registro) {
    const etiqueta = document.createElement('div');
    etiqueta.className = 'etiqueta';

    const colunaEsquerda = document.createElement('div');
    colunaEsquerda.className = 'coluna-esquerda';

    appendText(colunaEsquerda, 'div', 'evb', registro.evb);
    appendText(colunaEsquerda, 'div', 'familia', registro.familia);

    const taxon = document.createElement('div');
    taxon.className = 'nome-cientifico';
    appendText(taxon, 'span', 'genero', registro.genero);
    if (registro.genero && registro.epiteto) taxon.appendChild(document.createTextNode(' '));
    appendText(taxon, 'span', 'epiteto', registro.epiteto);
    if ((registro.genero || registro.epiteto) && registro.autor) taxon.appendChild(document.createTextNode(' '));
    appendText(taxon, 'span', 'autor', registro.autor);
    colunaEsquerda.appendChild(taxon);

    appendText(colunaEsquerda, 'div', 'Coletor', registro.coletor ? `Col.: ${registro.coletor}` : '');
    appendText(colunaEsquerda, 'span', 'NumeroColeta', registro.numeroColeta);
    appendText(colunaEsquerda, 'div', 'determinador', registro.determinador ? `Det.: ${registro.determinador}` : '');
    appendText(colunaEsquerda, 'span', 'data', [registro.dia, registro.mes, registro.ano].filter(Boolean).join('/'));
    appendText(colunaEsquerda, 'div', 'projeto', registro.projeto);

    const colunaDireita = document.createElement('div');
    colunaDireita.className = 'coluna-direita';

    const logo = document.createElement('img');
    logo.src = 'LogoEVB.png';
    logo.alt = 'Logo EVB';
    logo.className = 'etiqueta-logo';
    colunaDireita.appendChild(logo);

    if (registro.codigoBarras) {
        const barcode = document.createElement('img');
        barcode.src = getBarcodeImageSource(registro.codigoBarras);
        barcode.alt = 'Código de barras';
        barcode.className = 'codigo-barras';
        barcode.onerror = () => barcode.classList.add('codigo-barras-ausente');
        colunaDireita.appendChild(barcode);
    }

    etiqueta.appendChild(colunaEsquerda);
    etiqueta.appendChild(colunaDireita);
    return etiqueta;
}

async function gerarPDF() {
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) {
        alert('A biblioteca de PDF não foi carregada corretamente.');
        return;
    }

    const etiquetas = Array.from(document.querySelectorAll('.etiqueta'));
    if (etiquetas.length === 0) {
        alert('Nenhuma etiqueta encontrada para exportar.');
        return;
    }

    const doc = new jsPDF('p', 'mm', 'a4');
    const larguraEtiqueta = 105;
    const alturaEtiqueta = 29.7;
    const margemX = 0;
    const margemY = 10;
    const maxEtiquetasPorLinha = 2;

    let x = margemX;
    let y = margemY;

    show(elements.progressCard);
    elements.gerarPdfBtn.disabled = true;
    updateProgress(0, 'Preparando etiquetas...');

    try {
        for (let index = 0; index < etiquetas.length; index++) {
            updateProgress(
                Math.round((index / etiquetas.length) * 100),
                `Processando etiqueta ${index + 1} de ${etiquetas.length}...`
            );

            const canvas = await html2canvas(etiquetas[index], {
                scale: 4,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/png', 1.0);
            doc.addImage(imgData, 'PNG', x, y, larguraEtiqueta, alturaEtiqueta);

            x += larguraEtiqueta;
            if ((index + 1) % maxEtiquetasPorLinha === 0) {
                x = margemX;
                y += alturaEtiqueta;
            }

            if (y + alturaEtiqueta > doc.internal.pageSize.getHeight() - margemY && index < etiquetas.length - 1) {
                doc.addPage();
                x = margemX;
                y = margemY;
            }
        }

        updateProgress(100, 'PDF gerado com sucesso!');
        doc.save('etiquetas.pdf');
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        updateProgress(0, 'Erro ao gerar PDF.');
        alert('Erro ao gerar o PDF. Verifique se todas as imagens foram carregadas corretamente.');
    } finally {
        elements.gerarPdfBtn.disabled = false;
        setTimeout(() => hide(elements.progressCard), 1800);
    }
}

function appendText(parent, tagName, className, value) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = value || '';
    parent.appendChild(element);
    return element;
}

function updateStatus(container, text, className) {
    const statusText = container.querySelector('.status-text');
    statusText.textContent = text;
    container.className = `status-indicator ${className}`;
}

function updateProgress(percent, detail) {
    elements.progressFill.style.width = `${percent}%`;
    elements.progressText.textContent = `${percent}%`;
    elements.progressDetail.textContent = detail;
}

function getBarcodeImageSource(fileName) {
    return state.imagens.get(fileName)
        || state.imagens.get(normalizeFileName(fileName))
        || `codigos_barras/${fileName}`;
}

function getBarcodeFileName(numtombo) {
    if (!numtombo) return '';
    const normalized = String(numtombo).replace(/^EVB/i, '').replace(/\D/g, '');
    return `EVB${normalized.padStart(6, '0')}.png`;
}

function normalizeFileName(fileName) {
    const match = String(fileName).match(/EVB\s*0*(\d+)\.png$/i);
    if (!match) return String(fileName).trim();
    return `EVB${match[1].padStart(6, '0')}.png`;
}

function normalizeHeader(value) {
    return String(value || '').trim().toLowerCase();
}

function cleanCell(value) {
    return String(value ?? '').trim();
}

function show(element) {
    if (element) element.style.display = '';
}

function hide(element) {
    if (element) element.style.display = 'none';
}
