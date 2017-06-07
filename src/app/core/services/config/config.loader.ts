import { ConfigService } from './config.service';

export function ConfigLoader(configService: ConfigService) {
    return () => configService.load();
}
