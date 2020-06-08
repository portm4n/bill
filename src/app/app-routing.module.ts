import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { FacturasComponent } from './components/facturas/facturas.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'perfil/:usuarioId/crearfactura', component: CrearFacturaComponent },
  { path: 'perfil/:usuarioId/facturas', component: FacturasComponent },
  { path: 'perfil/:usuarioId', component: PerfilComponent },
  { path: 'crearUsuario', component: CrearUsuarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
