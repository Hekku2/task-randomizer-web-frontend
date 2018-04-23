import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSetupComponent } from './session-setup.component';
import { FormsModule } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MaterialAppModule } from '../../ngmaterial.module';
import { GameModel } from '../../api/models';
import { GameSessionService, GameService } from '../../api/services';

describe('SessionSetupComponent', () => {
    let component: SessionSetupComponent;
    let fixture: ComponentFixture<SessionSetupComponent>;

    let route;
    let gameSessionService;
    let gameSessionStartResponse: ReplaySubject<string>;
    let gameService;
    let getAllResponse: ReplaySubject<GameModel[]>;

    beforeEach(async(() => {
        gameSessionService = jasmine.createSpyObj('GameSessionService', [
            'ApiV1GameSessionStartPost'
        ]);
        gameSessionStartResponse = new ReplaySubject<string>(1);
        gameSessionService.ApiV1GameSessionStartPost.and.returnValue(
            gameSessionStartResponse
        );

        gameService = jasmine.createSpyObj('GameService', ['ApiV1GameGet']);
        getAllResponse = new ReplaySubject<GameModel[]>(1);
        gameService.ApiV1GameGet.and.returnValue(getAllResponse);

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
        const expectedGames = <GameModel[]>[
            { id: 1, name: 'testname1' },
            { id: 2, name: 'testname2' }
        ];

        expect(gameService.ApiV1GameGet).toHaveBeenCalled();

        getAllResponse.next(expectedGames);

        expect(component.games).toEqual(expectedGames);
    });

    describe('startSession', () => {
        it('should call correct service', () => {
            const gameId = 666;
            component.selectedGame = gameId;
            component.startSession();
            expect(gameSessionService.ApiV1GameSessionStartPost).toHaveBeenCalledWith(
                {gameId: gameId}
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

        it('should remove quotation marks from session id', () => {
            const spy = spyOn(route, 'navigate');

            const gameId = 666;
            component.selectedGame = gameId;
            component.startSession();
            gameSessionStartResponse.next('\"newSessionId\"');

            expect(spy).toHaveBeenCalledWith(['session-lobby', 'newSessionId']);
        });
    });
});
