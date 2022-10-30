import { DefaultCrudService } from '@helpers/default-crud-service';
import { DefaultSingleResponse } from '@interfaces/response';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { User } from '@modules/users/schemas/user.schema';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpBadRequestException } from '@shared/exceptions';
import { HttpPartialException } from '@shared/exceptions/http-partial.exception copy';
import { EmailService } from '@shared/send-grid/email.service';
import { Model } from 'mongoose';

@Injectable()
export class UsersService extends DefaultCrudService<User> {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private emailService: EmailService,
  ) {
    super(userModel, 'company');
  }

  async create(createDto: CreateUserDto): Promise<DefaultSingleResponse<User>> {
    try {
      const data = await this.userModel.create(createDto);
      const emailSendResponse = await this.emailService.send({
        to: createDto.email,
        subject: 'Seu acesso para o controla fácil chegou! 🎉 ',
        text: `Olá ${createDto.name}, a partir de agora, você pode acessar o seu controla fácil. 😊
        Ele será seu melhor amigo no dia a dia. Então, já salva na sua barra de favoritos!
        Acesse agora através desse link: https://controla-facil.vercel.app`,
        template: 'welcome',
        data: {
          firstName: createDto.name,
          link: 'https://controla-facil.vercel.app',
        },
      });
      if (!emailSendResponse) {
        throw new HttpPartialException('Email send error', {
          data,
          status: HttpStatus.CREATED,
          message: 'Item created.',
        });
      }
      return {
        data,
        status: HttpStatus.CREATED,
        message: 'Item created.',
      };
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        throw new HttpBadRequestException(`User already exists`);
      }
      throw new HttpBadRequestException(`Error to insert user`, { err });
    }
  }
}
