export class Pedido {

    /**
     * Metodo constructor de la clase Pedido
     * @param id 
     * @param nombreTienda 
     * @param numeroItems 
     * @param destino 
     */
    constructor(
        public id: number,
        public nombreTienda: string,
        public numeroItems: number,
        public destino: string
    ) {}

}
