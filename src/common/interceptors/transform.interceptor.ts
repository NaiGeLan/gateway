import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
}

export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    console.log(next.handle());
    return next.handle().pipe(
      map((data) => ({
        data,
        state: 0,
        extra: {},
        message: 'success',
        success: true,
      })),
    );
  }
}
