import { BaseUseCase } from '@base/base.usecase';
import { CooperativaDTO } from '@dtos/cooperativa/cooperativas.dto';
import { CooperativaUsService } from '@services/cooperativa-us/cooperativa-us.service';

import { Observable } from 'rxjs';

export class CooperativasAtivasUseCase
  implements BaseUseCase<CooperativaDTO[]>
{
  constructor(private readonly service: CooperativaUsService<CooperativaDTO>) {}

  execute(url: string): Observable<CooperativaDTO[]> {
    return this.service.getAll(url);
  }
}
