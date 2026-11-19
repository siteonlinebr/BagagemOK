import { AirlineLuggageLimits } from '../types';

export const AIRLINES_DATA: Record<'LATAM' | 'GOL' | 'AZUL', AirlineLuggageLimits> = {
  LATAM: {
    code: 'LATAM',
    name: 'LATAM Airlines Brasil',
    handLuggage: {
      maxWeightKg: 12, // Atualizado 2026: 12 kg Economy
      premiumWeightKg: 16, // 16 kg Premium Economy / Premium Business
      dimensionsCm: {
        height: 55,
        width: 35,
        depth: 25,
      },
      description: '1 mala de cabine de até 12 kg na Economy (ou até 16 kg nas cabines Premium) de 55 x 35 x 25 cm (rodinhas e alças inclusas).',
    },
    personalItem: {
      maxWeightKg: 10,
      dimensionsCm: {
        height: 45,
        width: 35,
        depth: 20,
      },
      description: 'Mochila, bolsa ou pasta para notebook de até 10 kg que caiba obrigatoriamente sob o assento à frente.',
    },
    checkedLuggage: {
      standardWeightKg: 23,
      maxTotalDimensionsCm: 158,
      dimensionDetails: 'Soma de Comprimento + Largura + Altura até 158 cm',
      description: 'Franquia padrão de 23 kg por peça. A soma linear das dimensões não pode ultrapassar 158 cm.',
    },
    tariffRules: {
      basic: {
        name: 'Tarifa Basic',
        includesCabinBag: false, // ATENÇÃO: NÃO inclui mala de cabine!
        includesPersonalItem: true,
        includesCheckedBag: false,
        note: 'Permite APENAS 1 item pessoal (mochila/bolsa até 10 kg) sob o assento. Mala de cabine NÃO está inclusa e deve ser comprada à parte.',
      },
      standard: {
        name: 'Tarifa Light / Plus',
        includesCabinBag: true,
        includesPersonalItem: true,
        includesCheckedBag: true, // Plus inclui 1 despachada
        note: 'Light inclui item pessoal e mala de cabine (12 kg). Plus inclui também 1 peça despachada de 23 kg.',
      },
      premium: {
        name: 'Tarifa Top / Premium',
        includesCabinBag: true,
        includesPersonalItem: true,
        includesCheckedBag: true,
        note: 'Inclui item pessoal (10 kg), mala de cabine com franquia ampliada de até 16 kg e até 2 peças despachadas de 23 kg.',
      },
    },
    powerBank2026Status: {
      status: 'publicada_detalhada',
      statusLabel: 'Regra detalhada publicada (Vigente desde abril/2026)',
      effectiveDate: 'Abril de 2026',
      maxUnitsAllowed: 2,
      allowedLocations: 'Exclusivamente sob o assento do passageiro (Item Pessoal)',
      inFlightUsageAllowed: false, // PROIBIDO usar a bordo
      rechargingInFlightAllowed: false, // PROIBIDO recarregar a bordo
      storageInstruction: 'DEVE ficar acessível sob o assento dianteiro. PROIBIDO guardar no compartimento superior (overhead bin).',
      summary: 'Máximo 2 unidades de até 100 Wh cada. Exclusivamente na cabine sob o assento (proibido no bagageiro superior). A LATAM proíbe usar power banks para carregar outros dispositivos durante o voo e proíbe conectar às tomadas da aeronave. Se a mala for enviada ao porão no portão, retire o power bank imediatamente.',
    },
    specialNotes: [
      'LATAM atualizou a franquia da mala de bordo para 12 kg na classe Economy e 16 kg na Premium.',
      'A Tarifa Basic NÃO inclui mala de cabine gratuita; se levar mala de bordo sem adquirir previamente, haverá cobrança no aeroporto.',
      'Power banks NUNCA podem ser colocados no bagageiro superior (bin): devem permanecer sob o assento dianteiro para rápida identificação em caso de superaquecimento.',
    ],
    officialBagPageUrl: 'https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/bagagem',
    lastVerifiedDate: '19/11/2026',
  },

  GOL: {
    code: 'GOL',
    name: 'GOL Linhas Aéreas',
    handLuggage: {
      maxWeightKg: 12, // Atualizado 2026: 12 kg
      dimensionsCm: {
        height: 55,
        width: 35,
        depth: 25,
      },
      description: '1 mala de cabine de até 12 kg com medidas de 55 x 35 x 25 cm (apresentada no site GOL como 35 x 55 x 25 cm), rodinhas e bolsos inclusos.',
    },
    personalItem: {
      maxWeightKg: 10,
      dimensionsCm: {
        height: 43,
        width: 32,
        depth: 22,
      },
      description: '1 item pessoal de até 10 kg e dimensões 43 x 32 x 22 cm (32 x 22 x 43 cm) posicionado sob o assento dianteiro.',
    },
    checkedLuggage: {
      standardWeightKg: 23,
      maxTotalDimensionsCm: 158,
      dimensionDetails: 'Dimensões lineares máximas de 80 x 50 x 28 cm (soma 158 cm)',
      description: '1 volume de até 23 kg com dimensões máximas de 80 cm de comprimento, 50 cm de largura e 28 cm de altura.',
    },
    tariffRules: {
      basic: {
        name: 'Tarifa Basic',
        includesCabinBag: false, // Tarifa Basic permite apenas item pessoal
        includesPersonalItem: true,
        includesCheckedBag: false,
        note: 'A tarifa Basic da GOL inclui apenas o item pessoal gratuitamente (sob o assento). A mala de mão de 12 kg deve ser adquirida separadamente.',
      },
      standard: {
        name: 'Tarifa Light / Plus',
        includesCabinBag: true,
        includesPersonalItem: true,
        includesCheckedBag: true,
        note: 'Light inclui item pessoal e mala de cabine (12 kg). Plus inclui também 1 mala despachada de 23 kg.',
      },
      premium: {
        name: 'Tarifa Max / Premium Economy',
        includesCabinBag: true,
        includesPersonalItem: true,
        includesCheckedBag: true,
        note: 'Inclui item pessoal, mala de cabine de 12 kg e 2 peças despachadas de 23 kg gratuitas, além de prioridade de embarque.',
      },
    },
    powerBank2026Status: {
      status: 'detalhe_a_confirmar',
      statusLabel: 'Inconsistência documental — Detalhe a confirmar',
      effectiveDate: '04/05/2026',
      maxUnitsAllowed: 'Inconsistência documental (Regra geral cita 20 baterias vs limite OACI de 2 power banks)',
      allowedLocations: 'Exclusivamente na cabine / bagagem de mão',
      inFlightUsageAllowed: false,
      rechargingInFlightAllowed: false,
      storageInstruction: 'Devem ser mantidos na cabine com terminais protegidos contra curto-circuito.',
      summary: 'A GOL informa novas regras de baterias desde 04/05/2026 (na cabine até 100 Wh; 100–160 Wh com autorização). Ponto de atenção: a documentação oficial apresenta inconsistência entre o limite geral de baterias sobressalentes (até 20) e as regras específicas de power banks (limite OACI/ANAC de 2 unidades). Confirme antes de embarcar.',
    },
    specialNotes: [
      'GOL permite mala de mão de até 12 kg (acima dos 10 kg regulamentares da ANAC).',
      'Na tarifa Basic, apenas o item pessoal (mochila/bolsa até 10 kg) é gratuito. A mala de 12 kg precisa ser comprada.',
      'Power banks são proibidos no porão da aeronave e devem viajar na cabine com terminais isolados.',
    ],
    officialBagPageUrl: 'https://www.voegol.com.br/informacoes/bagagem',
    lastVerifiedDate: '19/11/2026',
  },

  AZUL: {
    code: 'AZUL',
    name: 'Azul Linhas Aéreas Brasileiras',
    handLuggage: {
      maxWeightKg: 10, // Mantém 10 kg ANAC
      dimensionsCm: {
        height: 55,
        width: 35,
        depth: 25,
      },
      description: '1 mala de cabine de até 10 kg com 55 x 35 x 25 cm para acomodação no compartimento superior.',
    },
    personalItem: {
      dimensionsCm: {
        height: 45,
        width: 35,
        depth: 20,
      },
      description: '1 objeto pessoal pequeno de até 45 x 35 x 20 cm guardado sob o assento dianteiro.',
    },
    checkedLuggage: {
      standardWeightKg: 23,
      maxTotalDimensionsCm: 158,
      dimensionDetails: 'Dimensões lineares máximas de 80 x 50 x 28 cm',
      description: 'Mala de até 23 kg com dimensões máximas de 80 x 50 x 28 cm.',
    },
    tariffRules: {
      basic: {
        name: 'Tarifa Azul',
        includesCabinBag: true,
        includesPersonalItem: true,
        includesCheckedBag: false,
        note: 'Inclui item pessoal e 1 mala de mão de até 10 kg na cabine. Não inclui bagagem despachada.',
      },
      standard: {
        name: 'Tarifa MaisAzul',
        includesCabinBag: true,
        includesPersonalItem: true,
        includesCheckedBag: true,
        note: 'Inclui item pessoal, mala de cabine de 10 kg e 1 mala despachada de 23 kg.',
      },
      premium: {
        name: 'Tarifa Azul Super / Business',
        includesCabinBag: true,
        includesPersonalItem: true,
        includesCheckedBag: true,
        note: 'Inclui bagagem de cabine e até 2 ou 3 volumes despachados de 23 kg conforme rota internacional.',
      },
    },
    powerBank2026Status: {
      status: 'confirmacao_pendente',
      statusLabel: 'Confirmação documental pendente',
      effectiveDate: 'Pendente de atualização detalhada',
      maxUnitsAllowed: 'Máx 2 (Regra internacional OACI desde 27/03/2026)',
      allowedLocations: 'Bagagem de mão (proibido despachar)',
      inFlightUsageAllowed: false,
      rechargingInFlightAllowed: false,
      storageInstruction: 'Levar consigo na cabine com proteção contra curto-circuito.',
      summary: 'Ainda falta confirmação documental detalhada da política operacional da Azul para o novo limite de 2 power banks da OACI/ANAC. Princípio BagagemOK: ausência de informação não é permissão irrestrita. Consulte a Azul antes de embarcar.',
    },
    specialNotes: [
      'Azul mantém o limite padrão de 10 kg na bagagem de mão (aeronaves menores como Caravan da Azul Conecta têm restrições adicionais de espaço).',
      'A franquia de bagagem despachada depende da tarifa, rota e categoria do programa TudoAzul.',
      'A regra internacional OACI (desde 27/03/2026) limita a 2 power banks, proíbe recarregar em voo e recomenda não usá-los para carregar outros aparelhos a bordo.',
    ],
    officialBagPageUrl: 'https://www.voeazul.com.br/br/pt/sua-viagem/planeje-sua-viagem/bagagem',
    lastVerifiedDate: '19/11/2026',
  },
};

export const ANAC_STANDARDS = {
  name: 'Agência Nacional de Aviação Civil (ANAC)',
  regulation: 'Resolução nº 400/2016 e Portaria Regulatória nº 21/SPO (IS 175-001M)',
  handLuggageGuaranteeKg: 10,
  handLuggageStandardCm: {
    height: 55,
    width: 35,
    depth: 25,
  },
  checkedStandardMaxKg: 23,
  checkedStandardSumDimensionsCm: 158,
  officialUrl: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
  lastVerifiedDate: '19/11/2026',
  monitoringReportDate: '19/11/2026',
  coreRulesSummary: [
    'Todo passageiro em voo com partida no Brasil tem direito a pelo menos 1 volume de bagagem de mão de até 10 kg gratuitamente, além de um item pessoal, conforme Resolução nº 400/2016.',
    'A LATAM e a GOL ampliaram voluntariamente a franquia de peso da mala de bordo para 12 kg (LATAM permite até 16 kg nas classes Premium).',
    'A OACI (Adendo nº 1 ao Doc 9284, desde 27/03/2026) e a ANAC (Portaria 21/SPO / IS 175-001M): limite de 2 power banks por passageiro até 100 Wh (100–160 Wh com autorização), somente na bagagem de mão, proibição de recarregar em voo e recomendação da OACI (proibição expressa na LATAM) de não usá-los para carregar outros aparelhos durante o voo.',
  ],
};
