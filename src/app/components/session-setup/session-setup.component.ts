import { Component, OnInit, Input } from '@angular/core';
import { GameSessionService } from '../../services/game-session/game-session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game/game.service';

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
        this.gameService.getAll().subscribe(result => {
            this.games = result;
        }, error => {
            // TODO Issue #8 Unified error handling
            throw error;
        });
    }

    public startSession(): void {
        this.gameSessionService.startSession(this.selectedGame).subscribe(result => {
            this.route.navigate(['session-lobby', result]);
        });
    }
}
