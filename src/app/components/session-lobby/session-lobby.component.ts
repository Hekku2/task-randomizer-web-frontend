import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSessionService } from '../../api/services';
import { GameSessionModel, SessionContextModel } from '../../api/models';
import { ErrorService } from '../../services/error.service';

@Component({
    selector: 'app-session-lobby',
    templateUrl: './session-lobby.component.html'
})
export class SessionLobbyComponent implements OnInit {
    session = <GameSessionModel>{};

    @Input() playerName = 'Default name';

    constructor(
        private gameSessionService: GameSessionService,
        private route: ActivatedRoute,
        private router: Router,
        private error: ErrorService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.getSession(params['sessionId']);
        }, this.error.handleError);
    }

    private getSession(sessionId) {
        this.gameSessionService
            .ApiV1GameSessionByIdGet(sessionId)
            .subscribe(session => {
                this.session = session;
            }, this.error.handleError);
    }

    public joinSession() {
        const joinModel = <SessionContextModel>{
            sessionId: this.session.id,
            playerName: this.playerName
        };
        // TODO This should only be called after route is ready issue #14
        this.gameSessionService
            .ApiV1GameSessionJoinPost(joinModel)
            .subscribe(() => {
                this.router.navigate(['session-live', this.session.id, this.playerName]);
            }, this.error.handleError);
    }
}
