import { Injectable } from '@angular/core';

@Injectable()
export class HttpSynchronousService
{
    private _running = false; // boolean true when is consulting through Http
    buffer: any;

    get running() 
    {
        return this._running;
    }

    set running(value: boolean) 
    {
        this._running = value;
        this.checkBuffer();
    }

    async checkBuffer()
    {
        if (! this._running && this.buffer) 
        {
            this.running = true;
           
            await this.buffer();
            this.buffer = undefined;
            
            this.running = false;
        }
    }
}
