export default function buildMakeUser({ nanoid, hashPassword }: { nanoid: any; hashPassword: any }) {
    return function makeUser({ id, email, password }: { id?: string; email: string; password: string }) {
        const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
        const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

        const emailValid = EMAIL_REGEX.test(email);

        if (!email || !emailValid) {
            throw new Error('Must have valid Email.');
        }

        if (!password) {
            throw new Error('Must have a password.');
        }

        const passStrong = PWD_REGEX.test(password);
        if (!passStrong) {
            throw new Error('Password not strong enough');
        }

        id = nanoid();

        let hashedPassword = hashPassword(password);

        return Object.freeze({
            getId: () => id,
            getEmail: () => email,
            getPassword: () => hashedPassword
        });
    };
}
