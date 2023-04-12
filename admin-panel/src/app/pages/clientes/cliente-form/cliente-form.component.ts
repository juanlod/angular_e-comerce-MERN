import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Localidad } from 'src/app/models/localidad';
import { Provincia } from 'src/app/models/provincia';
import { LocalidadService } from 'src/app/services/localidad.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

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
    const results = await lastValueFrom(this.provinciaService.getAllProvincias())
    this.provincias = results.data;
  }

  async getLocalidades() {
    const results = await lastValueFrom(this.localidadService.getAllLocalidades())
    this.localidades = results.data;
    console.log(results)
  }
}
