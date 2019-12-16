import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar, WithStyles, Button } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import { VehiclesList } from './containers/vehiclesList/vehiclesList';
import { withStyles } from '@material-ui/styles';
import { AppStyles } from './App.styles';
import VehicleDetails from './containers/vehicleDetails/vehicleDetails';
import { HashRouter } from 'react-router-dom';



class App extends React.Component<WithStyles<typeof AppStyles>> {

    public render() {
        const {classes} = this.props;
        return (
            <div>
                <AppBar position="static" className={classes.root}>
                    <Toolbar>
                        <Button href="/" color="inherit"><Typography variant="h6">NDD</Typography></Button>
                    </Toolbar>
                </AppBar>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={VehiclesList} />
                        <Route path="/vehicleDetails/:id" component={VehicleDetails}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default withStyles(AppStyles)(App);
export {App};
