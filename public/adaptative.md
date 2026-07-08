# Implementando o `--adaptative` (estratégia padrão)

Pelo subject, `adaptive` não é só mais um selector ao lado de `--simple` /
`--medium` / `--complex`: é o **comportamento padrão quando nenhum selector é
passado**. Ele mede o disorder da pilha `a` antes de qualquer operação e
despacha para uma das três estratégias de acordo com faixas fixas.

| Faixa  | Disorder            | Estratégia obrigatória      | Complexidade |
|--------|----------------------|------------------------------|--------------|
| Low    | `< 0.2`              | `sort_simple` (já existe)    | O(n²)        |
| Medium | `>= 0.2` e `< 0.5`   | `sort_medium` (a implementar)| O(n·√n)      |
| High   | `>= 0.5`             | `sort_complex` (já existe)   | O(n log n)   |

> **Ponto crítico do subject**: o disorder tem que ser calculado antes de
> qualquer `sa`/`pb`/`ra`/etc. Nenhuma operação pode acontecer entre "receber
> a pilha" e "medir o disorder".

## Passo 1 — `compute_disorder()` (já implementado, não mexe)

[compute_disorder.c](../compute_disorder.c) já usa exatamente a fórmula do
subject — inversões sobre total de pares:

```c
double	compute_disorder(t_stack *a)
{
	t_node	*i;
	t_node	*j;
	int		mistakes;
	int		total_pairs;

	if (!a || a->size < 2)
		return (0.0);
	mistakes = 0;
	total_pairs = 0;
	i = a->top;
	while (i)
	{
		j = i->next;
		while (j)
		{
			total_pairs++;
			if (i->value > j->value)
				mistakes++;
			j = j->next;
		}
		i = i->next;
	}
	return ((double)mistakes / (double)total_pairs);
}
```

`sort_adaptative` vai chamar essa função como a **primeira coisa que faz**,
antes de tocar em qualquer operação de pilha — isso garante o ponto crítico
acima dentro da própria função, independente de quem a chama.

## Passo 2 — thresholds em `push_swap.h`

Junto dos outros defines de estratégia (`QS_A`, `QS_DESC`):

```c
# define QS_A		1
# define QS_DESC	2

# define DISORDER_LOW	0.2
# define DISORDER_MED	0.5
```

## Passo 3 — `sort_medium` (faixa intermediária, O(n·√n))

Ainda não existe `sort_medium.c`. A técnica clássica pra essa faixa é o
"chunk sort" (algoritmo Turco): dividir o intervalo de valores em
`⌈√n⌉` baldes, empurrar cada elemento pra `b` respeitando a ordem dos
baldes, depois devolver pra `a`. Isso mantém cada elemento sendo
"revisitado" cerca de `√n` vezes em vez de `n` (simple) ou `log n` níveis de
partição (complex):

```c
#include "push_swap.h"

static int	chunk_of(int value, int min, int range, int chunks)
{
	if (range <= 0)
		return (0);
	return (((value - min) * chunks) / (range + 1));
}

void	sort_medium(t_stack *a, t_stack *b)
{
	int	chunks;
	int	current;

	if (is_sorted(a))
		return ;
	chunks = 1;
	while (chunks * chunks < a->size)
		chunks++;
	current = 0;
	while (current < chunks && b->size < a->size)
	{
		while (a->size && chunk_of(a->top->value, /* min */ 0,
				/* range */ 0, chunks) <= current)
			op_push(a, b, 1);
		current++;
	}
	while (b->size)
		op_push_back(a, b, 1);
}
```

> Esse esqueleto ainda precisa: (1) calcular `min`/`max` reais da pilha antes
> do loop (uma varredura O(n), não estraga a complexidade); (2) decidir a
> ordem de reinserção em `a` conforme o balde (hoje `op_push_back` só devolve
> na ordem que saiu de `b`, não necessariamente ordenada). É a parte que
> falta prototipar/testar — trate como ponto de partida, não como algoritmo
> pronto.

Declarar em `push_swap.h`:

```c
void				sort_simple(t_stack *a, t_stack *b);
void				sort_medium(t_stack *a, t_stack *b);
void				sort_complex(t_stack *a, t_stack *b);
void				sort_adaptative(t_stack *a, t_stack *b);
```

## Passo 4 — `sort_adaptative`, o dispatcher

```c
#include "push_swap.h"

void	sort_adaptative(t_stack *a, t_stack *b)
{
	double	disorder;

	if (is_sorted(a))
		return ;
	disorder = compute_disorder(a);
	if (disorder < DISORDER_LOW)
		sort_simple(a, b);
	else if (disorder < DISORDER_MED)
		sort_medium(a, b);
	else
		sort_complex(a, b);
}
```

`compute_disorder` já é O(n²), então chamá-la aqui de novo (além da chamada
que `main.c` já faz para o `--bench`) não piora a complexidade assintótica —
o gargalo real é a estratégia escolhida depois, não essa medição.

## Passo 5 — tornar `adaptative` o default em `strategies.c`

Coloca a entrada `--adaptative` **primeiro** no array: como
`get_default_strategy()` retorna `&get_strategies()[0]`, isso já faz dela o
comportamento padrão sem precisar mexer em `parse_flags.c` nem em
`get_default_strategy()`. `--simple`/`--medium`/`--complex` continuam
disponíveis como override explícito (útil pra calibrar e pro `--bench`
comparar regimes isolados):

```c
void	sort_simple(t_stack *a, t_stack *b);
void	sort_medium(t_stack *a, t_stack *b);
void	sort_complex(t_stack *a, t_stack *b);
void	sort_adaptative(t_stack *a, t_stack *b);

static const t_strategy	*get_strategies(void)
{
	static const t_strategy	strategies[] = {
	{"--adaptative", "Adaptative", "O(n^2) / O(n*sqrt(n)) / O(n log n)", \
		sort_adaptative},
	{"--simple", "Simple", "O(n^2)", sort_simple},
	{"--medium", "Medium", "O(n*sqrt(n))", sort_medium},
	{"--complex", "Complex", "O(n log n)", sort_complex},
	{NULL, NULL, NULL, NULL}
	};

	return (strategies);
}
```

## Passo 6 — Makefile

Adicionar os dois arquivos novos à `SRC` (`sort_adaptative.c` já está lá):

```makefile
SRC				= main.c \
				  ... \
				  sort_complex.c \
				  sort_medium.c \
				  sort_adaptative.c
```

## Passo 7 — o que documentar no README

O subject pede uma justificativa por escrito. Rascunho pronto pra colar:

**Por que 0.2 e 0.5?**
Numa permutação uniformemente aleatória, o valor esperado do disorder
(fração de pares invertidos) tende a 0.5 — é o "centro" estatístico da
bagunça. `< 0.2` marca uma pilha visivelmente quase ordenada, onde o custo
de `sort_simple` é dominado pelo número real de elementos fora do lugar, não
pelo pior caso O(n²). `>= 0.5` marca uma pilha tão ou mais embaralhada que a
média de uma aleatória — é onde o particionamento de `sort_complex` compensa
de forma consistente, independente da estrutura interna. A faixa do meio é a
zona de transição onde nem o custo quadrático do simple nem o overhead
recursivo do quicksort são a melhor escolha.

**Técnica por regime:**
- Low → `sort_simple`: passes de "achar o menor / rotacionar pro topo",
  barato porque poucos elementos estão fora do lugar.
- Medium → `sort_medium`: chunk sort (baldes de tamanho ≈ `√n` por faixa de
  valor), evita tanto o quadrático do simple quanto o overhead de recursão
  do quicksort.
- High → `sort_complex`: quicksort via `partition()` alternando `a`/`b`
  (já implementado em [sort_complex.c](../sort_complex.c)).

**Argumento de complexidade:**
- `sort_simple`: cada elemento pode exigir até O(n) rotações para chegar à
  posição final → O(n²) no pior caso.
- `sort_medium`: `√n` baldes, cada elemento é comparado/movido O(√n) vezes
  (uma vez por fronteira de balde) → O(n·√n).
- `sort_complex`: profundidade de recursão O(log n) com particionamento
  O(n) por nível (pivô = mediana da pilha) → O(n log n).
