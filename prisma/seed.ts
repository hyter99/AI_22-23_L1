import {
  PrismaClient,
  User,
  Company,
  UserStock,
  Stock,
  BuyOffer,
  SellOffer,
  CompanyStockPriceHistory
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import { genSalt, hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Simple seeding - use only in development
  // seeded tables: User, Company, UserStock, Stock, BuyOffer, SellOffer, CompanyPriceHistory
  // -> npx prisma migrate rest

  // seed params
  const amountOfUsers = 20;
  const amountOfCompanies = 10;
  const amountOfUserStocks = 5;
  const amountOfStockOffers = 500;
  const amountOfBuyOffers = 50;
  const amountOfSellOffers = 100;
  const amountOfHistoricalStockPricingChanges = 50;
  const maxOfferCents = 100000;

  // BACK-END
  // number of implemented status codes
  const statusCountBuyOffer = 3;
  const statusCountSellOffer = 3;

  const users: User[] = [];
  const companies: Company[] = [];
  const userStocks: UserStock[] = [];
  const stockOffers: Stock[] = [];
  const buyOffers: BuyOffer[] = [];
  const sellOffers: SellOffer[] = [];
  const companyStockPriceHistories: CompanyStockPriceHistory[] = [];

  //=========== User seeding =================
  for (let i = 1; i <= amountOfUsers; i++) {
    const salt = await genSalt();
    const password = faker.internet.password(8);
    const hashedPassword = await hash(password, salt);

    const userName = faker.name.firstName();
    const userSurname = faker.name.lastName();
    const userEmail = faker.internet.email(userName, userSurname);
    const userBalanceCents = faker.datatype.number({ min: 1000, max: 100000 });

    const user: User = {
      userId: i,
      email: userEmail,
      password: hashedPassword,
      passwordSalt: salt,
      name: userName,
      surname: userSurname,
      balanceCents: userBalanceCents,
    };

    users.push(user);
  }

  //=========== Company seeding =================
  for (let i = 1; i <= amountOfCompanies; i++) {
    const companyName = faker.company.name();
    const companyDescription = faker.company.catchPhrase();

    const company: Company = {
      companyId: i,
      name: companyName,
      description: companyDescription,
    };

    companies.push(company);
  }

  //=========== User stocks seeding =================
  let userStockIdCounter = 1;

  for (let i = 1; i <= amountOfUsers; i++) {
    for (let j = 1; j <= amountOfUserStocks; j++) {
      const userId = faker.datatype.number({ min: 1, max: amountOfUsers });
      const userStockQuantity = faker.datatype.number({ min: 1, max: 50 });
      const userCompanyId = faker.datatype.number({
        min: 1,
        max: amountOfCompanies,
      });

      const userStock: UserStock = {
        userStockId: userStockIdCounter,
        userId: userId,
        stockQuantity: userStockQuantity,
        companyId: userCompanyId,
      };

      userStockIdCounter++;
      userStocks.push(userStock);
    }
  }

  //=========== Stock seeding =================
  for (let i = 1; i <= amountOfStockOffers; i++) {
    const userCompanyId = faker.datatype.number({
      min: 1,
      max: amountOfCompanies,
    });
    const userStockQuantity = faker.datatype.number({ min: 1, max: 10 });
    const userStockPriceCents = faker.datatype.number(maxOfferCents);
    const userId = faker.datatype.number({ min: 1, max: amountOfUsers });

    const stockOffer: Stock = {
      stockId: i,
      companyId: userCompanyId,
      quantity: userStockQuantity,
      priceCents: userStockPriceCents,
      userId: userId,
    };

    stockOffers.push(stockOffer);
  }

  //=========== BuyOffers seeding =================
  for (let i = 1; i <= amountOfBuyOffers; i++) {
    const userId = faker.datatype.number({ min: 1, max: amountOfUsers });
    const userStockId = faker.datatype.number({
      min: 1,
      max: amountOfStockOffers,
    });
    const userUnitBuyPrice = faker.datatype.number({
      min: 1,
      max: maxOfferCents,
    });
    const userBuyQuantity = faker.datatype.number({ min: 1, max: 10 });
    const userBuyOfferCreatedAt = faker.date.recent();
    const userBuyOfferStatus = faker.datatype.number(statusCountBuyOffer);

    const buyOffer: BuyOffer = {
      buyOfferId: i,
      userId: userId,
      stockId: userStockId,
      unitBuyPriceCents: userUnitBuyPrice,
      quantity: userBuyQuantity,
      created: userBuyOfferCreatedAt,
      status: userBuyOfferStatus,
    };

    buyOffers.push(buyOffer);
  }

  //=========== SellOffers seeding =================
  for (let i = 1; i <= amountOfSellOffers; i++) {
    const userId = faker.datatype.number({ min: 1, max: amountOfUsers });
    const userStockId = faker.datatype.number({
      min: 1,
      max: userStockIdCounter,
    });
    const userUnitSellPriceCents = faker.datatype.number({
      min: 1,
      max: maxOfferCents,
    });
    const userSellQuantity = faker.datatype.number({ min: 1, max: 10 });
    const userSellOfferCreatedAt = faker.date.recent();
    const userSellOfferStatus = faker.datatype.number(statusCountSellOffer);

    const sellOffer: SellOffer = {
      sellOfferId: i,
      userId: userId,
      userStockId: userStockId,
      unitSellPriceCents: userUnitSellPriceCents,
      quantity: userSellQuantity,
      created: userSellOfferCreatedAt,
      status: userSellOfferStatus,
    };

    sellOffers.push(sellOffer);
  }

  //=========== Company Stock Price history seeding =================
  let companyStockPriceHistoryCounter = 1;

  for (let i = 1; i <= amountOfCompanies; i++) {
    for(let j = 1; j <= amountOfHistoricalStockPricingChanges; j++) {
      const companyStockPrice = faker.datatype.number(maxOfferCents);
      const companyStockPriceChangeDate = faker.date.recent(30);

      const companyStockPriceHistory: CompanyStockPriceHistory = {
        companyStockPriceHistoryId: companyStockPriceHistoryCounter,
        companyId: i,
        priceCents: companyStockPrice,
        changeDate: companyStockPriceChangeDate,
      };

      companyStockPriceHistoryCounter++;
      companyStockPriceHistories.push(companyStockPriceHistory);
    }
  }
  

  // Finally, DB push
  const addUsers = async () => await prisma.user.createMany({ data: users });

  const addCompanies = async () =>
    await prisma.company.createMany({ data: companies });

  const addUserStocks = async () =>
    await prisma.userStock.createMany({ data: userStocks });

  const addStockOffers = async () =>
    await prisma.stock.createMany({ data: stockOffers });

  const addSellOffers = async () =>
    await prisma.sellOffer.createMany({ data: sellOffers });

  const addBuyOffers = async () =>
    await prisma.buyOffer.createMany({ data: buyOffers });

  const addCompanyStockPriceHistories = async () =>
    await prisma.companyStockPriceHistory.createMany({ data: companyStockPriceHistories });

  await addUsers();
  await addCompanies();
  await addUserStocks();
  await addStockOffers();
  await addBuyOffers();
  await addSellOffers();
  await addCompanyStockPriceHistories();

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
