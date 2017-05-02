import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "components/404/404.component";

const appRoutes: Routes = [
    {
        component: PageNotFoundComponent,
        path: "**"
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(appRoutes)
    ]
})
export class AppRoutingModule {}
