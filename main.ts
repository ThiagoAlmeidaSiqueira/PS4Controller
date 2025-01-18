//% weight=100 color=#00A0E9 icon="\uf11b" block="PS4 Controller"
namespace PS4Controller {
    const serialDelimiter = "\n";
    let buttonHandlers: { [key: string]: () => void } = {};

    // Registra eventos específicos para cada botão
    function processIncomingData(data: string): void {
        let parts = data.split("@");
        if (parts.length == 2) {
            let key = parts[0];
            let value = parseInt(parts[1]);
            if (value === 1 && buttonHandlers[key]) {
                buttonHandlers[key](); // Chama o evento associado ao botão
            }
        }
    }

    // Configura a leitura da serial
    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
        let receivedData = serial.readUntil(serial.delimiters(Delimiters.NewLine));
        processIncomingData(receivedData);
    });

    /**
     * Registra um evento para quando o botão X for pressionado.
     */
    //% block="quando botão X for pressionado"
    export function onButtonXPressed(handler: () => void): void {
        buttonHandlers["BOTAO_X"] = handler;
    }

    /**
     * Registra um evento para quando o botão Círculo for pressionado.
     */
    //% block="quando botão Círculo for pressionado"
    export function onButtonCirclePressed(handler: () => void): void {
        buttonHandlers["BOTAO_CIRCULO"] = handler;
    }

    /**
     * Registra um evento para quando o botão Triângulo for pressionado.
     */
    //% block="quando botão Triângulo for pressionado"
    export function onButtonTrianglePressed(handler: () => void): void {
        buttonHandlers["BOTAO_TRIANGULO"] = handler;
    }

    /**
     * Registra um evento para quando o botão Quadrado for pressionado.
     */
    //% block="quando botão Quadrado for pressionado"
    export function onButtonSquarePressed(handler: () => void): void {
        buttonHandlers["BOTAO_QUADRADO"] = handler;
    }

    /**
     * Registra um evento para quando o botão L1 for pressionado.
     */
    //% block="quando botão L1 for pressionado"
    export function onButtonL1Pressed(handler: () => void): void {
        buttonHandlers["L1"] = handler;
    }

    /**
     * Registra um evento para quando o botão R1 for pressionado.
     */
    //% block="quando botão R1 for pressionado"
    export function onButtonR1Pressed(handler: () => void): void {
        buttonHandlers["R1"] = handler;
    }
}
