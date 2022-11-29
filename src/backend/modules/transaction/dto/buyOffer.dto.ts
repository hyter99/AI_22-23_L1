export interface User {
  balanceCents: number
}

export interface buyOffer {
  buyOfferId: number,
  companyId: number,
  userId: number,
  quantity: number,
  User: User,
  unitBuyPriceCents: number
}

