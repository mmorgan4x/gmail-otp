import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[popupLink]',
})
export class PopupLinkDirective {

    @HostListener('click', ['$event'])
    async click(e: any) {
        e.preventDefault();
        await new Promise(t => chrome.tabs.create({ url: e.currentTarget.href, selected: false }, t));
    }
}
