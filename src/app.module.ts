import register from '@config/config-repo/register';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@presentation/health/health.module';
import { CooperativasModule } from '@presentation/cooperativas/cooperativas.module';
import { MulticontasModule } from '@presentation/multicontas/multicontas.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [register] }),
    HealthModule,
    CooperativasModule,
    MulticontasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
