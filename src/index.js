// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/db.js";
import { app } from './app.js'
dotenv.config({
    path: './.env'
})
const PORT = process.env.PORT || 8000



connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚙️ Server is running at port : http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })




/*
; (async () => {

    try {
        await mongoose.connect(`${process.env.PORT}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log('Error', error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port http://localhost:${process.env.PORT}`)
        })
    }
    catch (error) {
        console.log('Error connecting to MongoDB');
        throw error;
    }
})
    ()


*/