export const CategoryValidator = (values: any) => {
    const errors: any = {};
    if (!values.name) {
        errors.name = 'Debe agregar un nombre a la categoria'
    } 
    if (!values.description) {
        errors.description = 'Debe agregar una descripcion a la categoria'
    } 
    return errors
}