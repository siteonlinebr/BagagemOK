export type ItemStatus = 
  | 'permitido'
  | 'permitido_com_condicoes'
  | 'nao_permitido'
  | 'necessita_confirmacao';

export type FlightType = 'domestico' | 'internacional';

export type AirlineCode = 'LATAM' | 'GOL' | 'AZUL' | 'TODAS';

export type LuggageLocation = 'mao' | 'despachada' | 'ambos';

export type ItemCategory = 
  | 'eletronicos'
  | 'liquidos'
  | 'medicamentos'
  | 'alimentos'
  | 'objetos'
  | 'especiais';

export interface OfficialSource {
  name: string;
  url: string;
  lastVerified: string;
  publisher: 'ANAC' | 'LATAM' | 'GOL' | 'AZUL' | 'OACI' | 'MAPA' | 'RECEITA_FEDERAL';
  documentReference?: string;
}

export interface LuggageRuleLocationDetails {
  status: ItemStatus;
  summary: string;
  conditions: string[];
  limitsDescription?: string;
  numericLimits?: {
    maxWh?: number;
    maxMah?: number;
    maxSingleMl?: number;
    maxTotalLitres?: number;
    maxBladeCm?: number;
    maxWeightKg?: number;
  };
  warnings: string[];
}

export interface LuggageItem {
  id: string;
  name: string;
  synonyms: string[];
  category: ItemCategory;
  shortDescription: string;
  popularQuery: boolean;
  imageThumbnail?: string;
  handLuggage: LuggageRuleLocationDetails;
  checkedLuggage: LuggageRuleLocationDetails;
  airlineNotes?: {
    LATAM?: string;
    GOL?: string;
    AZUL?: string;
  };
  internationalNotes?: string;
  officialSources: OfficialSource[];
  lastVerifiedDate: string;
  verificationStatus: 'verificado' | 'parcialmente_verificado';
  isBatteryOrPowerBank?: boolean;
}

export type PassengerTariff = 'basic' | 'standard' | 'premium';

export interface AirlineLuggageLimits {
  code: 'LATAM' | 'GOL' | 'AZUL';
  name: string;
  handLuggage: {
    maxWeightKg: number;
    dimensionsCm: {
      height: number;
      width: number;
      depth: number;
    };
    description: string;
    premiumWeightKg?: number;
  };
  personalItem: {
    maxWeightKg?: number;
    dimensionsCm: {
      height: number;
      width: number;
      depth: number;
    };
    description: string;
  };
  checkedLuggage: {
    standardWeightKg: number;
    maxTotalDimensionsCm: number; // soma H + W + D ou LxAxP
    dimensionDetails?: string;
    description: string;
  };
  tariffRules: {
    basic: {
      name: string;
      includesCabinBag: boolean;
      includesPersonalItem: boolean;
      includesCheckedBag: boolean;
      note: string;
    };
    standard: {
      name: string;
      includesCabinBag: boolean;
      includesPersonalItem: boolean;
      includesCheckedBag: boolean;
      note: string;
    };
    premium: {
      name: string;
      includesCabinBag: boolean;
      includesPersonalItem: boolean;
      includesCheckedBag: boolean;
      note: string;
    };
  };
  powerBank2026Status: {
    status: 'publicada_detalhada' | 'detalhe_a_confirmar' | 'confirmacao_pendente';
    statusLabel: string;
    effectiveDate?: string;
    maxUnitsAllowed: number | string;
    allowedLocations: string;
    inFlightUsageAllowed: boolean;
    rechargingInFlightAllowed: boolean;
    storageInstruction: string;
    summary: string;
  };
  specialNotes: string[];
  officialBagPageUrl: string;
  lastVerifiedDate: string;
}

export interface SavedQuery {
  id: string;
  timestamp: number;
  itemId: string;
  flightType: FlightType;
  airline: AirlineCode;
  location: LuggageLocation;
}

export interface PackingItem {
  id: string;
  name: string;
  location: 'mao' | 'despachada';
  category: ItemCategory;
  isPacked: boolean;
  itemIdReference?: string;
  warningNote?: string;
  status?: ItemStatus;
}

export interface TravelGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  readTimeMinutes: number;
  lastUpdated: string;
  officialSources: OfficialSource[];
  summary: string;
  contentMarkdown: string;
  keyTakeaways: string[];
}
