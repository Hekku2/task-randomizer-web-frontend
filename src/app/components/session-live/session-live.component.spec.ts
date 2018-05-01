import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLiveComponent } from './session-live.component';
import { MaterialAppModule } from '../../ngmaterial.module';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ActivatedRoute } from '@angular/router';
import { EventService, GameSessionService } from '../../api/services';
import { SessionContextModel, SessionEventModel } from '../../api/models';
import { ErrorService } from '../../services/error.service';

describe('SessionLiveComponent', () => {
    let component: SessionLiveComponent;
    let fixture: ComponentFixture<SessionLiveComponent>;

    let errorService;
    let gameSessionService;
    let gameEventService;
    let gameEventsResponse;

    let route;

    beforeEach(async(() => {
        errorService = jasmine.createSpyObj('ErrorService', ['handleError']);
        gameSessionService = jasmine.createSpyObj('GameSessionService', [
            'ApiV1GameSessionPopErrandPost'
        ]);

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
                { provide: EventService, useFactory: () => gameEventService },
                { provide: ErrorService, useFactory: () => errorService },
                {
                    provide: GameSessionService,
                    useFactory: () => gameSessionService
                }
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

        const events = <SessionEventModel[]>[
            { eventType: 'Test1' },
            { eventType: 'Test2' }
        ];

        route.params.next({
            sessionId: expectedSession
        });
        gameEventsResponse.next(events);

        expect(gameEventService.ApiV1EventBySessionIdGet).toHaveBeenCalledWith(
            expectedSession
        );
        expect(component.events).toBe(events);
    });

    it('should handle params error', () => {
        route.params.error('error');
        expect(errorService.handleError).toHaveBeenCalledWith('error');
    });

    it('should handle event service error', () => {
        const expectedSession = 'test';
        route.params.next({
            sessionId: expectedSession
        });
        gameEventsResponse.error('error');

        expect(gameEventService.ApiV1EventBySessionIdGet).toHaveBeenCalledWith(
            expectedSession
        );
        expect(errorService.handleError).toHaveBeenCalledWith('error');
    });

    describe('popErrand', () => {
        it('should call api', () => {
            const expectedSession = 'test';
            const events = [{ eventType: 1 }, { eventType: 2 }];

            route.params.next({
                sessionId: expectedSession
            });
            gameEventsResponse.next(events);

            gameSessionService.ApiV1GameSessionPopErrandPost.and.returnValue(
                new ReplaySubject<any>(1)
            );

            component.popErrand();

            expect(
                gameSessionService.ApiV1GameSessionPopErrandPost
            ).toHaveBeenCalledWith(<SessionContextModel>{
                sessionId: expectedSession
            });
        });

        it('should handle api error', () => {
            const expectedSession = 'test';
            const events = [{ eventType: 1 }, { eventType: 2 }];

            route.params.next({
                sessionId: expectedSession
            });
            gameEventsResponse.next(events);

            const result = new ReplaySubject<any>(1);
            gameSessionService.ApiV1GameSessionPopErrandPost.and.returnValue(result);

            component.popErrand();
            result.error('Error!');

            expect(
                gameSessionService.ApiV1GameSessionPopErrandPost
            ).toHaveBeenCalledWith(<SessionContextModel>{
                sessionId: expectedSession
            });
            expect(errorService.handleError).toHaveBeenCalledWith('Error!');
        });
    });
});
