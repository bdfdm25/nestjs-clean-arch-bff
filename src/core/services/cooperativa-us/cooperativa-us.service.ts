import { BaseService } from '@base/base.service';
import { Observable } from 'rxjs';

export interface CooperativaUsService<T> extends BaseService<T> {
  getAll(url: string, config?: any): Observable<T[]>;
}
