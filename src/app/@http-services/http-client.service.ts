import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  //   Create API
  postAPI(url: string, postData: any) {
    return this.http.post(url, postData);
  }

  //   Read API
  // 設定getAPI取得的資料類型為any
  getAPI(url: string): any {
    return this.http.get(url);
  }

  //   Update API
  putAPI(url: string, postData: any) {
    return this.http.put(url, postData);
  }

  //   Delete API
  delAPI(url: string) {
    return this.http.delete(url);
  }
}
