# Desafio Smarkio - IBM Watson Text to Speech

## Instruções para a instalação e execução

### Back-end

Clone este repositório:

```
git clone https://github.com/nicolas-oliveira/desafio-smarkio-watson
```

Abra o terminal e acesse o back-end: `cd backend`.

Configure sua API privada [dentro da IBM](https://www.ibm.com/cloud/watson-text-to-speech) e coloque preenchendo o `.env-exemple` que está na raiz do projeto back-end:

```yml
APP_URL=http://locahost:3333

NODE_ENV=DEVELOPMENT

# Auth IBM Watson

API_URL_WATSON=
API_KEY_WATSON=


# MYSQL

DB_HOST=127.0.0.1
DB_USER=user
DB_PASS=root
DB_ROOT_PASS=root
DB_NAME=db_watson_text_to_speech
DB_PORT=3306
DB_DIALECT=mysql
```

Coloque a mesma configuração dentro do arquivo `.env-exemple` e renomeie o arquivo para `.env`.

Primeiro você deve executar o seu back-end através do docker-compose: `docker-compose up --build -d `

Instale as dependências: `yarn install`

Execute o backend: `yarn start`

### Front-end

Abra outra aba ou terminal e acesse seu frontend: `cd front-end`

Instale as dependências: `yarn install`
Execute o frontend: `yarn start`

## Possíveis problemas:

Caso haja algum erro ou warning impendindo a execução tanto do front-end quando do back-end tente executar em seu terminal:

```
export NODE_ENV=development
```

Para mais dúvidas podem me contatar: nicolas.oliveira.ug@gmail.com. :)
