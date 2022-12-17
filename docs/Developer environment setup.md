# What's needed
- [Database suppported by prisma](https://www.prisma.io/docs/reference/database-reference/supported-databases) (MySQL, Postgres, SQL Server etc.)
- [Node.js](https://nodejs.org/en/) with version > 16

# Steps to set up
1. Clone the repository:
```
git clone https://github.com/hyter99/AI_22-23_L1.git
```

2. Install dependencies:
```
cd AI_22-23-L1
npm ci
```

3. Duplicate file .env.example in the root, rename it to .env and fill in the blanks.
4. Add .prettierignore file (on front-end we use value: **).

4. Change provider field in file ./prisma/schema.prisma to the provider you've selected. 
Available providers:
```
postgresql, mysql, sqlite, sqlserver, mongodb, cockroachdb
```

4. Run command to setup Prisma:

```
npx prisma migrate deploy
```

5. Generate prisma client

```
npx prisma generate
```

Optionally:
- Reset prisma migration (when there was new migration and we want to reset data in DB)
```
npx prisma migrate reset
```
- Apply seed.ts file
```
npx prisma db seed
```

# Start development

Backend:
```
npm run start:dev
```

Frontend:
```
npm run start:vite
```
