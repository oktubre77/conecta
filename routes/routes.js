const {Router} = require ('express');
const router = Router();
const DB = require('../config/config.js')
const config = require("../config/configsql.js");
const connStr = require("../config/configdb2.js");
const sqlConnection = require("../config/sql.js");
const sql1 = new sqlConnection(config.connectionSQL);
const ibmdb = require('ibm_db');

router.get('/',(req,res)=>{

    res.status(200).json({
        message:"ruta status 200 OK"

    });
})

router.get('/fromoracle',async(req,res)=>{
   const datos=[];
   const sql ="SELECT ORDERS_ID,TOTALPRODUCT,TOTALSHIPPING,STATUS  FROM  ORDERS WHERE substr(lastupdate,0,10) IN to_char((select sysdate from dual)) AND STATUS IN('G','R','M') ";
   //let sql ="select * from comreg where NAME like '%DATALOAD_PRICE_PURGE_PORCENTAGE_MAX%'";

    const result =await DB.open(sql,[]);
    console.log(result.rows[0]['ORDERS_ID']);
    //console.log(datos)

    result.rows.map(dato=>{
        let userSchema = {
            ORDERS_ID :dato[0],
            TOTALPRODUCT :dato[1],
            TOTALSHIPPING :dato[2],
            STATUS :dato[3],
         }
        datos.push(userSchema)
    });
    res.json({datos})
});

router.get('/fromsql',async(req,res)=>{
    
    try {
        let select = await sql1.select("TRANSACCIONES","TIPOSTRANSACCION");
        res.json({select})
       
    } catch (error) {
        sql1.close();
        console.log(error);
    }
    
});

router.get('/fromdb2',async(req,res)=>{

    ibmdb.open(connStr, function (err,conn) {
    if (err) return console.log(err);
    
    conn.query('select id_pedido,id_pedido_f2, FCREACION, HCREACION, LOC.COD_LOCAL,E.NOMBRE estado from bo_pedidos PE inner join BO_LOCALES LOC ON PE.ID_LOCAL = LOC.ID_LOCAL inner join bo_estados E ON PE.id_estado = E.id_estado where FCREACION = current date order by HCREACION asc', function (err, data) {

      if (err) console.log(err);
      else //console.log(data);
      res.json({data})
      conn.close(function () {
        console.log('done');
      });
    });
  });

  /*  try {
        let select = await sql1.select("tarjetas");
        console.log(select.recordset);
    } catch (error) {
        sql.close();
        console.log(error);
    }*/
    
});

module.exports =router;