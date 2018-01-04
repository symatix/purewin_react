const drawerWidth = 240;
const sideNavStyle = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar
    }
});

export default sideNavStyle;