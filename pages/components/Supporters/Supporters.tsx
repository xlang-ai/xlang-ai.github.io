import React from 'react';

const Supporters = () => {
  return (
    <div>
      <div className='text-gray-500 font-xs'>Supporters of Xlang</div>
      <div className='flex flex-wrap gap-6 mt-8'>
        <SupporterCard
          supporter={{
            name: 'Google',
            description: 'Google research scholar award',
          }}
        />
        <SupporterCard
          supporter={{ name: 'Amazon', description: 'Amazon Research' }}
        />
        <SupporterCard
          supporter={{ name: 'Salesforce', description: 'Salesforce Research' }}
        />
      </div>
    </div>
  );
};

interface Supporter {
  name: string;
  description?: string;
}

const SupporterCard = ({ supporter }: { supporter: Supporter }) => (
  <div className='bg-black w-1/3 px-4 py-3 max-w-[300px] h-[100px] rounded-lg text-white'>
    <div className='font-bold text-lg mb-1'>{supporter.name}</div>
    <div className='text-sm'>{supporter.description}</div>
  </div>
);

export default Supporters;
