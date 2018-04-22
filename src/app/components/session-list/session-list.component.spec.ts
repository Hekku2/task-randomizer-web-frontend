import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionListComponent } from './session-list.component';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { GameSessionListModel } from '../../models/GameSessionListModel';
import { GameSessionService } from '../../services/game-session/game-session.service';
import { MaterialAppModule } from '../../ngmaterial.module';

describe('SessionListComponent', () => {
    let component: SessionListComponent;
    let fixture: ComponentFixture<SessionListComponent>;

    let gameSessionService;
    let gameSessionsResponse;

    beforeEach(async(() => {
        gameSessionService = jasmine.createSpyObj('GameSessionService', [
            'getAllGameSessions'
        ]);
        gameSessionsResponse = new ReplaySubject<any>(1);
        gameSessionService.getAllGameSessions.and.returnValue(
            gameSessionsResponse
        );

        TestBed.configureTestingModule({
            imports: [MaterialAppModule],
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
        expect(gameSessionService.getAllGameSessions).toHaveBeenCalled();
    });

    it('should contain game sessions', () => {
        const sessions = [
            <TaskRandomizerApi.GameSessionModel>{
                id: '1',
                gameName: 'session 1'
            },
            <TaskRandomizerApi.GameSessionModel>{
                id: '2',
                gameName: 'session 2'
            },
            <TaskRandomizerApi.GameSessionModel>{
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
