const express = require("express");

const bodyParser = require("body-parser");
const config = require("../config");

const app= express();
const router = require("./network")

app.use(bodyParser.json());

//ROUTES

app.use("/", router)

app.listen(config.cacheService.port, ()=>{
    console.log("Servicio de cache inicializado en"
    ,config.cacheService.port )
})