import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "app/app.module";
import { UtilityService } from "services/utility.service";

UtilityService.createAppElement();
platformBrowserDynamic().bootstrapModule(AppModule);
