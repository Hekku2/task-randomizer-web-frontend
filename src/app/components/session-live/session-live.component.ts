import { Component, OnInit } from '@angular/core';
import {
    GameSessionModel,
    SessionContextModel,
    SessionEventModel,
    ErrandModel
} from '../../api/models';
import { EventService, GameSessionService } from '../../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';
import { MessageService } from '../../services/message.service';

@Component({
    selector: 'app-session-live',
    templateUrl: './session-live.component.html'
})
export class SessionLiveComponent implements OnInit {
    private sessionId: string;
    private playerName: string;

    private players: string[] = [];

    errandsRemaining: number;
    errandPopper: string;

    events: Array<SessionEventModel> = [];
    currentErrand: ErrandModel = {
        description: ''
    };

    constructor(
        private eventService: EventService,
        private gameSessionService: GameSessionService,
        private message: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private error: ErrorService
    ) {}

    ngOnInit() {
        this.currentErrand.description = 'No task taken!';

        this.route.params.subscribe(params => {
            this.sessionId = <string>params['sessionId'];
            this.playerName = <string>params['playerName'];

            this.message.connectionReady.subscribe(_ => {
                this.message.listen(this.sessionId).subscribe({
                    closed: false,
                    next: item => {
                        this.handleEvent(item);
                    },
                    error: error => {
                        this.error.handleError(error);
                    }
                });
            });

            this.updateEvents();
        }, this.error.handleError);
    }

    private handleEvent(event: any) {
        if (event.eventType === 'ErrandPopped') {
            this.currentErrand.description = event.description;
            this.errandsRemaining = event.context.ErrandsRemaining;
            this.errandPopper = event.context.PlayerName;
        }
        if (event.eventType === 'SessionCreated') {
            this.errandsRemaining = event.context.ErrandsRemaining;
        }
        if (event.eventType === 'PlayerJoined') {
            this.players.push(event.context.PlayerName);
        }
        if (event.eventType === 'PlayerLeft') {
            const name = event.context.PlayerName;
            const index = this.players.indexOf(name, 0);
            if (index > -1) {
                this.players.splice(index, 1);
            }
        }
        this.events.push(event);
    }

    private updateEvents() {
        this.eventService
            .ApiV1EventBySessionIdGet(this.sessionId)
            .subscribe(events => {
                events.forEach(event => this.handleEvent(event));
            }, this.error.handleError);
    }

    public popErrand() {
        // TODO This should only be called after route is ready (issue #14)
        // TODO Event should be handled in by issue #12
        this.gameSessionService
            .ApiV1GameSessionPopErrandPost(<SessionContextModel>{
                sessionId: this.sessionId,
                playerName: this.playerName
            })
            .subscribe(() => {}, this.error.handleError);
    }

    public leaveSession() {
        // TODO This should only be called after route is ready (issue #14)
        this.gameSessionService
            .ApiV1GameSessionLeavePost(<SessionContextModel>{
                sessionId: this.sessionId,
                playerName: this.playerName
            })
            .subscribe(() => {
                this.router.navigate(['session-lobby', this.sessionId]);
            }, this.error.handleError);
    }
}
