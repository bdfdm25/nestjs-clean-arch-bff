import { MulticontasDTO } from 'src/core/domain/dtos/multicontas/multicontas.dto';
import { HttpClientService } from '@infra/http/http-client.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MulticontaCanaisUisService } from '@services/multiconta-canais-uis/multiconta-canais-uis.service';
import { mockedMulticontas } from '@test/mock/multicontas/multicontas-mock';
import { mockedRequestSuccess } from '@test/mock/request-mock';
import { MulticontasUseCase } from '@usecases/multiconta-canais-uis/multicontas.usecase';
import { of } from 'rxjs';
import { MulticontasController } from './multicontas.controller';
import { MulticontasService } from './multicontas.service';

describe('MulticontasController', () => {
  let controller: MulticontasController;
  let service: MulticontasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [MulticontasController],
      providers: [
        ConfigService,
        MulticontasService,
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

    controller = module.get<MulticontasController>(MulticontasController);
    service = module.get<MulticontasService>(MulticontasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should successfully return buscaMulticontas', (done) => {
    const response = mockedRequestSuccess({
      data: mockedMulticontas,
      status: 200,
    });
    jest
      .spyOn(service, 'buscaMulticontas')
      .mockImplementationOnce(() => of(response.data));

    controller
      .buscaMulticontas('mock_headers', 'mock_documento')
      .subscribe((res) => {
        expect(res).toEqual(mockedMulticontas);
        done();
      });
  });
});
