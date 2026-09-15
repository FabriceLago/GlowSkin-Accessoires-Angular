import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { SeoService } from '../../core/services/seo.service';

interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.html',
})
export class CheckoutComponent implements OnInit {
  readonly cart = inject(CartService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  readonly step = signal<1 | 2 | 3>(1);
  readonly isOrderConfirmed = signal(false);
  readonly orderNumber = signal('');

  readonly shipping = signal<ShippingInfo>({
    email: '', firstName: '', lastName: '', address: '', city: '', postalCode: '', country: 'France', phone: '',
  });

  readonly shippingMethod = signal<'standard' | 'express'>('standard');

  readonly payment = signal<PaymentInfo>({ cardName: '', cardNumber: '', expiry: '', cvc: '' });

  readonly shippingCost = computed(() => {
    if (this.shippingMethod() === 'express') return 9.9;
    return this.cart.amountToFreeShipping() > 0 ? 4.9 : 0;
  });

  readonly orderTotal = computed(() => this.cart.total() + this.shippingCost());

  readonly isStep1Valid = computed(() => {
    const s = this.shipping();
    return !!(s.email && s.firstName && s.lastName && s.address && s.city && s.postalCode);
  });

  readonly isStep3Valid = computed(() => {
    const p = this.payment();
    return !!(p.cardName && p.cardNumber.length >= 12 && p.expiry && p.cvc.length >= 3);
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'Commande',
      description: 'Finalisez votre commande GlowSkin Accessoires en toute sécurité.',
    });
    if (this.cart.items().length === 0) {
      this.router.navigateByUrl('/panier');
    }
  }

  updateShipping<K extends keyof ShippingInfo>(key: K, value: string): void {
    this.shipping.update((s) => ({ ...s, [key]: value }));
  }

  updatePayment<K extends keyof PaymentInfo>(key: K, value: string): void {
    this.payment.update((p) => ({ ...p, [key]: value }));
  }

  goToStep(step: 1 | 2 | 3): void {
    this.step.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmOrder(): void {
    if (!this.isStep3Valid()) return;
    this.orderNumber.set('GS-' + Math.floor(100000 + Math.random() * 900000));
    this.isOrderConfirmed.set(true);
    this.cart.clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
