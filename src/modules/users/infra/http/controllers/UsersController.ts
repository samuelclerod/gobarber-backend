import CreateUserService from '@modules/users/services/CreateUsersService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({ name, email, password });

        const { password: pass, ...rest } = user;

        return response.status(201).json(rest);
    }
}
