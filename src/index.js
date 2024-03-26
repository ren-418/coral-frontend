import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';

import Template from './app/template';
import RegisterPage from './app/pages/register/RegisterPage';
import LoginPage from './app/pages/login/LoginPage';
import PlainTemplate from './app/PlainTemplate';
import CreateInvestor from './app/pages/create investor/CreateInvestor';
import HeaderTemplate from './app/HeaderTemplate';

const route = element => <Template>{element}</Template>
const plainRoute = element => <PlainTemplate>{element}</PlainTemplate>
const headerRoute = element => <HeaderTemplate title="Create Profile">{element}</HeaderTemplate>

const router = createBrowserRouter([
  { path: '/', element: plainRoute(<RegisterPage/>)},
  { path: '/login', element: plainRoute(<LoginPage/>)},
  { path: '/set-up-investor', element: headerRoute(<CreateInvestor/>)},
  { path: '*', element: route('404')}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
