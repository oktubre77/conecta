const oracledb = require('oracledb');
try {
    oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_19_10'});
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
  }


db ={
    user:'orainst1',
    password:'Easy0123',
    connectString:"(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=104.239.218.158)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=EYCOMARP)))"
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

