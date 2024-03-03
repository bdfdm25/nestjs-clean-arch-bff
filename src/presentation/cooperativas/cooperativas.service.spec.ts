import { HttpClientService } from '@infra/http/http-client.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CooperativaUsService } from '@services/cooperativa-us/cooperativa-us.service';
import mockedConfigService from '@test/config-service';
import { mockedCentraisEstados } from '@test/mock/cooperativa/centrais-estados-mock';
import { mockedCooperativas } from '@test/mock/cooperativa/cooperativas-mock';
import {
  mockedRepresentantes,
  mockedRepresentantesConfig,
} from '@test/mock/cooperativa/representantes-mock';
import { mockedRequestError } from '@test/mock/request-mock';
import { CentraisEstadosUseCase } from '@usecases/cooperativa-us/centrais-estados.usecase';
import { CooperativasAtivasUseCase } from '@usecases/cooperativa-us/cooperativas-ativas.usecase';
import { RepresentantesUseCase } from '@usecases/cooperativa-us/representantes.usecase';
import { of, throwError } from 'rxjs';
import { CentraisEstadosDTO } from '@dtos/lojas/centrais-estados.dto';
import { CooperativaDTO } from '@dtos/cooperativa/cooperativas.dto';
import { RepresentantesDTO } from '@dtos/cooperativa/representantes.dto';
import { CooperativasService } from './cooperativas.service';

describe('CooperativasService', () => {
  const ENV = process.env;
  const API = '';
  let service: CooperativasService;
  let cooperativasUseCase: CooperativasAtivasUseCase;
  let representantesUseCase: RepresentantesUseCase;
  let centraisEstadosUseCase: CentraisEstadosUseCase;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...ENV };

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CooperativasService,
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

    service = module.get<CooperativasService>(CooperativasService);
    centraisEstadosUseCase = module.get<CentraisEstadosUseCase>(
      CentraisEstadosUseCase,
    );
    cooperativasUseCase = module.get<CooperativasAtivasUseCase>(
      CooperativasAtivasUseCase,
    );
    representantesUseCase = module.get<RepresentantesUseCase>(
      RepresentantesUseCase,
    );
  });

  afterEach(() => {
    process.env = ENV;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully return healthCheck', async () => {
    const payload = {
      status: 'UP',
      service: '',
      name: 'any_name_app',
    };

    const result = await service.healthCheck();
    expect(result).toEqual(payload);
  });

  it('should successfully return buscaCentraisEstados', (done) => {
    const mkResponse: CentraisEstadosDTO[] = mockedCentraisEstados;
    const URL = `${API}/cooperativa/v3/centrais/estados`;

    jest
      .spyOn(centraisEstadosUseCase, 'execute')
      .mockImplementationOnce(() => of(mkResponse));

    service.buscaCentraisEstados().subscribe((res) => {
      expect(res).toEqual(mockedCentraisEstados);
      done();
    });

    expect(centraisEstadosUseCase.execute).toBeCalledTimes(1);
    expect(centraisEstadosUseCase.execute).toBeCalledWith(URL);
  });

  it('should return with fail buscaCentraisEstados', (done) => {
    const error = mockedRequestError(400);
    jest
      .spyOn(centraisEstadosUseCase, 'execute')
      .mockImplementation(() => throwError(() => error));

    service.buscaCentraisEstados().subscribe({
      error: (err) => {
        expect(err.message).toEqual(error.message);
        done();
      },
    });
  });

  it('should successfully return buscaRepresentantes', (done) => {
    const mkResponse: RepresentantesDTO[] = mockedRepresentantes;
    const URL = `${API}/cooperativa/v1/cooperativas/9999/representantes`;

    jest
      .spyOn(representantesUseCase, 'execute')
      .mockImplementationOnce(() => of(mkResponse));

    service.buscaRepresentantes(9999, 'ATIVO', 'DIRETOR').subscribe((res) => {
      expect(res).toEqual(mockedRepresentantes);
      done();
    });

    expect(representantesUseCase.execute).toBeCalledTimes(1);
    expect(representantesUseCase.execute).toBeCalledWith(
      URL,
      mockedRepresentantesConfig,
    );
  });

  it('should return with fail buscaRepresentantes', (done) => {
    const error = mockedRequestError(400);
    jest
      .spyOn(representantesUseCase, 'execute')
      .mockImplementation(() => throwError(() => error));

    service.buscaRepresentantes(0, 'ATIVO', 'DIRETOR').subscribe({
      error: (err) => {
        expect(err.message).toEqual(error.message);
        done();
      },
    });
  });
  //--
  it('should successfully return buscaCooperativasAtivas', (done) => {
    const mkResponse: CooperativaDTO[] = mockedCooperativas;
    const URL = `${API}/cadastro/cooperativa/v2/cooperativas`;

    jest
      .spyOn(cooperativasUseCase, 'execute')
      .mockImplementationOnce(() => of(mkResponse));

    service.buscaCooperativasAtivas().subscribe((res) => {
      expect(res).toEqual(mockedCooperativas);
      done();
    });

    expect(cooperativasUseCase.execute).toBeCalledTimes(1);
    expect(cooperativasUseCase.execute).toBeCalledWith(URL);
  });

  it('should return with fail buscaCooperativasAtivas', (done) => {
    const error = mockedRequestError(400);
    jest
      .spyOn(cooperativasUseCase, 'execute')
      .mockImplementation(() => throwError(() => error));
    service.buscaCooperativasAtivas().subscribe({
      error: (err) => {
        expect(err.message).toEqual(error.message);
        done();
      },
    });
  });
});
