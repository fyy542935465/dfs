const mysql = require('mysql')
const config = {
    user: 'root',
    password: 'fyy123456',
    port: '3306',
    host: '127.0.0.1',
    database: 'blog'
}


const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

const query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}

module.exports = {
    query
}