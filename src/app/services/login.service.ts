import { Injectable } from "@angular/core";
import { NullableType } from "../util/nullableType";

@Injectable({
    providedIn: 'root'
  })
  export class LoginService {
    private KEY = 'token';
  
    get token(): NullableType<string> {
      return localStorage.getItem(this.KEY);
    }
  }
  