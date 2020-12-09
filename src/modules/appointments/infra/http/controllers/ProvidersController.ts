import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProvidersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;

        const listProviders = container.resolve(ListProvidersService);

        const users = await listProviders.execute({
            user_id,
        });

        const providers = users.map(
            ({ password, ...userWithoutPassword }) => userWithoutPassword,
        );

        return response.status(201).json(providers);
    }
}
