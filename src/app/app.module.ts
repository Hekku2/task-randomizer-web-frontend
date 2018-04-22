import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { SessionSetupComponent } from './components/session-setup/session-setup.component';
import { GameSessionService } from './services/game-session/game-session.service';
import { HomeComponent } from './components/home/home.component';
import { SessionLobbyComponent } from './components/session-lobby/session-lobby.component';

@NgModule({
    declarations: [
        AppComponent,
        SessionListComponent,
        SessionSetupComponent,
        HomeComponent,
        SessionLobbyComponent
    ],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
    providers: [GameSessionService],
    bootstrap: [AppComponent]
})
export class AppModule {}
