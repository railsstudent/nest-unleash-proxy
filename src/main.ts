import { NestFactory } from '@nestjs/core'
import * as express from 'express'
import * as compression from 'compression'
import * as morgan from 'morgan'
import * as helmet from 'helmet'
import unleashProxy = require('@unleash/proxy')
import * as cors from 'cors'
import { Logger } from '@nestjs/common'
import { ApiConfigService } from './core'
import { AppModule } from './app.module'

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule)
  const configService = nestApp.get(ApiConfigService)
  const logger = new Logger('Main')

  const app = initProxy(configService)
  applyMiddleware(app)
  await startProxy(app, configService, logger)
}
bootstrap()

async function startProxy(app: express.Application, configService: ApiConfigService, logger: Logger) {
  await app.listen(configService.portNumber, () => {
    logger.log(`Unleash Proxy listening on http://localhost:${configService.portNumber}/proxy`)
  })
}

function applyMiddleware(app: express.Application) {
  app.use(cors())
  app.use(helmet())
  app.use(morgan('combined'))
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ limit: '10mb', extended: true }))
  app.use(compression())
}

function initProxy(configService: ApiConfigService) {
  return unleashProxy.createApp({
    unleashUrl: configService.featureToggleUrl,
    unleashApiToken: configService.featureToggleApiToken,
    clientKeys: [configService.featureToggleClientKeys],
    environment: configService.featureToggleEnv,
  })
}
