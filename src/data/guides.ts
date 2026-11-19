import { TravelGuide } from '../types';

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    id: 'guia-bagagem-de-mao',
    slug: 'o-que-levar-na-bagagem-de-mao',
    title: 'O que levar na bagagem de mão? O guia definitivo atualizado',
    subtitle: 'Tudo o que você precisa saber para arrumar sua mala de bordo de até 10 kg ou 12 kg sem surpresas no raio-X e no portão.',
    readTimeMinutes: 5,
    lastUpdated: '19/11/2026 (Verificado)',
    summary: 'Aprenda as regras da ANAC, a ampliação para 12 kg na LATAM e GOL, o que nunca despachar e a atenção indispensável com as tarifas Basic.',
    keyTakeaways: [
      'Garantia legal ANAC (Resolução 400): no mínimo 10 kg na mala de mão gratuita mais 1 item pessoal no Brasil.',
      'Ampliação 2026: LATAM e GOL ampliaram o limite da mala de mão para 12 kg (LATAM permite até 16 kg na Premium). Azul mantém 10 kg.',
      'Cuidado com a Tarifa Basic: passagens nas tarifas mais simples da LATAM e GOL não incluem mala de cabine gratuita (apenas item pessoal sob o assento).',
      'Power banks em 2026: máximo de 2 unidades por passageiro, somente na cabine, proibido recarregar em voo e recomendação OACI (proibição na LATAM) de não usar para carregar aparelhos.',
      'LATAM exige power banks guardados exclusivamente sob o assento à frente (proibido no bagageiro superior).',
    ],
    officialSources: [
      {
        name: 'ANAC — Guia do Passageiro / Bagagens',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: '19/11/2026',
        publisher: 'ANAC',
        documentReference: 'Resolução nº 400/2016 e Portaria 21/SPO',
      },
      {
        name: 'OACI (ICAO) — Adendo nº 1 ao Doc 9284',
        url: 'https://www.icao.int',
        lastVerified: '19/11/2026',
        publisher: 'OACI',
      },
    ],
    contentMarkdown: `
### Seus direitos segundo a ANAC
No Brasil, a **Resolução nº 400/2016 da ANAC** garante a todo passageiro o direito de transportar, sem custo adicional, **no mínimo uma bagagem de mão de até 10 kg**, além de um **item pessoal** (como mochila, bolsa ou sacola pequena).

### Limites de peso em 2026: 10 kg vs 12 kg
As companhias aéreas brasileiras possuem políticas ligeiramente diferentes quanto ao peso permitido:
- **LATAM:** 12 kg na classe Economy e até 16 kg na Premium Economy / Premium Business.
- **GOL:** 12 kg na cabine padrão.
- **Azul:** 10 kg na cabine padrão.

### Dimensões padronizadas
As três companhias utilizam as medidas padrão de mala de bordo:
- **55 cm de altura**
- **35 cm de largura**
- **25 cm de profundidade**

*Atenção:* As caixas gabarito dos aeroportos consideram as **rodinhas, alças retráteis e bolsos externos cheios**.

### Cuidado vital com a Tarifa Basic
Nas tarifas econômicas básicas (como Basic LATAM e Basic GOL), a mala de mão de cabine **NÃO está inclusa**. Nesses bilhetes, o passageiro tem direito apenas ao **item pessoal** (mochila ou bolsa até 10 kg sob o assento). Caso você tente embarcar com mala de rodinhas com bilhete Basic sem pagar previamente, será cobrada taxa de despacho de última hora no portão de embarque.

### O que NUNCA despachar no porão
Coloque sempre na sua mala de mão:
1. **Power banks e baterias avulsas de lítio** (estritamente proibidos no porão; em 2026 há limite de 2 unidades e proibição de uso a bordo).
2. **Dispositivos eletrônicos caros** (notebooks, tablets, câmeras, fones bluetooth).
3. **Medicamentos de uso contínuo** e receitas médicas.
4. **Documentos pessoais, cartões de crédito e dinheiro**.
5. **Chaves de casa e do carro**.
6. **Uma muda completa de roupa de emergência** (para o caso de extravio de bagagem despachada).
    `,
  },
  {
    id: 'guia-voo-internacional-liquidos',
    slug: 'como-preparar-mala-voo-internacional-liquidos',
    title: 'Como preparar a mala para um voo internacional: a regra dos 100 ml',
    subtitle: 'Evite ter perfumes, cremes e cosméticos descartados no canal de segurança internacional.',
    readTimeMinutes: 6,
    lastUpdated: '19/11/2026 (Verificado)',
    summary: 'Entenda em detalhes como funciona a regra dos 100 ml em voos internacionais, a embalagem plástica de 1 litro, exceções médicas e as normas da Receita Federal na entrada no Brasil.',
    keyTakeaways: [
      'Limite rígido: frascos com capacidade máxima de até 100 ml (3.4 oz) cada.',
      'O volume conta pela capacidade do frasco, não pela quantidade de líquido que sobrou dentro.',
      'Todos os frascos devem caber em 1 único saco plástico transparente vedável de até 1 litro (20x20 cm).',
      'Receita Federal (atualizado em 13/11/2026): regras aduaneiras sobre bens pessoais, eletrônicos e tributação na entrada no Brasil não alteram as franquias das companhias aéreas.',
    ],
    officialSources: [
      {
        name: 'ICAO / OACI — Doc 9284 & Segurança de Aviação',
        url: 'https://www.icao.int',
        lastVerified: '19/11/2026',
        publisher: 'OACI',
      },
      {
        name: 'ANAC — Transporte de Líquidos em Voos Internacionais',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: '19/11/2026',
        publisher: 'ANAC',
      },
      {
        name: 'Receita Federal — Bens do Viajante (Atualizado 13/11/2026)',
        url: 'https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/viagens-internacionais',
        lastVerified: '19/11/2026',
        publisher: 'RECEITA_FEDERAL',
      },
    ],
    contentMarkdown: `
### O que é a Regra dos 100 ml?
Adotada mundialmente após diretrizes da OACI (Organização da Aviação Civil Internacional), a regra estabelece que, na **bagagem de mão de voos internacionais**, qualquer líquido, gel, pasta, creme ou aerossol deve cumprir requisitos estritos:

1. **Capacidade do frasco:** no máximo 100 ml por frasco.
2. **Atenção ao frasco grande:** Se você tiver um tubo de hidratante de 200 ml que contenha apenas um restinho de 30 ml, ele **será confiscado e descartado**. O que vale é a capacidade impressa na embalagem!
3. **Saco plástico transparente (tipo ziploc):** Todos os frascos de até 100 ml devem ser acondicionados em um único saco plástico transparente e vedável com capacidade de até 1 litro (aproximadamente 20 x 20 cm).
4. **Apresentação no raio-X:** Retire o saquinho de líquidos da mala e coloque-o visível na bandeja plástica de inspeção.

### E as compras no Free Shop (Duty Free)?
Bebidas, perfumes e cosméticos com mais de 100 ml adquiridos nas lojas francas do aeroporto após o raio-X podem embarcar na cabine, desde que:
- Venham acondicionados na embalagem especial lacrada pelo lojista (**STEB - Security Tamper-Evident Bag**).
- A nota fiscal da compra daquele mesmo dia esteja visível no interior do pacote.
- *Cuidado com conexões:* Se seu voo internacional fizer conexão em outro aeroporto onde seja necessário passar novamente pelo raio-X, as garrafas podem ser barradas se a embalagem tiver sido violada ou dependendo da regra do país de trânsito.

### Regras Aduaneiras na Entrada no Brasil (Receita Federal — 13/11/2026)
Além das normas de segurança de voo das companhias aéreas, passageiros que retornam do exterior devem observar a página oficial da **Receita Federal — Bens do Viajante** (atualizada em **13/11/2026**):
- Trata de bagagem internacional, itens de uso pessoal, eletrônicos trazidos do exterior e regras de cota de isenção e tributação na chegada ao Brasil.
- Essas regras aduaneiras **não alteram** o peso ou tamanho da bagagem de mão e despachada definidos pelas companhias aéreas.
    `,
  },
  {
    id: 'guia-excesso-de-peso-tamanho',
    slug: 'o-que-acontece-se-mala-ultrapassar-peso',
    title: 'O que acontece se a mala ultrapassar o peso ou tamanho?',
    subtitle: 'Conheça as taxas de excesso de bagagem e como evitar multas caras no aeroporto.',
    readTimeMinutes: 4,
    lastUpdated: '19/11/2026 (Verificado)',
    summary: 'Descubra os valores cobrados por quilo excedente, diferenças entre comprar franquia antecipada e no balcão, e como evitar cobranças surpresa.',
    keyTakeaways: [
      'Bagagem de mão acima de 10 kg (Azul) ou 12 kg (LATAM/GOL) será obrigatoriamente despachada.',
      'Despacho compulsório no portão pode ser cobrado com tarifas cheias caso sua passagem não dê direito a despacho.',
      'Franquia de bagagem despachada comprada pela internet é até 50% mais barata que no balcão do aeroporto.',
      'Pesagem antecipada com balança digital de mala portátil é a melhor prevenção.',
    ],
    officialSources: [
      {
        name: 'ANAC — Cobrança de Bagagem e Direitos',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: '19/11/2026',
        publisher: 'ANAC',
      },
    ],
    contentMarkdown: `
### Na Bagagem de Mão (10 kg na Azul / 12 kg na LATAM e GOL)
Se sua mala de bordo não couber na caixa medidora (gabarito) ou ultrapassar a franquia de peso da sua companhia durante a triagem:
- A companhia aérea não permitirá que ela siga na cabine.
- Ela será enviada ao porão como bagagem despachada.
- Se o seu bilhete for da tarifa básica (sem franquia de despacho), você pagará taxa no portão que costuma ser o dobro da tarifa online.

### Na Bagagem Despachada (23 kg)
Se a sua mala despachada pesar mais de 23 kg no balcão de check-in:
1. **Excesso de peso leve (24 kg a 32 kg):** você pagará uma taxa por quilo excedente ou uma taxa fixa de sobrepeso.
2. **Limite de saúde ocupacional (32 kg):** por normas de segurança do trabalho para os carregadores de aeroporto, volumes individuais acima de 32 kg geralmente não são aceitos como bagagem comum, necessitando de redespacho ou envio como carga aérea (exceto animais ou equipamentos especiais autorizados).
    `,
  },
  {
    id: 'guia-baterias-power-bank-wh',
    slug: 'cuidados-com-baterias-de-litio-power-banks',
    title: 'Baterias de lítio e power banks: Regras 2026 da OACI e ANAC',
    subtitle: 'Novas restrições: limite de 2 unidades, proibição de recarga em voo, fórmulas Wh e regras específicas de LATAM, GOL e Azul.',
    readTimeMinutes: 6,
    lastUpdated: '19/11/2026 (Verificado)',
    summary: 'Guia completo com as atualizações regulatórias do Adendo 1 ao Doc 9284 da OACI e Portaria 21/SPO da ANAC (IS 175-001M). Saiba como calcular Wh e as diferenças entre LATAM, GOL e Azul.',
    keyTakeaways: [
      'Limite internacional 2026: Máximo de 2 power banks por passageiro (OACI desde 27/03/2026 e ANAC Portaria nº 21/SPO).',
      'Transporte EXCLUSIVO na bagagem de mão / cabine. Nunca na bagagem despachada.',
      'Recarga e uso em voo: Proibido recarregar power banks durante o voo; a OACI recomenda não utilizá-los para carregar outros aparelhos a bordo.',
      'LATAM: Proíbe utilizar para carregar outros dispositivos durante o voo e exige armazenamento acessível sob o assento (vetado no bagageiro superior).',
      'GOL: Documentação apresenta inconsistência entre o limite geral de baterias sobressalentes (até 20) e as regras específicas de power banks.',
      'Azul: Ainda falta confirmação documental detalhada de sua política operacional.',
      'Fórmula: Wh = (mAh × Volts) ÷ 1.000. Até 100 Wh permitido; 100–160 Wh exige autorização; >160 Wh proibido.',
    ],
    officialSources: [
      {
        name: 'OACI (ICAO) — Nova Regulamentação de Power Banks (Doc 9284)',
        url: 'https://www.icao.int',
        lastVerified: '19/11/2026',
        publisher: 'OACI',
        documentReference: 'Doc 9284 Adendo 1 (desde 27/03/2026)',
      },
      {
        name: 'ANAC — Regulamentação de Artigos Perigosos (Portaria 21/SPO)',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/artigos-perigosos',
        lastVerified: '19/11/2026',
        publisher: 'ANAC',
        documentReference: 'IS 175-001 Revisão M',
      },
      {
        name: 'LATAM Airlines — Regras de Artigos Restritos',
        url: 'https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/bagagem',
        lastVerified: '19/11/2026',
        publisher: 'LATAM',
      },
    ],
    contentMarkdown: `
### As grandes mudanças regulatórias de 2026
Em 2026, a Organização da Aviação Civil Internacional (**OACI/ICAO**) aprovou o **Adendo nº 1 às Instruções Técnicas para Transporte Seguro de Artigos Perigosos por Via Aérea (Doc 9284)**, aplicável internacionalmente desde **27 de março de 2026**.

No Brasil, a **ANAC** aprovou a revisão M da Instrução Suplementar 175-001 através da **Portaria Regulatória nº 21/SPO** (publicada no DOU em 06/04/2026).

### As principais condições para Power Banks
1. **Máximo de 2 power banks por passageiro:** Limite de até 100 Wh por unidade (100 a 160 Wh requer autorização da companhia; acima de 160 Wh é proibido).
2. **Somente na bagagem de mão (cabine):** Nunca na bagagem despachada devido ao risco de fogo por fuga térmica (*thermal runaway*).
3. **Proibido recarregar durante o voo:** Não podem ser conectados às tomadas ou portas USB da aeronave.
4. **Uso para carregar outros aparelhos em voo:** A **OACI recomenda não utilizá-los** para carregar celulares ou notebooks durante o voo — e companhias como a **LATAM proíbem expressamente** esse uso.
5. **Proteção individual:** Os terminais e conectores devem estar protegidos contra curto-circuitos (estojo protetor ou embalagem individual).

### Diferenças importantes entre as companhias brasileiras
- **LATAM (Regra detalhada publicada):** Permite no máximo 2 power banks de até 100 Wh cada, proíbe utilizar power banks para carregar outros dispositivos durante o voo e exige armazenamento acessível **sob o assento dianteiro** (proibido no compartimento superior). Se a mala de bordo for despachada no portão, retire o power bank imediatamente.
- **GOL (Inconsistência documental):** Regras de baterias atualizadas desde 04/05/2026, porém a documentação apresenta inconsistência entre o limite geral de baterias sobressalentes (até 20) e as regras específicas de power banks (teto OACI de 2 unidades). Confirme antes de embarcar.
- **Azul (Confirmação documental pendente):** Ainda falta confirmação documental detalhada de sua política operacional específica para power banks. Pelo princípio do BagagemOK, ausência de detalhe não é permissão irrestrita; siga o teto de 2 unidades e consulte a companhia.

### A Fórmula do Watt-hora (Wh)
A norma avalia a energia em **Watt-hora (Wh)**:
> Fórmula: **Wh = (capacidade em mAh × tensão nominal em Volts) ÷ 1.000**

*Exemplo prático:*
- Um power bank de **20.000 mAh** com célula de íon de lítio de **3.7 V**: **(20.000 × 3.7) ÷ 1.000 = 74 Wh**.
- Como 74 Wh é menor ou igual a 100 Wh, está liberado na cabine (até 2 unidades)!

### As três faixas de capacidade
1. **Até 100 Wh:** Permitido na bagagem de mão (máximo 2 unidades).
2. **De 100.1 Wh a 160 Wh:** Exige autorização prévia da companhia aérea, conforme condições aplicáveis.
3. **Acima de 160 Wh:** Proibido em voos comerciais de passageiros.
    `,
  },
  {
    id: 'guia-medicamentos-no-aviao',
    slug: 'como-transportar-medicamentos-no-aviao',
    title: 'Como transportar medicamentos, insulina e seringas no avião',
    subtitle: 'Requisitos legais para viajar com medicamentos comuns, controlados e injetáveis com tranquilidade.',
    readTimeMinutes: 5,
    lastUpdated: '19/11/2026 (Verificado)',
    summary: 'Orientações práticas para o embarque de remédios, receitas médicas válidas, regras para insulina e transporte em bolsas térmicas.',
    keyTakeaways: [
      'Leve sempre todos os remédios essenciais na bagagem de mão.',
      'Tenha a receita médica com nome do passageiro e dosagem.',
      'Insulina e remédios líquidos essenciais não precisam seguir o limite de 100 ml em voos internacionais se comprovados por laudo médico.',
      'Nunca despache insulina no porão da aeronave (risco de congelamento).',
    ],
    officialSources: [
      {
        name: 'ANVISA — Medicamentos em Viagens',
        url: 'https://www.gov.br/anvisa/pt-br/assuntos/medicamentos',
        lastVerified: '19/11/2026',
        publisher: 'ANAC',
      },
      {
        name: 'ANAC — Passageiros com Necessidade de Assistência Especial (PNAE)',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/pnae',
        lastVerified: '19/11/2026',
        publisher: 'ANAC',
      },
    ],
    contentMarkdown: `
### Medicamentos de uso diário
Nunca despache medicamentos necessários para seu tratamento na mala do porão. Em casos de atraso de voo ou extravio de bagagem, você ficará sem sua medicação.

### Remédios controlados (Tarja Preta / Psicotrópicos)
Para fármacos controlados:
- Mantenha na caixa original com a etiqueta de identificação da farmácia.
- Tenha sempre em mãos a **receita médica legível no nome do passageiro**.
- Em voos internacionais, peça ao seu médico uma receita constando a denominação química internacional da substância (nome genérico) e, se possível, uma versão em inglês.

### Insulina e Injetáveis
- Agulhas e seringas com tampa protetora são permitidas na bagagem de mão mediante apresentação de receita.
- Remédios termolábeis que exigem refrigeração (como insulinas e certos imunobiológicos) podem ser transportados em bolsas térmicas com gelo gel (gel pack reutilizável). Avise aos agentes de segurança do raio-X antes da inspeção.
    `,
  },
  {
    id: 'guia-item-pessoal-vs-bagagem-de-mao',
    slug: 'diferenca-entre-item-pessoal-e-bagagem-de-mao',
    title: 'Diferença prática entre Item Pessoal e Bagagem de Mão',
    subtitle: 'Entenda o que você pode levar além da malinha de 10 kg sem pagar nada a mais.',
    readTimeMinutes: 4,
    lastUpdated: '19/11/2026 (Verificado)',
    summary: 'Aprenda onde posicionar cada volume no avião, limites de tamanho de mochilas e como maximizar seu espaço de bordo.',
    keyTakeaways: [
      'Você tem direito a 2 volumes na cabine: 1 mala de mão (compartimento superior) + 1 item pessoal (embaixo do assento à frente).',
      'O item pessoal pode ser uma mochila média, bolsa tiracolo, pasta de notebook ou sacola de compras.',
      'Dimensões máximas recomendadas para o item pessoal: aprox. 45 x 35 x 20 cm.',
      'Assentos da primeira fileira ou saída de emergência: nenhum volume pode ficar no chão durante pouso e decolagem.',
    ],
    officialSources: [
      {
        name: 'ANAC — Franquia de Bagagem de Mão',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: '19/11/2026',
        publisher: 'ANAC',
      },
    ],
    contentMarkdown: `
### Os dois volumes garantidos
Ao embarcar em qualquer voo comercial no Brasil, cada passageiro tem direito a:

1. **Bagagem de Mão Principal (até 10 kg):**
   - É a sua mala de rodinhas ou mochilão de bordo.
   - Medidas máximas: **55 x 35 x 25 cm**.
   - Deve ser guardada no compartimento superior de bagagens (**overhead bin**).

2. **Item Pessoal (Personal Item):**
   - É a sua bolsa de uso contínuo, mochila de notebook ou sacola.
   - Medidas máximas: cerca de **45 x 35 x 20 cm** (varia ligeiramente entre LATAM, GOL e Azul).
   - Deve caber obrigatoriamente **embaixo do assento do passageiro à sua frente**.

### Dica de ouro para organizar
Coloque no **item pessoal** as coisas que você vai querer usar durante as horas de voo:
- Fone de ouvido, celular, livro/Kindle, casaco ou manta leve, remédios rápidos e documentos.
Dessa forma, você não precisará ficar levantando durante o voo para abrir o bagageiro superior!
    `,
  },
  {
    id: 'guia-como-medir-e-pesar-mala',
    slug: 'como-medir-e-pesar-sua-mala-em-casa',
    title: 'Como medir e pesar sua mala corretamente em casa',
    subtitle: 'Passo a passo com fita métrica e balança caseira para não ser surpreendido no check-in.',
    readTimeMinutes: 4,
    lastUpdated: '19/11/2026 (Verificado)',
    summary: 'Dicas práticas para medir altura, largura, profundidade com rodinhas inclusas e como calcular a soma das dimensões lineares de 158 cm.',
    keyTakeaways: [
      'Sempre meça com a mala já cheia e fechada, incluindo rodinhas e alça superior.',
      'Use uma fita métrica comum para verificar os limites 55 x 35 x 25 cm.',
      'Para malas despachadas, o limite internacional é de 158 cm lineares (Altura + Largura + Profundidade).',
      'Truque da balança de banheiro: pese-se sozinho e depois pese-se segurando a mala.',
    ],
    officialSources: [
      {
        name: 'ANAC — Dicas para Bagagens',
        url: 'https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens',
        lastVerified: '19/11/2026 (Verificado)',
        publisher: 'ANAC',
      },
    ],
    contentMarkdown: `
### Como medir a mala de mão
1. **Encha a mala primeiro:** Bolsos frontais estufados podem facilmente adicionar de 3 a 7 cm na profundidade da sua mala!
2. **Altura:** Meça do chão (a partir da base das rodinhas) até o ponto mais alto da alça retrátil recolhida. Deve ter no máximo **55 cm**.
3. **Largura:** Meça de uma lateral à outra, incluindo a alça lateral. Deve ter no máximo **35 cm**.
4. **Profundidade:** Meça da parte de trás até a frente mais saliente. Deve ter no máximo **25 cm**.

### O que são os 158 cm lineares da mala despachada?
A maioria das companhias aéreas do mundo e brasileiras (LATAM, GOL, Azul) define que a bagagem despachada comum não pode ultrapassar **158 cm na soma das três dimensões**:
> Fórmula: **Soma Linear = Altura + Largura + Profundidade**

*Exemplo:* Uma mala grande medindo 75 cm de altura + 50 cm de largura + 30 cm de profundidade = **155 cm**. Está perfeitamente dentro do limite regulamentar!

### Truque caseiro para pesar sem balança de gancho
Se você não tiver uma balança digital de mala portátil:
1. Suba na balança do seu banheiro e anote seu peso (ex: 70 kg).
2. Pegue a mala no colo e suba na balança novamente (ex: 79,5 kg).
3. Subtraia os dois valores: **79,5 − 70 = 9,5 kg**.
Sua mala de mão está abaixo dos limites de 10 kg (Azul) e 12 kg (LATAM e GOL) e aprovada para viajar!
    `,
  },
];
