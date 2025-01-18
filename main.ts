//% weight=100 color=#00A0E9 icon="\uf11b" block="PS4 Controller"
namespace PS4Controller {
    const serialDelimiter = "\n";
    let buttonHandlers: { [key: string]: () => void } = {};
    let analogHandlers: { [key: string]: (value: number) => void } = {};
    let connectionHandlers: { [key: string]: () => void } = {};

    // Definindo os valores predefinidos
    const BOTAO_X = "BOTAO_X";
    const BOTAO_CIRCULO = "BOTAO_CIRCULO";
    const BOTAO_TRIANGULO = "BOTAO_TRIANGULO";
    const BOTAO_QUADRADO = "BOTAO_QUADRADO";
    const L1 = "L1";
    const R1 = "R1";

    const JOY_ESQ_X = "JOY_ESQ_X";
    const JOY_ESQ_Y = "JOY_ESQ_Y";
    const JOY_DIR_X = "JOY_DIR_X";
    const JOY_DIR_Y = "JOY_DIR_Y";
    const L2 = "L2";
    const R2 = "R2";

    // Processa os dados recebidos
    function processIncomingData(data: string): void {
        let parts = data.split("@");
        if (parts.length == 2) {
            let key = parts[0];
            let value = parseInt(parts[1]);

            // Evento de botão pressionado
            if (value === 1 && buttonHandlers[key]) {
                buttonHandlers[key]();
            }

            // Evento de leitura analógica
            if (!isNaN(value) && analogHandlers[key]) {
                analogHandlers[key](value);
            }

            // Eventos de conexão/desconexão
            if (key === "CONECTADO" && connectionHandlers["connected"]) {
                connectionHandlers["connected"]();
            }
            if (key === "DESCONECTADO" && connectionHandlers["disconnected"]) {
                connectionHandlers["disconnected"]();
            }
        }
    }

    // Configura a leitura da serial
    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
        let receivedData = serial.readUntil(serial.delimiters(Delimiters.NewLine));
        processIncomingData(receivedData);
    });

    /**
     * Registra um evento para quando o botão for pressionado.
     * @param handler A função a ser executada.
     */
    //% block="quando botão $button for pressionado"
    //% button.defl=BOTAO_X
    export function onButtonPressed(button: "BOTAO_X" | "BOTAO_CIRCULO" | "BOTAO_TRIANGULO" | "BOTAO_QUADRADO" | "L1" | "R1", handler: () => void): void {
        buttonHandlers[button] = handler;
    }

    /**
     * Registra um evento para leitura de valor analógico.
     * @param handler A função que recebe o valor.
     */
    //% block="quando valor analógico $axis mudar"
    //% axis.defl=JOY_ESQ_X
    export function onAnalogValueReceived(axis: "JOY_ESQ_X" | "JOY_ESQ_Y" | "JOY_DIR_X" | "JOY_DIR_Y" | "L2" | "R2", handler: (value: number) => void): void {
        analogHandlers[axis] = handler;
    }

    /**
     * Registra um evento para quando o controle se conectar.
     */
    //% block="quando controle for conectado"
    export function onConnected(handler: () => void): void {
        connectionHandlers["connected"] = handler;
    }

    /**
     * Registra um evento para quando o controle se desconectar.
     */
    //% block="quando controle for desconectado"
    export function onDisconnected(handler: () => void): void {
        connectionHandlers["disconnected"] = handler;
    }
}
