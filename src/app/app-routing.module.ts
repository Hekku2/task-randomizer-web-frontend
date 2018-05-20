import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SessionSetupComponent } from './components/session-setup/session-setup.component';
import { HomeComponent } from './components/home/home.component';
import { SessionLobbyComponent } from './components/session-lobby/session-lobby.component';
import { SessionLiveComponent } from './components/session-live/session-live.component';
import { GameListComponent } from './components/game-list/game-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/app', pathMatch: 'full' },
    { path: 'app', component: HomeComponent },
    { path: 'session-setup', component: SessionSetupComponent },
    { path: 'session-lobby/:sessionId', component: SessionLobbyComponent },
    { path: 'session-live/:sessionId/:playerName', component: SessionLiveComponent },
    { path: 'games', component: GameListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
