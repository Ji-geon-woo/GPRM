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
    sql = 'INSERT INTO users (ID, PW, role, name) VALUES(?, ?, ?, ?)';
    values = [body.ID, body.PW1, body.role, body.name];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            cb();
        }
    })
}