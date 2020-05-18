const express = require("express");

const auth = require("./components/auth/network");
const user = require("./components/user/network");
const config = require("../config")
const bodyParser = require("body-parser");
const swaggerUi  = require("swagger-ui-express")
const swaggerDoc = require("./swagger.json")
const errors = require("../network/errors");
const app= express();


app.use(bodyParser.json())

//          ROUTER
app.use("/api/user", user);
app.use("/api/auth", auth)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use(errors)

app.listen(config.api.port, ()=>{
    console.log("api inicializada en ", config.api.port)
});
//        /ROUTER
