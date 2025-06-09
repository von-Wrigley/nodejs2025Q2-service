import { IsNumber, IsString } from 'class-validator';

export class creteAlbumDto {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  artistId: string | null; // refers to Artist
}
