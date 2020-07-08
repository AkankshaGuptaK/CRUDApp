import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InputService } from './input.service';

@Injectable({providedIn:'root'})
export class EditGuard implements CanActivate{
    
    constructor(private inputService:InputService, private router:Router){

    }

    canActivate(route:ActivatedRouteSnapshot,state: RouterStateSnapshot): 
    Observable<boolean> | Promise<boolean> | boolean{
        if(this.inputService.getColumns()==undefined){
            this.router.navigate(['/']);
        }
        else{
            return true;
        }
        // return this.authService.isAuthenticated().then(
        //     (authenticated:boolean)=>{
        //         if(authenticated){
        //             return true;
        //         }
        //         else{
        //             this.router.navigate(['/']);
        //         }
        //     }
        // )
    }
}