import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Owner } from '../models/owner';
import { global } from './global';

@Injectable({
    providedIn: 'root'
})
export class OwnerService{

    public url: string;

    constructor(private httpClient: HttpClient){
        this.url = global.url;
    }


    register(owner: Owner){
        
        let json = JSON.stringify(owner);
        let params = 'json='+json;

        const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.httpClient.post(`${this.url}/api/owner`, params, {headers: headers});
    }
}