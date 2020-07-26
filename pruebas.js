function main() {
    const persona = {
        nombre: 'mauro',
        apellido: 'neagoe',
        edad: 37,
    }
    
    const frutas = ['manzana', 'banana', 'pera'];
    const {nombre, apellido, edad} = persona;
    const clone = persona;
    console.log(...frutas);
    frutas.forEach(fruta => console.log(fruta));
}
main();