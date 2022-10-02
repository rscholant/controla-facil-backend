import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DefaultPaginatedQueryRequest {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    default: 1,
    description: 'Numero da pagina a ser visualizada',
  })
  page?: number;
}
