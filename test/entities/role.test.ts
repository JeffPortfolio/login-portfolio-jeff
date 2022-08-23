import { makeRole } from '../../src/entities';

describe('role entity', () => {
    test('Throw error if Id is less than 1000', () => {
        expect(() => {
            makeRole({ id: 999, appId: 'test', roleName: 'test' });
        }).toThrow('Role must be 1000 and 9999 and cannot be 1971');
    });
    test('Throw error if Id is greater than 9999', () => {
        expect(() => {
            makeRole({ id: 99999, appId: 'test', roleName: 'test' });
        }).toThrow('Role must be 1000 and 9999 and cannot be 1971');
    });
    test('Throw error if Id is less than 1000', () => {
        expect(() => {
            makeRole({ id: 1971, appId: 'test', roleName: 'test' });
        }).toThrow('Role must be 1000 and 9999 and cannot be 1971');
    });
});
