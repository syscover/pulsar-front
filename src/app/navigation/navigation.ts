import { FuseNavigation } from '@fuse/types';

// @horus
export const navigation: FuseNavigation[] = [
    {
        'id'        : 'applications',
        'title'     : 'Applications',
        'translate' : 'NAV.APPLICATIONS',
        'type'      : 'group',
        'resource'  : 'app',
        'children'  : [
            {
                'id'        : 'dashboard',
                'title'     : 'Dashboard',
                'translate' : 'NAV.DASHBOARD',
                'type'      : 'item',
                'resource'  : 'dashboard',
                'icon'      : 'dashboard',
                'url'       : '/apps/dashboard'
            },
            {
                'id'       : 'innova-concrete',
                'title'    : 'Innova Concrete',
                'translate': 'NAV.INNOVA_CONCRETE',
                'type'     : 'collapsable',
                'resource' : 'innova',
                'icon'     : ['fas', 'archway'],
                'children' : [
                    {
                        'id'        : 'monument',
                        'title'     : 'Monument',
                        'translate' : 'NAV.MONUMENTS',
                        'type'      : 'item',
                        'resource'  : 'innova-monument',
                        'icon'      : ['fas', 'monument'],
                        'url'       : '/apps/innova-concrete/monument'
                    },
                    {
                        'id'       : 'database',
                        'title'    : 'Database',
                        'translate': 'NAV.TABLES',
                        'type'     : 'collapsable',
                        'resource' : 'innova-database',
                        'icon'     : ['fas', 'database'],
                        'children': [
                            {
                                'id'        : 'characteristic',
                                'title'     : 'Characteristic',
                                'translate' : 'NAV.CHARACTERISTICS',
                                'type'      : 'item',
                                'resource'  : 'innova-characteristic',
                                'icon'      : 'share',
                                'url'       : '/apps/innova-concrete/characteristic'
                            },
                            {
                                'id'        : 'type',
                                'title'     : 'Type',
                                'translate' : 'NAV.TYPES',
                                'type'      : 'item',
                                'resource'  : 'innova-type',
                                'icon'      : ['fas', 'cubes'],
                                'url'       : '/apps/innova-concrete/type'
                            },
                            {
                                'id'        : 'people',
                                'title'     : 'People',
                                'translate' : 'NAV.PEOPLE',
                                'type'      : 'item',
                                'resource'  : 'innova-people',
                                'icon'      : 'supervised_user_circle',
                                'url'       : '/apps/innova-concrete/people'
                            },
                            {
                                'id'        : 'group',
                                'title'     : 'Group',
                                'translate' : 'NAV.GROUPS',
                                'type'      : 'item',
                                'resource'  : 'innova-group',
                                'icon'      : ['fas', 'users-cog'],
                                'url'       : '/apps/innova-concrete/group'
                            },
                        ]
                    }
                ]
            },

            {
                'id'       : 'forem',
                'title'    : 'Forem',
                'translate': 'NAV.FOREM',
                'type'     : 'collapsable',
                'resource' : 'forem',
                'icon'     : 'highlight',
                'children' : [
                    {
                        'id'        : 'inscriptions',
                        'title'     : 'Inscriptions',
                        'translate' : 'NAV.INSCRIPTIONS',
                        'type'      : 'item',
                        'resource'  : 'forem-inscription',
                        'icon'      : ['fas', 'passport'],
                        'url'       : '/apps/forem/inscription'
                    },
                    {
                        'id'        : 'inscriptions-office',
                        'title'     : 'Inscriptions',
                        'translate' : 'NAV.INSCRIPTIONS',
                        'type'      : 'item',
                        'resource'  : 'forem-inscription-office',
                        'icon'      : ['fas', 'passport'],
                        'url'       : '/apps/forem/inscription-office'
                    },
                    {
                        'id'        : 'groups',
                        'title'     : 'Groups',
                        'translate' : 'NAV.GROUPS',
                        'type'      : 'item',
                        'resource'  : 'forem-group',
                        'icon'      : 'supervised_user_circle',
                        'url'       : '/apps/forem/group'
                    },
                    {
                        'id'        : 'groups',
                        'title'     : 'Groups',
                        'translate' : 'NAV.HISTORY_GROUPS',
                        'type'      : 'item',
                        'resource'  : 'forem-group',
                        'icon'      : 'supervised_user_circle',
                        'url'       : '/apps/forem/history-group'
                    },
                    {
                        'id'        : 'groups-office',
                        'title'     : 'Groups',
                        'translate' : 'NAV.GROUPS',
                        'type'      : 'item',
                        'resource'  : 'forem-group-office',
                        'icon'      : 'supervised_user_circle',
                        'url'       : '/apps/forem/group-office'
                    },
                    {
                        'id'        : 'actions',
                        'title'     : 'Actions',
                        'translate' : 'NAV.ACTIONS',
                        'type'      : 'item',
                        'resource'  : 'forem-action',
                        'icon'      : 'wb_incandescent',
                        'url'       : '/apps/forem/action'
                    },
                    {
                        'id'        : 'expedients',
                        'title'     : 'Expedients',
                        'translate' : 'NAV.EXPEDIENTS',
                        'type'      : 'item',
                        'resource'  : 'forem-expedient',
                        'icon'      : 'all_inbox',
                        'url'       : '/apps/forem/expedient'
                    },
                    {
                        'id'        : 'employment_offices',
                        'title'     : 'Employment offices',
                        'translate' : 'NAV.EMPLOYMENT_OFFICES',
                        'type'      : 'item',
                        'resource'  : 'forem-employment-office',
                        'icon'      : 'store_mall_directory',
                        'url'       : '/apps/forem/employment-office'
                    },
                    {
                        'id'        : 'categories',
                        'title'     : 'Categories',
                        'translate' : 'NAV.CATEGORIES',
                        'type'      : 'item',
                        'resource'  : 'forem-category',
                        'icon'      : 'chrome_reader_mode',
                        'url'       : '/apps/forem/category'
                    },
                    {
                        'id'        : 'trainers',
                        'title'     : 'Trainers',
                        'translate' : 'NAV.TRAINERS',
                        'type'      : 'item',
                        'resource'  : 'forem-trainer',
                        'icon'      : 'school',
                        'url'       : '/apps/forem/trainer'
                    },
                    {
                        'id'       : 'database',
                        'title'    : 'Database',
                        'translate': 'NAV.TABLES',
                        'type'     : 'collapsable',
                        'resource' : 'forem-database',
                        'icon'     : ['fas', 'database'],
                        'children': [
                            {
                                'id'        : 'provinces',
                                'title'     : 'Provinces',
                                'translate' : 'NAV.PROVINCES',
                                'type'      : 'item',
                                'resource'  : 'forem-province',
                                'icon'      : 'add_location',
                                'url'       : '/apps/forem/province'
                            },
                            {
                                'id'        : 'localities',
                                'title'     : 'Localities',
                                'translate' : 'NAV.LOCALITIES',
                                'type'      : 'item',
                                'resource'  : 'forem-locality',
                                'icon'      : ['fas', 'globe-europe'],
                                'url'       : '/apps/forem/locality'
                            },
                            {
                                'id'        : 'profiles',
                                'title'     : 'Profiles',
                                'translate' : 'NAV.PROFILES',
                                'type'      : 'item',
                                'resource'  : 'forem-profile',
                                'icon'      : ['fas', 'id-badge'],
                                'url'       : '/apps/forem/profile'
                            },
                        ]
                    }
                ]
            },
            {
                'id'       : 'crm',
                'title'    : 'CRM',
                'translate': 'NAV.CRM',
                'type'     : 'collapsable',
                'resource' : 'crm',
                'icon'     : 'supervisor_account',
                'children' : [
                    {
                        'id'        : 'customers',
                        'title'     : 'Customer',
                        'translate' : 'NAV.CUSTOMERS',
                        'type'      : 'item',
                        'resource'  : 'crm-customer',
                        'icon'      : 'account_circle',
                        'url'       : '/apps/crm/customer'
                    },
                    {
                        'id'        : 'groups',
                        'title'     : 'Groups',
                        'translate' : 'NAV.CUSTOMER_GROUPS',
                        'type'      : 'item',
                        'resource'  : 'crm-group',
                        'icon'      : 'people',
                        'url'       : '/apps/crm/customer-group'
                    },
                    {
                        'id'        : 'address_types',
                        'title'     : 'Address types',
                        'translate' : 'NAV.ADDRESS_TYPES',
                        'type'      : 'item',
                        'resource'  : 'crm-address-type',
                        'icon'      : 'map',
                        'url'       : '/apps/crm/address-type'
                    }
                ]
            },
            /* {
                'id'   : 'booking',
                'title': 'Booking',
                'translate': 'NAV.BOOKING',
                'type' : 'collapsable',
                'icon' : 'class',
                'children' : [
                ]
            }, */
            {
                'id'       : 'market',
                'title'    : 'Market',
                'translate': 'NAV.MARKET',
                'type'     : 'collapsable',
                'resource' : 'market',
                'icon'     : 'store_mall_directory',
                'children' : [
                    {
                        'id'       : 'sales',
                        'title'    : 'Sales',
                        'translate': 'NAV.SALES',
                        'type'     : 'collapsable',
                        'resource' : 'market-sale',
                        'icon'     : 'euro_symbol',
                        'children' : [
                            {
                                'id'        : 'orders',
                                'title'     : 'Orders',
                                'translate' : 'NAV.ORDERS',
                                'type'      : 'item',
                                'resource'  : 'market-order',
                                'icon'      : 'add_shopping_cart',
                                'url'       : '/apps/market/order'
                            }
                        ]
                    },
                    {
                        'id'       : 'catalog',
                        'title'    : 'Catalog',
                        'translate': 'NAV.CATALOG',
                        'type'     : 'collapsable',
                        'resource' : 'market-catalog',
                        'icon'     : 'layers',
                        'children' : [
                            {
                                'id'        : 'products',
                                'title'     : 'Products',
                                'translate' : 'NAV.PRODUCTS',
                                'type'      : 'item',
                                'resource'  : 'market-product',
                                'icon'      : 'devices_other',
                                'url'       : '/apps/market/product'
                            },
                            {
                                'id'        : 'categories',
                                'title'     : 'Categories',
                                'translate' : 'NAV.CATEGORIES',
                                'type'      : 'item',
                                'resource'  : 'market-category',
                                'icon'      : 'chrome_reader_mode',
                                'url'       : '/apps/market/category'
                            },
                            {
                                'id'        : 'sections',
                                'title'     : 'Sections',
                                'translate' : 'NAV.SECTIONS',
                                'type'      : 'item',
                                'resource'  : 'market-section',
                                'icon'      : 'power',
                                'url'       : '/apps/market/section'
                            },
                            {
                                'id'        : 'warehouses',
                                'title'     : 'Warehouses',
                                'translate' : 'NAV.WAREHOUSES',
                                'type'      : 'item',
                                'resource'  : 'market-warehouse',
                                'icon'      : 'business',
                                'url'       : '/apps/market/warehouse'
                            }
                        ]
                    },
                    {
                        'id'       : 'marketing',
                        'title'    : 'Marketing',
                        'translate': 'NAV.MARKETING',
                        'type'     : 'collapsable',
                        'resource' : 'market-marketing',
                        'icon'     : 'my_location',
                        'children' : [
                            {
                                'id'        : 'cart_price_rules',
                                'title'     : 'Cart price rules',
                                'translate' : 'NAV.CART_PRICE_RULES',
                                'type'      : 'item',
                                'resource'  : 'market-cart-price-rule',
                                'icon'      : 'local_grocery_store',
                                'url'       : '/apps/market/marketing/cart-price-rule'
                            }
                        ]
                    },
                    {
                        'id'       : 'payment_gateways',
                        'title'    : 'Payment gateways',
                        'translate': 'NAV.PAYMENT_GATEWAYS',
                        'type'     : 'collapsable',
                        'resource' : 'market-tpv',
                        'icon'     : 'credit_card',
                        'children' : [
                            {
                                'id'        : 'paypal',
                                'title'     : 'PayPal',
                                'translate' : 'NAV.PAYPAL_WEB_PROFILES',
                                'type'      : 'item',
                                'resource'  : 'market-tpv-paypal-web-profile',
                                'icon'      : ['fab', 'paypal'],
                                'url'       : '/apps/market/payment-gateways/paypal-web-profile'
                            }
                        ]
                    },
                    {
                        'id'       : 'taxes',
                        'title'    : 'Taxes',
                        'translate': 'NAV.TAXES',
                        'type'     : 'collapsable',
                        'resource' : 'market-tax',
                        'icon'     : 'account_balance',
                        'children' : [
                            {
                                'id'        : 'tax_rules',
                                'title'     : 'Tax rules',
                                'translate' : 'NAV.TAX_RULES',
                                'type'      : 'item',
                                'resource'  : 'market-tax-rule',
                                'icon'      : 'gavel',
                                'url'       : '/apps/market/taxes/tax-rule'
                            },
                            {
                                'id'        : 'tax_rate_zones',
                                'title'     : 'Tax rate zones',
                                'translate' : 'NAV.TAX_RATE_ZONES',
                                'type'      : 'item',
                                'resource'  : 'market-tax-rate-zone',
                                'icon'      : 'language',
                                'url'       : '/apps/market/taxes/tax-rate-zone'
                            },
                            {
                                'id'        : 'product_class_taxes',
                                'title'     : 'Product class taxes',
                                'translate' : 'NAV.PRODUCT_CLASS_TAXES',
                                'type'      : 'item',
                                'resource'  : 'market-tax-product',
                                'icon'      : 'view_agenda',
                                'url'       : '/apps/market/taxes/product-class-tax'
                            },
                            {
                                'id'        : 'customer_class_taxes',
                                'title'     : 'Customer class taxes',
                                'translate' : 'NAV.CUSTOMER_CLASS_TAXES',
                                'type'      : 'item',
                                'resource'  : 'market-tax-customer',
                                'icon'      : 'assignment_ind',
                                'url'       : '/apps/market/taxes/customer-class-tax'
                            },
                            {
                                'id'        : 'customer_groups_customer_class_taxes',
                                'title'     : 'Customer groups customer class taxes',
                                'translate' : 'NAV.CUSTOMER_GROUPS_CUSTOMER_CLASS_TAXES',
                                'type'      : 'item',
                                'resource'  : 'market-tax-customer-group',
                                'icon'      : 'blur_circular',
                                'url'       : '/apps/market/taxes/customer-group-customer-class-tax'
                            }
                        ]
                    },
                    {
                        'id'       : 'preferences',
                        'title'    : 'Preferences',
                        'translate': 'NAV.PREFERENCES',
                        'type'     : 'collapsable',
                        'resource' : 'market-preference',
                        'icon'     : 'settings',
                        'children' : [
                            {
                                'id'        : 'payment_methods',
                                'title'     : 'Payment methods',
                                'translate' : 'NAV.PAYMENT_METHODS',
                                'type'      : 'item',
                                'resource'  : 'market-payment-method',
                                'icon'      : 'credit_card',
                                'url'       : '/apps/market/payment-method'
                            },
                            {
                                'id'        : 'order_statuses',
                                'title'     : 'Order statuses',
                                'translate' : 'NAV.ORDER_STATUSES',
                                'type'      : 'item',
                                'resource'  : 'market-order-status',
                                'icon'      : 'cached',
                                'url'       : '/apps/market/order-status'
                            }
                        ]
                    }
                ]
            },
            {
                'id'       : 'review',
                'title'    : 'Review',
                'translate': 'NAV.REVIEW',
                'type'     : 'collapsable',
                'resource' : 'review',
                'icon'     : 'star',
                'children' : [
                    {
                        'id'        : 'reviews',
                        'title'     : 'Reviews',
                        'translate' : 'NAV.REVIEWS',
                        'type'      : 'item',
                        'resource'  : 'review-review',
                        'icon'      : 'offline_pin',
                        'url'       : '/apps/review/review'
                    },
                    {
                        'id'        : 'comments',
                        'title'     : 'Comments',
                        'translate' : 'NAV.COMMENTS',
                        'type'      : 'item',
                        'resource'  : 'review-comment',
                        'icon'      : 'question_answer',
                        'url'       : '/apps/review/comment'
                    },
                    {
                        'id'        : 'object_averages',
                        'title'     : 'Object averages',
                        'translate' : 'NAV.AVERAGES',
                        'type'      : 'item',
                        'resource'  : 'review-average',
                        'icon'      : 'trending_up',
                        'url'       : '/apps/review/object-average'
                    },
                    {
                        'id'        : 'polls',
                        'title'     : 'Polls',
                        'translate' : 'NAV.POLLS',
                        'type'      : 'item',
                        'resource'  : 'review-poll',
                        'icon'      : 'assignment',
                        'url'       : '/apps/review/poll'
                    },
                    {
                        'id'        : 'questions',
                        'title'     : 'Questions',
                        'translate' : 'NAV.QUESTIONS',
                        'type'      : 'item',
                        'resource'  : 'review-question',
                        'icon'      : 'help',
                        'url'       : '/apps/review/question'
                    },
                    {
                        'id'        : 'preferences',
                        'title'     : 'Preferences',
                        'translate' : 'NAV.PREFERENCES',
                        'type'      : 'item',
                        'resource'  : 'review-preference',
                        'icon'      : 'settings',
                        'url'       : '/apps/review/preference'
                    }
                ]
            },
            {
                'id'   : 'hotel',
                'title': 'Hotel',
                'translate': 'NAV.HOTEL',
                'type' : 'collapsable',
                'icon' : 'local_hotel',
                'children' : [
                ]
            },
            {
                'id'       : 'cms',
                'title'    : 'CMS',
                'translate': 'NAV.CMS',
                'type'     : 'collapsable',
                'resource' : 'cms',
                'icon'     : 'art_track',
                'children' : [
                    {
                        'id'        : 'articles',
                        'title'     : 'Articles',
                        'translate' : 'NAV.ARTICLES',
                        'type'      : 'item',
                        'resource'  : 'cms-article',
                        'icon'      : 'library_books',
                        'url'       : '/apps/cms/article'
                    },
                    {
                        'id'        : 'sections',
                        'title'     : 'Sections',
                        'translate' : 'NAV.SECTIONS',
                        'type'      : 'item',
                        'resource'  : 'cms-section',
                        'icon'      : 'power',
                        'url'       : '/apps/cms/section'
                    },
                    {
                        'id'        : 'families',
                        'title'     : 'Families',
                        'translate' : 'NAV.FAMILIES',
                        'type'      : 'item',
                        'resource'  : 'cms-article-family',
                        'icon'      : 'class',
                        'url'       : '/apps/cms/family'
                    },
                    {
                        'id'        : 'categories',
                        'title'     : 'Categories',
                        'translate' : 'NAV.CATEGORIES',
                        'type'      : 'item',
                        'resource'  : 'cms-category',
                        'icon'      : 'chrome_reader_mode',
                        'url'       : '/apps/cms/category'
                    }
                ]
            },
            {
                'id'       : 'wine',
                'title'    : 'Wine',
                'translate': 'NAV.WINE',
                'type'     : 'collapsable',
                'resource' : 'wine',
                'icon'     : ['fas', 'wine-bottle'],
                'children' : [
                    {
                        'id'        : 'wines',
                        'title'     : 'Wines',
                        'translate' : 'NAV.WINES',
                        'type'      : 'item',
                        'resource'  : 'wine-wine',
                        'icon'      : ['fas', 'wine-glass-alt'],
                        'url'       : '/apps/wine/wine'
                    },
                    {
                        'id'        : 'wineries',
                        'title'     : 'Wineries',
                        'translate' : 'NAV.WINERIES',
                        'type'      : 'item',
                        'resource'  : 'wine-winery',
                        'icon'      : ['fas', 'warehouse'],
                        'url'       : '/apps/wine/winery'
                    },
                    {
                        'id'        : 'database',
                        'title'     : 'Database',
                        'translate' : 'NAV.TABLES',
                        'type'      : 'collapsable',
                        'resource'  : 'wine-table',
                        'icon'      : ['fas', 'database'],
                        'children'  : [
                            {
                                'id'        : 'appellations',
                                'title'     : 'Appellations',
                                'translate' : 'NAV.APPELLATIONS',
                                'type'      : 'item',
                                'resource'  : 'wine-appellation',
                                'icon'      : ['fas', 'map-marked-alt'],
                                'url'       : '/apps/wine/appellation'
                            },
                            {
                                'id'        : 'families',
                                'title'     : 'Families',
                                'translate' : 'NAV.FAMILIES',
                                'type'      : 'item',
                                'resource'  : 'wine-family',
                                'icon'      : 'category',
                                'url'       : '/apps/wine/family'
                            },
                            {
                                'id'        : 'types',
                                'title'     : 'Types',
                                'translate' : 'NAV.TYPES',
                                'type'      : 'item',
                                'resource'  : 'wine-type',
                                'icon'      : 'bookmarks',
                                'url'       : '/apps/wine/type'
                            },
                            {
                                'id'        : 'grapes',
                                'title'     : 'Grapes',
                                'translate' : 'NAV.GRAPES',
                                'type'      : 'item',
                                'resource'  : 'wine-grape',
                                'icon'      : 'hdr_weak',
                                'url'       : '/apps/wine/grape'
                            },
                            {
                                'id'        : 'pairings',
                                'title'     : 'Pairings',
                                'translate' : 'NAV.PAIRINGS',
                                'type'      : 'item',
                                'resource'  : 'wine-pairing',
                                'icon'      : 'local_dining',
                                'url'       : '/apps/wine/pairing'
                            },
                            {
                                'id'        : 'awards',
                                'title'     : 'Awards',
                                'translate' : 'NAV.AWARDS',
                                'type'      : 'item',
                                'resource'  : 'wine-awards',
                                'icon'      : ['fas', 'award'],
                                'url'       : '/apps/wine/award'
                            },
                            {
                                'id'        : 'presentations',
                                'title'     : 'Presentations',
                                'translate' : 'NAV.PRESENTATIONS',
                                'type'      : 'item',
                                'resource'  : 'wine-presentation',
                                'icon'      : 'photo_size_select_small',
                                'url'       : '/apps/wine/presentation'
                            }
                        ]
                    }
                ]
            },
            {
                'id'       : 'update',
                'title'    : 'Updates',
                'translate': 'NAV.UPDATES',
                'type'     : 'collapsable',
                'resource' : 'update',
                'icon'     : 'cloud_download',
                'children' : [
                    {
                        'id'        : 'versions',
                        'title'     : 'Versions',
                        'translate' : 'NAV.VERSIONS',
                        'type'      : 'item',
                        'resource'  : 'update-version',
                        'icon'      : 'filter_1',
                        'url'       : '/apps/update/version'
                    }
                ]
            },
            {
                'id'       : 'admin',
                'title'    : 'Admin',
                'translate': 'NAV.ADMINISTRATION',
                'type'     : 'collapsable',
                'resource' : 'admin',
                'icon'     : 'settings',
                'children' : [
                    {
                        'id'        : 'reports',
                        'title'     : 'Reports',
                        'translate' : 'NAV.REPORTS',
                        'type'      : 'item',
                        'resource'  : 'admin-report',
                        'icon'      : 'equalizer',
                        'url'       : '/apps/admin/report'
                    },
                    {
                        'id'        : 'users',
                        'title'     : 'Users',
                        'translate' : 'NAV.USERS',
                        'type'      : 'item',
                        'resource'  : 'admin-user',
                        'icon'      : 'how_to_reg',
                        'url'       : '/apps/admin/user'
                    },
                    {
                        'id'        : 'countries',
                        'title'     : 'Countries',
                        'translate' : 'NAV.COUNTRIES',
                        'type'      : 'item',
                        'resource'  : 'admin-country',
                        'icon'      : 'public',
                        'url'       : '/apps/admin/country'
                    },
                    {
                        'id'        : 'languagues',
                        'title'     : 'Languages',
                        'translate' : 'NAV.LANGUAGES',
                        'type'      : 'item',
                        'resource'  : 'admin-lang',
                        'icon'      : 'translate',
                        'url'       : '/apps/admin/lang'
                    },
                    {
                        'id'        : 'packages',
                        'title'     : 'Packages',
                        'translate' : 'NAV.PACKAGES',
                        'type'      : 'item',
                        'resource'  : 'admin-package',
                        'icon'      : 'view_module',
                        'url'       : '/apps/admin/package'
                    },
                    {
                        'id'       : 'custom_fields',
                        'title'    : 'Custom fields',
                        'translate': 'NAV.CUSTOM_FIELDS',
                        'type'     : 'collapsable',
                        'resource' : 'admin-field',
                        'icon'     : 'text_fields',
                        'children' : [
                            {
                                'id'       : 'fields',
                                'title'    : 'Fields',
                                'translate': 'NAV.FIELDS',
                                'type'     : 'item',
                                'resource' : 'admin-field-field',
                                'icon'     : 'format_list_bulleted',
                                'url'      : '/apps/admin/field'
                            },
                            {
                                'id'       : 'field_groups',
                                'title'    : 'Field groups',
                                'translate': 'NAV.FIELD_GROUPS',
                                'type'     : 'item',
                                'resource' : 'admin-field-group',
                                'icon'     : 'dvr',
                                'url'      : '/apps/admin/field-group'
                            }
                        ]
                    },
                    {
                        'id'       : 'attachments',
                        'title'    : 'Attachemnts',
                        'translate': 'NAV.ATTACHMENTS',
                        'type'     : 'collapsable',
                        'resource' : 'admin-attachment',
                        'icon'     : 'attachment',
                        'children' : [
                            {
                                'id'       : 'attachment_families',
                                'title'    : 'Attachment families',
                                'translate': 'NAV.ATTACHMENT_FAMILIES',
                                'type'     : 'item',
                                'resource' : 'admin-attachment-family',
                                'icon'     : 'photo',
                                'url'      : '/apps/admin/attachment-family'
                            },
                            {
                                'id'       : 'attachment_mimes',
                                'title'    : 'Attachment mimes',
                                'translate': 'NAV.ATTACHMENT_MIMES',
                                'type'     : 'item',
                                'resource' : 'admin-attachment-mime',
                                'icon'     : 'camera_alt',
                                'url'      : '/apps/admin/attachment-mime'
                            } // ,
                            // {
                            //     'id'       : 'attachment_library',
                            //     'title'    : 'Attachment library',
                            //     'translate': 'NAV.ATTACHMENT_LIBRARY',
                            //     'type'     : 'item',
                            //     'resource' : 'admin-attachment-library',
                            //     'icon'     : 'photo_library',
                            //     'url'      : '/apps/admin/attachment-library'
                            // }
                        ]
                    },

                    {
                        'id'       : 'apis',
                        'title'    : 'Apis',
                        'translate': 'NAV.APIS',
                        'type'     : 'collapsable',
                        'resource' : 'admin-api',
                        'icon'     : 'share',
                        'children' : [
                            {
                                'id'       : 'clients',
                                'title'    : 'clients',
                                'translate': 'NAV.CLIENTS',
                                'type'     : 'item',
                                'resource' : 'admin-api-oauth-client',
                                'icon'     : 'people',
                                'url'      : '/apps/admin/oauth-client'
                            },
                            {
                                'id'       : 'access_tokens',
                                'title'    : 'Access tokens',
                                'translate': 'NAV.ACCESS_TOKENS',
                                'type'     : 'item',
                                'resource' : 'admin-api-oauth-access-token',
                                'icon'     : 'security',
                                'url'      : '/apps/admin/oauth-access-token'
                            }
                        ]
                    },

                    {
                        'id'       : 'permissions',
                        'title'    : 'Permissions',
                        'translate': 'NAV.PERMISSIONS',
                        'type'     : 'collapsable',
                        'resource' : 'admin-perm',
                        'icon'     : 'fingerprint',
                        'children' : [
                            {
                                'id'       : 'profiles',
                                'title'    : 'Profiles',
                                'translate': 'NAV.PROFILES',
                                'type'     : 'item',
                                'resource' : 'admin-perm-profile',
                                'icon'     : 'perm_identity',
                                'url'      : '/apps/admin/profile'
                            },
                            {
                                'id'       : 'resources',
                                'title'    : 'Resources',
                                'translate': 'NAV.RESOURCES',
                                'type'     : 'item',
                                'resource' : 'admin-perm-resource',
                                'icon'     : 'rounded_corner',
                                'url'      : '/apps/admin/resource'
                            },
                            {
                                'id'       : 'actions',
                                'title'    : 'Actions',
                                'translate': 'NAV.ACTIONS',
                                'type'     : 'item',
                                'resource' : 'admin-perm-action',
                                'icon'     : 'flash_on',
                                'url'      : '/apps/admin/action'
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
