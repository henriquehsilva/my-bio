# Push_swap — Partes do Projeto

O push_swap é composto por várias partes. Vamos por etapas:

## 1. Parsing e Validação da Entrada

Receber os argumentos, validar se são inteiros, verificar duplicatas e limites de `INT_MIN`/`INT_MAX`. É a porta de entrada do programa — sem isso nada funciona.

## 2. Estrutura de Dados

Definir como representar as pilhas `a` e `b`. A escolha mais comum é lista encadeada ou array. Essa decisão impacta todo o resto.

## 3. Operações

Implementar as 11 operações obrigatórias:

- `sa`, `sb`, `ss` → swap
- `pa`, `pb` → push
- `ra`, `rb`, `rr` → rotate
- `rra`, `rrb`, `rrr` → reverse rotate

Cada operação imprime seu nome no stdout.

## 4. Algoritmo de Ordenação

A parte mais complexa — ordenar a pilha usando o menor número de operações possível. Geralmente dividido por tamanho:

- **2 a 3 elementos** → casos simples hardcoded
- **4 a 5 elementos** → lógica específica
- **100 elementos** → algoritmo eficiente
- **500 elementos** → algoritmo otimizado

## 5. Verificação de Ordenação

Checar se a pilha está ordenada para saber quando parar.

---

## Por onde começar?

**Parsing → Estrutura → Operações → Verificação → Algoritmo**

Nessa ordem você sempre tem uma base testável antes de avançar.
