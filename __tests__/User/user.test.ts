import { expect, test, describe } from 'bun:test';

describe('User', () => {
   test('should return 200', async () => {
      const result = await fetch('http://localhost:5000/user');
      expect(result.status).toBe(200);
   });
});
