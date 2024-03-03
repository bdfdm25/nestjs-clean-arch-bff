import { BaseUseCase } from '@base/base.usecase';
import { MulticontasDTO } from 'src/core/domain/dtos/multicontas/multicontas.dto';
import { MulticontaCanaisUisService } from '@services/multiconta-canais-uis/multiconta-canais-uis.service';
import { Observable } from 'rxjs';

export class MulticontasUseCase implements BaseUseCase<MulticontasDTO[]> {
  constructor(
    private readonly service: MulticontaCanaisUisService<MulticontasDTO>,
  ) {}

  execute(url: string, config: any): Observable<MulticontasDTO[]> {
    return this.service.getAll(url, config);
  }
}
