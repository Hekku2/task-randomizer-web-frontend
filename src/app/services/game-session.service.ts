import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient } from '@angular/common/http';

/**
 * Handles game session operations
 */
@Injectable()
export class GameSessionService {
    constructor(private http: HttpClient) {}

    getAllGameSessions(): Observable<TaskRandomizerApi.GameSessionModel[]> {
        return this.http.get<TaskRandomizerApi.GameSessionModel[]>(
            'http://localhost:5000/api/v1/gameSession'
        );
    }
}
