import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListComponent } from './game-list.component';
import { ReplaySubject } from 'rxjs';
import { GameModel } from '../../api/models';
import { GameService } from '../../api/services';
import { ErrorService } from '../../services/error.service';
import { MaterialAppModule } from '../../modules/ngmaterial.module';

describe('GameListComponent', () => {
    let component: GameListComponent;
    let fixture: ComponentFixture<GameListComponent>;

    let errorService;
    let gameService;
    let getAllResponse: ReplaySubject<GameModel[]>;

    beforeEach(async(() => {
        errorService = jasmine.createSpyObj('ErrorService', ['handleError']);
        gameService = jasmine.createSpyObj('GameService', ['ApiV1GameGet']);
        getAllResponse = new ReplaySubject<GameModel[]>(1);
        gameService.ApiV1GameGet.and.returnValue(getAllResponse);


        TestBed.configureTestingModule({
            imports: [
                MaterialAppModule
            ],
            providers: [
                { provide: GameService, useValue: gameService },
                { provide: ErrorService, useFactory: () => errorService }
            ],
            declarations: [GameListComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameListComponent);
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
});
