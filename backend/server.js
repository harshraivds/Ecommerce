const app = require("./app")
const dotenv = require('dotenv')
const connectDatabase = require("./config/database")

//handling uncaught Expception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1)
})

//config
dotenv.config({ path: "backend/config/config.env" });

// oonnecting to database
connectDatabase()


// console.log(youtube)
const server = app.listen(process.env.PORT, () => {
    console.log(`server is listining on http://localhost:${process.env.PORT}`)
})

//Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`error ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1)
    })
})


