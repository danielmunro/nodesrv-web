import {Entity, PrimaryGeneratedColumn, Column, Generated, OneToMany} from "typeorm"
import {MobEntity} from "../../mob/entity/mobEntity"

@Entity()
export class PlayerEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated("uuid")
  public uuid: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => MobEntity, mob => mob.player)
  mobs: MobEntity[]
}
