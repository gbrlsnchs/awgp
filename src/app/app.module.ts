import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "app/app-routing.module";
import { AppComponent } from "app/app.component";
import { PageNotFoundComponent } from "components/404/404.component";
import { HomeModule } from "modules/home/home.module";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HomeModule,
        HttpModule,
        JsonpModule,
        AppRoutingModule
    ]
})
export class AppModule {}
