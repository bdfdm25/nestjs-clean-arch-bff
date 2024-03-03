import { LojaDTO } from '@dtos/lojas/centrais-estados.dto';
import { CooperativaUsService } from '@services/cooperativa-us/cooperativa-us.service';
import { Observable } from 'rxjs';

export class CentraisEstadosUseCase {
  constructor(
    private readonly service: CooperativaUsService<LojaDTO>,
  ) {}

  execute(url: string): Observable<LojaDTO[]> {
    return this.service.getAll(url);
  }
}
