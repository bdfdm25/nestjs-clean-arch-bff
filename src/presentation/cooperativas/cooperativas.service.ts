import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CentraisEstadosUseCase } from '@usecases/cooperativa-us/centrais-estados.usecase';
import { CooperativasAtivasUseCase } from '@usecases/cooperativa-us/cooperativas-ativas.usecase';
import { RepresentantesUseCase } from '@usecases/cooperativa-us/representantes.usecase';
import { Observable } from 'rxjs';
import { CentraisEstadosDTO } from '@dtos/lojas/centrais-estados.dto';
import { CooperativaDTO } from '@dtos/cooperativa/cooperativas.dto';
import {
  RepresentantesDTO,
  SituacaoRepresentante,
  TipoRepresentante,
} from '@dtos/cooperativa/representantes.dto';

@Injectable()
export class CooperativasService {
  private URL: string;
  private BASE_URL: string;
  private BASE_HOST = 'app.hosts.cooperativa';

  constructor(
    private readonly configService: ConfigService,
    private readonly centraisEstadosUseCase: CentraisEstadosUseCase,
    private readonly cooperativasUseCase: CooperativasAtivasUseCase,
    private readonly representantesUseCase: RepresentantesUseCase,
  ) {
    this.BASE_URL = this.configService.get<string>(this.BASE_HOST);
  }

  healthCheck(): any {
    return {
      status: 'UP',
      name: this.configService.get<string>('app.name'),
      service: this.BASE_URL,
    };
  }

  buscaCentraisEstados(): Observable<CentraisEstadosDTO[]> {
    this.URL = `${this.BASE_URL}/cooperativa/centrais-estados`;
    return this.centraisEstadosUseCase.execute(this.URL);
  }

  buscaRepresentantes(
    cooperativa: number,
    stRepr: SituacaoRepresentante,
    tpRepr: TipoRepresentante,
  ): Observable<RepresentantesDTO[]> {
    this.URL = `${this.BASE_URL}/cooperativa/${cooperativa}/representantes`;

    const config = {
      params: {
        stRepr,
        tpRepr,
      },
    };

    return this.representantesUseCase.execute(this.URL, config);
  }

  buscaCooperativasAtivas(): Observable<CooperativaDTO[]> {
    this.URL = `${this.BASE_URL}/cadastro/cooperativas`;
    return this.cooperativasUseCase.execute(this.URL);
  }
}
