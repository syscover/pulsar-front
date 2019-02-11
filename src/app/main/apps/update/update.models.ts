export class Version
{
    id: number;
    package_id: number;
    version: string;
    name: string;
    publish: boolean;
}

export class Query
{
    id: number;
    version_id: number;
    query: string;
    sort: number;
}

export class Update
{
    id: number;
    start_version: string;
    end_version: string;
    license: string;
}
