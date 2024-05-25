import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './repositories/dto/create-payment.dto';

@ApiTags('Payment')
@ApiBearerAuth()
@Roles(Role.Admin, Role.Dono)
@UseGuards(AuthGuard, RolesGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() data: CreatePaymentDto): Promise<any> {
    return this.paymentService.createPayment(data);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.paymentService.findAll();
  }
}
