import { makeApp } from '../../src/entities';

describe('Application Owner must be a valid email', () => {
    test('Return error if no Name', () => {
        expect(() => {
            const appName = 'test';
            makeApp({ appName: appName, owner: 'testtest.com' });
        }).toThrow('Owner must be a valid Email.');
    });
});

describe('Test all stributes return correctly', () => {
    test('Return app name should be the same as input', () => {
        const appName = 'test';
        const newApp = makeApp({ appName: appName, owner: 'test@test.com' });
        expect(newApp.getAppName()).toBe(appName);
    });
    test('App Id should be 21 chars', () => {
        const appName = 'test';
        const newApp = makeApp({ appName: appName, owner: 'test@test.com' });
        expect(newApp.getId()!.length).toBe(21);
    });
    test('App Key should greater than 50 chars', () => {
        const appName = 'test';
        const newApp = makeApp({ appName: appName, owner: 'test@test.com' });
        expect(newApp.getAppKey()!.length).toBeGreaterThan(50);
    });
});
