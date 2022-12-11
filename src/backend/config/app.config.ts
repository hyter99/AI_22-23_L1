import {IsInt, IsNotEmpty, IsString, IsUrl, Max, Min, validateSync, ValidationError} from "class-validator"
import {plainToInstance} from "class-transformer";

export class AppConfig {
  @IsUrl({
    protocols: ["http", "https"],
    requireProtocol: true,
    requireHost: true,
    require_tld: false,
  })
  VITE_BACKEND_URL?: string;
  
  @IsString()
  @IsNotEmpty()
  DATABASE_CONNECTOR?: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_USER?: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD?: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  DATABASE_PORT?: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST?: string;
  
  @IsString()
  @IsNotEmpty()
  DATABASE_URL?: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET?: string;
}

class ViolatedConstraint {
  [type: string]: string;
}

export class ConfigValidationError {
  readonly message: string;
  readonly constraints?: ViolatedConstraint[];

  constructor(violatedConstraints: ViolatedConstraint[]) {
    this.message = "Config validation failed";
    this.constraints = violatedConstraints;
  }
}

export const validateConfig = (config: Record<string, any>) => {
    const parsedConfig = plainToInstance(AppConfig, config, {enableImplicitConversion: true});
    const errors = validateSync(parsedConfig);
    if(errors.length !== 0) {
      const violatedConstraints = errors.map((e: ValidationError) => e.constraints!);
      throw new ConfigValidationError(violatedConstraints)
    }
    return parsedConfig;
};
