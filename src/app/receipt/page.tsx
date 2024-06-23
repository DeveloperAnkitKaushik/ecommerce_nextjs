'use client';

import { useCartStore } from '@/hooks/useCart';
import styles from './index.module.css';

const PaymentConfirmation = () => {
  const { cart } = useCartStore();
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <h1>Hello Gabriel!</h1>
        </div>
        <p>Thank you very much for your purchase, We hope you <strong>really enjoy our classes</strong> here on Youtube!</p>
        <div className={styles.cart}>
          <p>Cart:</p>
          <p>1. (100 days of UI challenges) <span className={styles.price}>48$</span></p>
        </div>
        <div className={styles.payment}>
          <p>Here is your payment code, or point the camera at the QR CODE:</p>
          <p>Pix: 37c0be0d-70cb-46ce-be7e-fc8610c8f6f1 <button className={styles.copyButton}>Copy</button></p>
          <img src="/qrcode.png" alt="QR Code" className={styles.qrcode} />
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
