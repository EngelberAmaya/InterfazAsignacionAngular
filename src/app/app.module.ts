import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// rutas
import { app_routing } from "./app.routes";
// consumo de servicios
import { HttpClientModule } from '@angular/common/http';

// para guardar
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//primeng
import { MyPrimengModule } from '../app/primeng/my-primeng.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {ToastModule} from 'primeng/toast';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListadoComponent } from './components/listado/listado.component';
import { SoftwareComponent } from './components/software/software.component';
import { HardwareComponent } from './components/hardware/hardware.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
//import { EdituserComponent } from './components/edituser/edituser.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormularioComponent,
    ListadoComponent,
    SoftwareComponent,
    HardwareComponent,
    AssignmentComponent
    //EdituserComponent
    //ToastModule
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    app_routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MyPrimengModule,
    BrowserAnimationsModule
    //ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
