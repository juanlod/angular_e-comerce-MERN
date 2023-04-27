import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';

import { BatchService } from 'src/app/api/services/inventory/batch.service';
import { Product } from 'src/app/api/models/inventory/product';
import { NotificationService } from 'src/app/api/services/notification.service';
import { Batch } from 'src/app/api/models/inventory/batch';

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.css'],
})
export class LoteComponent implements OnInit {
  // Se obtiene el producto a través del componente padre tab-productos
  @Input() producto!: Product;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  formBatch!: FormGroup;
  panelOpenState = false;
  loading = true;

  dataSource!: MatTableDataSource<Batch>;
  numRegistros!: number;
  displayedColumns: string[] = [
    'numero',
    'albaran',
    'fecha-entrada',
    'fecha-caducidad',
    'cantidad-total',
    'acciones',
  ];

  titulo: string = 'Batchs';
  nuevo: string = 'Nuevo lote';

  // PARAMETROS DE PAGINACION
  page: number = 0;
  size: number = 10;
  order: string = 'cantidadTotal';
  desc: boolean = true;
  filter: string = '';

  // PAGINACION MANUAL
  totalRegistros: number = 0;
  totalPages: Array<number> = [];
  pageSizeOptions = [10, 20, 25, 50, 100];

  constructor(
    private datePipe: DatePipe,
    private loteService: BatchService,
    private notificationService: NotificationService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('es');
  }

  /**
   * Modifica los atributos de la paginacion
   */
  ngAfterViewChecked(): void {
    const list = document.getElementsByClassName('mat-paginator-range-label');
    const pagina = this.page + 1;
    if (list[0] && this.paginator) {
      list[0].innerHTML = 'Página: ' + pagina;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página:';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Siguiente página';
      this.paginator._intl.lastPageLabel = 'Última página';
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.getAll();
  }

  /**
   * Construye el form
   */
  buildForm(): void {
    /**
     * Formulario reactivo
     */
    this.formBatch = new FormGroup({
      id: new FormControl(null),
      idProducto: new FormControl(null),
      numero: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      albaran: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      cantidad: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        Validators.min(0),
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      fechaEntrada: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      fechaCaducidad: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      cantidadUnidad: new FormControl('', [
        Validators.min(0),
        Validators.maxLength(6),
      ]),
      cantidadTotal: new FormControl({ value: '', disabled: true }),
      observaciones: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(500),
      ]),
    });
  }

  /**
   * Limpia el formulario
   */
  clearForm() {
    this.formBatch.reset();
    Object.keys(this.formBatch.controls).forEach((key) => {
      this.formBatch.get(key)?.setErrors(null);
    });

    this.formBatch.setErrors({ invalid: true });
  }

  /**
   * Guarda o actualiza un lote
   */
  guardar(): void {
    // Se obtienen los valores del formulario y se pasan al lote
    const lote = {
      id: this.formBatch.value['id'],
      numero: this.formBatch.value['numero'],
      albaran: this.formBatch.value['albaran'],
      cantidad: this.formBatch.value['cantidad'],
      cantidadUnidad: this.formBatch.value['cantidadUnidad'],
      cantidadTotal: this.formBatch.value['mlTotacantidadTotalles'],
      fechaEntrada: this.datePipe.transform(
        this.formBatch.value['fechaEntrada'],
        'yyyy-MM-ddTHH:mm:ss'
      ),
      fechaCaducidad: this.datePipe.transform(
        new Date(this.formBatch.value['fechaCaducidad']),
        'yyyy-MM-ddTHH:mm:ss'
      ),
      observaciones: this.formBatch.value['observaciones'],
      idProducto: this.producto.id,
    } as any;

    if (!lote.id) {
      // Guarda un lote
      this.loteService.createBatch({ body: lote }).subscribe({
        next: (result: Batch) => {
          this.clearForm();
          this.notificationService.showSuccess(
            `El lote ${lote.numero} se ha guardado correctamente`
          );
          this.getAll();
        },
        error: (error: any) => {
          this.notificationService.showError(
            `Ha ocurrido un error al guardar el lote`
          );
        },
      });
    } else {
      // Actualiza un lote
      this.loteService.updateBatch({ id: lote.id, body: lote }).subscribe({
        next: (result: Batch) => {
          this.clearForm();
          this.notificationService.showSuccess(
            `El lote ${lote.numero} se ha actualizado correctamente`
          );
          this.getAll();
        },
        error: (error: any) => {
          this.notificationService.showError(
            `Ha ocurrido un error al actualizar el lote`
          );
        },
      });
    }
  }

  /**
   * Establece los valores de la peticion al formulario
   * @param result Batch
   */
  patchValue(result: Batch): void {
    this.formBatch.patchValue({
      id: result.id,
      numero: result.number,
      albaran: result.delivery_note,
      cantidad: result.product_quantity,
      cantidadUnidad: result['cantidadUnidad'],
      cantidadTotal: result['cantidadTotal'],
      fechaEntrada: this.datePipe.transform(
        new Date(result['fechaEntrada']),
        'yyyy-MM-dd'
      ),
      fechaCaducidad: this.datePipe.transform(
        new Date(result['fechaCaducidad']),
        'yyyy-MM-dd'
      ),
      observaciones: result.observations,
      idProducto: this.producto.id,
    } as any);
  }

  /**
   * Obtiene el listado de lotes asignados a un producto
   */
  getAll(): void {
    let params = {
      page: this.page,
      size: this.size,
      order: this.order,
      desc: this.desc,
      filter: this.filter,
      idProducto: this.producto.id,
    };
    this.loteService.findAllPagingBatch(params).subscribe({
      next: (result: any) => {
        this.dataSource = new MatTableDataSource<Batch>(result.content);
        this.numRegistros = this.dataSource.filteredData.length;
        this.totalPages = new Array(result.totalPages);
        this.totalRegistros = result.totalElements as number;
        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  /**
   * Elimina un registro de base de datos
   * @param registro
   */
  eliminar(lote: Batch): void {
    this.panelOpenState = false;
    this.clearForm();

    Swal.fire({
      heightAuto: false,
      title: '',
      text: `¿Está seguro que desea eliminar el lote con múmero ${lote.number}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#bb2124',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.loteService.removeBatch({ id: lote._id }).subscribe({
          next: () => {
            this.getAll();
            this.notificationService.showSuccess(
              `El lote ${lote.number} se ha eliminado correctamente.`,
              ''
            );
          },
          error: (error) => {
            this.notificationService.showError(
              `No se ha podido eliminar el lote con número ${lote.number}`,
              ''
            );
          },
        });
      }
    });
  }

  /**
   * Elimina un registro de base de datos
   * @param registro
   */
  limpiar(lote: Batch): void {
    this.panelOpenState = false;
    this.clearForm();

    Swal.fire({
      heightAuto: false,
      title: '',
      text: `¿Está seguro que desea poner a 0 las unidades del lote con múmero ${lote.number}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#bb2124',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        lote['cantidadTotal'] = 0;
        lote.quantity_per_unity = 0;

        // Actualiza un lote
        this.loteService.updateBatch({ id: lote._id, body: lote }).subscribe({
          next: (result: Batch) => {
            this.clearForm();
            this.notificationService.showSuccess(
              `El lote ${lote.number} se ha actualizado correctamente`
            );
            this.getAll();
          },
          error: (error: any) => {
            this.notificationService.showError(
              `Ha ocurrido un error al actualizar el lote`
            );
          },
        });
      }
    });
  }

  /**
   * Evento emitido por mat-paginator que indica el número de página y el tamaño de página
   * @param event
   */
  paginar(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getAll();
  }

  /**
   * Envía al usuario a la pagina de form para editar un registro
   */
  getRecord(row: Batch): void {
    this.patchValue(row);
    this.panelOpenState = true;
  }

  /**
   * Impide hacer click en la columna seleccionada
   * @param event
   * @returns
   */
  stop(event: any) {
    this.clearForm();
    event.stopPropagation();
    return;
  }

  /**
   * Captura un evento de teclado para establecer el filtro de búsqueda segun lo que se escriba
   * @param event
   */
  search(event: any) {
    this.filter = event.target.value;
    this.getAll();
  }
}
