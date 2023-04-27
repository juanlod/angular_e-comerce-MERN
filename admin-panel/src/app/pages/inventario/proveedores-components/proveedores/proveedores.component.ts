import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StoreProviderService } from 'src/app/api/services/inventory/store-provider.service';
import { StoreProvider } from 'src/app/api/models/inventory/store-provider';
import { NotificationService } from 'src/app/api/services/notification.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})
export class ProveedoresComponent
  implements OnInit
{
  dataSource!: MatTableDataSource<StoreProvider>;
  proveedores: Array<StoreProvider> = [];
  numRegistros!: number;
  formUrl = "";
  loading = false;
  page:any;
  size: any;
  filter:any;
  totalPages: any;
  totalRegistros: any;
  order: string = 'nombre';
  desc: boolean = false;

  displayedColumns: string[] = [
    'nombre',
    'telefono',
    'mobil',
    'email',
    'activo',
    'acciones',
  ];

  constructor(
    private proveedorService: StoreProviderService,
    router: Router,
    private notificationService: NotificationService
  ) {
    this.formUrl = '/inventario/proveedores/form';
  }

   ngOnInit(): void {
    this.getAll();
  }

   getAll() {

    this.loading = true;
    let params = {
      page: this.page,
      size: this.size,
      order: this.order,
      desc: this.desc,
      filter: this.filter,
    };
    this.proveedorService.findAllPagingStoreProvider(params).subscribe({
      next: (result: any) => {
        this.dataSource = new MatTableDataSource<StoreProvider>(result.content);
        this.totalPages = new Array(result.totalPages);
        this.totalRegistros = result.totalElements as number;
        this.numRegistros = this.dataSource.filteredData.length;
        this.loading = false;
      },
      error: (error: any) => {
        this.notificationService.showError(
          `No se han podido obtener datos en este momento.`
        );
        this.numRegistros = 0;
        this.loading = false;
      },
    });
  }

  change(activo: boolean, id: number) {
    // activo = !activo;
    // this.proveedorService
    //   .changeActiveProvider({ id: id, activo: activo })
    //   .subscribe({
    //     next: (result: any) => {
    //       this.getAll();
    //     },
    //     error: (error: any) => {
    //       console.log(error);
    //     },
    //   });
  }

  eliminar(proveedor: StoreProvider): void {
    Swal.fire({
      heightAuto: false,
      title: '',
      text: `¿Está seguro que desea eliminar el proveedor con nombre ${proveedor.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#bb2124',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedorService
          .removeStoreProvider({ id: proveedor._id })
          .subscribe({
            next: () => {
              this.getAll();
              this.notificationService.showSuccess(
                `El proveedor ${proveedor.name} se ha eliminado correctamente.`,
                ''
              );
            },
            error: (error) => {
              this.notificationService.showError(
                `No se ha podido eliminar el proveedor con nombre ${proveedor.name}`,
                ''
              );
            },
          });
      }
    });
  }
}
