import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LocalidadService } from 'src/app/api/services/localidad.service';
import { ProvinciaService } from 'src/app/api/services/provincia.service';
import { Cliente } from 'src/app/models/cliente';
import { Localidad } from 'src/app/models/localidad';
import { Provincia } from 'src/app/models/provincia';


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente = new Cliente();

  provincias: Provincia[] = [];
  localidades: Localidad[] = [];

  constructor(private provinciaService: ProvinciaService, private localidadService: LocalidadService) { }

  ngOnInit(): void {

  this.getLocalidades();
  this.getProvincias();

  }


  saveClient() {
    console.log(this.cliente)
  }


  async getProvincias() {
    const results = await lastValueFrom(this.provinciaService.findAllPagingProvince({filtro: '', pagina: '0', pageSize: '99999'})) as  any;
    this.provincias = results.data;

  }

  async getLocalidades() {
    const results = await lastValueFrom(this.localidadService.findAllPagingLocalities({filtro: '', pagina: '0', pageSize: '99999'})) as any;
    this.localidades = results.data;

  }
}
