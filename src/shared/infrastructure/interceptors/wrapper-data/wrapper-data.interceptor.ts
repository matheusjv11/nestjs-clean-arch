import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'

export class WrapperDataInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map(body => {
        if (!body || 'accessToken' in body || 'meta' in body) {
          return body
        }

        return {
          data: body,
        }
      }),
    )
  }
}
