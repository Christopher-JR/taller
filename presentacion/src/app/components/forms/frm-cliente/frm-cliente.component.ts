import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
//import { ClienteService } from '../../../helpers/services/cliente.service';
import { ClienteService } from '../../../shared/services/cliente.service';
import { NgIf } from '@angular/common';
import { DialogoGeneralComponent } from '../dialogo-general/dialogo-general.component';

@Component({
  selector: 'app-frm-cliente',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    ReactiveFormsModule, NgIf
  ],
  templateUrl: './frm-cliente.component.html',
  styleUrl: './frm-cliente.component.scss'
})
export class FrmClienteComponent implements OnInit {
  titulo! : string;

  private data = inject(MAT_DIALOG_DATA);
  private builder = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private srvCliente = inject(ClienteService);
  dialogRef = inject(MatDialogRef<FrmClienteComponent>)
  myForm : FormGroup;
  constructor(){
    this.myForm = this.builder.group({
      id : [0],
      idUsuario : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15),
        Validators.pattern("[0-9]*")
      ]],
      nombre : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30),
        Validators.pattern("([A-Za-zñÑáéíóú]*)( ([A-Za-zñÑáéíóú]*)){0,1}")
      ]],
      apellido1 : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15),
        Validators.pattern("[A-Za-zñÑáéíóú]*")]],
      apellido2 : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15),
        Validators.pattern("[A-Za-zñÑáéíóú]*")]],
      telefono : ['', [Validators.required, Validators.pattern("[0-9]{8}")]],
      celular : ['', [Validators.required, Validators.pattern("[0-9]{8}")]],
      direccion : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      correo : ['', [Validators.required, Validators.email]]
    }); 
  }

  get F(){
    return this.myForm.controls;
  }

  onGuardar(){
    //console.log(this.myForm.value);
    //console.log(this.myForm);
    
    if(!this.myForm.valid) return;

    if(this.myForm.value.id === 0){
      this.srvCliente.guardarCliente(this.myForm.value)
        .subscribe({
          complete : () => {
            this.dialog.open(DialogoGeneralComponent, {
              data : {
                texto : 'Cliente creado correctamente',
                icono : 'check',
                textoAceptar : ' Aceptar ',
              }
            });
            this.dialogRef.close();
          },
          error : (e) => {
            switch (e) {
              case 409 :
                this.dialog.open(DialogoGeneralComponent, {
                  data : {
                    texto : 'Error id cliente o correo duplicado',
                    icono : 'error',
                    textoAceptar : ' Aceptar ',
                  }
                });
                break;
                default :
                  this.dialog.open(DialogoGeneralComponent, {
                    data : {
                      texto : 'Error no especificado',
                      icono : 'error',
                      textoAceptar : ' Aceptar ',
                    }
                  });
                }
              }
            })

      //.subscribe(res=>console.log(res));
    }else{
      this.srvCliente.guardarCliente(this.myForm.value, this.myForm.value.id)
      .subscribe(res=>console.log(res));
    }
    
  }

  ngOnInit(): void{
    this.titulo = this.data.title;
    //console.log(this.data);
    if(this.data.datos){
      this.myForm.setValue({
        id : this.data.datos[0].id,
        idUsuario : this.data.datos[0].idUsuario,
        nombre : this.data.datos[0].nombre,
        apellido1 : this.data.datos[0].apellido1,
        apellido2 : this.data.datos[0].apellido2,
        telefono : this.data.datos[0].telefono,
        celular : this.data.datos[0].celular,
        direccion : this.data.datos[0].direccion,
        correo : this.data.datos[0].correo
      });
      this.myForm.controls['idUsuario'].disable();
    }
  }
}


