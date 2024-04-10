const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subir_archivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        let { archivo } = files

        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        //Validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
        }

        let nombreTemp = uuidv4()
        const devolver = [nombreTemp, '.' + extension]

        nombreTemp = nombreTemp + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
            resolve(devolver)
        })
    })
}
module.exports = {
    subir_archivo
}