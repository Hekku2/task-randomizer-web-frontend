import { Component, OnInit } from '@angular/core';
import {
    GameSessionModel,
    SessionContextModel,
    SessionEventModel
} from '../../api/models';
import { EventService, GameSessionService } from '../../api/services';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ErrorService } from '../../services/error.service';

@Component({
    selector: 'app-session-live',
    templateUrl: './session-live.component.html',
    styleUrls: ['./session-live.component.css']
})
export class SessionLiveComponent implements OnInit {
    private sessionId: string;
    events: Array<SessionEventModel> = [];

    constructor(
        private eventService: EventService,
        private gameSessionService: GameSessionService,
        private route: ActivatedRoute,
        private error: ErrorService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.sessionId = <string>params['sessionId'];
            this.updateEvents();
        }, this.error.handleError);
    }

    private updateEvents() {
        this.eventService
            .ApiV1EventBySessionIdGet(this.sessionId)
            .subscribe(events => {
                this.events = events;
            }, this.error.handleError);
    }

    public popErrand() {
        // TODO This should only be called after route is ready (issue #14)
        // TODO Event shoul be handled int by issue #12
        this.gameSessionService
            .ApiV1GameSessionPopErrandPost(<SessionContextModel>{
                sessionId: this.sessionId
            })
            .subscribe(() => {
                // TODO This is a tempoary solution until signalR implemenation is done (issue #12)
                this.updateEvents();
            }, this.error.handleError);
    }
}
