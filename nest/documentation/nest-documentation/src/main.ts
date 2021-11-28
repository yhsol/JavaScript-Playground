import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AllBaseExceptionFilter,
  AllExceptionFilter,
} from './utils/exceptions/all-exception.filter';
import { HttpExceptionFilter } from './utils/exceptions/http-exception.filter';
import { logger } from './utils/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  // 전역범위 필터
  // 경고: useGlobalFilters() 메서드는 게이트웨이 또는 하이브리드 애플리케이션에 대한 필터를 설정하지 않습니다.
  // 전역필터는 기본필터를 확장할 수 있습니다.
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllBaseExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
