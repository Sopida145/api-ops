import { Prop } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';

export class NoteEntity {
  @Expose({ name: 'id' })
  @Transform(({ obj }) => (obj._id ? obj._id.toString() : null), {
    toClassOnly: true,
  })
  public id: string;

  // @Expose()
  // @Prop({ type: String, unique: true, required: true })
  // name: string;
  @Expose()
  @Prop({ type: String, required: true, unique: true })
  hn: string;

  @Expose()
  @Prop({ type: String })
  bloodPressure: string;

  @Expose()
  @Prop({ type: String })
  s: string;

  @Expose()
  @Prop({ type: String })
  o: string;

  @Expose()
  @Prop({ type: String })
  a: string;

  @Expose()
  @Prop({ type: String })
  p: string;

  // @Expose()
  // @Prop({ type:  String })
  // visitDate: String;

  @Prop({ required: true }) 
  companyId: string;
  
  @Expose()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Expose()
  @Prop({ type: Date })
  updatedAt: Date;

  @Expose()
  @Prop({ type: Object })
  createdBy: any;

  @Expose()
  @Prop({ type: Object })
  updatedBy: any;


  // add field
  

}
