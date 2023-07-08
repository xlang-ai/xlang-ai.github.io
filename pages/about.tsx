import React from 'react';

import Team from './team';
import Supporters from './components/Supporters';

const about = () => {
  return (
    <>
      <div className='py-20 bg-brand-offWhite min-h-screen px-4 sm:px-10 lg:px-32'>
        <div className='flex flex-col gap-4'>
          <div>
            <h1 className='text-gray-600 mt-6'>Misson</h1>
            <p className='my-10 text-2xl'>
              We are dedicated to bringing you the latest advancements in
              artificial intelligence (AI) and its applications in various
              domains. We aim to provide comprehensive information and resources
              to help you understand and leverage the power of AI in your
              everyday work and business.
            </p>
          </div>
          <div className='bg-white -mx-10 px-10 lg:-mx-32 lg:px-32'>
            <h1 className='text-gray-600 mt-6'>Your Data AI copilot</h1>
            <p className='my-10 text-2xl'>
              Imagine having an intelligent assistant that not only understands
              your needs but also takes proactive steps to help you accomplish
              tasks. Our Data AI Copilot is designed to be your trusted
              companion, leveraging advanced AI algorithms to analyze,
              interpret, and act upon your data. Whether it&apos;s automating
              routine tasks, generating insights, or making data-driven
              recommendations, our AI copilot is here to support you every step
              of the way.
            </p>
          </div>
          <div>
            <h1 className='text-gray-600 mt-6'>AI that works for work</h1>
            <p className='my-10 text-2xl'>
              At Xlang, we believe in AI that works for you. We understand that
              your time is valuable, and that&apos;s why we have developed AI
              solutions that are tailored to enhance your work experience. Our
              AI tools are designed to seamlessly integrate into your existing
              workflows, enabling you to automate repetitive tasks, streamline
              processes, and unlock new levels of productivity.
            </p>
          </div>
          <div className='bg-white -mx-10 px-10 lg:-mx-32 lg:px-32'>
            <h1 className='text-gray-600 mt-6'>AI that minds your business</h1>
            <p className='my-10 text-2xl'>
              In today&apos;s fast-paced and data-driven business environment,
              staying ahead of the competition is crucial. Our AI solutions are
              specifically designed to mind your business by providing real-time
              insights, predictive analytics, and intelligent decision-making
              capabilities. By harnessing the power of AI, you can gain a
              competitive edge, identify new opportunities, and make data-driven
              decisions that drive success.
            </p>
          </div>
          <div>
            <h1 className='text-gray-600 mt-6'>X in XLang</h1>
            <p className='my-10 text-2xl'>
              Introducing X in XLang - a powerful AI platform that combines
              cutting-edge technology with executable actions. X in XLang is a
              comprehensive solution that empowers you to leverage various tools
              and take actions in different environments. With our platform, you
              can seamlessly integrate diverse capabilities from fields such as
              human-computer interaction (HCI), databases (DB), natural language
              processing (NLP), visualization (VIS), user interface (UI) design,
              data science (DataSci), robotics, code and programming languages
              (Code/PL), software engineering (SE), and more.
            </p>
          </div>
        </div>
      </div>
      <div className='my-4 px-4 sm:px-10 lg:px-32'>
        <Supporters />
      </div>

      <Team />
    </>
  );
};

export default about;
