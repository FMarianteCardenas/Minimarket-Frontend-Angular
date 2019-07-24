import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*imports*/
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


/*componentes*/
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CajaComponent } from './components/caja/caja.component';
import { TableComponent } from './components/shared/table/table.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MisproductosComponent } from './components/misproductos/misproductos.component';


/*servicios*/
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {VentasService} from './services/ventas.service';
import {UsuariosService} from './services/usuarios.service';
import {MinimarketService} from './services/minimarket.service';
import {PaginatorService} from './services/paginator.service';
import {ProductosService} from './services/productos.service';
import {CategoriasService} from './services/categorias.service';

/*interceptor*/
import {AuthtokeninterceptorService} from './interceptor/authtokeninterceptor.service';

/*pipes*/
import { KeysPipe } from './pipes/keys.pipe';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    CajaComponent,
    TableComponent,
    VentasComponent,
    UsuariosComponent,
    KeysPipe,
    ProductosComponent,
    MisproductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    NgDatepickerModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuardService,
    VentasService,
    UsuariosService,
    PaginatorService,
    MinimarketService,
    ProductosService,
    CategoriasService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthtokeninterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
