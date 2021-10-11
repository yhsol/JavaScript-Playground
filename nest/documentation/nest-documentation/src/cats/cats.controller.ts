import {
  Controller,
  Get,
  Header,
  HostParam,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';

@Controller('cats')
// @Controller({ host: 'admin.example.com' }) // 들어오는 요청의 HTTP 호스트가 특정값과 일치하도록 `host` 옵션 사용 가능
export class CatsController {
  //  host 옵션은 토큰을 사용하여 호스트 이름의 해당 위치에서 동적값을 캡처할 수 있음.
  //   @Get()
  //   getInfo(@HostParam('account') account: string) {
  //     return account;
  //   }

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  @Redirect('https://nestjs.com', 301)
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  // @Get('cat:id') // 이렇게도 되나
  findOne(
    @Param() params,
    // @Param('id') id: string, // 이렇게 써도 됨.
  ): string {
    console.log('params.id: ', params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version == '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}

// `@Get()`
// 아무것도 설정하지 않으면 `/cats` 에 매핑되어 응답함
// `@Get('all-cats')` 와 같이 path 를 설정할 경우 `/cats/all-cats` 에 매핑되어 응답함

// `@Req()`
// 핸들러는 종종 클라이언트 요청 세부정보에 액세스해야 함. 그럴 때 Request object 에 액세스 제공.
// `@Req()` 데코레이터를 추가하여 Nest에 주입하도록 지시하여 요쳥객체에 액세스 할 수 있음.

// GraphQL 을 사용할 경우 Controller 는 Resolver 로, `@Get()`, `@Req()` 는 `@Query`, `@Mutation` 으로 사용가능 한 듯(?)

// @Redirect('https://nestjs.com', 301)
// `url` 과 `statusCode` 라는 두개의 인수를 취하며 둘다 선택사항. 생략된 경우 `statusCode` 의 기본값은 `302`(`Found`).
