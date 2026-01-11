# Projects Portfolio

A concise tour of the active Node/Express projects in this workspace. The Ecommerce folder is intentionally excluded until it is ready for review.

## How to Explore Quickly

- Gateway entry point: [gateway](gateway)
- Launch everything (gateway + four apps) from the gateway folder:

```bash
cd gateway
npm install
npm run start-all
```

- Then open `http://localhost:8000` to use the hub UI. Each app also runs directly on its own port through the gateway proxies.

## Environment Setup (required)

- Copy each `env_example.md` to `.env` before running. The apps depend on the database names/credentials defined there; without matching DBs the servers will fail to start.
- Project env templates:
  - [Animal_Database_Project_2024/env_example.md](Animal_Database_Project_2024/env_example.md)
  - [GoldMed_Self_Built/env_example.md](GoldMed_Self_Built/env_example.md)
  - [StockMarket_Self_Built/env_example.md](StockMarket_Self_Built/env_example.md)
  - [TheTheoShop_Self_Built/env_example.md](TheTheoShop_Self_Built/env_example.md)

Tip: Create the MySQL databases with the exact names specified in each env file before `npm run dev`/`npm start`.

Example MySQL setup (matching the env_example.md files):

```sql
CREATE DATABASE adoptiondb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;      -- Animal_Database_Project_2024
CREATE DATABASE goldmed CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;         -- GoldMed_Self_Built
CREATE DATABASE stockmarketdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;   -- StockMarket_Self_Built
CREATE DATABASE theTheoshopdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;   -- TheTheoShop_Self_Built
```

## How to Review (Quick Path)

- Start everything: `cd gateway && npm install && npm run start-all`
- Open the hub: http://localhost:8000 and confirm the status dots show Online.
- Launch via hub buttons and spot-check key flows:
  - Animal DB: view animals, try a filter.
  - GoldMed: browse courses/services.
  - StockMarket: load dashboard/portfolio view.
  - TheTheoShop: browse products/media.
- Stop with Ctrl+C in the terminal when done.

## Projects (Ready for Review)

### Gateway

- Purpose: Reverse-proxy front door and hub UI for the projects below.
- Stack: Express, express-http-proxy, EJS.
- How to run: `npm run start-all` (from gateway) starts gateway plus all four apps.
- Directory: [gateway](gateway)

### Animal Database Project 2024

- Purpose: Animal adoption management (auth, CRUD, filtering, adoptions, auto-seeding).
- Stack: Express, MySQL, Sequelize, EJS, Bootstrap, Passport local auth.
- How to run: `npm run dev` from [Animal_Database_Project_2024](Animal_Database_Project_2024).

### GoldMed Self-Built

- Purpose: Course and services platform with auth and role-based access.
- Stack: Express, MySQL, Sequelize, EJS, Bootstrap.
- How to run: `npm start` from [GoldMed_Self_Built](GoldMed_Self_Built).

### StockMarket Self-Built

- Purpose: Stock simulator with portfolio tracking, buy/sell, and leaderboard.
- Stack: Express, MySQL, Sequelize, EJS, JavaScript.
- How to run: `npm run dev` from [StockMarket_Self_Built](StockMarket_Self_Built).

### TheTheoShop Self-Built

- Purpose: Product showcase with media-rich catalog.
- Stack: Express, EJS, Bootstrap.
- How to run: `npm run dev` from [TheTheoShop_Self_Built](TheTheoShop_Self_Built).

## Shared Patterns and Skills

- Node/Express backends with MVC structure and service layers.
- EJS templating with Bootstrap-based responsive UIs.
- MySQL + Sequelize models; some projects mix raw SQL where beneficial.
- Auth via sessions/Passport (where applicable); role-based access in GoldMed.
- Environment management with `.env` (see each project’s `env_example.md` where provided).

## Notes

- Ecommerce_ExamProject is under active development and intentionally omitted here.
- Ports (through gateway proxies): animals 3001, goldmed 3004, stocks 3005, shop 3006; gateway on 8000.
- The Stock market app in currently just an interface
- There are currently some issues with login functions on all apps
- Not all functions are in place

**Last Updated**: January 11, 2026

## **Author**: BenWood79
