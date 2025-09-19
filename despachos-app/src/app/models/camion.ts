export class Camion {

    /**
     * Metodo constructor de la clase Camion
     * @param id 
     * @param placa 
     * @param estatus 
     */
    constructor(
        public id: number,
        public placa: string,
        public estatus: 'disponible' | 'asignado' | 'en ruta' | 'en mantenimiento'
    ) {}

    /**
     * Metodo para asignar el camion a una ruta, cambiando su estatus a 'en ruta'
     */
    asignar (){
        this.estatus = 'asignado';
    }

    /**
     * Metodo para asignar el camion a una ruta, cambiando su estatus a 'en ruta'
     */
    enrutar (){
        this.estatus = 'en ruta';
    }

    /**
     * Metodo para liberar el camion, cambiando su estatus a 'disponible'
     */
    liberar (){
        this.estatus = 'disponible';
    }


    /**
     * Metodo para enviar el camion a mantenimiento, cambiando su estatus a 'en mantenimiento'
     */
    enviarAMantenimiento (){
        this.estatus = 'en mantenimiento';
    }

}
