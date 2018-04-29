/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { SessionEventModel } from '../models/session-event-model';
@Injectable()
class EventService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param sessionId ID of session
   * @return Success
   */
  ApiV1EventBySessionIdGetResponse(sessionId: string): Observable<HttpResponse<Array<SessionEventModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Event/${sessionId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Array<SessionEventModel> = null;
        _body = _resp.body as Array<SessionEventModel>;
        return _resp.clone({body: _body}) as HttpResponse<Array<SessionEventModel>>;
      })
    );
  }

  /**
   * @param sessionId ID of session
   * @return Success
   */
  ApiV1EventBySessionIdGet(sessionId: string): Observable<Array<SessionEventModel>> {
    return this.ApiV1EventBySessionIdGetResponse(sessionId).pipe(
      map(_r => _r.body)
    );
  }
}

module EventService {
}

export { EventService }