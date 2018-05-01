import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLobbyComponent } from './session-lobby.component';
import { MaterialAppModule } from '../../ngmaterial.module';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSessionService } from '../../api/services';
import { GameSessionModel } from '../../api/models/game-session-model';
import { ErrorService } from '../../services/error.service';
import { FormsModule } from '@angular/forms';
import { SessionContextModel } from '../../api/models';

describe('SessionLobbyComponent', () => {
    let component: SessionLobbyComponent;
    let fixture: ComponentFixture<SessionLobbyComponent>;

    let errorService;
    let gameSessionService;
    let gameSessionResponse;

    let route;
    let router;

    beforeEach(async(() => {
        errorService = jasmine.createSpyObj('ErrorService', ['handleError']);
        route = {
            params: new ReplaySubject<any>(1)
        };

        gameSessionService = jasmine.createSpyObj('GameSessionService', [
            'ApiV1GameSessionByIdGet',
            'ApiV1GameSessionJoinPost'
        ]);
        gameSessionResponse = new ReplaySubject<any>(1);
        gameSessionService.ApiV1GameSessionByIdGet.and.returnValue(
            gameSessionResponse
        );

        TestBed.configureTestingModule({
            imports: [
                MaterialAppModule,
                RouterTestingModule.withRoutes([]),
                FormsModule
            ],
            providers: [
                { provide: GameSessionService, useValue: gameSessionService },
                { provide: ActivatedRoute, useFactory: () => route },
                { provide: ErrorService, useFactory: () => errorService }
            ],
            declarations: [SessionLobbyComponent]
        }).compileComponents();

        router = TestBed.get(Router);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionLobbyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch session data when route is ready', () => {
        const expectedSession = <GameSessionModel>{
            id: 'mocksession',
            gameName: 'test game'
        };

        route.params.next({
            sessionId: expectedSession.id
        });
        gameSessionResponse.next(expectedSession);

        expect(gameSessionService.ApiV1GameSessionByIdGet).toHaveBeenCalledWith(
            expectedSession.id
        );
        expect(component.session).toBe(expectedSession);
    });

    it('should handle params error', () => {
        route.params.error('error');
        expect(errorService.handleError).toHaveBeenCalledWith('error');
    });

    it('should handle session service error', () => {
        const sessionId = 'mockSession';

        route.params.next({
            sessionId: sessionId
        });
        expect(gameSessionService.ApiV1GameSessionByIdGet).toHaveBeenCalledWith(
            sessionId
        );
        gameSessionResponse.error('error');
        expect(errorService.handleError).toHaveBeenCalledWith('error');
    });

    describe('joinSession', () => {
        it('should direct user to live session page and join to session', () => {
            const joinResponse = new ReplaySubject<void>(1);
            gameSessionService.ApiV1GameSessionJoinPost.and.returnValue(
                joinResponse
            );

            const expectedSession = <GameSessionModel>{
                id: 'mocksession',
                gameName: 'test game'
            };
            const expectedJoinModel = <SessionContextModel>{
                sessionId: expectedSession.id,
                playerName: 'Default name'
            };

            route.params.next({
                sessionId: expectedSession.id
            });
            gameSessionResponse.next(expectedSession);

            const spy = spyOn(router, 'navigate');

            component.joinSession();
            joinResponse.next(<void>null);
            expect(spy).toHaveBeenCalledWith([
                'session-live',
                expectedSession.id
            ]);
            expect(
                gameSessionService.ApiV1GameSessionJoinPost
            ).toHaveBeenCalledWith(expectedJoinModel);
        });

        it('should handle join session error', () => {
            const joinResponse = new ReplaySubject<void>(1);
            gameSessionService.ApiV1GameSessionJoinPost.and.returnValue(
                joinResponse
            );

            const expectedSession = <GameSessionModel>{
                id: 'mocksession',
                gameName: 'test game'
            };

            route.params.next({
                sessionId: expectedSession.id
            });
            gameSessionResponse.next(expectedSession);

            component.joinSession();

            joinResponse.error('Error');
            expect(errorService.handleError).toHaveBeenCalledWith('Error');
        });
    });
});
