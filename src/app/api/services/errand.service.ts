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

import { ErrandModel } from '../models/errand-model';
@Injectable()
class ErrandService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1ErrandGetResponse(): Observable<HttpResponse<Array<ErrandModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Errand`,
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
        let _body: Array<ErrandModel> = null;
        _body = _resp.body as Array<ErrandModel>;
        return _resp.clone({body: _body}) as HttpResponse<Array<ErrandModel>>;
      })
    );
  }

  /**
   * @return Success
   */
  ApiV1ErrandGet(): Observable<Array<ErrandModel>> {
    return this.ApiV1ErrandGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param gameId undefined
   * @return Success
   */
  ApiV1ErrandGameByGameIdGetResponse(gameId: number): Observable<HttpResponse<Array<ErrandModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Errand/game/${gameId}`,
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
        let _body: Array<ErrandModel> = null;
        _body = _resp.body as Array<ErrandModel>;
        return _resp.clone({body: _body}) as HttpResponse<Array<ErrandModel>>;
      })
    );
  }

  /**
   * @param gameId undefined
   * @return Success
   */
  ApiV1ErrandGameByGameIdGet(gameId: number): Observable<Array<ErrandModel>> {
    return this.ApiV1ErrandGameByGameIdGetResponse(gameId).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id ID of errand
   * @return Success
   */
  ApiV1ErrandByIdGetResponse(id: number): Observable<HttpResponse<ErrandModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Errand/${id}`,
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
   * @param id ID of errand
   * @return Success
   */
  ApiV1ErrandByIdGet(id: number): Observable<ErrandModel> {
    return this.ApiV1ErrandByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

module ErrandService {
}

export { ErrandService }