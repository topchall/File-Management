import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../../../src/file/file.service'
import { HttpModule } from '@nestjs/common';

describe('ApiService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
      imports: [HttpModule],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('ApiService - should be defined', () => {
    expect(service).toBeDefined();
  });
});