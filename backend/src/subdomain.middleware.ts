// subdomain.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SubdomainMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const host = req.headers.host; // e.g., "pramakant.localhost:3000"
        const subdomain = host?.split('.')[0]; // => "pramakant"

        if (subdomain && subdomain !== 'localhost') {
            req['adminSubdomain'] = subdomain;
        }
        next();
    }
}
