# Introdução ao Python 3

Python é uma linguagem de programação de alto nível, interpretada e de propósito geral. É conhecida pela legibilidade do código e sintaxe limpa.

## Tipos de Dados

Python tem tipagem dinâmica, mas é fortemente tipada. Os tipos básicos são:

```python
# Números
inteiro = 42
flutuante = 3.14
complexo = 2 + 3j

# Strings
nome = "Henrique"
multiline = """
Isso é uma
string de múltiplas linhas
"""

# Booleanos
ativo = True
inativo = False

# None (equivalente ao null)
vazio = None
```

## Estruturas de Dados

### Listas

```python
frutas = ["maçã", "banana", "laranja"]

# Acessando elementos
print(frutas[0])   # maçã
print(frutas[-1])  # laranja (último elemento)

# Fatiamento (slicing)
print(frutas[1:])  # ['banana', 'laranja']

# Adicionando elementos
frutas.append("uva")
frutas.insert(1, "pera")

# List comprehension — idioma Python
quadrados = [x**2 for x in range(10)]
pares = [x for x in range(20) if x % 2 == 0]
```

### Dicionários

```python
pessoa = {
    "nome": "Henrique",
    "idade": 28,
    "linguagens": ["Python", "JavaScript", "Go"]
}

# Acessando
print(pessoa["nome"])
print(pessoa.get("email", "não informado"))  # com valor padrão

# Dict comprehension
quadrados = {x: x**2 for x in range(5)}
```

### Tuplas e Sets

```python
# Tupla — imutável
coordenadas = (10.5, -23.4)
x, y = coordenadas  # desempacotamento

# Set — sem duplicatas
linguagens = {"Python", "Go", "Rust", "Python"}  # {'Go', 'Python', 'Rust'}
```

## Controle de Fluxo

```python
# if/elif/else
nota = 7.5

if nota >= 9:
    conceito = "A"
elif nota >= 7:
    conceito = "B"
elif nota >= 5:
    conceito = "C"
else:
    conceito = "F"

# Operador ternário
status = "aprovado" if nota >= 5 else "reprovado"
```

### Loops

```python
# for com range
for i in range(5):
    print(i)

# for em iterável
for fruta in ["maçã", "banana", "laranja"]:
    print(fruta)

# enumerate — quando precisar do índice
for i, fruta in enumerate(frutas):
    print(f"{i}: {fruta}")

# zip — iterar em paralelo
nomes = ["Ana", "Bob", "Carlos"]
idades = [25, 30, 22]
for nome, idade in zip(nomes, idades):
    print(f"{nome} tem {idade} anos")

# while
contador = 0
while contador < 5:
    print(contador)
    contador += 1
```

## Funções

```python
# Definição básica
def saudacao(nome):
    return f"Olá, {nome}!"

# Parâmetros padrão
def conectar(host, porta=5432, ssl=True):
    return f"Conectando em {host}:{porta} (ssl={ssl})"

# *args e **kwargs
def soma(*numeros):
    return sum(numeros)

def criar_usuario(**dados):
    return dados

# Funções lambda
dobro = lambda x: x * 2
ordenar = sorted(palavras, key=lambda p: len(p))

# Type hints (Python 3.5+)
def dividir(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("Divisão por zero")
    return a / b
```

## Tratamento de Erros

```python
try:
    resultado = 10 / 0
except ZeroDivisionError as e:
    print(f"Erro: {e}")
except (TypeError, ValueError) as e:
    print(f"Erro de tipo/valor: {e}")
else:
    print("Executado se não houve erro")
finally:
    print("Sempre executado")

# Context managers
with open("arquivo.txt", "r") as f:
    conteudo = f.read()
# arquivo fechado automaticamente
```

## Classes e OOP

```python
class Animal:
    especie = "Desconhecida"  # atributo de classe

    def __init__(self, nome: str, som: str):
        self.nome = nome      # atributo de instância
        self._som = som       # convenção: protegido

    def falar(self) -> str:
        return f"{self.nome} faz {self._som}"

    def __repr__(self) -> str:
        return f"Animal(nome={self.nome!r})"


class Cachorro(Animal):
    def __init__(self, nome: str):
        super().__init__(nome, "au au")

    def buscar(self, item: str) -> str:
        return f"{self.nome} foi buscar {item}!"


rex = Cachorro("Rex")
print(rex.falar())    # Rex faz au au
print(rex.buscar("bola"))
```

## Módulos Úteis

```python
# pathlib — trabalhar com arquivos
from pathlib import Path

p = Path("~/projetos/meu_app").expanduser()
p.mkdir(parents=True, exist_ok=True)

for arquivo in p.glob("*.py"):
    print(arquivo.name)

# datetime
from datetime import datetime, timedelta

agora = datetime.now()
amanha = agora + timedelta(days=1)
print(agora.strftime("%d/%m/%Y %H:%M"))

# json
import json

dados = {"nome": "Henrique", "ativo": True}
json_str = json.dumps(dados, ensure_ascii=False, indent=2)
de_volta = json.loads(json_str)
```

---

> **Próximo passo:** estudar generators, decorators e programação assíncrona com `asyncio`.
