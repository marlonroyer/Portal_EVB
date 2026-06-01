// ============================================================
// CONFIGURAÇÕES EDITÁVEIS DO PORTAL EVB
// ============================================================
// Este é o arquivo principal para atualizar o conteúdo do site.
//
// Aqui você pode:
// 1. Adicionar/remover ferramentas no menu superior.
// 2. Adicionar fotos e legendas no carrossel da aba Início.
// 3. Atualizar integrantes da equipe.
// 4. Adicionar trabalhos na aba Repositório.
// 5. Editar serviços, contatos, links externos e textos das abas.
//
// Dicas importantes:
// - Mantenha vírgula entre os blocos { ... }.
// - Caminhos de imagem são relativos à pasta principal do site.
// - Para fotos, use por exemplo: img/fotos/F9.jpg
// - Nas legendas, use <em>...</em> para nomes científicos em itálico.
// - Se um campo de link não existir, deixe como "".
(() => {

// ============================================================
// FERRAMENTAS DO MENU SUPERIOR
// ============================================================
// Para adicionar uma ferramenta:
// 1. Coloque a pasta da ferramenta dentro de tools/.
// 2. Copie um bloco abaixo.
// 3. Altere id, name, category, description, accepts, output, status, version e path.
//
// Exemplo:
// {
//     id: "minha-ferramenta",
//     name: "Minha Ferramenta",
//     category: "Categoria",
//     description: "Descrição curta da ferramenta.",
//     accepts: "Arquivos aceitos pela ferramenta.",
//     output: "Resultado gerado pela ferramenta.",
//     status: "Estavel",
//     version: "2.0",
//     path: "tools/Minha_Ferramenta/index.html"
// }
const tools = [
    {
        id: "jabot-extract",
        name: "JABOT Extract",
        category: "Códigos de barras",
        description: "Recorta, lê e organiza individualmente os códigos de barras exportados pelo JABOT em PDFs A4 padronizados.",
        accepts: "PDFs A4 gerados pelo JABOT com 44 códigos por página, organizados em 4 colunas e 11 linhas.",
        output: "Arquivo .zip com imagens .png recortadas e nomeadas automaticamente pelo código EVB do exemplar.",
        status: "Estavel",
        version: "2.1",
        path: "tools/Jabot_Extract/index.html",
        exampleLabel: "PDF exemplo",
        exampleUrl: "exemplos/jabot-extract-codigos-barras.pdf"
    },
    {
        id: "evb-labels",
        name: "EVB Labels",
        category: "Etiquetas",
        description: "Gera etiquetas complementares para materiais recebidos por doação, combinando dados da planilha com códigos de barras do JABOT.",
        accepts: "Planilha .xls ou .xlsx do lote e imagens .png dos códigos de barras geradas pelo JABOT Extract.",
        output: "PDF com etiquetas prontas para conferência, impressão, recorte e colagem nas exsicatas.",
        status: "Estavel",
        version: "2.0",
        path: "tools/EVB_Labels/index.html",
        exampleLabel: "Planilha exemplo",
        exampleUrl: "exemplos/evb-labels-dados-etiquetas.xlsx"
    },
    {
        id: "evb-labels-collection",
        name: "EVB Labels Collection",
        category: "Etiquetas",
        description: "Gera etiquetas para caixas da coleção, auxiliando a organização física dos armários, prateleiras e pacotes de exsicatas.",
        accepts: "Planilha-mapa da coleção em .xls, .xlsx ou .csv, com caixas, famílias e intervalos armazenados.",
        output: "PDF com as etiquetas de caixas selecionadas, pronto para impressão e substituição das etiquetas antigas.",
        status: "Estavel",
        version: "2.2",
        path: "tools/EVB_Labels_Collection/index.html",
        exampleLabel: "Planilha exemplo",
        exampleUrl: "exemplos/evb-labels-collection-dados.xlsx"
    },
    {
        id: "analise-botanica",
        name: "Análise Botânica",
        category: "Análise",
        description: "Gera estatísticas descritivas, gráficos, mapas, listas florísticas e cruzamentos auxiliares a partir de planilhas botânicas.",
        accepts: "Planilhas no modelo JABOT ou dados próprios organizados com campos botânicos, taxonômicos, geográficos e curatoriais.",
        output: "Painel analítico com estatísticas, completude, listas por família, mapas, gráficos e relatório textual padronizado.",
        status: "Estavel",
        version: "2.1",
        path: "tools/Analise_Botanica/analise-botanica.html",
        exampleLabel: "Planilha exemplo",
        exampleUrl: "exemplos/evb-labels-dados-etiquetas.xlsx"
    },
    {
        id: "specieslink-jabot",
        name: "SpeciesLink para JABOT",
        category: "Conversão",
        description: "Converte planilhas Excel exportadas do speciesLink, em formato Darwin Core, para o modelo padrão utilizado pelo JABOT.",
        accepts: "Planilhas .xlsx exportadas do speciesLink, especialmente de materiais recebidos por doação de outros herbários.",
        output: "Planilha reorganizada no padrão JABOT, com coletores, determinadores, autores, coordenadas e campos principais estruturados.",
        status: "Estavel",
        version: "2.0",
        path: "tools/Conversot_SpecisLink_JABOT/index.html",
        exampleLabel: "Planilha speciesLink",
        exampleUrl: "exemplos/specieslink-exportacao-exemplo.xlsx"
    }
];

// ============================================================
// TEXTOS EXPANDIDOS DOS CARDS DE FERRAMENTAS
// ============================================================
// Estes textos aparecem quando o usuario clica em "Mais sobre" na aba Ferramentas.
const toolLongDescriptions = {
    "jabot-extract": `
        <p>A ferramenta <strong>JABOT Extract</strong> tem como objetivo recortar, extrair e organizar individualmente os códigos de barras gerados pelo sistema JABOT em arquivos PDF no formato A4.</p>
        <p>No JABOT, os códigos de barras dos exemplares previamente selecionados são exportados em uma folha A4, distribuídos em <strong>44 códigos por página</strong>, organizados em <strong>4 colunas e 11 linhas</strong>. Como esses códigos ocupam posições fixas no documento, a ferramenta foi previamente configurada para realizar os recortes de forma padronizada, capturando cada código individualmente.</p>
        <p>Após o recorte, cada imagem passa por um processo de leitura, no qual a ferramenta identifica as informações contidas no código de barras. No contexto do Herbário Evaldo Buttura, o código segue o formato <strong>EVB001234</strong>, em que o número de tombo do exemplar corresponde ao próprio código de barras. Assim, a ferramenta utiliza essa informação para nomear automaticamente cada imagem extraída.</p>
        <p>Depois de concluir a leitura e a nomeação dos códigos, o JABOT Extract permite exportar todas as imagens em formato <strong>.png</strong>, reunidas em um arquivo compactado <strong>.zip</strong>. Esse arquivo deve ser descompactado em uma pasta definida pelo usuário.</p>
        <p>Recomenda-se manter uma organização rigorosa dos arquivos, especialmente porque essa ferramenta é utilizada em conjunto com o processo de geração de etiquetas para materiais recebidos por doação. Como esses materiais são previamente incorporados e validados no JABOT por meio de uma planilha padrão, é recomendável utilizar o mesmo nome do lote em todos os arquivos e pastas relacionados.</p>
        <p>Por exemplo, se o herbário recebeu uma doação em agosto de 2026, o lote pode ser nomeado como <strong>EVB_Ago_2026</strong>. Nesse caso, recomenda-se criar uma pasta principal com esse nome, preferencialmente dentro de uma pasta maior chamada <strong>Incorporações</strong>. Dentro da pasta do lote, podem ser mantidos todos os documentos relacionados àquela validação, incluindo a planilha, o PDF exportado do JABOT e uma subpasta chamada <strong>códigos_barra</strong>, onde devem ser extraídas as imagens geradas pelo JABOT Extract.</p>
        <p>Quando o PDF possui menos de 44 códigos de barras em uma página, a ferramenta ainda realiza os 44 recortes previstos. Nesses casos, podem ser geradas imagens em branco, nomeadas automaticamente com identificadores genéricos, como <strong>EVB000001</strong>. Essas imagens podem ser excluídas sem prejuízo ao processo.</p>
        <p>Ao final, o usuário terá as imagens dos códigos de barras devidamente recortadas, nomeadas e prontas para a próxima etapa: a criação das etiquetas por meio da ferramenta <strong>EVB Labels</strong>.</p>
    `,
    "evb-labels": `
        <p>A ferramenta <strong>EVB Labels</strong> gera etiquetas padronizadas para materiais recebidos por doação pelo Herbário Evaldo Buttura.</p>
        <p>Esse tipo de etiqueta é utilizado especialmente quando o material recebido já possui uma etiqueta original do herbário de origem. Nesses casos, a etiqueta original é preservada na exsicata, e o EVB acrescenta uma etiqueta complementar, menor, contendo as informações necessárias para a incorporação do exemplar ao acervo.</p>
        <p>As etiquetas geradas incluem número de tombo, família botânica, nome científico com autoria, coletor, número de coleta, data de coleta, determinador, projeto e o código de barras gerado pelo JABOT. O código de barras utilizado é aquele previamente recortado pela ferramenta <strong>JABOT Extract</strong>.</p>
        <p>Para funcionar corretamente, a ferramenta solicita dois conjuntos de dados: imagens dos códigos de barras em formato <strong>.png</strong> e uma planilha em formato <strong>.xls</strong> ou <strong>.xlsx</strong> contendo as informações dos exemplares. As imagens devem estar organizadas em uma pasta; o usuário seleciona todas as imagens e, em seguida, carrega a planilha correspondente ao lote.</p>
        <p>Essa planilha pode ser a mesma utilizada para incorporar e validar os exemplares no JABOT, ou uma planilha exportada a partir de uma seleção personalizada no próprio sistema. A ferramenta é capaz de ler ambos os formatos, <strong>.xls</strong> e <strong>.xlsx</strong>.</p>
        <p>Após o carregamento, a ferramenta gera automaticamente as etiquetas. Nesse momento, o usuário consegue identificar problemas como ausência de imagens, imagens carregadas a partir de outro lote ou inconsistências entre a planilha e os códigos disponíveis. Quando uma imagem correspondente não é encontrada, a etiqueta é gerada sem código de barras, permitindo identificar rapidamente a inconsistência.</p>
        <p>Esse comportamento reduz a margem de erro, pois a ferramenta não insere códigos aleatórios em etiquetas incorretas. Quando há correspondência entre a planilha e as imagens, o código é inserido corretamente; quando não há correspondência, a etiqueta permanece sem código de barras.</p>
        <p>Após a conferência, a ferramenta permite baixar um arquivo em <strong>PDF</strong> contendo todas as etiquetas geradas. Recomenda-se verificar as configurações de impressão, especialmente o ajuste de margens e o ajuste ao conteúdo da página, para evitar cortes.</p>
        <p>Depois da impressão, as etiquetas devem ser recortadas e coladas nas respectivas exsicatas. Em seguida, o material pode seguir o fluxo normal de processamento da coleção, incluindo fotografia, separação de duplicatas e encaminhamento ao freezer.</p>
    `,
    "evb-labels-collection": `
        <p>A ferramenta <strong>EVB Labels Collection</strong> gera etiquetas para as caixas da coleção do Herbário Evaldo Buttura.</p>
        <p>Diferentemente do EVB Labels, utilizado para etiquetas de exemplares individuais, o EVB Labels Collection tem uso mais pontual, voltado à organização física da coleção. Ele é utilizado quando há necessidade de atualizar etiquetas de caixas, especialmente em situações de reorganização dos pacotes de exsicatas.</p>
        <p>Esse tipo de atualização pode ser necessário quando novas famílias são adicionadas a uma caixa, quando pacotes são transferidos entre caixas ou quando há necessidade de reordenar o conteúdo físico da coleção para melhor acomodação dos exemplares. Nesses casos, a etiqueta da caixa deve refletir corretamente quais famílias, pacotes e intervalos estão armazenados em seu interior.</p>
        <p>Para isso, a ferramenta utiliza uma planilha específica, que funciona como um mapa da coleção. Essa planilha contém informações sobre cada caixa e os pacotes ou intervalos de exemplares armazenados. A versão atual aceita arquivos <strong>.xls</strong>, <strong>.xlsx</strong> e <strong>.csv</strong>.</p>
        <p>O processo é simples: quando ocorre uma alteração na organização física, a planilha deve ser atualizada. Em seguida, o usuário abre a ferramenta, carrega o arquivo e informa uma caixa específica, uma lista de caixas ou um intervalo de etiquetas que deseja gerar.</p>
        <p>A ferramenta permite gerar apenas as etiquetas necessárias, sem obrigar a produção de todas as etiquetas da coleção de uma só vez. Isso torna o processo mais prático para atualizações pontuais.</p>
        <p>Após o carregamento da planilha e a definição da seleção desejada, a ferramenta gera as etiquetas e permite o download do arquivo final em <strong>PDF</strong>. Depois disso, o usuário imprime as etiquetas, recorta e cola sobre um suporte mais resistente, como cartolina, formando um cartão mais firme. Por fim, as etiquetas antigas devem ser substituídas pelas novas na coleção.</p>
    `,
    "analise-botanica": `
        <p>A ferramenta <strong>Análise Botânica</strong> gera estatísticas descritivas a partir de um conjunto de exemplares previamente definido pelo usuário.</p>
        <p>A ferramenta trabalha com planilhas no formato padrão do JABOT, o mesmo modelo utilizado para incorporar novos materiais à coleção. Essas planilhas contêm campos importantes para a análise de dados botânicos, taxonômicos, geográficos, temporais e curatoriais. A partir desses campos, a ferramenta produz um conjunto amplo de informações estatísticas e interpretativas sobre o recorte analisado.</p>
        <p>Entre os principais resultados gerados estão dados sobre composição e diversidade taxonômica, incluindo número de famílias, gêneros e espécies, riqueza total, abundância de registros, nível de identificação dos exemplares e grupos taxonômicos mais representativos. A ferramenta também permite identificar padrões de raridade, indicando quantas espécies aparecem com apenas um registro, duas ocorrências ou diferentes frequências no conjunto analisado.</p>
        <p>A análise temporal inclui informações sobre esforço amostral por ano e por mês, permitindo observar a intensidade de coleta ao longo do tempo e possíveis padrões de sazonalidade. Quando os dados permitem, também podem ser geradas curvas de acumulação de espécies e curvas do coletor.</p>
        <p>A ferramenta realiza análises espaciais, reunindo informações sobre municípios, estados, cidades e localidades mais amostradas. Quando há coordenadas disponíveis, os registros podem ser plotados em mapa, incluindo visualizações espaciais e camadas de concentração dos pontos amostrais.</p>
        <p>Outro recurso importante é a análise de completude dos dados. A ferramenta calcula indicadores relacionados a coordenadas válidas, data completa de coleta, determinador informado e outros campos relevantes, apresentando valores absolutos e percentuais para avaliar a qualidade e a consistência dos dados.</p>
        <p>A ferramenta também possibilita comparações entre áreas, como estados ou municípios, e gera listas de espécies agrupadas por família em formato semelhante ao de tabelas florísticas, incluindo nome científico, nome popular, hábito, número de registros e testemunhos associados, quando disponíveis.</p>
        <p>Também são produzidos gráficos e informações sobre hábitos ou formas de crescimento, herbário de origem dos registros, proporção de amostras contribuídas por cada herbário, principais coletores e principais determinadores.</p>
        <p>Como complemento, a ferramenta possui integração com dados taxonômicos auxiliares, especialmente relacionados à Flora do Brasil 2020. Quando os arquivos auxiliares são carregados, realiza validação taxonômica dos nomes científicos, verificando nomes aceitos, sinônimos, origem, endemismo, forma de vida e habitat.</p>
        <p>A ferramenta também cruza automaticamente a lista de espécies com bases de espécies exóticas invasoras, incluindo a Base Nacional de Espécies Exóticas Invasoras do Instituto Hórus e a Lista de Espécies Exóticas Invasoras do Paraná, vinculada ao Programa do Estado do Paraná para Espécies Exóticas Invasoras e reconhecida pela Portaria IAP n. 59/2015.</p>
        <p>Outro módulo importante é a consulta ao status de conservação. A referência nacional principal é a base de avaliações de risco de extinção da flora brasileira do CNCFlora/JBRJ, com categorias como EX, EW, CR, EN, VU, NT, LC, DD e NE. A ferramenta também pode consultar a IUCN Red List como fonte complementar, por meio de um proxy do EVB hospedado no Cloudflare Worker.</p>
        <p>A Análise Botânica é uma ferramenta dinâmica, cuja utilidade depende da pergunta de pesquisa e do recorte de dados definido pelo usuário. Ela não se limita a planilhas exportadas do JABOT: também pode ser utilizada com dados próprios de pesquisas individuais ou dados de outras coleções, desde que organizados segundo o modelo básico do JABOT.</p>
        <p>Ao final, a ferramenta gera um relatório textual padronizado com os principais resultados e uma breve contextualização. Esse relatório funciona como referência inicial, mas deve ser revisado criticamente, especialmente quando utilizado em relatórios técnicos, resumos científicos, artigos, diagnósticos de coleção ou outros produtos formais.</p>
    `,
    "specieslink-jabot": `
        <p>A ferramenta <strong>SpeciesLink para JABOT</strong> converte planilhas Excel exportadas do speciesLink, organizadas em formato Darwin Core, para o modelo de planilha padrão utilizado pelo JABOT.</p>
        <p>Essa conversão é especialmente útil quando o Herbário Evaldo Buttura precisa incorporar materiais recebidos por doação de herbários que não utilizam o sistema JABOT, mas possuem seus acervos informatizados e disponibilizados no speciesLink. Nesses casos, o usuário pode buscar os registros no speciesLink, filtrar os exemplares desejados, exportar a planilha em Excel e converter os dados automaticamente para o padrão exigido pelo JABOT.</p>
        <p>Um exemplo de uso ocorre quando o herbário recebe uma doação de uma instituição como o HCF. O usuário pode buscar no speciesLink os registros correspondentes ao herbário de origem e aos números de tombo desejados, baixar a planilha com todas as colunas disponíveis e utilizar a ferramenta para converter esses dados.</p>
        <p>Durante a conversão, a ferramenta organiza automaticamente campos como coletores, determinadores, autores dos nomes científicos, informações geográficas e coordenadas. Ela também formata nomes de coletores e determinadores conforme o padrão adotado pelo EVB, separando o coletor principal dos coletores adicionais.</p>
        <p>Um recurso importante é a conversão de coordenadas. O speciesLink pode disponibilizar coordenadas decimais e coordenadas em campos verbatim. É necessário ter atenção, pois as colunas longitude e latitude podem representar coordenadas gerais associadas ao município, enquanto <strong>verbatimLatitude</strong> e <strong>verbatimLongitude</strong> tendem a preservar as coordenadas informadas na etiqueta original ou no registro de coleta.</p>
        <p>Por isso, a ferramenta prioriza as coordenadas presentes em <strong>verbatimLatitude</strong> e <strong>verbatimLongitude</strong>, quando disponíveis. Quando estão em formato decimal, converte automaticamente para graus, minutos e segundos; quando já estão em GMS, transfere as informações para as colunas adequadas.</p>
        <p>O processo economiza tempo e reduz o trabalho manual de transcrição, mas não substitui a revisão dos dados pelo usuário. É fundamental conferir coordenadas, coletores adicionais, habitat, localidade e demais dados presentes na etiqueta original.</p>
        <p>A ferramenta também pode ser utilizada para converter dados do speciesLink com a finalidade de analisá-los na ferramenta <strong>Análise Botânica</strong>, facilitando estudos comparativos, diagnósticos de coleção e levantamentos baseados em dados de diferentes herbários.</p>
        <p>Ao abrir a ferramenta, o usuário informa o nome do projeto e o nome do arquivo de saída. O nome do projeto é inserido na coluna correspondente da planilha final, sendo útil em casos de incorporação de material recebido por doação. O nome do arquivo deve seguir, preferencialmente, o mesmo padrão organizacional das demais etapas, como <strong>EVB_Ago_2026</strong>.</p>
        <p>Durante o processo, são exibidos erros e alertas relacionados à conversão. Esses avisos devem ser conferidos, pois podem indicar campos ausentes, dados incompatíveis ou informações que exigem revisão manual.</p>
        <p>Embora automatize grande parte do processo, a conferência final continua indispensável. O usuário deve verificar exemplar por exemplar, especialmente coordenadas, coletores adicionais, habitat e informações que podem estar na etiqueta original, mas ausentes ou incompletas na planilha exportada.</p>
    `
};

tools.forEach(tool => {
    tool.longDescriptionHtml = toolLongDescriptions[tool.id] || "";
});

// ============================================================
// AJUDA E EXEMPLOS DAS FERRAMENTAS
// ============================================================
// Estes dados aparecem na aba Ajuda.
//
// Arquivos esperados na pasta exemplos/:
// - jabot-extract-codigos-barras.pdf
// - evb-labels-dados-etiquetas.xlsx
// - evb-labels-collection-dados.xlsx
// - specieslink-exportacao-exemplo.xlsx
//
// Observação: a Análise Botânica usa a mesma planilha exemplo do EVB Labels.
const toolHelp = {
    flow: [
        {
            step: "1",
            title: "Extrair códigos de barras",
            tool: "JABOT Extract",
            text: "Exporte no JABOT o PDF A4 com codigos de barras e use a ferramenta para recortar, ler e nomear automaticamente cada imagem."
        },
        {
            step: "2",
            title: "Gerar etiquetas",
            tool: "EVB Labels",
            text: "Use a planilha do lote junto com as imagens .png geradas no passo anterior para criar etiquetas complementares de incorporacao."
        },
        {
            step: "3",
            title: "Atualizar caixas",
            tool: "EVB Labels Collection",
            text: "Atualize a planilha-mapa da colecao e gere apenas as etiquetas das caixas que precisam ser substituidas."
        },
        {
            step: "4",
            title: "Analisar dados",
            tool: "Análise Botânica",
            text: "Carregue uma planilha no modelo JABOT para produzir estatisticas, graficos, mapas, listas floristicas e relatorio interpretativo."
        },
        {
            step: "5",
            title: "Converter speciesLink",
            tool: "SpeciesLink para JABOT",
            text: "Converta planilhas Darwin Core exportadas do speciesLink para o padrao JABOT antes da conferencia e incorporacao."
        }
    ],
    tools: [
        {
            toolId: "jabot-extract",
            expectedInput: "PDF A4 exportado pelo JABOT com codigos de barras em posicoes fixas, normalmente 44 codigos por pagina, em 4 colunas e 11 linhas.",
            steps: [
                "Abra a ferramenta JABOT Extract.",
                "Carregue o PDF padronizado gerado pelo JABOT.",
                "Aguarde o recorte automatico das posicoes previstas na pagina.",
                "Confira se os codigos foram lidos e nomeados no formato EVB001234.",
                "Baixe o arquivo .zip com as imagens .png recortadas.",
                "Descompacte as imagens em uma pasta organizada para usar no EVB Labels."
            ],
            commonErrors: [
                "PDF fora do padrao de 44 codigos por pagina.",
                "Pagina incompleta gerando recortes em branco, que podem ser excluidos depois.",
                "Codigo nao identificado corretamente para nomear o arquivo automaticamente.",
                "Misturar imagens de codigos de barras de lotes diferentes."
            ],
            exampleUrl: "exemplos/jabot-extract-codigos-barras.pdf",
            exampleLabel: "Baixar PDF exemplo"
        },
        {
            toolId: "evb-labels",
            expectedInput: "Planilha .xls ou .xlsx do lote e imagens .png dos codigos de barras correspondentes, previamente recortadas pelo JABOT Extract.",
            steps: [
                "Primeiro gere e descompacte os codigos recortados no JABOT Extract.",
                "Abra o EVB Labels.",
                "Selecione as imagens .png dos codigos de barras do lote.",
                "Carregue a planilha correspondente aos exemplares.",
                "Confira a previa e verifique etiquetas sem codigo de barras, pois elas indicam ausencia de correspondencia.",
                "Baixe o PDF final, imprima, recorte e cole as etiquetas nas exsicatas."
            ],
            commonErrors: [
                "Codigo de barras ausente para um exemplar listado na planilha.",
                "Imagens de outro lote carregadas junto com a planilha atual.",
                "Colunas da planilha com nomes diferentes do modelo esperado.",
                "Configuracao de impressao cortando margens ou ajustando incorretamente o PDF."
            ],
            exampleUrl: "exemplos/evb-labels-dados-etiquetas.xlsx",
            exampleLabel: "Baixar planilha exemplo"
        },
        {
            toolId: "evb-labels-collection",
            expectedInput: "Planilha-mapa da colecao em .xls, .xlsx ou .csv, contendo o identificador da caixa, as familias e os pacotes ou intervalos armazenados.",
            steps: [
                "Atualize a planilha-mapa sempre que houver reorganizacao fisica da colecao.",
                "Abra o EVB Labels Collection.",
                "Carregue a planilha atualizada.",
                "Informe uma caixa especifica, uma lista de caixas ou o intervalo de etiquetas que deseja gerar.",
                "Baixe o PDF final.",
                "Imprima, recorte, cole em suporte mais resistente e substitua as etiquetas antigas das caixas."
            ],
            commonErrors: [
                "Planilha-mapa desatualizada em relacao a organizacao fisica real.",
                "Caixa especifica ou intervalo de caixas informado incorretamente.",
                "Campos de armario, prateleira, caixa ou pacote ausentes.",
                "Imprimir todas as etiquetas quando apenas uma atualizacao pontual era necessaria."
            ],
            exampleUrl: "exemplos/evb-labels-collection-dados.xlsx",
            exampleLabel: "Baixar planilha exemplo"
        },
        {
            toolId: "analise-botanica",
            expectedInput: "Planilha no modelo JABOT, ou dados proprios organizados nesse padrao basico, com campos botanicos, taxonomicos, geograficos, temporais e curatoriais.",
            steps: [
                "Abra a Análise Botânica.",
                "Carregue a planilha de dados.",
                "Confira os campos reconhecidos e a completude dos dados.",
                "Carregue bases auxiliares quando desejar validar nomes, origem, endemismo, invasoras ou status de conservacao.",
                "Explore estatisticas, graficos, mapas, listas por familia e relatorios.",
                "Revise criticamente os resultados antes de usa-los em produtos tecnicos ou cientificos."
            ],
            commonErrors: [
                "Colunas taxonomicas, geograficas ou curatoriais ausentes.",
                "Nomes de familia, genero ou especie inconsistentes.",
                "Coordenadas, datas ou determinadores incompletos reduzindo a completude.",
                "Interpretar o relatorio automatico sem revisao tecnica."
            ],
            exampleUrl: "exemplos/evb-labels-dados-etiquetas.xlsx",
            exampleLabel: "Baixar planilha exemplo"
        },
        {
            toolId: "specieslink-jabot",
            expectedInput: "Planilha Excel .xlsx exportada do speciesLink em formato Darwin Core, preferencialmente com todos os campos disponiveis.",
            steps: [
                "Busque e filtre no speciesLink os registros desejados.",
                "Exporte a planilha Excel com os dados do lote.",
                "Abra a ferramenta SpeciesLink para JABOT.",
                "Informe o nome do projeto e o nome do arquivo de saida.",
                "Carregue a planilha exportada.",
                "Confira alertas, coordenadas, coletores, determinadores, habitat e localidade.",
                "Baixe a planilha reorganizada no padrao JABOT e revise exemplar por exemplar."
            ],
            commonErrors: [
                "Campos obrigatorios ausentes ou exportados em colunas diferentes do esperado.",
                "Coordenadas gerais de municipio confundidas com coordenadas da etiqueta original.",
                "Informacoes de localidade, habitat, coletores adicionais ou determinadores incompletas.",
                "Incorporar os dados convertidos sem comparacao com as etiquetas originais."
            ],
            exampleUrl: "exemplos/specieslink-exportacao-exemplo.xlsx",
            exampleLabel: "Baixar planilha speciesLink"
        }
    ]
};

// ============================================================
// FOTOS DO CARROSSEL DA ABA INÍCIO
// ============================================================
// Para adicionar uma nova foto:
// 1. Coloque a imagem na pasta img/fotos/.
// 2. Copie uma linha da lista abaixo.
// 3. Troque o nome do arquivo e a legenda.
//
// Campos:
// - src: caminho da imagem.
// - alt: texto alternativo para acessibilidade.
// - caption: legenda exibida sobre a foto. É opcional.
//
// Exemplo:
// { src: "img/fotos/F9.jpg", alt: "Sala do herbário", caption: "Nova legenda" }
const photoGallery = [
    { src: "img/fotos/F2.jpg", alt: "Sala do herbário", caption: "Fruto de <em>Cedrela fissilis</em>, símbolo do Herbário" },
    { src: "img/fotos/F3.jpg", alt: "Sala do herbário", caption: "Processo de costura de uma exsicata" },
    { src: "img/fotos/F4.jpg", alt: "Sala do herbário" },
    { src: "img/fotos/F5.jpg", alt: "Sala do herbário", caption: "Equipe do Herbário" },
    { src: "img/fotos/F8.jpg", alt: "Sala do herbário", caption: "Sonia Marcela fotografando uma exsicata" }    
];

// ============================================================
// EQUIPE
// ============================================================
// Para adicionar um novo integrante:
// 1. Coloque a foto em img/fotos/.
// 2. Copie um bloco abaixo.
// 3. Altere name, role, group, email e photo.
//
// O campo group controla em qual grupo a pessoa aparece.
// Exemplos: "Curadoria", "Bolsistas", "Estagiários", "Colaboradores".
//
// Exemplo:
// {
//     name: "Nome Completo",
//     role: "Função no herbário",
//     group: "Bolsistas",
//     email: "email@exemplo.com",
//     photo: "img/fotos/Nome.png"
// }
const teamMembers = [
    {
        name: "Laura Cristina Pires Lima",
        role: "Curadora do herbário",
        group: "Curadoria",
        email: "laura.lima@unila.edu.br",
        photo: "img/fotos/Laura Lima.png"
    },
    {
        name: "Giovana Secretti Vendruscolo",
        role: "Vice-curadora",
        group: "Curadoria",
        email: "giovana.vendruscolo@unila.edu.br",
        photo: "img/fotos/Giovana Vendruscolo.png"
    },
    {
        name: "Marlon Royer de Morais",
        role: "Biólogo e bolsista técnico do herbário",
        group: "Bolsistas",
        email: "marlonbioyt@gmail.com",
        photo: "img/fotos/Marlon Royer.png"
    },
    {
        name: "Aline Barbosa",
        role: "Bolsista graduanda do EVB",
        group: "Bolsistas",
        email: "",
        photo: "img/fotos/Aline Barboza.png"
    },
    {
        name: "Sonia Marcela",
        role: "Ex-bolsista graduanda do EVB",
        group: "Bolsistas",
        email: "",
        photo: "img/fotos/Sonia Marcela.png"
    }
];

// ============================================================
// REPOSITÓRIO DE TRABALHOS
// ============================================================
// Para adicionar um novo trabalho:
// 1. Copie um bloco abaixo.
// 2. Preencha título, autor, tipo, ano e links disponíveis.
//
// A lista é ordenada automaticamente do ano mais recente para o mais antigo.
//
// Tipos sugeridos:
// - "TCC"
// - "Dissertação"
// - "Artigo"
// - "Relatório"
// - "Capítulo"
//
// Campos de link:
// - pdfUrl: link direto para o PDF.
// - abstractUrl: link para resumo, página institucional ou registro.
// - externalUrl: outro link externo relacionado.
//
// Exemplo:
// {
//     title: "Título do trabalho",
//     author: "Nome do autor",
//     type: "TCC",
//     year: "2024",
//     pdfUrl: "https://link-do-pdf",
//     abstractUrl: "",
//     externalUrl: ""
// }
const repositoryItems = [
    {
        title: "Espécies Arbóreas de um Fragmento de Floresta Estacional Semidecidual no Oeste do Paraná: Levantamento Florístico e Chave de Identificação Dendrológica",
        author: "Izabele Oliveira Munaro",
        type: "TCC",
        year: "2022",
        pdfUrl: "https://dspace.unila.edu.br/bitstreams/b2f6b62a-0281-4359-8e32-b0e76b20d4ef/download",
        abstractUrl: "",
        externalUrl: ""
    }
];

// ============================================================
// SERVIÇOS
// ============================================================
// Estes cards aparecem na aba Serviços.
// Para alterar, edite title, description e status.
//
// Exemplo:
// {
//     title: "Novo serviço",
//     description: "Descrição do serviço.",
//     status: "Sob consulta"
// }
const serviceItems = [
    {
        title: "Doação de material botânico",
        description: "Orientações para envio ou entrega de amostras botânicas ao herbário. Inclua, sempre que possível, informações de procedência, coletor, data, localidade e autorização de coleta quando aplicável.",
        status: "Sob consulta"
    },
    {
        title: "Solicitação de identificação",
        description: "Apoio à identificação de material vegetal para atividades de ensino, pesquisa e extensão. As solicitações devem informar origem do material, finalidade da identificação e imagens ou amostras adequadas.",
        status: "Sob consulta"
    },
    {
        title: "Visitas ao herbário",
        description: "Recebimento de turmas, pesquisadores e visitantes interessados na coleção, mediante agendamento prévio e disponibilidade da equipe.",
        status: "Agendamento prévio"
    },
    {
        title: "Uso da coleção",
        description: "Consulta ao acervo físico e digital conforme normas internas de conservação, manuseio de exsicatas, registro de uso e acompanhamento pela equipe responsável.",
        status: "Uso orientado"
    },
    {
        title: "Contato e horários",
        description: "O contato principal do herbário é herbarioevaldobuttura@gmail.com. Os horários de atendimento podem variar conforme calendário acadêmico, disponibilidade da equipe e atividades em andamento.",
        status: "EVB / UNILA"
    }
];

// ============================================================
// INSTAGRAM
// ============================================================
// Estes dados aparecem na aba Instagram.
//
// Para trocar o perfil:
// - Altere profileUrl.
//
// Para usar um QR Code próprio:
// 1. Salve a imagem em img/, por exemplo: img/qrcode-instagram.png
// 2. Troque qrCodeUrl pelo caminho da imagem.
//
// Para adicionar um card de publicação/evento:
// 1. Copie um bloco dentro de posts.
// 2. Altere title, text, tag e link.
const instagramInfo = {
    profileUrl: "https://www.instagram.com/herbario.unila/",
    handle: "@herbario.unila",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data=https%3A%2F%2Fwww.instagram.com%2Fherbario.unila%2F",
    qrCodeAlt: "QR Code para acessar o Instagram do Herbário Evaldo Buttura",
    callout: "Acompanhe o Herbário Evaldo Buttura no Instagram para ver bastidores da coleção, atividades de extensão, divulgação científica, eventos e registros do cotidiano do acervo.",
    posts: [
        {
            title: "Bastidores do herbário",
            text: "Registros da rotina de curadoria, organização, digitalização e conservação da coleção botânica.",
            tag: "Rotina EVB",
            link: "https://www.instagram.com/herbario.unila/"
        },
        {
            title: "Educação ambiental",
            text: "Divulgação de ações, visitas, oficinas e atividades de extensão realizadas pelo herbário.",
            tag: "Extensão",
            link: "https://www.instagram.com/herbario.unila/"
        },
        {
            title: "Flora regional",
            text: "Publicações sobre plantas, biodiversidade, conservação e pesquisas relacionadas à flora do oeste do Paraná.",
            tag: "Divulgação científica",
            link: "https://www.instagram.com/herbario.unila/"
        }
    ]
};

// ============================================================
// ABAS INSTITUCIONAIS DO MENU LATERAL
// ============================================================
// Aqui ficam as abas como Início, Onde estamos, Equipe, Serviços,
// Taxonline e Repositório.
//
// Para alterar texto de uma aba:
// - title: título principal.
// - summary: resumo abaixo do título.
// - body: parágrafos simples em lista.
// - bodyHtml: texto com HTML controlado, usado quando precisa de <strong> ou <em>.
//
// Para atualizar links:
// - Instagram: altere actionUrl na aba "instagram".
// - Taxonline: altere actionUrl na aba "taxonline".
//
// Para criar uma nova aba:
// 1. Copie um bloco existente.
// 2. Use um id único, sem espaços e sem acentos.
// 3. Altere label, title, eyebrow, summary e body.
const infoPages = [
    {
        id: "quem-somos",
        label: "Início",
        title: "Herbário Evaldo Buttura",
        eyebrow: "Herbário Evaldo Buttura",
        summary: "Coleção botânica da UNILA dedicada à flora regional, à formação técnico-científica e à difusão do conhecimento sobre biodiversidade.",
        bodyHtml: `
            <p>O herbário Evaldo Buttura (<strong>EVB</strong>), da Universidade Federal da Integração Latino-Americana (UNILA), está localizado em Foz do Iguaçu, no extremo oeste do estado do Paraná. A sigla <strong>EVB</strong> foi dada em homenagem ao engenheiro agrônomo <strong>Evaldo Buttura</strong>, responsável pelo levantamento florístico na região de Foz do Iguaçu até Guaíra há mais de 40 anos, sendo seu trabalho botânico uma importante referência para a flora regional. O herbário iniciou suas atividades em <strong>2015</strong> a partir da doação e restauração da coleção botânica de Buttura, composta por pouco mais de 1.200 amostras de plantas secas, coletadas majoritariamente entre as décadas de 1970 e 1980 na microrregião de Foz do Iguaçu e parte do Paraguai.</p>
            <p>O herbário <strong>EVB</strong> atua na coleta e no intercâmbio de materiais da flora do oeste do Paraná, com enfoque no Parque Nacional do Iguaçu, em Plantas Alimentícias Não Convencionais (PANC) e na flora urbana. Além disso, promove a formação técnico-científica por meio da oferta de vagas de estágio supervisionado e iniciação científica, bem como pela orientação de dissertações de mestrado e trabalhos de conclusão de curso.</p>
            <p>Além de manter uma coleção botânica de referência para a flora regional e contribuir para a formação técnica e acadêmica, o herbário <strong>EVB</strong> desempenha um papel fundamental na disseminação do conhecimento sobre biodiversidade e conservação da flora. Para isso, desenvolve atividades de educação ambiental e divulgação científica voltadas à comunidade externa, incluindo ações em feiras, escolas e espaços públicos. Dessa forma, o herbário atua de maneira integrada nas dimensões de ensino, pesquisa e extensão universitária.</p>
            <p>Atualmente, o herbário migrou a informatização de seus dados do software Brahms para o Jabot. O acervo conta com cerca de <strong>8.000</strong> exemplares informatizados, dos quais a maior parte possui imagens digitalizadas e disponíveis online nas plataformas Herbário Virtual Reflora, Jabot, <em>speciesLink</em>, INCT - Herbário Virtual Reflora, GBIF e SIBBr.</p>
            <p>Desde 2015, o herbário integra a Rede Brasileira de Herbários da Sociedade Botânica do Brasil. Em 2020, foi cadastrado no <em>Index Herbariorum</em>, passando a ser reconhecido internacionalmente entre os herbários do mundo.</p>
        `,
        image: "",
        imageAlt: "Logo do Herbário Evaldo Buttura",
        imageMode: "contain logo-showcase",
        gallery: photoGallery,
        actionLabel: "",
        actionUrl: ""
    },
    {
        id: "onde-estamos",
        label: "Onde estamos",
        title: "Onde estamos",
        eyebrow: "Localização",
        summary: "O EVB está localizado no Parque Tecnológico Itaipu, em Foz do Iguaçu, Paraná.",
        body: [
            "Endereço: Edifício das Águas, Laboratórios Multiusuários Engenheira Enedina Alves Marques, Parque Tecnológico Itaipu, Bloco 04, Espaço 02, Salas 10, 11 e 12.",
            "E-mail do herbário: herbarioevaldobuttura@gmail.com."
        ],
        map: {
            title: "Localização do Herbário Evaldo Buttura no Google Maps",
            src: "https://www.google.com/maps?q=-25.4354247,-54.5964765&z=19&output=embed"
        },
        image: "",
        imageAlt: "",
        actionLabel: "",
        actionUrl: ""
    },
    {
        id: "equipe",
        label: "Conheça a equipe",
        title: "Conheça a equipe",
        eyebrow: "Equipe EVB",
        summary: "Equipe vinculada à curadoria, gestão, apoio técnico e atividades de pesquisa e extensão do EVB.",
        body: [
            "A equipe do Herbário Evaldo Buttura (EVB) é composta pela curadoria, vice-curadoria, bolsistas técnicos, bolsistas de graduação e estagiários vinculados principalmente ao curso de Ciências Biológicas. Seus integrantes atuam de forma colaborativa em atividades relacionadas à curadoria científica, manutenção e organização da coleção, informatização e digitalização do acervo, manejo de doações e apoio às atividades de pesquisa, ensino e extensão desenvolvidas pelo herbário."
        ],
        team: teamMembers,
        image: "",
        imageAlt: "",
        actionLabel: "",
        actionUrl: ""
    },
    {
        id: "instagram",
        label: "Instagram",
        title: "Nossa página no Instagram",
        eyebrow: "Redes sociais",
        summary: "Acompanhe as novidades, atividades, eventos e bastidores do Herbário Evaldo Buttura.",
        body: [
            "O Instagram do EVB reúne registros da rotina do herbário, ações de educação ambiental, divulgação científica, atividades de pesquisa e momentos de interação com a comunidade."
            
        ],
        image: "",
        imageAlt: "",
        instagram: instagramInfo,
        actionLabel: "",
        actionUrl: ""
    },
    {
        id: "servicos",
        label: "Serviços",
        title: "Serviços",
        eyebrow: "Atendimento e uso da coleção",
        summary: "Orientações para doações, solicitações de identificação, visitas, consulta ao acervo e contato com o Herbário Evaldo Buttura.",
        body: [
            "Esta seção reúne informações práticas sobre formas de interação com o herbário."
        ],
        services: serviceItems,
        image: "",
        imageAlt: "",
        actionLabel: "",
        actionUrl: ""
    },
    {
        id: "ajuda",
        label: "Ajuda",
        title: "Ajuda das ferramentas",
        eyebrow: "Fluxo de trabalho",
        summary: "Guia rápido para entender a ordem recomendada de uso, arquivos esperados, exemplos disponíveis e erros comuns de cada ferramenta.",
        body: [
            "Esta aba organiza o uso das ferramentas do Portal EVB como um fluxo de etapas. Os arquivos de exemplo ficam na pasta exemplos/ e podem ser substituídos por modelos reais quando você separar os materiais.",
            "Para baixar um arquivo modelo (indisponiveis no momento, ainda em processo), use os botões indicados em cada ferramenta."
        ],
        help: toolHelp,
        image: "",
        imageAlt: "",
        actionLabel: "",
        actionUrl: ""
    },
    {
        id: "taxonline",
        label: "Taxonline",
        title: "Taxonline",
        eyebrow: "Consulta externa",
        summary: "Página externa com informações institucionais do Herbário Evaldo Buttura na Rede Taxonline.",
        body: [
            "A página do EVB no Taxonline reúne histórico, informações de localização, curadoria, equipe, publicações e links relacionados ao herbário.",
            "Use esta aba como ponte para consulta externa e como referência para manter os dados institucionais do portal atualizados."
        ],
        image: "",
        imageAlt: "",
        actionLabel: "Abrir Taxonline",
        actionUrl: "https://www.taxonline.bio.br/evb"
    },
    {
        id: "repositorio",
        label: "Repositório",
        title: "Repositório",
        eyebrow: "Produção acadêmica",
        summary: "Trabalhos, publicações e materiais produzidos por integrantes vinculados ao Herbário Evaldo Buttura.",
        body: [
            "Este espaço reúne trabalhos publicados por membros da equipe e colaboradores do herbário."
        ],
        repository: repositoryItems,
        image: "",
        imageAlt: "",
        actionLabel: "",
        actionUrl: ""
    }
];

// ============================================================
// VERSOES EM OUTROS IDIOMAS
// ============================================================
// O portugues acima continua sendo a base principal do site.
// Para adicionar espanhol futuramente, copie o bloco "en", troque a chave
// para "es" e preencha as traducoes correspondentes.
const localized = {
    en: {
        tools: [
            {
                id: "jabot-extract",
                category: "Barcodes",
                description: "Crops, reads and organizes individual barcodes exported by JABOT in standardized A4 PDF files.",
                accepts: "A4 PDFs generated by JABOT with 44 barcodes per page, arranged in 4 columns and 11 rows.",
                output: "A .zip file with cropped .png images automatically named from the EVB specimen barcode.",
                status: "Stable",
                exampleLabel: "Sample PDF"
            },
            {
                id: "evb-labels",
                category: "Labels",
                description: "Generates complementary labels for donated material by combining spreadsheet data with JABOT barcode images.",
                accepts: ".xls or .xlsx batch spreadsheet and .png barcode images generated by JABOT Extract.",
                output: "PDF with labels ready for checking, printing, cutting and attaching to specimens.",
                status: "Stable",
                exampleLabel: "Sample spreadsheet"
            },
            {
                id: "evb-labels-collection",
                category: "Labels",
                description: "Generates labels for collection boxes, supporting the physical organization of cabinets, shelves and specimen packets.",
                accepts: ".xls, .xlsx or .csv collection map with boxes, families and stored intervals.",
                output: "PDF with selected box labels, ready for printing and replacing old labels.",
                status: "Stable",
                exampleLabel: "Sample spreadsheet"
            },
            {
                id: "analise-botanica",
                name: "Botanical Analysis",
                category: "Analysis",
                description: "Generates descriptive statistics, charts, maps, floristic lists and auxiliary comparisons from botanical spreadsheets.",
                accepts: "JABOT-format spreadsheets or user datasets organized with botanical, taxonomic, geographic and curatorial fields.",
                output: "Analytical panel with statistics, completeness, family lists, maps, charts and a standardized text report.",
                status: "Stable",
                exampleLabel: "Sample spreadsheet"
            },
            {
                id: "specieslink-jabot",
                name: "SpeciesLink to JABOT",
                category: "Conversion",
                description: "Converts Excel spreadsheets exported from speciesLink in Darwin Core format into the standard JABOT model.",
                accepts: ".xlsx spreadsheets exported from speciesLink, especially for donated material from other herbaria.",
                output: "JABOT-format spreadsheet with collectors, determiners, authors, coordinates and main fields organized.",
                status: "Stable",
                exampleLabel: "speciesLink spreadsheet"
            }
        ],
        toolHelp: {
            flow: [
                { step: "1", title: "Extract barcodes", tool: "JABOT Extract", text: "Export the A4 barcode PDF from JABOT and use the tool to crop, read and name each image automatically." },
                { step: "2", title: "Generate labels", tool: "EVB Labels", text: "Use the batch spreadsheet together with the .png images from the previous step to create complementary incorporation labels." },
                { step: "3", title: "Update boxes", tool: "EVB Labels Collection", text: "Update the collection map spreadsheet and generate only the box labels that need replacement." },
                { step: "4", title: "Analyze data", tool: "Botanical Analysis", text: "Load a JABOT-format spreadsheet to produce statistics, charts, maps, floristic lists and an interpretive report." },
                { step: "5", title: "Convert speciesLink", tool: "SpeciesLink to JABOT", text: "Convert Darwin Core spreadsheets exported from speciesLink into the JABOT format before checking and incorporation." }
            ],
            tools: [
                {
                    toolId: "jabot-extract",
                    expectedInput: "A4 PDF exported by JABOT with barcodes in fixed positions, usually 44 codes per page in 4 columns and 11 rows.",
                    steps: ["Open JABOT Extract.", "Load the standardized PDF generated by JABOT.", "Wait for the automatic cropping of the expected page positions.", "Check whether codes were read and named in the EVB001234 format.", "Download the .zip file with cropped .png images."],
                    commonErrors: ["PDF outside the expected 44-code layout.", "Incomplete page generating blank crops that can later be deleted.", "Barcode not identified for automatic file naming.", "Mixing barcode images from different batches."],
                    exampleLabel: "Download sample PDF"
                },
                {
                    toolId: "evb-labels",
                    expectedInput: ".xls or .xlsx batch spreadsheet and corresponding .png barcode images previously cropped by JABOT Extract.",
                    steps: ["First generate and unzip the cropped barcodes in JABOT Extract.", "Open EVB Labels.", "Select the .png barcode images for the batch.", "Load the corresponding specimen spreadsheet.", "Review the preview and check labels without barcodes as possible mismatches.", "Download the final PDF for printing, cutting and attaching."],
                    commonErrors: ["Barcode missing for a specimen listed in the spreadsheet.", "Images from another batch loaded with the current spreadsheet.", "Spreadsheet columns with names different from the expected model.", "Print settings cutting margins or scaling the PDF incorrectly."],
                    exampleLabel: "Download sample spreadsheet"
                },
                {
                    toolId: "evb-labels-collection",
                    expectedInput: "Collection map in .xls, .xlsx or .csv format, containing the box identifier, families and stored packets or specimen intervals.",
                    steps: ["Update the collection map whenever the physical organization changes.", "Open EVB Labels Collection.", "Load the updated spreadsheet.", "Enter a specific box, a list of boxes or the label interval to generate.", "Download the final PDF.", "Print, cut and replace the old box labels."],
                    commonErrors: ["Collection map not matching the current physical organization.", "Incorrect specific box or box interval.", "Missing cabinet, shelf, box or packet fields.", "Generating all labels when only a punctual update is needed."],
                    exampleLabel: "Download sample spreadsheet"
                },
                {
                    toolId: "analise-botanica",
                    expectedInput: "JABOT-format spreadsheet, or a user dataset organized in that basic model, with botanical, taxonomic, geographic, temporal and curatorial fields.",
                    steps: ["Open Botanical Analysis.", "Load the data spreadsheet.", "Check recognized fields and data completeness.", "Load auxiliary databases when taxonomic validation, origin, endemism, invasives or conservation status are needed.", "Explore statistics, charts, maps, family lists and reports.", "Review results critically before technical or scientific use."],
                    commonErrors: ["Missing taxonomic, geographic or curatorial columns.", "Inconsistent family, genus or species names.", "Incomplete coordinates, dates or determiners reducing data completeness.", "Using the automatic report without technical review."],
                    exampleLabel: "Download sample spreadsheet"
                },
                {
                    toolId: "specieslink-jabot",
                    expectedInput: ".xlsx spreadsheet exported from speciesLink in Darwin Core format, preferably with all available fields.",
                    steps: ["Search and filter the target records in speciesLink.", "Export the Excel spreadsheet for the batch.", "Open SpeciesLink to JABOT.", "Enter the project name and output file name.", "Load the exported spreadsheet.", "Check alerts, coordinates, collectors, determiners, habitat and locality.", "Download the JABOT-format spreadsheet and review each specimen."],
                    commonErrors: ["Required fields missing or exported in unexpected columns.", "Municipality-level coordinates confused with original label coordinates.", "Incomplete locality, habitat, additional collectors or determiner information.", "Importing converted data without comparison with original labels."],
                    exampleLabel: "Download speciesLink spreadsheet"
                }
            ]
        },
        photoGallery: [
            { src: "img/fotos/F2.jpg", alt: "Herbarium room", caption: "Fruit of <em>Cedrela fissilis</em>, symbol of the Herbarium" },
            { src: "img/fotos/F3.jpg", alt: "Herbarium room", caption: "Specimen mounting and sewing process" },
            { src: "img/fotos/F4.jpg", alt: "Herbarium room" },
            { src: "img/fotos/F5.jpg", alt: "Herbarium room", caption: "Herbarium team on Any Valentina's last internship day" },
            { src: "img/fotos/F8.jpg", alt: "Herbarium room", caption: "Sonia Marcela digitizing herbarium specimens" }
        ],
        teamMembers: [
            { name: "Laura Cristina Pires Lima", role: "Herbarium Curator", group: "Curatorship" },
            { name: "Giovana Secretti Vendruscolo", role: "Deputy Curator", group: "Curatorship" },
            { name: "Marlon Royer de Morais", role: "Biologist and technical fellow of the herbarium", group: "Fellows" },
            { name: "Aline Barbosa", role: "Undergraduate fellow at EVB", group: "Fellows" },
            { name: "Sonia Marcela", role: "Former undergraduate fellow at EVB", group: "Fellows" }
        ],
        repositoryItems: [
            {
                title: "Tree Species from a Seasonal Semideciduous Forest Fragment in Western Parana: Floristic Survey and Dendrological Identification Key",
                author: "Izabele Oliveira Munaro",
                type: "Undergraduate thesis",
                year: "2022"
            }
        ],
        serviceItems: [
            {
                title: "Donation of botanical material",
                description: "Guidelines for sending or delivering botanical samples to the herbarium. Whenever possible, include origin, collector, date, locality and collection authorization information when applicable.",
                status: "Upon request"
            },
            {
                title: "Identification requests",
                description: "Support for identifying plant material for teaching, research and outreach activities. Requests should include material origin, identification purpose and suitable images or samples.",
                status: "Upon request"
            },
            {
                title: "Herbarium visits",
                description: "Visits by classes, researchers and interested visitors may be arranged in advance according to team availability.",
                status: "By appointment"
            },
            {
                title: "Use of the collection",
                description: "Consultation of the physical and digital collection according to internal rules for conservation, specimen handling, use records and staff supervision.",
                status: "Supervised use"
            },
            {
                title: "Contact and opening hours",
                description: "The main herbarium contact is herbarioevaldobuttura@gmail.com. Opening hours may vary according to the academic calendar, team availability and ongoing activities.",
                status: "EVB / UNILA"
            }
        ],
        instagramInfo: {
            qrCodeAlt: "QR Code to access the Herbário Evaldo Buttura Instagram profile",
            callout: "Follow Herbário Evaldo Buttura on Instagram for behind-the-scenes views of the collection, outreach activities, science communication, events and everyday records of the herbarium.",
            posts: [
                { title: "Behind the scenes", text: "Records of curation, organization, digitization and conservation routines in the botanical collection.", tag: "EVB routine" },
                { title: "Environmental education", text: "News about actions, visits, workshops and outreach activities carried out by the herbarium.", tag: "Outreach" },
                { title: "Regional flora", text: "Posts about plants, biodiversity, conservation and research related to the flora of western Parana.", tag: "Science communication" }
            ]
        },
        infoPages: [
            {
                id: "quem-somos",
                label: "Home",
                title: "Herbário Evaldo Buttura",
                eyebrow: "Herbário Evaldo Buttura",
                summary: "UNILA botanical collection dedicated to regional flora, technical and scientific training, and the dissemination of biodiversity knowledge.",
                bodyHtml: `
                    <p>The Herbário Evaldo Buttura (<strong>EVB</strong>) of the Federal University for Latin American Integration (UNILA) is located in Foz do Iguaçu, in the westernmost region of Paraná, Brazil. The acronym <strong>EVB</strong> honors agronomist <strong>Evaldo Buttura</strong>, who carried out floristic surveys in the region from Foz do Iguaçu to Guaíra more than 40 years ago. His botanical work remains an important reference for the regional flora. The herbarium began its activities in <strong>2015</strong> with the donation and restoration of Buttura's botanical collection, composed of just over 1,200 dried plant samples collected mainly between the 1970s and 1980s in the Foz do Iguaçu microregion and part of Paraguay.</p>
                    <p>The <strong>EVB</strong> herbarium works with collection and exchange of plant material from western Paraná, with emphasis on Iguaçu National Park, non-conventional food plants (PANC) and urban flora. It also promotes technical and scientific training through supervised internships, undergraduate research opportunities, master's dissertation supervision and undergraduate final projects.</p>
                    <p>In addition to maintaining a reference botanical collection for the regional flora and contributing to technical and academic training, the <strong>EVB</strong> herbarium plays an important role in disseminating knowledge about biodiversity and plant conservation. It develops environmental education and science communication activities for the external community, including actions in fairs, schools and public spaces. In this way, the herbarium works across teaching, research and university outreach.</p>
                    <p>The herbarium has migrated its data management from Brahms to Jabot. The collection currently includes about <strong>8,000</strong> digitized specimens, most of them with images available online through Herbário Virtual Reflora, Jabot, <em>speciesLink</em>, INCT - Herbário Virtual Reflora, GBIF and SIBBr.</p>
                    <p>Since 2015, the herbarium has been part of the Brazilian Herbarium Network of the Brazilian Botanical Society. In 2020, it was registered in the <em>Index Herbariorum</em>, becoming internationally recognized among the world's herbaria.</p>
                `
            },
            {
                id: "onde-estamos",
                label: "Location",
                title: "Location",
                eyebrow: "Location",
                summary: "EVB is located at Itaipu Technological Park, in Foz do Iguaçu, Paraná, Brazil.",
                body: [
                    "Address: Edifício das Águas, Laboratórios Multiusuários Engenheira Enedina Alves Marques, Itaipu Technological Park, Block 04, Space 02, Rooms 10, 11 and 12.",
                    "Herbarium e-mail: herbarioevaldobuttura@gmail.com."
                ]
            },
            {
                id: "equipe",
                label: "Team",
                title: "Team",
                eyebrow: "EVB team",
                summary: "Team linked to curatorship, management, technical support, research and outreach activities at EVB.",
                body: [
                    "The Herbário Evaldo Buttura (EVB) team includes the curator, deputy curator, technical fellows, undergraduate fellows and interns, mainly linked to the Biological Sciences program. Team members work collaboratively in scientific curation, collection maintenance and organization, database management and digitization, donation handling, and support for research, teaching and outreach activities developed by the herbarium."
                ]
            },
            {
                id: "instagram",
                label: "Instagram",
                title: "Our Instagram profile",
                eyebrow: "Social media",
                summary: "Follow news, activities, events and behind-the-scenes content from Herbário Evaldo Buttura.",
                body: [
                    "EVB's Instagram brings together records of herbarium routines, environmental education actions, science communication, research activities and moments of interaction with the community.",
                    "This section can also highlight posts and important events without depending on the Instagram API, keeping the page lightweight and stable."
                ]
            },
            {
                id: "servicos",
                label: "Services",
                title: "Services",
                eyebrow: "Assistance and collection use",
                summary: "Guidance for donations, identification requests, visits, collection consultation and contact with Herbário Evaldo Buttura.",
                body: [
                    "This section brings together practical information about ways to interact with the herbarium. The texts below are an initial model and can be adjusted according to EVB's internal rules."
                ]
            },
            {
                id: "ajuda",
                label: "Help",
                title: "Tool help",
                eyebrow: "Workflow",
                summary: "Quick guide to the recommended order of use, expected files, available examples and common errors for each tool.",
                body: [
                    "This tab organizes the EVB Portal tools as a workflow. Example files are stored in the exemplos/ folder and can be replaced by real models when available.",
                    "To download a model file, use the buttons shown for each tool."
                ]
            },
            {
                id: "taxonline",
                label: "Taxonline",
                title: "Taxonline",
                eyebrow: "External reference",
                summary: "External page with institutional information about Herbário Evaldo Buttura on the Taxonline network.",
                body: [
                    "EVB's Taxonline page provides history, location information, curatorship, team details, publications and herbarium-related links.",
                    "Use this tab as a bridge to external consultation and as a reference to keep institutional data in the portal up to date."
                ],
                actionLabel: "Open Taxonline"
            },
            {
                id: "repositorio",
                label: "Repository",
                title: "Repository",
                eyebrow: "Academic production",
                summary: "Works, publications and materials produced by members linked to Herbário Evaldo Buttura.",
                body: [
                    "This section gathers works published by team members and herbarium collaborators. To add new records, edit the repositoryItems list in data/site-data.js."
                ]
            }
        ]
    },
    es: {
        tools: [
            {
                id: "jabot-extract",
                category: "Códigos de barras",
                description: "Recorta, lee y organiza individualmente los codigos de barras exportados por JABOT en PDFs A4 estandarizados.",
                accepts: "PDFs A4 generados por JABOT con 44 codigos por pagina, organizados en 4 columnas y 11 filas.",
                output: "Archivo .zip con imagenes .png recortadas y nombradas automaticamente a partir del codigo EVB del ejemplar.",
                status: "Estable",
                exampleLabel: "PDF de ejemplo"
            },
            {
                id: "evb-labels",
                category: "Etiquetas",
                description: "Genera etiquetas complementarias para materiales recibidos por donacion, combinando datos de la planilla con codigos de barras de JABOT.",
                accepts: "Planilla .xls o .xlsx del lote e imagenes .png de codigos de barras generadas por JABOT Extract.",
                output: "PDF con etiquetas listas para revision, impresion, corte y fijacion en las exsicatas.",
                status: "Estable",
                exampleLabel: "Planilla de ejemplo"
            },
            {
                id: "evb-labels-collection",
                category: "Etiquetas",
                description: "Genera etiquetas para cajas de la coleccion, apoyando la organizacion fisica de armarios, estantes y paquetes de exsicatas.",
                accepts: "Planilla-mapa de la coleccion en .xls, .xlsx o .csv, con cajas, familias e intervalos almacenados.",
                output: "PDF con las etiquetas de cajas seleccionadas, listo para impresion y sustitucion de etiquetas antiguas.",
                status: "Estable",
                exampleLabel: "Planilla de ejemplo"
            },
            {
                id: "analise-botanica",
                name: "Análisis Botánico",
                category: "Análisis",
                description: "Genera estadisticas descriptivas, graficos, mapas, listas floristicas y comparaciones auxiliares a partir de planillas botanicas.",
                accepts: "Planillas en el modelo JABOT o datos propios organizados con campos botanicos, taxonomicos, geograficos y curatoriales.",
                output: "Panel analitico con estadisticas, completitud, listas por familia, mapas, graficos e informe textual estandarizado.",
                status: "Estable",
                exampleLabel: "Planilla de ejemplo"
            },
            {
                id: "specieslink-jabot",
                name: "SpeciesLink para JABOT",
                category: "Conversión",
                description: "Convierte planillas Excel exportadas de speciesLink, en formato Darwin Core, al modelo estandar utilizado por JABOT.",
                accepts: "Planillas .xlsx exportadas de speciesLink, especialmente de materiales recibidos por donacion de otros herbarios.",
                output: "Planilla reorganizada en el estandar JABOT, con colectores, determinadores, autores, coordenadas y campos principales estructurados.",
                status: "Estable",
                exampleLabel: "Planilla speciesLink"
            }
        ],
        toolHelp: {
            flow: [
                { step: "1", title: "Extraer codigos de barras", tool: "JABOT Extract", text: "Exporte en JABOT el PDF A4 con codigos de barras y use la herramienta para recortar, leer y nombrar cada imagen automaticamente." },
                { step: "2", title: "Generar etiquetas", tool: "EVB Labels", text: "Use la planilla del lote junto con las imagenes .png del paso anterior para crear etiquetas complementarias de incorporacion." },
                { step: "3", title: "Actualizar cajas", tool: "EVB Labels Collection", text: "Actualice la planilla-mapa de la coleccion y genere solo las etiquetas de cajas que necesitan sustitucion." },
                { step: "4", title: "Analizar datos", tool: "Analisis Botanico", text: "Cargue una planilla en el modelo JABOT para producir estadisticas, graficos, mapas, listas floristicas e informe interpretativo." },
                { step: "5", title: "Convertir speciesLink", tool: "SpeciesLink para JABOT", text: "Convierta planillas Darwin Core exportadas de speciesLink al estandar JABOT antes de la revision e incorporacion." }
            ],
            tools: [
                {
                    toolId: "jabot-extract",
                    expectedInput: "PDF A4 exportado por JABOT con codigos de barras en posiciones fijas, normalmente 44 codigos por pagina, en 4 columnas y 11 filas.",
                    steps: ["Abra JABOT Extract.", "Cargue el PDF estandarizado generado por JABOT.", "Espere el recorte automatico de las posiciones previstas.", "Verifique si los codigos fueron leidos y nombrados en el formato EVB001234.", "Descargue el archivo .zip con las imagenes .png recortadas."],
                    commonErrors: ["PDF fuera del estandar de 44 codigos por pagina.", "Pagina incompleta generando recortes en blanco que pueden eliminarse despues.", "Codigo no identificado para nombrar el archivo automaticamente.", "Mezclar imagenes de codigos de barras de lotes diferentes."],
                    exampleLabel: "Descargar PDF de ejemplo"
                },
                {
                    toolId: "evb-labels",
                    expectedInput: "Planilla .xls o .xlsx del lote e imagenes .png de codigos de barras correspondientes, previamente recortadas por JABOT Extract.",
                    steps: ["Primero genere y descomprima los codigos recortados en JABOT Extract.", "Abra EVB Labels.", "Seleccione las imagenes .png de codigos de barras del lote.", "Cargue la planilla correspondiente a los ejemplares.", "Revise la vista previa y verifique etiquetas sin codigo de barras como posibles inconsistencias.", "Descargue el PDF final para imprimir, cortar y fijar."],
                    commonErrors: ["Codigo de barras ausente para un ejemplar listado en la planilla.", "Imagenes de otro lote cargadas junto con la planilla actual.", "Columnas de la planilla con nombres diferentes del modelo esperado.", "Configuracion de impresion cortando margenes o escalando incorrectamente el PDF."],
                    exampleLabel: "Descargar planilla de ejemplo"
                },
                {
                    toolId: "evb-labels-collection",
                    expectedInput: "Planilla-mapa de la coleccion en formato .xls, .xlsx o .csv, con identificador de caja, familias y paquetes o intervalos almacenados.",
                    steps: ["Actualice la planilla-mapa siempre que cambie la organizacion fisica de la coleccion.", "Abra EVB Labels Collection.", "Cargue la planilla actualizada.", "Informe una caja especifica, una lista de cajas o el intervalo de etiquetas que desea generar.", "Descargue el PDF final.", "Imprima, corte y sustituya las etiquetas antiguas de las cajas."],
                    commonErrors: ["Planilla-mapa desactualizada respecto a la organizacion fisica real.", "Caja especifica o intervalo de cajas informado incorrectamente.", "Campos de armario, estante, caja o paquete ausentes.", "Generar todas las etiquetas cuando solo se necesita una actualizacion puntual."],
                    exampleLabel: "Descargar planilla de ejemplo"
                },
                {
                    toolId: "analise-botanica",
                    expectedInput: "Planilla en el modelo JABOT, o datos propios organizados en ese modelo basico, con campos botanicos, taxonomicos, geograficos, temporales y curatoriales.",
                    steps: ["Abra Analisis Botanico.", "Cargue la planilla de datos.", "Verifique los campos reconocidos y la completitud.", "Cargue bases auxiliares cuando necesite validar nombres, origen, endemismo, invasoras o estado de conservacion.", "Explore estadisticas, graficos, mapas, listas por familia e informes.", "Revise criticamente los resultados antes de usos tecnicos o cientificos."],
                    commonErrors: ["Columnas taxonomicas, geograficas o curatoriales ausentes.", "Nombres de familia, genero o especie inconsistentes.", "Coordenadas, fechas o determinadores incompletos reduciendo la completitud.", "Usar el informe automatico sin revision tecnica."],
                    exampleLabel: "Descargar planilla de ejemplo"
                },
                {
                    toolId: "specieslink-jabot",
                    expectedInput: "Planilla Excel .xlsx exportada de speciesLink en formato Darwin Core, preferentemente con todos los campos disponibles.",
                    steps: ["Busque y filtre en speciesLink los registros deseados.", "Exporte la planilla Excel con los datos del lote.", "Abra SpeciesLink para JABOT.", "Informe el nombre del proyecto y del archivo de salida.", "Cargue la planilla exportada.", "Revise alertas, coordenadas, colectores, determinadores, habitat y localidad.", "Descargue la planilla en formato JABOT y revise ejemplar por ejemplar."],
                    commonErrors: ["Campos obligatorios ausentes o exportados en columnas inesperadas.", "Coordenadas generales de municipio confundidas con coordenadas de la etiqueta original.", "Informacion de localidad, habitat, colectores adicionales o determinadores incompleta.", "Incorporar los datos convertidos sin compararlos con las etiquetas originales."],
                    exampleLabel: "Descargar planilla speciesLink"
                }
            ]
        },
        photoGallery: [
            { src: "img/fotos/F2.jpg", alt: "Sala del herbario", caption: "Fruto de <em>Cedrela fissilis</em>, símbolo del Herbario" },
            { src: "img/fotos/F3.jpg", alt: "Sala del herbario", caption: "Proceso de costura de una exsicata" },
            { src: "img/fotos/F4.jpg", alt: "Sala del herbario" },
            { src: "img/fotos/F5.jpg", alt: "Sala del herbario", caption: "Equipo del Herbario en el último día de pasantía de Any Valentina" },
            { src: "img/fotos/F8.jpg", alt: "Sala del herbario", caption: "Sonia Marcela en el proceso de digitalización de exsicatas" }
        ],
        teamMembers: [
            { name: "Laura Cristina Pires Lima", role: "Curadora del herbario", group: "Curaduría" },
            { name: "Giovana Secretti Vendruscolo", role: "Vicecuradora", group: "Curaduría" },
            { name: "Marlon Royer de Morais", role: "Biólogo y becario técnico del herbario", group: "Becarios" },
            { name: "Aline Barbosa", role: "Becaria de grado del EVB", group: "Becarios" },
            { name: "Sonia Marcela", role: "Exbecaria de grado del EVB", group: "Becarios" }
        ],
        repositoryItems: [
            {
                title: "Especies arbóreas de un fragmento de Bosque Estacional Semidecidual en el oeste de Paraná: relevamiento florístico y clave de identificación dendrológica",
                author: "Izabele Oliveira Munaro",
                type: "Trabajo de conclusión de grado",
                year: "2022"
            }
        ],
        serviceItems: [
            {
                title: "Donación de material botánico",
                description: "Orientaciones para el envío o entrega de muestras botánicas al herbario. Siempre que sea posible, incluya información de procedencia, colector, fecha, localidad y autorización de colecta cuando corresponda.",
                status: "Bajo consulta"
            },
            {
                title: "Solicitud de identificación",
                description: "Apoyo a la identificación de material vegetal para actividades de enseñanza, investigación y extensión. Las solicitudes deben informar el origen del material, la finalidad de la identificación e imágenes o muestras adecuadas.",
                status: "Bajo consulta"
            },
            {
                title: "Visitas al herbario",
                description: "Recepción de grupos, investigadores y visitantes interesados en la colección, mediante agendamiento previo y disponibilidad del equipo.",
                status: "Agendamiento previo"
            },
            {
                title: "Uso de la colección",
                description: "Consulta del acervo físico y digital conforme a normas internas de conservación, manejo de exsicatas, registro de uso y acompañamiento por el equipo responsable.",
                status: "Uso orientado"
            },
            {
                title: "Contacto y horarios",
                description: "El contacto principal del herbario es herbarioevaldobuttura@gmail.com. Los horarios de atención pueden variar según el calendario académico, la disponibilidad del equipo y las actividades en curso.",
                status: "EVB / UNILA"
            }
        ],
        instagramInfo: {
            qrCodeAlt: "QR Code para acceder al Instagram del Herbário Evaldo Buttura",
            callout: "Acompañe al Herbário Evaldo Buttura en Instagram para ver bastidores de la colección, actividades de extensión, divulgación científica, eventos y registros cotidianos del acervo.",
            posts: [
                { title: "Bastidores del herbario", text: "Registros de la rutina de curaduría, organización, digitalización y conservación de la colección botánica.", tag: "Rutina EVB" },
                { title: "Educación ambiental", text: "Divulgación de acciones, visitas, talleres y actividades de extensión realizadas por el herbario.", tag: "Extensión" },
                { title: "Flora regional", text: "Publicaciones sobre plantas, biodiversidad, conservación e investigaciones relacionadas con la flora del oeste de Paraná.", tag: "Divulgación científica" }
            ]
        },
        infoPages: [
            {
                id: "quem-somos",
                label: "Inicio",
                title: "Herbário Evaldo Buttura",
                eyebrow: "Herbário Evaldo Buttura",
                summary: "Colección botánica de la UNILA dedicada a la flora regional, a la formación técnico-científica y a la difusión del conocimiento sobre biodiversidad.",
                bodyHtml: `
                    <p>El Herbário Evaldo Buttura (<strong>EVB</strong>), de la Universidad Federal de la Integración Latinoamericana (UNILA), está ubicado en Foz do Iguaçu, en el extremo oeste del estado de Paraná, Brasil. La sigla <strong>EVB</strong> fue dada en homenaje al ingeniero agrónomo <strong>Evaldo Buttura</strong>, responsable del relevamiento florístico en la región de Foz do Iguaçu hasta Guaíra hace más de 40 años, siendo su trabajo botánico una referencia importante para la flora regional. El herbario inició sus actividades en <strong>2015</strong> a partir de la donación y restauración de la colección botánica de Buttura, compuesta por poco más de 1.200 muestras de plantas secas, colectadas principalmente entre las décadas de 1970 y 1980 en la microrregión de Foz do Iguaçu y parte de Paraguay.</p>
                    <p>El herbario <strong>EVB</strong> actúa en la colecta y el intercambio de materiales de la flora del oeste de Paraná, con énfasis en el Parque Nacional do Iguaçu, en Plantas Alimenticias No Convencionales (PANC) y en la flora urbana. Además, promueve la formación técnico-científica mediante pasantías supervisadas, iniciación científica, orientación de disertaciones de maestría y trabajos de conclusión de curso.</p>
                    <p>Además de mantener una colección botánica de referencia para la flora regional y contribuir a la formación técnica y académica, el herbario <strong>EVB</strong> desempeña un papel fundamental en la difusión del conocimiento sobre biodiversidad y conservación de la flora. Para ello, desarrolla actividades de educación ambiental y divulgación científica dirigidas a la comunidad externa, incluyendo acciones en ferias, escuelas y espacios públicos. De esta forma, el herbario actúa de manera integrada en las dimensiones de enseñanza, investigación y extensión universitaria.</p>
                    <p>Actualmente, el herbario migró la informatización de sus datos del software Brahms a Jabot. El acervo cuenta con cerca de <strong>8.000</strong> ejemplares informatizados, de los cuales la mayor parte posee imágenes digitalizadas y disponibles en línea en las plataformas Herbário Virtual Reflora, Jabot, <em>speciesLink</em>, INCT - Herbário Virtual Reflora, GBIF y SIBBr.</p>
                    <p>Desde 2015, el herbario integra la Red Brasileña de Herbarios de la Sociedad Botánica de Brasil. En 2020, fue registrado en el <em>Index Herbariorum</em>, pasando a ser reconocido internacionalmente entre los herbarios del mundo.</p>
                `
            },
            {
                id: "onde-estamos",
                label: "Dónde estamos",
                title: "Dónde estamos",
                eyebrow: "Ubicación",
                summary: "El EVB está ubicado en el Parque Tecnológico Itaipu, en Foz do Iguaçu, Paraná, Brasil.",
                body: [
                    "Dirección: Edifício das Águas, Laboratórios Multiusuários Engenheira Enedina Alves Marques, Parque Tecnológico Itaipu, Bloque 04, Espacio 02, Salas 10, 11 y 12.",
                    "E-mail del herbario: herbarioevaldobuttura@gmail.com."
                ]
            },
            {
                id: "equipe",
                label: "Equipo",
                title: "Equipo",
                eyebrow: "Equipo EVB",
                summary: "Equipo vinculado a la curaduría, gestión, apoyo técnico y actividades de investigación y extensión del EVB.",
                body: [
                    "El equipo del Herbário Evaldo Buttura (EVB) está compuesto por la curaduría, vicecuraduría, becarios técnicos, becarios de grado y pasantes vinculados principalmente al curso de Ciencias Biológicas. Sus integrantes actúan de forma colaborativa en actividades relacionadas con la curaduría científica, mantenimiento y organización de la colección, informatización y digitalización del acervo, manejo de donaciones y apoyo a las actividades de investigación, enseñanza y extensión desarrolladas por el herbario."
                ]
            },
            {
                id: "instagram",
                label: "Instagram",
                title: "Nuestra página en Instagram",
                eyebrow: "Redes sociales",
                summary: "Acompañe las novedades, actividades, eventos y bastidores del Herbário Evaldo Buttura.",
                body: [
                    "El Instagram del EVB reúne registros de la rutina del herbario, acciones de educación ambiental, divulgación científica, actividades de investigación y momentos de interacción con la comunidad.",
                    "Esta área también puede destacar publicaciones y eventos importantes sin depender de la API de Instagram, manteniendo la página liviana y estable."
                ]
            },
            {
                id: "servicos",
                label: "Servicios",
                title: "Servicios",
                eyebrow: "Atención y uso de la colección",
                summary: "Orientaciones para donaciones, solicitudes de identificación, visitas, consulta al acervo y contacto con el Herbário Evaldo Buttura.",
                body: [
                    "Esta sección reúne información práctica sobre formas de interacción con el herbario. Los textos siguientes funcionan como modelo inicial y pueden ajustarse conforme a las normas internas del EVB."
                ]
            },
            {
                id: "ajuda",
                label: "Ayuda",
                title: "Ayuda de las herramientas",
                eyebrow: "Flujo de trabajo",
                summary: "Guía rápida para entender el orden recomendado de uso, archivos esperados, ejemplos disponibles y errores comunes de cada herramienta.",
                body: [
                    "Esta pestaña organiza el uso de las herramientas del Portal EVB como un flujo de etapas. Los archivos de ejemplo quedan en la carpeta exemplos/ y pueden ser sustituidos por modelos reales cuando se separen los materiales.",
                    "Para descargar un archivo modelo, use los botones indicados en cada herramienta."
                ]
            },
            {
                id: "taxonline",
                label: "Taxonline",
                title: "Taxonline",
                eyebrow: "Consulta externa",
                summary: "Página externa con información institucional del Herbário Evaldo Buttura en la Red Taxonline.",
                body: [
                    "La página del EVB en Taxonline reúne histórico, información de ubicación, curaduría, equipo, publicaciones y enlaces relacionados con el herbario.",
                    "Use esta pestaña como puente para consulta externa y como referencia para mantener actualizados los datos institucionales del portal."
                ],
                actionLabel: "Abrir Taxonline"
            },
            {
                id: "repositorio",
                label: "Repositorio",
                title: "Repositorio",
                eyebrow: "Producción académica",
                summary: "Trabajos, publicaciones y materiales producidos por integrantes vinculados al Herbário Evaldo Buttura.",
                body: [
                    "Este espacio reúne trabajos publicados por miembros del equipo y colaboradores del herbario. Para agregar nuevos registros, edite la lista repositoryItems en el archivo data/site-data.js."
                ]
            }
        ]
    }
};

const localizedToolLongDescriptions = {
    en: {
        "jabot-extract": `
            <p><strong>JABOT Extract</strong> crops, extracts and organizes individual barcodes generated by JABOT from standardized A4 PDF files.</p>
            <p>In JABOT, selected specimen barcodes are exported on an A4 sheet with <strong>44 codes per page</strong>, arranged in <strong>4 columns and 11 rows</strong>. Because these codes occupy fixed positions in the document, the tool is configured to crop each barcode in a standardized way.</p>
            <p>After cropping, each image is read so the tool can identify the information encoded in the barcode. At Herbário Evaldo Buttura, the barcode follows the format <strong>EVB001234</strong>, where the specimen accession number corresponds to the barcode itself. This information is used to name each extracted image automatically.</p>
            <p>The tool exports all cropped images as <strong>.png</strong> files inside a compressed <strong>.zip</strong> file. This file should be extracted into a folder chosen by the user.</p>
            <p>Careful file organization is recommended because this tool is usually used together with the label-generation workflow for donated material. If a batch is named <strong>EVB_Ago_2026</strong>, for example, the PDF, spreadsheet and extracted barcode folder should preferably use the same batch name.</p>
            <p>When a PDF page has fewer than 44 barcodes, the tool still performs all 44 expected crops. Blank images may be generated and named with generic identifiers such as <strong>EVB000001</strong>; these files can be deleted without affecting the workflow.</p>
            <p>At the end, the user has cropped and correctly named barcode images ready for the next step: generating labels with <strong>EVB Labels</strong>.</p>
        `,
        "evb-labels": `
            <p><strong>EVB Labels</strong> generates standardized complementary labels for material received by donation at Herbário Evaldo Buttura.</p>
            <p>This type of label is used especially when the donated specimen already has an original label from the source herbarium. In these cases, the original label is preserved on the specimen, and EVB adds a smaller complementary label with the information needed for incorporation into the collection.</p>
            <p>The labels include accession number, botanical family, scientific name with authorship, collector, collection number, collection date, determiner, project name and the JABOT barcode. The barcode used by this tool is the one previously cropped with <strong>JABOT Extract</strong>.</p>
            <p>The tool requires two data sets: barcode images in <strong>.png</strong> format and a specimen spreadsheet in <strong>.xls</strong> or <strong>.xlsx</strong> format. The user selects all barcode images from the batch folder and then loads the corresponding spreadsheet.</p>
            <p>After loading the data, the tool automatically generates the labels. Missing images, images from another batch or inconsistencies between spreadsheet records and available barcodes become visible immediately. When no matching image is found, the label is generated without a barcode, making the problem easy to identify.</p>
            <p>This behavior reduces errors because the tool does not insert random barcodes into incorrect labels. When there is a match, the barcode is inserted; when there is no match, the label remains without a barcode.</p>
            <p>After checking the preview, the user can download a <strong>PDF</strong> with all generated labels. Print settings should be reviewed carefully, especially page scaling and margin adjustment, to avoid cutting the labels.</p>
        `,
        "evb-labels-collection": `
            <p><strong>EVB Labels Collection</strong> generates labels for the physical boxes of the Herbário Evaldo Buttura collection.</p>
            <p>Unlike EVB Labels, which is used for individual specimen labels, this tool supports the physical organization of the collection. It is useful when box labels need to be updated after reorganizing specimen packets.</p>
            <p>Updates may be needed when new families are added to a box, when packets are moved between boxes, or when the collection is rearranged to better accommodate specimens. In these cases, the box label must correctly reflect the families, packets and intervals stored inside it.</p>
            <p>The tool uses a specific spreadsheet as a collection map. This spreadsheet contains information about each box and the specimen packets or intervals stored in it. The current version accepts <strong>.xls</strong>, <strong>.xlsx</strong> and <strong>.csv</strong> files.</p>
            <p>The user loads the updated spreadsheet and chooses a specific box, a list of boxes or an interval of labels to generate. This allows punctual updates without producing the entire set of collection labels again.</p>
            <p>After generating the labels, the tool exports a final <strong>PDF</strong>. The labels can then be printed, cut and attached to a more resistant support, such as cardstock, before replacing the old box labels.</p>
        `,
        "analise-botanica": `
            <p><strong>Botanical Analysis</strong> generates descriptive statistics from a set of specimens defined by the user.</p>
            <p>The tool works with spreadsheets in the standard JABOT format, the same model used to incorporate new material into the collection. These spreadsheets include botanical, taxonomic, geographic, temporal and curatorial fields, allowing the tool to produce a broad analytical overview of the selected data set.</p>
            <p>Main outputs include taxonomic composition and diversity, number of families, genera and species, total richness, record abundance, identification level and the most representative taxonomic groups. The tool also highlights rarity patterns, such as species represented by one or two records.</p>
            <p>Temporal analyses summarize sampling effort by year and month, helping identify collection intensity over time and possible seasonal patterns. When data allow it, species accumulation and collector curves can also be generated.</p>
            <p>Spatial analyses summarize municipalities, states, cities and localities. When coordinates are available, records can be plotted on maps, including spatial visualizations and concentration layers.</p>
            <p>The tool also evaluates data completeness, including valid coordinates, complete collection dates, determiner information and other relevant fields. Results are shown as absolute values and percentages.</p>
            <p>Additional modules support taxonomic validation using Flora do Brasil 2020, checks for exotic and invasive species using Instituto Hórus and Paraná IAT sources, and conservation status searches using CNCFlora/JBRJ as the main national reference and the IUCN Red List as a complementary global source.</p>
            <p>The tool can also be used with user datasets or data from other collections, as long as they follow the basic JABOT structure. The automatically generated report should be treated as an initial interpretation and reviewed carefully before being used in technical or scientific products.</p>
        `,
        "specieslink-jabot": `
            <p><strong>SpeciesLink to JABOT</strong> converts Excel spreadsheets exported from speciesLink, organized in Darwin Core format, into the standard spreadsheet model used by JABOT.</p>
            <p>This conversion is especially useful when Herbário Evaldo Buttura receives donated material from herbaria that do not use JABOT but have their collections digitized and available through speciesLink.</p>
            <p>The user can search speciesLink, filter the desired records, export an Excel spreadsheet and use the tool to convert the data automatically into the JABOT structure. During conversion, the tool organizes collectors, determiners, scientific name authors, geographic information and coordinates.</p>
            <p>Coordinate conversion is a key feature. speciesLink may provide decimal coordinates and verbatim coordinate fields. The tool prioritizes <strong>verbatimLatitude</strong> and <strong>verbatimLongitude</strong> when available, because these fields tend to preserve the coordinates from the original label or collection record.</p>
            <p>When coordinates are decimal, they are converted to degrees, minutes and seconds; when they are already in DMS format, they are transferred to the corresponding JABOT columns.</p>
            <p>The conversion reduces manual transcription work, but it does not replace data review. Coordinates, additional collectors, habitat, locality and information from the original labels must always be checked before incorporation.</p>
            <p>The converted spreadsheet can also be used in <strong>Botanical Analysis</strong>, enabling comparative studies, collection diagnoses and analyses based on data from different herbaria.</p>
        `
    },
    es: {
        "jabot-extract": `
            <p><strong>JABOT Extract</strong> recorta, extrae y organiza individualmente los códigos de barras generados por JABOT a partir de archivos PDF A4 estandarizados.</p>
            <p>En JABOT, los códigos de barras de los ejemplares seleccionados se exportan en una hoja A4 con <strong>44 códigos por página</strong>, organizados en <strong>4 columnas y 11 filas</strong>. Como ocupan posiciones fijas, la herramienta fue configurada para recortar cada código de forma estandarizada.</p>
            <p>Después del recorte, cada imagen pasa por un proceso de lectura. En el Herbário Evaldo Buttura, el código sigue el formato <strong>EVB001234</strong>, en el que el número de registro del ejemplar corresponde al propio código de barras. Esta información se utiliza para nombrar automáticamente cada imagen extraída.</p>
            <p>La herramienta exporta todas las imágenes en formato <strong>.png</strong>, reunidas en un archivo comprimido <strong>.zip</strong>, que debe descomprimirse en una carpeta definida por el usuario.</p>
            <p>Se recomienda mantener una organización rigurosa de los archivos, especialmente porque esta herramienta se usa junto con el proceso de generación de etiquetas para materiales recibidos por donación. Si un lote se llama <strong>EVB_Ago_2026</strong>, por ejemplo, el PDF, la planilla y la carpeta de códigos deberían seguir el mismo nombre.</p>
            <p>Cuando el PDF tiene menos de 44 códigos en una página, la herramienta realiza igualmente los 44 recortes previstos. Pueden generarse imágenes en blanco con identificadores genéricos, como <strong>EVB000001</strong>, que pueden eliminarse sin afectar el proceso.</p>
        `,
        "evb-labels": `
            <p><strong>EVB Labels</strong> genera etiquetas complementarias estandarizadas para materiales recibidos por donación en el Herbário Evaldo Buttura.</p>
            <p>Este tipo de etiqueta se utiliza especialmente cuando el material recibido ya posee una etiqueta original del herbario de origen. En esos casos, la etiqueta original se conserva en la exsicata y el EVB agrega una etiqueta complementaria más pequeña con la información necesaria para la incorporación al acervo.</p>
            <p>Las etiquetas incluyen número de registro, familia botánica, nombre científico con autoría, colector, número de colecta, fecha de colecta, determinador, proyecto y el código de barras generado por JABOT. El código utilizado es el que fue recortado previamente con <strong>JABOT Extract</strong>.</p>
            <p>La herramienta requiere dos conjuntos de datos: imágenes de códigos de barras en formato <strong>.png</strong> y una planilla en formato <strong>.xls</strong> o <strong>.xlsx</strong>. El usuario selecciona las imágenes del lote y luego carga la planilla correspondiente.</p>
            <p>Después de cargar los datos, la herramienta genera las etiquetas automáticamente. Si falta una imagen, si se cargaron imágenes de otro lote o si hay inconsistencias entre la planilla y los códigos disponibles, el problema aparece en la vista previa. Cuando no se encuentra una imagen correspondiente, la etiqueta se genera sin código de barras.</p>
            <p>Este comportamiento reduce errores porque la herramienta no inserta códigos aleatorios en etiquetas incorrectas. Al final, el usuario puede descargar un <strong>PDF</strong> para revisar, imprimir, recortar y fijar las etiquetas en las exsicatas.</p>
        `,
        "evb-labels-collection": `
            <p><strong>EVB Labels Collection</strong> genera etiquetas para las cajas de la colección del Herbário Evaldo Buttura.</p>
            <p>A diferencia de EVB Labels, usado para etiquetas de ejemplares individuales, esta herramienta apoya la organización física de la colección. Se utiliza cuando es necesario actualizar etiquetas de cajas, especialmente después de reorganizar paquetes de exsicatas.</p>
            <p>Estas actualizaciones pueden ser necesarias cuando nuevas familias se agregan a una caja, cuando paquetes se transfieren entre cajas o cuando se reorganiza el contenido físico de la colección. En esos casos, la etiqueta debe reflejar correctamente las familias, paquetes e intervalos almacenados.</p>
            <p>La herramienta utiliza una planilla específica como mapa de la colección. La versión actual acepta archivos <strong>.xls</strong>, <strong>.xlsx</strong> y <strong>.csv</strong>.</p>
            <p>El usuario carga la planilla actualizada e informa una caja específica, una lista de cajas o un intervalo de etiquetas. Así puede generar solo las etiquetas necesarias, sin producir nuevamente todas las etiquetas de la colección.</p>
            <p>Después de generar las etiquetas, la herramienta exporta un <strong>PDF</strong> que puede imprimirse, recortarse y fijarse en un soporte más resistente antes de sustituir las etiquetas antiguas.</p>
        `,
        "analise-botanica": `
            <p><strong>Análisis Botánico</strong> genera estadísticas descriptivas a partir de un conjunto de ejemplares definido por el usuario.</p>
            <p>La herramienta trabaja con planillas en el formato estándar de JABOT, el mismo modelo usado para incorporar nuevos materiales a la colección. Estas planillas contienen campos botánicos, taxonómicos, geográficos, temporales y curatoriales, permitiendo producir una visión analítica amplia del conjunto de datos.</p>
            <p>Entre los principales resultados se incluyen composición y diversidad taxonómica, número de familias, géneros y especies, riqueza total, abundancia de registros, nivel de identificación y grupos taxonómicos más representativos. También identifica patrones de rareza, como especies con uno o dos registros.</p>
            <p>Los análisis temporales resumen el esfuerzo de muestreo por año y mes, ayudando a observar la intensidad de colecta y posibles patrones estacionales. Cuando los datos lo permiten, también pueden generarse curvas de acumulación de especies y curvas del colector.</p>
            <p>Los análisis espaciales reúnen información sobre municipios, estados, ciudades y localidades. Cuando hay coordenadas disponibles, los registros pueden representarse en mapas.</p>
            <p>La herramienta también evalúa la completitud de los datos, valida nombres con Flora do Brasil 2020, cruza especies con bases de exóticas invasoras y consulta estados de conservación usando CNCFlora/JBRJ como referencia nacional principal e IUCN Red List como fuente complementaria.</p>
            <p>El informe automático debe usarse como una interpretación inicial y revisarse cuidadosamente antes de su uso en informes técnicos, resúmenes científicos, artículos o diagnósticos de colección.</p>
        `,
        "specieslink-jabot": `
            <p><strong>SpeciesLink para JABOT</strong> convierte planillas Excel exportadas de speciesLink, organizadas en formato Darwin Core, al modelo estándar utilizado por JABOT.</p>
            <p>La conversión es especialmente útil cuando el Herbário Evaldo Buttura recibe materiales por donación de herbarios que no utilizan JABOT, pero que tienen sus colecciones informatizadas y disponibles en speciesLink.</p>
            <p>El usuario puede buscar registros en speciesLink, filtrar los ejemplares deseados, exportar una planilla Excel y convertir los datos automáticamente al formato requerido por JABOT. Durante la conversión, la herramienta organiza colectores, determinadores, autores de nombres científicos, información geográfica y coordenadas.</p>
            <p>La conversión de coordenadas es un recurso importante. speciesLink puede ofrecer coordenadas decimales y campos verbatim. La herramienta prioriza <strong>verbatimLatitude</strong> y <strong>verbatimLongitude</strong> cuando están disponibles, porque suelen preservar las coordenadas de la etiqueta original o del registro de colecta.</p>
            <p>Cuando las coordenadas están en formato decimal, se convierten a grados, minutos y segundos; cuando ya están en formato GMS, se transfieren a las columnas correspondientes.</p>
            <p>El proceso reduce el trabajo manual de transcripción, pero no sustituye la revisión de los datos. Coordenadas, colectores adicionales, hábitat, localidad e información de las etiquetas originales deben revisarse antes de la incorporación.</p>
        `
    }
};

Object.entries(localizedToolLongDescriptions).forEach(([language, descriptions]) => {
    if (!localized[language]) return;
    localized[language].tools = (localized[language].tools || []).map(tool => ({
        ...tool,
        longDescriptionHtml: descriptions[tool.id] || tool.longDescriptionHtml || ""
    }));
});

    window.EVB_SITE_DATA = {
    tools,
    photoGallery,
    teamMembers,
    repositoryItems,
    serviceItems,
    instagramInfo,
    toolHelp,
    infoPages,
    localized
};
})();
