import React from 'react';

import Image from 'next/image';

const TextWithImage = ({
  image,
  title,
  content,
  button,
  reverse,
}: {
  image: string;
  title: string;
  content: string;
  button?: React.ReactElement;
  reverse?: boolean;
}) => {
  return (
    <div className='flex justify-between gap-4'>
      {image && reverse && <ImageSection image={image} />}
      <div
        className={`w-1/2 flex flex-col gap-4 ${
          reverse ? 'items-end text-right' : ''
        }`}
      >
        <h2 className='font-bold text-xl'>{title}</h2>
        <div className='leading-6 tracking-wide'>{content}</div>
        {button}
      </div>
      {(image && reverse) || <ImageSection image={image} />}
    </div>
  );
};

const ImageSection = ({ image }: { image: string }) => (
  <div className='relative w-1/2 h-52 rounded-2xl border border-2 border-gray-800 overflow-hidden shadow-md'>
    <Image
      src={image}
      alt='image'
      layout="fill"
      style={{ objectFit: 'cover', objectPosition: 'center' }}
    />
  </div>
);

export default TextWithImage;
