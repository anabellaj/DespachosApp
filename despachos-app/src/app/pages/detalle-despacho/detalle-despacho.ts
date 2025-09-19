import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Despachos } from '../../services/despachos';
import { PlanDeDespacho } from '../../models/planDeDespacho';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-detalle-despacho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-despacho.html',
  styleUrls: ['./detalle-despacho.css']
})
export class DetalleDespacho {
  plan: PlanDeDespacho | null = null;

  constructor(private route: ActivatedRoute, private despachos: Despachos, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.plan = this.despachos.planesDespacho().find(p => p.id === id) ?? null;
  }

  avanzarEstado() {
  if (!this.plan) return;

  const plan = this.plan;

  switch (plan.estatus.toLowerCase()) {
    case 'planificado':
      plan.iniciarCarga();
      plan.camion.asignar();
      plan.chofer.asignar();
      break;

    case 'cargando':
      plan.salirARuta();
      plan.camion.enrutar();
      break;

    case 'en ruta':
      plan.completar();
      break;
  }

  // Actualizar camión en la señal
  const camionesActualizados = this.despachos.camiones().map(c =>
    c.id === plan.camion.id ? plan.camion : c
  );
  this.despachos.camiones.set(camionesActualizados);

  // Actualizar chofer en la señal
  const choferesActualizados = this.despachos.choferes().map(c =>
    c.id === plan.chofer.id ? plan.chofer : c
  );
  this.despachos.choferes.set(choferesActualizados);

  // Actualizar el plan en la señal
  const planesActualizados = this.despachos.planesDespacho().map(p =>
    p.id === plan.id ? plan : p
  );

  this.despachos.planesDespacho.set(planesActualizados);

  // this.plan = {...plan,};
  
}

  inactivar() {
    if (this.plan) {
      this.plan.estatus = 'Inactivo';
      this.actualizarPlan();
    }
  }

  modificar() {
  if (this.plan) {
    this.router.navigate(['/crear-despacho', this.plan.id]);
  }
}


  private actualizarPlan() {
    const actualizados = this.despachos.planesDespacho().map(p =>
      p.id === this.plan!.id ? this.plan! : p
    );
    this.despachos.planesDespacho.set(actualizados);
  }
}