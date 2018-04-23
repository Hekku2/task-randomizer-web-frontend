import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSessionService, GameService } from '../../api/services';
import { SessionSettingsModel } from '../../api/models';

@Component({
    selector: 'app-session-setup',
    templateUrl: './session-setup.component.html',
    styleUrls: ['./session-setup.component.css']
})
export class SessionSetupComponent implements OnInit {
    games: any[];
    selectedGame: number;

    constructor(
        private gameSessionService: GameSessionService,
        private gameService: GameService,
        private route: Router
    ) {}

    ngOnInit() {
        this.gameService.ApiV1GameGet().subscribe(
            result => {
                this.games = result;
            },
            error => {
                // TODO Issue #8 Unified error handling
                throw error;
            }
        );
    }

    public startSession(): void {
        this.gameSessionService
            .ApiV1GameSessionStartPost(<SessionSettingsModel>{
                gameId: this.selectedGame
            })
            .subscribe(result => {
                this.route.navigate(['session-lobby', result.replace(/\"/g, '')]);
            });
    }
}
