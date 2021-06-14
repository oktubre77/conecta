var ibmdb = require('ibm_db');
var connStr = "DATABASE=EASYAR;HOSTNAME=172.26.228.72;UID=bodba;PWD=bodba;PORT=50000;PROTOCOL=TCPIP";

ibmdb.open(connStr, function (err,conn) {
    if (err) return console.log(err);
    
    conn.query('select *from BO_Estados', function (err, data) {
      if (err) console.log(err);
      else console.log(data);
  
      conn.close(function () {
        console.log('done');
      });
    });
  });
/*
ibmdb.open("DRIVER={DB2};DATABASE=EASYAR;HOSTNAME=172.26.228.72;UID=bodba;PWD=bodba;PORT=50000;PROTOCOL=TCPIP", 
function (err,conn) {

if (err) return console.log(err);

conn.query('select *from BO_Estados', function (err, data) {

if (err) console.log(err);

else console.log(data);

conn.close(function () {

console.log('done');

});

});

});*/