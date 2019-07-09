import {Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {MobEntity} from "../../mob/entity/mobEntity"

@Entity()
export class PlayerEntity {

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Generated("uuid")
  public uuid: string

  @Column({ nullable: true })
  public firstName: string

  @Column({ nullable: true })
  public lastName: string

  @Column()
  public email: string

  @Column()
  public password: string

  @Column()
  public kills: number

  @Column()
  public deaths: number

  @CreateDateColumn()
  public created: string

  @Column("timestamp", { nullable: true })
  public lastLogin: string

  @OneToMany(() => MobEntity, mob => mob.player)
  public mobs: MobEntity[]
}
