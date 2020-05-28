#API de Pedidos
> Procurando aprofundar os meus conhecimentos em sistemas de API e aplicar boas práticas, desenvolvi o projeto dessa api de pedidos, primariamente como um sistema para micro empreendedores conseguirem ter um controle simples e rápido de sua demandas e clientes.
> Ao criar minha primeira versão da plataforma de pedidos, o sistema se comunicava diretamente com o banco de dados.
> Em aplicações web isso não é recomendado, então decidi criar uma API Rest que faz a comunicação com banco de dados.
> Desta forma o frontend faz as requisição via API para conseguir inserir, deletar, alterar e consultar o banco de dados.


##Autenticação da API
> Usei o **JWT** para fazer a autenticação da API:

` Autorization: Beaurer <token> `

##API de Clientes
> Quando o lojista precisar caadastrar, remover, alterar ou consultar um cliente, precisa ser utilizado a API de Clientes 

#### URLs da API
| Parâmetro | Descrição |
|--------|--------|
| id        |    Identificação   |
| nome | Nome do cliente |
| telefone| Telefone do cliente|
| endereco | Endereço do cliente|

**Consultar todos os clientes:** 
`GET http://localhost:3000/clientes`
```
Resposta:

[
    {
        "id": 7,
        "name": "Maria Eduarda",
        "slug": "Maria-Eduarda",
        "phone": "1233345",
        "address": "Rua Dez",
        "createdAt": "2020-05-22T23:54:47.000Z",
        "updatedAt": "2020-05-22T23:54:47.000Z"
    },
    {
        "id": 6,
        "name": "Roberto Santos",
        "slug": "Roberto-Santos",
        "phone": "12345",
        "address": "Rua El Salvador",
        "createdAt": "2020-05-22T23:54:02.000Z",
        "updatedAt": "2020-05-22T23:54:02.000Z"
    }
]
```

**Consultar um único cliente:**
`GET http://localhost:3000/cliente/id_cliente`
```
Resposta:

{
    "id": 7,
    "name": "Maria Eduarda",
    "slug": "Maria-Eduarda",
    "phone": "1233345",
    "address": "Rua Dez",
    "createdAt": "2020-05-22T23:54:47.000Z",
    "updatedAt": "2020-05-22T23:54:47.000Z"
}
```

**Criar um novo cliente:**
`POST http://localhost:300/cliente`
```
{
    "nome": "Eduardo",
    "telefone": "123131",
    "endereco": "Rua Nove"
}
```

**Alterar um cliente:**
`PUT http://localhost:3000/cliente/id_cliente`

```
{
    "nome": "Rebeca",
    "telefone": "12312312",
    "endereco": "Rua Cinco"
}
```

**Excluir um cliente:**
`DELETE http://localhost:3000/cliente/id_cliente`

##API de Pedido
> Quando você quer cadastrar, excluir, alterar ou enviar algum pedido de um cliente

| Parâmetro | Descrição |
|--------|--------|
| id        |    Identificação   |
| nome | Nome do produto |
| quantidade | Quantidade do produto|
| kg | Kilograma do produto|
|preco| Preço do produto|

**Consultar todos os pedidos de um determinado cliente:**
`GET http://localhost:3000/produtos/nome_cliente`
```
Resposta:

[
    {
        "id": 3,
        "name": "Arroz",
        "slug": "Arroz",
        "quantity": "1",
        "kg": 5,
        "amount": "10.00",
        "createdAt": "2020-05-23T00:10:32.000Z",
        "updatedAt": "2020-05-23T00:10:32.000Z",
        "clienteId": 7
    },
    {
        "id": 4,
        "name": "Maça",
        "slug": "Maca",
        "quantity": "15",
        "kg": 0,
        "amount": "4.00",
        "createdAt": "2020-05-23T00:12:51.000Z",
        "updatedAt": "2020-05-23T00:12:51.000Z",
        "clienteId": 7
    }
]
```

**Consultar um único pedido:**
`GET http://localhost:3000/produto/id_pedido`
```
Resposta:

{
    "id": 4,
    "name": "Maça",
    "slug": "Maca",
    "quantity": "15",
    "kg": 0,
    "amount": "4.00",
    "createdAt": "2020-05-23T00:12:51.000Z",
    "updatedAt": "2020-05-23T00:12:51.000Z",
    "clienteId": 7
}
```

**Enviar um pedido:**
`POST http://localhost:3000/produto/id_pedido`
```
Body:

{
    "nome": "Arroz",
    "quantidade": "1",
    "kg": 5,
    "preco": "10.00" 
}
```

**Alterar um pedido:**
`PUT http://loxalhost:3000/produto/id_pedido`

```
Body:

{
    "nome": "Laranja",
    "quantidade": "15",
    "kg": 0,
    "preco": "8.00"
}
```

**Deletar um pedido:**
`DELETE http://loxalhost:3000/produtos/id_pedido`

##API de Usuários

> Utilizada para criar, excluir e fazer login na plataforma

| Parâmetro | Descrição |
|--------|--------|
| id        |    Identificação   |
| email | nome do cliente |
| senha| senha do cliente|

**Consultar todos usuários cadastrados:**

`GET http://localhost:3000/usuarios`
```
Resposta:

[
    {
        "id": 7,
        "email": "ana@teste.com",
        "senha": "$2b$10$fZ3z/yRhzspfFb5lUKUVJOPzWK8Ky4e/4HSO2Hyc9Qgs7EOY5.apS",
        "createdAt": "2020-05-22T23:50:58.000Z",
        "updatedAt": "2020-05-22T23:50:58.000Z"
    },
    {
        "id": 1,
        "email": "bruno@teste.com",
        "senha": "$2b$10$gELt2YVN1UH81e35th.gcuU/crg0MsDfVyx4luhfCcmiqnoGcq1qW",
        "createdAt": "2020-05-17T15:20:03.000Z",
        "updatedAt": "2020-05-17T15:20:03.000Z"
    }
]
```

**Cadastrar um novo usuário:**
`POST http://localhost:3000/usuario`
```
Body:

{
    "email": "teste@teste.com",
    "senha": "12345"
}
```

**Login:**
`POST http://localhost:3000/usuario/login`

```
Body:

{
    "email": "teste@teste.com",
    "senha": "12345"
}
```

**Deletar um usuário:**
`DELETE http://localhost:3000/usuario/id_usuario`

