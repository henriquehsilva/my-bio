# Git na Prática

Anotações sobre os comandos do Git que uso no dia a dia. Organizados por situação de uso.

## Configuração Inicial

```bash
# Identidade global
git config --global user.name "Henrique Silva"
git config --global user.email "henrique@henriquesilva.dev"

# Editor padrão
git config --global core.editor "vim"

# Branch padrão
git config --global init.defaultBranch main

# Ver todas as configurações
git config --list
```

## Workflow Básico

```bash
# Iniciar repositório
git init
git clone https://github.com/user/repo.git

# Status e diff
git status
git diff               # mudanças não staged
git diff --staged      # mudanças staged

# Staging
git add arquivo.py
git add src/           # diretório inteiro
git add -p             # staging interativo (patch) — muito útil!

# Commit
git commit -m "feat: adicionar autenticação via JWT"
git commit --amend     # corrigir último commit (antes de push!)
```

## Branches

```bash
# Listar, criar, trocar
git branch                    # lista branches locais
git branch -a                 # inclui remotas
git branch feature/login      # cria branch
git switch feature/login      # troca para branch (Git 2.23+)
git switch -c feature/login   # cria e troca

# Deletar
git branch -d feature/login   # só se merged
git branch -D feature/login   # força deleção

# Renomear
git branch -m old-name new-name
```

## Merge e Rebase

```bash
# Merge
git switch main
git merge feature/login       # fast-forward se possível
git merge --no-ff feature/login  # sempre cria merge commit

# Rebase — histórico linear
git switch feature/login
git rebase main

# Rebase interativo — reorganizar commits
git rebase -i HEAD~3   # últimos 3 commits
# comandos úteis no editor:
# pick  — mantém o commit
# reword — muda a mensagem
# squash — une com o anterior
# fixup  — une sem a mensagem
# drop   — remove o commit
```

## Remote

```bash
# Gerenciar remotes
git remote -v
git remote add origin https://github.com/user/repo.git
git remote rename origin upstream

# Push e Pull
git push origin main
git push -u origin feature/login   # seta upstream
git pull                           # fetch + merge
git pull --rebase                  # fetch + rebase (histórico mais limpo)

# Fetch sem merge
git fetch origin
git fetch --all
```

## Desfazendo Coisas

```bash
# Desfazer staged (sem perder mudanças)
git restore --staged arquivo.py

# Desfazer mudanças não staged
git restore arquivo.py   # CUIDADO: irreversível!

# Reverter commit (cria novo commit de reversão)
git revert abc1234

# Reset — mover HEAD
git reset --soft HEAD~1    # desfaz commit, mantém staged
git reset --mixed HEAD~1   # desfaz commit e staging (padrão)
git reset --hard HEAD~1    # desfaz tudo — PERDA DE DADOS!

# Recuperar commit "perdido"
git reflog                 # lista todos os movimentos do HEAD
git switch -c recuperado abc1234  # cria branch no commit perdido
```

## Stash

```bash
# Guardar mudanças temporariamente
git stash                     # salva e limpa working tree
git stash push -m "WIP: login form"  # com mensagem
git stash -u                  # inclui arquivos não rastreados

# Recuperar
git stash list
git stash pop                 # aplica e remove o stash
git stash apply stash@{1}     # aplica sem remover

# Limpar
git stash drop stash@{0}
git stash clear               # remove todos
```

## Log e Busca

```bash
# Log formatado
git log --oneline --graph --decorate --all
git log --since="2 weeks ago" --author="Henrique"

# Formato customizado
git log --pretty=format:"%h %ad | %s%d [%an]" --date=short

# Buscar no histórico
git log -S "função_removida"      # busca string no diff
git log --grep="fix:"              # busca na mensagem

# Blame — ver quem mudou cada linha
git blame arquivo.py
git blame -L 10,20 arquivo.py     # só linhas 10-20

# Bisect — encontrar qual commit introduziu um bug
git bisect start
git bisect bad                     # commit atual tem o bug
git bisect good v1.0.0             # essa versão estava ok
# Git vai fazer checkout em commits intermediários
# marque cada um com: git bisect good/bad
git bisect reset                   # termina
```

## Tags

```bash
# Criar
git tag v1.0.0
git tag -a v1.0.0 -m "Release 1.0.0"   # tag anotada (recomendada)

# Listar e deletar
git tag -l "v1.*"
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0   # deletar remota

# Push de tags
git push origin v1.0.0
git push origin --tags              # todas as tags
```

## Aliases Úteis

Adicione no `~/.gitconfig`:

```ini
[alias]
    st = status
    co = switch
    br = branch
    lg = log --oneline --graph --decorate --all
    last = log -1 HEAD --stat
    undo = reset --soft HEAD~1
    cleanup = "!git branch --merged | grep -v '\\*\\|main\\|master' | xargs git branch -d"
```

---

> **Dica importante:** antes de qualquer `reset --hard` ou `push --force`, verifique `git reflog`. Quase nada é realmente perdido no Git.
