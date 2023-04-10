import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente = new Cliente();

  constructor() { }

  ngOnInit(): void {
  }


  saveClient() {
    console.log(this.cliente)
  }

}
