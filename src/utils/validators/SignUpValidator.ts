export const validatesSignUp = (values: any) => {
    const errors: any = {};
    if (!values.email) {
        errors.email = '- Este campo es obligatorio'
    } else {
        if (!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            errors.email = "- No es una dirección de correo valida"
        }
    }
    if (!values.password) {
        errors.password = '- Este campo es obligatorio'
    } else {
        if (values.password.lenght < 8) {
            errors.username = '- La contraseña debe tener al menos 4 caracteres'
        }
    } 
    if (!values.name) {
        errors.name = '- Este campo es obligatorio'
    }

    if (!values.lastName) {
        errors.lastName = '- Este campo es obligatorio'
    }

    if (!values.idPerson) {
        errors.idPerson = '- Es Obligatorio usar una identificación'
    } else {
        try {
            Number(values.idPerson);
        } catch (error) {
            errors.idPerson = " - Esta no es una identificación valida"
        }
    }


    return errors
}