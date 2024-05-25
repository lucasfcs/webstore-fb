import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { AnalysisService } from './analysis.service';

@ApiTags('Analysis')
@ApiBearerAuth()
@Roles(Role.Admin, Role.Dono)
@UseGuards(AuthGuard, RolesGuard)
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get()
  async getAnalysis(): Promise<any> {
    const result = await this.analysisService.getAnalysis();
    return result;
  }
}
