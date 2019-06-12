import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { Routes, RouterModule } from "@angular/router";
import { AdminService } from "./admin.service";
import { AdminRoleGaurdService } from "./admin-role-gaurd.service";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AdminService],
    children: [
      {
        path: "newusertour",
        loadChildren:
          "app/admin/pages/new-user-tour/new-user-tour.module#NewUserTourModule",
        canActivate: [AdminService]
      },
      {
        path: "bulk-demo-import/:id",
        loadChildren:
          "app/admin/pages/product-wizard/product-wizard.module#ProductWizardModule",
        canActivate: [AdminService]
      },
      {
        path: "dashboard",
        loadChildren:
          "app/admin/pages/dashboard/dashboard.module#DashboardkModule",
        canActivate: [AdminService]
      },
      {
        path: "clear",
        loadChildren:
          "app/admin/pages/clearCache/dashboard.module#DashboardClearModule",
        canActivate: [AdminService],
        resolve: [AdminService]
      },
      {
        path: "inventory",
        loadChildren:
          "app/admin/pages/inventory/inventory.module#InventoryModule",
        canActivate: [AdminService]
      },
      {
        path: "settings",
        loadChildren: "app/admin/pages/settings/settings.module#SettingsModule",
        canActivate: [AdminService]
      },
      {
        path: "reservations",
        loadChildren:
          "app/admin/pages/reservations/reservations.module#ReservationsModule",
        canActivate: [AdminService]
      },
      {
        path: "report",
        loadChildren: "app/admin/pages/report/report.module#ReportModule",
        canActivate: [AdminService]
      },
      {
        path: "register",
        loadChildren: "app/admin/pages/register/register.module#RegisterModule",
        canActivate: [AdminService]
      },
      {
        path: "user",
        loadChildren:
          "app/admin/pages/user-management/user-management.module#UserManagementModule",
        canActivate: [AdminService, AdminRoleGaurdService]
      },
      {
        path: "plans",
        loadChildren: "app/admin/pages/pricing/pricing.module#PricingModule",
        canActivate: [AdminService, AdminRoleGaurdService]
      },
      {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
