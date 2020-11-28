import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../models/vehicle';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehicleService{

    public url: string;

    constructor(private httpClient: HttpClient){
        this.url = global.url;
    }

    register(vehicle: Vehicle){
        
        let json = JSON.stringify(vehicle);
        let params = 'json='+json;

        const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.httpClient.post(`${this.url}/api/vehicle`, params, {headers: headers});
    }

    getvehicleOwner(): Observable<any>{
        
        const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        
        return this.httpClient.get(`${this.url}/api/vehicleOwner`, {headers: headers});
    }
    
    getvehicleDriver(): Observable<any>{
        
        const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        
        return this.httpClient.get(`${this.url}/api/vehicleDriver`, {headers: headers});
    }
    getvehicles(): Observable<any>{
        
        const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        
        return this.httpClient.get(`${this.url}/api/vehicle`, {headers: headers});
    }

    getReport(): Observable<any>{
        
        const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        
        return this.httpClient.get(`${this.url}/api/vehicleReport`, {headers: headers});
    }

    
   
}