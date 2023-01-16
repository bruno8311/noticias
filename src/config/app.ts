import { HttpHeaders } from '@angular/common/http';
export const BASE_ENDPOINT = 'http://204.48.20.196:2000/api/v1';
export const BASE_ENDPOINT2 = 'http://localhost:3000';
export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
