import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

declare let module: any

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
  console.log(process.env.BASE_SERVICE_URL);
}

if (module.hot) {
  module.hot.accept();
}