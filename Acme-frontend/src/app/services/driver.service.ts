import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Driver } from '../models/driver';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
    providedIn: 'root'
})
export class DriverService{

    public url: string;

    constructor(private httpClient: HttpClient){
        this.url = global.url;
    }


    register(driver: Driver){
        
        let json = JSON.stringify(driver);
        let params = 'json='+json;

        const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.httpClient.post(`${this.url}/api/driver`, params, {headers: headers});
    }
}