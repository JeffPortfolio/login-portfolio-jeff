import { addUser, getUserByEmail, getUserById } from '../../src/use-cases';

describe('Add user use-case Test', () => {
    test('Add user to DB', async () => {
        const user = { _id: '1111', email: 'test@test.com', password: 'P@ssword1' };
        const newUser = await addUser(user);
        expect(newUser.status).toBe('success');
    });
    test('Add user to DB - Send Error if User Exists', async () => {
        const user = { _id: '1111', email: 'test@test.com', password: 'P@ssword1' };
        await addUser(user);
        const sameUser = await addUser(user);
        expect(sameUser.status).toBe('error');
        expect(sameUser.message).toBe('Email already exists.');
    });
});

describe('Get user by Email use-case test', () => {
    test('found user', async () => {
        const user = await getUserByEmail({ email: 'test@test.com' });
        expect(user.email).toBe('test@test.com');
    });
    test('found not user', async () => {
        const user = await getUserByEmail({ email: 'test1@test.com' });
        expect(user).toBeUndefined;
    });
});

describe('Get user by Id use-case test', () => {
    test('found user', async () => {
        const user = await getUserByEmail({ email: 'test@test.com' });
        const newUser = await getUserById({ id: user._id });
        expect(newUser.email).toBe('test@test.com');
    });
    test('found not user', async () => {
        const user = await getUserById({ id: '2222' });
        expect(user).toBeUndefined;
    });
});
