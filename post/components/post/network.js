const express = require("express");

const response = require("../../../network/response");
const controller = require("./index");
const secure = require("./secure");
const router = express.Router();

//routes

router.get("/", list)

router.get("/:id", get)

router.post("/", upsert)

router.put("/", secure("update"), upsert)

//functions

function list(req,res,next){
    controller.list()
        .then((data)=>{
            response.success(req,res,data,200)
        })
        .catch(next)
    
}

function get(req,res,next){
    controller.get(req.params.id)
      .then((post)=>{
          response.success(req,res,post,200)
      })
      .catch(next)

}

function upsert(req,res,next){
    controller.upsert(req.body)
      .then((post)=>{
          response.success(req,res,post,201)
      })
      .catch(next)
}

module.exports =router