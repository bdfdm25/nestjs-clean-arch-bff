# BFF - com NestJS (Clean Architecture) :computer:

## Introdução

Este repositório conta com a estrutura base de um BFF (Backend for frontend) desenvolvido utilizando os conceitos da Clean Architecture.

Conforme descrito na documentação, utilizaremos neste guia o framework **NestJS**.

Para maiores detalhes, você pode consultar a [documentação da própria ferramenta](https://nestjs.com/) :books:

#### Requisitos
Para a correta instalação e execução do projeto atente-se para as seguintes versões:

```bash
node >= v16.17.0
npm >= 8.15.0
pnpm >= 7.18.0
```

## Instalação

Para a instalação do projeto você pode utilizar tanto o **[pnpm](<https://pnpm.io/>)** quanto o **[npm](https://www.npmjs.com/)**. Recomendamos a utilização do primeiro, tendo em vista por ser mais leve e eficiente que o já conhecido **npm**. Fique a vontade para decidir aquele que melhor se encaixe em seu contexto.

```bash
# NPM
$ npm install

# PNPM
$ pnpm install
```

## Executando e acessando o BFF
Antes de iniciar a aplicação você precisa criar um arquivo na raiz do projeto contento as variáveis de ambiente necessárias para sua execução.

Este repositório já conta com um arquivo de exemplo - **.env.sample** - basta apenas remover a extensao **.sample** do nome do arquivo.

Realizada a configuração do arquivo **.env**, podemos inciar a aplicação de acordo com os comandos abaixo:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

Após iniciar a aplicação, você pode acessar os endpoints via **swagger** através do endereço: <http://localhost:3000/docs>.

## Testes

```bash
# unit tests
$ npm run test

# mutation tests
$ npm run test:mut

# test coverage
$ npm run test:cov
```

