let dadosCompletos = [];
let dadosFiltrados = [];

// Carregar planilha
document.getElementById('csvFile').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (file) {
        try {
            dadosCompletos = await carregarPlanilha(file);
            dadosFiltrados = [];
            limparPreview();
            alert(`Planilha carregada! ${dadosCompletos.length} registros encontrados.`);
        } catch (error) {
            console.error("Erro ao ler a planilha:", error);
            alert(error.message || "Erro ao ler a planilha.");
        }
    }
});

async function carregarPlanilha(file) {
    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'csv') {
        return carregarCSV(file);
    }

    if (extension === 'xls' || extension === 'xlsx') {
        return carregarExcel(file);
    }

    throw new Error("Formato não aceito. Use .xls, .xlsx ou .csv.");
}

function carregarCSV(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            delimiter: "",
            skipEmptyLines: true,
            complete: function(results) {
                if (results.errors.length > 0) {
                    console.error("Erros ao processar o CSV:", results.errors);
                    reject(new Error("Erro ao processar o CSV. Verifique se a planilha possui cabeçalho."));
                    return;
                }

                resolve(limparLinhasVazias(results.data));
            },
            error: function(error) {
                reject(new Error("Erro ao ler o arquivo CSV: " + error.message));
            }
        });
    });
}

function carregarExcel(file) {
    if (!window.XLSX) {
        throw new Error("A biblioteca de leitura de Excel não foi carregada.");
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            try {
                const workbook = XLSX.read(event.target.result, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];

                if (!firstSheetName) {
                    reject(new Error("A planilha não possui abas."));
                    return;
                }

                const worksheet = workbook.Sheets[firstSheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
                resolve(limparLinhasVazias(rows));
            } catch (error) {
                reject(new Error("Erro ao processar Excel. Verifique se o arquivo está íntegro."));
            }
        };

        reader.onerror = function() {
            reject(new Error("Erro ao ler o arquivo Excel."));
        };

        reader.readAsArrayBuffer(file);
    });
}

function limparLinhasVazias(rows) {
    return rows.filter(row => Object.values(row).some(value => String(value ?? "").trim() !== ""));
}

// Filtrar por caixas especificas ou intervalo de IDs
document.getElementById('filtrar').addEventListener('click', function() {
    const idsEspecificos = parseIdsEspecificos(document.getElementById('idEspecificos').value);
    let idInicio = document.getElementById('idInicio').value.trim();
    let idFim = document.getElementById('idFim').value.trim();
    
    if (dadosCompletos.length === 0) {
        alert("Carregue uma planilha primeiro!");
        return;
    }

    if (idsEspecificos.length > 0) {
        dadosFiltrados = dadosCompletos.filter(row => idsEspecificos.includes(normalizarIdCaixa(getRowId(row))));
        finalizarFiltro(dadosFiltrados, `Nenhum registro encontrado para: ${idsEspecificos.join(', ')}`);
        return;
    }
    
    if (!idInicio && !idFim) {
        alert("Informe uma caixa específica ou um intervalo inicial/final!");
        return;
    }

    if (idInicio && !idFim) {
        const idUnico = normalizarIdCaixa(idInicio);
        dadosFiltrados = dadosCompletos.filter(row => normalizarIdCaixa(getRowId(row)) === idUnico);
        finalizarFiltro(dadosFiltrados, `Nenhum registro encontrado para ${idUnico}`);
        return;
    }

    if (!idInicio || !idFim) {
        alert("Para filtrar por intervalo, informe o ID inicial e final.");
        return;
    }
    
    idInicio = normalizarIdCaixa(idInicio);
    idFim = normalizarIdCaixa(idFim);
    
    dadosFiltrados = dadosCompletos.filter(row => {
        const id = normalizarIdCaixa(getRowId(row));
        return id >= idInicio && id <= idFim;
    });
    
    finalizarFiltro(dadosFiltrados, `Nenhum registro encontrado entre ${idInicio} e ${idFim}`);
});

function parseIdsEspecificos(value) {
    return value
        .split(/[;,]/)
        .map(item => normalizarIdCaixa(item))
        .filter(Boolean);
}

function normalizarIdCaixa(value) {
    const raw = String(value ?? "").trim().toUpperCase();
    if (!raw) return "";

    const numberMatch = raw.match(/\d+/);
    if (!numberMatch) return raw;

    return 'CX-' + numberMatch[0].padStart(3, '0');
}

function getRowId(row) {
    return getCell(row, ['ID', 'Id', 'id', 'Caixa', 'caixa', 'CAIXA']);
}

function getCell(row, names) {
    for (const name of names) {
        if (row[name] !== undefined && row[name] !== null && String(row[name]).trim() !== "") {
            return row[name];
        }
    }

    const normalizedNames = names.map(normalizeColumnName);
    const matchedKey = Object.keys(row).find(key => normalizedNames.includes(normalizeColumnName(key)));
    return matchedKey ? row[matchedKey] : "";
}

function normalizeColumnName(value) {
    return String(value || "")
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();
}

function finalizarFiltro(dados, mensagemVazia) {
    if (dados.length === 0) {
        limparPreview();
        alert(mensagemVazia);
        return;
    }

    criarEtiquetas(dados);
}

function limparPreview() {
    const container = document.getElementById('etiquetas-container');
    const previewCard = document.getElementById('previewCard');
    const emptyPreview = document.getElementById('emptyPreview');
    const etiquetasCount = document.getElementById('etiquetasCount');

    if (container) container.innerHTML = '';
    if (previewCard) previewCard.style.display = 'none';
    if (emptyPreview) emptyPreview.style.display = 'block';
    if (etiquetasCount) etiquetasCount.textContent = '';
}

// Criar etiquetas no DOM
function criarEtiquetas(dados) {
    const container = document.getElementById('etiquetas-container');
    container.innerHTML = '';
    
    dados.forEach((row, index) => {
        const codigo = getCell(row, ['Código', 'Codigo', 'codigo']); // Ainda pegamos mas não exibimos
        const familia = getCell(row, ['Família', 'Familia', 'Famílias', 'Familias', 'Família(s)', 'Familia(s)']);
        const intervalos = getCell(row, ['Intervalos', 'Intervalo', 'Intervalo(s)']);
        const id = getRowId(row);
        
        const etiqueta = document.createElement('div');
        etiqueta.className = 'etiqueta-herbario';
        
        etiqueta.innerHTML = `
            <div class="coluna-familia">
                <div class="cabecalho">
                    <div class="id">ID: ${id}</div>
                </div>
                <div class="titulo-coluna">FAMÍLIA(S)</div>
                <div class="conteudo-familia">${formatarTextoMultiLinha(familia)}</div>
            </div>
            <div class="coluna-intervalos">
                <div class="cabecalho">
                    <div class="id" style="visibility: hidden;">ID: ${id}</div>
                </div>
                <div class="titulo-coluna">INTERVALO(S)</div>
                <div class="conteudo-intervalos">${formatarTextoMultiLinha(intervalos)}</div>
                <img src="LogoEVB.png" alt="Logo" class="logo-canto">
            </div>
        `;
        
        container.appendChild(etiqueta);
        
        // Aplica o ajuste automático de fonte
        ajustarFonteParaConteudo(etiqueta);
    });
}

function formatarTextoMultiLinha(texto) {
    if (!texto) return "—";
    if (texto.includes('<br>') || texto.includes('<')) {
        return texto;
    }
    return texto.replace(/\n/g, '<br>').replace(/\r/g, '');
}

// Gerar PDF
document.getElementById('gerar-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
        console.error("jsPDF não carregado.");
        return;
    }
    
    const etiquetas = document.querySelectorAll('.etiqueta-herbario');
    
    if (etiquetas.length === 0) {
        alert("Nenhuma etiqueta para gerar!");
        return;
    }
    
    const larguraEtiqueta = 140;
    const alturaEtiqueta = 100;
    const margemX = 5;
    const margemY = 5;
    const espacamentoX = 0;
    const espacamentoY = 0;
    
    let doc = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'landscape'
    });
    
    const larguraPagina = doc.internal.pageSize.getWidth();
    const alturaPagina = doc.internal.pageSize.getHeight();
    
    let x = margemX;
    let y = margemY;
    let contador = 0;
    
    function capturarEtiqueta(etiqueta, callback) {
        html2canvas(etiqueta, {
            scale: 2,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/jpg', 0.7);
            callback(imgData);
        }).catch(error => {
            console.error("Erro ao capturar etiqueta:", error);
            callback(null);
        });
    }
    
    function processarEtiqueta(index) {
        if (index >= etiquetas.length) {
            doc.save('etiquetas_herbario.pdf');
            return;
        }
        
        const etiqueta = etiquetas[index];
        capturarEtiqueta(etiqueta, function(imgData) {
            if (imgData) {
                doc.addImage(imgData, 'PNG', x, y, larguraEtiqueta, alturaEtiqueta);
                
                contador++;
                
                if (contador === 2) {
                    contador = 0;
                    x = margemX;
                    y += alturaEtiqueta + espacamentoY;
                    
                    if (y + alturaEtiqueta > alturaPagina - margemY) {
                        doc.addPage();
                        y = margemY;
                        x = margemX;
                        contador = 0;
                    }
                } else {
                    x += larguraEtiqueta + espacamentoX;
                }
            }
            
            processarEtiqueta(index + 1);
        });
    }
    
    processarEtiqueta(0);
});

// Função para ajustar automaticamente o tamanho da fonte
function ajustarFonteParaConteudo(etiqueta) {
    const colunaFamilia = etiqueta.querySelector('.conteudo-familia');
    const colunaIntervalos = etiqueta.querySelector('.conteudo-intervalos');
    
    // Tamanhos de fonte a testar (do maior para o menor)
    const tamanhosFonte = [15, 14, 13, 12, 11, 10, 9, 8];
    
    function precisaReduzir(elemento) {
        // Verifica se o conteúdo ultrapassa a altura do container
        return elemento.scrollHeight > elemento.clientHeight;
    }
    
    function aplicarTamanho(elemento, tamanho) {
        elemento.style.fontSize = tamanho + 'px';
        elemento.style.lineHeight = (tamanho * 1.3) + 'px'; // Ajusta line-height proporcional
    }
    
    // Ajusta a coluna Família
    for (let tamanho of tamanhosFonte) {
        aplicarTamanho(colunaFamilia, tamanho);
        if (!precisaReduzir(colunaFamilia)) {
            break;
        }
    }
    
    // Ajusta a coluna Intervalos
    for (let tamanho of tamanhosFonte) {
        aplicarTamanho(colunaIntervalos, tamanho);
        if (!precisaReduzir(colunaIntervalos)) {
            break;
        }
    }
}

// Melhorias de UI/UX
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar nome do arquivo selecionado
    const csvFileInput = document.getElementById('csvFile');
    const fileSelected = document.getElementById('fileSelected');
    const fileName = document.getElementById('fileName');
    
    csvFileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            fileSelected.style.display = 'flex';
        }
    });
    
    // Mostrar/esconder preview
    const originalFilter = document.getElementById('filtrar').addEventListener('click', function() {
        // Aguarda um pouco para o DOM atualizar
        setTimeout(() => {
            const container = document.getElementById('etiquetas-container');
            const previewCard = document.getElementById('previewCard');
            const emptyPreview = document.getElementById('emptyPreview');
            const etiquetasCount = document.getElementById('etiquetasCount');
            
            if (container.children.length > 0) {
                previewCard.style.display = 'block';
                emptyPreview.style.display = 'none';
                etiquetasCount.textContent = `${container.children.length} etiquetas`;
            } else {
                previewCard.style.display = 'block';
                emptyPreview.style.display = 'block';
                etiquetasCount.textContent = '0 etiquetas';
            }
        }, 100);
    });
});
