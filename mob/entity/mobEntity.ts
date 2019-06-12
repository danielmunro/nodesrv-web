import {Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne} from "typeorm"
import {PlayerEntity} from "../../player/entity/playerEntity"

@Entity()
export class MobEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated("uuid")
  public uuid: string

  @Column()
  public race: string

  @Column()
  public specialization: string

  @Column()
  public level: number

  @ManyToOne(() => PlayerEntity, player => player.mobs)
  public player: PlayerEntity
}
