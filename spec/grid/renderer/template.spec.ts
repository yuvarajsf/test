/**
 * Template render spec
 */
import { EmitType } from '@syncfusion/ej2-base';
import { createElement, remove } from '@syncfusion/ej2-base';
import { Grid } from '../../../src/grid/base/grid';
import { data } from '../base/datasource.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { createGrid, destroy } from '../base/specutil.spec';

describe('Template render module', () => {
    describe('column template render', () => {
        let gridObj: Grid;
        beforeAll((done: Function) => {
            gridObj = createGrid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        { field: 'EmployeeID' },
                        { template: '<div>${EmployeeID}</div><div>${index}</div>', headerText: 'Template column' },
                        { field: 'CustomerID', headerText: 'Customer ID' },

                    ]
                }, done);
        });

        it('template render testing', () => {
            let trs = gridObj.getContent().querySelectorAll('tr');
            expect(trs[0].querySelector('.e-templatecell').innerHTML).toBe('<div>5</div><div>0</div>');
            expect(trs[1].querySelector('.e-templatecell').innerHTML).toBe('<div>6</div><div>1</div>');
            expect(gridObj.getHeaderTable().querySelectorAll('.e-headercelldiv')[1].innerHTML).toBe('<span class="e-headertext">Template column</span>');
        });

        it('EJ2-7062 selection with template element testing', () => {
            let trs = gridObj.getContent().querySelectorAll('tr');
            trs[2].querySelector('div').click();
            expect(gridObj.selectedRowIndex).toBe(2);
        });

        afterAll(() => {
            destroy(gridObj);
        });

    });

    describe('column template element render', () => {
        let gridObj: Grid;
        beforeAll((done: Function) => {
            let template: Element = createElement('div', { id: 'template' });
            template.innerHTML = '<div>${EmployeeID}</div>';
            document.body.appendChild(template);
            gridObj = createGrid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        { field: 'EmployeeID' },
                        { template: '#template', headerText: 'Template column' },
                        { field: 'CustomerID', headerText: 'Customer ID' },

                    ]
                }, done);
        });

        it('cell value testing', () => {
            let trs = gridObj.getContent().querySelectorAll('tr');
            //expect(trs[0].querySelector('.e-templatecell').innerHTML).toBe('<div>5</div>');
        });

        afterAll(() => {
            destroy(gridObj);
        });

    });


    describe('row template render', () => {
        let gridObj: Grid;
        beforeAll((done: Function) => {
            gridObj = createGrid(
                {
                    dataSource: data, allowPaging: false,
                    rowTemplate: '<tr><td>${OrderID}</td><td>${EmployeeID}</td></tr>',
                    columns: [
                        { field: 'EmployeeID', headerText: 'Employee ID' },
                        { field: 'CustomerID', headerText: 'Customer ID' },

                    ]
                }, done);
        });

        it('row render testing', () => {
            let trs = gridObj.getContent().querySelectorAll('tr');
            expect(trs[0].querySelectorAll('td')[0].innerHTML).toBe('10248');
            expect(trs[0].querySelectorAll('td')[1].innerHTML).toBe('5');
            expect(trs[1].querySelectorAll('td')[0].innerHTML).toBe('10249');
            expect(trs[1].querySelectorAll('td')[1].innerHTML).toBe('6');
        });

        afterAll(() => {
            destroy(gridObj);
        });

    });

    //for coverage
    describe('row template render', () => {
        let gridObj: Grid;
        beforeAll((done: Function) => {
            gridObj = createGrid(
                {
                    dataSource: data, allowPaging: false,
                    rowTemplate: '<div>${OrderID}</div>',
                    columns: [
                        { field: 'EmployeeID', headerText: 'Employee ID' },
                    ]
                }, done);
        });

        it('row render testing', () => {
            let trs = gridObj.getContent().querySelectorAll('tr');
           // expect(trs[0].querySelectorAll('td')[0].innerHTML).not.toBe('10248');
        });

        afterAll(() => {
            destroy(gridObj);
        });

    });
    describe('caption template render', () => {
        let gridObj: Grid;
        let template: Element = createElement('div', { id: 'captiontemplate' });
        template.innerHTML = '<div>${EmployeeID}</div>';
        document.body.appendChild(template);
        beforeAll((done: Function) => {
            gridObj = createGrid(
                {
                    dataSource: data, allowPaging: false,
                    allowGrouping: true,
                    groupSettings: { captionTemplate: '#captiontemplate', columns: ['EmployeeID'] },
                    columns: [
                        { field: 'EmployeeID', headerText: 'Employee ID' },
                        { field: 'CustomerID', headerText: 'Customer ID' },

                    ]
                }, done);
        });

        it('check caption template', () => {
            let rows: HTMLTableRowElement = (<any>(gridObj.getContentTable() as HTMLTableElement)
                .querySelector('.e-summaryrow') as HTMLTableRowElement);
        });

        afterAll(() => {
            destroy(gridObj);
        });

    });
    describe('caption template render', () => {
        let gridObj: Grid;
        beforeAll((done: Function) => {
            gridObj = createGrid(
                {
                    dataSource: data, allowPaging: false,
                    allowGrouping: true,
                    groupSettings: { captionTemplate: '<div>${EmployeeID}</div>', columns: ['EmployeeID'] },
                    columns: [
                        { field: 'EmployeeID', headerText: 'Employee ID' },
                        { field: 'CustomerID', headerText: 'Customer ID' },

                    ]
                }, done);
        });

        it('check caption template', () => {
            let rows: HTMLTableRowElement = (<any>(gridObj.getContentTable() as HTMLTableElement)
                .querySelector('.e-summaryrow') as HTMLTableRowElement);
        });

        afterAll(() => {
            destroy(gridObj);
        });

    });


});