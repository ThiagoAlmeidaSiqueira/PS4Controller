//% weight=100 color=#00A0E9 icon="\uf11b" block="PS4 Controller"
namespace PS4Controller {
    enum button_enum {
        BOTAO_X,
        BOTAO_CIRCULO,
        BOTAO_TRIANGULO,
        BOTAO_QUADRADO,
        L1,
        R1
    };
    enum axis_enum {
        JOY_ESQ_X,
        JOY_ESQ_Y,
        JOY_DIR_X,
        JOY_DIR_Y,
        L2,
        R2
    };

    const serialDelimiter = "\n";

    let buttonHandlers: { [key: string]: () => void } = {};
    let analogHandlers: { [key: string]: (value: number) => void } = {};
    let connectionHandlers: { [key: string]: () => void } = {};

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
    //% button.defl=button_enum.BOTAO_X
    export function onButtonPressed(button: button_enum, handler: () => void): void {
        buttonHandlers[button] = handler;
    }

    /**
     * Registra um evento para leitura de valor analógico.
     * @param handler A função que recebe o valor.
     */
    //% block="quando valor analógico $axis mudar"
    //% axis.defl=axis_enum.JOY_ESQ_X
    export function onAnalogValueReceived(axis: axis_enum, handler: (value: number) => void): void {
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