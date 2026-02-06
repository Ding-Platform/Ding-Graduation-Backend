import { Test, TestingModule } from '@nestjs/testing';
import { NoroController } from './noro.controller';

describe('NoroController', () => {
  let controller: NoroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoroController],
    }).compile();

    controller = module.get<NoroController>(NoroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
