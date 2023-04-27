import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';
import { StoreProvider } from 'src/app/api/models/inventory/store-provider';

import { StoreProviderService } from 'src/app/api/services/inventory/store-provider.service';
import { NotificationService } from 'src/app/api/services/notification.service';

@Component({
  selector: 'app-proveedores-form',
  templateUrl: './proveedores-form.component.html',
  styleUrls: ['./proveedores-form.component.css'],
})
export class ProveedoresFormComponent
  implements OnInit
{
  titulo: string = 'Nuevo proveedor';
  params = {};
  activo!: boolean;
  form:any;

  constructor(
    private proveedorService: StoreProviderService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private inventoryCache: InventoryCacheService
  ) {
  }

  async ngOnInit(): Promise<void> {



  }

   buildForm(): void {
    /**
     * Formulario reactivo
     */
    this.form = new FormGroup({
      id: new FormControl(null),
      direccionId: new FormControl(null),
      activo: new FormControl(null),
      borrado: new FormControl(null),
      nombre: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
      telefono: new FormControl('', [
        Validators.nullValidator,
        Validators.minLength(9),
        Validators.maxLength(70),
      ]),
      mobil: new FormControl('', [
        Validators.nullValidator,
        Validators.minLength(9),
        Validators.maxLength(70),
      ]),
      fax: new FormControl('', [
        Validators.nullValidator,
        Validators.minLength(9),
        Validators.maxLength(70),
      ]),
      email: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(70),
        Validators.pattern(
          /^([a-zA-Z0-9_])+([.][a-zA-Z0-9_]+)*@([a-zA-Z0-9_])+([.][a-zA-Z0-9_]+)*([.])([a-zA-Z]){1,5}$/
        ),
      ]),
      provincia: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      pais: new FormControl('', [
        Validators.nullValidator,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      localidad: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      direccion: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
    });
  }

   guardar(): void {
    const proveedor = {
      id: this.form.value['id'],
      nombre: this.form.value['nombre'],
      activo: this.form.value['activo'],
      borrado: this.form.value['borrado'],
      direccion: {
        id: this.form.value['direccionId'],
        telefono: this.form.value['telefono'],
        mobil: this.form.value['mobil'],
        fax: this.form.value['fax'],
        email: this.form.value['email'],
        pais: this.form.value['pais'],
        provincia: this.form.value['provincia'],
        localidad: this.form.value['localidad'],
        direccion: this.form.value['direccion'],
      },
    } as any;

    if (!proveedor.id) {
      this.proveedorService.createStoreProvider({ body: proveedor }).subscribe({
        next: (result: StoreProvider) => {
          this.patchValue(result);
          this.notificationService.showSuccess(
            'El proveedor se ha guardado correctamente'
          );

        },
        error: (error: any) => {
          this.notificationService.showError(
            'Ha ocurrido un error al guardar el proveedor'
          );
        },
      });
    } else {
      this.proveedorService
        .updateStoreProvider({ id: proveedor.id, body: proveedor })
        .subscribe({
          next: (result: StoreProvider) => {
            this.notificationService.showSuccess(
              'El proveedor se ha actualizado correctamente'
            );
          },
          error: (error: any) => {
            this.notificationService.showError(
              'Ha ocurrido un error al actualizar el proveedor'
            );
          },
        });
    }
  }

  editar(): void {
    this.route.paramMap.subscribe((params) => {
      // Nos suscribimos y recuperamos el valor id de los parámetros
      // El parámetro id se corresponde con el creado en en enrutado
      // Por defecto es de tipo string, se convierte a tipo number mediante el parametro +
      // El signo ! al final de la instrucción solucione el error ->  El objeto es posiblemente "null"
      const id: string = params.get('id')!;
      if (id) {
        // Nos suscribimos y mapeamos los datos del objeto al form
        this.proveedorService
          .findOneStoreProvider({ id })
          .subscribe((result: StoreProvider) => {
            this.patchValue(result);
          });
      }
    });
  }

  patchValue(result: StoreProvider): void {
    this.form.patchValue({
      id: result.id,
      activo: result['activo'],
      borrado: result['borrado'],
      nombre: result['nombre'],
      direccionId: result['direccion'].id,
      telefono: result['direccion'].telefono,
      mobil: result['direccion'].mobil,
      fax: result['direccion'].fax,
      email: result['direccion'].email,
      pais: result['direccion'].pais,
      provincia: result['direccion'].provincia,
      localidad: result['direccion'].localidad,
      direccion: result['direccion'].direccion,
    });
  }

}
