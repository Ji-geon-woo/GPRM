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

exports.insertUser = function(body, cb){
    sql = 'INSERT INTO users (ID, role, PW) VALUES(?, ?, ?)';
    values = [body.id, body.role, body.password1];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            cb();
        }
    })
}