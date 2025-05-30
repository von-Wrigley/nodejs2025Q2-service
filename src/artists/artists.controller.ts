import {
  Controller,
  Get,
  Post,
  Param,
  HttpStatus,
  HttpCode,
  Body,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/createArtist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.artistsService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistsService.create(dto);
  }
}
