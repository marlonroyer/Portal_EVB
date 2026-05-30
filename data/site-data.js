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
        description: "Recorta e exporta códigos de barras a partir de PDFs padronizados do JABOT.",
        accepts: "PDFs gerados pelo sistema JABOT no modelo padronizado de etiquetas A4.",
        output: "Arquivos de imagem recortados e nomeados automaticamente a partir do codigo EVB.",
        status: "Estavel",
        version: "2.0",
        path: "tools/Jabot_Extract/index.html",
        exampleLabel: "PDF exemplo",
        exampleUrl: "exemplos/jabot-extract-codigos-barras.pdf"
    },
    {
        id: "evb-labels",
        name: "EVB Labels",
        category: "Etiquetas",
        description: "Gera etiquetas botânicas a partir de códigos de barras e planilhas de dados.",
        accepts: "Planilhas de dados botanicos e lista de codigos de barras EVB.",
        output: "Etiquetas botanicas prontas para conferencia, impressao e organizacao do acervo.",
        status: "Em aprimoramento",
        version: "2.0",
        path: "tools/EVB_Labels/index.html",
        exampleLabel: "Planilha exemplo",
        exampleUrl: "exemplos/evb-labels-dados-etiquetas.xlsx"
    },
    {
        id: "evb-labels-collection",
        name: "EVB Labels Collection",
        category: "Etiquetas",
        description: "Organiza e gera etiquetas para conjuntos de coletas e coleções.",
        accepts: "Planilhas com conjuntos de coletas, colecoes e informacoes associadas.",
        output: "Conjuntos de etiquetas organizados para lotes de materiais e colecoes botanicas.",
        status: "Estavel",
        version: "2.0",
        path: "tools/EVB_Labels_Collection/index.html",
        exampleLabel: "Planilha exemplo",
        exampleUrl: "exemplos/evb-labels-collection-dados.xlsx"
    },
    {
        id: "analise-botanica",
        name: "Análise Botânica",
        category: "Análise",
        description: "Analisa planilhas JABOT e produz estatísticas taxonômicas e de coleção.",
        accepts: "Planilhas exportadas do JABOT com dados de familia, genero, especie e registros.",
        output: "Resumo analitico com estatisticas, listas taxonomicas e informacoes de colecao.",
        status: "Estavel",
        version: "2.0",
        path: "tools/Analise_Botanica/analise-botanica.html",
        exampleLabel: "Planilha exemplo",
        exampleUrl: "exemplos/evb-labels-dados-etiquetas.xlsx"
    },
    {
        id: "specieslink-jabot",
        name: "SpeciesLink para JABOT",
        category: "Conversão",
        description: "Converte dados exportados do SpeciesLink para estrutura compatível com JABOT.",
        accepts: "Planilhas ou arquivos tabulares exportados do speciesLink.",
        output: "Tabela reorganizada para facilitar conferencia e importacao no fluxo do JABOT.",
        status: "Estavel",
        version: "2.0",
        path: "tools/Conversot_SpecisLink_JABOT/index.html",
        exampleLabel: "Planilha speciesLink",
        exampleUrl: "exemplos/specieslink-exportacao-exemplo.xlsx"
    }
];

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
            text: "Use um PDF padronizado do JABOT para gerar as imagens recortadas dos códigos de barras."
        },
        {
            step: "2",
            title: "Gerar etiquetas",
            tool: "EVB Labels",
            text: "Use a planilha de dados botânicos junto com os códigos recortados no passo anterior."
        },
        {
            step: "3",
            title: "Organizar conjuntos",
            tool: "EVB Labels Collection",
            text: "Use quando precisar gerar etiquetas para conjuntos de coletas, coleções ou lotes."
        },
        {
            step: "4",
            title: "Analisar dados",
            tool: "Análise Botânica",
            text: "Use a planilha de dados para obter resumos taxonômicos e informações de coleção."
        },
        {
            step: "5",
            title: "Converter speciesLink",
            tool: "SpeciesLink para JABOT",
            text: "Use uma planilha exportada do speciesLink para reorganizar os dados no fluxo do JABOT."
        }
    ],
    tools: [
        {
            toolId: "jabot-extract",
            expectedInput: "PDF do JABOT com uma página de códigos de barras no formato padrão.",
            steps: [
                "Abra a ferramenta JABOT Extract.",
                "Carregue o PDF de exemplo ou um PDF gerado pelo JABOT.",
                "Confira se os códigos foram identificados corretamente.",
                "Exporte as imagens recortadas para usar nas etapas de etiquetas."
            ],
            commonErrors: [
                "PDF fora do padrão esperado.",
                "Página com resolução muito baixa.",
                "Código não identificado para nomear o arquivo automaticamente."
            ],
            exampleUrl: "exemplos/jabot-extract-codigos-barras.pdf",
            exampleLabel: "Baixar PDF exemplo"
        },
        {
            toolId: "evb-labels",
            expectedInput: "Planilha de dados botânicos e imagens de códigos de barras geradas pelo JABOT Extract.",
            steps: [
                "Primeiro gere os códigos recortados no JABOT Extract.",
                "Abra o EVB Labels.",
                "Carregue a planilha de dados de etiquetas.",
                "Informe ou selecione os códigos de barras correspondentes.",
                "Confira a prévia e gere as etiquetas."
            ],
            commonErrors: [
                "Código de barras ausente na pasta usada pela ferramenta.",
                "Nome científico ou localidade muito longo para a etiqueta.",
                "Colunas da planilha com nomes diferentes do modelo."
            ],
            exampleUrl: "exemplos/evb-labels-dados-etiquetas.xlsx",
            exampleLabel: "Baixar planilha exemplo"
        },
        {
            toolId: "evb-labels-collection",
            expectedInput: "Planilha de dados organizada para conjuntos de coletas ou coleções.",
            steps: [
                "Abra o EVB Labels Collection.",
                "Carregue a planilha modelo de conjuntos.",
                "Confira os agrupamentos e dados principais.",
                "Gere as etiquetas do lote."
            ],
            commonErrors: [
                "Planilha sem campos mínimos para agrupamento.",
                "Registros duplicados ou incompletos.",
                "Dados de coleção em formato diferente do modelo."
            ],
            exampleUrl: "exemplos/evb-labels-collection-dados.xlsx",
            exampleLabel: "Baixar planilha exemplo"
        },
        {
            toolId: "analise-botanica",
            expectedInput: "Planilha de dados botânicos no mesmo padrão usado pelo EVB Labels.",
            steps: [
                "Abra a Análise Botânica.",
                "Carregue a planilha de dados.",
                "Confira os campos reconhecidos.",
                "Gere os resumos e estatísticas da coleção."
            ],
            commonErrors: [
                "Colunas taxonômicas ausentes.",
                "Nomes de família, gênero ou espécie inconsistentes.",
                "Planilha com linhas vazias ou cabeçalho fora do padrão."
            ],
            exampleUrl: "exemplos/evb-labels-dados-etiquetas.xlsx",
            exampleLabel: "Baixar planilha exemplo"
        },
        {
            toolId: "specieslink-jabot",
            expectedInput: "Planilha exportada diretamente do speciesLink.",
            steps: [
                "Exporte os dados no speciesLink.",
                "Abra a ferramenta SpeciesLink para JABOT.",
                "Carregue a planilha exportada.",
                "Confira os campos convertidos.",
                "Exporte a tabela reorganizada."
            ],
            commonErrors: [
                "Arquivo exportado com separador ou codificação inesperada.",
                "Campos obrigatórios ausentes na exportação.",
                "Dados de localidade ou taxonomia incompletos."
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
    { src: "img/fotos/F5.jpg", alt: "Sala do herbário", caption: "Equipe do Herbário no último dia de estágio da Any Valentina" },
    { src: "img/fotos/F8.jpg", alt: "Sala do herbário", caption: "Sonia Marcela no processo de digitalização das exsicatas" }    
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
            "O Instagram do EVB reúne registros da rotina do herbário, ações de educação ambiental, divulgação científica, atividades de pesquisa e momentos de interação com a comunidade.",
            "Esta área também pode destacar publicações e eventos importantes sem depender da API do Instagram, mantendo a página leve e estável."
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
            "Esta seção reúne informações práticas sobre formas de interação com o herbário. Os textos abaixo funcionam como modelo inicial e podem ser ajustados conforme as normas internas do EVB."
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
            "Para baixar um arquivo modelo, use os botões indicados em cada ferramenta."
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
            "Este espaço reúne trabalhos publicados por membros da equipe e colaboradores do herbário. Para adicionar novos registros, edite a lista repositoryItems no arquivo data/site-data.js."
        ],
        repository: repositoryItems,
        image: "",
        imageAlt: "",
        actionLabel: "",
        actionUrl: ""
    }
];

    window.EVB_SITE_DATA = {
    tools,
    photoGallery,
    teamMembers,
    repositoryItems,
    serviceItems,
    instagramInfo,
    toolHelp,
    infoPages
};
})();
