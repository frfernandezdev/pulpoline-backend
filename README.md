<h1 align="center">Pulpoline Backend 🚀✨</h1>

<p align="center">
  <a href="https://github.com/frfernandezdev/bff-poke-vault/actions/workflows/node.yml?branch=main"><img src="https://github.com/frfernandezdev/bff-poke-vault/actions/workflows/node.yml/badge.svg?branch=main" alt="nodejs"/></a>
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html"><img src="https://img.shields.io/badge/node-20.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://docs.nestjs.com/v10/"><img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm"/></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/Web_Framework-Fastify_⚡-black.svg" alt="fastify"/></a>
  <a href="https://swc.rs/"><img src="https://img.shields.io/badge/Compiler-SWC_-orange.svg" alt="swc"/></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Test-Vitest_-yellow.svg" alt="swc"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Dockerized 🐳_-blue.svg" alt="docker"/></a>
</p>
<p align="center">
  <a href="https://inclined-ann-marie-mindstartups-7f8862fc.koyeb.app/api/docs" target="_blank"><strong>DEMO Pulpoline Backend</strong></a>
</p>

## Technologies Used
- [Node.js](https://nodejs.org/docs/latest-v20.x/api/index.html): JavaScript runtime environment for backend.
- [NestJS](https://docs.nestjs.com/v10/): Modular framework for building scalable and maintainable applications.
- [Fastify](https://fastify.dev/): A fast and low-overhead web framework for Node.js.
- [RxJS](https://rxjs.dev/): Library for reactive programming and handling asynchronous streams.
- [TypeScript](https://www.typescriptlang.org/): Adds static typing to enhance code safety and maintainability.
- [Prisma](https://www.prisma.io/): A modern ORM for Node.js and TypeScript.
- [FastifyAdapter](https://docs.nestjs.com/techniques/http-server#fastify-adapter): An adapter to use Fastify with NestJS.

## Prerequisites

Before starting this epic adventure, make sure you have these technological superpowers at hand:

- [Node.js](https://nodejs.org/en/download/) 🌐: For all your JavaScript runtime needs.
- [Docker](https://docs.docker.com/get-docker/) 🐳: The container of your dreams.
- [Git](https://git-scm.com/downloads) 🧑‍💻: To keep everything under control with style.

## 🧑‍💻 Developing

First, we will need to create our .env file, we can create a copy from the example one:

```bash
cp .env.example .env
```

The project is fully dockerized 🐳, if we want to start the app in **development mode**, we just need to run:

```bash
docker-compose up -d development
```

This development mode will work with **hot-reload** and expose a **debug port**, port `9229`, so later we can connect to it from our editor.

Now, you should be able to start debugging configuring using your IDE. For example, if you are using vscode, you can create a `.vscode/launch.json` file with the following configuration:

```json
{
  "version": "0.1.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to docker",
      "restart": true,
      "port": 9229,
      "remoteRoot": "/app"
    }
  ]
}
```

Also, if you want to run the **production mode**, you can run:

```bash
docker-compose up -d production
```

This service is providing just a health endpoint which you can call to verify the service is working as expected:

```bash
curl --request GET \
  --url http://localhost:3000/health
```

If you want to stop developing, you can stop the service running:

```bash
docker-compose down
```

## ⚙️ Building

```bash
npm run build
```

## ✅ Testing

The service provide different scripts for running the tests, to run all of them you can run:

```bash
npm run test
```

If you are interested just in the unit tests, you can run:

```bash
npm run test:unit
```

Or if you want e2e tests, you can execute:

```bash
npm run test:e2e
```

## 💅 Linting

To run the linter you can execute:

```bash
npm run lint
```

And for trying to fix lint issues automatically, you can run:

```bash
npm run lint:fix
```

## Deploy to Production

This project is automatically deployed to production using Koyeb. Every time a change is pushed to the main branch, Koyeb will build and deploy the latest version of the BFF to production. You can access the deployed application via the [Koyeb-generated URL](https://bottom-timmie-mindstartups-df099d9f.koyeb.app/).
