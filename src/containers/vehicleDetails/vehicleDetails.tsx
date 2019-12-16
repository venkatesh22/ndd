import * as React from 'react';
import { Grid, Card, CardMedia, withStyles, WithStyles, CardContent, Typography, IconButton } from '@material-ui/core';
import VechileCard from '../../components/VehicleCard';
import axios from 'axios';
import { Vehicle } from '../vehiclesList/vehiclesList';
import { withRouter, RouteComponentProps, Route } from 'react-router';
import { vechileDetailsStyles } from '../../App.styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

interface VehicleDetailsState {
    vehicle: Vehicle;
    vehiclesList: Vehicle[];
    currentImageIndex: number;
}



class VehicleDetails extends React.Component<RouteComponentProps & WithStyles<typeof vechileDetailsStyles>, VehicleDetailsState> {

    public state: VehicleDetailsState = {
        vehicle: null,
        vehiclesList: [],
        currentImageIndex: 0
    }

    public componentDidMount() {
        this.getAllVehicles();
        this.getVehicleById(this.props.match.params['id']);
    }

    public componentWillUpdate(nextProps) {
        if (this.props.match.params['id'] !== nextProps.match.params.id) {
            this.getVehicleById(nextProps.match.params.id);
        }
    }

    public render() {
        const { vehiclesList, vehicle } = this.state;
        const { classes } = this.props;
        return (
            <>
                {vehicle && <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card className={classes.card} onClick={this.onSlideClick}>
                            <CardMedia
                                className={classes.media}
                                image={vehicle.vehicleImages[this.state.currentImageIndex]}
                                title={vehicle.modal}
                            >
                                <IconButton color='secondary' size='medium' onClick={(event) => this.onLeft(event)}>
                                    <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
                                </IconButton>
                                <IconButton color='secondary' size='medium' onClick={(event) => this.onRight(event)}>
                                    <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                                </IconButton>
                            </CardMedia>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={classes.detailsCard}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Manufacturer & Model : {vehicle.modal}
                                </Typography>
                                <Typography variant="h4" gutterBottom>
                                    Price : Rs.{vehicle.price}
                                </Typography>
                                <Typography variant="h4" gutterBottom>
                                    Year : {vehicle.year}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>}
                {vehicle && <Route path={`${this.props.match.path}/:imageId`} render={renderProps => (
                    <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={vehicle.vehicleImages[renderProps.match.params['imageId']]}
                        title={vehicle.modal}>
                    </CardMedia>
                </Card>
                )}>
                </Route>}
                <Route path={this.props.match.path} exact>
                    <Card className={classes.detailsCard}>
                        <CardContent>
                            select an image to see preview
                        </CardContent>
                        </Card>
                </Route>
                <Typography variant="h5" gutterBottom>
                    Latest Vehicles
                </Typography>
                <Grid container>
                    {vehiclesList.map((vehicle: Vehicle) => {
                        return (<Grid item xs={3} key={vehicle.id}>
                            <VechileCard vehicle={vehicle}></VechileCard>
                        </Grid>)
                    })}
                </Grid>
            </>
        )
    }

    public getAllVehicles = () => {
        axios.get(`${process.env.BASE_SERVICE_URL}vehicles?_limit=4`)
            .then(res => {
                const vehiclesList = res.data;
                this.setState({ vehiclesList });
            })
    }

    public getVehicleById = (id: string) => {
        axios.get(`${process.env.BASE_SERVICE_URL}vehicles/${id}`)
            .then(res => {
                const vehicle = res.data;
                this.setState({ vehicle });
            });
    }

    public onLeft = (event) => {
        event.stopPropagation();
        const { vehicle } = this.state;
        const lastIndex = vehicle.vehicleImages.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
        this.setState({
          currentImageIndex: index
        });
        return false;
    }
    
    public onRight = (event) => {
        event.stopPropagation();
        const { vehicle } = this.state;
        const lastIndex = vehicle.vehicleImages.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index =  shouldResetIndex ? 0 : currentImageIndex + 1;
        this.setState({
          currentImageIndex: index
        });
        return false;
    }

    public onSlideClick = () => {
        const {history} = this.props;
        const { vehicle, currentImageIndex} = this.state;
        history.push(`/vehicleDetails/${vehicle.id}/${currentImageIndex}`);
    }
}

export default withRouter<RouteComponentProps, any>(withStyles(vechileDetailsStyles)(VehicleDetails));
export { VehicleDetails };