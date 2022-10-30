import { Company } from '@modules/company/schemas/company.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User {
  @Prop()
  @Expose()
  name: string;

  @Prop({ unique: true })
  @Expose()
  email: string;

  @Expose()
  company: Company;

  @Prop()
  password: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  companyId: string;
}

export type UserDocument = User & Document;
const schema = SchemaFactory.createForClass(User);

schema.set('timestamps', {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

schema.set('toJSON', { virtuals: true });

schema.virtual('company', {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true,
});

export const UserSchema = schema;
