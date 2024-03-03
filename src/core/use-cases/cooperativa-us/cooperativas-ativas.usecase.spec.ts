import { CooperativaDTO } from '@dtos/cooperativa/cooperativas.dto';
import { HttpClientService } from '@infra/http/http-client.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CooperativaUsService } from '@services/cooperativa-us/cooperativa-us.service';
import { mockedCooperativas } from '@test/mock/cooperativa/cooperativas-mock';

import {
  mockedRequestError,
  mockedRequestSuccess,
} from '@test/mock/request-mock';
import { of, throwError } from 'rxjs';
import { CooperativasAtivasUseCase } from './cooperativas-ativas.usecase';

describe('CooperativasAtivasUseCase', () => {
  const URL =
    '';
  let useCase: CooperativasAtivasUseCase;
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
          provide: CooperativasAtivasUseCase,
          useFactory: (service: CooperativaUsService<CooperativaDTO>) => {
            return new CooperativasAtivasUseCase(service);
          },
          inject: [HttpClientService],
        },
      ],
    }).compile();

    useCase = module.get<CooperativasAtivasUseCase>(CooperativasAtivasUseCase);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should sucessfully call CooperativaUsService with CooperativaDTO', (done) => {
    const mkResponse = mockedRequestSuccess({
      data: mockedCooperativas,
      status: 200,
    });

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(mkResponse));

    useCase.execute(URL).subscribe((res) => {
      expect(res).toEqual(mockedCooperativas);
      done();
    });
  });

  it('should return error when call CooperativaUsService with CooperativaDTO', (done) => {
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
