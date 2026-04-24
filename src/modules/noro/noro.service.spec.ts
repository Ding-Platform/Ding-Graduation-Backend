import { Test, TestingModule } from '@nestjs/testing';
import { NoroService } from './noro.service';
import { DatabaseService } from '../../configs/database/database.service';

describe('NoroService', () => {
  let service: NoroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoroService,
        {
          provide: DatabaseService,
          useValue: {
            noroChat: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<NoroService>(NoroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
