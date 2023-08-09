import React from 'react';

const Welcome = () => {
  return (
    <div className='w-full max-sm:mt-20 mt-36 max-sm:pb-4 pb-16'>
      <div className='page-x-width'>
        <h1 className='text-2xl mb-6'>
          <b>XLANG</b> Lab
        </h1>
        <p className='leading-7'>
          Welcome to the <b>Exe</b>cutable <b>Lang</b>uage <b>G</b>rounding (XLang) Lab!
          We are part of the HKU NLP Group at the University of Hong Kong.
          XLang focuses on building language model agents that transform (“grounding”) language instructions into code or actions executable in real-world environments,
          including databases (data agent), web applications (plugins/web agent), and the physical world (robotic agent) etc,.
          It lies at the heart of language model agents or natural language interfaces that can interact with and learn from these real-world environments to facilitate human interaction with data analysis,
          web applications, and robotic instruction through conversation.
          Recent advances in XLang incorporate techniques such as LLM + external tools, code generation, semantic parsing, and dialog or interactive systems.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
