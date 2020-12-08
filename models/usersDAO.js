var connection = require('./db')

exports.selectUser = function(ID, cb){
    connection.query('SELECT * FROM users WHERE ID = ?', [ID], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}