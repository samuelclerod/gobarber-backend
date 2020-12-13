import ListMonthProviderAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderMotnthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.params;

        const { month, year } = request.body;

        const listProvierMonthAvailability = container.resolve(
            ListMonthProviderAvailabilityService,
        );

        const availability = await listProvierMonthAvailability.execute({
            provider_id,
            month,
            year,
        });

        return response.status(201).json(availability);
    }
}
