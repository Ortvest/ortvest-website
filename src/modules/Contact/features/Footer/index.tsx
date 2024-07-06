import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import SendIcon from '@public/icons/SendIcon.svg';

import styles from './style.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.privacy}>
        By sending this form I confirm that I have read and accept the <Link href="/#">Privacy Policy</Link>
      </p>
      <button className={styles.send}>
        <Image src={SendIcon} alt="send icon" />
        Send
      </button>
    </footer>
  );
};
