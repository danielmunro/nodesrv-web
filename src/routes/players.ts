import * as express from "express"
import {Repository} from "typeorm"
import {MudName} from "../constants"
import {getContainer} from "../container/containerFactory"
import {Types} from "../container/types"
import {PlayerEntity} from "../player/entity/playerEntity"

const router = express.Router()

router.get("/", async (req, res) => {
  const container = getContainer()
  const playerRepository = container.get<Repository<PlayerEntity>>(Types.PlayerRepository)

  res.render("players", {
    players: await playerRepository.find(),
    playersNav: true,
    title: `${MudName} - Players`,
  })
})

router.get("/:uuid", async (req, res) => {
  const container = getContainer()
  const playerRepository = container.get<Repository<PlayerEntity>>(Types.PlayerRepository)
  const player = await playerRepository.findOne({ uuid: req.params.uuid })

  res.render("player", {
    player,
    playersNav: true,
    title: "Player Details",
  })
})

export default router
