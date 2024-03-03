import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

import { ApiExcludeController } from '@nestjs/swagger';

/**
 * Rotas utilizadas pelo kubernetes.
 * liveness: Liveness Probe usado para controlar a integridade de um aplicativo dentro do container em um pod.
 * readiness: Este probe sabe quando um Container está pronto para começar a receber tráfego.
 */
@ApiExcludeController()
@Controller('/management/health')
export class HealthController {
  constructor(private readonly health: HealthCheckService) {}

  @Get('/liveness')
  @HealthCheck()
  liveness() {
    return this.health.check([]);
  }

  /**
   * Retorna o estado de um container - se está pronto para começar a receber tráfego.
   * Deve ser informado um array contendo o nome do serviço e a url de healthcheck.
   *
   */
  @Get('/readiness')
  @HealthCheck()
  readiness() {
    return this.health.check([]);
  }
}
