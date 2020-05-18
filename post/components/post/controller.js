const{ nanoid} = require("nanoid");
const TABLA = "post"

module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store = require("../../../store/dummy")
    }

    function list(){
     return   store.list(TABLA)
    }

    function get(id){
        return store.get(TABLA, id)
    }

    async function upsert(data){
        const post={
            title: data.title,
            text: data.text,
            user: data.user
        }

        if(data.id){
            post.id = data.id;
        }else{
            post.id= nanoid()
        }

        return store.upsert(TABLA, post)
    }

    return{
    list,
    get,
    upsert
    }
}