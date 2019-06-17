export interface FuseNavigationItem
{
    id: string;
    title: string;
    type: 'item' | 'group' | 'collapsable';
    resource?: string;  // @HORUS
    translate?: string;
    icon?: string | [string, string];   // @HORUS
    hidden?: boolean;
    url?: string;
    classes?: string;
    exactMatch?: boolean;
    externalUrl?: boolean;
    openInNewTab?: boolean;
    function?: any;
    badge?: {
        title?: string;
        translate?: string;
        bg?: string;
        fg?: string;
    };
    children?: FuseNavigationItem[];
}

export interface FuseNavigation extends FuseNavigationItem
{
    children?: FuseNavigationItem[];
}
