const oracledb = require('oracledb');
try {
    oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_19_10'});
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
  }


db ={
    user:process.env.USER_ORACLE,
    password:process.env.PASSW_ORACLE,
    connectString:process.env.BD_ORACLE
}
async function open(sql, binds){
    try {
    let con = await oracledb.getConnection(db);
    let result = await con.execute(sql,binds);
    con.release();
    
    return result;
    
} catch(err) {
    console.log(err);
}
console.log(result);   
    
}

exports.open = open;

