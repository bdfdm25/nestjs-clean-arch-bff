import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockedHeadersMulticontas,
  mockedMulticontas,
} from '@test/mock/multicontas/multicontas-mock';
import { mockedRequestError } from '@test/mock/request-mock';
import { MulticontasUseCase } from '@usecases/multiconta-canais-uis/multicontas.usecase';
import { of, throwError } from 'rxjs';
import { MulticontasDTO } from 'src/core/domain/dtos/multicontas/multicontas.dto';
import { mockedMulticontasConfig } from './../../../test/mock/multicontas/multicontas-mock';

import { HttpClientService } from '@infra/http/http-client.service';
import { MulticontaCanaisUisService } from '@services/multiconta-canais-uis/multiconta-canais-uis.service';
import mockedConfigService from '@test/config-service';
import { MulticontasService } from './multicontas.service';

describe('MulticontasService', () => {
  const ENV = process.env;
  const URL =
    '';
  let service: MulticontasService;
  let useCase: MulticontasUseCase;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...ENV };

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ConfigService,
        MulticontasService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: HttpClientService,
          useFactory: (httpService: HttpService) => {
            return new HttpClientService(httpService);
          },
          inject: [HttpService],
        },
        {
          provide: MulticontasUseCase,
          useFactory: (service: MulticontaCanaisUisService<MulticontasDTO>) => {
            return new MulticontasUseCase(service);
          },
          inject: [HttpClientService],
        },
      ],
    }).compile();

    service = module.get<MulticontasService>(MulticontasService);
    useCase = module.get<MulticontasUseCase>(MulticontasUseCase);
  });

  afterEach(() => {
    process.env = ENV;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully return buscaMulticontas', (done) => {
    process.env.ORIGEM_CONSULTA = 'INTERNET_BANKING';
    const mkResponse: MulticontasDTO[] = mockedMulticontas;
    jest.spyOn(useCase, 'execute').mockImplementationOnce(() => of(mkResponse));

    service
      .buscaMulticontas(mockedHeadersMulticontas, 'any_documento')
      .subscribe((res) => {
        expect(res).toEqual(mockedMulticontas);
        done();
      });

    expect(useCase.execute).toBeCalledTimes(1);
    expect(useCase.execute).toBeCalledWith(URL, mockedMulticontasConfig);
  });

  it('should return with fail buscaMulticontas', (done) => {
    const error = mockedRequestError(400);
    jest
      .spyOn(useCase, 'execute')
      .mockImplementation(() => throwError(() => error));

    service
      .buscaMulticontas(mockedHeadersMulticontas, 'mock_documento')
      .subscribe({
        error: (err) => {
          expect(err.message).toEqual(error.message);
          done();
        },
      });
  });
});
