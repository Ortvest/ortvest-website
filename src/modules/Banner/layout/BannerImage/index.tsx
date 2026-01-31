import Image from 'next/image';

import styles from './style.module.css';

export const BannerImage = () => {
  return (
    <section className={styles.wrapper}>
      <Image
        src="/images/banner-bg.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
        aria-hidden
      />
    </section>
  );
};
