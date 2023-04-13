import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.apiUrl;
  private helper = new JwtHelperService();

  private HTTP_HEADERS = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private http: HttpClient, private router: Router) {}


  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAuthenticated(allowRoles?: string[]): boolean {

    if (!allowRoles?.includes('admin')) {
      return false;
    }

    const token = localStorage.getItem('token');
    let decode: any = {};

    try {
      decode = this.helper.decodeToken(token!) as any;
    } catch (error) {
      decode = false;

      Swal.fire({
        heightAuto: false,
        title: '',
        text: `Su sesión ha terminado. Debe volver a iniciar sesión`,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#22bb33',
        reverseButtons: true,
      }).then((result) => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.router.navigate(['login'])
        return !token || !decode ? false : true;
      });
    }

    return !token || !decode || !allowRoles.includes(decode['rol']) ? false : true;
  }

}
