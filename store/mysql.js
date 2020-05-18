const mysql = require("mysql");

const config = require("../config");

const dbconf = {
    host:config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let connection;

function handleCon(){
    connection = mysql.createConnection(dbconf);

    connection.connect((err)=>{
        if(err){
            console.error("[DB ERROR]", err)
            setTimeout(handleCon, 2000);
        }else{
            console.log("DB Connected!")
        }
    });

    connection.on("error", err =>{
        console.error("[DB ERROR]", err)
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            handleCon()
        }else{
            throw err;
        }
    })

}

handleCon()

function list(table){
    return new Promise( (resolve,reject)=>{
        connection.query(` SELECT * FROM ${table} `, (err,data)=>{
            if(err) return reject(err);

            resolve(data)
        })
    } )
}

async function get(table , id){
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`,(err,result)=>{
            if(err) return reject(err);

            resolve(result)
        });
    });
}





const upsert = async (table, payload) => new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [payload, payload], (error, data) => {
      console.log('UPDATE DATA: ', data)
      if (error) {
        return reject(error)
      }
      resolve(data)
    })
  })


function query(table, query,join){
    let joinQuery="";
    if(join){
        const key = Object.keys(join)[0];
        const value = join[key];
        joinQuery= `JOIN ${key} ON ${table}.${value} = ${key}.id`
    }

    return new Promise( (resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (err,result)=>{
            if(err) return reject(err);

            resolve(result[0]) || null;
        });
    } );
}
module.exports={
    list,
    get,
    upsert,
    query
}