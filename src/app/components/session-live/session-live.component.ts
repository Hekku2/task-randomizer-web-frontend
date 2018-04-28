import { Component, OnInit } from '@angular/core';
import { GameSessionModel, SessionContextModel } from '../../api/models';
import { EventService, GameSessionService } from '../../api/services';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
    selector: 'app-session-live',
    templateUrl: './session-live.component.html',
    styleUrls: ['./session-live.component.css']
})
export class SessionLiveComponent implements OnInit {
    private sessionId: string;
    events = <any>[];

    constructor(
        private eventService: EventService,
        private gameSessionService: GameSessionService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.sessionId = <string>(params['sessionId']);
                this.eventService.ApiV1EventBySessionIdGet(this.sessionId).subscribe(
                    events => {
                        this.events = events;
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

    public popErrand() {
        // TODO This should only be called after route is ready (issue #14)
        // TODO Event shoul be handled int by isseu #12
        this.gameSessionService.ApiV1GameSessionPopErrandPost(<SessionContextModel>{
            sessionId: this.sessionId
        }).subscribe(() => {}, error => {
            // TODO Issue #8 Unified error handling
            throw error;
        });
    }
}
