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

import { GameSessionModel } from '../models/game-session-model';
import { SessionSettingsModel } from '../models/session-settings-model';
import { ErrandModel } from '../models/errand-model';
@Injectable()
class GameSessionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1GameSessionGetResponse(): Observable<HttpResponse<Array<GameSessionModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/GameSession`,
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
        let _body: Array<GameSessionModel> = null;
        _body = _resp.body as Array<GameSessionModel>;
        return _resp.clone({body: _body}) as HttpResponse<Array<GameSessionModel>>;
      })
    );
  }

  /**
   * @return Success
   */
  ApiV1GameSessionGet(): Observable<Array<GameSessionModel>> {
    return this.ApiV1GameSessionGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1GameSessionByIdGetResponse(id: string): Observable<HttpResponse<GameSessionModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/GameSession/${id}`,
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
        let _body: GameSessionModel = null;
        _body = _resp.body as GameSessionModel;
        return _resp.clone({body: _body}) as HttpResponse<GameSessionModel>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1GameSessionByIdGet(id: string): Observable<GameSessionModel> {
    return this.ApiV1GameSessionByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param settings Session settings
   * @return Success
   */
  ApiV1GameSessionStartPostResponse(settings?: SessionSettingsModel): Observable<HttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = settings;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/GameSession/start`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: string = null;
        _body = _resp.body as string;
        return _resp.clone({body: _body}) as HttpResponse<string>;
      })
    );
  }

  /**
   * @param settings Session settings
   * @return Success
   */
  ApiV1GameSessionStartPost(settings?: SessionSettingsModel): Observable<string> {
    return this.ApiV1GameSessionStartPostResponse(settings).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `GameSessionService.ApiV1GameSessionJoinPostParams` containing the following parameters:
   *
   * - `SessionId`:
   *
   * - `PlayerName`:
   */
  ApiV1GameSessionJoinPostResponse(params: GameSessionService.ApiV1GameSessionJoinPostParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.SessionId != null) __params = __params.set('SessionId', params.SessionId.toString());
    if (params.PlayerName != null) __params = __params.set('PlayerName', params.PlayerName.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/GameSession/join`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;

        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param params The `GameSessionService.ApiV1GameSessionJoinPostParams` containing the following parameters:
   *
   * - `SessionId`:
   *
   * - `PlayerName`:
   */
  ApiV1GameSessionJoinPost(params: GameSessionService.ApiV1GameSessionJoinPostParams): Observable<void> {
    return this.ApiV1GameSessionJoinPostResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param SessionId undefined
   * @return Success
   */
  ApiV1GameSessionPopErrandPostResponse(SessionId?: string): Observable<HttpResponse<ErrandModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (SessionId != null) __params = __params.set('SessionId', SessionId.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/GameSession/popErrand`,
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
        let _body: ErrandModel = null;
        _body = _resp.body as ErrandModel;
        return _resp.clone({body: _body}) as HttpResponse<ErrandModel>;
      })
    );
  }

  /**
   * @param SessionId undefined
   * @return Success
   */
  ApiV1GameSessionPopErrandPost(SessionId?: string): Observable<ErrandModel> {
    return this.ApiV1GameSessionPopErrandPostResponse(SessionId).pipe(
      map(_r => _r.body)
    );
  }
}

module GameSessionService {

  /**
   * Parameters for ApiV1GameSessionJoinPost
   */
  export interface ApiV1GameSessionJoinPostParams {
    SessionId?: string;
    PlayerName?: string;
  }
}

export { GameSessionService }