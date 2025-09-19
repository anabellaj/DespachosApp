import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido';  
import { Camion } from '../models/camion';  
import { Chofer } from '../models/chofer'; 
import { PlanDeDespacho } from '../models/planDeDespacho';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Despachos {

  // Lista de planes de despacho, inicialmente vacía
  planesDespacho = signal<PlanDeDespacho[]>([]);
  getPlanesDespacho = () => this.planesDespacho;

  camiones = signal<Camion[]>([]);

  getCamiones(): Observable<Camion[]> {
    if (this.camiones().length === 0) {
      return this.http.get<Camion[]>('/DespachosApp/data/camiones.json').pipe(
        map(camiones => {
          const instancias = camiones.map(c => new Camion(c.id, c.placa, c.estatus));
          this.camiones.set(instancias);
          return instancias;
        })
      );
    } else {
      return of (this.camiones());
    }
  }

  choferes = signal<Chofer[]>([]);

getChoferes(): Observable<Chofer[]> {
  if (this.choferes().length === 0) {
    return this.http.get<Chofer[]>('/DespachosApp/data/choferes.json').pipe(
      map(data => {
        const instancias = data.map(c => new Chofer(c.id, c.nombre, c.estatus));
        this.choferes.set(instancias);
        return instancias;
      })
    );
  } else {
    return of(this.choferes());
  }
}


  constructor(private http: HttpClient) { }

  // Cargar pedidos y convertirlos en instancias de Pedido
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>('/DespachosApp/data/pedidos.json').pipe(
      map(pedidos => pedidos.map(p => new Pedido(p.id, p.nombreTienda, p.numeroItems, p.destino)))
    );
  }

  // Cargar camiones y convertirlos en instancias de Camion
  // getCamiones(): Observable<Camion[]> {
  //   return this.http.get<Camion[]>('/data/camiones.json').pipe(
  //     map(camiones => camiones.map(c => new Camion(c.id, c.placa, c.estatus)))
  //   );
  // }

  // Cargar choferes y convertirlos en instancias de Chofer
  // getChoferes(): Observable<Chofer[]> {
  //   return this.http.get<Chofer[]>('/data/choferes.json').pipe(
  //     map(choferes => choferes.map(c => new Chofer(c.id, c.nombre, c.estatus)))
  //   );
  // }


  // Agregar nuevo despacho
  agregarDespacho(despacho: PlanDeDespacho) {
    const actuales = this.planesDespacho();
    this.planesDespacho.set([...actuales, despacho]);
  }

  

}
