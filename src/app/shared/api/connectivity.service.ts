import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConnectionType } from './connection-type';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  
  private connectionChangesSubject = new BehaviorSubject<ConnectionType>(ConnectionType.Online);
  connectionChanges$ = this.connectionChangesSubject.asObservable();
  getConnectionType() {
    return this.connectionChangesSubject.value;
  }
  constructor() {
    window.addEventListener('offline', () => {
      this.connectionChangesSubject.next(ConnectionType.Offline);
    });
    window.addEventListener('online', () => {
      this.connectionChangesSubject.next(ConnectionType.Online);
    });
  }
}
