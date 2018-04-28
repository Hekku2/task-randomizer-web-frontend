import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSessionService } from '../../api/services';
import { GameSessionModel, SessionJoinModel } from '../../api/models';

@Component({
    selector: 'app-session-lobby',
    templateUrl: './session-lobby.component.html',
    styleUrls: ['./session-lobby.component.css']
})
export class SessionLobbyComponent implements OnInit {
    session = <GameSessionModel>{};

    // TODO #9 Bind this to actual element in page
    @Input() playerName = 'Default name';

    constructor(
        private gameSessionService: GameSessionService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                const sessionId = params['sessionId'];
                this.gameSessionService
                    .ApiV1GameSessionByIdGet(sessionId)
                    .subscribe(
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

    public joinSession() {
        // TODO This should only be called after route is ready issue #14
        this.gameSessionService
            .ApiV1GameSessionJoinPost(<SessionJoinModel>{
                sessionId: this.session.id,
                playerName: this.playerName
            })
            .subscribe(() => {
                this.router.navigate(['session-live', this.session.id]);
            });
    }
}
