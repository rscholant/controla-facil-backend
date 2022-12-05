import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ApiLoggerService } from '@shared/logger/logger.service';
import { TimeoutInterceptor } from '@shared/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Controla fácil')
    .setDescription(
      `Este projeto tem por objetivo centralizar as principais requisições que serão enviadas ao sistema controla fácil, que é um sistema focado em controle de estoque para prestadores de serviço.`,
    )
    .setVersion('1.0')
    .setContact(
      'Rafael P. Scholant',
      'https://www.linkedin.com/in/rafaelscholant',
      'rafael.scholant@gmail.com',
    )
    .addTag('App', 'Rotas de gerenciamento do serviço.')
    .addServer(
      `http://localhost:${process.env.PORT}`,
      'Ambiente de desenvolvimento',
    )
    .addServer('https://controla-facil.herokuapp.com', 'Ambiente de produção')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: `Politica de autenticação de usuários padrão do sistema`,
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger.json', JSON.stringify(document));
  if (process.env.ENVIRONMENT === 'development') {
    SwaggerModule.setup('docs', app, document);
  }
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({ errorHttpStatusCode: 422, forbidUnknownValues: true }),
  );
  app.useLogger(new ApiLoggerService());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
