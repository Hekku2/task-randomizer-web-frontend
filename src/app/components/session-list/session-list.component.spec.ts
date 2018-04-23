import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionListComponent } from './session-list.component';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { GameSessionListModel } from '../../models/GameSessionListModel';
import { MaterialAppModule } from '../../ngmaterial.module';
import { RouterTestingModule } from '@angular/router/testing';
import { GameSessionModel } from '../../api/models';
import { GameSessionService } from '../../api/services';

describe('SessionListComponent', () => {
    let component: SessionListComponent;
    let fixture: ComponentFixture<SessionListComponent>;

    let gameSessionService;
    let gameSessionsResponse;

    beforeEach(async(() => {
        gameSessionService = jasmine.createSpyObj('GameSessionService', [
            'ApiV1GameSessionGet'
        ]);
        gameSessionsResponse = new ReplaySubject<any>(1);
        gameSessionService.ApiV1GameSessionGet.and.returnValue(
            gameSessionsResponse
        );

        TestBed.configureTestingModule({
            imports: [MaterialAppModule, RouterTestingModule.withRoutes([])],
            providers: [
                { provide: GameSessionService, useValue: gameSessionService }
            ],
            declarations: [SessionListComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should request game sessions on init', () => {
        expect(gameSessionService.ApiV1GameSessionGet).toHaveBeenCalled();
    });

    it('should contain game sessions', () => {
        const sessions = [
            <GameSessionModel>{
                id: '1',
                gameName: 'session 1'
            },
            <GameSessionModel>{
                id: '2',
                gameName: 'session 2'
            },
            <GameSessionModel>{
                id: '3',
                gameName: 'session 3'
            }
        ];

        gameSessionsResponse.next(sessions);

        expect(component.gameSessions).toEqual(<GameSessionListModel[]>[
            <GameSessionListModel>{
                id: '1',
                gameName: 'session 1'
            },
            <GameSessionListModel>{
                id: '2',
                gameName: 'session 2'
            },
            <GameSessionListModel>{
                id: '3',
                gameName: 'session 3'
            }
        ]);
    });
});
