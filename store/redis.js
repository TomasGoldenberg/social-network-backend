const redis = require("redis");
const config = require("../config")

const client = redis.createClient({
	host: config.redis.host,
	port:  config.redis.port,
	password:config.redis.password,
	});

function list(table){
	return new Promise( (resolve,reject)=>{
		cliente.get(table, (err,data)=>{
		if(err) {return reject(err)}

		let res= data || null;		
		if(data){
		res.JSON.stringify(data)
		}
		resolve(res)
		
					})
						} )
}
function get(table,id){
const search = ` ${table}_${id}`
return list(search) 
}

async function upsert(table, data){
let key = table;
if(data && data.id){
	key =  key +""+ data.id
	}

client.setex(key, 10,JSON.stringify(data));//setex=Set expiratio
return true
}

module.exports={
list,
get,
upsert
}
