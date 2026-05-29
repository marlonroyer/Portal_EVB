let dadosCompletos = [];
let dadosFiltrados = [];

// Carregar CSV
document.getElementById('csvFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            delimiter: ",",
            skipEmptyLines: true,
            complete: function(results) {
                if (results.errors.length > 0) {
                    console.error("Erros ao processar o CSV:", results.errors);
                    alert("Erro ao processar o CSV. Verifique o console.");
                } else {
                    dadosCompletos = results.data;
                    console.log(`${dadosCompletos.length} registros carregados.`);
                    alert(`CSV carregado! ${dadosCompletos.length} registros encontrados.`);
                }
            },
            error: function(error) {
                console.error("Erro ao ler o arquivo:", error.message);
                alert("Erro ao ler o arquivo.");
            }
        });
    }
});

// Filtrar por intervalo de IDs
document.getElementById('filtrar').addEventListener('click', function() {
    let idInicio = document.getElementById('idInicio').value.trim();
    let idFim = document.getElementById('idFim').value.trim();
    
    if (!idInicio || !idFim) {
        alert("Informe o ID inicial e final!");
        return;
    }
    
    if (dadosCompletos.length === 0) {
        alert("Carregue um CSV primeiro!");
        return;
    }
    
    // Adiciona o prefixo CX- automaticamente se o usuário digitar apenas números
    if (!idInicio.toUpperCase().startsWith('CX-')) {
        idInicio = 'CX-' + idInicio.padStart(3, '0'); // Garante 3 dígitos
    }
    
    if (!idFim.toUpperCase().startsWith('CX-')) {
        idFim = 'CX-' + idFim.padStart(3, '0'); // Garante 3 dígitos
    }
    
    console.log(`Filtrando de ${idInicio} até ${idFim}`);
    
    dadosFiltrados = dadosCompletos.filter(row => {
        const id = row.ID || row.id || row.Id || "";
        return id >= idInicio && id <= idFim;
    });
    
    if (dadosFiltrados.length === 0) {
        alert(`Nenhum registro encontrado entre ${idInicio} e ${idFim}`);
    } else {
        console.log(`Filtrados: ${dadosFiltrados.length} etiquetas`);
        criarEtiquetas(dadosFiltrados);
    }
});

// Criar etiquetas no DOM
function criarEtiquetas(dados) {
    const container = document.getElementById('etiquetas-container');
    container.innerHTML = '';
    
    dados.forEach((row, index) => {
        const codigo = row.Código || row.Codigo || ""; // Ainda pegamos mas não exibimos
        const familia = row.Família || row.Familia || "";
        const intervalos = row.Intervalos || "";
        const id = row.ID || row.Id || "";
        
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
    console.log("Gerando PDF...");
    
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
        console.log("Capturando etiqueta...");
        html2canvas(etiqueta, {
            scale: 2,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            console.log("Etiqueta capturada com sucesso.");
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
            console.log("PDF salvo!");
            return;
        }
        
        const etiqueta = etiquetas[index];
        capturarEtiqueta(etiqueta, function(imgData) {
            if (imgData) {
                doc.addImage(imgData, 'PNG', x, y, larguraEtiqueta, alturaEtiqueta);
                console.log(`Etiqueta ${index + 1} adicionada`);
                
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