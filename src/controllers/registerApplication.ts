export default function makeRegisterApplication({ addApp, getAppByName }: { addApp: any; getAppByName: any }) {
    return async function registerApplication(httpRequest: any) {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const { appName, owner } = httpRequest.body;

            const existingApp = await getAppByName({ appName });
            if (existingApp) {
                return { headers, statusCode: 400, body: 'Application Name is already used.' };
            }

            const result = await addApp({ appName, owner });

            if (result.status === 'error') {
                return { headers, statusCode: 400, body: result.message };
            }

            return {
                headers,
                statusCode: 200,
                body: result.message
            };
        } catch (e) {
            console.log(e);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: 'Error registering Application'
                }
            };
        }
    };
}
