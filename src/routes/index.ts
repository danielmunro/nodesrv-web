import * as express from "express"
import {MudName} from "../constants"

const router = express.Router()

router.get("/", (req, res) => {
  res.render("index", {
    indexNav: true,
    title: `${MudName} Home`,
  })
})

export default router
