import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FooterComponent } from "components/footer/footer.component";
import { HeaderComponent } from "components/header/header.component";
import { HomeRoutingComponent } from "modules/home/home-routing.module";
import { HomeComponent } from "modules/home/home.component";

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingComponent
    ]
})
export class HomeModule {}
