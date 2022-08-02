import { makeUser } from '../entities';

export default function makeAddUser({ userDb }: { userDb: any }) {
    return async function addUser(userInfo: any) {
        const newUser = makeUser(userInfo);
        const emailExists = await userDb.findByEmail(newUser.getEmail());
        if (emailExists) {
            return { status: 'error', message: 'Email already exists.' };
        }
        const userExists = await userDb.findByName(newUser.getUser());
        if (userExists) {
            return { status: 'error', message: 'UserName already exists.' };
        }

        const success = userDb.insert({
            _id: newUser.getId(),
            email: newUser.getEmail(),
            passwordHash: newUser.getPassword(),
            userName: newUser.getUser()
        });

        if (success) {
            return { status: 'success', message: 'User registered', data: newUser.getId() };
        } else {
            return { status: 'error', message: 'Error on insert.' };
        }

        // const user = await usersDb.findByEmail(email)
        // return newUser
    };
}
