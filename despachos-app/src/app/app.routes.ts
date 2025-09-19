import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { CrearDespacho } from './pages/crear-despacho/crear-despacho';
import { DetalleDespacho } from './pages/detalle-despacho/detalle-despacho';


export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'crear-despacho', component: CrearDespacho },
    { path: 'detalle-despacho/:id', component: DetalleDespacho }
];