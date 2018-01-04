// define width of sidenav
const drawerWidth = 240;

// nav style object
const navStyle = theme => ({
    root: {
        width: '100%',
        minHeight: '100%',
        zIndex: 1,
        overflow: 'hidden'
    },
    flex: {
        flex: 1,
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    appBar: {
        position: 'absolute',
        transition: theme
            .transitions
            .create([
                'margin', 'width'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme
            .transitions
            .create([
                'margin', 'width'
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    'appBarShift-left': {
        marginLeft: drawerWidth
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: 'none'
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme
            .transitions
            .create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64
            }
        }
    },
    'content-left': {
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme
            .transitions
            .create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    'contentShift-left': {
        marginLeft: 0
    }
});

export default navStyle;