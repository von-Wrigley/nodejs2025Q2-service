import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoggingService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: LoggingService) {}
  @Public()
  @Post('/signup')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  log(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.log(createAuthDto);
  }
}
