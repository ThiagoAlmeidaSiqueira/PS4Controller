
# PS4Controller - Controle PS4 no micro:bit via UART

Este pacote PXT permite receber eventos de botões, leituras analógicas e estados de conexão de um controle PS4 conectado a um ESP32.

---

## Funcionalidades

- **Eventos de botões digitais:** Captura quando botões como `BOTAO_X` ou `BOTAO_CIRCULO` são pressionados.
- **Leitura de valores analógicos:** Monitora os valores dos eixos dos sticks analógicos (`STICK_ESQ_X`, `STICK_DIR_Y`, etc.).
- **Estado de conexão:** Detecta quando o controle PS4 é conectado ou desconectado.

---

## Blocos Disponíveis

### Botões Digitais
- **Quando botão X for pressionado**
- **Quando botão Círculo for pressionado**

### Leituras Analógicas
- **Quando valor analógico STICK_ESQ_X mudar**

### Estado de Conexão
- **Quando controle for conectado**
- **Quando controle for desconectado**

---

## Exemplo de Uso

```typescript
PS4Controller.onButtonPressed("BOTAO_X", function () {
    basic.showString("X");
});

PS4Controller.onAnalogValueReceived("STICK_ESQ_X", function (value) {
    basic.showNumber(value);
});

PS4Controller.onConnected(function () {
    basic.showIcon(IconNames.Happy);
});

PS4Controller.onDisconnected(function () {
    basic.showIcon(IconNames.Sad);
});
```

---

## Comunicação UART

O ESP32 envia dados no formato:
```
CHAVE@VALOR\n
```
- **CHAVE:** Nome do botão ou eixo.
- **VALOR:** `1` para botões pressionados, valores numéricos para eixos analógicos.

---

## Licença

Este projeto é distribuído sob a licença MIT.
