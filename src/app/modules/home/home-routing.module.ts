import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "modules/home/home.component";

const homeRoutes: Routes = [
    {
        component: HomeComponent,
        path: ""
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(homeRoutes)
    ]
})
export class HomeRoutingComponent {}
