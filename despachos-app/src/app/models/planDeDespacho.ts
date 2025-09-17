export class PlanDeDespacho {

    /* Inicializador de la clase con los atributos de id, placa y status */
    constructor(
        public id: number,
        public nombreTienda: string,
        public numeroItems: number,
        public destino: string
    ) {}


}
