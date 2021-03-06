const express = require("express");
const response = require("../network/response")
const store = require("../store/mysql");

const router = express.Router();
//ROUTES

router.get("/:table", list)

router.get("/:table/:id" , get)

router.post("/:table" , upsert)

router.put("/:table" , upsert)

//functions

async function list(req,res,next){
    const datos = await store.list(req.params.table)
    response.success(req,res,datos,200)
}

async function get(req,res,next){
    const datos = await store.get(req.params.table, req.params.id)
    response.success(req,res,datos,200)
}

async function upsert(req,res,next){
    const datos = await store.upsert(req.params.table, req.body)
    response.success(req,res,datos,200)
}

async function query(req,res,next){
    const datos = await  store.query(req.params,table, req.body.query , req.body.join )
    response.success(req,res,datos,200)
}
module.exports = router;