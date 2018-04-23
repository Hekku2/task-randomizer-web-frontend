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

import { GameModel } from '../models/game-model';
@Injectable()
class GameService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1GameGetResponse(): Observable<HttpResponse<Array<GameModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Game`,
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
        let _body: Array<GameModel> = null;
        _body = _resp.body as Array<GameModel>;
        return _resp.clone({body: _body}) as HttpResponse<Array<GameModel>>;
      })
    );
  }

  /**
   * @return Success
   */
  ApiV1GameGet(): Observable<Array<GameModel>> {
    return this.ApiV1GameGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id Id of game
   * @return Success
   */
  ApiV1GameByIdGetResponse(id: number): Observable<HttpResponse<GameModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Game/${id}`,
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
        let _body: GameModel = null;
        _body = _resp.body as GameModel;
        return _resp.clone({body: _body}) as HttpResponse<GameModel>;
      })
    );
  }

  /**
   * @param id Id of game
   * @return Success
   */
  ApiV1GameByIdGet(id: number): Observable<GameModel> {
    return this.ApiV1GameByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

module GameService {
}

export { GameService }