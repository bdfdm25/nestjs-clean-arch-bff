import { Module } from '@nestjs/common';
import { MulticontasService } from './multicontas.service';
import { MulticontasController } from './multicontas.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { MulticontasUseCase } from '@usecases/multiconta-canais-uis/multicontas.usecase';
import { MulticontasDTO } from 'src/core/domain/dtos/multicontas/multicontas.dto';
import { ConfigModule } from '@nestjs/config';
import { MulticontaCanaisUisService } from '@services/multiconta-canais-uis/multiconta-canais-uis.service';
import { HttpClientService } from '@infra/http/http-client.service';

@Module({
  controllers: [MulticontasController],
  providers: [
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
  imports: [ConfigModule, HttpModule],
})
export class MulticontasModule {}
