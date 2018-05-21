import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameModel } from '../../api/models';
import { GameService } from '../../api/services';
import { ErrorService } from '../../services/error.service';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-details.component.html'
})
export class GameDetailsComponent implements OnInit {
    @Input() public game: GameModel;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private error: ErrorService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.getGame(params['gameId']);
        }, this.error.handleError);
    }

    private getGame(gameId: number) {
        this.gameService.ApiV1GameByIdGet(gameId).subscribe(result => {
            this.game = result;
        }, this.error.handleError);
    }
}
