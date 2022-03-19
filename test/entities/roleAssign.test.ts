import { makeRoleAssign } from '../../src/entities';

describe('roleAssign entity', () => {
    test('ID should be 21 characters long', () => {
        const newUser = makeRoleAssign({ roleId: 1111, userId: 'test@test.com' });
        expect(newUser.getId()!.length).toBe(21);
    });
});
