import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSetupComponent } from './session-setup.component';
import { FormsModule } from '@angular/forms';
import { GameSessionService } from '../../services/game-session/game-session.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MaterialAppModule } from '../../ngmaterial.module';

describe('SessionSetupComponent', () => {
    let component: SessionSetupComponent;
    let fixture: ComponentFixture<SessionSetupComponent>;

    let route;
    let gameSessionService;
    let gameSessionStartResponse: ReplaySubject<string>;

    beforeEach(async(() => {
        gameSessionService = jasmine.createSpyObj('GameSessionService', [
            'startSession'
        ]);
        gameSessionStartResponse = new ReplaySubject<string>(1);
        gameSessionService.startSession.and.returnValue(
            gameSessionStartResponse
        );

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule.withRoutes([]),
                MaterialAppModule
            ],
            providers: [
                { provide: GameSessionService, useValue: gameSessionService }
            ],
            declarations: [SessionSetupComponent]
        }).compileComponents();

        route = TestBed.get(Router);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionSetupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('startSession', () => {
        it('should call correct service', () => {
            const gameId = 666;
            component.game = gameId;
            component.startSession();
            expect(gameSessionService.startSession).toHaveBeenCalledWith(
                gameId
            );
        });

        it('should route user to correct session lobby', () => {
            const spy = spyOn(route, 'navigate');

            const gameId = 666;
            component.game = gameId;
            component.startSession();
            gameSessionStartResponse.next('newSessionId');

            expect(spy).toHaveBeenCalledWith(['session-lobby', 'newSessionId']);
        });
    });
});
