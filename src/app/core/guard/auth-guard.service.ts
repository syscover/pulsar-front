import { CanActivate, CanActivateChild } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate() {
        console.log('AuthGuard#canActivate called');
        return true;
    }

    CanActivateChild() {
        
    }
}
