import { expect, test, describe } from 'bun:test';
import app from '../../src/app';

describe('User Module', () => {
   test('GET /user', async () => {
      const res = await app.request('/user');
      expect(res.status).toBe(200);
      const result = await res.json();
      expect(result.success).toBe(true);
   });
});
