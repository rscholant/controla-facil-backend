import { DefaultPaginatedQueryRequest } from '@interfaces/request';
import {
  DefaultErrorResponse,
  DefaultPaginatedResponse,
  DefaultSingleResponse,
} from '@interfaces/response';
import { Company } from '@modules/company/schemas/company.schema';
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
import { Serialize } from '@shared/custom-decorators';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
@ApiTags('Empresas')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de empresas',
    description: `Rota para criação de empresas.`,
  })
  @ApiCreatedResponse({
    description: 'Retorna a empresa criado',
    type: DefaultSingleResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro de validação de dados.',
    type: DefaultErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno',
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Consulta de empresas',
    description: `Rota para consulta de empresas de forma paginada,
    para que seja de melhor consumo através do frontend.`,
  })
  @ApiOkResponse({
    description: 'Retorna os dados das empresas requisitados.',
    type: DefaultPaginatedResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno',
  })
  @ApiUnauthorizedResponse({ description: 'Usuário não autorizado.' })
  @Serialize(Company)
  findAll(@Query() query?: DefaultPaginatedQueryRequest) {
    return this.companyService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consulta de empresa',
    description: `Rota para consulta de uma única empresa.`,
  })
  @ApiOkResponse({
    description: 'Retorna a empresa solicitada',
    type: DefaultSingleResponse,
  })
  @ApiUnauthorizedResponse({ description: 'usuário não autorizado.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno',
  })
  @ApiParam({ name: 'id', description: 'ID do empresa a ser consultado' })
  @Serialize(Company)
  findOne(@Param('id') id: string) {
    return this.companyService.findOne({ _id: id });
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Alteração de dados da empresa',
    description: `Rota para alteração de dados da empresa.`,
  })
  @ApiOkResponse({
    description: 'Retorna a empresa alterada',
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
  @ApiParam({ name: 'id', description: 'ID da empresa a ser alterado' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Desabilitação de empresa',
    description: `Rota para desabilitar o empresa.`,
  })
  @ApiNoContentResponse({
    description: 'Empresa desabilitada com sucesso.',
  })
  @ApiUnauthorizedResponse({ description: 'Usuário não autorizado.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno',
  })
  @ApiParam({ name: 'id', description: 'ID da empresa a ser desabilitada' })
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
