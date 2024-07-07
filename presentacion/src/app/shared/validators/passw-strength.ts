import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwStrenthValidator() : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {

        const valor = control.value;

        if(!valor){
            return null;
        }

        //A-Z   a-z  0-9  $-@&#=
        const hasUpperCase = /[A-Z]+/.test(valor);
        const hasLowerCase = /[a-z]+/.test(valor);
        const hasNumber = /[0-9]+/.test(valor);
        const hasSpecial = /[#-&*@]+/.test(valor);

        const passwValido = hasUpperCase && hasLowerCase && hasNumber && hasSpecial;

        return !passwValido ? { passwStrenth : true } : null;
    }
}