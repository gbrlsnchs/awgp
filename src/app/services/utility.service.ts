import { Injectable } from "@angular/core";

@Injectable()
export abstract class UtilityService {
    public static createAppElement(): void {
        let appElement: Node = document.createElement("app");
        let body: Element = document.getElementsByTagName("body")[0];
        body.appendChild(appElement);
    }
}
