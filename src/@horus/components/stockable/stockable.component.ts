import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { graphQL } from '../../../app/main/apps/market/stock/stock.graphql';
import { HttpService } from '../../services/http.service';
import { environment } from 'environments/environment';
import { StockableDialogComponent } from './stockable-dialog.component';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-stockable',
    templateUrl: './stockable.component.html'
})
export class StockableComponent implements OnChanges
{
    @Input() stocksData = [];
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['warehouse_id', 'warehouse_name', 'stock', 'minimum_stock', 'actions'];
    dataSource = new MatTableDataSource();
    env: any = environment;

    constructor(
        private _http: HttpService,
        private _dialog: MatDialog
    ) {}

    ngOnChanges(): void
    {
        this.dataSource.data = this.stocksData;
        this.dataSource.sort = this.sort;
    }

    editStock(stockData: any): void
    {
        if (this.env.debug) console.log('DEBUG - Edit stock with this arguments: ', stockData);

        const dialogRef = this._dialog.open(StockableDialogComponent, {
            data: {
                stockData: stockData
            },
            width: '80vw'
        });

        dialogRef.afterClosed().subscribe(newStockData => {

            if (newStockData)
            {
                if (this.env.debug) console.log('DEBUG - Update stock with this arguments: ', newStockData);

                const ob$ = this._http
                    .apolloClient()
                    .mutate({
                        mutation: graphQL.mutationSetStock,
                        variables: {
                            payload: {
                                warehouse_id: newStockData.warehouse_id,
                                product_id: newStockData.product_id,
                                stock: newStockData.stock,
                                minimum_stock: newStockData.minimum_stock
                            }
                        }
                    })
                    .subscribe((response) => {
                        ob$.unsubscribe();

                        // Find stock index using _.findIndex (thanks @AJ Richardson for comment)
                        const index = _.findIndex(this.stocksData, { warehouse_id: newStockData.warehouse_id, product_id: newStockData.product_id });

                        // Replace stock at index using native splice
                        this.stocksData.splice(index, 1, newStockData);

                        this.dataSource.data = this.stocksData;
                    });
            }
        });
    }
}
