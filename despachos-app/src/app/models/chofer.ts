export class Chofer {

    /**
     * Metodo constructor de la clase Chofer
     * @param id 
     * @param nombre 
     * @param estatus 
     */
    constructor(
    public id: number,
    public nombre: string,
    public estatus: 'disponible' | 'asignado'
    ) {}

    /**
     * Metodo para asignar al chofer, cambiando su estatus a 'asignado'
     */
    asignar (){
        this.estatus = 'asignado';
    }

    /**
     * Metodo para liberar al chofer, cambiando su estatus a 'disponible'
     */
    liberar (){
        this.estatus = 'disponible';
    }

}
