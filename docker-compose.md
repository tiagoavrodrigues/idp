# Docker Compose – Gestão de Ambientes

## Objetivo
Utilizar **Docker Compose** para executar múltiplos contentores como um único serviço.  
Neste exercício será criada uma pequena stack com:

- **Frontend Angular** (imagem criada anteriormente)
- **Mock API** com `json-server`
- Configuração via **variáveis de ambiente**

---

# Parte Teórica

## O que é Docker Compose
Docker Compose permite **orquestrar vários contentores** através de um único ficheiro `docker-compose.yml`.

Cada aplicação é descrita como um **serviço**, e todos os serviços podem ser iniciados juntos.

Exemplo de stack:

```

Angular App  → consome →  Mock API

````

---

## Estrutura do `docker-compose.yml`

Elementos principais:

- **services** → define os contentores
- **ports** → mapeamento de portas host ↔ container
- **volumes** → persistência de dados
- **networks** → comunicação entre serviços
- **depends_on** → ordem de arranque
- **environment / .env** → variáveis de configuração

---

# Exemplo de docker-compose.yml

```yaml
# docker-compose.yml
# Este ficheiro define todos os serviços (contentores) da aplicação.

services:

  # Serviço responsável pelo frontend Angular
  __:

    # Construir imagem a partir do Dockerfile do projeto
    build:
      context: .              # pasta onde está o Dockerfile
      dockerfile: Dockerfile  # Dockerfile usado para criar a imagem

    # Nome do container (opcional, mas útil para identificar)
    container_name: _________

    # Mapeamento de portas
    # [PORTA_HOST]:[PORTA_CONTAINER]
    # Dica: nginx dentro do container usa normalmente a porta 80
    ports:
      - "${APP_PORT}:__"

    # Garantir que a API arranca antes da aplicação
    depends_on:
      - ___

    # Variáveis de ambiente para a aplicação
    # Estas variáveis vêm do ficheiro .env
    environment:
      API_URL: ${________}

  # Serviço responsável pela API mock
  __:

    # Imagem base que contém Node.js
    image: ___________

    # Nome do container
    container_name: _________

    # Diretório de trabalho dentro do container
    working_dir: /____

    # Estas variáveis vêm do ficheiro .env
    environment:
      JSON_SERVER_WATCH: ${JSON_SERVER_WATCH}

    # Comando executado quando o container inicia
    # Aqui queremos instalar json-server e arrancar uma API mock
    command: >
      sh -c "npm install -g __________ &&
             __________ --host 0.0.0.0 --port ____ ______"

    # Mapeamento de portas da API
    ports:
      - "${API_PORT}:____"

    # Volume para montar o ficheiro db.json dentro do container
    volumes:
      - ./________:/____
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://api:3000"]
      interval: 10s
      timeout: 5s
      retries: 5
````

---

## Ficheiro `.env`

```env
APP_PORT=4200
API_PORT=3001
API_URL=http://localhost:3001
```

---

# Estrutura do Projeto

```
projeto/
│
├── Dockerfile
├── docker-compose.yml
├── .env
│
└── mock-api/
    └── db.json
```

---

## Exemplo `db.json`

```json
{
  "users": [
    { "id": 1, "name": "Libertino" },
    { "id": 2, "name": "Evaristo" }
  ]
}
```

---

# Parte Prática

## Atividade 1 – Criar docker-compose.yml

Criar um ficheiro `docker-compose.yml` com dois serviços:

* **app** → usa o Dockerfile do projeto Angular
* **api** → usa `json-server` para simular uma API REST

---

## Atividade 2 – Configurar variáveis de ambiente

Criar um ficheiro `.env` com:

```
APP_PORT=4200
API_PORT=3001
API_URL=http://localhost:3001
```

---

## Atividade 3 – Iniciar os serviços

Construir e iniciar a stack:

```bash
docker compose up --build
```

Verificar contentores ativos:

```bash
docker compose ps
```

Aceder:

```
Frontend → http://localhost:4200
API → http://localhost:3001/users
```

---

## Atividade 4 – Explorar logs

Logs de todos os serviços:

```bash
docker compose logs
```

Logs de um serviço específico:

```bash
docker compose logs app
docker compose logs api
```

---

## Parar os serviços

```bash
docker compose down
```

---


# Boas Práticas

* Um **serviço por responsabilidade**
* Utilizar **variáveis de ambiente**
* Usar **restart policy** (`restart: unless-stopped`)
* Usar **healthchecks** quando necessário
* Versionar o `docker-compose.yml` no repositório

---

# Evidência a Entregar

* `docker-compose.yml` no repositório
* Screenshot de:

```
docker compose ps
```

mostrando **os dois contentores ativos**

