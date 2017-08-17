var mysql=require('mysql');
var connection=mysql.createPool({

  host     : 'localhost',
  user     : 'jal',
  // password : 'root',
  database : 'told_handyman'


});
module.exports=connection;
