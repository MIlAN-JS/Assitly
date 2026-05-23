import app from "./app.js";
import connectDB from "./config/db.config.js";
import config from "./config/env.config.js";





const port = config.PORT

connectDB()
app.listen(port , ()=>{
    console.log("server is running on port 3000")
})
