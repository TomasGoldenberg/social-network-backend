const express = require("express");

const bodyParser = require("body-parser");
const config = require("../config");

const app= express();
const router = require("./network")

app.use(bodyParser.json());

//ROUTES

app.use("/", router)

app.listen(config.mysqlService.port, ()=>{
    console.log("Servicio de mysql inicializado en"
    ,config.mysqlService.port )
})