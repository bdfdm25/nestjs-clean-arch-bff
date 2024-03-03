import { RepresentantesDTO } from '@dtos/cooperativa/representantes.dto';
import { HttpClientService } from '@infra/http/http-client.service';

import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CooperativaUsService } from '@services/cooperativa-us/cooperativa-us.service';
import {
  mockedRepresentantes,
  mockedRepresentantesConfig,
} from '@test/mock/cooperativa/representantes-mock';

import {
  mockedRequestError,
  mockedRequestSuccess,
} from '@test/mock/request-mock';
import { of, throwError } from 'rxjs';
import { RepresentantesUseCase } from './representantes.usecase';

describe('RepresentantesUseCase', () => {
  const URL =
    '';
  let useCase: RepresentantesUseCase;
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
          provide: RepresentantesUseCase,
          useFactory: (service: CooperativaUsService<RepresentantesDTO>) => {
            return new RepresentantesUseCase(service);
          },
          inject: [HttpClientService],
        },
      ],
    }).compile();

    useCase = module.get<RepresentantesUseCase>(RepresentantesUseCase);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should sucessfully call CooperativaUsService with RepresentantesDTO', (done) => {
    const mkResponse = mockedRequestSuccess({
      data: mockedRepresentantes,
      status: 200,
    });

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(mkResponse));

    useCase.execute(URL, mockedRepresentantesConfig).subscribe((res) => {
      expect(res).toEqual(mockedRepresentantes);
      done();
    });
  });

  it('should return error when call CooperativaUsService with RepresentantesDTO', (done) => {
    const error = mockedRequestError(500);
    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => throwError(() => error));

    useCase.execute(URL, mockedRepresentantesConfig).subscribe({
      error: (err) => {
        expect(err.message).toEqual(error.message);
        done();
      },
    });
  });
});
