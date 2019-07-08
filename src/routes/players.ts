import * as express from "express"
import {getConnection} from "typeorm"
import {PlayerEntity} from "../player/entity/playerEntity"
import {MudName} from "../constants"

const router = express.Router()

router.get("/", async (req, res) => {
  const connection = await getConnection()
  const playerRepository = connection.getRepository(PlayerEntity)

  res.render("players", {
    players: await playerRepository.find(),
    title: `${MudName} - Players`,
    playersNav: true,
  })
})

router.get("/:uuid", async (req, res) => {
  const connection = await getConnection()
  const playerRepository = connection.getRepository(PlayerEntity)
  const player = await playerRepository.findOne({ uuid: req.params.uuid })

  res.render("player", {
    player,
    title: `Player ${player.firstName} ${player.lastName}`,
    playersNav: true,
  })
})

module.exports = router
