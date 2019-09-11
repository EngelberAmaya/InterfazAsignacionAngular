import {NgModule} from '@angular/core';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    
  ],
  imports: [
    
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    ToastModule,
    ConfirmDialogModule

  ],
 
})

export class MyPrimengModule { }