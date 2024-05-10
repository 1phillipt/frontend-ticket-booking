import { Routes } from '@angular/router';
import { LoginComponent } from './pages/components/login/login.component';
import { SignupComponent } from './pages/components/signup/signup.component';
import { EventsComponent } from './pages/components/events/events.component';
import { SeatsComponent } from './pages/components/seats/seats.component';
import { PaymentinfoComponent } from './pages/components/paymentinfo/paymentinfo.component';
import { TicketsInfoAndConfirmationComponent } from './pages/components/tickets-info-and-confirmation/tickets-info-and-confirmation.component';
import { profile } from 'console';
import { ProfileComponent } from './pages/components/profile/profile.component';

export const routes: Routes = [
    {path: '',component:LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'events', component: EventsComponent},
    {path:'seats', component:SeatsComponent},
    {path:'event/:id', component:SeatsComponent},
    {path:'paymentinfo/:customerId', component:PaymentinfoComponent},
    {path:'payandConfirm',component:TicketsInfoAndConfirmationComponent},
    {path:'profile',component:ProfileComponent}
];
