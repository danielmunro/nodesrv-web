import * as express from "express"
import {getConnection} from "typeorm"
import {PlayerEntity} from "../player/entity/playerEntity"

const router = express.Router()

router.get("/", async (req, res) => {
  const connection = await getConnection()
  const playerRepository = await connection.getRepository(PlayerEntity)

  res.render("players", {
    players: await playerRepository.find(),
    title: "Players",
    playersNav: true,
  })
})

router.get("/:uuid", async (req, res) => {
  const connection = await getConnection()
  const playerRepository = await connection.getRepository(PlayerEntity)
  const player = await playerRepository.findOne({ uuid: req.params.uuid })

  res.render("player", {
    player,
    title: `Player ${player.firstName} ${player.lastName}`,
    playersNav: true,
  })
})

module.exports = router
