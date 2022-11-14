import { DataSource, DataSourceOptions } from 'typeorm';
import config from '@ebdp1/config-lib';
import { AppDataSource } from '../src/db';

export class TestHelper {
  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dbConnect!: DataSource;
  async setupTestDB() {
    this.dbConnect = await AppDataSource.initialize();
  }

  teardownTestDB() {
    this.dbConnect.destroy();
  }
}
