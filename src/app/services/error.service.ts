import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {
    constructor() {}

    public handleError(error: any) {
        console.log('Error!');
        console.log(error);
        // TODO Issue #8 Unified error handling
    }
}
