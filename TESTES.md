# Exemplos de Testes da API

## Testando com curl

### 1. Verificar se a API está funcionando
```bash
curl http://localhost:3000
```

### 2. Listar quartos disponíveis
```bash
curl http://localhost:3000/quartos
```

### 3. Registrar um hóspede
```bash
curl -X POST http://localhost:3000/hospedes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Danilo Panta",
    "email": "panta@email.com",
    "telefone": "(11) 99999-9999"
  }'
```

### 4. Listar todos os hóspedes
```bash
curl http://localhost:3000/hospedes
```

### 5. Criar uma reserva
```bash
curl -X POST http://localhost:3000/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "idHospede": 1,
    "idQuarto": 1,
    "dataCheckin": "2023-12-01",
    "dataCheckout": "2023-12-05"
  }'
```

### 6. Listar todas as reservas
```bash
curl http://localhost:3000/reservas
```

### 7. Consultar quartos por tipo
```bash
curl http://localhost:3000/quartos/tipo/solteiro
```

### 8. Consultar quartos disponíveis
```bash
curl http://localhost:3000/quartos/status/disponível
```

### 9. Cancelar uma reserva
```bash
curl -X DELETE http://localhost:3000/reservas/1/cancelar
```

### 10. Listar reservas de um hóspede
```bash
curl http://localhost:3000/hospedes/1/reservas
```

## Testando com o Swagger UI

Acesse: http://localhost:3000/api-docs

A interface do Swagger permite testar todos os endpoints diretamente pelo navegador com uma interface amigável.

## Sequência de Teste Recomendada

1. **Registrar alguns hóspedes**
2. **Verificar lista de quartos disponíveis**
3. **Criar algumas reservas**
4. **Verificar que os quartos ficaram ocupados**
5. **Cancelar uma reserva**
6. **Verificar que o quarto voltou a ficar disponível**

## Cenários de Teste

### Teste de Validação - Email Duplicado
```bash
# Primeiro hóspede
curl -X POST http://localhost:3000/hospedes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Danilo Panta",
    "email": "panta@email.com",
    "telefone": "(11) 99999-9999"
  }'

# Tentativa de cadastro com mesmo email (deve falhar)
curl -X POST http://localhost:3000/hospedes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "José Santos",
    "email": "panta@email.com",
    "telefone": "(11) 88888-8888"
  }'
```

### Teste de Validação - Data Inválida
```bash
# Tentativa de reserva com checkout anterior ao checkin (deve falhar)
curl -X POST http://localhost:3000/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "idHospede": 1,
    "idQuarto": 1,
    "dataCheckin": "2023-12-05",
    "dataCheckout": "2023-12-01"
  }'
```

### Teste de Conflito - Quarto Ocupado
```bash
# Primeira reserva
curl -X POST http://localhost:3000/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "idHospede": 1,
    "idQuarto": 1,
    "dataCheckin": "2023-12-01",
    "dataCheckout": "2023-12-05"
  }'

# Tentativa de reserva no mesmo período (deve falhar)
curl -X POST http://localhost:3000/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "idHospede": 2,
    "idQuarto": 1,
    "dataCheckin": "2023-12-03",
    "dataCheckout": "2023-12-07"
  }'
```
