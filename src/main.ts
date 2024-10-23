import {
  ClassSerializerInterceptor,
  Logger,
  VersioningType,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { ApiModule } from "./apps/api/api.module";
import { ResponseInterceptor } from "./contexts/shared/infrastructure/response/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApiModule,
    new FastifyAdapter({
      logger: {
        level: "info", // Change this to 'debug' for more detailed logs
        transport: {
          target: "pino-pretty", // Use pino-pretty for pretty logging
          options: {
            colorize: true, // Colorize output for better visibility
            translateTime: "SYS:standard", // Display timestamps in standard format
            ignore: "pid,hostname", // Ignore pid and hostname in the output
          },
        },
      },
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT", "3000");

  app.setGlobalPrefix("api");
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: "excludeAll",
      excludeExtraneousValues: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle("Pulpoline")
    .setDescription("Backend for Pulpoline")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "To authenticate you must previously be logged",
      },
      "access-token",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(port, "0.0.0.0");

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

process.on("uncaughtException", handleError);
