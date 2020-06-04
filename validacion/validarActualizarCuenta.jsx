export default function validarActualizarCuenta(valores) {

  let errores = {};

  // Validar el nombre del usuario
  if(!valores.name) {
      errores.name = "El Nombre es obligatorio";
  }

  // Validar el apellido del usuario
  if(!valores.last_name) {
    errores.last_name = "El Apellido es obligatorio";
  }

 /*  // validar el email
  if(!valores.email) {
      errores.email = "El Email es Obligatorio";
  } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email) ) {
      errores.email = "Email no válido"
  } */

  // validar el password
  if(!valores.password) {
      errores.password = "El password es obligatorio";
  } else if( valores.password.length < 6 ) {
      errores.password = 'El password debe ser de al menos 6 caracteres'
  }

  return errores;
}