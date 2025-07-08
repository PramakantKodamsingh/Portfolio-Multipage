import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SubdomainMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const host = req.headers.host; // e.g., pramakant.localhost:8080 or 127.0.0.1:8888

        let subdomain: string | null = null;

        // Only try to parse subdomain if host is NOT an IP address
        if (host && !isIPAddress(host)) {
            const cleanHost = host.split(':')[0]; // remove port
            const parts = cleanHost.split('.');
            if (parts.length > 2) {
                subdomain = parts[0];
            }
        }

        // Fallback to x-subdomain header or ?subdomain=
        subdomain = subdomain || (req.headers['x-subdomain'] as string) || (req.query.subdomain as string) || null;

        if (subdomain && /^[a-zA-Z0-9-]{1,63}$/.test(subdomain)) {
            req['subdomain'] = subdomain;
        }

        next();
    }
}

// Helper to check if host is IP address
function isIPAddress(host: string): boolean {
    return /^(\d{1,3}\.){3}\d{1,3}/.test(host);
}
