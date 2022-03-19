import { makeUser } from '../../src/entities';

describe('users entity', () => {
    test('Throw error if Email is missing', () => {
        expect(() => {
            makeUser({ email: '', password: 'P@ssword123' });
        }).toThrow('Must have valid Email');
    });
    test('Throw error if Email is not in a valid format', () => {
        expect(() => {
            makeUser({ email: 'john.doe', password: 'P@ssword123' });
        }).toThrow('Must have valid Email');
    });
    test('Throw error if Password is missing', () => {
        expect(() => {
            makeUser({ email: 'test@test.com', password: '' });
        }).toThrow('Must have a password.');
    });
    test('Throw error if Password is not strong enough', () => {
        expect(() => {
            makeUser({ email: 'test@test.com', password: 'Password123' });
        }).toThrow('Password not strong enough');
    });
    test('ID should be 21 characters long', () => {
        const newUser = makeUser({ email: 'test@test.com', password: 'P@ssword123' });
        expect(newUser.getId()!.length).toBe(21);
    });
    test('Password hash should be over 50 characters long', () => {
        const newUser = makeUser({ email: 'test@test.com', password: 'P@ssword123' });
        expect(newUser.getPassword().length).toBeGreaterThan(50);
    });
});
