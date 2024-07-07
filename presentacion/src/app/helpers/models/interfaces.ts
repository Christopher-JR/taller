export interface TipoCliente{
  id : number,
  idUsuario : string,
  nombre : string,
  apellido1 : string,
  apellido2 : string,
  telefono : string,
  celular : string,
  direccion : string,
  correo : string,
  fechaIngreso : string
};

export interface IUser{
  idUsuario : string,
  nombre : string,
  rol : number
};

export interface Token{
  token : string,
  tkRef : string
}