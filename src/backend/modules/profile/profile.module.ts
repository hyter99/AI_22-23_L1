import { Module } from "@nestjs/common";
import { ProfileConstroller } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
  controllers: [ProfileConstroller],
  providers: [ProfileService]
})
export class ProfileModule{}