import { BaseService } from '@base/base.service';
import { Observable } from 'rxjs';

export interface MulticontaCanaisUisService<MulticontasDTO>
  extends BaseService<MulticontasDTO> {
  getAll(url: string, config: any): Observable<MulticontasDTO[]>;
}
