import { CentraisEstadosDTO } from '@dtos/lojas/centrais-estados.dto';
import { CooperativaDTO } from '@dtos/cooperativa/cooperativas.dto';
import {
  EnumSituacaoRepresentante,
  EnumTipoRepresentante,
  RepresentantesDTO,
  SituacaoRepresentante,
  TipoRepresentante,
} from '@dtos/cooperativa/representantes.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CooperativasService } from './cooperativas.service';

@ApiTags('Cooperativa-US')
@Controller('cooperativa-us')
export class CooperativasController {
  constructor(private readonly cooperativaUsService: CooperativasService) {}
  @Get()
  healthCheck(): string {
    return this.cooperativaUsService.healthCheck();
  }
  @Get('/centrais/estados')
  buscaCentraisEstados(): Observable<CentraisEstadosDTO[]> {
    return this.cooperativaUsService.buscaCentraisEstados();
  }

  @Get('/:cooperativa/representantes')
  @ApiParam({
    name: 'cooperativa',
    description: 'Número da cooperativa',
    required: true,
  })
  @ApiQuery({
    name: 'stRepr',
    description: 'Situação do representante',
    type: 'string',
    required: true,
    enum: EnumSituacaoRepresentante,
  })
  @ApiQuery({
    name: 'tpRepr',
    description: 'Tipo do representante',
    type: 'string',
    required: true,
    enum: EnumTipoRepresentante,
  })
  buscaRepresentantes(
    @Param('cooperativa') cooperativa: number,
    @Query('stRepr') stRepr: SituacaoRepresentante,
    @Query('tpRepr') tpRepr: TipoRepresentante,
  ): Observable<RepresentantesDTO[]> {
    return this.cooperativaUsService.buscaRepresentantes(
      cooperativa,
      stRepr,
      tpRepr,
    );
  }
  @Get('/cooperativas')
  buscaCooperativasAtivas(): Observable<CooperativaDTO[]> {
    return this.cooperativaUsService.buscaCooperativasAtivas();
  }
}
