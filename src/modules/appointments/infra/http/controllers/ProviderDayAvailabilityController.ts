import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;

        const { day, month, year } = request.body;

        const listProvierDayAvailability = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const availability = await listProvierDayAvailability.execute({
            provider_id,
            day,
            month,
            year,
        });

        return response.status(201).json(availability);
    }
}
