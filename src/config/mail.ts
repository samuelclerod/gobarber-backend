interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'etherial',
    defaults: {
        from: {
            email: 'me@samuelrodrigues.dev',
            name: 'Samuel Rodrigues',
        },
    },
} as IMailConfig;
