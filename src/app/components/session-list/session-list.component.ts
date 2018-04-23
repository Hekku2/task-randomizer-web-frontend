import { Component, OnInit } from '@angular/core';
import { GameSessionListModel } from '../../models/GameSessionListModel';
import { GameSessionService } from '../../services/game-session/game-session.service';

@Component({
    selector: 'app-session-list',
    templateUrl: './session-list.component.html',
    styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
    gameSessions: GameSessionListModel[];

    constructor(private gameSessionService: GameSessionService) {}

    ngOnInit() {
        this.gameSessionService.getAllGameSessions().subscribe(result => {
            this.handleGameSessionListResponse(result);
        }, error => {
            // TODO Issue #8 Unified error handling
            throw error;
        });
    }

    private handleGameSessionListResponse(
        response: TaskRandomizerApi.GameSessionModel[]
    ): void {
        this.gameSessions = response.map(
            item =>
                <GameSessionListModel>{
                    id: item.id,
                    gameName: item.gameName
                }
        );
    }
}
