import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private API_URL = environment.apiUrl;
  private helper = new JwtHelperService();

  private HTTP_HEADERS = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private http: HttpClient, private router: Router) {}

  login_admin(user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/login_admin`, user, {
      headers: this.HTTP_HEADERS,
    });
  }

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
