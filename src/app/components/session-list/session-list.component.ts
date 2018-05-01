import { Component, OnInit } from '@angular/core';
import { GameSessionListModel } from '../../models/GameSessionListModel';
import { GameSessionModel } from '../../api/models';
import { GameSessionService } from '../../api/services';
import { ErrorService } from '../../services/error.service';

@Component({
    selector: 'app-session-list',
    templateUrl: './session-list.component.html',
    styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
    gameSessions: GameSessionListModel[];

    constructor(
        private gameSessionService: GameSessionService,
        private error: ErrorService) {}

    ngOnInit() {
        this.gameSessionService.ApiV1GameSessionGet().subscribe(result => {
            this.handleGameSessionListResponse(result);
        }, this.error.handleError);
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
