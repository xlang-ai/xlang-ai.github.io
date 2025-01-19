import React from 'react';
import { publicFilePath } from '../../../utils';

const Welcome = () => {
  return (
    <div className='w-full max-sm:mt-20 mt-36 max-sm:pb-4 pb-16'>
      <div className='page-x-width'>
        <h1 className='text-2xl mb-6'>
          <b>XLANG</b> Lab
        </h1>
        <p className='leading-7 mb-8'>
          Welcome to the
          <span style={{ fontWeight: 'bold' }}>
            <span style={{ color: '#643EAD' }}> Exe</span>cutable
            <span style={{ color: '#643EAD' }}> Lang</span>uage
            <span style={{ color: '#643EAD' }}> G</span>rounding (XLANG)
          </span> Lab!
          We are part of the <a href="https://nlp.cs.hku.hk/" target="_blank" className="underline">HKU NLP Group</a> at the University of Hong Kong.
          We focus on developing grounded AI agents that empower users to use language to interact with digital and physical environments to carry out real-world tasks.
          Our systems ground language and perception into code and actions executable in the corresponding environments, including databases (data/coding agent), computers (computer use agent), and the physical world (robotic agent) etc,.
          Through these agents, we aim to enable non-experts to access complex systems such as databases, software, and robots while unlocking functionalities across existing applications and physical systems that dramatically expand AI capabilities.
        </p>
        <div className='col-span-4'>
          <img 
            src={publicFilePath('/demo/teaser.jpg')} 
            alt='xlang-overview' 
            className='w-full h-auto' 
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
