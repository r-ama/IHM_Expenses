import { Routes } from '@angular/router';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login';
import { TransactionList } from './components/transaction-list/transaction-list';
import { TransactionForm } from './components/transaction-form/transaction-form';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

export const routes: Routes = [
    {
        path:'header',
        component: Header
    },
    {
        path:'footer',
        component: Footer
    },
    {
        path:'login',
        component: Login
    },
    {
        path:'signup',
        component: Signup
    },
    {
        path:'transactions',
        component: TransactionList
    },
    {
        path: 'add',
        component: TransactionForm
    },
    {
        path:'edit/:id',
        component: TransactionForm
    },
    {
        path:'**',
        redirectTo: '/transactions'
    },
    {
        path:'',
        redirectTo: '/transactions',
        pathMatch: 'full'
    }
];
