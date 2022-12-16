import {
  PrismaClient,
  Prisma,
  OfferStatus
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
  const amountOfCompanies = 30;
  const amountOfUserStocks = 5;
  const amountOfBuyOffers = 50;
  const amountOfSellOffers = 100;
  const amountOfHistoricalStockPricingChanges = 50;
  const maxOfferCents = 100000;


  const users: Prisma.UserCreateManyInput[] = [];
  const companies: Prisma.CompanyCreateManyInput[] = [];
  const userStocks: Prisma.UserStockCreateManyInput[] = [];
  const buyOffers: Prisma.BuyOfferCreateManyInput[] = [];
  const sellOffers: Prisma.SellOfferCreateManyInput[] = [];
  const companyStockPriceHistories: Prisma.CompanyStockPriceHistoryCreateManyInput[] = [];

  //=========== User seeding =================
  for (let i = 1; i <= amountOfUsers; i++) {
    const salt = await genSalt();
    const password = faker.internet.password(8);
    const hashedPassword = await hash(password, salt);

    const userName = faker.name.firstName();
    const userSurname = faker.name.lastName();
    const userEmail = faker.internet.email(userName, userSurname);
    const userBalanceCents = faker.datatype.number({ min: 1000, max: 100000 });

    const user: Prisma.UserCreateInput = {
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

    const company: Prisma.CompanyUncheckedCreateInput = {
      name: companyName,
      description: companyDescription,
    };

    companies.push(company);
  }

  //=========== User stocks seeding =================
  for (let i = 1; i <= amountOfUsers; i++) {
    for (let j = 1; j <= amountOfUserStocks; j++) {
      const userId = faker.datatype.number({ min: 1, max: amountOfUsers });
      const userStockQuantity = faker.datatype.number({ min: 1, max: 50 });
      const userCompanyId = faker.datatype.number({
        min: 1,
        max: amountOfCompanies,
      });

      const userStock: Prisma.UserStockUncheckedCreateInput = {
        userId: userId,
        stockQuantity: userStockQuantity,
        companyId: userCompanyId,
      };

      userStocks.push(userStock);
    }
  }

  //=========== BuyOffers seeding =================
  for (let i = 1; i <= amountOfBuyOffers; i++) {
    const userId = faker.datatype.number({ min: 1, max: amountOfUsers });
    const companyStockId = faker.datatype.number({
      min: 1,
      max: amountOfCompanies,
    });
    const userUnitBuyPrice = faker.datatype.number({
      min: 1,
      max: maxOfferCents,
    });
    const userBuyQuantity = faker.datatype.number({ min: 1, max: 10 });
    const userBuyOfferCreatedAt = faker.date.recent();
    const userBuyOfferStatus :OfferStatus = "ACTIVE";

    const buyOffer: Prisma.BuyOfferUncheckedCreateInput = {
      userId: userId,
      companyId: companyStockId,
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
      max: amountOfUserStocks*amountOfUsers,
    });
    const userUnitSellPriceCents = faker.datatype.number({
      min: 1,
      max: maxOfferCents,
    });
    const userSellQuantity = faker.datatype.number({ min: 1, max: 10 });
    const userSellOfferCreatedAt = faker.date.recent();
    const userSellOfferStatus :OfferStatus = "ACTIVE";

    const sellOffer: Prisma.SellOfferUncheckedCreateInput = {
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
  for (let i = 1; i <= amountOfCompanies; i++) {
    for(let j = 1; j <= amountOfHistoricalStockPricingChanges; j++) {
      const companyStockPrice = faker.datatype.number(maxOfferCents);
      const companyStockPriceChangeDate = faker.date.recent(30);

      const companyStockPriceHistory: Prisma.CompanyStockPriceHistoryUncheckedCreateInput = {
        companyId: i,
        priceCents: companyStockPrice,
        changeDate: companyStockPriceChangeDate,
      };

      companyStockPriceHistories.push(companyStockPriceHistory);
    }
  }
  

  // Finally, DB push
  const addUsers = async () => await prisma.user.createMany({ data: users });

  const addCompanies = async () =>
    await prisma.company.createMany({ data: companies });

  const addUserStocks = async () =>
    await prisma.userStock.createMany({ data: userStocks });

  const addSellOffers = async () =>
    await prisma.sellOffer.createMany({ data: sellOffers });

  const addBuyOffers = async () =>
    await prisma.buyOffer.createMany({ data: buyOffers });

  const addCompanyStockPriceHistories = async () =>
    await prisma.companyStockPriceHistory.createMany({ data: companyStockPriceHistories });

  await addUsers();
  await addCompanies();
  await addUserStocks();
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
