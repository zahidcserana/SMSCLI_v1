import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { LayoutModule } from '../../layouts/layout.module';
import { InventoryServiceModule } from './inventory-serveice/inventory-service.module';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    LayoutModule,
    InventoryServiceModule.forRoot()
  ],
  exports: [InventoryRoutingModule],
  declarations: [InventoryComponent]
})
export class InventoryModule { }
