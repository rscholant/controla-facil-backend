import { DefaultCrudService } from '@helpers/default-crud-service';
import { User } from '@modules/users/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService extends DefaultCrudService<User> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }
}
