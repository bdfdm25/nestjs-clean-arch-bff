import { RepresentantesDTO } from '@dtos/cooperativa/representantes.dto';
import { CooperativaUsService } from '@services/cooperativa-us/cooperativa-us.service';
import { Observable } from 'rxjs';

export class RepresentantesUseCase {
  constructor(
    private readonly service: CooperativaUsService<RepresentantesDTO>,
  ) {}

  execute(url: string, config: any): Observable<RepresentantesDTO[]> {
    return this.service.getAll(url, config);
  }
}
