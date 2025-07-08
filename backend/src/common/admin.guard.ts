// src/common/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { AdminService } from '../api/admin/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly adminService: AdminService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const subdomain = request['subdomain']; // Set by SubdomainMiddleware
        console.log('Subdomain in AdminGuard:', request['subdomain']);
        if (!subdomain) {
            throw new NotFoundException('Subdomain missing');
        }

        const admin = await this.adminService.findBySubdomain(subdomain);
        if (!admin) {
            throw new NotFoundException('Admin not found in Middleware');
        }

        request['admin'] = admin; // Attach admin to request
        return true;
    }
}