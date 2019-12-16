import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core';

export const AppStyles = (theme: Theme) => {
    return createStyles({
        root: {
            marginBottom: 10
        }
    });
}

export const vechileCardStyles = (theme: Theme) => {

    return createStyles({
        card: {
            maxWidth: 345,
            marginBottom: 10
        },
        media: {
            height: 140,
        },
    });
};

export const vechileDetailsStyles = (theme: Theme) => {

    return createStyles({
        card: {
            height: 400,
            marginBottom: 20
        },
        detailsCard: {
            ...this.card,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 400
        },
        media: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    });
};