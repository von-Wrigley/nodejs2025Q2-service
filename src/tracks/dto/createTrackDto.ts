import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class createTrackDto {
  @IsString()
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  @IsNumber()
  @IsInt({ message: 'Track duration should be an integer' })
  @Min(0, { message: 'Track duration should be positive' })
  duration: number; // integer number
}
