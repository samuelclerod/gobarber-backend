import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.user.id;

        const { day, month, year } = request.body;

        const listProviderAppointments = container.resolve(
            ListProviderAppointmentsService,
        );

        const appointments = await listProviderAppointments.execute({
            provider_id,
            day,
            month,
            year,
        });

        return response.status(201).json(appointments);
    }
}
