import { compile } from '@syncfusion/ej2-base';
import { getEnumValue } from '@syncfusion/ej2-base';
import { CustomSummaryType } from '../base/type';
import { AggregateType, CellType } from '../base/enum';
import { Property, Collection, ChildProperty, NumberFormatOptions, DateFormatOptions } from '@syncfusion/ej2-base';
import { AggregateColumnModel } from './aggregate-model';
import { ValueFormatter } from '../services/value-formatter';


/**
 * Configures the Grid's aggregate column.
 */
export class AggregateColumn extends ChildProperty<AggregateColumn> {

    private formatFn: Function;
    private templateFn: { [x: string]: { fn: Function, property: string } } = {};

    /**
     * Defines the aggregate type of a particular column.
     * To use multiple aggregates for single column, specify the `type` as array.
     * Types of aggregate are,
     * * sum
     * * average
     * * max
     * * min
     * * count
     * * truecount
     * * falsecount
     * * custom
     * > Specify the `type` value as `custom` to use custom aggregation.
     * @aspType string
     * @default null
     */
    @Property()
    public type: AggregateType | AggregateType[] | string;

    /**
     * Defines the column name to perform aggregation.
     * @default null
     */
    @Property()
    public field: string;

    /**
     * Defines the column name to display the aggregate value. If `columnName` is not defined,
     * then `field` name value will be assigned to the `columnName` property.
     * @default null
     */
    @Property()
    public columnName: string;

    /**    
     * Format is applied to a calculated value before it is displayed.
     * Gets the format from the user, which can be standard or custom
     * [`number`](../common/intl.html#number-formatter-and-parser)
     * and [`date`](../common/intl.html#date-formatter-and-parser) formats.
     * @aspType string
     * @default null    
     */
    @Property()
    public format: string | NumberFormatOptions | DateFormatOptions;

    /**
     * Defines the footer cell template as a string for the aggregate column.
     * The `type` name should be used to access aggregate values inside the template.
     * 
     * {% codeBlock src="grid/footer-template-api/index.ts" %}{% endcodeBlock %}
     * @default null
     */
    @Property()
    public footerTemplate: string;

    /**
     * Defines the group footer cell template as a string for the aggregate column. 
     * The `type` name should be used to access aggregate values inside the template.
     * Additionally, the following fields can be accessed in the template.
     * * **field**: The current grouped field.
     * * **key**: The current grouped value.
     * 
     * {% codeBlock src="grid/group-footer-api/index.ts" %}{% endcodeBlock %}
     * @default null
     */
    @Property()
    public groupFooterTemplate: string;

    /**
     * Defines the group caption cell template as a string for the aggregate column.
     * The `type` name should be used to access aggregate values inside the template.
     * Additionally, the following fields can be accessed in the template.
     * * **field**: The current grouped field name.
     * * **key**: The current grouped field value.
     * 
     * {% codeBlock src="grid/group-caption-api/index.ts" %}{% endcodeBlock %}
     * @default null
     */
    @Property()
    public groupCaptionTemplate: string;

    /**
     * Defines a function to calculate custom aggregate value. The `type` value should be set to `custom`.
     * To use custom aggregate value in the template, use the key as `${custom}`.
     * **Total aggregation**: The custom function will be called with the whole data and the current `AggregateColumn` object.
     * **Group aggregation**: This will be called with the current group details and the `AggregateColumn` object.
     * 
     * @default null
     */
    @Property()
    public customAggregate: CustomSummaryType | string;
    /**
     * @hidden
     */
    public setFormatter(cultureName: string): void {
        let valueFormatter: ValueFormatter = new ValueFormatter(cultureName);
        if (this.format && ((<DateFormatOptions>this.format).skeleton || (<DateFormatOptions>this.format).format)) {
            this.formatFn = valueFormatter.getFormatFunction(this.format as DateFormatOptions);
        }
    }
    /**
     * @hidden
     */
    public getFormatter(): Function {
        return this.formatFn;
    }
    /**
     * @hidden
     */
    public setTemplate(helper: Object = {}): void {
        if (this.footerTemplate !== undefined) {
            this.templateFn[getEnumValue(CellType, CellType.Summary)] = { fn: compile(this.footerTemplate, helper),
                property: 'footerTemplate' };

        }
        if (this.groupFooterTemplate !== undefined) {
            this.templateFn[getEnumValue(CellType, CellType.GroupSummary)] = {fn: compile(this.groupFooterTemplate, helper),
                property: 'groupFooterTemplate'};

        }
        if (this.groupCaptionTemplate !== undefined) {
            this.templateFn[getEnumValue(CellType, CellType.CaptionSummary)] = {fn: compile(this.groupCaptionTemplate, helper),
                property: 'groupCaptionTemplate'};

        }
    }
    /**
     * @hidden
     */
    public getTemplate(type: CellType): { fn: Function, property: string } {
        return this.templateFn[getEnumValue(CellType, type)];
    }

    /**
     * @hidden
     */
    public setPropertiesSilent(prop: Object): void {
        this.setProperties(prop, true);
    }

}

/**
 * Configures the aggregate rows. 
 */
export class AggregateRow extends ChildProperty<AggregateRow> {

    /**
     * Configures the aggregate columns. 
     * @default []
     */
    @Collection<AggregateColumnModel>([], AggregateColumn)
    public columns: AggregateColumnModel[];

}

