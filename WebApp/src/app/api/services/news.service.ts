/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class NewsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiNewsGet
   */
  static readonly ApiNewsGetPath = '/api/News';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiNewsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiNewsGet$Plain$Response(params?: {
    query?: string;
  }): Observable<StrictHttpResponse<Array<Article>>> {

    const rb = new RequestBuilder(this.rootUrl, NewsService.ApiNewsGetPath, 'get');
    if (params) {
      rb.query('query', params.query, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Article>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiNewsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiNewsGet$Plain(params?: {
    query?: string;
  }): Observable<Array<Article>> {

    return this.apiNewsGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Article>>) => r.body as Array<Article>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiNewsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiNewsGet$Json$Response(params?: {
    query?: string;
  }): Observable<StrictHttpResponse<Array<Article>>> {

    const rb = new RequestBuilder(this.rootUrl, NewsService.ApiNewsGetPath, 'get');
    if (params) {
      rb.query('query', params.query, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Article>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiNewsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiNewsGet$Json(params?: {
    query?: string;
  }): Observable<Array<Article>> {

    return this.apiNewsGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Article>>) => r.body as Array<Article>)
    );
  }

}
