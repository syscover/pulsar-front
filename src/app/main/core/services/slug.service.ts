import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import gql from 'graphql-tag';
import { first } from 'rxjs/operators/first';

@Injectable()
export class SlugService
{
    constructor(
        private httpService: HttpService
    ) {}

    async checkSlug(model: string, slug: string, object?: any, field?: string)
    {
        return await this.httpService
            .apolloClient()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: gql`
                    query CoreSlug ($model:String! $slug:String! $id:String $field:String) {
                        slug: coreSlug (model:$model slug:$slug id:$id field:$field)
                    }
                `,
                variables: {
                    model: model,
                    slug: slug,
                    id: object ? object.ix ? object.ix : object.id : undefined,
                    field: field,
                }
            })
            .valueChanges
            .pipe(
                first()
            )
            .toPromise();
    }
}
