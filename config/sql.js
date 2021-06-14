const mssql = require('mssql');

module.exports = class Sql {
    constructor(stringConnection) {
        this.stringConnection = stringConnection;
    }

    connect() {
        mssql.on('error', err => {
            console.log(err);
            mssql.close();
        });

        return mssql.connect(this.stringConnection);
    }

    close() {
        return mssql.close();
    }

    async select(table,table1) {
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request().query(`select TI.DESCRIPCIONCORTA as OPERACION, 
                TR.CODIGODERESPUESTA,
                GLOSARESPUESTA,count(*) as TOTAL 
                from ${table} TR
                inner join ${table1}  TI ON
                TR.TIPODETRANSACCION = TI.CODIGO
                where fechaterminal=CONVERT(varchar,GETDATE(),12)
                group by GLOSARESPUESTA,TI.DESCRIPCIONCORTA,TR.CODIGODERESPUESTA
                order by count(*)  DESC				
                `);
            }).then(result => {
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

    async selectById(table, id) {
        if (id == undefined || id === 0) {
            return await this.select(table);
        } else {
            return new Promise((resolve, reject) => {
                this.connect().then(pool => {
                    return pool.request().query(`select * from ${table} where id=${id}`);
                }).then(result => {
                    mssql.close();
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }

    async execStoreProcedure(storeProcedure){
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request().execute(storeProcedure);
            }).then(result => {
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

    async execStoreProcedureById(storeProcedure, parameter){
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request()
                    .input("id", mssql.Int, parameter)
                    .execute(storeProcedure);
            }).then(result => {
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

}