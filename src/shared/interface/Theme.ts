import {TypeTheme} from '../enum/TypeTheme';

export interface Theme {
    type: TypeTheme;
    props: any;
}


export const light: Theme = {
    type: TypeTheme.LIGHT,
    props: {
        '--backgroungcolor-App': 'white',
        '--backgroundColor-MainBar': '#dddddd',
        '--backgroundColor-ExplorerBar': '#dcdcdc',
        '--backgroundColor-LineContent': 'white',
        '--textColor-Highlight': 'black',
        '--textColor-MainBar': '#6f6f6f',
        '--textColor-Editor': 'black'


    }
};

export const dark: Theme = {
    type: TypeTheme.DARK,
    props: {
        '--backgroungcolor-App': '#1e1e1e',
        '--backgroundColor-MainBar': '#333333',
        '--backgroundColor-ExplorerBar': '#252526',
        '--textColor-Highlight': 'white',
        '--backgroundColor-LineContent': '#252526',

        '--textColor-MainBar': '#c8c8c8',
        '--textColor-Editor': 'white'

    }
};

export const custom: Theme = {
    type: TypeTheme.CUSTOM,
    props: {
        '--backgroungcolor-App': '#1e1e1e',
        '--backgroundColor-MainBar': '#333333',
        '--backgroundColor-ExplorerBar': '',
        '--textColor-Highlight': '',
        '--backgroundColor-LineContent': '',

        '--textColor-MainBar': '#c8c8c8',
        '--textColor-Editor': ''


    }
};
