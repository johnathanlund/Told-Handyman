var mysql=require('mysql');
var connection=mysql.createPool({

  host     : 'localhost',
  user     : 'jal',
  // password : 'root',
  database : 'node_shop'


});
module.exports=connection;
