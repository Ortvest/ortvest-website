import Image from 'next/image';

import AppLogo from '@public/icons/AppLogo.svg';

export function BlogCoverPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <Image
        src={AppLogo}
        alt=""
        width={120}
        height={36}
        className="h-9 w-auto object-contain opacity-90"
        loading="lazy"
      />
    </div>
  );
}
