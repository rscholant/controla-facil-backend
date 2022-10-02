import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DefaultPaginatedQueryRequest } from '@interfaces/request';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  DefaultErrorResponse,
  DefaultPaginatedResponse,
  DefaultSingleResponse,
} from '@interfaces/response';
import { AllowAny } from '@shared/custom-decorators';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de usuários',
    description: `Rota para criação de usuários do sistema.`,
  })
  @ApiCreatedResponse({
    description: 'Retorna o usuário criado',
    type: DefaultSingleResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro de validação de dados.',
    type: DefaultErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno',
  })
  @AllowAny()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Consulta de usuários',
    description: `Rota para consulta de usuários de forma paginada,
    para que seja de melhor consumo através do frontend.`,
  })
  @ApiOkResponse({
    description: 'Retorna os dados de usuários requisitados.',
    type: DefaultPaginatedResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno',
  })
  @ApiUnauthorizedResponse({ description: 'Usuário não autorizado.' })
  @AllowAny()
  findAll(@Query() query?: DefaultPaginatedQueryRequest) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consulta de usuário',
    description: `Rota para consulta de um único usuário.`,
  })
  @ApiOkResponse({
    description: 'Retorna o usuário solicitado',
    type: DefaultSingleResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Usuário não autorizado.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário a ser consultado' })
  @AllowAny()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Alteração de dados do usuário',
    description: `Rota para alteração de dados do usuário.`,
  })
  @ApiOkResponse({
    description: 'Retorna o usuário alterado',
    type: DefaultSingleResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro de validação de dados.',
    type: DefaultErrorResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Usuário não autorizado.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário a ser alterado' })
  @AllowAny()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Desabilitação de usuário',
    description: `Rota para desabilitar o usuário.`,
  })
  @ApiNoContentResponse({
    description: 'Usuário desabilitado com sucesso.',
  })
  @ApiUnauthorizedResponse({ description: 'Usuário não autorizado.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário a ser desabilitado' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
