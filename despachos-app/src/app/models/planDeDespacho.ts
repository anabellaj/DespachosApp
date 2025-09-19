import { Camion } from "./camion";
import { Chofer } from "./chofer";
import { Pedido } from "./pedido";

export class PlanDeDespacho {

    // El estatus inicial siempre es 'Planificado'
    public estatus: 'Planificado' | 'Cargando' | 'En Ruta' | 'Completado' | 'Inactivo' = 'Planificado';

    /**
     * Metodo constructor de la clase PlanDeDespacho
     * @param id 
     * @param nombreRuta 
     * @param camion 
     * @param chofer 
     * @param pedidos 
     */
    constructor(
        public id: number,
        public nombreRuta: string,
        public camion: Camion,
        public chofer: Chofer,
        public pedidos: Pedido[]
    ) {}

    /**
     * Metodo para iniciar la carga del camion, cambiando el estatus a 'Cargando'
     */
    iniciarCarga() {
        this.estatus = 'Cargando';
    }

    /**
     * Metodo para indicar que el camion ha salido a ruta, cambiando el estatus a 'En Ruta'
     */
    salirARuta() {
        this.estatus = 'En Ruta';
    }

    /**
     * Metodo para completar el plan de despacho, cambiando el estatus a 'Completado' y liberando el camion y chofer asignados
     */
    completar() {
        this.estatus = 'Completado';
        this.camion.liberar();   
        this.chofer.liberar();   
    }

}
    