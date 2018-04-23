import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialAppModule } from './ngmaterial.module';
import { AppComponent } from './app.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { SessionSetupComponent } from './components/session-setup/session-setup.component';
import { HomeComponent } from './components/home/home.component';
import { SessionLobbyComponent } from './components/session-lobby/session-lobby.component';
import { GameSessionService, GameService } from './api/services';
import { ApiConfiguration } from './api/api-configuration';
import { ApiModule } from './api/api.module';

@NgModule({
    declarations: [
        AppComponent,
        SessionListComponent,
        SessionSetupComponent,
        HomeComponent,
        SessionLobbyComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        MaterialAppModule,
        ApiModule
    ],
    providers: [GameSessionService, GameService],
    bootstrap: [AppComponent]
})
export class AppModule {}
