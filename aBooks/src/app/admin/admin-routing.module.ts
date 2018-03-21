import {NgModule} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import { NewEditComponent } from './new-edit/new-edit.component';
import { BookdetailsComponent } from './allbooks/bookdetails/bookdetails.component';
import { AdminStartComponent } from './AdminStart/adminstart.component';
import { AdminComponent } from './admin.component';
import { RequestedComponent } from './requested/requested.component';
import { AllbooksComponent } from './allbooks/allbooks.component';
import { adminAuthService } from '../auth/adminauth.service';

const recipesRoutes : Routes = [
    { path: '', component : AdminComponent,children:[
        {path: '',component:AdminStartComponent},
        {path: 'new', component: NewEditComponent},
        {path: 'allbooks', component: AllbooksComponent},
        {path: 'requested', component: RequestedComponent},
        {path: 'allbooks/:id', component:BookdetailsComponent},
        {path: 'allbooks/:id/edit', component: NewEditComponent}
    ] },
]

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule],
    providers:[adminAuthService] 
})
export class AdminRoutingModule{

}