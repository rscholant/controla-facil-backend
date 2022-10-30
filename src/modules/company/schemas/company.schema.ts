import { User } from '@modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class Company {
  @Prop()
  @Expose()
  name: string;

  @Prop()
  @Expose()
  socialName: string;

  @Prop({ unique: true })
  @Expose()
  cnpj: string;
}

export type CompanyDocument = Company & Document;
const schema = SchemaFactory.createForClass(Company);

schema.set('timestamps', {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

schema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'companyId',
  justOne: false,
});

schema.set('toJSON', { virtuals: true });
export const CompanySchema = schema;
