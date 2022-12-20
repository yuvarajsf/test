import { IGrid, IAction } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
import * as events from '../base/constant';
import { RenderType } from '../base/enum';
import { parentsUntil } from '../base/util';
import { EventHandler } from '@syncfusion/ej2-base';
import { FreezeRender, FreezeContentRender } from '../renderer/freeze-renderer';

/**
 * `Freeze` module is used to handle Frozen rows and columns.
 * @hidden
 */
export class Freeze implements IAction {
    private locator: ServiceLocator;
    private parent: IGrid;
    constructor(parent: IGrid, locator?: ServiceLocator) {
        this.parent = parent;
        this.locator = locator;
        this.addEventListener();
    }

    public getModuleName(): string {
        return 'freeze';
    }

    public addEventListener(): void {
        if (this.parent.isDestroyed) { return; }
        this.parent.on(events.initialLoad, this.instantiateRenderer, this);
        this.parent.on(events.initialEnd, this.wireEvents, this);
    }

    private wireEvents(): void {
        if (this.parent.frozenRows) {
            EventHandler.add(this.parent.getHeaderContent(), 'dblclick', this.dblClickHandler, this);
        }
    }

    private dblClickHandler(e: MouseEvent): void {
        if (parentsUntil(e.target as Element, 'e-grid').id !== this.parent.element.id) {
            return;
        }
        this.parent.notify(events.dblclick, e);
    }

    private instantiateRenderer(): void {
        let renderer: RendererFactory = this.locator.getService<RendererFactory>('rendererFactory');
        if (this.parent.getFrozenColumns()) {
            renderer.addRenderer(RenderType.Header, new FreezeRender(this.parent, this.locator));
            renderer.addRenderer(RenderType.Content, new FreezeContentRender(this.parent, this.locator));
        }
    }

    public removeEventListener(): void {
        if (this.parent.isDestroyed) { return; }
        this.parent.off(events.initialLoad, this.instantiateRenderer);
    }

    public destroy(): void {
        this.removeEventListener();
    }
}