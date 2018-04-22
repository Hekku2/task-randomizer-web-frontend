import { TestBed, inject } from '@angular/core/testing';

import { GameSessionService } from './game-session.service';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';

describe('SessionService', () => {
    let service: GameSessionService;

    let httpClient;
    let response;

    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        response = new ReplaySubject<any>(1);
        httpClient.get.and.returnValue(response);
        httpClient.post.and.returnValue(response);

        TestBed.configureTestingModule({
            providers: [
                GameSessionService,
                { provide: HttpClient, useValue: httpClient }
            ]
        });

        service = TestBed.get(GameSessionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getAllGameSessions', () => {
        it('should return all games', done => {
            service.getAllGameSessions().subscribe(result => {
                expect(result).toBeTruthy();
                expect(result.length).toBe(3);

                done();
            });

            response.next([
                <TaskRandomizerApi.GameSessionModel>{},
                <TaskRandomizerApi.GameSessionModel>{},
                <TaskRandomizerApi.GameSessionModel>{}
            ]);
        });

        it('should return error when get fails', done => {
            service.getAllGameSessions().subscribe(
                result => {
                    fail('this should not happen');
                },
                error => {
                    done();
                }
            );
            response.error('failure');
        });
    });

    describe('startSession', () => {
        it('should start session', done => {
            service.startSession(666).subscribe(result => {
                expect(result).toBeTruthy();
                expect(result).toBe('sessionId');
                done();
            });

            response.next('sessionId');
        });

        it('should return error when start fails', done => {
            service.startSession(123).subscribe(
                result => {
                    fail('this should not happen');
                },
                error => {
                    done();
                }
            );
            response.error('failure');
        });
    });
});
