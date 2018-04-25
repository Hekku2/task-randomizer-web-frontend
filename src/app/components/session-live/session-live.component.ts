import { Component, OnInit } from '@angular/core';
import { GameSessionModel } from '../../api/models';
import { EventService } from '../../api/services';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-session-live',
    templateUrl: './session-live.component.html',
    styleUrls: ['./session-live.component.css']
})
export class SessionLiveComponent implements OnInit {
    events = <any>[];

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                const sessionId = params['sessionId'];
                this.eventService.ApiV1EventBySessionIdGet(sessionId).subscribe(
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
}
