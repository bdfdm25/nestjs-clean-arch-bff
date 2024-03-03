import { MulticontasDTO } from 'src/core/domain/dtos/multicontas/multicontas.dto';
import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeaders, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { MulticontasService } from './multicontas.service';

@ApiBearerAuth('Authorization')
@ApiTags('API Multicontas')
@ApiHeaders([
  {
    name: 'cooperativa',
    description: 'cooperativa',
  },
])
@Controller('multicontas')
export class MulticontasController {
  constructor(private readonly multicontasService: MulticontasService) {}

  @Get()
  @ApiQuery({
    name: 'cpfCnpj',
    description: 'CPF ou CNPJ',
  })
  buscaMulticontas(
    @Headers() headers: any,
    @Query('cpfCnpj') documento: string,
  ): Observable<MulticontasDTO[]> {
    return this.multicontasService.buscaMulticontas(headers, documento);
  }
}
