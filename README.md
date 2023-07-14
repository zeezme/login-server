# Servidor de Login Centralizado

Este projeto é um servidor de login que tem o objetivo de funcionar separadamente do servidor principal, construído com o framework Express. Ele lida especificamente com a autenticação de usuários, fornecendo endpoints e funcionalidades para registro, login, validação de token de sessão e administração de usuário.

## Vantagens
- Separação de lógica: mantendo o código de autenticação separado do restante do aplicativo.
- Melhor segurança: possibilidade de implementar medidas de segurança específicas para autenticação.
- Escalabilidade: centraliza o servidor de login para que possa funcionar em diferentes projetos ou aplicativos.

## Desvantagens
- Complexidade adicional: o projeto se torna mais complexo devido à necessidade de gerenciamento da comunicação entre o servidor de login e o aplicativo principal.
- Overhead de comunicação: pode haver uma sobrecarga adicional de comunicação entre o servidor de login e o aplicativo.
- Custo pode ser maior do que o login tradicional, dependendo do tamanho do projeto.

## Tecnologias Utilizadas
- Express: framework web para Node.js.
- Bcrypt: biblioteca para hash de senhas e criptografia.
- Jsonwebtoken: biblioteca para gerenciar os tokens de sessão.
- Sequelize: ORM para manipulação do banco de dados.
- Sequelize-cli: CLI responsável por executar as migrations e seeders do projeto.
- Postgres: Banco de dados que armazena as informações de login.

## Instalação e Configuração
1. Clone o repositório: `git clone https://github.com/zeezme/login-server.git`
2. Navegue até o diretório do projeto: `cd login-server`
3. Instale as dependências: `npm install`
4. Configure as variáveis de ambiente necessárias em `app/config` (não se esqueça de renomear `config_example` para `config`).
5. Utilize `npm run migrate` para gerar as tabelas no banco de dados.
6. Utilize `npm run setup` para inserir as informações inicias no banco.
7. Utilize `npm run start` para iniciar o servidor.
8. Crie o seu usuário realizando um `post` na api na rota signup `localhost/signup` mandando o seguinte objeto no corpo da requisição:
```JSON
{   
    "email": "example@example.com",
    "name": "example",
    "password": "Example@123"
}
```
Lembrando que a senha precisa seguir as seguintes regras:
```txt
  Pelo menos 8 caracteres de comprimento 
  Contém pelo menos uma letra minúscula
  Contém pelo menos uma letra maiúscula
  Contém pelo menos um dígito
  Contém pelo menos um caractere especial do conjunto ( @ $ ! % * ? & )
```
## Diagrama do Funcionamento
![Diagrama)](https://github.com/zeezme/login-server/assets/65919238/0a234f28-236b-47d4-9b3b-5f157f380956)

## Execução
Para iniciar o servidor de login, execute o comando `npm start`. Certifique-se de ter todas as dependências instaladas corretamente.

## Banco de Dados
O servidor de login utiliza o Postgres como banco de dados. Certifique-se de ter uma instância configurada e forneça a URL de conexão no arquivo `config.js`.

## Rotas Disponíveis
- `/signup`: Registro de usuário.
- `/signin`: Login de usuário. (Retorna também o token da sessão)
- `/user/verify-token`: Retorna um objeto dizendo se o token é valido ou não pela seguinte requisição:
```JSON
{   
    "access_token": "token-asdasdasasdasd"
}

```
- `/user/delete`: Deleta um usuáro pelo email. (Precisa mandar um header contendo o token de um usuário admin)

## Configuração de chave de segredo
No arquivo `/app/config/jwt.config.js` é preciso alterar a key.

## Porta
O servidor está rodando na porta `99`, sinta-se à vontade para altera-la 

