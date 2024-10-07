import { Test, TestingModule } from '@nestjs/testing';
import { GoodDeedsService } from './good-deeds.service';

describe('GoodDeedsService', () => {
  let service: GoodDeedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodDeedsService],
    }).compile();

    service = module.get<GoodDeedsService>(GoodDeedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
