#App

GymPass stryle app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado 
- [x] Deve ser possível obter o numero de check-ins realizados pelo usuário logado 
- [x] Deve ser possível o usuário obter seu historico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas 
- [x] Deve ser possível o usuário buscar uma academia pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuario 
- [x] Deve ser possível cadastrar uma academia 

## RNs (Regras de negócio)

- [x] O usuario nao deve se cadastrar com um email duplicado
- [x] O usuário nao pode fazer o 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se nao estiver proxima(100m) da academia 
- [ ] O check-in só pode ser validado por administradores 
- [ ] A academia só pode ser cadastrada por administrador 

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistindos em um banco de dados PostgresSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT(JSON Web Token)
