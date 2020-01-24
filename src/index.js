import React from 'react';
import { render } from 'react-dom';
import App from './components/AppRoutes.js';

console.log(`App Name: ${process.env.REACT_APP_NAME}`);
console.log(`App Version: ${process.env.REACT_APP_VERSION}`);

render(<App />, document.getElementById('root'));
