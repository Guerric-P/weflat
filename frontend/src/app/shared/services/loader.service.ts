import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable } from '@angular/core';
import { LoaderComponent } from '@weflat/app/shared/components/loader/loader.component';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    overlayRef: OverlayRef;
    componentFactory: ComponentFactory<LoaderComponent>;
    componentPortal: ComponentPortal<LoaderComponent>;
    componentRef: ComponentRef<LoaderComponent>;
    private locked: boolean;

    constructor(
        private overlay: Overlay,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.overlayRef = this.overlay.create(
            {
                hasBackdrop: true,
                positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
            }
        );

        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoaderComponent);

        this.componentPortal = new ComponentPortal(this.componentFactory.componentType);
    }

    show(message?: string) {
        if (!this.locked) {
            this.componentRef = this.overlayRef.attach<LoaderComponent>(this.componentPortal);
            this.componentRef.instance.message = message;
        }
    }

    hide() {
        this.overlayRef.detach();
    }

    lock() {
        this.locked = true;
    }

    unlock() {
        this.locked = false;
    }
}
