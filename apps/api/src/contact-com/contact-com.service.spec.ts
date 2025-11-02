import { Test, TestingModule } from '@nestjs/testing';
import { ContactComService } from './contact-com.service';

describe('ContactComService', () => {
  let service: ContactComService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactComService],
    }).compile();

    service = module.get<ContactComService>(ContactComService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
