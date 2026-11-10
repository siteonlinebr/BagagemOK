import { AirlineCode, FlightType, ItemCategory, ItemStatus, LuggageItem, LuggageLocation } from '../types';
import { AIRLINES_DATA } from '../data/airlines';
import { LUGGAGE_ITEMS } from '../data/items';

export interface SearchFilterOptions {
  query?: string;
  flightType?: FlightType;
  airline?: AirlineCode;
  location?: LuggageLocation;
  category?: ItemCategory | 'todas';
}

/**
 * Searches items in database using fuzzy/synonym matching and category filters.
 */
export function searchLuggageItems(options: SearchFilterOptions): LuggageItem[] {
  const q = (options.query || '').trim().toLowerCase();
  const category = options.category;

  return LUGGAGE_ITEMS.filter((item) => {
    // Category filter
    if (category && category !== 'todas' && item.category !== category) {
      return false;
    }

    if (!q) {
      return true;
    }

    // Direct name match
    if (item.name.toLowerCase().includes(q)) {
      return true;
    }

    // Synonyms match
    const hasSynonym = item.synonyms.some((s) => s.toLowerCase().includes(q) || q.includes(s.toLowerCase()));
    if (hasSynonym) {
      return true;
    }

    // Description match
    if (item.shortDescription.toLowerCase().includes(q)) {
      return true;
    }

    return false;
  }).sort((a, b) => {
    if (!q) return 0;
    // Boost exact matches
    const aExact = a.name.toLowerCase() === q || a.synonyms.some((s) => s.toLowerCase() === q);
    const bExact = b.name.toLowerCase() === q || b.synonyms.some((s) => s.toLowerCase() === q);
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    // Boost startsWith
    const aStart = a.name.toLowerCase().startsWith(q);
    const bStart = b.name.toLowerCase().startsWith(q);
    if (aStart && !bStart) return -1;
    if (!aStart && bStart) return 1;

    return 0;
  });
}

/**
 * Calculates battery Watt-hours (Wh) from mAh and Volts:
 * Wh = (mAh * V) / 1000
 */
export function calculateWattHours(mah: number, volts: number = 3.7): number {
  if (mah <= 0 || volts <= 0) return 0;
  return Number(((mah * volts) / 1000).toFixed(2));
}

export interface BatteryComplianceResult {
  wh: number;
  status: ItemStatus;
  title: string;
  description: string;
  badgeText: string;
  handAllowed: boolean;
  checkedAllowed: boolean;
  maxSparesCabine: string;
  airlineApprovalRequired: boolean;
  inFlightUsageAllowed: boolean;
  rechargingInFlightAllowed: boolean;
  tier: 'free' | 'airline_permission' | 'forbidden';
  quantityAlert?: string;
  airlineSpecificAdvice?: string;
}

export function evaluateBatteryCompliance(
  wh: number, 
  quantity: number = 1,
  airlineCode: AirlineCode = 'TODAS'
): BatteryComplianceResult {
  if (wh <= 0) {
    return {
      wh: 0,
      status: 'necessita_confirmacao',
      title: 'Informe a capacidade',
      description: 'Insira a capacidade em mAh e a voltagem do aparelho para avaliar o limite de segurança aérea.',
      badgeText: 'Necessita dados',
      handAllowed: false,
      checkedAllowed: false,
      maxSparesCabine: '0',
      airlineApprovalRequired: false,
      inFlightUsageAllowed: false,
      rechargingInFlightAllowed: false,
      tier: 'forbidden',
    };
  }

  // NOVA REGRA MANDATÓRIA 2026 (OACI Doc 9284 / ANAC Portaria nº 21/SPO - IS 175-001M):
  // Máximo estrito de 2 power banks por passageiro.
  if (quantity > 2) {
    return {
      wh,
      status: 'nao_permitido',
      title: 'Limite de unidades excedido (Máximo 2 power banks)',
      description: `A OACI (Adendo nº 1 ao Doc 9284) e a ANAC (Portaria Regulatória nº 21/SPO de 01/04/2026) limitam o transporte a no MÁXIMO 2 (dois) power banks por passageiro. Você informou ${quantity} unidades. O excedente não pode embarcar na cabine nem ser despachado no porão.`,
      badgeText: `Proibido (${quantity} unidades)`,
      handAllowed: false,
      checkedAllowed: false,
      maxSparesCabine: 'Máximo 2 unidades permitidas por passageiro',
      airlineApprovalRequired: false,
      inFlightUsageAllowed: false,
      rechargingInFlightAllowed: false,
      tier: 'forbidden',
      quantityAlert: 'Atenção: A regra internacional aprovada pela OACI e ANAC para 2026 reduziu a cota máxima de power banks para 2 unidades por pessoa.',
    };
  }

  // Airline specific advice
  let airlineAdvice = '';
  if (airlineCode === 'LATAM') {
    airlineAdvice = 'LATAM (Regra 2026): O power bank DEVE permanecer acessível sob o assento dianteiro. É proibido guardar no bagageiro superior. Proibido usar ou recarregar a bordo.';
  } else if (airlineCode === 'GOL') {
    airlineAdvice = 'GOL (Regra 2026): Vigente desde 04/05/2026. Detalhe a confirmar: a regra geral da GOL cita até 20 baterias sobressalentes, pendente harmonização textual explícita do teto de 2 unidades.';
  } else if (airlineCode === 'AZUL') {
    airlineAdvice = 'Azul: Confirmação pendente de publicação detalhada na página oficial. A ausência de informação não é permissão irrestrita. Consulte a Azul antes do embarque.';
  }

  if (wh <= 100) {
    return {
      wh,
      status: 'permitido_com_condicoes',
      title: 'Permitido na cabine (Novas regras 2026)',
      description: `Baterias e power banks de até 100 Wh (${wh} Wh) são permitidos na bagagem de mão até o teto de 2 unidades por passageiro. ATENÇÃO: É estritamente PROIBIDO recarregar o power bank a bordo e PROIBIDO usá-lo para alimentar celulares ou notebooks durante o voo!`,
      badgeText: 'Liberado na mão (< 100 Wh, máx 2)',
      handAllowed: true,
      checkedAllowed: false,
      maxSparesCabine: 'Máximo 2 power banks por passageiro',
      airlineApprovalRequired: false,
      inFlightUsageAllowed: false, // Nova regra 2026
      rechargingInFlightAllowed: false, // Nova regra 2026
      tier: 'free',
      airlineSpecificAdvice: airlineAdvice,
    };
  }

  if (wh <= 160) {
    return {
      wh,
      status: 'necessita_confirmacao',
      title: 'Aprovação prévia da companhia obrigatória (100–160 Wh)',
      description: `Entre 100.1 Wh e 160 Wh (${wh} Wh), a bateria só pode viajar na cabine com AUTORIZAÇÃO EXPRESSA da companhia aérea antes do check-in. Proibido despachar no porão. Proibido uso ou recarga a bordo.`,
      badgeText: 'Exige autorização (100–160 Wh)',
      handAllowed: true,
      checkedAllowed: false,
      maxSparesCabine: 'Máximo 2 unidades com autorização formal',
      airlineApprovalRequired: true,
      inFlightUsageAllowed: false,
      rechargingInFlightAllowed: false,
      tier: 'airline_permission',
      airlineSpecificAdvice: airlineAdvice,
    };
  }

  return {
    wh,
    status: 'nao_permitido',
    title: 'PROIBIDO em aviões de passageiros (> 160 Wh)',
    description: `Baterias com capacidade superior a 160 Wh (${wh} Wh) apresentam alto risco térmico e são estritamente PROIBIDAS em aeronaves civis de passageiros tanto na cabine quanto no porão despachado.`,
    badgeText: 'Proibido (> 160 Wh)',
    handAllowed: false,
    checkedAllowed: false,
    maxSparesCabine: '0 (Proibido)',
    airlineApprovalRequired: false,
    inFlightUsageAllowed: false,
    rechargingInFlightAllowed: false,
    tier: 'forbidden',
    airlineSpecificAdvice: airlineAdvice,
  };
}

/**
 * Luggage Dimension and Weight validation engine.
 */
export interface DimensionCheckResult {
  isCompliant: boolean;
  status: 'aprovado' | 'excede_tamanho' | 'excede_peso' | 'excede_ambos';
  message: string;
  tariffWarning?: string;
  diffHeight: number;
  diffWidth: number;
  diffDepth: number;
  diffWeight: number;
  linearSum: number;
  linearSumLimit: number;
  diffLinearSum: number;
  limitHeight: number;
  limitWidth: number;
  limitDepth: number;
  limitWeight: number;
  airlineName: string;
  airlineNotes: string;
}

export function checkLuggageCompliance(params: {
  heightCm: number;
  widthCm: number;
  depthCm: number;
  weightKg: number;
  airlineCode: 'LATAM' | 'GOL' | 'AZUL';
  luggageType: 'mao' | 'item_pessoal' | 'despachada';
  tariff?: 'basic' | 'standard' | 'premium';
}): DimensionCheckResult {
  const airline = AIRLINES_DATA[params.airlineCode] || AIRLINES_DATA.LATAM;
  const { heightCm, widthCm, depthCm, weightKg, luggageType, tariff = 'standard' } = params;

  if (luggageType === 'mao') {
    const limits = airline.handLuggage;
    const limitH = limits.dimensionsCm.height; // 55
    const limitW = limits.dimensionsCm.width; // 35
    const limitD = limits.dimensionsCm.depth; // 25
    
    // LATAM Economy = 12 kg (Premium = 16 kg), GOL = 12 kg, Azul = 10 kg
    const limitWeight = (tariff === 'premium' && limits.premiumWeightKg) 
      ? limits.premiumWeightKg 
      : limits.maxWeightKg;

    const diffH = heightCm - limitH;
    const diffW = widthCm - limitW;
    const diffD = depthCm - limitD;
    const diffWeight = weightKg - limitWeight;

    const sizeExceeded = diffH > 0 || diffW > 0 || diffD > 0;
    const weightExceeded = diffWeight > 0;

    let status: DimensionCheckResult['status'] = 'aprovado';
    let message = `Sua bagagem de mão está dentro dos limites da ${airline.name} (${limitWeight} kg)!`;

    // Tariff check for Basic:
    let tariffWarning: string | undefined = undefined;
    if (tariff === 'basic') {
      if (params.airlineCode === 'LATAM') {
        tariffWarning = 'Atenção com a Tarifa Basic da LATAM: ela NÃO inclui mala de cabine gratuita. Se você não adquiriu a mala antecipadamente, ela será cobrada no aeroporto!';
      } else if (params.airlineCode === 'GOL') {
        tariffWarning = 'Atenção com a Tarifa Basic da GOL: inclui apenas o item pessoal gratuitamente. A mala de cabine de 12 kg deve ser comprada à parte!';
      }
    }

    if (sizeExceeded && weightExceeded) {
      status = 'excede_ambos';
      message = 'Sua mala excede as dimensões e o peso máximo permitido para a cabine.';
    } else if (sizeExceeded) {
      status = 'excede_tamanho';
      message = 'Sua mala ultrapassa as dimensões permitidas para o compartimento superior.';
    } else if (weightExceeded) {
      status = 'excede_peso';
      message = `Sua mala excede o limite de peso de ${limitWeight} kg da ${airline.name}.`;
    }

    return {
      isCompliant: !sizeExceeded && !weightExceeded,
      status,
      message,
      tariffWarning,
      diffHeight: diffH,
      diffWidth: diffW,
      diffDepth: diffD,
      diffWeight,
      linearSum: heightCm + widthCm + depthCm,
      linearSumLimit: limitH + limitW + limitD,
      diffLinearSum: heightCm + widthCm + depthCm - (limitH + limitW + limitD),
      limitHeight: limitH,
      limitWidth: limitW,
      limitDepth: limitD,
      limitWeight,
      airlineName: airline.name,
      airlineNotes: limits.description,
    };
  }

  if (luggageType === 'item_pessoal') {
    const limits = airline.personalItem;
    const limitH = limits.dimensionsCm.height;
    const limitW = limits.dimensionsCm.width;
    const limitD = limits.dimensionsCm.depth;
    const limitWeight = 10; // usually fits with hand luggage

    const diffH = heightCm - limitH;
    const diffW = widthCm - limitW;
    const diffD = depthCm - limitD;
    const diffWeight = weightKg > 0 ? weightKg - limitWeight : 0;

    const sizeExceeded = diffH > 0 || diffW > 0 || diffD > 0;

    return {
      isCompliant: !sizeExceeded,
      status: sizeExceeded ? 'excede_tamanho' : 'aprovado',
      message: sizeExceeded
        ? 'Seu item pessoal excede as medidas para caber embaixo do assento dianteiro.'
        : 'Item pessoal aprovado para ir sob a poltrona na ' + airline.name + '!',
      diffHeight: diffH,
      diffWidth: diffW,
      diffDepth: diffD,
      diffWeight,
      linearSum: heightCm + widthCm + depthCm,
      linearSumLimit: limitH + limitW + limitD,
      diffLinearSum: heightCm + widthCm + depthCm - (limitH + limitW + limitD),
      limitHeight: limitH,
      limitWidth: limitW,
      limitDepth: limitD,
      limitWeight: 0,
      airlineName: airline.name,
      airlineNotes: limits.description,
    };
  }

  // Despachada
  const limits = airline.checkedLuggage;
  const linearSum = heightCm + widthCm + depthCm;
  const linearSumLimit = limits.maxTotalDimensionsCm; // 158 cm
  const limitWeight = limits.standardWeightKg; // 23 kg

  const diffLinearSum = linearSum - linearSumLimit;
  const diffWeight = weightKg - limitWeight;

  const sizeExceeded = diffLinearSum > 0;
  const weightExceeded = diffWeight > 0;

  let status: DimensionCheckResult['status'] = 'aprovado';
  let message = 'Sua bagagem despachada cumpre a franquia padrão de 23 kg e 158 cm lineares da ' + airline.name + '!';

  if (sizeExceeded && weightExceeded) {
    status = 'excede_ambos';
    message = 'A mala excede os 23 kg de peso e ultrapassa a soma linear de 158 cm. Sujeita a taxa de sobrepeso e dimensões especiais.';
  } else if (sizeExceeded) {
    status = 'excede_tamanho';
    message = 'A soma das dimensões (A + L + P) ultrapassa o limite padrão de 158 cm lineares.';
  } else if (weightExceeded) {
    status = 'excede_peso';
    message = 'O peso ultrapassa a franquia padrão de 23 kg por peça da ' + airline.name + '.';
  }

  return {
    isCompliant: !sizeExceeded && !weightExceeded,
    status,
    message,
    diffHeight: 0,
    diffWidth: 0,
    diffDepth: 0,
    diffWeight,
    linearSum,
    linearSumLimit,
    diffLinearSum,
    limitHeight: 0,
    limitWidth: 0,
    limitDepth: 0,
    limitWeight,
    airlineName: airline.name,
    airlineNotes: limits.description,
  };
}

/**
 * Local storage helpers for user queries and custom packing checklist.
 */
const STORAGE_KEY_QUERIES = 'bagagemok_saved_queries';
const STORAGE_KEY_CHECKLIST = 'bagagemok_packing_checklist';

export function getSavedQueries(): { id: string; query: string; timestamp: number }[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_QUERIES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveUserQuery(query: string) {
  if (!query.trim()) return;
  try {
    const queries = getSavedQueries();
    const updated = [
      { id: Date.now().toString(), query: query.trim(), timestamp: Date.now() },
      ...queries.filter((q) => q.query.toLowerCase() !== query.trim().toLowerCase()),
    ].slice(0, 15);
    localStorage.setItem(STORAGE_KEY_QUERIES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save query to localStorage', e);
  }
}

export function removeSavedQuery(id: string) {
  try {
    const queries = getSavedQueries().filter((q) => q.id !== id);
    localStorage.setItem(STORAGE_KEY_QUERIES, JSON.stringify(queries));
  } catch (e) {
    console.error('Failed to remove query', e);
  }
}

export interface PackingListItem {
  id: string;
  name: string;
  location: 'mao' | 'despachada';
  category: string;
  isPacked: boolean;
  status: ItemStatus;
  warningNote?: string;
  itemId?: string;
}

export function getPackingChecklist(): PackingListItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CHECKLIST);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // fallback
  }

  // Default suggested starter packing list
  return [
    {
      id: 'default-1',
      name: 'Power bank (Carregador portátil)',
      location: 'mao',
      category: 'eletronicos',
      isPacked: false,
      status: 'permitido_com_condicoes',
      warningNote: 'Nunca despache no porão! Deve ir na cabine com você.',
      itemId: 'power-bank',
    },
    {
      id: 'default-2',
      name: 'Documentos e Passaporte',
      location: 'mao',
      category: 'objetos',
      isPacked: false,
      status: 'permitido',
      warningNote: 'Mantenha no item pessoal sob o assento.',
    },
    {
      id: 'default-3',
      name: 'Medicamentos de uso contínuo',
      location: 'mao',
      category: 'medicamentos',
      isPacked: false,
      status: 'permitido',
      warningNote: 'Leve com receita médica na bagagem de mão.',
      itemId: 'medicamentos-comuns',
    },
    {
      id: 'default-4',
      name: 'Notebook / Laptop',
      location: 'mao',
      category: 'eletronicos',
      isPacked: false,
      status: 'permitido',
      warningNote: 'Tirar da mochila no raio-X.',
      itemId: 'notebook',
    },
    {
      id: 'default-5',
      name: 'Shampoo e cosméticos',
      location: 'despachada',
      category: 'liquidos',
      isPacked: false,
      status: 'permitido',
      warningNote: 'Tampas vedadas com fita adesiva para evitar vazamentos.',
      itemId: 'shampoo-condicionador',
    },
  ];
}

export function savePackingChecklist(list: PackingListItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save packing list', e);
  }
}
