import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getTrack(@Param('id') id: string) {
    return this.tracksService.getTrack(id);
  }
  @Post()
  create(@Body dto: )
}
