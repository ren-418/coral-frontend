import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';

import RegisterPage from './app/pages/register/RegisterPage';
import LoginPage from './app/pages/login/LoginPage';
import PlainTemplate from './app/templates/plain/PlainTemplate';
import CreateInvestor from './app/pages/create investor/CreateInvestor';
import HeaderTemplate from './app/templates/header/HeaderTemplate';
import CreateEnterprise from './app/pages/create enterprise/CreateEnterprise';
import Controller from './app/pages/application/Controller';
import ForgotPassword from './app/pages/forgot password/ForgotPassword';

const route = element => <PlainTemplate selected={0}>{element}</PlainTemplate>
const plainRoute = element => <PlainTemplate>{element}</PlainTemplate>
const headerRoute = element => <HeaderTemplate title="Create Profile">{element}</HeaderTemplate>


const router = createBrowserRouter([
  { path: '/', element: route(<Controller/>)},
  { path: '/register', element: plainRoute(<RegisterPage/>)},
  { path: '/forgot', element: plainRoute(<ForgotPassword/>)},
  { path: '/login', element: plainRoute(<LoginPage/>)},
  { path: '/create-investor', element: headerRoute(<CreateInvestor firstLogin={true}/>)},
  { path: '/create-enterprise', element: headerRoute(<CreateEnterprise firstLogin={true}/>)},
  { path: '*', element: plainRoute('404')}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
