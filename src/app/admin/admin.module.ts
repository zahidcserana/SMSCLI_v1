import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutModule } from './layouts/layout.module';
import { SidebarServiceModule } from './pages/sidebar-service/sidebar-service.module';
import { CartServiceModule } from './cart-service/cart-service.module';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { AdminRoleGaurdService } from './admin-role-gaurd.service';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    SidebarServiceModule.forRoot(),
    CartServiceModule.forRoot()
  ],
  exports: [AdminRoutingModule],
  declarations: [AdminComponent],
  providers: [AdminService, AdminRoleGaurdService]
})
export class AdminModule {
  
  credit: string[] = [
      'assets/vendors/base/vendors.bundle.min.js',
      'assets/js/admin/scripts.bundle.min.js',
      //'assets/js/admin/tawk.js'
  ];

  constructor(private _script: ScriptLoaderService) 
  {
    for(let s of this.credit) {
      this.isScriptAlreadyIncluded(s)
    }
  }
  
  private isScriptAlreadyIncluded(src){
    let scripts = document.getElementsByTagName("script");
    let source = [];
    if(scripts) {
        for(var i = 0; i < scripts.length; i++) {
            source.push(scripts[i].getAttribute('src'));
        }
    }
    if(!source.includes(src)) {
        this._script.loadScript('body', src);
    }
  }
  


 }
