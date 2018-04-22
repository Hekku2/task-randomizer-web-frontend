import { TestBed, inject } from '@angular/core/testing';

import { GameService } from './game.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient } from '@angular/common/http';

describe('GameService', () => {
    let service: GameService;

    let httpClient;
    let response;

    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['get']);
        response = new ReplaySubject<any>(1);
        httpClient.get.and.returnValue(response);

        TestBed.configureTestingModule({
            providers: [
                GameService,
                { provide: HttpClient, useValue: httpClient }
            ]
        });

        service = TestBed.get(GameService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getAll', () => {
        it('should return all games', done => {
            service.getAll().subscribe(result => {
                expect(result).toBeTruthy();
                expect(result.length).toBe(3);

                done();
            });

            response.next([
                <TaskRandomizerApi.GameModel>{},
                <TaskRandomizerApi.GameModel>{},
                <TaskRandomizerApi.GameModel>{}
            ]);
        });
    });
});
