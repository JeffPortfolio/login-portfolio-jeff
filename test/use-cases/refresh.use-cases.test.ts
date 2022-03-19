import { addRefresh, getRefreshById, getCurrentRefresh } from '../../src/use-cases';

describe('Add refresh use-case Test', () => {
    test('Add refresh to DB', async () => {
        const refresh = { userId: 'testUser' };
        const newRefresh = await addRefresh(refresh);
        expect(newRefresh.status).toBe('success');
    });
});
describe('Get refresh use-case Test', () => {
    test('Get refresh from DB by UserId', async () => {
        const refresh = { userId: 'testUser1' };
        const newRefresh = await addRefresh(refresh);
        const getRef = await getCurrentRefresh('testUser1');
        const getRefId = await getRefreshById(getRef._id);
        expect(getRefId.userId).toBe('testUser1');
    });
});
