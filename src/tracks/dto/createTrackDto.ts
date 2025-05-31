import { IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  id: string; // uuid v4
  @IsString()
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
