import { Injectable } from '@angular/core';
import {
    HubConnection,
    ConsoleLogger,
    LogLevel,
    ServerSentEventsTransport
} from '@aspnet/signalr';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class MessageService {
    private connection: HubConnection;

    public connectionReady = new ReplaySubject<boolean>(1);

    constructor() {
        this.connection = new HubConnection(
            environment.signalR + 'gameSessionHub'
        );
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
