import React from 'react';

import Image from 'next/image';

const TextWithImage = ({
  image,
  title,
  subtitle,
  content,
  button,
  reverse,
}: {
  image: string;
  title: string;
  subtitle: string;
  content: string;
  button?: React.ReactElement;
  reverse?: boolean;
}) => {
  return (
    <div className='sm:flex justify-between gap-6'>
      {image && reverse && <ImageSection image={image} />}
      <div className='sm:w-1/2 flex flex-col gap-4 py-4'>
        <div>
          <h2 className='font-[600] text-3xl'>{title}</h2>
          <h2 className='font-[600]'>{subtitle}</h2>
        </div>
        <div className='leading-6 tracking-wide'>{content}</div>
        {button}
      </div>
      {(image && reverse) || <ImageSection image={image} />}
    </div>
  );
};

const ImageSection = ({ image }: { image: string }) => (
  <div className='relative overflow-hidden'>
    <Image
      src={image}
      alt='image'
      width={240}
      height={240}
      style={{ objectFit: 'contain', objectPosition: 'center' }}
    />
  </div>
);

export default TextWithImage;
