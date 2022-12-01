import {
  Controller,
  Get,
  Req,
  UseGuards,
  Query,
  Patch,
  Body,
  Post,
} from '@nestjs/common';
import { RequestWithUser } from '../../types';
import JwtAuthenticationGuard from '../auth/guards/jwt.guard';
import { AddWalletDto } from './dto/addWallet.dto';
import { GetUserBuyOfferQuery } from './dto/getUserBuyOffer.query';
import { GetUserSellOfferQuery } from './dto/getUserSellOffer.query';
import { GetUserStockQuery } from './dto/getUserStock.query';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ProfileService } from './profile.service';

@UseGuards(JwtAuthenticationGuard)
@Controller('profile')
export class ProfileConstroller {
  constructor(private readonly profileService: ProfileService) { }

  @Get('/me')
  getUserProfile(@Req() request: RequestWithUser) {
    return this.profileService.getUserProfile(request.user.userId);
  }

  @Get('/stock')
  getUserStock(
    @Req() request: RequestWithUser,
    @Query() getUserStockQuery: GetUserStockQuery,
  ) {
    return this.profileService.getUserStock(
      request.user.userId,
      getUserStockQuery,
    );
  }

  @Get('/wallet')
  getUserBalance(@Req() request: RequestWithUser) {
    return this.profileService.getUserWaller(request.user.userId);
  }

  @Get('/sell-offers')
  getUserSellOffers(
    @Req() request: RequestWithUser,
    @Query() getUserSellOfferQuery: GetUserSellOfferQuery,
  ) {
    return this.profileService.getUserSellOffers(
      request.user.userId,
      getUserSellOfferQuery,
    );
  }

  @Get('/buy-offers')
  getUserBuyOffers(
    @Req() request: RequestWithUser,
    @Query() getUserBuyOfferQuery: GetUserBuyOfferQuery,
  ) {
    return this.profileService.getUserBuyOffers(
      request.user.userId,
      getUserBuyOfferQuery,
    );
  }

  @Patch('')
  updateUserAccount(
    @Req() request: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.profileService.updateUserAccount(
      request.user.userId,
      updateUserDto,
    );
  }

  @Post('add-wallet')
  addWallet(
    @Req() request: RequestWithUser,
    @Body() addWalletDto: AddWalletDto,
  ) {
    return this.profileService.addWallet(request.user.userId, addWalletDto);
  }
}
