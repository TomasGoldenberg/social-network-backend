module.exports={
    remoteDB:process.env.REMOTE_DB || false,
    api:{
        port: process.env.API_PORT || 3000
    },
    jwt:{
        secret:process.env.JWT_SECRET ||"NO SECRET"
    },
    mysql:{
        host: process.env.MYSQL_HOST || "remotemysql.com",
        user: process.env.MYSQL_USER|| "i4ifwNuCCc",
        password: process.env.MYSQL_PASS || "ZqUDG2jiGk",
        database: process.env.MYSQL_DB|| "i4ifwNuCCc",

    },
    mysqlService:{
        host: process.env.MYSQL_SRV_HOST || "localhost",
        port: process.env.MYSQL_SRV_PORT || 3001
    },
    post:{
        port: process.env.POST_PORT ||3002
    },
    cacheService:{
        host: process.env.MYSQL_SRV_HOST || "localhost",
        port: process.env.MYSQL_SRV_PORT || 3003
    }
}