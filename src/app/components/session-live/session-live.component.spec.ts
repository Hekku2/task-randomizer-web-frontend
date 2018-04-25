import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLiveComponent } from './session-live.component';
import { MaterialAppModule } from '../../ngmaterial.module';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../api/services';

describe('SessionLiveComponent', () => {
    let component: SessionLiveComponent;
    let fixture: ComponentFixture<SessionLiveComponent>;

    let gameEventService;
    let gameEventsResponse;

    let route;

    beforeEach(async(() => {
        gameEventService = jasmine.createSpyObj('EventService', [
            'ApiV1EventBySessionIdGet'
        ]);
        gameEventsResponse = new ReplaySubject<any>(1);
        gameEventService.ApiV1EventBySessionIdGet.and.returnValue(
            gameEventsResponse
        );

        route = {
            params: new ReplaySubject<any>(1)
        };

        TestBed.configureTestingModule({
            imports: [MaterialAppModule],
            providers: [
                { provide: ActivatedRoute, useFactory: () => route },
                { provide: EventService, useFactory: () => gameEventService }
            ],
            declarations: [SessionLiveComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionLiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get events when loaded', () => {
        const expectedSession = 'test';

        const events = [{ eventType: 1 }, { eventType: 2 }];

        route.params.next({
            sessionId: expectedSession
        });
        gameEventsResponse.next(events);

        expect(gameEventService.ApiV1EventBySessionIdGet).toHaveBeenCalledWith(
            expectedSession
        );
        expect(component.events).toBe(events);
    });
});
