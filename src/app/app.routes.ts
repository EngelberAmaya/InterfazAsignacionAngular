import { RouterModule, Routes } from '@angular/router';

import { FormularioComponent } from './components/formulario/formulario.component';
import { ListadoComponent } from './components/listado/listado.component';
//import { EdituserComponent } from './components/edituser/edituser.component';
import { SoftwareComponent } from './components/software/software.component';
import { HardwareComponent } from './components/hardware/hardware.component';
import { AssignmentComponent } from './components/assignment/assignment.component';

const app_routes: Routes = [
    { path: 'formulario', component: FormularioComponent},
    { path: 'software', component: SoftwareComponent},
    { path: 'hardware', component: HardwareComponent},
    { path: 'listado', component: ListadoComponent},
    { path: 'asignaciones', component: AssignmentComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'formulario'}
];

export const app_routing = RouterModule.forRoot(app_routes);