import { Test, TestingModule } from '@nestjs/testing';
import { NoroService } from './noro.service';

describe('NoroService', () => {
  let service: NoroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoroService],
    }).compile();

    service = module.get<NoroService>(NoroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
