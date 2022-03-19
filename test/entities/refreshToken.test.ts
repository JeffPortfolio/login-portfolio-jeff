import { makeRefreshToken } from '../../src/entities';

describe('users entity', () => {
    test('ID should be 21 characters long', () => {
        const newUser = makeRefreshToken({ userId: 'test@test.com' });
        expect(newUser.getId()!.length).toBe(21);
    });
});
