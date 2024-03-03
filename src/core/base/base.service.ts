import { Observable } from 'rxjs';

export interface BaseService<T> {
  getAll(...args: any[]): Observable<T[]>;
}
