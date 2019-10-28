export const ProductValidator = (values: any) => {
    const errors: any = {};
    if (!values.name) {
        errors.name = 'Debe agregar un nombre al producto'
    } 
    if (!values.price) {
        errors.price = 'Debe agregar un precio al producto'
    } 
    if (!values.stock) {
        errors.stock = 'Debe agregar la cantidad de inventario al producto'
    } 
    if (!values.categoryId) {
        errors.categoryId = 'Debe seleccionar una categoría'
    } 
    return errors
}