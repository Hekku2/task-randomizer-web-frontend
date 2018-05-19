import { Injectable } from '@angular/core';
import { HubConnection, LogLevel } from '@aspnet/signalr';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import signalR = require('@aspnet/signalr');

@Injectable()
export class MessageService {
    private connection: HubConnection;

    public connectionReady = new ReplaySubject<boolean>(1);

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Trace)
            .withUrl(environment.signalR + 'gameSessionHub')
            .build();

        this.connection.start().then(
            () => {
                this.handleConnectionStart();
            },
            error => {
                this.handleConnectionFailed(error);
            }
        );

        this.connection.onclose(this.handleConnectionFailed);
    }

    private handleConnectionStart() {
        this.connectionReady.next(true);
    }

    private handleConnectionFailed(error) {
        this.connectionReady.next(false);
    }

    public listen(id): any {
        return this.connection.stream('StreamSessionEvents', id);
    }
}
