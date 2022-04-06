# Deta

This repo contains example apps you can build with Deta products.

## Getting Started

### Clone repo

```bash
git clone https://github.com/donaldp/deta-examples.git
```

### Install dependencies

```bash
cd deta-examples
npm i
```

### Set Deta Project Key

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

When done, head over to [Deta](https://web.deta.sh/) > Settings and create a new Project Key.

After creating the key, add it to the `.env` file:

```emv
DETA_KEY=<PROJECT-KEY>
```

## Deta Session Store

To test the Deta Session Store, run the following command:

```bash
npm run start
```

> The source code can be found under the `src/Sessions` directory.

## Deta Factory (Seeder)

To test the Deta Seeder, run the following command:

```bash
npm run db:seed
```

When done, go to your Deta dashboard, you should have a `users` and a `contacts` Base.

> The source code can be found under the `src/Factories` directory.
