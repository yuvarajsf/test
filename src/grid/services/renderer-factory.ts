import { isNullOrUndefined, getEnumValue } from '@syncfusion/ej2-base';
import { IRenderer } from '../base/interface';
import { RenderType } from '../base/enum';


/**
 * RendererFactory
 * @hidden
 */
export class RendererFactory {

    public rendererMap: { [c: string]: IRenderer } = {};

    public addRenderer(name: RenderType, type: IRenderer): void {
        let rName: string = <string>getEnumValue(RenderType, <RenderType>name);

        if (isNullOrUndefined(this.rendererMap[rName])) {
            this.rendererMap[rName] = type;
        }
    }

    public getRenderer(name: RenderType): IRenderer {
        let rName: string = <string>getEnumValue(RenderType, <RenderType>name);

        if (isNullOrUndefined(this.rendererMap[rName])) {
            throw `The renderer ${rName} is not found`;
        } else {
            return this.rendererMap[rName];
        }
    }
}