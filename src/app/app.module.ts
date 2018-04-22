import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { GameSessionService } from './services/game-session.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, SessionListComponent],
    imports: [BrowserModule, HttpClientModule],
    providers: [GameSessionService],
    bootstrap: [AppComponent]
})
export class AppModule {}
