import { enableProdMode, NgModuleFactory } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "app/app.module";
import { AppModuleNgFactory } from "app/app.module.ngfactory";
import { UtilityService } from "services/utility.service";

UtilityService.createAppElement();
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
