const {Sequelize} = require('sequelize');

class Conexion {
    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });
    }

    conectar = () => {
        this.db.authenticate().then(() => {
            console.log('Connection has been established successfully.')
        }).catch(() => {
            console.error('Unable to connect to the database: ')
        })
    }

    desconectar = () => {
        console.log('Connection has been closed successfully.')
        process.on('SIGINT', () => Conexion.close())
    }

}

module.exports = Conexion