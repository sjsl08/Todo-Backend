const express = require('express')
const morgan = require('morgan')
const cors = require("cors")
const connectDB = require("./DB Config/DB")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(morgan('tiny'))

app.use(express.json())
app.use(cors())


app.use("/auth", require("./Routes/Auth.js"))
app.use("/todo", require("./Routes/Todo"))


let PORT = process.env.PORT || 3008

app.listen(PORT, async () => {
    try {
        await connectDB()
        console.log(`Server up at ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})