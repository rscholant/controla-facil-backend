import { PingResponse } from '@interfaces/ping-response.interface';
import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllowAny } from '@shared/custom-decorators';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowAny()
  @Get('ping')
  @ApiOperation({
    summary: 'Consulta status do serviço',
    description: `Rota utilizada para consultar o status do sistema e de suas
    dependências.`,
  })
  @ApiOkResponse({
    description: 'Serviço online.',
  })
  @ApiServiceUnavailableResponse({
    description: 'Serviço offline ou instável',
    type: PingResponse,
  })
  ping() {
    return this.appService.ping();
  }
}
