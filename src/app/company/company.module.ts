import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyLayoutModule } from './layouts/company-layout.module';
import { SidebarServiceModule } from './pages/sidebar-service/sidebar-service.module';
import { ScriptLoaderService } from '../_services/script-loader.service';

@NgModule({
  imports: [
    CommonModule,
    CompanyLayoutModule,
    CompanyRoutingModule,
    SidebarServiceModule
  ],
  declarations: [CompanyComponent],
  providers: [CompanyService]
})
export class CompanyModule { 
  
  credit: string[] = ['assets/vendors/base/vendors.bundle.min.js', 'assets/js/admin/scripts.bundle.min.js'];

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
