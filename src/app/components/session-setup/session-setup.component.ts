import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSessionService, GameService } from '../../api/services';
import { SessionSettingsModel, GameModel } from '../../api/models';
import { ErrorService } from '../../services/error.service';

@Component({
    selector: 'app-session-setup',
    templateUrl: './session-setup.component.html'
})
export class SessionSetupComponent implements OnInit {
    games: GameModel[];
    selectedGame: number;

    constructor(
        private gameSessionService: GameSessionService,
        private gameService: GameService,
        private route: Router,
        private error: ErrorService
    ) {}

    ngOnInit() {
        this.gameService.ApiV1GameGet().subscribe(
            result => {
                this.games = result;
            }, this.error.handleError
        );
    }

    public startSession(): void {
        this.gameSessionService
            .ApiV1GameSessionStartPost(<SessionSettingsModel>{
                gameId: this.selectedGame
            })
            .subscribe(result => {
                this.route.navigate(['session-lobby', result.replace(/\"/g, '')]);
            }, this.error.handleError);
    }
}
