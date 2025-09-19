import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Despachos } from '../../services/despachos';
import { PlanDeDespacho } from '../../models/planDeDespacho';
import { Camion } from '../../models/camion';
import { Chofer } from '../../models/chofer';
import { Pedido } from '../../models/pedido';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  
  planesDespacho = computed(() => this.despachos.planesDespacho());

  terminoBusqueda: string = ''; 
  

  constructor(private despachos: Despachos, private router: Router) {

    // // Plan de despacho 1
    // this.despachos.agregarDespacho(new PlanDeDespacho(
    //   1,
    //   'Ruta Este - 17/09/2025',
    //   new Camion(1, 'ABC-123', 'disponible'),
    //   new Chofer(1, 'Juan Pérez','disponible'),
    //   [
    //     new Pedido(101, 'Farmatodo Caracas', 10, 'Av. Bolívar, Caracas'),
    //     new Pedido(102, 'Farmatodo La California', 5, 'Calle Principal, La California')
    //   ]
    // ));
    //     this.despachos.agregarDespacho(new PlanDeDespacho(
    //   1,
    //   'Ruta Oeste - 18/09/2025',
    //   new Camion(1, 'AG453B4', 'disponible'),
    //   new Chofer(1, 'Juan Pérez','disponible'),
    //   [
    //     new Pedido(101, 'Farmatodo Caracas', 10, 'Av. Bolívar, Caracas'),
    //     new Pedido(102, 'Farmatodo La California', 5, 'Calle Principal, La California')
    //   ]
    // ));


  }

  // // Getter para obtener los planes desde el service
  // get planesDespacho() {
  //   return this.despachos.planesDespacho();
  // }

  crearNuevoDespacho(){
      this.router.navigate(['/crear-despacho']);
  }

    get planesDespachoFiltrados() {
    const termino = this.terminoBusqueda.toLowerCase();
    return this.despachos.planesDespacho().filter(plan =>
      plan.nombreRuta.toLowerCase().includes(termino) ||
      plan.camion.placa.toLowerCase().includes(termino) ||
      plan.chofer.nombre.toLowerCase().includes(termino)
    );
  }

}
