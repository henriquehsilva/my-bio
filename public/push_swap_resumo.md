# push_swap — Resumo do Subject (v1.1)

> Resumo e descrição de **tudo que precisa ser feito** segundo o subject.
> Atenção: este subject é a versão **modificada** do push_swap (v1.1). Ele é
> **bem diferente** do push_swap clássico da 42 — exige **4 estratégias de
> ordenação**, métrica de **disorder**, seletores de estratégia, modo `--bench`
> e é **projeto em dupla**. Não se baseie em tutoriais do push_swap antigo.

---

## 0. Visão geral

Escrever um programa em C chamado `push_swap` que, dado um conjunto de inteiros
em uma pilha `a` (sem duplicatas), **calcula e imprime na saída padrão a menor
sequência possível de operações** (em linguagem push_swap) que ordena `a` em
ordem crescente, usando duas pilhas (`a` e `b`) e um conjunto limitado de moves.

O foco pedagógico é **complexidade algorítmica medida em número de operações
push_swap geradas** — não na complexidade teórica de um algoritmo clássico de array.

---

## 1. Projeto em grupo (obrigatório)

- [ ] Feito por **exatamente 2 learners**.
- [ ] Ambos contribuem de forma significativa e **entendem todos os algoritmos**.
- [ ] `README.md` indica claramente a contribuição de cada um.
- [ ] Ambos presentes na defesa, capazes de explicar **qualquer parte** do código.
- [ ] Os logins dos dois aparecem no repositório.

---

## 2. Common Instructions (regras gerais da 42)

- [ ] Escrito em **C**.
- [ ] Respeita a **Norm** (inclui arquivos bonus; erro de norma = **0**).
- [ ] **Sem** crashes inesperados (segfault, bus error, double free…) — exceto comportamento indefinido. Se crashar = projeto não-funcional = **0**.
- [ ] **Zero vazamentos de memória** — tudo que é alocado no heap deve ser liberado. Memory leak não é tolerado.
- [ ] **Makefile** compila com `-Wall -Wextra -Werror` usando `cc`, e **não faz relink desnecessário**.
- [ ] Makefile contém pelo menos: `$(NAME)`, `all`, `clean`, `fclean`, `re`.
- [ ] Bonus em arquivos `_bonus.{c,h}` com regra `bonus` no Makefile (mandatory e bonus avaliados separadamente).
- [ ] Se usar `libft`: copiar fontes + Makefile dela numa pasta `libft`; o Makefile do projeto compila a lib (via Makefile dela) e depois o projeto.
- [ ] (Recomendado, não avaliado) Criar programas de teste — úteis na defesa.
- [ ] Submeter no repositório Git designado (só o que está no Git é avaliado).
- [ ] Se o Deepthought avaliar, roda **após** as peer-evaluations; qualquer erro interrompe a avaliação.

---

## 3. As regras do jogo

- Duas pilhas: `a` e `b`.
- Início: `a` com inteiros aleatórios (positivos e/ou negativos, **sem duplicatas**); `b` vazia.
- Objetivo: ordenar `a` em **ordem crescente** (menor no topo).

### Operações disponíveis (11)

| Op | Significado |
|----|-------------|
| `sa` | swap dos 2 primeiros de `a` (nada se ≤1 elemento) |
| `sb` | swap dos 2 primeiros de `b` |
| `ss` | `sa` + `sb` simultâneos |
| `pa` | push: topo de `b` → topo de `a` (nada se `b` vazia) |
| `pb` | push: topo de `a` → topo de `b` (nada se `a` vazia) |
| `ra` | rotate `a`: todos sobem 1; primeiro vira último |
| `rb` | rotate `b` |
| `rr` | `ra` + `rb` simultâneos |
| `rra` | reverse rotate `a`: todos descem 1; último vira primeiro |
| `rrb` | reverse rotate `b` |
| `rrr` | `rra` + `rrb` simultâneos |

---

## 4. Requisitos de algoritmo

Para forçar entendimento de complexidade (tempo **e** espaço), você deve implementar
**4 estratégias distintas** e o programa deve **escolher a estratégia em runtime**
conforme a configuração da entrada.

### 4.1 Modelo de complexidade (importante!)

- [ ] As estratégias analisam a entrada em C e **geram a sequência de operações** push_swap.
- [ ] A saída de cada estratégia é a sequência de operações que ordena a pilha.
- [ ] **A classe de complexidade declarada deve refletir o custo em número de operações push_swap geradas** — **não** a complexidade teórica de um algoritmo clássico baseado em array.

### 4.2 Métrica de disorder (obrigatória)

`disorder` ∈ [0, 1]: o quão longe `a` está de ordenada.
- `0` = já ordenada · `1` = pior ordem possível.
- Conta **inversões** (par onde um número maior vem antes de um menor) sobre o total de pares.

```
function compute_disorder(stack a):
    mistakes = 0
    total_pairs = 0
    for i from 0 to size(a)-1:
        for j from i+1 to size(a)-1:
            total_pairs += 1
            if a[i] > a[j]:
                mistakes += 1
    return mistakes / total_pairs
```

- [ ] Calcular o disorder **antes** de qualquer move.

### 4.3 As 4 estratégias obrigatórias

1. **Simple — O(n²)** *(pelo menos uma)*
   - Insertion / Selection / Bubble adaptados, ou min/max extraction.

2. **Medium — O(n√n)** *(pelo menos uma)*
   - Chunk-based (dividir em √n chunks), block partitioning, bucket sort com √n baldes, range-based.

3. **Complex — O(n log n)** *(pelo menos uma)*
   - Radix (LSD/MSD), merge com duas pilhas, quicksort com particionamento por pilha, heap, BIT.

4. **Adaptive (design próprio)** — escolhe o método interno conforme o disorder medido. Técnicas livres, mas respeitando os alvos de complexidade **por regime** (no modelo push_swap):
   - `disorder < 0.2` → método **O(n²)**
   - `0.2 ≤ disorder < 0.5` → método **O(n√n)**
   - `disorder ≥ 0.5` → método **O(n log n)**
   - [ ] Documentar no README: **racional dos thresholds**, técnicas usadas em cada regime e um **argumento de complexidade** (upper bounds) de tempo e espaço no modelo push_swap.

---

## 5. O programa `push_swap`

| Item | Valor |
|------|-------|
| Nome | `push_swap` |
| Arquivos | `Makefile`, `*.h`, `*.c` |
| Makefile | `NAME`, `all`, `clean`, `fclean`, `re` |
| Argumentos | stack `a`: lista de inteiros (primeiro arg = topo) |
| Funções externas | `read`, `write`, `malloc`, `free`, `exit`, `ft_printf` (ou equivalente **seu**) |
| Libft | Autorizada |

### Regras do programa

- [ ] Makefile **não relinka**.
- [ ] **Variáveis globais proibidas.**
- [ ] Recebe a stack `a` como lista de inteiros (1º argumento = topo da pilha).
- [ ] Seletor de estratégia **opcional**:
  - `--simple` → força O(n²)
  - `--medium` → força O(n√n)
  - `--complex` → força O(n log n)
  - `--adaptive` → força o adaptativo (e é o **default** se nenhum seletor for dado)
- [ ] Imprime a **menor** lista de operações possível (menor número no topo).
- [ ] Operações separadas por `\n` **e nada mais**.
- [ ] A classe de complexidade declarada para cada algoritmo deve ser **válida nesse modelo**.
- [ ] A seleção de estratégia funciona para **toda entrada válida**, independente de tamanho ou disorder.
- [ ] **Sem parâmetros** → não imprime nada e devolve o prompt.
- [ ] **Erro** → imprime `Error\n` no **stderr**. Casos: argumentos não-inteiros, inteiros fora do range, duplicatas.
- [ ] O binário **embute as 4 estratégias**; nome da estratégia + classe de complexidade disponíveis no modo `--bench`.

### Modo `--bench` (opcional)

Após ordenar, exibir **no stderr** (somente quando a flag está presente):
- [ ] `disorder` (em %, com 2 casas decimais)
- [ ] nome da estratégia usada + sua classe de complexidade teórica
- [ ] total de operações
- [ ] contagem de **cada tipo** de operação: `sa sb ss pa pb ra rb rr rra rrb rrr`

> Convenção do subject: linhas `[bench] ...` vão pro **stderr**; o stream de operações continua no **stdout** (permite `push_swap --bench ... 2> bench.txt | checker ...`).

---

## 6. Benchmark de performance (validação)

| Entrada | Passa | Bom | Excelente |
|---------|-------|-----|-----------|
| 100 números aleatórios | < 2000 ops | < 1500 ops | < 700 ops |
| 500 números aleatórios | < 12000 ops | < 8000 ops | < 5500 ops |

- [ ] Verificado na avaliação **com o checker fornecido**.

---

## 7. Requisitos do README.md

Na raiz do repositório. Deve conter pelo menos:

- [ ] **Primeira linha em itálico**, exatamente: *This project has been created as part of the 42 curriculum by <login1>[, <login2>[, ...]].*
- [ ] Seção **Description** (objetivo + visão geral).
- [ ] Seção **Instructions** (compilação, instalação e/ou execução).
- [ ] Seção **Resources** (referências clássicas + **descrição de como a IA foi usada**: quais tarefas e quais partes do projeto).
- [ ] **Explicação detalhada e justificativa** dos algoritmos escolhidos.
- [ ] Documentação das contribuições de **cada um dos 2 learners** (ver §1).
- [ ] (Se aplicável) seções extras: exemplos de uso, lista de features, escolhas técnicas.
- Idioma: inglês recomendado, ou o idioma principal do campus (PT-BR ok).

---

## 8. Bonus — programa `checker`

> ⚠️ O bonus **só é avaliado se o mandatory estiver perfeito** (totalmente completo, sem erros, **todos os benchmarks validados sem exceção**). Falhou algum requisito do mandatory → bonus **não é avaliado**.

| Item | Valor |
|------|-------|
| Nome | `checker` |
| Arquivos | `*.h`, `*.c` |
| Makefile | regra `bonus` |
| Funções externas | `read`, `write`, `malloc`, `free`, `exit`, `ft_printf` (ou equivalente seu) |
| Libft | Autorizada |

### Comportamento do `checker`

- [ ] Recebe a stack `a` como argumento (1º arg = topo). Sem argumento → para e não imprime nada.
- [ ] Lê operações do **stdin**, cada uma seguida de `\n`; após ler todas, executa na pilha.
- [ ] Se ao final `a` ordenada **e** `b` vazia → imprime `OK\n` no **stdout**.
- [ ] Em qualquer outro caso → imprime `KO\n` no **stdout**.
- [ ] Erro → `Error\n` no **stderr**. Casos: args não-inteiros, maiores que int, duplicatas, instrução inexistente e/ou mal formatada.
- Não precisa reproduzir exatamente o binário fornecido; **gerenciar erros é obrigatório**, mas o parsing dos argumentos é livre.

---

## 9. Submissão e peer-evaluation

- [ ] Tudo no repositório Git (só o que está lá é avaliado; conferir nomes dos arquivos).
- [ ] Ambos os learners listados como contribuidores.
- [ ] README documenta a contribuição de cada um.
- [ ] Ambos presentes na defesa; cada um capaz de explicar/defender **qualquer parte**.
- [ ] Estar preparado para uma **modificação rápida** durante a avaliação (pequena mudança de comportamento/feature, poucos minutos) — serve pra verificar entendimento real.

---

## Checklist-resumo de entrega

**Mandatory**
- [ ] `push_swap` com 4 estratégias embutidas + seleção em runtime
- [ ] Seletores `--simple`, `--medium`, `--complex`, `--adaptive` (default)
- [ ] Métrica de disorder calculada antes dos moves
- [ ] Adaptive respeitando os thresholds 0.2 / 0.5
- [ ] Modo `--bench` (stderr) com disorder %, estratégia, total e contagem por op
- [ ] Tratamento de erros (`Error\n` no stderr)
- [ ] Sem globais, sem leaks, sem crash, Norm ok, Makefile sem relink
- [ ] Bater os alvos de performance (100 e 500)
- [ ] `README.md` completo (incl. justificativa de algoritmos, uso de IA, contribuições da dupla)

**Bonus** (só se mandatory perfeito)
- [ ] `checker` (OK/KO/Error) + regra `bonus` no Makefile
