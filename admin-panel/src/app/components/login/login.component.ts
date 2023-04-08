import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { AdminService } from '../../services/admin.service';
import { Observable, async, lastValueFrom, map, switchMap, timer } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public userData: any = {};
  public token: string | null = '';

  loginForm!: FormGroup;
  passwordType = 'password';


  @ViewChild('loginImage') loginImage!: ElementRef;

  currentImage: string = "url('assets/image/login/2.png')";
  images : string[] = ['url(assets/image/login/1.png)', 'url(assets/image/login/3.png)', 'url(assets/image/login/4.png)'];

  constructor(
    private notificationService: NotificationService,
    private adminService: AdminService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.token = this.adminService.getToken();
    if (this.token) {
      this.router.navigate(['inicio'])
    }

    setInterval(() => {
      this.changeImage();
    }, 30000);

  }

  /**
   * Cambia la imagen de fondo cada 30 segundos
   */
  changeImage(): void {
    const nextImageIndex = this.images.indexOf(this.currentImage) + 1;
    const nextImage = nextImageIndex < this.images.length ? this.images[nextImageIndex] : this.images[0];
    const currentImageElement = document.getElementsByClassName('login-image')[0] as HTMLElement;
    if (currentImageElement) {
      currentImageElement.style.transition = 'opacity 2s';
      currentImageElement.style.opacity = '0';
      setTimeout(() => {
        currentImageElement.style.backgroundImage = nextImage;
        currentImageElement.style.opacity = '1';
        this.currentImage = nextImage;
      }, 2000);
    }
  }


  /**
   * Login del usuario
   * @param form
   */
  async login() {

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
        this.router.navigate(['inicio'])
      }

  }


  togglePassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }


}


