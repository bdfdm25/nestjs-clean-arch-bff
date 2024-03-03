import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulticontasUseCase } from '@usecases/multiconta-canais-uis/multicontas.usecase';
import { Observable } from 'rxjs';
import { MulticontasDTO } from 'src/core/domain/dtos/multicontas/multicontas.dto';

@Injectable()
export class MulticontasService {
  private URL: string;
  private BASE_URL: string;
  private BASE_HOST = 'app.hosts.multicontas';

  constructor(
    private readonly configService: ConfigService,
    private readonly multicontasUseCase: MulticontasUseCase,
  ) {
    this.BASE_URL = this.configService.get<string>(this.BASE_HOST);
  }

  buscaMulticontas(
    headers: any,
    documento: string,
  ): Observable<MulticontasDTO[]> {
    this.URL = `${this.BASE_URL}/multicontas`;

    const config = {
      params: {
        cpfCnpj: documento,
        canal: process.env.ORIGEM_CONSULTA,
      },
      headers: {
        cooperativa: headers.cooperativa,
        authorization: headers.authorization,
      },
    };

    return this.multicontasUseCase.execute(this.URL, config);
  }
}
