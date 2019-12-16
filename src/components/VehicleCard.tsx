import * as React from 'react'
import { Card, CardMedia, CardContent, Typography, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { vechileCardStyles } from '../App.styles';
import { Vehicle } from '../containers/vehiclesList/vehiclesList';
import { withRouter, RouteComponentProps } from 'react-router-dom';



interface VechileCardPassedProps extends RouteComponentProps<any> {
    vehicle: Vehicle;
}

class VechileCard extends React.Component<VechileCardPassedProps & WithStyles<typeof vechileCardStyles>> {

    public render() {
        const {
            vehicle,
            classes
        } = this.props;
        return (
            <Card className={classes.card} onClick={this.onVehicleClick}>
                <CardMedia
                    className={classes.media}
                    image={vehicle.vehicleImages[0]}
                    title={vehicle.modal}
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="h5">
                        {vehicle.modal}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    public onVehicleClick = () => {
        const {vehicle, history} = this.props;
        history.push(`/vehicleDetails/${vehicle.id}`);
    }
}

export default withRouter<VechileCardPassedProps, any>(withStyles(vechileCardStyles)(VechileCard));
export { VechileCard };

