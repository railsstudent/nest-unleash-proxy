import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get featureToggleUrl(): string {
    return this.configService.get<string>('FEATURE_TOGGLE_URL');
  }

  get featureToggleAppName(): string {
    return this.configService.get<string>('FEATURE_TOGGLE_APP_NAME');
  }

  get featureToggleApiToken(): string {
    return this.configService.get<string>('FEATURE_TOGGLE_API_TOKEN');
  }

  get appEnv(): string {
    return this.configService.get<string>('APP_ENV');
  }

  get featureToggleClientKeys(): string {
    return this.configService.get<string>('FEATURE_TOGGLE_CLIENT_KEYS');
  }

  get portNumber(): number {
    return this.configService.get<number>('PORT');
  }
}
