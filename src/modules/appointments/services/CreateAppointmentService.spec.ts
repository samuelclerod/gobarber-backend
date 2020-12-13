import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('Should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 4, 10, 12).getTime(),
        );

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: '123123123',
            user_id: '123123',
        });

        expect(appointment.provider_id).toBe('123123123');
    });

    it('Should not be able to create two appointments on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 4, 10, 10).getTime(),
        );

        const appointmentDate = new Date(2020, 4, 10, 11);

        const appointment = await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123',
            user_id: '123123',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123123123',
                user_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not to be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 5, 10, 12).getTime(),
        );

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: 'user_id',
                user_id: 'provider_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not to be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 5, 10, 12).getTime(),
        );

        await expect(
            createAppointment.execute({
                date: new Date(2020, 5, 10, 13),
                provider_id: 'provider_id',
                user_id: 'provider_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not to be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 5, 10, 12).getTime(),
        );

        await expect(
            createAppointment.execute({
                date: new Date(2020, 5, 11, 7),
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 5, 11, 18),
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
