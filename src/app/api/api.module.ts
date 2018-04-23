import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { ErrandService } from './services/errand.service';
import { EventService } from './services/event.service';
import { GameService } from './services/game.service';
import { GameSessionService } from './services/game-session.service';

/**
 * Module that provides instances for all API services
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
   ErrandService,
   EventService,
   GameService,
   GameSessionService
  ],
})
export class ApiModule { }
