import { Component } from "@angular/core";

@Component({
    selector: "app-header",
    styleUrls: ["header.scss"],
    templateUrl: "header.html"
})
export class HeaderComponent {
    public menuItems: Array<MenuItem>;

    constructor() {
        this.menuItems = [
            { label: "Source Code", url: "https://github.com/gbrlsnchs/awgp" },
        ];
    }
}

interface MenuItem {
    label: string;
    url: string;
}
