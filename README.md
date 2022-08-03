## PoC para testes locais de Velocity Template Mapping's (VTL)


### Objetivo

Este projeto tem como objetivo auxiliar o desenvolvedor a executar testes locais, sem a necessidade de utilizar o ambiente no API Gateway.
O interpretador dos VTL's é a biblioteca [api-gateway-mapping-template](https://www.npmjs.com/package/api-gateway-mapping-template), agilizando a implementação no código final.

### Lógica

Primeiro são lidos os arquivos **vtl** e **payload**, em seguida o método **mappingTemplate** interpreta, e o **JSON.parse** converte o resultado String em JSON para evitar problemas de formatação do payload de saída no API Gateway.

A estrutura do projeto está definida da seguinte maneira:

- src
<br> [VelocityProject.js](./src/VelocityProject.js) (Classe main para execução do projeto)
  - json
    <br> (Payloads JSON de testes deverão ser inseridos nesta pasta)
  - tests
    <br> (Cenários de testes unitários utilizando [Jest](https://jestjs.io/pt-BR/))
  - vtls
    <br> (Exemplos de VTL´s abordando cenários comuns da documentação oficial da AWS para [Mapping Templates](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html))

## Como Executar o projeto

1. Certifique-se de ter instalado o [Node.js 16+](https://nodejs.org/en/);
2. Faça o clone do projeto;
3. execute o comando ```npm install``` para obter todos os pacotes necessários;
4. Verifique na classe [VelocityProject.js](./src/VelocityProject.js) o caminho dos arquivos de exemplo a serem lidos em ```const vtl``` e ```const payload```;
5. Depois de finalizado o download dos pacotes e conferido os caminhos dos arquivos de exemplo, execute ```npm run start``` para iniciar o projeto.
6. para criar seus próprios arquivos de template e payload, basta inserir-los em suas respectivas pastas e alterar o caminho na classe principal.
