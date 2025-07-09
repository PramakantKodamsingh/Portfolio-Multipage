import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SubdomainMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        let subdomain: string | null = null;
        // }
        subdomain = req.headers['x-subdomain'] as string || null;

        if (subdomain && /^[a-zA-Z0-9-]{1,63}$/.test(subdomain)) {
            req['subdomain'] = subdomain;
        }
        next();
    }
}

