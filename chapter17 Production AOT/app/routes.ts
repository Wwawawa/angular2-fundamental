import {Routes} from '@angular/router';

import {
    CreateEventComponent,
    CreateSessionComponent,
    EventDetailComponent,
    EventListResolver,
    EventResolver, EventsListComponent,
} from './events/index';

import {Error404Component} from './errors/404.component';
//add for Rollup
import { userRoutes } from './user/user.routes'

export const appRoutes: Routes = [
    //order matters
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] }, //Guarding Against Route De-activation using function, canDeactivateCreateEvent is provider name which points to a function
    { path: 'events', component: EventsListComponent, resolve: { events1: EventListResolver } }, //call EventListResolver before using the component, bind resolver result to a property events1, and this property will be passed to the component
    { path: 'events/:id', component: EventDetailComponent, resolve: { event: EventResolver } }, //Guarding Against Route Activation using service
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' },  //pathMatch: prefix or full

    // user prefix, localhost/user/x, will load module here: app/user/user.module and the module name is UserModule, concat '#'    
    { 
        path: 'user',
        children: userRoutes
        //lazy loader module, need remove this for Rollup which not support splitting code
        //loadChildren: 'app/user/user.module#UserModule' 
    },
];
