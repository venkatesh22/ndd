import * as React from 'react';
import { Grid, Button } from '@material-ui/core';
import VechileCard from '../../components/VehicleCard';
import axios from 'axios';



export interface Vehicle {
    id: number;
    vehicleImages: string[];
    manufcturereName: string;
    year: string;
    modal: string;
    price: string;
}

interface VehiclesState {
    vehicles: Vehicle[];
}



export class VehiclesList extends React.Component<{}, VehiclesState> {

    public state: VehiclesState = {
        vehicles: []
    }

    public componentDidMount() {
        this.getAllVehicles();
    }

    public render() {
        const { vehicles } = this.state;
        return (
            <>
                <Grid container>
                    {vehicles.map((vehicle: Vehicle) => {
                        return (<Grid item xs={3} key={vehicle.id}>
                            <VechileCard vehicle={vehicle}></VechileCard>
                        </Grid>)
                    })}
                </Grid>
                <Grid container>
                    <Button variant="contained" color="primary" fullWidth onClick={this.OnLoad}>
                        Load More
                    </Button>
                </Grid>
            </>
        )
    }

    public getAllVehicles = (start: number = 0) => {
        const limit = start ? 5 : 8;
        const url = `${process.env.BASE_SERVICE_URL}vehicles?_limit=${limit}&start=${start}`;
        axios.get(url)
            .then(res => {
                const vehicles = [...this.state.vehicles, ...res.data];
                this.setState({ vehicles });
            })
    }

    public OnLoad = () => {
        const {vehicles} = this.state;
        this.getAllVehicles(vehicles.length);
    }
}
