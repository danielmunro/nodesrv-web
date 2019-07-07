import * as express from "express"
import * as cors from "cors"
import {createConnection} from "typeorm"
import * as bodyParser from "body-parser"
const app = express()
const port = 8081

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

createConnection().then(async () => {
    app.get("/", (_, res) => {
        return res.send("ok!")
    })

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
