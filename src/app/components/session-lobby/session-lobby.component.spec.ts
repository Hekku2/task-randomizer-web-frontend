import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLobbyComponent } from './session-lobby.component';
import { MaterialAppModule } from '../../ngmaterial.module';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { GameSessionService } from '../../services/game-session/game-session.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('SessionLobbyComponent', () => {
    let component: SessionLobbyComponent;
    let fixture: ComponentFixture<SessionLobbyComponent>;

    let gameSessionService;
    let gameSessionResponse;

    let route;

    beforeEach(async(() => {
        route = {
            params: new ReplaySubject<any>(1)
        };

        gameSessionService = jasmine.createSpyObj('GameSessionService', [
            'getSingle'
        ]);
        gameSessionResponse = new ReplaySubject<any>(1);
        gameSessionService.getSingle.and.returnValue(gameSessionResponse);

        TestBed.configureTestingModule({
            imports: [MaterialAppModule],
            providers: [
                { provide: GameSessionService, useValue: gameSessionService },
                { provide: ActivatedRoute, useFactory: () => route }
            ],
            declarations: [SessionLobbyComponent]
        }).compileComponents();
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
        const expectedSession = <TaskRandomizerApi.GameSessionModel>{
            id: 'mocksession',
            gameName: 'test game'
        };

        route.params.next({
            sessionId: expectedSession.id
        });
        gameSessionResponse.next(expectedSession);

        expect(gameSessionService.getSingle).toHaveBeenCalledWith(
            expectedSession.id
        );
        expect(component.session).toBe(expectedSession);
    });
});
