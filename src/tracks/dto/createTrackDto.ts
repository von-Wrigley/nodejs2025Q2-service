import { IsNumber, IsString } from 'class-validator';

export class createTrackDto {
  @IsString()
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  @IsNumber()
  duration: number; // integer number
}
