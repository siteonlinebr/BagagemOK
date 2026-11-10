/**
 * Automated test suite for BagagemOK rules engine, calculations, and data invariants.
 */
import { 
  calculateWattHours, 
  evaluateBatteryCompliance, 
  checkLuggageCompliance, 
  searchLuggageItems 
} from '../src/utils/rulesEngine.ts';
import { LUGGAGE_ITEMS } from '../src/data/items.ts';
import { AIRLINES_DATA } from '../src/data/airlines.ts';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('🧪 Iniciando testes automatizados do BagagemOK...\n');

// 1. Test Battery Calculations & 2026 Regulations
console.log('--- 1. Testes de Cálculo de Baterias (Wh) e Regras 2026 ---');
const wh20k = calculateWattHours(20000, 3.7);
assert(wh20k === 74, `Power bank de 20.000 mAh a 3.7V deve ser 74 Wh (calculado: ${wh20k})`);

const wh27k = calculateWattHours(27000, 3.7);
assert(wh27k === 99.9, `Power bank de 27.000 mAh a 3.7V deve estar abaixo de 100 Wh (calculado: ${wh27k})`);

const compliance74_1unit = evaluateBatteryCompliance(74, 1, 'LATAM');
assert(compliance74_1unit.tier === 'free', '74 Wh (1 unidade) deve ser livre para cabine');
assert(!compliance74_1unit.checkedAllowed, 'Power bank NUNCA deve ser permitido despachado');
assert(!!compliance74_1unit.airlineSpecificAdvice && compliance74_1unit.airlineSpecificAdvice.includes('assento'), 'LATAM deve exigir armazenamento sob o assento');

const compliance74_2units = evaluateBatteryCompliance(74, 2, 'GOL');
assert(compliance74_2units.tier === 'free', '74 Wh (2 unidades) deve ser aceito');

// 2026 OACI Limit: > 2 power banks is forbidden!
const compliance74_3units = evaluateBatteryCompliance(74, 3, 'LATAM');
assert(compliance74_3units.tier === 'forbidden', '3 power banks deve ser PROIBIDO pelas normas 2026 da OACI/ANAC');

const compliance120 = evaluateBatteryCompliance(120, 1, 'LATAM');
assert(compliance120.tier === 'airline_permission', '120 Wh deve exigir autorização prévia');

const compliance200 = evaluateBatteryCompliance(200, 1, 'LATAM');
assert(compliance200.tier === 'forbidden', '200 Wh deve ser PROIBIDO em aviões de passageiros');

// 2. Test Dimension, Weight Limits & Tariffs (2026 Update)
console.log('\n--- 2. Testes de Dimensão, Peso da Mala e Tarifas 2026 ---');
// Perfect Hand Luggage (55x35x25, 11.5kg on GOL - allowed up to 12kg)
const handGolOk = checkLuggageCompliance({
  heightCm: 55,
  widthCm: 35,
  depthCm: 25,
  weightKg: 11.5,
  airlineCode: 'GOL',
  luggageType: 'mao',
  tariff: 'standard',
});
assert(handGolOk.isCompliant, '55x35x25 cm com 11.5 kg na GOL deve ser aprovado (franquia 2026 é 12 kg)');

// Hand Luggage 11.5kg on Azul (Azul keeps 10kg limit)
const handAzulExceed = checkLuggageCompliance({
  heightCm: 55,
  widthCm: 35,
  depthCm: 25,
  weightKg: 11.5,
  airlineCode: 'AZUL',
  luggageType: 'mao',
  tariff: 'standard',
});
assert(!handAzulExceed.isCompliant, '11.5 kg deve exceder limite de 10 kg na Azul');
assert(handAzulExceed.status === 'excede_peso', 'Status na Azul deve ser excede_peso');

// Hand Luggage 12.8kg on GOL (exceeds 12kg)
const handGolExceed = checkLuggageCompliance({
  heightCm: 55,
  widthCm: 35,
  depthCm: 25,
  weightKg: 12.8,
  airlineCode: 'GOL',
  luggageType: 'mao',
  tariff: 'standard',
});
assert(!handGolExceed.isCompliant, '12.8 kg deve exceder limite de 12 kg na GOL');
assert(handGolExceed.status === 'excede_peso', 'Status na GOL deve ser excede_peso');

// Oversized Hand Luggage (58x35x25)
const handOverSize = checkLuggageCompliance({
  heightCm: 58,
  widthCm: 35,
  depthCm: 25,
  weightKg: 9.0,
  airlineCode: 'LATAM',
  luggageType: 'mao',
  tariff: 'standard',
});
assert(!handOverSize.isCompliant, '58 cm de altura deve exceder limite de mão (55 cm)');
assert(handOverSize.diffHeight === 3, 'Diferença de altura deve ser +3 cm');

// Tariff Basic test on LATAM: Basic doesn't include cabin bag
const handLatamBasic = checkLuggageCompliance({
  heightCm: 55,
  widthCm: 35,
  depthCm: 25,
  weightKg: 10,
  airlineCode: 'LATAM',
  luggageType: 'mao',
  tariff: 'basic',
});
assert(handLatamBasic.tariffWarning !== null, 'Tarifa Basic na LATAM deve gerar aviso de exclusão de mala de cabine');

// Checked Luggage: 23kg standard (158cm sum)
const checkedOk = checkLuggageCompliance({
  heightCm: 70,
  widthCm: 50,
  depthCm: 30, // sum = 150 <= 158
  weightKg: 22.8,
  airlineCode: 'AZUL',
  luggageType: 'despachada',
});
assert(checkedOk.isCompliant, 'Mala despachada de 150 cm e 22.8 kg na Azul deve ser aprovada');

// 3. Test Synonyms and Search Engine
console.log('\n--- 3. Testes do Sistema de Busca e Sinônimos ---');
const searchPowerBank = searchLuggageItems({ query: 'carregador portátil' });
assert(searchPowerBank.length > 0, 'Busca por sinônimo "carregador portátil" deve retornar Power bank');
assert(searchPowerBank[0].id === 'power-bank', 'Primeiro resultado deve ser power-bank');

const searchRemedio = searchLuggageItems({ query: 'dipirona' });
assert(searchRemedio.length > 0, 'Busca por "dipirona" deve encontrar medicamentos');

const searchPerfume = searchLuggageItems({ query: 'fragrância' });
assert(searchPerfume.length > 0, 'Busca por "fragrância" deve encontrar perfume');

// 4. Test Invariant Integrity of Database
console.log('\n--- 4. Testes de Integridade da Base de Dados ---');
assert(LUGGAGE_ITEMS.length >= 30, `Base deve conter pelo menos 30 itens catalogados (total: ${LUGGAGE_ITEMS.length})`);

for (const item of LUGGAGE_ITEMS) {
  assert(!!item.id, `Item ${item.name} deve ter ID único`);
  assert(item.officialSources.length > 0, `Item ${item.name} deve possuir fontes oficiais verificadas`);
  assert(!!item.lastVerifiedDate, `Item ${item.name} deve ter data de verificação`);
  assert(!!item.handLuggage.summary, `Item ${item.name} deve ter resumo para mala de mão`);
  assert(!!item.checkedLuggage.summary, `Item ${item.name} deve ter resumo para mala despachada`);
}

// 5. Airline Integrity 2026
assert(AIRLINES_DATA.LATAM.handLuggage.maxWeightKg === 12, 'LATAM deve ter franquia de 12 kg na mão (2026)');
assert(AIRLINES_DATA.LATAM.handLuggage.premiumWeightKg === 16, 'LATAM deve ter franquia Premium de 16 kg na mão (2026)');
assert(AIRLINES_DATA.GOL.handLuggage.maxWeightKg === 12, 'GOL deve ter franquia de 12 kg na mão (2026)');
assert(AIRLINES_DATA.AZUL.handLuggage.maxWeightKg === 10, 'Azul deve manter franquia de 10 kg na mão');

console.log('\n🎉 TODOS OS TESTES PASSARAM COM SUCESSO!\n');
