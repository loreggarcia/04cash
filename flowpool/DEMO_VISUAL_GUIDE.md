# 🎯 Demo Frontend - Guia Visual & Cor Refatoração

## Paleta de Cores Final

### Sistema de Cor (CSS Variables)
```css
/* Primárias */
--primary: #836ef9        /* Cyan - Configuração, UI primária */
--success: #00d16f        /* Green - Sucesso, impacto positivo */
--amber: #f6b663          /* Amber - Gatilhos, alertas */

/* Escala Cinza */
--foreground: #fafafa     /* Texto principal */
--muted-foreground: #a1a1aa  /* Texto secundário */
--card: #16161a           /* Card background */
--background: #0e0e10     /* Base background */
--border: #27272a         /* Dividers */

/* Especiais */
--critical: #ff7a7a       /* Destructive */
--chart-1: #836ef9        /* Chart color */
--chart-2: #00d16f        /* Chart success */
```

### Paleta Funcional por Componente

#### Demo 1: Automação (Cyan + Amber)
```
Eyebrow:        #836ef9 (Cyan 700)      "Demo 1 · cérebro financeiro"
Obrigações:     #16161a (Card)          Background
  - Prioridade: #836ef9 (Cyan pill)     Status
  - Valor:      #836ef9 (Cyan bold)     Destaque
Gatilho:        #f6b663 (Amber)         Ação crítica
Split:          #836ef9 (Cyan)          Controle
Benefit Box:    #00d16f (Green 10%)     Positivo
```

#### Demo 2: Execução (Cyan + Green)
```
Eyebrow:        #836ef9 (Cyan)          "Demo 2 · execução"
Pool:           #836ef9 (Cyan)          Container principal
  - Aluguel:    #00d16f (Green)         Sucesso de pagamento
  - Uso:        #836ef9 (Cyan)          Operacional
  - Previdência: #f6b663(Amber)        Futuro/alertness
Timeline:       #00d16f (Green) + #666  Active/Inactive
Final callout:  #00d16f (Green bg)      Impacto positivo
```

#### Demo 3: Impacto (Green)
```
Eyebrow:        #00d16f (Green)         "Demo 3 · impacto real"
Icon boxes:     #00d16f (Icons)         Ação positiva
  Zap:          #00d16f
  TrendingUp:   #00d16f
  Calendar:     #00d16f
  Heart:        #00d16f
Callout:        #00d16f (20% opacity)   Benefício principal
```

---

## 📐 Componentes & Estrutura

### Arquivo: `automation-builder.tsx`
**Localizado em**: `/apps/web/components/demo/`

**Seções**:
```
┌─────────────────────────────────────┐
│ Header: "Monte suas regras"          │ Cyan eyebrow + StatusPill
├─────────────┬───────────────────────┤
│             │                       │
│ Obrigações  │ Gatilho de execução   │ Left: List | Right: 3 boxes
│ (drag drop) │ Split 80/20           │
│             │ Fluxo automático      │
│             │                       │
└─────────────┴───────────────────────┘
```

**Cor por Elemento**:
- Title: `text-2xl font-semibold`
- Obrigações: `border-line bg-panelAlt/40`
- Priority pill: `border-green/30 bg-green/10 text-green` (Aluguel)
- Gatilho box: `border-amber/30 bg-amber/5`
- Split box: `border-line/50 bg-panelAlt/40`

---

### Arquivo: `pool-execution-demo.tsx`
**Localizado em**: `/apps/web/components/demo/`

**Seções**:
```
┌──────────────────────────────────┐
│ Header: "O Pix cai. A pool..."   │ Cyan eyebrow
├──────────────┬──────────────────┤
│              │                  │
│ Botões       │ Timeline         │ Left: Simulaction | Right: Steps
│ Pool Box     │ Callout final    │
│   (Cyan)     │                  │
│ 3 Cards      │                  │
│  (G/C/A)     │                  │
│              │                  │
└──────────────┴──────────────────┘
```

**Cores Dinâmicas**:
```javascript
// Cards mudam cor baseado em valores
rentPaid > 0      ? "border-green/50 bg-green/5"      : "border-line"
operational > 0   ? "border-cyan/50 bg-cyan/5"        : "border-line"
pension > 0       ? "border-amber/50 bg-amber/5"      : "border-line"

// Timeline items
item.active       ? "border-green/50 bg-green/5"      : "border-line/50"
```

---

### Arquivo: `financial-impact.tsx` [NOVO]
**Localizado em**: `/apps/web/components/demo/`

**Seções**:
```
┌──────────────────────────────────────┐
│ Header: "A vida financeira..."       │ Green eyebrow
├──────────────────────────────────────┤
│  [⚡]              [📈]            │ 4 cards em grid 2x2
│  Zero ação         Previdência     │
│  manual            automática       │
│                                     │
│  [📅]              [❤️]            │
│  Caixa             Paz              │
│  organizado        financeira       │
├──────────────────────────────────────┤
│ 💡 O que muda de verdade...         │ Green callout final
│ [microcopy impactante]              │
└──────────────────────────────────────┘
```

**Cores**:
- Icons: All `text-green`
- Icon boxes: `border-green/20 bg-green/5`
- Cards hover: `hover:border-line hover:bg-background/60`
- Final callout: `border-green/20 bg-green/5`

---

## 🎨 Refinamentos Visuais

### Typography
```markup
Eyebrow:      text-xs uppercase tracking-[0.24em] text-[color]
Title:        text-2xl font-semibold text-text
Description:  text-sm text-muted
Labels:       text-sm font-medium text-text
Values:       text-xl font-bold text-[color]
```

### Spacing (Tailwind)
```
Outer padding:    px-6 py-6
Card padding:     p-5
Inner gaps:       gap-4, gap-5
Text margin:      mt-2, mt-3, mt-4
Grid gaps:        gap-3, gap-4
```

### Borders & Rounded
```
Cards:      rounded-2xl border border-line
Container:  rounded-3xl border border-line/80
Boxes:      rounded-xl, rounded-2xl
Colors:     border-line, border-[color]/20, border-[color]/50
```

### Transitions
```
Cards hover:      transition-all
                  hover:border-line hover:bg-background/60

Dynamic colors:   transition-all
                  [class]="... transition-all"
```

---

## 📱 Responsividade

### Breakpoints Mantidos
```
Mobile:         flex flex-col (full width)
Tablet (md):    grid-cols-2
Desktop (lg):   grid-cols-[1.2fr_0.8fr] ou similar
```

### Componentes Responsive
```tsx
// Demo 1
lg:grid-cols-[1.2fr_0.8fr]       // Left wider

// Demo 2
lg:grid-cols-[1.05fr_0.95fr]     // Balanced

// Demo 3
md:grid-cols-2                    // 2 colunas em tablet+
```

---

## ✨ Estados Interativos

### Demo 2 - Pool Execution (Funcional)
```
Estado 1: Inicial (totalInflow = 0)
  - Botões clicáveis
  - Pool = R$ 0.00
  - Cards cinzas
  - Timeline com números

Estado 2: Abaixo da meta (totalInflow = 150)
  - Pool = R$ 150.00
  - Gatilho não atingido
  - Cards começam a colorir (parcial)
  - Passos 1-2 ativos

Estado 3: Acima da meta (totalInflow = 350)
  - Pool = R$ 350.00
  - GATILHO ATINGIDO
  - Aluguel = R$ 300 (GREEN)
  - Uso = R$ 120 (CYAN)
  - Previdência = R$ 30 (AMBER)
  - Timeline completa (✓ em verde)
```

---

## 🎬 Integração nas Páginas

### `/dashboard`
```tsx
<AutomationBuilder />     // Demo 1
<FinancialImpact />       // Demo 3
<FlowOverview />
<PoolGrowthChart />
<AllocationChart />
```

### `/add-funds`
```tsx
<PoolExecutionDemo />     // Demo 2
<FinancialImpact />       // Demo 3
<PaymentTimeline />
<FundingComplete />
```

---

## 🎯 Copy Refinado (PT-BR)

| Antes | Depois |
|-------|--------|
| "Configuração" | "cérebro financeiro" |
| "Executa primeiro" | "Paga primeiro" |
| "Caixa disponível" | "saldo" |
| "Espera caixa" | "Aguarda liberação" |
| "Execução + pool" | "execução em tempo real" |
| "A rotina executa" | "Tudo executa sozinho" |
| "Impacto percebido" | "Resultado na prática" |

---

## 📊 Building Stats

```
Compilation:    ✓ Success (4.5s)
Pages:          ✓ Generated (10/10)
TypeScript:     ✓ No errors
Components:     ✓ 3 new + 2 improved
Breaking:       ✗ None
Migration:      ✗ None needed
```

---

## 🚀 Ready for Narrative Video

Todos os 3 segmentos estão prontos para serem capturados em um video narrativo de ~2min:

**0:00-0:55** → Introdução/CTA  
**0:55-1:20** → Demo 1 (Automation Builder) — Paleta Cyan+Amber  
**1:20-1:55** → Demo 2 (Pool Execution) — Paleta Cyan+Green dinâmica  
**1:55-2:10** → Demo 3 (Financial Impact) — Paleta Green  
**2:10+**    → CTA Final/Buttons

---

**Status**: ✅ Implementação Completa  
**Data**: 22 de Março de 2026  
**Linguagem**: Português (BR)  
**Design System**: Mantido coeso com projeto  
