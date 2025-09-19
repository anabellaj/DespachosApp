import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

  despachoExistente: PlanDeDespacho | null = null;

  constructor(
    private despachos: Despachos,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  // cargar data
  this.despachos.getPedidos().subscribe(p => this.pedidos = p);
  this.despachos.getCamiones().subscribe(() => {
    this.camiones = this.despachos.camiones().filter(c => c.estatus === 'disponible');
  });
  this.despachos.getChoferes().subscribe(() => {
    this.choferes = this.despachos.choferes().filter(c => c.estatus === 'disponible');
  });

  // 🚀 leer id de la URL
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) {
    const encontrado = this.despachos.planesDespacho().find(p => p.id === id);
    if (encontrado) {
      this.despachoExistente = encontrado;
      this.nombreRuta = encontrado.nombreRuta;
      this.camionSeleccionado = encontrado.camion;
      this.choferSeleccionado = encontrado.chofer;
      this.pedidosSeleccionados = [...encontrado.pedidos];
    }
  }
}

  togglePedido(pedido: Pedido, checked: boolean) {
    if (checked) {
      this.pedidosSeleccionados.push(pedido);
    } else {
      this.pedidosSeleccionados = this.pedidosSeleccionados.filter(p => p.id !== pedido.id);
    }
  }

  guardarDespacho() {
    if (!this.nombreRuta || !this.camionSeleccionado || !this.choferSeleccionado) {
      alert('Todos los campos son obligatorios');
      return;
    }

if (this.despachoExistente) {
  const actualizado = new PlanDeDespacho(
    this.despachoExistente.id,
    this.nombreRuta,
    this.camionSeleccionado!,
    this.choferSeleccionado!,
    this.pedidosSeleccionados
  );

  // Mantener el estatus que tenía el plan
  actualizado.estatus = this.despachoExistente.estatus;

  const planes = this.despachos.planesDespacho().map(p =>
    p.id === actualizado.id ? actualizado : p
  );
  this.despachos.planesDespacho.set(planes);

  alert('Despacho modificado exitosamente!');
} else {
  const nuevoPlan = new PlanDeDespacho(
    Date.now(),
    this.nombreRuta,
    this.camionSeleccionado!,
    this.choferSeleccionado!,
    this.pedidosSeleccionados
  );
  this.despachos.agregarDespacho(nuevoPlan);
  alert('Despacho creado exitosamente!');
}


    this.router.navigate(['/']); // redirige al dashboard
  }
}
