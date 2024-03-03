import { LojaDTO } from '@dtos/lojas/centrais-estados.dto';
import { HttpClientService } from '@infra/http/http-client.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CooperativaUsService } from '@services/cooperativa-us/cooperativa-us.service';
import { mockedCentraisEstados } from '@test/mock/cooperativa/centrais-estados-mock';
import {
  mockedRequestError,
  mockedRequestSuccess,
} from '@test/mock/request-mock';
import { of, throwError } from 'rxjs';
import { CentraisEstadosUseCase } from './centrais-estados.usecase';

describe('CentraisEstadosUseCase', () => {
  const URL =
    '';
  let useCase: CentraisEstadosUseCase;
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
          provide: CentraisEstadosUseCase,
          useFactory: (service: CooperativaUsService<LojaDTO>) => {
            return new CentraisEstadosUseCase(service);
          },
          inject: [HttpClientService],
        },
      ],
    }).compile();

    useCase = module.get<CentraisEstadosUseCase>(CentraisEstadosUseCase);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should sucessfully call CooperativaUsService with CentraisEstadosDTO', (done) => {
    const mkResponse = mockedRequestSuccess({
      data: mockedCentraisEstados,
      status: 200,
    });

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(mkResponse));

    useCase.execute(URL).subscribe((res) => {
      expect(res).toEqual(mockedCentraisEstados);
      done();
    });
  });

  it('should return error when call CooperativaUsService with CentraisEstadosDTO', (done) => {
    const error = mockedRequestError(500);
    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => throwError(() => error));

    useCase.execute(URL).subscribe({
      error: (err) => {
        expect(err.message).toEqual(error.message);
        done();
      },
    });
  });
});
