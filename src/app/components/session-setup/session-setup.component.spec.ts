import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSetupComponent } from './session-setup.component';
import { FormsModule } from '@angular/forms';
import { GameSessionService } from '../../services/game-session/game-session.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MaterialAppModule } from '../../ngmaterial.module';
import { GameService } from '../../services/game/game.service';

describe('SessionSetupComponent', () => {
    let component: SessionSetupComponent;
    let fixture: ComponentFixture<SessionSetupComponent>;

    let route;
    let gameSessionService;
    let gameSessionStartResponse: ReplaySubject<string>;
    let gameService;
    let getAllResponse: ReplaySubject<TaskRandomizerApi.GameModel[]>;

    beforeEach(async(() => {
        gameSessionService = jasmine.createSpyObj('GameSessionService', [
            'startSession'
        ]);
        gameSessionStartResponse = new ReplaySubject<string>(1);
        gameSessionService.startSession.and.returnValue(
            gameSessionStartResponse
        );

        gameService = jasmine.createSpyObj('GameService', ['getAll']);
        getAllResponse = new ReplaySubject<TaskRandomizerApi.GameModel[]>(1);
        gameService.getAll.and.returnValue(getAllResponse);

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule.withRoutes([]),
                MaterialAppModule
            ],
            providers: [
                { provide: GameSessionService, useValue: gameSessionService },
                { provide: GameService, useValue: gameService }
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

    it('should get available games on init', () => {
        const expectedGames = <TaskRandomizerApi.GameModel[]>[
            { id: 1, name: 'testname1' },
            { id: 2, name: 'testname2' }
        ];

        expect(gameService.getAll).toHaveBeenCalled();

        getAllResponse.next(expectedGames);

        expect(component.games).toEqual(expectedGames);
    });

    describe('startSession', () => {
        it('should call correct service', () => {
            const gameId = 666;
            component.selectedGame = gameId;
            component.startSession();
            expect(gameSessionService.startSession).toHaveBeenCalledWith(
                gameId
            );
        });

        it('should route user to correct session lobby', () => {
            const spy = spyOn(route, 'navigate');

            const gameId = 666;
            component.selectedGame = gameId;
            component.startSession();
            gameSessionStartResponse.next('newSessionId');

            expect(spy).toHaveBeenCalledWith(['session-lobby', 'newSessionId']);
        });
    });
});
