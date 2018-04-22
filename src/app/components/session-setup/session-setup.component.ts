import { Component, OnInit, Input } from '@angular/core';
import { GameSessionService } from '../../services/game-session/game-session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-session-setup',
    templateUrl: './session-setup.component.html',
    styleUrls: ['./session-setup.component.css']
})
export class SessionSetupComponent implements OnInit {
    @Input() game: number;

    constructor(
        private gameSessionService: GameSessionService,
        private route: Router
    ) {}

    ngOnInit() {
        this.game = 123;
    }

    public startSession(): void {
        this.gameSessionService.startSession(this.game).subscribe(result => {
            this.route.navigate(['session-lobby', result]);
        });
    }
}
