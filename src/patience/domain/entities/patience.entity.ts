import { Prop } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';

export class PatienceEntity {
  @Expose({name: 'id' })
  @Transform(({ obj }) => (obj._id ? obj._id.toString() : null), {
    toClassOnly: true,
  })
  public id: string;

  // @Expose()
  // @Prop({ type: String, unique: true, required: false })
  // name: string;
  

  @Expose()
  @Prop({ type: String, required: true, unique: true })
  hn: string;

  @Expose()
  @Prop({ type: String, required: true})
  firstName: string;

  @Expose()
  @Prop({ type: String, required: true})
  lastName: string;

  @Expose()
  @Prop({ type: String, required: true})
  dob: string;

  @Expose()
  @Prop({ type: String, required: true})
  idCard: string;

  @Expose()
  @Prop({ type: String, required: true})
  phone: string;

  @Expose()
  @Prop({ type: String, required: true})
  Address: string;





  

  @Expose()
  @Prop({ type: String, required: true })
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
}
