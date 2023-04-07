import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { User } from '../../../app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { AdminService } from '../../services/admin.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public userData: any = {};
  public token: string | null = '';


  constructor(
    private notificationService: NotificationService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.adminService.getToken();
    if (this.token) {
      this.router.navigate(['/inicio'])
    }

  }

  /**
   * Login del usuario
   * @param form
   */
  async login(form: NgForm) {
    if (!form.valid) {
      this.notificationService.showError('Introduzca usuario y contraseña');
    } else {
      // Enviamos la peticion al backend
      let response = await lastValueFrom(
        this.adminService.login_admin(this.user)
      ).catch((error) => {
        // Si se produce algun error enviamos un mensaje
        this.notificationService.showError(error.error.error);
      });

      console.log(response)
      // Si la respuesta es correcta almacenamos los datos en el localstorage
      if (response) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('id', response.user._id)
        this.router.navigate(['/inicio'])
      }
    }
  }
}
