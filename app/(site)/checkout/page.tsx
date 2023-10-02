'use client'

import PaypalCheckout from '@/components/paypalCheckout';
import { useBoundStore } from '@/store';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Checkout = () => {
  const store = useBoundStore();
  console.log(store.ready_to_checkout)
  useEffect(() => {
    !store.ready_to_checkout && redirect('/apply')
  }, []);
  return (
    <div className="relative flex flex-col gap-8 justify-center items-center">
      <h1>Checkout</h1>
      <PaypalCheckout />
    </div>
  )
}

export default Checkout;