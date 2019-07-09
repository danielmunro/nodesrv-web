import * as express from "express"
import {Repository} from "typeorm"
import {PlayerEntity} from "../player/entity/playerEntity"
import {MudName} from "../constants"
import {getContainer} from "../container/containerFactory"
import {Types} from "../container/types"

const router = express.Router()

router.get("/", async (req, res) => {
  const container = getContainer()
  const playerRepository = container.get<Repository<PlayerEntity>>(Types.PlayerRepository)

  res.render("players", {
    players: await playerRepository.find(),
    title: `${MudName} - Players`,
    playersNav: true,
  })
})

router.get("/:uuid", async (req, res) => {
  const container = getContainer()
  const playerRepository = container.get<Repository<PlayerEntity>>(Types.PlayerRepository)
  const player = await playerRepository.findOne({ uuid: req.params.uuid })

  res.render("player", {
    player,
    title: "Player Details",
    playersNav: true,
  })
})

export default router
