import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Activities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fee: number;

  @Column()
  participants: number;

  @Column()
  content: string;

  @Column()
  startDate: Date;

  @Column()
  dueDate: Date;
}
