export class Version
{
    id: number;
    name: string;
    package_id: number;
    version: string;
    minimal_panel_version: string;
    composer: boolean;
    publish: boolean;
    migration: boolean;
    query: string;
    provide: boolean;
    provide_from: string;
}
