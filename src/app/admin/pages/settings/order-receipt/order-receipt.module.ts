import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderReceiptComponent } from "./order-receipt.component";
import { Routes, RouterModule } from "@angular/router";

const route: Routes = [
  {
    path: "",
    component: OrderReceiptComponent,
    children: [
      { path: "pdf", loadChildren: "./pdf/pdf.module#PdfModule" },
      { path: "**", redirectTo: "pdf" }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(route)],
  declarations: [OrderReceiptComponent]
})
export class OrderReceiptModule {}
