import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { classToClass } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class ProfileController {
    async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({ user_id });

        return response.json(classToClass(user));
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;
        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            password,
            old_password,
        });

        return response.status(201).json(classToClass(user));
    }
}
