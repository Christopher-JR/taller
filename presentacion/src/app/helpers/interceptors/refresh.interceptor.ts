import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
//import { AuthService } from '../services/auth.service';
import { AuthService } from '../../shared/services/auth.service';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const srvAuth = inject(AuthService);
  return next(req)
  .pipe(
    finalize(
      () => {
        if(srvAuth.isLogged()){
          srvAuth.verificarRefresh();
        }
      }
    )
  );
};
