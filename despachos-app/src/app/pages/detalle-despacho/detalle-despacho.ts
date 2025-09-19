import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Despachos } from '../../services/despachos';
import { PlanDeDespacho } from '../../models/planDeDespacho';

@Component({
  selector: 'app-detalle-despacho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-despacho.html',
  styleUrls: ['./detalle-despacho.css']
})
export class DetalleDespacho {
  plan: PlanDeDespacho | null = null;

  constructor(private route: ActivatedRoute, private despachos: Despachos, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.plan = this.despachos.planesDespacho().find(p => p.id === id) ?? null;
  }

  avanzarEstado() {
    if (!this.plan) return;

    switch (this.plan.estatus.toLowerCase()) {
      case 'planificado':
        this.plan.estatus = 'Cargando';
        break;
      case 'cargando':
        this.plan.estatus = 'En Ruta';
        break;
      case 'en ruta':
        this.plan.estatus = 'Completado';
        break;
    }

    this.actualizarPlan();
  }

  inactivar() {
    if (this.plan) {
      this.plan.estatus = 'Inactivo';
      this.actualizarPlan();
    }
  }

  modificar() {
    if (this.plan) {
      this.router.navigate(['/crear-despacho'], { state: { despacho: this.plan } });
    }
  }

  private actualizarPlan() {
    const actualizados = this.despachos.planesDespacho().map(p =>
      p.id === this.plan!.id ? this.plan! : p
    );
    this.despachos.planesDespacho.set(actualizados);
  }
}