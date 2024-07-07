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
//import { ClienteService } from '../../helpers/services/cliente.service';
import { ClienteService } from '../../shared/services/cliente.service';
import { TipoCliente } from '../../helpers/models/interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FrmClienteComponent } from '../forms/frm-cliente/frm-cliente.component';
import { DialogoGeneralComponent } from '../forms/dialogo-general/dialogo-general.component';
import { UsuarioService } from '../../shared/services/usuario.service';
import { AuthService } from '../../shared/services/auth.service';
import { PrintService } from '../../shared/services/print.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule,
    MatPaginator, MatPaginatorModule, MatTableModule, MatIconModule, RouterModule, MatExpansionModule,
    MatInputModule, MatFormFieldModule, MatDialogModule
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})

export class ClienteComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'idUsuario', 'nombre', 'apellido1', 'apellido2', 'correo', 'botonera'];
  private readonly clienteSrv = inject(ClienteService);
  private readonly dialog = inject(MatDialog);
  private readonly srvUsuario = inject(UsuarioService);
  private readonly srvImpresion = inject(PrintService);
  public rol = inject(AuthService).valorUsrActual.rol;
  //dataSource = new MatTableDataSource<TipoCliente>(ELEMENT_DATA);
  dataSource !: MatTableDataSource<TipoCliente>; //any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  panelOpenState = signal(false);
  filtro : any;

  mostrarDialogo(titulo : string, datos? : TipoCliente){
    const dialogRef = this.dialog.open(FrmClienteComponent, {
      width : '40%',
      data : {
        title : titulo,
        datos : datos
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed()
    .subscribe({
      next: (res) =>{
        //console.log(res);
        if(res !== false){
          this.resetearFiltro();
          /*this.clienteSrv.getAll().subscribe({
            next : (datos) => {
              this.dataSource.data = datos;
            },
            error: (err) => {}
          })*/
        }
      },
        error: (err) => {
          console.log(err);
      }
    })
  }

  limpiar(){
    this.resetearFiltro();
    (document.querySelector('#fidUsuario') as HTMLInputElement).value = '';
    (document.querySelector('#fnombre') as HTMLInputElement).value = '';
    (document.querySelector('#fapellido1') as HTMLInputElement).value = '';
    (document.querySelector('#fapellido2') as HTMLInputElement).value = '';
  }

  resetearFiltro (){
    this.filtro = {idUsuario : '',  nombre : '', apellido1: '', apellido2: ''};
    this.filtrar();
  }

  filtrar(){
    this.clienteSrv.filtrarCliente(this.filtro) 
    .subscribe({
      next : (data) => this.dataSource.data = data,
      error: (err) => console.error(err)
    });
  }

  onFiltroChange(f : any){
    this.filtro = f;
    this.filtrar();
  }

  onEditarClick(id : number){
    this.clienteSrv.getCliente(id).subscribe({
      next : (res) => {
        //console.log(res);
        this.mostrarDialogo('Editar Cliente', res);
      },
      error : (err) => console.log(err)
    }) 
    //alert('Se va a crear nuevo');
  }

  onEliminarClick(id : number){
    const dialogRef = this.dialog.open(DialogoGeneralComponent, {
      data : {
        texto : '¿Eliminar registro seleccionado?',
        icono : 'question_mark',
        textoAceptar : ' Sí ',
        textoCancelar : ' No '
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.clienteSrv.eliminarCliente(id).subscribe((res : any) => {
          this.resetearFiltro();
          this.dialog.open(DialogoGeneralComponent, {
            data : {
              texto : 'Registro eliminado correctamente',
              icono : 'check',
              textoAceptar : ' Aceptar ',
            }
          });
        });
      }
    })
  }

  onResetearClick(idUsuario : string){
    const dialogRef = this.dialog.open(DialogoGeneralComponent, {
      data : {
        texto : '¿Seguro que desea resetear la contraseña?',
        icono : 'question_mark',
        textoAceptar : ' Sí ',
        textoCancelar : ' No '
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.srvUsuario.resetPassw(idUsuario).subscribe((res : any) => {
          this.resetearFiltro();
          this.dialog.open(DialogoGeneralComponent, {
            data : {
              texto : 'Contraseña reiniciada correctamente',
              icono : 'check',
              textoAceptar : ' Aceptar ',
            }
          });
        });
      }
    })
  }

  onInfoClick(id : string){
    alert('Se muestra info de ' + id);
  }

  onNuevoClick(){
    this.mostrarDialogo('Nuevo Cliente');
    //alert('Se va a crear nuevo');
  }

  onImprimir(){
    const encabezado = [
      'Id Cliente',
      'Nombre',
      'Telefono',
      'Celular',
      'Correo',
    ];
    this.clienteSrv.filtrarCliente(this.filtro) 
    .subscribe({
      next : (data) => {
        const cuerpo = Object(data).map((Obj : any) => {
          const datos = [
            Obj.idUsuario,
            `${Obj.nombre} ${Obj.apellido1} ${Obj.apellido2}`,
            Obj.telefono,
            Obj.celular,
            Obj.correo
          ];
          return datos;
        });
        this.srvImpresion.print(encabezado, cuerpo, 'Listado de clientes', true)
        console.log(cuerpo);
      },
      error: (err) => console.error(err)
    });
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
