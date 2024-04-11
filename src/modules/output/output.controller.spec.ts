import { Test, TestingModule } from '@nestjs/testing';
import { OutputController } from './output.controller';
import { OutputService } from './output.service';

describe('OutputController', () => {
  let controller: OutputController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutputController],
      providers: [OutputService],
    }).compile();

    controller = module.get<OutputController>(OutputController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
