import { CentraisEstadosDTO } from '@dtos/lojas/centrais-estados.dto';
import { CooperativaDTO } from '@dtos/cooperativa/cooperativas.dto';
import { RepresentantesDTO } from '@dtos/cooperativa/representantes.dto';
import { HttpClientService } from '@infra/http/http-client.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CooperativaUsService } from '@services/cooperativa-us/cooperativa-us.service';
import { mockedCentraisEstados } from '@test/mock/cooperativa/centrais-estados-mock';
import { mockedCooperativas } from '@test/mock/cooperativa/cooperativas-mock';
import { mockedRepresentantes } from '@test/mock/cooperativa/representantes-mock';
import { mockedRequestSuccess } from '@test/mock/request-mock';
import { CentraisEstadosUseCase } from '@usecases/cooperativa-us/centrais-estados.usecase';
import { CooperativasAtivasUseCase } from '@usecases/cooperativa-us/cooperativas-ativas.usecase';
import { RepresentantesUseCase } from '@usecases/cooperativa-us/representantes.usecase';
import { of } from 'rxjs';
import { CooperativasController } from './cooperativas.controller';
import { CooperativasService } from './cooperativas.service';

describe('CooperativasController', () => {
  let controller: CooperativasController;
  let service: CooperativasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CooperativasController],
      providers: [
        ConfigService,
        CooperativasService,
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
        {
          provide: RepresentantesUseCase,
          useFactory: (service: CooperativaUsService<RepresentantesDTO>) => {
            return new RepresentantesUseCase(service);
          },
          inject: [HttpClientService],
        },
        {
          provide: CentraisEstadosUseCase,
          useFactory: (service: CooperativaUsService<CentraisEstadosDTO>) => {
            return new CentraisEstadosUseCase(service);
          },
          inject: [HttpClientService],
        },
      ],
    }).compile();

    controller = module.get<CooperativasController>(CooperativasController);
    service = module.get<CooperativasService>(CooperativasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should successfully return healthCheck', async () => {
    const payload = {
      status: 'any_status',
      name: 'any_name',
    };
    jest
      .spyOn(service, 'healthCheck')
      .mockImplementation(() => Promise.resolve(payload));

    const result = await controller.healthCheck();
    expect(result).toEqual(payload);
  });

  it('should successfully return buscaCentraisEstados', (done) => {
    const response = mockedRequestSuccess({
      data: mockedCentraisEstados,
      status: 200,
    });
    jest
      .spyOn(service, 'buscaCentraisEstados')
      .mockImplementationOnce(() => of(response.data));

    controller.buscaCentraisEstados().subscribe((res) => {
      expect(res).toEqual(mockedCentraisEstados);
      done();
    });
  });

  it('should successfully return buscaRepresentantes', (done) => {
    const response = mockedRequestSuccess({
      data: mockedRepresentantes,
      status: 200,
    });
    jest
      .spyOn(service, 'buscaRepresentantes')
      .mockImplementationOnce(() => of(response.data));

    controller.buscaRepresentantes(0, 'ATIVO', 'DIRETOR').subscribe((res) => {
      expect(res).toEqual(mockedRepresentantes);
      done();
    });
  });

  it('should successfully return buscaCooperativasAtivas', (done) => {
    const response = mockedRequestSuccess({
      data: mockedCooperativas,
      status: 200,
    });
    jest
      .spyOn(service, 'buscaCooperativasAtivas')
      .mockImplementationOnce(() => of(response.data));

    controller.buscaCooperativasAtivas().subscribe((res) => {
      expect(res).toEqual(mockedCooperativas);
      done();
    });
  });
});
