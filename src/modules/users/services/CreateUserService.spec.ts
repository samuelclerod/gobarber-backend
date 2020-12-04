import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUsersService';

describe('CreateUser', () => {
    it('Should be able to create a new User', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('Should not be able to create a new user with same email from another one', async () => {
        const fakeHashProvider = new FakeHashProvider();
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        expect(
            createUser.execute({
                name: 'Jonh Doe',
                email: 'johndoe@exemple.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
