import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin-service';

export const adminAuthGuard = () => {
  const adminService = inject(AdminService);
  const router = inject(Router);

  if (adminService.isAdminLoggedIn()) {
    return true;
  } else {
    router.navigate(['/admin/login']);
    return false;
  }
};
