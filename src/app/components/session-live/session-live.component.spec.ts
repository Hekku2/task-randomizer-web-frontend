import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLiveComponent } from './session-live.component';
import { MaterialAppModule } from '../../ngmaterial.module';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, GameSessionService } from '../../api/services';
import {
    SessionContextModel,
    SessionEventModel,
    ErrandModel
} from '../../api/models';
import { ErrorService } from '../../services/error.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../../services/message.service';
import { ReplaySubject } from 'rxjs';

describe('SessionLiveComponent', () => {
    let component: SessionLiveComponent;
    let fixture: ComponentFixture<SessionLiveComponent>;

    let messageService;
    let errorService;
    let gameSessionService;
    let gameEventService;
    let gameEventsResponse;

    let route;
    let router;

    const expectedSession = 'sessiontestid';
    const expectedPlayerName = 'test player!';
    const events = <SessionEventModel[]>[
        { eventType: 'SessionCreated' },
        {
            eventType: 'ErrandPopped',
            description: 'test errand !',
            context: {}
        },
        {
            eventType: 'ErrandPopped',
            description: 'current errand!',
            context: {}
        },
        {
            eventType: 'PlayerJoined',
            description: 'Test player joined!',
            context: {}
        }
    ];

    beforeEach(async(() => {
        messageService = jasmine.createSpyObj('MessageService', ['handleError']);
        messageService.connectionReady = new ReplaySubject<boolean>(1);

        errorService = jasmine.createSpyObj('ErrorService', ['handleError']);
        gameSessionService = jasmine.createSpyObj('GameSessionService', [
            'ApiV1GameSessionPopErrandPost',
            'ApiV1GameSessionLeavePost'
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
            imports: [MaterialAppModule, RouterTestingModule.withRoutes([])],
            providers: [
                { provide: ActivatedRoute, useFactory: () => route },
                { provide: EventService, useFactory: () => gameEventService },
                { provide: ErrorService, useFactory: () => errorService },
                { provide: MessageService, useFactory: () => messageService },
                {
                    provide: GameSessionService,
                    useFactory: () => gameSessionService
                }
            ],
            declarations: [SessionLiveComponent]
        }).compileComponents();
        router = TestBed.get(Router);
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
        route.params.next({
            sessionId: expectedSession
        });
        gameEventsResponse.next(events);

        expect(gameEventService.ApiV1EventBySessionIdGet).toHaveBeenCalledWith(
            expectedSession
        );
        expect(component.events).toEqual(events);
    });

    it('should set current errands when event is loaded', () => {
        route.params.next({
            sessionId: expectedSession
        });
        gameEventsResponse.next(events);

        expect(component.currentErrand).toEqual(<ErrandModel>{
            description: 'current errand!'
        });
    });

    it('should handle params error', () => {
        route.params.error('error');
        expect(errorService.handleError).toHaveBeenCalledWith('error');
    });

    it('should handle event service error', () => {
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
        beforeEach(() => {
            route.params.next({
                sessionId: expectedSession,
                playerName: expectedPlayerName
            });
            gameEventsResponse.next(events);
        });

        it('should call api', () => {
            gameSessionService.ApiV1GameSessionPopErrandPost.and.returnValue(
                new ReplaySubject<any>(1)
            );

            component.popErrand();

            expect(
                gameSessionService.ApiV1GameSessionPopErrandPost
            ).toHaveBeenCalledWith(<SessionContextModel>{
                sessionId: expectedSession,
                playerName: expectedPlayerName
            });
        });

        it('should handle api error', () => {
            const result = new ReplaySubject<any>(1);
            gameSessionService.ApiV1GameSessionPopErrandPost.and.returnValue(
                result
            );

            component.popErrand();
            result.error('Error!');

            expect(
                gameSessionService.ApiV1GameSessionPopErrandPost
            ).toHaveBeenCalledWith(<SessionContextModel>{
                sessionId: expectedSession,
                playerName: expectedPlayerName
            });
            expect(errorService.handleError).toHaveBeenCalledWith('Error!');
        });
    });

    describe('leaveSession', () => {
        beforeEach(() => {
            route.params.next({
                sessionId: expectedSession,
                playerName: expectedPlayerName
            });
            gameEventsResponse.next(events);
        });

        it('should call service', () => {
            gameSessionService.ApiV1GameSessionLeavePost.and.returnValue(
                new ReplaySubject<any>(1)
            );

            component.leaveSession();

            expect(
                gameSessionService.ApiV1GameSessionLeavePost
            ).toHaveBeenCalledWith(<SessionContextModel>{
                sessionId: expectedSession,
                playerName: expectedPlayerName
            });
        });

        it('should handle api error', () => {
            const result = new ReplaySubject<any>(1);
            gameSessionService.ApiV1GameSessionLeavePost.and.returnValue(
                result
            );

            component.leaveSession();
            result.error('Error!');

            expect(
                gameSessionService.ApiV1GameSessionLeavePost
            ).toHaveBeenCalledWith(<SessionContextModel>{
                sessionId: expectedSession,
                playerName: expectedPlayerName
            });
            expect(errorService.handleError).toHaveBeenCalledWith('Error!');
        });

        it('should redirect user back to lobby', () => {
            const spy = spyOn(router, 'navigate');

            const result = new ReplaySubject<any>(1);
            gameSessionService.ApiV1GameSessionLeavePost.and.returnValue(
                result
            );

            component.leaveSession();
            result.next(<void>null);
            expect(spy).toHaveBeenCalledWith([
                'session-lobby',
                expectedSession
            ]);
        });
    });
});
