import React from 'react';

const Acknowledgments = () => {
  return (
    <div className='px-6 py-10 bg-brand-offWhite'>
      <h2 className='title mb-7'>Acknowledgments</h2>

      <div className='grid grid-cols-2'>
        <div>
          <h2 className='title text-black font-bold'>Supporters</h2>
          <ul className='text-2xl space-y-1'>
            <li>Google</li>
            <li>Saleforce</li>
            <li>Amazon</li>
          </ul>
        </div>
        <div>
          <h2 className='title text-black font-bold'>Collaborators</h2>
          <ul className='text-2xl space-y-1'>
            <li>John</li>
            <li>Mary</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Acknowledgments;
