# Vim: Comandos Essenciais

Depois de anos evitando, finalmente aprendi Vim de verdade. Aqui estão os comandos que uso toda semana.

## Modos

O Vim tem modos de operação — esse é o conceito central:

| Modo | Como entrar | Para que serve |
|------|-------------|----------------|
| Normal | `Esc` | Navegar e executar comandos |
| Insert | `i`, `a`, `o` | Digitar texto |
| Visual | `v`, `V`, `Ctrl+v` | Selecionar texto |
| Command | `:` | Comandos do editor |

## Movimentação

```vim
" Básico
h j k l        " esquerda, baixo, cima, direita

" Por palavra
w              " próxima palavra (início)
e              " próxima palavra (fim)
b              " palavra anterior
W E B          " mesmos, mas ignoram pontuação

" Por linha
0              " início da linha
^              " primeiro caractere não-branco
$              " fim da linha
gg             " início do arquivo
G              " fim do arquivo
42G            " linha 42
Ctrl+d         " meia página para baixo
Ctrl+u         " meia página para cima

" Busca
/padrão        " buscar para frente
?padrão        " buscar para trás
n              " próxima ocorrência
N              " ocorrência anterior
*              " busca palavra sob cursor
```

## Edição

```vim
" Entrar no modo insert
i              " antes do cursor
a              " depois do cursor
I              " início da linha
A              " fim da linha
o              " nova linha abaixo
O              " nova linha acima

" Deletar (tudo vai para register)
x              " deleta caractere
dd             " deleta linha
dw             " deleta até fim da palavra
d$             " deleta até fim da linha
d3j            " deleta 3 linhas abaixo

" Copiar (yank)
yy             " copia linha
yw             " copia palavra
y$             " copia até fim da linha
3yy            " copia 3 linhas

" Colar
p              " após cursor
P              " antes do cursor

" Desfazer / Refazer
u              " undo
Ctrl+r         " redo
```

## Operador + Movimento

O poder do Vim: `[operador][count][movimento]`

```vim
" Exemplos
ci"            " change inside " — muda conteúdo entre aspas
di(            " delete inside ( — deleta dentro dos parênteses
ya{            " yank around { — copia incluindo as chaves
=G             " indentar do cursor até o fim do arquivo
gqq            " formatar linha atual (word wrap)

" Visual block — super útil
Ctrl+v         " entra no visual block
j j j          " seleciona 3 linhas
I# <Esc>       " insere # no início de cada linha selecionada
```

## Busca e Substituição

```vim
:s/old/new/          " substitui na linha atual (primeira ocorrência)
:s/old/new/g         " substitui na linha atual (todas)
:%s/old/new/g        " substitui em todo arquivo
:%s/old/new/gc       " com confirmação

" Com regex
:%s/\s\+$//          " remove espaços no fim das linhas
:%s/\v(foo|bar)/baz/g  " regex com \v (very magic)
```

## Arquivos e Janelas

```vim
" Arquivos
:e arquivo.py        " abrir arquivo
:w                   " salvar
:w nome.py           " salvar como
:q                   " fechar
:wq  ou  ZZ         " salvar e fechar
:q!  ou  ZQ         " fechar sem salvar

" Splits
:sp arquivo.py       " split horizontal
:vsp arquivo.py      " split vertical
Ctrl+w h/j/k/l      " navegar entre splits
Ctrl+w =             " equalizar tamanhos
:resize 20           " redimensionar split horizontal

" Tabs
:tabnew              " nova aba
gt / gT              " próxima/anterior aba
:tabclose            " fechar aba
```

## Macros

Macros são sequências de comandos gravadas em registros:

```vim
qa             " começa a gravar macro no register 'a'
" ... faz as ações ...
q              " para de gravar

@a             " executa a macro 'a'
10@a           " executa 10 vezes
@@             " repete a última macro
```

**Exemplo prático:** transformar lista de nomes em constantes Python:

```vim
" Dado: nome
" Querido: NOME = "nome"
qa             " gravar em 'a'
I              " início da linha, modo insert
ysiw"          " envolver palavra com aspas (precisa de surround.vim)
A = <Esc>      " adicionar " = " no final
yyP            " duplicar linha
gUU            " maiúsculas na linha
q              " fim da macro
```

## Configuração Mínima (.vimrc)

```vim
" Interface
set number relativenumber   " números relativos
set cursorline               " destacar linha atual
set showmatch                " mostrar par de {[(
set termguicolors            " cores 24-bit

" Edição
set expandtab                " espaços em vez de tabs
set tabstop=4 shiftwidth=4
set autoindent smartindent
set wrap linebreak           " quebra de linha inteligente

" Busca
set ignorecase smartcase     " case-insensitive, exceto com maiúscula
set incsearch hlsearch       " busca incremental e destaque

" Arquivo
set hidden                   " permite trocar buffer sem salvar
set undofile                 " undo persistente entre sessões
set clipboard=unnamedplus    " integração com clipboard do sistema

" Atalhos
let mapleader = " "
nnoremap <leader>w :w<CR>
nnoremap <leader>q :q<CR>
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l
```

---

> **Mantra do Vim:** nunca saia do modo Normal por mais tempo do que o necessário. O Normal é onde você pensa; o Insert é onde você digita.
