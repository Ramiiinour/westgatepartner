import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    formControl: {
        border: '1px #F4F4F4 solid',
        borderRadius: '5px',
        // margin: theme.spacing(1),
        width: '100%',
    },
    indeterminateColor: {
        border: 'none',
        color: '#f50057',
    },
    selectAllText: {
        border: 'none',
        fontWeight: 500,
    },
    selectedAll: {
        border: 'none',
        //  backgroundColor: "rgba(0, 0, 0, 0.08)",
        //"&:hover": {
        // backgroundColor: "rgba(0, 0, 0, 0.08)"
        //}
    },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps: any = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
    variant: 'menu',
}

const options = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
]

export { useStyles, MenuProps, options }
