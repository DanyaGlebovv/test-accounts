import { AxiosResponse } from 'axios';
import { init } from '../..';
import { CustomFastifyInstance } from '../../models';
import authLib from '@ebdp1/auth-lib';
import config from '@ebdp1/config-lib';
import * as PoneDataAccess from '../p-one/dataAccess';
import { DataSource } from 'typeorm';

let app: CustomFastifyInstance;
let db: DataSource;
authLib.initialize(config);
const { tokenService } = authLib;
const baseUrl = '/private/authorization';

beforeAll(async () => {
  ({ app, db } = await init());

  const mock = jest.spyOn(PoneDataAccess, 'getPOneUser');
  mock.mockImplementation(
    async () =>
      ({
        data: {
          firstName: 'TestPOneFirstName',
          lastName: 'TestPOneLastName',
          title: 'TestPOneTitle',
          email: 'testponeemail@test.com',
          id: 1000,
        },
      } as AxiosResponse),
  );
  const eventsMock = jest.spyOn(PoneDataAccess, 'getPOneUserEvents');
  eventsMock.mockImplementation(
    async () =>
      ({
        data: [
          {
            id: 1,
            code: 'event-code',
            name: 'Event',
          },
        ],
      } as AxiosResponse),
  );
});

afterAll(() => db?.destroy());

describe('Authorization module', () => {
  describe('Sign in (signIn)', () => {
    it('Sign in user with active subscription', async () => {
      const authorization = await tokenService.encodeTimelessToken({ personId: 1 });
      const response = await app.inject({
        url: `${baseUrl}/sign-in`,
        headers: { authorization },
      });

      const { user } = response.json();

      expect(user).not.toBeUndefined();
      expect(user.pOnePersonId).toBe(1);
      expect(user.subscriptions).not.toBe([]);
    });
    it('Sign in user with inactive subscription', async () => {
      const authorization = await tokenService.encodeTimelessToken({ personId: 2 });
      const response = await app.inject({
        url: `${baseUrl}/sign-in`,
        headers: { authorization },
      });
      const { user } = response.json();

      expect(user).not.toBeUndefined();
      expect(user.pOnePersonId).toBe(2);
      expect(user.events?.[0]?.id).toBe(1);
    });
    it('Sign in user that not registered in p-one plus', async () => {
      const authorization = await tokenService.encodeTimelessToken({ personId: 1000 });
      const response = await app.inject({
        url: `${baseUrl}/sign-in`,
        headers: { authorization },
      });
      const { user } = response.json();

      expect(user).not.toBeUndefined();
      expect(user.pOnePersonId).toBe(1000);
      expect(user.events?.[0]?.id).toBe(1);
    });
  });
});

export default {};
