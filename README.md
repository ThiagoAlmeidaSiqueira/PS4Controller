# PS4Controller - Controle PS4 no micro:bit via UART

Este é um pacote PXT para o MakeCode que permite receber eventos de botões de um controle PS4 conectado a um ESP32, comunicando-se via UART.

---

## Funcionalidades

Este pacote fornece blocos para capturar eventos de botões pressionados no controle PS4 e executar ações correspondentes no micro:bit. Os eventos disponíveis incluem:

- **Botão X** (`BOTAO_X`)
- **Botão Círculo** (`BOTAO_CIRCULO`)
- **Botão Triângulo** (`BOTAO_TRIANGULO`)
- **Botão Quadrado** (`BOTAO_QUADRADO`)
- **Botão L1** (`L1`)
- **Botão R1** (`R1`)

---

## Como Usar

### Etapa 1: Configuração de Hardware

1. Conecte um ESP32 com o firmware configurado para receber dados do controle PS4 e repassá-los via UART para o micro:bit.
2. Conecte os pinos UART entre o ESP32 e o micro:bit:
   - **RX** do micro:bit -> **TX** do ESP32
   - **TX** do micro:bit -> **RX** do ESP32
   - Conecte GND entre os dois dispositivos.

### Etapa 2: Adicionar o Pacote

1. No MakeCode, clique em **Configurações** > **Extensões**.
2. Insira o link para este pacote no campo de busca:
