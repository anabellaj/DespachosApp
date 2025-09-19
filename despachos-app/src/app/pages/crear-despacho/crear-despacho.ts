import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Despachos } from '../../services/despachos';
import { PlanDeDespacho } from '../../models/planDeDespacho';
import { Pedido } from '../../models/pedido';
import { Camion } from '../../models/camion';
import { Chofer } from '../../models/chofer';

@Component({
  selector: 'app-crear-despacho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-despacho.html',
  styleUrls: ['./crear-despacho.css']
})
export class CrearDespacho {
  nombreRuta: string = '';
  pedidos: Pedido[] = [];
  camiones: Camion[] = [];
  choferes: Chofer[] = [];

  pedidosSeleccionados: Pedido[] = [];
  camionSeleccionado: Camion | null = null;
  choferSeleccionado: Chofer | null = null;

  constructor(private despachos: Despachos, private router: Router) {}

ngOnInit() {
  this.despachos.getPedidos().subscribe(p => this.pedidos = p);

  this.despachos.getCamiones().subscribe(() => {
    this.camiones = this.despachos.camiones().filter(c => c.estatus === 'disponible');
  });

  this.despachos.getChoferes().subscribe(() => {
    this.choferes = this.despachos.choferes().filter(c => c.estatus === 'disponible');
  });
}


  togglePedido(pedido: Pedido, checked: boolean) {
  const instancia = new Pedido(pedido.id, pedido.nombreTienda, pedido.numeroItems, pedido.destino);

  if (checked) {
    this.pedidosSeleccionados.push(instancia);
  } else {
    this.pedidosSeleccionados = this.pedidosSeleccionados.filter(p => p.id !== pedido.id);
  }
}

  guardarDespacho() {
    if (!this.nombreRuta || !this.camionSeleccionado || !this.choferSeleccionado) {
      alert('Todos los campos son obligatorios');
      return;
    }
  const pedidos = this.pedidos.filter(p => this.pedidosSeleccionados.includes(p));
  const camion = this.camionSeleccionado; // ya es instancia de Camion
  const chofer = this.choferSeleccionado; // ya es instancia de Chofer

  // Cambiamos su estado
  camion.asignar();
  const camionesActualizados = this.despachos.camiones().map(c =>
      c.id === camion.id ? camion : c
    );
this.despachos.camiones.set(camionesActualizados);

  chofer.asignar();
  const choferesActualizados = this.despachos.choferes().map(c =>
      c.id === chofer.id ? chofer : c
    );
this.despachos.choferes.set(choferesActualizados);


    // Crear plan de despacho usando objetos de clase
    const nuevoPlan = new PlanDeDespacho(
      Date.now(),
      this.nombreRuta,
      this.camionSeleccionado,
      this.choferSeleccionado,
      this.pedidosSeleccionados
    );

    // Guardar en el service
    this.despachos.agregarDespacho(nuevoPlan);

    alert('Despacho creado exitosamente!');
    this.router.navigate(['/']); // redirige al dashboard
  }
}
