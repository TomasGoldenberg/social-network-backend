const auth = require("../../../auth")
const TABLA = "auth";
const bcrypt = require("bcrypt");

module.exports= function(injectedStore){
    const store = injectedStore;
    if(!store){
        store = require("../../../store/dummy");
    }


    async function login (username, password){
        const data = await store.query(TABLA,{ username: username})
        return bcrypt.compare(password, data.password)
          .then(sonIguales =>{
            if(sonIguales === true){
                return auth.sign(JSON.parse(JSON.stringify(data)))//generar token
            }else{
                throw new Error("Usuario o contraseña no validas")
            }
          });
        
    }

    async function upsert(data){
        const authData={
            id: data.id
        }

        if(data.username){
            authData.username= data.username
        }

        if(data.password){
            authData.password= await bcrypt.hash(data.password,5)
        }

        return store.upsert(TABLA, authData)
    }

    return{
        upsert,
        login
    }
}