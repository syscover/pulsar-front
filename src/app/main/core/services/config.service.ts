import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService
{
    private config: Object = null;

    constructor() {}

    public get(key: any): any
    {
        if (this.config) 
        {
            return this.config[key];
        } 
        else 
        {
            return null;
        }
    }

    public set(config: Object): void
    {
        this.config = config;
    }
}
