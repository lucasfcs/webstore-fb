import { Test, TestingModule } from '@nestjs/testing';
import { InputService } from './input.service';

describe('InputService', () => {
  let service: InputService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InputService],
    }).compile();

    service = module.get<InputService>(InputService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
