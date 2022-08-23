import { addRole, getRoleById } from '../../src/use-cases';

describe('Add role use-case Test', () => {
    test('Add rol to DB', async () => {
        const role = { userId: 'test', projId: 'test', roles: 'test' };
        const newRole = await addRole(role);
        expect(newRole.status).toBe('success');
    });
});
// describe('Get role use-case Test', () => {
//     test('Get role from DB', async () => {
//         const role = await getRoleById({ userId: 'test', projId: 'test' });
//         expect(role.roles).toBe('test');
//     });
//     test('Get role not in DB', async () => {
//         const role = await getRoleById({ userId: 'test1', projId: 'test' });
//         expect(role).toBeUndefined;
//     });
// });
