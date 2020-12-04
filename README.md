# Recuperação de senha

**RF**

-   O usuário deve poder recuperar sua senha informando o seu e-mail;
-   O usuário deve receber um e-mail com instruções de recuperação de senha;
-   O usuário deve poder resetar sua senha;

**RNF**

-   Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
-   Utilizar o Amazon SES para envios em produção;
-   O envio de e-mail deve acontecer em segundo plano (background job);

**RN**

-   o link enviado por e-mail para resetar senha, deve exporar em 2h;
-   o usuário precisar confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

-   O usuário deve poder atualizar o seu perfil;

**RN**

-   O usuário não pode alterar o seu e-mai para um e-mail já utilizado;
-   Para atualizar sua senha, o usuário deve informar a senha antiga;
-   Pata atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

-   O usuário deve poder listar seus agendamentos de um dia específico;
-   O prestador deve receber uma notificação sempre que houver um novo agendamento;
-   O prestador deve poder visualizar as notificações não lidas;

**RNF**

-   Os agendamentos do prestador no dia devem ser amazenados em cache;
-   As notificações do prestador devem ser amazzenadas no MongoDB;
-   As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

-   A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de serviços

**RF**

-   O usuário deve poder listar todos os prestadores de serviços cadastrados;
-   O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
-   O usuário deve poder listar horários disponíveis em um dia espeçifico de um prestador;
-   O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

-   A listagem de prestadores deve ser armazenada em cache;

**RN**

-   Os agendamentos devem esta disponíveis entre 8h e 18h (Primeiro às 8h, último às 17h);
-   O usuário não pode agendar em um horário que já passou;
-   O usuário não pode agendar serviços consigo mesmo;
-   Cada agendamento deve durar 1h exatamente;
-   O usuário não pode adendar em um horário já ocupado;
