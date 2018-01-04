export default [
    {
        label:'Dashboard',
        url: '/dashboard'
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
        label: 'Campaign',
        subKey:'campaigns',
        sub:[
            {
                label:'New campaign',
                url:'/campaign/new'
            },
            {
                label: 'Active campaigns',
                url: '/campaign/active'
            }
        ]
    },
    {
        label: 'Users',
        url: '/users'
    }
]