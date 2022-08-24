import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {EffectsModule} from "@ngrx/effects";
import {UserListEffects} from "./modules/user-list/state/user-list.effects";
import {StoreModule} from "@ngrx/store";
import {userListReducer} from "./modules/user-list/state/user-list.reducer";
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        EffectsModule.forRoot([UserListEffects]),
        StoreModule.forRoot({users: userListReducer}),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
