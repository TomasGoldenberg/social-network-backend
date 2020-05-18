const db = {
    "user":[
        {id:"1" , name:"tomas", email:"tomasgoldenberg@hotmail.com"},
        {id:"2" , name:"melina", email:"melxviera@hotmail.com"}
    ],
};

async function list(table){
    return db[table] || [];
}

async function get(table , id){
    let collection =await list(table)

    return collection.filter(item => item.id === id);
}

function upsert(table,data){   //upsert = update + insert
if(!db[table]){
    db[table] =[ ]
}
    db[table].push(data)

    console.log(db)
}

function remove(table,id){
    return true
}

async function query(table, querys){
    let col = await list(table);
    let keys = Object.keys(querys);
    let key = keys[0];
    return col.filter(item => item[key] === querys[key])[0] || null;

}


module.exports={
    list,
    get,
    upsert,
    remove,
    query
}