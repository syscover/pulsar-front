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
                    },
                    {
                        'id'        : 'categories',
                        'title'     : 'Categories',
                        'translate' : 'NAV.CATEGORIES',
                        'type'      : 'item',
                        'icon'      : 'chrome_reader_mode',
                        'url'       : '/apps/cms/category'
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
                        'id'        : 'languagues',
                        'title'     : 'Languages',
                        'translate' : 'NAV.LANGUAGES',
                        'type'      : 'item',
                        'icon'      : 'translate',
                        'url'       : '/apps/admin/lang'
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
                        'id'       : 'custom_fields',
                        'title'    : 'Custom fields',
                        'translate': 'NAV.CUSTOM_FIELDS',
                        'type'     : 'collapse',
                        'icon'     : 'text_fields',
                        'children' : [
                            {
                                'id'   : 'fields',
                                'title': 'Fields',
                                'translate': 'NAV.FIELDS',
                                'type' : 'item',
                                'icon' : 'format_list_bulleted',
                                'url'  : '/apps/admin/field'
                            },
                            {
                                'id'   : 'field_groups',
                                'title': 'Field groups',
                                'translate': 'NAV.FIELD_GROUPS',
                                'type' : 'item',
                                'icon' : 'dvr',
                                'url'  : '/apps/admin/field-group'
                            }
                        ]
                    },
                    {
                        'id'       : 'attachments',
                        'title'    : 'Attachemnts',
                        'translate': 'NAV.ATTACHMENTS',
                        'type'     : 'collapse',
                        'icon'     : 'attachment',
                        'children' : [
                            {
                                'id'   : 'attachment_families',
                                'title': 'Attachment families',
                                'translate': 'NAV.ATTACHMENT_FAMILIES',
                                'type' : 'item',
                                'icon' : 'photo',
                                'url'  : '/apps/admin/attachment-family'
                            },
                            {
                                'id'   : 'attachment_mimes',
                                'title': 'Attachment mimes',
                                'translate': 'NAV.ATTACHMENT_MIMES',
                                'type' : 'item',
                                'icon' : 'camera_alt',
                                'url'  : '/apps/admin/attachment-mimes'
                            },
                            {
                                'id'   : 'attachment_library',
                                'title': 'Attachment library',
                                'translate': 'NAV.ATTACHMENT_LIBRARY',
                                'type' : 'item',
                                'icon' : 'photo_library',
                                'url'  : '/apps/admin/attachment-library'
                            }
                        ]
                    },

                    {
                        'id'       : 'permissions',
                        'title'    : 'Permissions',
                        'translate': 'NAV.PERMISSIONS',
                        'type'     : 'collapse',
                        'icon'     : 'fingerprint',
                        'children' : [
                            {
                                'id'   : 'profiles',
                                'title': 'Profiles',
                                'translate': 'NAV.PROFILES',
                                'type' : 'item',
                                'icon' : 'perm_identity',
                                'url'  : '/apps/admin/profile'
                            },
                            {
                                'id'   : 'resources',
                                'title': 'Resources',
                                'translate': 'NAV.RESOURCES',
                                'type' : 'item',
                                'icon' : 'rounded_corner',
                                'url'  : '/apps/admin/resource'
                            },
                            {
                                'id'   : 'actions',
                                'title': 'Actions',
                                'translate': 'NAV.ACTIONS',
                                'type' : 'item',
                                'icon' : 'flash_on',
                                'url'  : '/apps/admin/action'
                            }
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
