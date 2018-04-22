import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameService {
    constructor(private http: HttpClient) {}

    public getAll(): Observable<TaskRandomizerApi.GameModel[]> {
        return this.http.get<TaskRandomizerApi.GameModel[]>(
            'http://localhost:5000/api/v1/game'
        );
    }
}
