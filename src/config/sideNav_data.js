export default [
    {
        label:'Dashboard',
        url: '/'
    },
    {
        label:'Terms',
        subKey:'terms',
        sub:[
            {
                label:'Overview',
                url:'/terms/overview'
            },
            {
                label: 'New Term',
                url: '/terms/term'
            },
            {
                label: 'New Set',
                url: '/terms/set'
            }
        ]
    },
    {
        label: 'Workflow',
        url:'/workflow'
    },
    {
        label: 'Campaigns',
        subKey:'campaigns',
        sub:[
            {
                label: 'Overview',
                url: '/campaigns/overview'
            },
            {
                label: 'Active campaigns',
                url: '/campaigns/active'
            },
            {
                label:'New campaign',
                url:'/campaigns/new'
            }
        ]
    },
    {
        label: 'Users',
        url: '/users'
    }
]