import { init } from '../..';
import { CustomFastifyInstance } from '../../models';
import authLib from '@ebdp1/auth-lib';
import config from '@ebdp1/config-lib';
import { DataSource } from 'typeorm';

let app: CustomFastifyInstance;
let db: DataSource;

const baseUrl = '/private/user';
const baseMeUrl = '/private/me';

const userInfo = {
  id: undefined,
  pOnePersonId: 3,
  firstName: 'TestFirstName3',
  lastName: 'TestFirstName3',
  email: 'testuser3@test.com',
  title: 'test3',
  avatar: 'test3',
};

authLib.initialize(config);
const { tokenService } = authLib;
let authorization: string;

beforeAll(async () => {
  ({ app, db } = await init());
  authorization = await tokenService.encodeToken({ personId: 2 });
});

afterAll(() => db?.destroy());

describe.skip('User module', () => {
  describe('Get users list (getUsers)', () => {
    it('Get users list', async () => {
      const response = await app.inject({
        url: `${baseUrl}/list`,
        headers: { authorization },
      });
      const { list } = response.json();
      expect(response.statusCode).toBe(200);
      expect(list).not.toBeNull();
    });
  });
  describe('Get user (getUser)', () => {
    it('Get user with correct id', async () => {
      const response = await app.inject({
        url: `${baseUrl}/1`,
        headers: { authorization },
      });
      const { user } = response.json();
      expect(response.statusCode).toBe(200);
      expect(user).not.toBeNull();
    });
    it('Get user with incorrect id', async () => {
      const response = await app.inject({
        url: `${baseUrl}/200`,
        headers: { authorization },
      });
      const { user } = response.json();
      expect(response.statusCode).toBe(200);
      expect(user).toBeNull();
    });
  });
  describe('Create user (createUser)', () => {
    it('Create user with incorrect data', async () => {
      const response = await app.inject({
        url: baseUrl,
        method: 'POST',
        payload: { ...userInfo, email: null },
        headers: { authorization },
      });
      expect(response.statusCode).toBe(400);
    });
    it('Create user with correct data', async () => {
      const response = await app.inject({
        url: baseUrl,
        method: 'POST',
        payload: userInfo,
        headers: { authorization },
      });
      const { user } = response.json();

      userInfo.id = user.id;

      expect(response.statusCode).toBe(200);
      expect(user).not.toBeNull();
    });
  });
  describe('Update user (updateUser)', () => {
    it('Create user with incorrect data', async () => {
      let response = await app.inject({
        url: `${baseUrl}/${userInfo.id}`,
        method: 'PUT',
        payload: { ...userInfo, email: 'testuser@test.com' },
        headers: { authorization },
      });
      expect(response.statusCode).toBe(400);

      response = await app.inject({
        url: `${baseUrl}/${userInfo.id}`,
        method: 'PUT',
        payload: { ...userInfo, email: null },
        headers: { authorization },
      });

      expect(response.statusCode).toBe(400);
    });
    it('Update user with correct data', async () => {
      const response = await app.inject({
        url: `${baseUrl}/${userInfo.id}`,
        method: 'PUT',
        payload: { ...userInfo, title: 'TestTitle' },
        headers: { authorization },
      });
      const { user } = response.json();

      expect(response.statusCode).toBe(200);
      expect(user).not.toBeNull();
    });
  });
  describe('Get my user (getMyUser)', () => {
    it('Get my user', async () => {
      const response = await app.inject({
        url: baseMeUrl,
        headers: { authorization },
      });
      const { user } = response.json();

      expect(response.statusCode).toBe(200);
      expect(user).not.toBeNull();
    });
  });
  describe('Delete user (deleteUser)', () => {
    it('Delete user with correct id', async () => {
      const response = await app.inject({
        url: `${baseUrl}/${userInfo.id}`,
        headers: { authorization },
      });
      const { user } = response.json();

      expect(response.statusCode).toBe(200);
      expect(user).not.toBeNull();
    });
  });
});

export default {};
