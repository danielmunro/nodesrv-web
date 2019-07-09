import * as express from "express"
import {MudName} from "../constants"

const router = express.Router()

router.get("/", (req, res) => {
  res.render("index", {
    title: `${MudName} Home`,
    indexNav: true,
  })
})

export default router
