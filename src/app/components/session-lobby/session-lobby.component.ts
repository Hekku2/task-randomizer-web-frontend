import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameSessionService } from '../../api/services';
import { GameSessionModel } from '../../api/models';

@Component({
    selector: 'app-session-lobby',
    templateUrl: './session-lobby.component.html',
    styleUrls: ['./session-lobby.component.css']
})
export class SessionLobbyComponent implements OnInit {
    session = <GameSessionModel>{};

    constructor(
        private gameSessionService: GameSessionService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                const sessionId = params['sessionId'];
                this.gameSessionService.ApiV1GameSessionByIdGet(sessionId).subscribe(
                    session => {
                        this.session = session;
                    },
                    error => {
                        // TODO Issue #8 Unified error handling
                        throw error;
                    }
                );
            },
            error => {
                // TODO Issue #8 Unified error handling
                throw error;
            }
        );
    }
}
