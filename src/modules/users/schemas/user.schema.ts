import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop()
  @Expose()
  name: string;

  @Prop({ unique: true })
  @Expose()
  email: string;

  @Prop()
  password: string;
}

export type UserDocument = User & Document;
const schema = SchemaFactory.createForClass(User);

schema.set('timestamps', {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

export const UserSchema = schema;
