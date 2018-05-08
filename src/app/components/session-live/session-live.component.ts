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
import { MessageService } from '../../services/message.service';

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
                sessionId: this.sessionId
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
