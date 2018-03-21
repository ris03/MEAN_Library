import {NgModule} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import { UserComponent } from './user.component';
import { UserstartComponent } from './userstart/userstart.component';
import { AllbooksComponent } from './allbooks/allbooks.component';
import { IssuedbooksComponent } from './issuedbooks/issuedbooks.component';
import { SearchbookComponent } from './searchbook/searchbook.component';

const recipesRoutes : Routes = [
    { path: '', component : UserComponent,children:[
        {path: '',component:UserstartComponent },
        {path: 'allbooks', component: AllbooksComponent},
        {path: 'issuedbooks', component: IssuedbooksComponent},
        {path: 'search/:name', component: SearchbookComponent},
    ] },
]

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule],
    providers:[] 
})
export class UserRoutingModule{

}
