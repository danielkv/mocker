import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Project {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  /*  @ManyToOne(() => User)
  user: User; */
}
