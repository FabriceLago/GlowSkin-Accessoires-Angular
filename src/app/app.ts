import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header';
import { FooterComponent } from './layout/footer/footer';
import { CartDrawerComponent } from './layout/cart-drawer/cart-drawer';
import { QuickViewComponent } from './shared/quick-view/quick-view';
import { CustomCursorComponent } from './shared/custom-cursor/custom-cursor';
import { CartService } from './core/services/cart.service';
import { ProductService } from './core/services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CartDrawerComponent, QuickViewComponent, CustomCursorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly cart = inject(CartService);
  private readonly productService = inject(ProductService);

  constructor() {
    this.cart.init(this.productService.products);
  }
}
