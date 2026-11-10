# BagagemOK — O que pode ir na sua mala?

> Plataforma brasileira para consulta e verificação de regras de bagagem aérea em voos domésticos e internacionais.

[![Deploy to GitHub Pages](https://github.com/siteonlinebr/bagagemok/actions/workflows/deploy.yml/badge.svg)](https://siteonlinebr.github.io/bagagemok/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![ANAC Compliant](https://img.shields.io/badge/Normas-ANAC%20Res.%20400-23A88A.svg)](https://www.gov.br/anac)

O **BagagemOK** é um produto digital desenvolvido para responder com clareza e precisão a uma das maiores dúvidas de quem viaja de avião: **o que é permitido levar na bagagem de mão e despachada, onde levar e sob quais condições?**

Em vez de exigir que o passageiro navegue por dezenas de páginas dispersas ou PDFs burocráticos, o BagagemOK consolida as resoluções da **ANAC** (Agência Nacional de Aviação Civil), as normas internacionais da **OACI / ICAO** e as regras operacionais específicas das companhias aéreas brasileiras (**LATAM**, **GOL** e **Azul**).

---

## ✈️ Funcionalidades Principais

### 1. Consultar Item com Inteligência de Sinônimos
- Campo de pesquisa que reconhece nomes comerciais, marcas e termos populares (ex: *power bank*, *carregador portátil*, *dipirona*, *shampoo*, *canivete*, *gilete*).
- Filtros por **Tipo de voo** (*Doméstico* vs *Internacional*), **Companhia aérea** (*LATAM*, *GOL*, *Azul*, *Todas*) e **Local de transporte** (*Mão*, *Despachada*, *Ambos*).
- Diagnóstico visual em 4 estados certificados:
  - 🟢 **Permitido:** sem restrição específica detectada.
  - 🟡 **Permitido com condições:** requer limites de volume, capacidade, embalagem ou receita médica.
  - 🔴 **Não permitido:** proibição mandatória de segurança.
  - 🟠 **Necessita de confirmação:** requer autorização prévia da companhia ou dados adicionais.

### 2. Ferramenta Interativa: Medir e Pesar Bagagem
- Validação dimensional em tempo real de **Altura**, **Largura**, **Profundidade** e **Peso**.
- Alternância entre unidades métricas e imperiais (**cm / m / polegadas** e **kg / libras**).
- Verificação individual para **Bagagem de mão** (10 kg, 55x35x25 cm), **Item pessoal** (sob o assento) e **Bagagem despachada** (23 kg e 158 cm lineares).
- Cálculo automático das diferenças e folgas em relação aos limites oficiais.

### 3. Comparador Neutro de Companhias Aéreas
- Comparação lado a lado entre **LATAM**, **GOL** e **Azul**:
  - Medidas de bagagem de mão e itens pessoais;
  - Franquias incluídas por classe de tarifa (*Basic/Light* vs *Plus/Top*);
  - Despacho voluntário no portão em voos lotados;
  - Políticas de eletrônicos, líquidos e baterias.

### 4. Calculadora de Baterias e Power Banks (Watt-hora)
- Conversão da capacidade comercial em **miliampère-hora (mAh)** e **tensão (V)** para **Watt-hora (Wh)**:
  $$\text{Wh} = \frac{\text{mAh} \times \text{V}}{1.000}$$
- Classificação automática conforme o **RBAC 175 da ANAC** e **Doc 9284 da OACI**:
  - Até **100 Wh**: Livre na mala de mão para uso pessoal (proibido no porão).
  - De **100.1 Wh a 160 Wh**: Exige autorização formal da companhia aérea.
  - Acima de **160 Wh**: Proibido em voos comerciais de passageiros.

### 5. Minhas Consultas & Mala Pessoal (Checklist)
- Histórico de buscas salvas offline via `localStorage`.
- Lista interativa de viagem separada entre **Mala de Mão** e **Mala Despachada**.
- **Alerta de Segurança Ativo:** notifica instantaneamente se o passageiro tentar alocar itens proibidos no porão (ex: *power banks*, cigarros eletrônicos).
- Suporte para impressão e exportação em PDF.

### 6. Guias Editoriais Verificados
- Artigos didáticos completos sobre a regra dos 100 ml em voos internacionais, direitos do passageiro na ANAC, transporte de medicamentos e insulina, e dicas práticas para medir a mala em casa.

---

## 🎨 Identidade Visual e Design

- **Azul-marinho:** `#102746` (estrutura institucional e contraste)
- **Azul principal:** `#1976F3` (ações primárias e destaques)
- **Azul secundário:** `#3E9AF7` (acabamentos e gradientes)
- **Fundo principal:** `#F5F8FD` (canvas clean e arejado)
- **Verde de confirmação:** `#23A88A`
- **Laranja de atenção:** `#F47736`
- **Vermelho de restrição:** `#D94B50`
- **Tipografia:** Sora (títulos e destaques numéricos) e Inter (textos e controles)

---

## 🚀 Como Executar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/siteonlinebr/bagagemok.git
cd bagagemok

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Execute a suíte de testes automatizados
npm test

# 5. Gere o build de produção
npm run build
```

---

## 🌐 Publicação no GitHub Pages

O projeto foi **integralmente preparado para hospedagem estática no GitHub Pages**:

1. **Base Path Relativo:** `vite.config.ts` utiliza `base: './'`, permitindo que os assets sejam carregados sem erros em qualquer subdiretório (ex: `https://<usuario>.github.io/bagagemok/`).
2. **SPA Fallback 404:** O arquivo `public/404.html` preserva rotas, queries e hash ao atualizar qualquer página interna.
3. **Workflow Automatizado do GitHub Actions:** O arquivo `.github/workflows/deploy.yml` já está configurado. Ao fazer `push` para a branch `main`, a publicação ocorre de forma 100% automática.

### Configuração no Repositório do GitHub:
1. Acesse o repositório no GitHub.
2. Vá em **Settings** > **Pages**.
3. Na seção **Build and deployment** > **Source**, selecione **GitHub Actions**.
4. Faça um push ou acione o workflow manualmente em **Actions**.

---

## 📋 Como Atualizar as Regras e a Base de Dados

Os dados foram desacoplados da interface para facilitar a manutenção contínua:

- **Itens e Regras:** `src/data/items.ts`
  - Adicione novos itens mantendo os campos obrigatórios: `id`, `name`, `synonyms`, `category`, `handLuggage`, `checkedLuggage`, `officialSources` e `lastVerifiedDate`.
- **Limites das Companhias:** `src/data/airlines.ts`
  - Atualize pesos, dimensões ou taxas de LATAM, GOL ou Azul.
- **Guias Editoriais:** `src/data/guides.ts`
  - Publique novos artigos com markdown e fontes citadas.

---

## 🏛️ Identificação Institucional

O **BagagemOK** é um projeto independente integrante do **Future Horizon Group (FHG)**.

- **Conheça o grupo:** [https://siteonlinebr.github.io/Fhg.com.br/](https://siteonlinebr.github.io/Fhg.com.br/)

---

## ⚖️ Aviso Legal
O BagagemOK é uma ferramenta informativa independente baseada em regulamentações públicas da ANAC (Resolução nº 400/2016 e RBAC 175) e políticas operacionais das companhias aéreas brasileiras. As regras podem sofrer alterações sem aviso prévio. Consulte sempre sua companhia aérea e autoridades locais antes do embarque.
