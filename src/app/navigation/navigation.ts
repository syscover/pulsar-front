export const navigation = [
    {
        'id'        : 'applications',
        'title'     : 'Applications',
        'translate' : 'NAV.APPLICATIONS',
        'type'      : 'group',
        'children'  : [
            {
                'id'   : 'market',
                'title': 'Market',
                'translate': 'NAV.MARKET',
                'type' : 'collapse',
                'icon' : 'store_mall_directory',
                'children' : [
                ]
            },
            {
                'id'   : 'cms',
                'title': 'CMS',
                'translate': 'NAV.CMS',
                'type' : 'collapse',
                'icon' : 'art_track',
                'children' : [
                    {
                        'id'        : 'articles',
                        'title'     : 'Articles',
                        'translate' : 'NAV.ARTICLES',
                        'type'      : 'item',
                        'icon'      : 'library_books',
                        'url'       : '/apps/cms/article'
                    },
                    {
                        'id'        : 'sections',
                        'title'     : 'Sections',
                        'translate' : 'NAV.SECTIONS',
                        'type'      : 'item',
                        'icon'      : 'power',
                        'url'       : '/apps/cms/section'
                    },
                    {
                        'id'        : 'families',
                        'title'     : 'Families',
                        'translate' : 'NAV.FAMILIES',
                        'type'      : 'item',
                        'icon'      : 'class',
                        'url'       : '/apps/cms/family'
                    }
                ]
            },
            {
                'id'       : 'administration',
                'title'    : 'Administration',
                'translate': 'NAV.ADMINISTRATION',
                'type'     : 'collapse',
                'icon'     : 'settings',
                'children' : [
                    {
                        'id'        : 'countries',
                        'title'     : 'Countries',
                        'translate' : 'NAV.COUNTRIES',
                        'type'      : 'item',
                        'icon'      : 'public',
                        'url'       : '/apps/admin/country'
                    },
                    {
                        'id'        : 'packages',
                        'title'     : 'Packages',
                        'translate' : 'NAV.PACKAGES',
                        'type'      : 'item',
                        'icon'      : 'view_module',
                        'url'       : '/apps/admin/package'
                    },
                    {
                        'id'       : 'permissions',
                        'title'    : 'Permissions',
                        'translate': 'NAV.PERMISSIONS',
                        'type'     : 'collapse',
                        'icon'     : 'fingerprint',
                        'children' : [
                            {
                                'id'   : 'actions',
                                'title': 'Actions',
                                'translate': 'NAV.ACTIONS',
                                'type' : 'item',
                                'icon' : 'flash_on',
                                'url'  : '/apps/admin/action'
                            },
                            {
                                'id'   : 'resources',
                                'title': 'Resources',
                                'translate': 'NAV.RESOURCES',
                                'type' : 'item',
                                'icon' : 'rounded_corner',
                                'url'  : '/apps/admin/resource'
                            },
                        ]
                    }
                ]
            },
            {
                'id'   : 'sample',
                'title': 'Sample',
                'translate': 'NAV.SAMPLE.TITLE',
                'type' : 'item',
                'icon' : 'email',
                'url'  : '/apps/sample/sample',
                'badge': {
                    'title': 25,
                    'translate': 'NAV.SAMPLE.BADGE',
                    'bg'   : '#F44336',
                    'fg'   : '#FFFFFF'
                }
            }
        ]
    }
];
