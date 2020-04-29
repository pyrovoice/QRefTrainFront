import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConnectivityService } from './connectivity.service';
import { ConnectionType } from './connection-type';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private connectivityService: ConnectivityService) { }

  public get<T>(path: string, params: any = null, version = "1.0.0") {
    return this.http
      .get<T>(this.getApiUrl(path, version), { params: params })
      .pipe(catchError(err => this.handleError(err)));
  }

  public post<T, D>(path: string, data: D, params: any = null, version = "1.0.0") {
    return this.http
      .post<T>(this.getApiUrl(path, version), data, { params })
      .pipe(catchError(err => this.handleError(err)));
  }

  public patch<T, D>(path: string, data: D, params: any = null, version = "1.0.0") {
    return this.http
      .patch<T>(this.getApiUrl(path, version), data, { params })
      .pipe(catchError(err => this.handleError(err)));
  }

  public put<T, D>(path: string, data: D, params: any = null, version = "1.0.0") {
    return this.http
      .put<T>(this.getApiUrl(path, version), data, this.getHttpOptions(params))
      .pipe(catchError(err => this.handleError(err)));
  }

  public getApiUrl(path: string, version: string) {
    return `${environment.apiUrl}${path}`;
  }

  protected getHttpOptions(params: any): {} {
    const options: any = {};
    options.observe = "body";
    if (params) {
      options.params = params;
    }

    return options;
  }

  protected handleError(error: HttpErrorResponse) {
    let errorInstance: Error;
    if (this.connectivityService.getConnectionType() === ConnectionType.Offline) {
      errorInstance = new Error("ErrorCode.Shared.NETWORK_OR_CLIENT");
    } else if (error.error instanceof ErrorEvent) {
      errorInstance = new Error("ErrorCode.Shared.SERVER_OFFLINE");
    } else {
      errorInstance = error;
    }

    return throwError(errorInstance);
  }
}
