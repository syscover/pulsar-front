import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../core/services/config/config.service';
import { CoreService } from './../shared/super/core.service';
import { PackageGraphQLService } from './../admin/package/package-graphql.service';
import { Package } from '../admin/admin.models';
import { AuthService } from './../core/auth/auth.service';
import gql from 'graphql-tag';
declare const jQuery: any; // jQuery definition

enum MenuOrientation {
    STATIC,
    OVERLAY,
    HORIZONTAL
};

@Component({
  selector: 'ps-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

    layoutCompact: boolean = true;
    layoutMode: MenuOrientation = MenuOrientation.STATIC;
    darkMenu: boolean = false;
    profileMode: string = 'inline';
    rotateMenuButton: boolean;
    topbarMenuActive: boolean;
    overlayMenuActive: boolean;
    staticMenuDesktopInactive: boolean;
    staticMenuMobileActive: boolean;
    layoutContainer: HTMLDivElement;
    layoutMenuScroller: HTMLDivElement;
    menuClick: boolean;
    topbarItemClick: boolean;
    activeTopbarItem: any;
    documentClickListener: Function;
    resetMenu: boolean;
    packages: Package[];

    @ViewChild('layoutContainer') layourContainerViewChild: ElementRef;
    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    constructor(
        private router: Router,
        private _renderer: Renderer2,
        private configService: ConfigService,
        private packageGraphQLService: PackageGraphQLService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.packages = this.configService.getConfig('packages');
     }

    ngAfterViewInit() {
        this.layoutContainer = <HTMLDivElement> this.layourContainerViewChild.nativeElement;
        this.layoutMenuScroller = <HTMLDivElement> this.layoutMenuScrollerViewChild.nativeElement;

        // hide the horizontal submenus or top menu if outside is clicked
        this.documentClickListener = this._renderer.listen('body', 'click', (event) => {
            if (!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if (!this.menuClick && this.isHorizontal()) {
                this.resetMenu = true;
            }

            this.topbarItemClick = false;
            this.menuClick = false;
        });

        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller({flash: true});
        }, 10);
    }

    onMenuButtonClick(event) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            } else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
            }
        }
        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if (! this.isHorizontal()) {
            setTimeout(() => {
                jQuery(this.layoutMenuScroller).nanoScroller();
            }, 500);
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        if (this.overlayMenuActive || this.staticMenuMobileActive) {
            this.rotateMenuButton = false;
            this.overlayMenuActive = false;
            this.staticMenuMobileActive = false;
        }
        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }
        event.preventDefault();
    }

    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }
        jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
    }

}
