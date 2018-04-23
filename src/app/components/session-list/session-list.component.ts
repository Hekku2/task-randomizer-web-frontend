import { Component, OnInit } from '@angular/core';
import { GameSessionListModel } from '../../models/GameSessionListModel';
import { GameSessionModel } from '../../api/models';
import { GameSessionService } from '../../api/services';

@Component({
    selector: 'app-session-list',
    templateUrl: './session-list.component.html',
    styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
    gameSessions: GameSessionListModel[];

    constructor(private gameSessionService: GameSessionService) {}

    ngOnInit() {
        this.gameSessionService.ApiV1GameSessionGet().subscribe(result => {
            this.handleGameSessionListResponse(result);
        }, error => {
            // TODO Issue #8 Unified error handling
            throw error;
        });
    }

    private handleGameSessionListResponse(
        response: GameSessionModel[]
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
