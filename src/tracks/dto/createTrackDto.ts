import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class createTrackDto {
  @IsString()
  name: string;
  @IsOptional()
  artistId: string | null; // refers to Artist
  @IsOptional()
  albumId: string | null; // refers to Album
  @IsNumber()
  @IsInt({ message: 'Track duration should be an integer' })
  @Min(0, { message: 'Track duration should be positive' })
  duration: number; // integer number
}
