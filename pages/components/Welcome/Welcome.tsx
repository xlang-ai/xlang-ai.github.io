import React from 'react';

const Welcome = () => {
  return (
    <div className='w-full max-sm:mt-20 mt-36 pb-16'>
      <div className='page-x-width'>
        <h1 className='text-2xl mb-6'>
          <b>XLANG</b> Lab
        </h1>
        <p className='leading-7'>
          Welcome to the <b>Executable Language Grounding (XLANG)</b> Group! We
          are part of the <b>HKU NLP Group</b> at the University of Hong Kong.
          XLANG focuses on transforming natural language instructions (via large
          language models (LLMs)) into code or actions executable within
          real-world environments, including databases, web applications, and
          the physical world etc,. It lies at the heart of LLM-powered agents or
          natural language interfaces that interact with these real-world
          environments to facilitate human interaction with data analysis, web
          applications, and robotic instruction through conversation. Recent
          advances in Executable Language Grounding incorporate techniques such
          as LLM + external tools/actionable or agentic LLMs, code generation,
          semantic parsing, and dialog or interactive systems.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
