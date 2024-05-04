import { Routes } from '@angular/router';
import { LoginComponent } from './pages/components/login/login.component';
import { SignupComponent } from './pages/components/signup/signup.component';
import { EventsComponent } from './pages/components/events/events.component';
import { SeatsComponent } from './pages/components/seats/seats.component';

export const routes: Routes = [
    {path: '',component:LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'events', component: EventsComponent},
    {path:'seats', component:SeatsComponent},
    {path:'event/:id', component:SeatsComponent}
];
