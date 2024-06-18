import { Component, ViewChild, AfterViewInit, signal, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClienteService } from '../../helpers/services/cliente.service';
import { TipoCliente } from '../../helpers/models/interfaces';

/*export interface TipoCliente{
  id : number,
  idCliente : string,
  nombre : string,
  apellido1 : string,
  apellido2 : string,
  telefono : string,
  celular : string,
  direccion : string,
  correo : string,
  fechaIngreso : string
};

const ELEMENT_DATA: TipoCliente[] = [
  {id: 1, idCliente: '011111', nombre: 'Juan', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
  {id: 2, idCliente: '021111', nombre: 'Ricardo', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
  {id: 3, idCliente: '031111', nombre: 'Pedro', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
  {id: 4, idCliente: '041111', nombre: 'Alejandro', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
  {id: 5, idCliente: '051111', nombre: 'Carlos', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
  {id: 6, idCliente: '061111', nombre: 'Felipe', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
  {id: 7, idCliente: '071111', nombre: 'Randy', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
  {id: 8, idCliente: '081111', nombre: 'Christopher', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
  {id: 9, idCliente: '091111', nombre: 'Luis', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
  {id: 10, idCliente: '101111', nombre: 'Kevin', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
  {id: 11, idCliente: '111111', nombre: 'Hector', apellido1: 'Valdez', apellido2: 'López', telefono: '2222-3333', celular: '8888-4444', direccion: 'San José', correo: 'juan.valdez@example.com', fechaIngreso: '2024-06-15'},
];*/

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule,
    MatPaginator, MatPaginatorModule, MatTableModule, MatIconModule, RouterModule, MatExpansionModule,
    MatInputModule, MatFormFieldModule
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})

export class ClienteComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'idCliente', 'nombre', 'apellido1', 'apellido2', 'botonera'];
  private readonly clienteSrv = inject(ClienteService);
  //dataSource = new MatTableDataSource<TipoCliente>(ELEMENT_DATA);
  dataSource !: MatTableDataSource<TipoCliente>; //any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  panelOpenState = signal(false);

  onEditarClick(id : string){
    alert('Se esta editando ' + id);
  }

  onEliminarClick(id : string){
    alert('Se esta eliminando ' + id);
  }

  onInfoClick(id : string){
    alert('Se muestra info de ' + id);
  }

  onNuevoClick(){
    alert('Se va a crear nuevo');
  }

  ngAfterViewInit() {
    this.clienteSrv.getAll().subscribe({
      next:(result) => {
        //console.log(result);
        this.dataSource = new MatTableDataSource<TipoCliente>(result);
        this.dataSource.paginator = this.paginator;
      },
      error:(err) => {
        console.error(err);
      }
    });
  }
}
