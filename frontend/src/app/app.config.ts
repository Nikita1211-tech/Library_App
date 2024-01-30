import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
};
