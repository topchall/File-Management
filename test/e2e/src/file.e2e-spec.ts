import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import * as exifr from 'exifr';
import * as fs from 'fs-extra';
import * as getPort from 'get-port';
import * as hasha from 'hasha';
import * as sizeOf from 'image-size';
import * as os from 'os';
import * as path from 'path';
import { AuthInfo } from 'shared/common/types';
import { mockAuthMiddleware } from 'shared/nestjs/auth/mock-auth-middleware';
import * as sharp from 'sharp';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import * as uuid from 'uuid';

const MOCK_USER_ID = 'e32643dc-b80a-473c-a201-103d0f3a73eb';
const MOCK_TENANT_ID = 'be0b4710-55f8-490e-9c35-3163ee4da4dd';

describe('API', () => {
  let app: INestApplication;

  describe('Filesystem Storage', () => {
    let storedEnv: typeof process.env | undefined;

    let tmpFolder: string;
    let storagePath: string;
    let uploadPath: string;

    beforeAll(async () => {
      // Store current ENV
      storedEnv = { ...process.env };

      tmpFolder = path.join(os.tmpdir(), uuid.v4().substr(0, 13));
      uploadPath = path.join(tmpFolder, 'upload');
      await fs.ensureDir(uploadPath);
      storagePath = path.join(tmpFolder, 'storage');
      await fs.ensureDir(storagePath);

      process.env.APP_UPLOAD_TEMP_PATH = uploadPath;
      process.env.APP_STORAGE_ADAPTER = 'fs';
      process.env.APP_FS_STORAGE_PATH = storagePath;
    }, 30000);

    afterAll(async () => {
      await fs.remove(tmpFolder);

      // Reset ENV after test series
      for (const key of Object.keys(process.env)) {
        delete process.env[key];
      }
      Object.assign(process.env, storedEnv);
      storedEnv = undefined;
    });

    defineTests();
  });

  function defineTests() {
    describe('Upload/Download files', () => {
      const reqAuth: Partial<AuthInfo> = {
        id: MOCK_USER_ID,
        name: 'Test user',
        tenantId: MOCK_TENANT_ID,
      };

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          imports: [AppModule.forE2E()],
        }).compile();

        app = moduleFixture.createNestApplication();
        mockAuthMiddleware(app, reqAuth);
        await app.init();
      }, 30000);

      afterAll(async () => {
        await app.close();
      });

      const binaryLocalFilepath = path.join(process.cwd(), '/test/fixtures/excel.xlsx');
      let binaryFileId: string;

      // Your tests should go here. 
      // Text files can be found in fixtures folder

  })}
});
