import {CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {FlashMessage} from 'angular-flash-message';

@Injectable()
export class adminAuthService implements CanActivate {
    constructor(private router: Router,private flashmessage: FlashMessage  ){}
    canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
        if(localStorage.getItem('user') !== null){
            if(JSON.parse(localStorage.getItem('user')).username ==='admin@cfe.com'){
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        } else {
            this.router.navigate(['/login']);
            return false;            
        }
    }
}