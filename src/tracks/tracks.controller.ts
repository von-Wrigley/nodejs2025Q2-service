import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { createTrackDto } from './dto/createTrackDto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('track')
@UseGuards(JwtAuthGuard)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    return this.tracksService.getAll();
  }

  // @Get(':id')
  // getTrack(@Param('id') id: string) {
  //   return this.tracksService.getTrack(id);
  // }
  @Get(':id')
  async getTrack(@Param('id') id: string) {
    return this.tracksService.getTrack(id);
  }

  @Post()
  async create(@Body() dto: createTrackDto) {
    return this.tracksService.create(dto);
  }

  // @HttpCode(HttpStatus.OK)
  // @Put(':id')
  // changeById(@Param('id') id: string, @Body() dto: createTrackDto) {
  //   return this.tracksService.changeById(id, dto);
  // }

  @Put(':id')
  async changeById(@Param('id') id: string, @Body() dto: createTrackDto) {
    return this.tracksService.changeById(id, dto);
  }

  // @HttpCode(204)
  // @Delete(':id')
  // deleteById(@Param('id') id: string) {
  //   return this.tracksService.delete(id);
  // }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tracksService.delete(id);
  }
}
