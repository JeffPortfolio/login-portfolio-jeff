export default function makeAllUsers({ getUserList }: { getUserList: any }) {
    return async function allUsers() {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const result = await getUserList();

            if (result.status === 'error') {
                return { headers, statusCode: 400, body: result.message };
            }

            return {
                headers,
                statusCode: 200,
                body: result
            };
        } catch (e) {
            console.log(e);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: 'Error Listing Users'
                }
            };
        }
    };
}
