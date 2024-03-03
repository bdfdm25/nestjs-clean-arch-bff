import { Observable } from 'rxjs';

export interface BaseUseCase<T> {
  execute(...args: any[]): Observable<T>;
}
