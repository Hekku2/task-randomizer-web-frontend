import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameModel, ErrandModel } from '../../api/models';
import { GameService, ErrandService } from '../../api/services';
import { ErrorService } from '../../services/error.service';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-details.component.html'
})
export class GameDetailsComponent implements OnInit {
    @Input() public game: GameModel;
    @Input() public errands: Array<ErrandModel>;
    public tableSource: MatTableDataSource<ErrandModel>;
    public displayedColumns = ['description', 'control'];

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private errandService: ErrandService,
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
        this.errandService.ApiV1ErrandGameByGameIdGet(gameId).subscribe(result => {
            this.errands = result;
            this.tableSource = new MatTableDataSource<ErrandModel>(result);
        }, this.error.handleError);
    }

    public add() {
        this.errands.push(<ErrandModel>{
            description: 'New errand'
        });
        this.tableSource.data = this.errands;
    }

    public remove(object) {
        const index = this.errands.indexOf(object, 0);
        if (index > -1) {
            this.errands.splice(index, 1);
        }
        this.tableSource.data = this.errands;
    }
}
