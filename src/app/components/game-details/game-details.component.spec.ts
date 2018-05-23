import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaySubject } from 'rxjs';
import { GameDetailsComponent } from './game-details.component';
import { ActivatedRoute } from '@angular/router';
import { GameModel, ErrandModel } from '../../api/models';
import { GameService, ErrandService } from '../../api/services';
import { ErrorService } from '../../services/error.service';
import { MaterialAppModule } from '../../modules/ngmaterial.module';
import { FormsModule } from '@angular/forms';

describe('GameDetailsComponent', () => {
    let component: GameDetailsComponent;
    let fixture: ComponentFixture<GameDetailsComponent>;

    let errorService;
    let gameService;
    let errandService;
    let gameResponse;
    let errandResponse;
    let route;

    beforeEach(async(() => {
        errorService = jasmine.createSpyObj('ErrorService', ['handleError']);
        gameService = jasmine.createSpyObj('GameService', ['ApiV1GameByIdGet']);
        errandService = jasmine.createSpyObj('ErrandService', [
            'ApiV1ErrandGameByGameIdGet'
        ]);

        errandResponse = new ReplaySubject<any>(1);
        errandService.ApiV1ErrandGameByGameIdGet.and.returnValue(
            errandResponse
        );
        gameResponse = new ReplaySubject<any>(1);
        gameService.ApiV1GameByIdGet.and.returnValue(gameResponse);

        route = {
            params: new ReplaySubject<any>(1)
        };

        TestBed.configureTestingModule({
            imports: [MaterialAppModule, FormsModule],
            providers: [
                { provide: ActivatedRoute, useFactory: () => route },
                { provide: GameService, useValue: gameService },
                { provide: ErrandService, useValue: errandService },
                { provide: ErrorService, useFactory: () => errorService }
            ],
            declarations: [GameDetailsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch game from api when route is ready', () => {
        const expectedGame = <GameModel>{
            id: 123,
            name: 'Game of ages'
        };

        const expectedErrands = <ErrandModel[]>[
            <ErrandModel>{ description: 'Errand 1' },
            <ErrandModel>{ description: 'Errand 2' },
            <ErrandModel>{ description: 'Errand 3' }
        ];

        errandResponse.next(expectedErrands);
        gameResponse.next(expectedGame);

        route.params.next({
            gameId: expectedGame.id
        });

        expect(gameService.ApiV1GameByIdGet).toHaveBeenCalledWith(
            expectedGame.id
        );
        expect(errandService.ApiV1ErrandGameByGameIdGet).toHaveBeenCalledWith(
            expectedGame.id
        );

        expect(component.game).toEqual(expectedGame);
        expect(component.errands).toEqual(expectedErrands);
    });

    it('should handle params error', () => {
        route.params.error('error');
        expect(errorService.handleError).toHaveBeenCalledWith('error');
    });

    it('should handle error from game service', () => {
        const expectedGame = <GameModel>{
            id: 123,
            name: 'Game of ages'
        };

        gameResponse.error('error');

        route.params.next({
            gameId: expectedGame.id
        });

        expect(gameService.ApiV1GameByIdGet).toHaveBeenCalledWith(
            expectedGame.id
        );

        expect(errorService.handleError).toHaveBeenCalledWith('error');
    });
});
