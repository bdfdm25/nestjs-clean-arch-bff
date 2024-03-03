import { CentraisEstadosDTO } from '@dtos/lojas/centrais-estados.dto';
import { CooperativaDTO } from '@dtos/cooperativa/cooperativas.dto';
import { RepresentantesDTO } from '@dtos/cooperativa/representantes.dto';
import { HttpClientService } from '@infra/http/http-client.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CooperativaUsService } from '@services/cooperativa-us/cooperativa-us.service';
import { CentraisEstadosUseCase } from '@usecases/cooperativa-us/centrais-estados.usecase';
import { CooperativasAtivasUseCase } from '@usecases/cooperativa-us/cooperativas-ativas.usecase';
import { RepresentantesUseCase } from '@usecases/cooperativa-us/representantes.usecase';
import { CooperativasController } from './cooperativas.controller';
import { CooperativasService } from './cooperativas.service';

@Module({
  controllers: [CooperativasController],
  providers: [
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
  imports: [ConfigModule, HttpModule],
})
export class CooperativasModule {}
