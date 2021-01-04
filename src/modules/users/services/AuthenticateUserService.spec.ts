import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('Should be able to Authenticate', async () => {
        const user = await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('Should not be able to authenticate with not existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'johndoe@exemple.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to Authenticate with wrong password', async () => {
        const user = await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'johndoe@exemple.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
