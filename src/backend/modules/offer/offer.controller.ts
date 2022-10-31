import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { RequestWithUser } from '../../types';
import JwtAuthenticationGuard from '../auth/guards/jwt.guard';
import { CreateBuyOfferDto } from './dto/create-buy-offer.dto';
import { CreateSellOfferDto } from './dto/create-sell-offer.dto';
import { OfferService } from './offer.service';

@Controller()
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post('make-buy-offer')
  createBuyOffer(
    @Req() request: RequestWithUser,
    @Body() createBuyOfferDto: CreateBuyOfferDto,
  ) {
    return this.offerService.createBuyOffer(
      createBuyOfferDto,
      request.user.userId,
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('make-sell-offer')
  createSellOffer(
    @Req() request: RequestWithUser,
    @Body() createSellOfferDto: CreateSellOfferDto,
  ) {
    return this.offerService.createSellOffer(
      createSellOfferDto,
      request.user.userId,
    );
  }
}
