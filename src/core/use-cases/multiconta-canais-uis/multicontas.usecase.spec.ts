import { HttpClientService } from '@infra/http/http-client.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { MulticontaCanaisUisService } from '@services/multiconta-canais-uis/multiconta-canais-uis.service';
import { MulticontasDTO } from 'src/core/domain/dtos/multicontas/multicontas.dto';

import {
  mockedMulticontas,
  mockedMulticontasConfig,
} from '@test/mock/multicontas/multicontas-mock';
import {
  mockedRequestError,
  mockedRequestSuccess,
} from '@test/mock/request-mock';
import { of, throwError } from 'rxjs';
import { MulticontasUseCase } from './multicontas.usecase';

describe('MulticontasUseCase', () => {
  const URL =
    '';
  let useCase: MulticontasUseCase;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
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

    useCase = module.get<MulticontasUseCase>(MulticontasUseCase);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should sucessfully call MulticontaCanaisUisService', (done) => {
    const mkResponse = mockedRequestSuccess({
      data: mockedMulticontas,
      status: 200,
    });

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(mkResponse));

    useCase.execute(URL, mockedMulticontasConfig).subscribe((res) => {
      expect(res).toEqual(mockedMulticontas);
      done();
    });
  });

  it('should return error when call MulticontaCanaisUisService', (done) => {
    const error = mockedRequestError(500);
    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => throwError(() => error));

    useCase.execute(URL, mockedMulticontasConfig).subscribe({
      error: (err) => {
        expect(err.message).toEqual(error.message);
        done();
      },
    });
  });
});
