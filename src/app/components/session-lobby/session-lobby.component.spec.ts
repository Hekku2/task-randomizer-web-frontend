import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLobbyComponent } from './session-lobby.component';
import { MaterialAppModule } from '../../ngmaterial.module';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSessionService } from '../../api/services';
import { GameSessionModel } from '../../api/models/game-session-model';
import { SessionJoinModel } from '../../api/models';

describe('SessionLobbyComponent', () => {
    let component: SessionLobbyComponent;
    let fixture: ComponentFixture<SessionLobbyComponent>;

    let gameSessionService;
    let gameSessionResponse;

    let route;
    let router;

    beforeEach(async(() => {
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
            imports: [MaterialAppModule, RouterTestingModule.withRoutes([])],
            providers: [
                { provide: GameSessionService, useValue: gameSessionService },
                { provide: ActivatedRoute, useFactory: () => route }
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
            const expectedJoinModel = <SessionJoinModel>{
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
    });
});
