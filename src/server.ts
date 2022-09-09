import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
import note from "./route/note"
import bodyParser from "body-parser"

const app = express()

app.use(express.json())
app.use(bodyParser.json())

app.use("/note", note)

const port = process.env.API_PORT || 3000

app.listen(port, () =>
  console.log(`Demo Content API is running at http://localhost:${port}`)
)
