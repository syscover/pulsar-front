import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService
{
    private config: object = null;

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

    public set(config: object): void
    {
        this.config = config;
    }
}
