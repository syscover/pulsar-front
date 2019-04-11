export interface DialogDecoratorInterface {
    getObject: Function;
}
export function Dialog(): Function {
    return function(target: Function): void {
        target.prototype.getObject = function (): void {
            const ob$ = this._http
                .apolloClient()
                .watchQuery({
                    query: this.graphQL.queryObject,
                    variables: {
                        sql: [{
                            command: 'where',
                            column: `${this.graphQL.table}.id`,
                            operator: '=',
                            value: this.data.id
                        },
                        {
                            command: 'where',
                            column: `${this.graphQL.table}.lang_id`,
                            operator: '=',
                            value: this._config.get('base_lang')
                        }]
                    }
                })
                .valueChanges
                .subscribe(({data}) => {
                    ob$.unsubscribe();

                    // instance data
                    this.fg.patchValue(data['coreObject']);

                    // set new lang
                    this.fg.patchValue({
                        lang_id: this.lang.id   // set lang id in form from object with multiple language
                    });

                    this.showSpinner = false;
                });
        };
    };
}
