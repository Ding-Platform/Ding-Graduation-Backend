import { Test, TestingModule } from '@nestjs/testing';
import { NoroController } from './noro.controller';
import { NoroService } from './noro.service';

describe('NoroController', () => {
  let controller: NoroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoroController],
      providers: [
        {
          provide: NoroService,
          useValue: {
            chat: jest.fn(),
            getHistory: jest.fn(),
            transcribe: jest.fn(),
            speak: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NoroController>(NoroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
