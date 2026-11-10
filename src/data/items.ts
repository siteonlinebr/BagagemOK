import { LuggageItem } from '../types';

export const LUGGAGE_ITEMS: LuggageItem[] = [
  // 1. ELETRÔNICOS E BATERIAS
  {
    id: 'power-bank',
    name: 'Power bank (Carregador portátil) — Regras 2026',
    synonyms: ['power bank', 'powerbank', 'carregador portátil', 'bateria portátil', 'bateria externa', 'carregador móvel', 'power bank celular', 'carregador de celular portátil'],
    category: 'eletronicos',
    shortDescription: 'Bateria externa de íon de lítio para recarga móvel. Atualizada com a Portaria ANAC nº 21/SPO (IS 175-001M) e Adendo nº 1 da OACI (vigente desde março/abril de 2026).',
    popularQuery: true,
    isBatteryOrPowerBank: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido na cabine até 2 unidades de no máximo 100 Wh cada. PROIBIDO USAR OU RECARREGAR A BORDO!',
      conditions: [
        'MÁXIMO DE 2 UNIDADES POR PASSAGEIRO (Nova regra mandatória aprovada pela OACI no Adendo nº 1 ao Doc 9284 e implementada pela ANAC na Portaria Regulatória nº 21/SPO / IS 175-001M).',
        'TRANSPORTE EXCLUSIVO NA CABINE: Nunca despachar no porão.',
        'PROIBIDO RECARREGAR O POWER BANK A BORDO: Não pode ser conectado a nenhuma tomada ou porta USB da aeronave.',
        'PROIBIDO UTILIZAR O POWER BANK PARA ALIMENTAR OUTROS DISPOSITIVOS DURANTE O VOO (Regra de segurança internacional para evitar superaquecimento na cabine).',
        'Limite geral: até 100 Wh (aprox. 27.000 mAh a 3.7V) liberado; entre 100 e 160 Wh necessita de autorização prévia da companhia aérea; acima de 160 Wh é proibido.',
        'Devem ser protegidos individualmente contra curto-circuitos (fita isolante nos terminais ou estojo próprio).',
        'As informações de capacidade em Wh ou mAh e Volts devem estar legíveis no corpo do dispositivo.',
      ],
      numericLimits: {
        maxWh: 100,
        maxMah: 27000,
      },
      warnings: [
        'LATAM: Obrigatoriamente posicionado sob o assento à sua frente. É PROIBIDO guardar o power bank no compartimento superior (overhead bin) na LATAM!',
        'Se a sua mala de mão for despachada de última hora no portão por falta de espaço no avião, você é OBRIGADO a retirar o power bank e levá-lo consigo no assento.',
        'Dispositivos sem selo de fábrica legível com Wh/mAh serão retidos no raio-X.',
      ],
    },
    checkedLuggage: {
      status: 'nao_permitido',
      summary: 'Terminantemente PROIBIDO na bagagem despachada.',
      conditions: [
        'Proibição absoluta da ANAC (RBAC 175 e Portaria 21/SPO) e da OACI para prevenção de incêndios e explosões por fuga térmica no compartimento de carga despressurizado.',
      ],
      warnings: [
        'Se identificado no scanner de porão, a mala será retida, aberta pelos agentes de segurança e o item apreendido.',
      ],
    },
    airlineNotes: {
      LATAM: 'LATAM (Regra detalhada publicada desde abril/2026): Máximo 2 power banks de até 100 Wh. Apenas na cabine, OBRIGATORIAMENTE acessíveis sob o assento à frente (proibido colocar no bagageiro superior). Proibido usar para carregar aparelhos em voo e proibido plugar nas tomadas da aeronave.',
      GOL: 'GOL (Vigência 04/05/2026 - Detalhe a confirmar): Classifica power banks como baterias sobressalentes na cabine até 100 Wh. A documentação geral cita até 20 baterias, mas ainda necessita confirmação sobre como aplica especificamente o teto OACI/ANAC de 2 power banks.',
      AZUL: 'Azul (Confirmação pendente): A página oficial de bagagens não apresenta orientação específica e atualizada sobre o novo teto de 2 power banks da OACI/Portaria 21/SPO. Princípio BagagemOK: a ausência de informação não é permissão irrestrita (Status: Necessita de confirmação).',
    },
    internationalNotes: 'Adendo nº 1 ao Doc 9284 da OACI em vigor global desde 27/03/2026: máximo de 2 power banks por passageiro e proibição de uso ou recarga a bordo em todos os voos internacionais (EUA/TSA, Europa/EASA, etc.).',
    officialSources: [
      {
        name: 'ANAC — Portaria Regulatória nº 21/SPO (IS 175-001M)',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/artigos-perigosos',
        lastVerified: '10/11/2026',
        publisher: 'ANAC',
        documentReference: 'Portaria 21/SPO / DOU 06/04/2026',
      },
      {
        name: 'OACI (ICAO) — Adendo nº 1 às Instruções Técnicas Doc 9284',
        url: 'https://www.icao.int',
        lastVerified: '10/11/2026',
        publisher: 'OACI',
        documentReference: 'Doc 9284 Vigente desde 27/03/2026',
      },
      {
        name: 'Ministério de Portos e Aeroportos — Novas Regras para Power Banks',
        url: 'https://www.gov.br/mpor/pt-br',
        lastVerified: '10/11/2026',
        publisher: 'ANAC',
        documentReference: 'Orientações oficiais de 20/05/2026 e 21/07/2026',
      },
      {
        name: 'LATAM Airlines — Regras de Artigos Restritos 2026',
        url: 'https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/bagagem/itens-restritos',
        lastVerified: '10/11/2026',
        publisher: 'LATAM',
      },
      {
        name: 'GOL — Transporte de Eletrônicos e Baterias',
        url: 'https://www.voegol.com.br/informacoes/bagagem/itens-proibidos-e-restritos',
        lastVerified: '10/11/2026',
        publisher: 'GOL',
      },
      {
        name: 'Azul — Bagagem e Restrições',
        url: 'https://www.voeazul.com.br/br/pt/sua-viagem/planeje-sua-viagem/bagagem/itens-proibidos',
        lastVerified: '10/11/2026',
        publisher: 'AZUL',
      },
    ],
    lastVerifiedDate: '10/11/2026',
    verificationStatus: 'verificado',
  },

  {
    id: 'notebook',
    name: 'Notebook / Laptop',
    synonyms: ['notebook', 'laptop', 'computador portátil', 'macbook', 'pc portátil'],
    category: 'eletronicos',
    shortDescription: 'Computador portátil com bateria de íon de lítio acoplada.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido',
      summary: 'Permitido na mala de mão ou item pessoal (mochila).',
      conditions: [
        'A bateria instalada no notebook deve ter capacidade inferior a 100 Wh (a grande maioria dos notebooks comerciais varia entre 45 Wh e 99 Wh para atender às normas aéreas).',
        'No canal de inspeção de segurança do raio-X, retire o notebook da bolsa/mochila e posicione-o sozinho em uma bandeja plástica, a menos que o aeroporto utilize scanner tomográfico 3D de última geração.',
      ],
      warnings: [
        'Aparelhos com histórico recente de recall de bateria de fábrica (ex: certas séries antigas de MacBook Pro 15") precisam ter a bateria substituída e laudo antes do embarque.',
      ],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido com condições, mas fortemente desaconselhado pelas companhias.',
      conditions: [
        'O notebook deve estar COMPLETAMENTE DESLIGADO (não em modo suspensão ou hibernação).',
        'Deve ser protegido contra ativação acidental e contra danos físicos em capa acolchoada ou estojo rígido.',
      ],
      warnings: [
        'As companhias aéreas não indenizam itens de alto valor eletrônico despachados sem declaração prévia de valor no check-in.',
        'Risco de avarias mecânicas severas durante o manuseio das esteiras e malas.',
      ],
    },
    officialSources: [
      {
        name: 'ANAC — Dicas para transportar eletrônicos',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
      {
        name: 'LATAM — Transporte de Objetos de Valor e Eletrônicos',
        url: 'https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/bagagem',
        lastVerified: 'Janeiro 2025',
        publisher: 'LATAM',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'celular-smartphone',
    name: 'Celular / Smartphone',
    synonyms: ['celular', 'smartphone', 'telefone', 'iphone', 'samsung galaxy', 'aparelho celular'],
    category: 'eletronicos',
    shortDescription: 'Telefone móvel com bateria integrada de lítio.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido',
      summary: 'Permitido livremente na bagagem de mão ou consigo.',
      conditions: [
        'Deve ser colocado em modo avião (Airplane Mode) durante todo o voo a partir do fechamento das portas da aeronave, ou conforme instruções dos comissários.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido, porém totalmente desaconselhado.',
      conditions: [
        'Deve estar 100% desligado se for colocado dentro da mala despachada.',
      ],
      warnings: [
        'Risco de furto e avaria física. Leve sempre com você na cabine.',
      ],
    },
    officialSources: [
      {
        name: 'ANAC — Eletrônicos a Bordo',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'baterias-avulsas-litio',
    name: 'Baterias de lítio avulsas / Pilhas recarregáveis',
    synonyms: ['baterias avulsas', 'pilha recarregável', 'bateria de câmera', 'bateria 18650', 'bateria drone avulsa', 'baterias de reposição'],
    category: 'eletronicos',
    shortDescription: 'Baterias sobressalentes não instaladas dentro de um equipamento eletrônico.',
    popularQuery: false,
    isBatteryOrPowerBank: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido apenas na bagagem de mão, até 100 Wh com terminais protegidos.',
      conditions: [
        'Os polos metálicos (+ e -) devem estar isolados (fita isolante nos terminais ou cada bateria guardada em saco plástico individual ou estojo rígido).',
        'Até 100 Wh por bateria: permitido para uso de consumo pessoal.',
        'Entre 100 Wh e 160 Wh: máximo de 2 unidades sobressalentes e somente com anuência expressa da cia.',
      ],
      warnings: [
        'Nunca transporte baterias de lítio avulsas soltas no bolso junto com moedas ou chaves metálicas (risco iminente de curto-circuito e fogo).',
      ],
    },
    checkedLuggage: {
      status: 'nao_permitido',
      summary: 'Proibido na bagagem despachada.',
      conditions: [
        'Proibição estrita pelo RBAC 175 e normas da OACI para mitigar risco de incêndio incontrolável no porão de carga.',
      ],
      warnings: ['Baterias avulsas identificadas no scanner de porão geram abertura forçada da mala ou retenção do volume.'],
    },
    officialSources: [
      {
        name: 'ANAC — Transporte de Baterias Sobressalentes',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/artigos-perigosos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'camera-fotografica',
    name: 'Câmera fotográfica e lentes',
    synonyms: ['câmera fotográfica', 'dslr', 'mirrorless', 'lentes de câmera', 'gopro', 'filmadora'],
    category: 'eletronicos',
    shortDescription: 'Equipamentos fotográficos profissionais ou de uso pessoal.',
    popularQuery: false,
    handLuggage: {
      status: 'permitido',
      summary: 'Permitido na mala de mão ou mochila de bordo.',
      conditions: [
        'Câmeras e objetivas devem ser acomodadas preferencialmente na bagagem de mão para evitar choques mecânicos.',
        'Baterias sobressalentes de câmera devem ir obrigatoriamente na bagagem de mão.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido com condições (com a bateria instalada desligada), mas altamente desaconselhado.',
      conditions: [
        'O corpo da câmera pode ser despachado em case rígido almofadado (tipo Pelican/estojo antichoque).',
        'Baterias sobressalentes NÃO podem ser despachadas.',
      ],
      warnings: ['Equipamento frágil e de alto valor. Risco de quebra de lentes.'],
    },
    officialSources: [
      {
        name: 'ANAC — Artigos de Valor',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'drone',
    name: 'Drone de filmagem / recreativo',
    synonyms: ['drone', 'dji', 'quadricóptero', 'drone com câmera', 'aeromodelo'],
    category: 'eletronicos',
    shortDescription: 'Aeronave não tripulada com baterias de lítio de alta densidade energética.',
    popularQuery: true,
    isBatteryOrPowerBank: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Recomendado levar na mala de mão, com baterias até 100 Wh.',
      conditions: [
        'Todas as baterias de lítio do drone (LiPo) devem ser transportadas na bagagem de mão em bolsas anti-chamas (LiPo safe bag).',
        'Baterias de até 100 Wh permitidas; modelos profissionais entre 100 Wh e 160 Wh exigem autorização da companhia.',
        'As hélices sobressalentes pontiagudas podem necessitar de despacho se tiverem extremidades perfurantes.',
      ],
      warnings: ['Verifique a regulamentação de registro de drones no destino (no Brasil: ANATEL, ANAC e DECEA/SARPAS).'],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'A carcaça do drone pode ser despachada, MAS SEM AS BATERIAS.',
      conditions: [
        'O corpo do drone (sem baterias) pode ser despachado em mala rígida acolchoada.',
        'As baterias de lítio DEVEM ser retiradas e levadas consigo na cabine.',
      ],
      warnings: ['Nunca despache o drone com as baterias de polímero de lítio conectadas.'],
    },
    officialSources: [
      {
        name: 'ANAC — Orientações para Drones em Viagens',
        url: 'https://www.gov.br/anac/pt-br/assuntos/drones',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'cigarro-eletronico-vape',
    name: 'Cigarro eletrônico / Vape / Pod',
    synonyms: ['cigarro eletrônico', 'vape', 'pod', 'vaper', 'e-cigarette', 'cigarro eletronico', 'juul'],
    category: 'eletronicos',
    shortDescription: 'Dispositivo eletrônico para fumo com bateria integrada e atomizador.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido APENAS na bagagem de mão ou no bolso do passageiro.',
      conditions: [
        'É expressamente PROIBIDO o uso e o carregamento do dispositivo a bordo da aeronave ou nos banheiros sob pena de crime contra a segurança de voo.',
        'O líquido (essência) deve respeitar a regra geral de líquidos (em voos internacionais, frascos de até 100 ml em saco zip de 1 litro).',
      ],
      warnings: [
        'No Brasil, a ANVISA proíbe a comercialização e importação de cigarros eletrônicos (RDC nº 855/2024). Ao ingressar no país em voos internacionais, o produto pode ser apreendido pela Receita Federal.',
      ],
    },
    checkedLuggage: {
      status: 'nao_permitido',
      summary: 'PROIBIDO despachar cigarros eletrônicos.',
      conditions: [
        'Proibição mandatória da OACI, FAA e ANAC devido a inúmeros incidentes de superaquecimento e ativação involuntária da resistência no porão.',
      ],
      warnings: ['Se esquecido na mala despachada, a mala será retida para remoção de segurança.'],
    },
    officialSources: [
      {
        name: 'ANAC — Dispositivos Eletrônicos para Fumar',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/artigos-perigosos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
      {
        name: 'ANVISA — Regulamentação de Cigarros Eletrônicos',
        url: 'https://www.gov.br/anvisa/pt-br/assuntos/tabaco/cigarro-eletronico',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  // 2. LÍQUIDOS E HIGIENE
  {
    id: 'perfume',
    name: 'Perfume e colônia',
    synonyms: ['perfume', 'colônia', 'eau de parfum', 'eau de toilette', 'fragrância', 'desodorante colônia'],
    category: 'liquidos',
    shortDescription: 'Fragrâncias e cosméticos perfumados líquidos.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Voo doméstico: frascos normais permitidos; Voo internacional: limite estrito de 100 ml por frasco.',
      conditions: [
        'Voo Doméstico (Brasil): a ANAC permite até 500 ml ou 500 g por recipiente e um total máximo de 2 litros/2 kg de artigos de higiene e medicinais por passageiro.',
        'Voo Internacional: frascos individuais com capacidade MÁXIMA de 100 ml cada. O frasco deve ter capacidade marcada de até 100 ml (um frasco de 150 ml com apenas 50 ml de perfume NÃO é aceito no raio-X internacional).',
        'Voo Internacional: todos os frascos de até 100 ml devem caber confortavelmente em 1 único saco plástico transparente e selável (tipo ziploc) com capacidade de até 1 litro (medidas aprox. de 20x20 cm).',
      ],
      numericLimits: {
        maxSingleMl: 100,
        maxTotalLitres: 1,
      },
      warnings: [
        'Perfumes adquiridos no Free Shop (Duty Free) após a inspeção de raio-X podem embarcar na cabine lacrados na embalagem STEB transparente com a nota fiscal visível.',
      ],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido na mala despachada até 500 ml por frasco e máximo 2 litros total.',
      conditions: [
        'O limite conjunto da ANAC para artigos de higiene pessoal e aerossóis despachados é de 2 kg ou 2 litros no total, e nenhum frasco individual pode exceder 500 ml / 500 g.',
        'Embale os frascos de vidro em sacos plásticos ou plástico-bolha para evitar vazamento em caso de impacto nas bagagens.',
      ],
      warnings: [],
    },
    airlineNotes: {
      LATAM: 'LATAM publica condições específicas para determinados produtos medicinais e de higiene em voos domésticos no Brasil, autorizando até quatro embalagens de 300 ml ou 300 g cada (não deve ser confundido com autorização geral para qualquer líquido). Em voos internacionais, segue estritamente a regra dos 100 ml.',
      GOL: 'Em voos nacionais, a GOL permite artigos de higiene em frascos de uso pessoal normal, respeitando o limite global de 2 kg. Em internacionais, aplica frascos de até 100 ml no saquinho de 1 litro.',
      AZUL: 'Azul recomenda vedar tampas de frascos despachados devido à despressurização; em voos internacionais exige o fracionamento em embalagens de até 100 ml.',
    },
    internationalNotes: 'A regra dos 100 ml é padrão global da ICAO/OACI adotada pela ANAC para voos internacionais, TSA (EUA) e União Europeia.',
    officialSources: [
      {
        name: 'ANAC — Transporte de Líquidos em Voos Nacionais e Internacionais',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: '10/11/2026',
        publisher: 'ANAC',
      },
      {
        name: 'LATAM Airlines — Transporte de Líquidos e Higiene',
        url: 'https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/bagagem',
        lastVerified: '10/11/2026',
        publisher: 'LATAM',
      },
      {
        name: 'Receita Federal — Compras em Free Shop e Líquidos',
        url: 'https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/viagens-internacionais',
        lastVerified: '10/11/2026',
        publisher: 'RECEITA_FEDERAL',
      },
    ],
    lastVerifiedDate: '10/11/2026',
    verificationStatus: 'verificado',
  },

  {
    id: 'shampoo-condicionador',
    name: 'Shampoo, condicionador e sabonete líquido',
    synonyms: ['shampoo', 'xampu', 'condicionador', 'sabonete líquido', 'creme de cabelo', 'loção corporal', 'hidratante'],
    category: 'liquidos',
    shortDescription: 'Produtos de higiene capilar e corporal de consistência líquida, cremosa ou gel.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Doméstico: permitido em frascos de uso pessoal; Internacional: frascos de até 100 ml.',
      conditions: [
        'Voos nacionais (domésticos no Brasil): não há restrição de 100 ml, mas recomenda-se levar na mala despachada se for volume grande para economizar peso na mala de mão de 10 kg.',
        'Voos internacionais: OBRIGATORIAMENTE frascos individuais de no máximo 100 ml cada, dentro do saco plástico transparente de 1 litro.',
      ],
      numericLimits: {
        maxSingleMl: 100,
      },
      warnings: ['Produtos pastosos, cremes e géis são juridicamente classificados como líquidos na aviação.'],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido na mala despachada.',
      conditions: [
        'Respeitar o limite total combinado de 2 litros ou 2 kg de produtos de higiene por passageiro.',
        'Passe fita adesiva na tampa ou coloque em saco com fecho hermético para evitar que a despressurização faça o produto vazar sobre as roupas.',
      ],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Regras de Líquidos',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'desodorante-aerossol',
    name: 'Desodorante aerossol / Spray',
    synonyms: ['desodorante aerossol', 'spray aerossol', 'antitranspirante aerosol', 'desodorante spray', 'spray de cabelo', 'fixador'],
    category: 'liquidos',
    shortDescription: 'Produtos cosméticos e de higiene sob pressão aerossol.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Voo nacional: até 4 frascos de até 300 ml/300 g cada; Internacional: até 100 ml.',
      conditions: [
        'Voos domésticos no Brasil: a ANAC autoriza até 4 frascos de aerossóis de uso cosmético ou médico por pessoa, de até 300 ml ou 300 g por recipiente.',
        'Voos internacionais: apenas frascos menores com no máximo 100 ml/100 g dentro do saquinho de líquidos.',
        'O bico difusor do aerossol deve ter tampa de proteção contra liberação acidental.',
      ],
      warnings: ['Aerossóis de uso doméstico (inseticidas, tintas, lubrificantes) são PROIBIDOS tanto na mão quanto despachados.'],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido na mala despachada até 500 ml por frasco, máx 2 litros total.',
      conditions: [
        'Apenas aerossóis de uso pessoal (higiene ou saúde).',
        'Cada frasco individual não pode ter capacidade superior a 500 ml / 500 g.',
        'A soma de todos os aerossóis e líquidos de higiene não pode ultrapassar 2 kg ou 2 litros por passageiro.',
        'Válvula protegida por tampa para evitar acionamento involuntário pela movimentação de bagagens.',
      ],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Transporte de Aerossóis (RBAC 175)',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/artigos-perigosos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'pasta-de-dente',
    name: 'Pasta de dente / Creme dental',
    synonyms: ['pasta de dente', 'creme dental', 'gel dental'],
    category: 'liquidos',
    shortDescription: 'Creme dental para higiene bucal.',
    popularQuery: false,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Doméstico: permitido sem restrição rígida; Internacional: tubo de até 100 g / 100 ml.',
      conditions: [
        'Em voos internacionais, tubos maiores que 100 g serão confiscados na esteira de inspeção, mesmo que quase vazios.',
        'Compre tubos tamanho "viagem" (travel size de 30 g ou 50 g) para voos internacionais.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido livremente na bagagem despachada.',
      conditions: ['Sem restrições especiais além dos limites comuns de peso da mala.'],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Guia de Bagagem',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'alcool-em-gel',
    name: 'Álcool em gel (antisséptico)',
    synonyms: ['álcool em gel', 'alcool gel', 'antisséptico para as mãos', 'alcool 70 gel'],
    category: 'liquidos',
    shortDescription: 'Higienizador antisséptico para as mãos à base de álcool.',
    popularQuery: false,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Doméstico: até 500 ml por frasco; Internacional: frasco de até 100 ml.',
      conditions: [
        'Voo Doméstico: frascos de até 500 ml são permitidos conforme flexibilização sanitária da ANAC.',
        'Voo Internacional: frascos de no máximo 100 ml dentro do saquinho plástico de 1 litro.',
      ],
      warnings: ['Álcool líquido com teor acima de 70% inflamável pode ter restrições como artigo perigoso.'],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido frascos até 500 ml dentro do limite de 2 kg/litros total.',
      conditions: ['Embalagem bem fechada para evitar vazamentos.'],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Regras para Álcool em Gel',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  // 3. MEDICAMENTOS E SAÚDE
  {
    id: 'medicamentos-comuns',
    name: 'Medicamentos comuns (comprimidos / analgésicos)',
    synonyms: ['medicamentos', 'remédio', 'remedio', 'comprimidos', 'analgésico', 'dipirona', 'paracetamol', 'antitérmico', 'anti-inflamatório'],
    category: 'medicamentos',
    shortDescription: 'Medicamentos de venda livre em comprimidos, cápsulas ou pastilhas.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido',
      summary: 'Permitido na mala de mão na quantidade necessária para a viagem.',
      conditions: [
        'Recomenda-se manter na caixa ou cartela original com nome comercial e lote visíveis.',
        'Sempre transporte medicamentos essenciais na bagagem de mão, prevenindo transtornos em caso de extravio de bagagem despachada.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido, mas desaconselhado para remédios essenciais diários.',
      conditions: [
        'Mantenha medicamentos de uso contínuo sempre consigo na cabine.',
        'O porão de bagagens pode passar por variações extremas de temperatura durante o voo.',
      ],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Medicamentos em Viagens Aéreas',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'medicamentos-controlados',
    name: 'Medicamentos controlados / Tarja preta',
    synonyms: ['medicamento controlado', 'remédio controlado', 'tarja preta', 'ansiolítico', 'antidepressivo', 'psicotrópico', 'antibiótico com receita'],
    category: 'medicamentos',
    shortDescription: 'Fármacos sujeitos a controle especial e retenção de receita.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido com receita médica no nome do passageiro.',
      conditions: [
        'É OBRIGATÓRIO portar a receita médica legível emitida em nome do passageiro.',
        'Em viagens internacionais, tenha a receita traduzida para inglês ou idioma do país de destino, com nome genérico (DCI) da substância.',
        'Mantenha na embalagem original da farmácia com a etiqueta.',
        'Leve a quantidade estritamente compatível com o período da viagem.',
      ],
      warnings: [
        'Certos medicamentos comuns no Brasil (ex: dipirona, derivados de anfetamina como Ritalina/Venvanse, canabidiol) são proibidos ou estritamente controlados em países como EUA, Japão, Emirados Árabes e Cingapura. Verifique a embaixada do destino.',
      ],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido, mas contraindicado despachar remédios controlados.',
      conditions: ['Leve sempre na bagagem de mão para evitar crises em caso de atraso ou perda de bagagem.'],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC & ANVISA — Medicamentos Controlados em Viagem Internacional',
        url: 'https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/controlados',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'insulina-seringas',
    name: 'Insulina, seringas e agulhas para diabetes',
    synonyms: ['insulina', 'seringa', 'agulha de insulina', 'caneta de insulina', 'glicosímetro', 'sensor freestyle libre', 'diabetes'],
    category: 'medicamentos',
    shortDescription: 'Insumos e medicamentos para tratamento de diabetes.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido na mala de mão com laudo/receita médica.',
      conditions: [
        'A insulina líquida está ISENTA da restrição de 100 ml em voos internacionais, desde que acompanhada de prescrição médica comprovando a necessidade durante a viagem.',
        'As seringas e agulhas devem possuir capas protetoras de fábrica.',
        'Se utilizar bolsas térmicas com gelo gel (ice pack), informe aos agentes de segurança do raio-X antes da inspeção.',
        'Apresente o laudo médico no canal de inspeção.',
      ],
      warnings: [
        'NUNCA despache a insulina no porão da aeronave: as temperaturas negativas do porão podem congelar a insulina e destruir suas propriedades terapêuticas irreversivelmente!',
      ],
    },
    checkedLuggage: {
      status: 'nao_permitido',
      summary: 'Contraindicado e clinicamente proibido para a insulina (risco de congelamento).',
      conditions: [
        'Seringas e lancetas lacradas sobressalentes podem ser despachadas.',
        'A insulina em si NÃO deve ser despachada devido ao congelamento.',
      ],
      warnings: ['Insulina congela a 0°C e estraga no porão.'],
    },
    officialSources: [
      {
        name: 'ANAC — Transporte de Medicamentos Líquidos Especiais',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
      {
        name: 'Sociedade Brasileira de Diabetes — Viagens Aéreas',
        url: 'https://diabetes.org.br',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'termometro-clinico',
    name: 'Termômetro clínico',
    synonyms: ['termômetro', 'termometro', 'termômetro de mercúrio', 'termômetro digital'],
    category: 'medicamentos',
    shortDescription: 'Instrumento para medição de temperatura corporal.',
    popularQuery: false,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Termômetro digital: livre; Termômetro de mercúrio: 1 unidade em estojo protetor.',
      conditions: [
        'Termômetro digital infravermelho ou eletrônico: permitido livremente.',
        'Termômetro de mercúrio tradicional: apenas 1 unidade por passageiro para uso pessoal e obrigatoriamente dentro de estojo plástico rígido protetor.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido 1 unidade de mercúrio em estojo ou digitais com pilhas desligadas.',
      conditions: ['Deve estar em estojo protetor contra choque mecânico para evitar quebra do vidro.'],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Mercadorias Perigosas em Pequenas Quantidades',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/artigos-perigosos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  // 4. ALIMENTOS E BEBIDAS
  {
    id: 'alimentos-solidos',
    name: 'Alimentos sólidos (sanduíches, snacks, frutas)',
    synonyms: ['alimentos', 'lanche', 'sanduíche', 'biscoito', 'salgadinho', 'fruta', 'chocolate', 'barra de cereal', 'comida'],
    category: 'alimentos',
    shortDescription: 'Comidas secas ou lanches rápidos para consumo durante a viagem.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido',
      summary: 'Permitido em voos domésticos; em voos internacionais, atenção às regras sanitárias do destino.',
      conditions: [
        'Em voos domésticos dentro do Brasil: livre para levar sanduíches, bolos, salgadinhos e doces embalados.',
        'Em voos internacionais: o consumo a bordo é permitido, mas ao desembarcar no país de destino é proibido entrar com alimentos frescos (frutas, vegetais in natura, carne, queijo artesanal) sem declaração sanitária alfandegária (ex: MAPA no Brasil, USDA nos EUA, EFSA na Europa).',
      ],
      warnings: ['Coma antes de pousar em voos internacionais ou descarte antes da alfândega do país de chegada para evitar multas.'],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido, sujeito às proibições alfandegárias de produtos de origem vegetal ou animal no destino.',
      conditions: [
        'Alimentos industrializados secos lacrados em embalagem comercial são geralmente aceitos.',
        'Alimentos perecíveis sem refrigeração correm risco de deterioração.',
      ],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Transporte de Alimentos',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
      {
        name: 'Ministério da Agricultura e Pecuária (MAPA) — VIGIAGRO',
        url: 'https://www.gov.br/agricultura/pt-br/assuntos/vigilancia-agropecuaria',
        lastVerified: 'Janeiro 2025',
        publisher: 'MAPA',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'comida-de-bebe',
    name: 'Comida de bebê, leite e papinha infantil',
    synonyms: ['comida de bebê', 'papinha', 'fórmula infantil', 'leite ninho', 'mamadeira', 'leite materno', 'comida para bebê'],
    category: 'alimentos',
    shortDescription: 'Alimentação infantil líquida, pastosa ou em pó para lactentes e crianças de colo.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'ISENTO do limite de 100 ml em voos internacionais, na quantidade necessária para o voo.',
      conditions: [
        'A criança ou bebê deve estar viajando no mesmo voo.',
        'Permitido transportar a quantidade razoável de leite materno, fórmula em pó, água esterilizada para mamadeira e papinhas líquidas/pastosas necessária para a duração do voo e conexões.',
        'Deve ser apresentado separadamente na inspeção do raio-X e pode ser inspecionado visualmente pelos agentes de segurança.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido livremente na mala despachada (fórmulas em lata e papinhas bem protegidas).',
      conditions: ['Embalagens de vidro de papinhas devem estar amortecidas para evitar quebra.'],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Isenções para Alimentos Infantis',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'bebidas-alcoolicas',
    name: 'Bebidas alcoólicas (vinho, cerveja, cachaça, whisky)',
    synonyms: ['bebidas alcoólicas', 'bebida alcoolica', 'vinho', 'cerveja', 'cachaça', 'whisky', 'vodka', 'espumante', 'licor'],
    category: 'alimentos',
    shortDescription: 'Bebidas com teor alcoólico de até 70% ABV em garrafas de fábrica.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Doméstico: até 5 garrafas de 1 L (teor 24% a 70%); Internacional: proibido no raio-X, permitido se comprado no Free Shop lacrado.',
      conditions: [
        'Voo Doméstico: bebidas de 24% a 70% de teor alcoólico podem ir na mala de mão até 5 litros no total (máximo de 5 garrafas de até 1 litro cada, lacradas pelo fabricante). Bebidas com menos de 24% (cervejas e certos vinhos leves) não possuem cota específica de artigo perigoso, apenas o limite de peso.',
        'Voo Internacional: PROIBIDO passar no raio-X inicial com garrafas acima de 100 ml. Só é permitido levar na mão se for comprado no Duty Free do aeroporto após a inspeção, entregue em sacola selada (STEB) com nota fiscal anexada.',
        'Bebidas com teor alcoólico superior a 70% (ex: absinto de alta graduação ou álcool de cereais) são TOTALMENTE PROIBIDAS no avião (líquido inflamável classe 3).',
      ],
      numericLimits: {
        maxTotalLitres: 5,
      },
      warnings: [
        'É expressamente PROIBIDO ao passageiro abrir e consumir suas próprias bebidas alcoólicas a bordo do avião.',
      ],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido despachar até 5 litros por passageiro (teor 24% a 70%).',
      conditions: [
        'Embalagens de varejo originais do fabricante com teor entre 24% e 70% de álcool por volume: limite máximo de 5 litros por passageiro.',
        'Bebidas abaixo de 24% (ex: vinho comum, cerveja): podem ser despachadas respeitando a franquia geral de peso da mala (23 kg).',
        'Acima de 70% ABV: PROIBIDO despachar.',
        'Use malas com berço protetor acolchoado específico para garrafas de vinho para evitar desastres com roupas.',
      ],
      warnings: [],
    },
    airlineNotes: {
      LATAM: 'LATAM segue rigorosamente a cota de 5 litros para bebidas de 24% a 70% ABV em embalagem comercial lacrada.',
      GOL: 'GOL exige garrafas intactas de fábrica; em caso de voos internacionais com conexão, compras de duty free precisam ser redespachadas se passar por novo raio-x fora do Brasil.',
      AZUL: 'Azul não se responsabiliza por quebra de garrafas despachadas sem embalagem própria protetora.',
    },
    officialSources: [
      {
        name: 'ANAC — Regras para Bebidas Alcoólicas em Aeronaves Civis',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/artigos-perigosos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'garrafa-de-agua',
    name: 'Garrafa de água mineral / Squeeze',
    synonyms: ['água', 'garrafa de água', 'agua mineral', 'squeeze', 'garrafa térmica'],
    category: 'alimentos',
    shortDescription: 'Recipiente com água potável ou líquido para consumo imediato.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'A garrafa deve passar VAZIA no raio-X de voos internacionais.',
      conditions: [
        'Voo Internacional: líquidos acima de 100 ml não passam no raio-X de segurança. Você deve beber ou descartar a água antes do raio-X. Depois de passar pela inspeção, você pode encher a garrafa nos bebedouros da sala de embarque gratuitamente.',
        'Voo Doméstico: muitos aeroportos brasileiros aceitam garrafa de água lacrada ou água nos pontos de inspeção doméstica, mas se solicitado pelo operador aeroportuário, você deverá provar que é água ou descartar.',
        'Garrafas térmicas metálicas vazias são 100% permitidas na mala de mão.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido garrafas bem vedadas, mas não faz sentido despachar água pelo peso desnecessário.',
      conditions: [],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Inspeção de Segurança Aeroportuária',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  // 5. OBJETOS E ACESSÓRIOS
  {
    id: 'tesoura',
    name: 'Tesoura',
    synonyms: ['tesoura', 'tesoura sem ponta', 'tesourinha', 'tesoura de papel', 'tesoura de costura'],
    category: 'objetos',
    shortDescription: 'Instrumento cortante com duas lâminas articuladas.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido na mala de mão SOMENTE se a lâmina medir menos de 6 cm e tiver ponta arredondada.',
      conditions: [
        'Conforme a Resolução nº 515/2019 da ANAC e Apêndice I do PNAVSEC:',
        'Lâminas com comprimento menor ou igual a 6 cm a partir do ponto de articulação (eixo do parafuso) são permitidas na bagagem de mão, preferencialmente sem ponta pontiaguda.',
        'Tesouras escolares infantis sem ponta (lâmina curta) são permitidas.',
        'Tesouras com lâminas superiores a 6 cm ou pontas agudas perfurantes são APREENDIDAS no raio-X se estiverem na mala de mão.',
      ],
      numericLimits: {
        maxBladeCm: 6,
      },
      warnings: [
        'A decisão final no canal de inspeção cabe ao Agente de Proteção da Aviação Civil (APAC) da Polícia Federal/Aeroporto. Se tiver dúvida, coloque na mala despachada.',
      ],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido livremente na bagagem despachada.',
      conditions: [
        'Deve estar com as pontas e lâminas protegidas/embainhadas para não ferir os agentes de triagem e manuseio de bagagens.',
      ],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Itens Proibidos e Permitidos na Cabine (Resolução 515/2019)',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/itens-proibidos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'alicate-de-unha',
    name: 'Alicate de unha / Alicate de cutícula',
    synonyms: ['alicate de unha', 'alicate de cutícula', 'alicate mundial', 'cortador de unha', 'pinça de sobrancelha'],
    category: 'objetos',
    shortDescription: 'Utensílios de manicure e cuidados com as unhas.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Cortadores de unha e pinças: permitidos; Alicates com lâmina < 6 cm permitidos na ANAC.',
      conditions: [
        'Cortador de unha clássico e pinças: 100% permitidos na bagagem de mão.',
        'Alicates de unha/cutícula: a norma da ANAC permite lâminas cortantes com menos de 6 cm. Contudo, em alguns aeroportos com fiscalização mais rígida ou em voos internacionais, alicates de ponta afiada podem ser questionados.',
        'Lixas de unha de metal com ponta afiada perfurante podem ser retidas.',
      ],
      warnings: ['Se não for essencial durante o voo, coloque o alicate na mala despachada para evitar imprevistos no raio-X.'],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido sem qualquer problema na mala despachada.',
      conditions: ['Embalar no estojo de higiene pessoal.'],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Instrumentos de Cutelaria e Manicure',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/itens-proibidos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'canivete-faca',
    name: 'Canivete, faca e lâminas afiadas',
    synonyms: ['canivete', 'canivete suíço', 'victorinox', 'faca', 'estilete', 'punhal', 'navalha', 'lâmina solta'],
    category: 'objetos',
    shortDescription: 'Objetos perfurocortantes manuais com gume ou ponta afiada.',
    popularQuery: true,
    handLuggage: {
      status: 'nao_permitido',
      summary: 'TERMINANTEMENTE PROIBIDO na bagagem de mão.',
      conditions: [
        'Proibição universal de segurança da aviação civil (ANAC, OACI, TSA, EASA).',
        'Canivetes multiuso (mesmo pequenos do tipo suíço com lâmina), facas de qualquer tamanho, estiletes e navalhas serão SUMARIAMENTE CONFISCADOS e descartados na esteira de raio-X.',
      ],
      warnings: ['Não há tolerância para facas ou canivetes na cabine. O passageiro perde o item imediatamente no raio-X.'],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido na mala despachada devidamente protegido.',
      conditions: [
        'A faca ou canivete deve ser acondicionado em bainha protetora rígida ou envolvido em material resistente para impedir que fure a mala ou corte as mãos dos estivadores do aeroporto.',
      ],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Objetos Perfurocortantes',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/itens-proibidos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'isqueiro-fosforo',
    name: 'Isqueiro comum descartável / Fósforos',
    synonyms: ['isqueiro', 'fósforo', 'fosforos', 'bic', 'isqueiro descartável', 'isqueiro maçarico', 'zippo'],
    category: 'objetos',
    shortDescription: 'Dispositivos geradores de chama para acendimento.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Apenas 1 isqueiro comum descartável JUNTO AO CORPO do passageiro. Proibido dentro da mala!',
      conditions: [
        'A ANAC e a OACI autorizam exatamente 1 (um) isqueiro comum descartável a gás (ex: tipo Bic) OU 1 caixinha pequena de fósforos de segurança por passageiro.',
        'IMPORTANTE: ele deve ser transportado JUNTO AO CORPO (no bolso da calça ou camisa) e NÃO solto dentro da bagagem de mão.',
        'Isqueiros do tipo "MAÇARICO" (torch lighter, chama azul tipo turbo) e fluidos de recarga são TERMINANTEMENTE PROIBIDOS em qualquer lugar do avião.',
      ],
      warnings: [
        'Se você despachar um isqueiro dentro da mala despachada, sua mala pode ser aberta e o isqueiro descartado.',
      ],
    },
    checkedLuggage: {
      status: 'nao_permitido',
      summary: 'Proibido na bagagem despachada.',
      conditions: [
        'Proibição mandatória devido ao risco de ignição sob pressão e atrito no compartimento de bagagens.',
      ],
      warnings: ['Retire qualquer isqueiro ou fósforo da mala antes do despacho.'],
    },
    officialSources: [
      {
        name: 'ANAC — Isqueiros e Fósforos a Bordo',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/artigos-perigosos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'aparelho-de-barbear',
    name: 'Aparelho de barbear (Gilete) e lâminas',
    synonyms: ['gilete', 'aparelho de barbear', 'prestobarba', 'lâmina de barbear', 'barbeador elétrico', 'navalhete'],
    category: 'objetos',
    shortDescription: 'Aparelhos e lâminas para remoção de barba e pelos.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Aparelho descartável com lâmina embutida: PERMITIDO; Lâminas avulsas ou navalhetes: PROIBIDO.',
      conditions: [
        'Aparelhos descartáveis ou com cartucho plástico fixo (ex: Prestobarba, Mach3) são 100% PERMITIDOS na bagagem de mão.',
        'Barbeadores elétricos recarregáveis são 100% permitidos.',
        'Lâminas de barbear avulsas de corte duplo (antigas safety razors soltas) e navalhetes de barbeiro são PROIBIDOS na bagagem de mão.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido na bagagem despachada (tanto descartáveis quanto lâminas avulsas protegidas).',
      conditions: [],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Artigos de Barbearia e Cutelaria',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/itens-proibidos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'guarda-chuva',
    name: 'Guarda-chuva e sombrinha',
    synonyms: ['guarda-chuva', 'sombrinha', 'guarda chuva', 'guarda-sol'],
    category: 'objetos',
    shortDescription: 'Protetor contra chuva dobrável ou longo com haste.',
    popularQuery: false,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Sombrinha dobrável: permitida; Guarda-chuva longo com ponteira pontiaguda: pode exigir despacho.',
      conditions: [
        'Guarda-chuvas dobráveis pequenos cabem na mala de mão ou mochila e são liberados sem restrição.',
        'Guarda-chuvas compridos do tipo bengala com ponta metálica pontiaguda podem ser considerados potenciais armas brancas e retidos no raio-X.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido na bagagem despachada.',
      conditions: [],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Itens Permitidos',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'secador-e-chapinha',
    name: 'Secador de cabelo, chapinha e modelador',
    synonyms: ['secador de cabelo', 'chapinha', 'prancha de cabelo', 'modelador de cachos', 'babyliss', 'escova secadora'],
    category: 'objetos',
    shortDescription: 'Aparelhos térmicos eletrodomésticos para cabelo.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido',
      summary: 'Permitido na mala de mão.',
      conditions: [
        'Aparelhos convencionais com fio (tomada) são 100% permitidos.',
        'Atenção para chapinhas sem fio alimentadas por bateria de lítio: se a bateria for removível, ela deve ser levada na cabine. Se a bateria for fixa, deve ter capa protetora no elemento aquecedor contra acionamento involuntário.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido na bagagem despachada (aparelhos com fio).',
      conditions: [
        'Para modeladores sem fio à gás (cartuchos de butano): a tampa protetora deve estar encaixada com segurança (limite de 1 por passageiro).',
      ],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Artigos Elétricos Pessoais',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'ferramentas-manuais',
    name: 'Ferramentas de trabalho (chaves de fenda, martelos, alicates industriais)',
    synonyms: ['ferramentas', 'chave de fenda', 'martelo', 'alicate de pressão', 'furadeira', 'parafusadeira', 'trena'],
    category: 'objetos',
    shortDescription: 'Utensílios manuais ou elétricos de manutenção e obra.',
    popularQuery: false,
    handLuggage: {
      status: 'nao_permitido',
      summary: 'PROIBIDO na cabine para ferramentas > 6 cm ou ferramentas de impacto.',
      conditions: [
        'Martelos, marretas, pés de cabra, serras e furadeiras são estritamente proibidos na bagagem de mão.',
        'Chaves de fenda e chaves de boca com comprimento total superior a 6 cm são PROIBIDAS na mão.',
        'Apenas ferramentas manuais com haste menor que 6 cm sem gume afiado são toleradas.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido na bagagem despachada.',
      conditions: [
        'Ferramentas elétricas com baterias de lítio (ex: parafusadeira): o corpo da ferramenta pode ir despachado, mas as baterias de lítio sobressalentes devem ir consigo na cabine!',
      ],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Ferramentas de Trabalho e Artigos Restritos',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/itens-proibidos',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  // 6. ESPECIAIS E ESPORTIVOS
  {
    id: 'instrumento-musical-violao',
    name: 'Instrumento musical (Violão, guitarra, violino)',
    synonyms: ['violão', 'guitarra', 'violino', 'instrumento musical', 'teclado', 'flauta', 'trompete', 'ukulele'],
    category: 'especiais',
    shortDescription: 'Instrumentos musicais acústicos ou elétricos de corda, sopro ou teclas.',
    popularQuery: true,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Instrumentos pequenos cabem na mala de mão; violões podem exigir assento extra (CBBG) ou despacho.',
      conditions: [
        'Instrumentos pequenos (violino, flauta, ukulele) que respeitam o limite de 55 x 35 x 25 cm podem ser levados como bagagem de mão no bagageiro superior.',
        'Violão ou guitarra: caso ultrapasse as medidas, algumas companhias autorizam o embarque se houver espaço disponível no bin, mas não há garantia legal obrigatória.',
        'Se o passageiro não quiser despachar um instrumento de alto valor, ele pode contratar formalmente um "assento adicional para bagagem de cabine" (tarifa CBBG - Cabin Baggage) com a cia aérea com antecedência.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido mediante acondicionamento obrigatório em case rígido (hard case).',
      conditions: [
        'Nunca despache instrumentos musicais em capas flexíveis (soft bag). É indispensável utilizar case rígido profissional.',
        'Afrouxe ligeiramente a tensão das cordas antes do voo para prevenir danos no braço do instrumento decorrentes da variação de pressão e temperatura.',
      ],
      warnings: [],
    },
    airlineNotes: {
      LATAM: 'LATAM permite instrumentos na cabine caso cumpram as dimensões da bagagem de mão. Para instrumentos maiores, compre um assento adicional com antecedência ou despache em case rígido.',
      GOL: 'GOL aceita violão na cabine apenas se couber no bagageiro ou se for adquirido o serviço assento extra.',
      AZUL: 'Azul recomenda hard case para qualquer despacho de instrumento musical.',
    },
    officialSources: [
      {
        name: 'ANAC — Transporte de Instrumentos Musicais',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'prancha-de-surf',
    name: 'Prancha de surf / Stand up paddle',
    synonyms: ['prancha de surf', 'surf', 'stand up paddle', 'bodyboard', 'kite surf'],
    category: 'especiais',
    shortDescription: 'Equipamento esportivo náutico e de ondas.',
    popularQuery: false,
    handLuggage: {
      status: 'nao_permitido',
      summary: 'Não permitido na cabine devido a dimensões físicas elevadas.',
      conditions: ['Ultrapassa as dimensões máximas de 55 x 35 x 25 cm da bagagem de mão.'],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido como bagagem especial despachada com taxa e capa protetora.',
      conditions: [
        'Deve estar acondicionada em capa própria acolchoada (sarcófago/boardbag).',
        'Quilhas devem ser retiradas e guardadas separadamente.',
        'Sujeito a taxas específicas de equipamento esportivo conforme tabela da companhia aérea e tipo de aeronave.',
      ],
      warnings: ['Comunique a companhia com antecedência de 48h, pois o espaço no porão para artigos longos é limitado.'],
    },
    airlineNotes: {
      LATAM: 'LATAM cobra taxa fixa de bagagem especial esportiva por trecho para pranchas de até 300 cm lineares.',
      GOL: 'GOL aceita pranchas embaladas em capa apropriada cobrando como bagagem especial.',
      AZUL: 'Azul aceita pranchas mediante pagamento de taxa de equipamento esportivo e confirmação de capacidade do porão.',
    },
    officialSources: [
      {
        name: 'ANAC — Equipamentos Esportivos',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'bicicleta',
    name: 'Bicicleta / Bike',
    synonyms: ['bicicleta', 'bike', 'ciclismo', 'mountain bike', 'speed', 'gravel'],
    category: 'especiais',
    shortDescription: 'Veículo de propulsão humana de duas rodas.',
    popularQuery: false,
    handLuggage: {
      status: 'nao_permitido',
      summary: 'Proibido na cabine.',
      conditions: [],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido desmontada em mala-bike rígida ou caixa de papelão reforçada.',
      conditions: [
        'Pedais devem ser desrosqueados e virados para dentro.',
        'Guidão deve ser alinhado com o quadro ou desmontado.',
        'Pneus devem ser parcialmente desinflados para mitigar o efeito da despressurização da altitude.',
        'Acondicionar em mala-bike profissional (bike bag) ou caixa própria.',
        'Bicicletas elétricas (e-bikes) com bateria de lítio acima de 160 Wh são PROIBIDAS no avião!',
      ],
      warnings: ['E-bikes com baterias grandes de 250Wh a 700Wh NÃO podem voar em voos comerciais de passageiros.'],
    },
    officialSources: [
      {
        name: 'ANAC — Regras para Despacho de Bicicletas',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },

  {
    id: 'bastao-de-selfie-tripé',
    name: 'Bastão de selfie e tripé fotográfico',
    synonyms: ['bastão de selfie', 'pau de selfie', 'tripé', 'monopé', 'suporte para câmera'],
    category: 'objetos',
    shortDescription: 'Haste telescópica ou suporte retrátil para fotos.',
    popularQuery: false,
    handLuggage: {
      status: 'permitido_com_condicoes',
      summary: 'Permitido na mala de mão se dobrado e com extremidades arredondadas.',
      conditions: [
        'Bastões retráteis pequenos (até 55 cm quando recolhidos) são aceitos.',
        'Tripés profissionais pesados de alumínio ou carbono com pontas de fixação tipo estaca devem ser despachados.',
      ],
      warnings: [],
    },
    checkedLuggage: {
      status: 'permitido',
      summary: 'Permitido livremente na bagagem despachada.',
      conditions: [],
      warnings: [],
    },
    officialSources: [
      {
        name: 'ANAC — Objetos Cotidianos',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: 'Janeiro 2025',
        publisher: 'ANAC',
      },
    ],
    lastVerifiedDate: 'Janeiro 2025',
    verificationStatus: 'verificado',
  },
];
