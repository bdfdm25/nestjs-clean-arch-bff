import { BaseService } from '@base/base.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, Logger } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';

export class HttpClientService<T> implements BaseService<T> {
  private readonly logger = new Logger(HttpClientService.name);
  constructor(private readonly httpService: HttpService) {}

  getAll(url: string, config?: any): Observable<T[]> {
    return this.httpService.get(url, config).pipe(
      map((response) => response.data),
      catchError((e) => {
        this.logger.error(e.message);
        throw new HttpException(e.message, e.response.status);
      }),
    );
  }
}
