import { Injectable } from '@angular/core';
import { HttpService } from '@horus/services/http.service';
import { first } from 'rxjs/operators';
import gql from 'graphql-tag';

@Injectable()
export class SlugService
{
    constructor(
        private _http: HttpService
    ) {}

    async checkSlug(model: string, slug: string, hasCheckLang: boolean, object?: any, column?: string): Promise<Object>
    {
        return await this._http
            .apolloClient()
            .watchQuery({
                query: gql`
                    query CoreSlug (
                        $model:String! 
                        $slug:String! 
                        $id:String 
                        $column:String 
                        $lang_id:String
                    ) 
                    {
                        slug: coreSlug (
                            model:$model 
                            slug:$slug 
                            id:$id
                            column:$column
                            lang_id:$lang_id
                        )
                    }
                `,
                variables: {
                    model: model,
                    slug: slug,
                    id: object ? object.ix ? object.ix : object.id : undefined,
                    column: column,
                    lang_id: object && object.lang_id && hasCheckLang ? object.lang_id : undefined
                }
            })
            .valueChanges
            .pipe(
                first()
            )
            .toPromise();
    }
}
