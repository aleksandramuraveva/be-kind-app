import { Test, TestingModule } from '@nestjs/testing';
import { GoodDeedsController } from './good-deeds.controller';

describe('GoodDeedsController', () => {
  let controller: GoodDeedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodDeedsController],
    }).compile();

    controller = module.get<GoodDeedsController>(GoodDeedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
