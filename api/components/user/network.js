const express = require("express");
const secure = require("./secure");
const response = require(".response./../../network/response")
const controller = require("./index")

const router = express.Router();

//ROUTES
router.get("/", list)

router.get("/:id", get)

router.get("/:id/following",following)

router.post("/",upsert);

router.post("/follow/:id", secure("follow"), follow)

router.put("/",secure("update"),upsert)//update es la accion que le pasamos al switch de secure


//internal function

function list(req,res, next){
    controller.list()
    .then((lista)=>{
        response.success(req,res,lista,200)
    })
    .catch(next);
};

function get (req,res,next){
    controller.get(req.params.id)
    .then((user)=>{
        response.success(req,res,user,200)
    })
    .catch(next);
};

function follow(req, res, next) {
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}


function following(req ,res,next){
    return controller.following(req.params.id)
        .then((data)=>{
            response.success(req,res,data,200)
            console.log(data)
        })
        .catch(next)
    
}


function upsert(req ,res, next){
    controller.upsert(req.body)
    .then((user)=>{
        response.success(req,res,user,201)
    })
    .catch(next);
};


module.exports = router;