import {NgModule} from '@angular/core'
import { CommonModule } from '@angular/common';
import {AllbooksComponent} from './allbooks/allbooks.component';
import {BookdetailsComponent} from './allbooks/bookdetails/bookdetails.component';
import {NewEditComponent} from './new-edit/new-edit.component';
import {RequestedComponent} from './requested/requested.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminStartComponent } from './AdminStart/adminstart.component';
import { AdminComponent } from './admin.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations:[
        AllbooksComponent,
        BookdetailsComponent,
        NewEditComponent,
        RequestedComponent,
        AdminStartComponent,
        AdminComponent,
        AdminlistComponent
    ], 
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,

    ]
})
export class AdminModule {

} 