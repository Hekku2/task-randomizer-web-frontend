import { Component, OnInit } from '@angular/core';
import { GameModel } from '../../api/models';
import { GameService } from '../../api/services';
import { ErrorService } from '../../services/error.service';

@Component({
    selector: 'game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
    public games: GameModel[] = [];

    constructor(
        private gameService: GameService,
        private error: ErrorService
    ) {}

    ngOnInit() {
        this.gameService.ApiV1GameGet().subscribe(
            result => {
                this.games = result;
            }, this.error.handleError
        );
    }
}
