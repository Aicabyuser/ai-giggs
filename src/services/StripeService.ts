import { supabase } from '@/lib/supabase';

export interface StripePaymentMethod {
  id: string;
  type: 'card';
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  billing_details: {
    name: string;
    email: string;
  };
}

export class StripeService {
  private static instance: StripeService;
  private customerId: string | null = null;

  private constructor() {}

  static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  async initialize() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (profile?.stripe_customer_id) {
      this.customerId = profile.stripe_customer_id;
    } else {
      // Create new Stripe customer
      const { data: customer, error } = await supabase.functions.invoke('create-stripe-customer', {
        body: { email: user.email }
      });

      if (error) throw error;
      this.customerId = customer.id;

      // Update profile with Stripe customer ID
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customer.id })
        .eq('id', user.id);
    }
  }

  async getPaymentMethods(): Promise<StripePaymentMethod[]> {
    if (!this.customerId) await this.initialize();
    if (!this.customerId) throw new Error('Failed to initialize Stripe customer');

    const { data, error } = await supabase.functions.invoke('list-payment-methods', {
      body: { customerId: this.customerId }
    });

    if (error) throw error;
    return data;
  }

  async addPaymentMethod(paymentMethodId: string): Promise<void> {
    if (!this.customerId) await this.initialize();
    if (!this.customerId) throw new Error('Failed to initialize Stripe customer');

    const { error } = await supabase.functions.invoke('attach-payment-method', {
      body: { 
        customerId: this.customerId,
        paymentMethodId
      }
    });

    if (error) throw error;
  }

  async removePaymentMethod(paymentMethodId: string): Promise<void> {
    const { error } = await supabase.functions.invoke('detach-payment-method', {
      body: { paymentMethodId }
    });

    if (error) throw error;
  }

  async setDefaultPaymentMethod(paymentMethodId: string): Promise<void> {
    if (!this.customerId) await this.initialize();
    if (!this.customerId) throw new Error('Failed to initialize Stripe customer');

    const { error } = await supabase.functions.invoke('set-default-payment-method', {
      body: { 
        customerId: this.customerId,
        paymentMethodId
      }
    });

    if (error) throw error;
  }
}

export const stripeService = StripeService.getInstance(); 