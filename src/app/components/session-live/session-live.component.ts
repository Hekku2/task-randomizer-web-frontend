import { Component, OnInit } from '@angular/core';
import {
    GameSessionModel,
    SessionContextModel,
    SessionEventModel,
    ErrandModel
} from '../../api/models';
import { EventService, GameSessionService } from '../../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ErrorService } from '../../services/error.service';

@Component({
    selector: 'app-session-live',
    templateUrl: './session-live.component.html',
    styleUrls: ['./session-live.component.css']
})
export class SessionLiveComponent implements OnInit {
    private sessionId: string;
    private playerName: string;
    events: Array<SessionEventModel> = [];
    currentErrand: ErrandModel = {
        description: ''
    };

    constructor(
        private eventService: EventService,
        private gameSessionService: GameSessionService,
        private route: ActivatedRoute,
        private router: Router,
        private error: ErrorService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.sessionId = <string>params['sessionId'];
            this.playerName = <string>params['playerName'];
            this.updateEvents();
        }, this.error.handleError);
    }

    private updateEvents() {
        this.eventService
            .ApiV1EventBySessionIdGet(this.sessionId)
            .subscribe(events => {
                this.events = events;

                events.forEach(element => {
                    if (element.eventType === 'ErrandPopped') {
                        this.currentErrand.description = element.description;
                    }
                });
            }, this.error.handleError);
    }

    public popErrand() {
        // TODO This should only be called after route is ready (issue #14)
        // TODO Event should be handled in by issue #12
        this.gameSessionService
            .ApiV1GameSessionPopErrandPost(<SessionContextModel>{
                sessionId: this.sessionId
            })
            .subscribe(() => {
                // TODO This is a tempoary solution until signalR implemenation is done (issue #12)
                this.updateEvents();
            }, this.error.handleError);
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
