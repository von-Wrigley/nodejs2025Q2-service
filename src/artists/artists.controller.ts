import {
  Controller,
  Get,
  Post,
  Param,
  HttpStatus,
  HttpCode,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('artist')
@UseGuards(JwtAuthGuard)
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.artistsService.getAll();
  }
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.artistsService.findById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistsService.create(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  changeById(@Param('id') id: string, @Body() dto: CreateArtistDto) {
    return this.artistsService.changeById(id, dto);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.artistsService.delete(id);
  }
}
