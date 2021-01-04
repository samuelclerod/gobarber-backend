import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;
describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );
    });

    it('Should be able to create a new User', async () => {
        const user = await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('Should not be able to create a new user with same email from another one', async () => {
        await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        await expect(
            createUser.execute({
                name: 'Jonh Doe',
                email: 'johndoe@exemple.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
