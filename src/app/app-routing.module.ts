import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
/*componentes*/
import {LoginComponent} from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CajaComponent } from './components/caja/caja.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';


/*servicios*/
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'inicio',component:InicioComponent,canActivate:[AuthGuardService]},
  {path:'caja',component:CajaComponent,canActivate:[AuthGuardService]},
  {path:'ventas',component:VentasComponent,canActivate:[AuthGuardService]},
  {path:'usuarios',component:UsuariosComponent,canActivate:[AuthGuardService]},
  {path:'productos',component:ProductosComponent,canActivate:[AuthGuardService]},
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
