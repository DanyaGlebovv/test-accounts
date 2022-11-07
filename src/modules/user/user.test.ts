// import { getUser } from 'modules';
import { getUsers } from '.';
import { TestHelper } from '../../../tests/testHelper';
beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
});

afterAll(() => {
  TestHelper.instance.teardownTestDB();
});
describe('User module', () => {
  describe('Get users list (getUsers)', () => {
    it('validates an item without errors', async () => {
      const result = await getUsers();
      expect(result.list).not.toBeNull();
    });
  });
});

export default {};
