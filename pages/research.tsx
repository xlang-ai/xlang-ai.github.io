import React from 'react';

const research = () => {
  return (
    <div className='py-20'>
      <div className='px-16 py-6'>
        <h1 className='text-gray-500 mb-10'>Representative papers</h1>
        <div className='grid grid-cols-4 gap-y-4'>
          <div className='font-bold col-span-1'>Code generation</div>
          <div className='col-span-3 flex flex-col gap-8'>
            <Item
              item={{
                title: 'Xlang',
                githubURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
            <Item
              item={{
                title: 'Xlang',
                paperURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
            <Item
              item={{
                title: 'Xlang',
                githubURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
          </div>

          <div className='font-bold col-span-1 mt-10'>LLMs</div>
          <div className='col-span-3 flex flex-col gap-8 mt-10'>
            <Item
              item={{
                title: 'Xlang',
                githubURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
            <Item
              item={{
                title: 'Xlang',
                paperURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
            <Item
              item={{
                title: 'Xlang',
                githubURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
          </div>

          <div className='font-bold col-span-1 mt-10'>dialog</div>
          <div className='col-span-3 flex flex-col gap-8 mt-10'>
            <Item
              item={{
                title: 'Xlang',
                githubURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
            <Item
              item={{
                title: 'Xlang',
                paperURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
            <Item
              item={{
                title: 'Xlang',
                githubURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
          </div>
        </div>
      </div>

      <div className='px-16 py-6 bg-brand-offWhite'>
        <h1 className='text-gray-500  mb-10'>Papers from other members</h1>
        <div className='grid grid-cols-4'>
          <div className='font-bold col-span-1'>nlp</div>
          <div className='col-span-3 flex flex-col gap-8'>
            <Item
              item={{
                title: 'Xlang',
                githubURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
            <Item
              item={{
                title: 'Xlang',
                paperURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
            <Item
              item={{
                title: 'Xlang',
                githubURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
          </div>
        </div>
      </div>

      <div className='px-16 py-4'>
        <h1 className='text-gray-500  mb-10'>Projects</h1>
        <div className='grid grid-cols-4'>
          <div className='font-bold col-span-1'>nlp</div>
          <div className='col-span-3 flex flex-col gap-8'>
            <Item
              item={{
                title: 'Xlang',
                githubURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
            <Item
              item={{
                title: 'Pretraining code',
                paperURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
            <Item
              item={{
                title: 'Framework package',
                githubURL: 'https://chat.xlang.ai',
                description:
                  'Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI, DataSci, Robotics, Code/PL, SE, also different domain data and use cases.',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ResearchItem {
  title: string;
  description: string;
  paperURL?: string;
  githubURL?: string;
}

const Item = ({ item }: { item: ResearchItem }) => (
  <div>
    <a
      className='cursor-pointer'
      style={
        item?.paperURL || item?.githubURL
          ? {
              textDecoration: 'underline',
              color: '#245ab3',
            }
          : undefined
      }
      href={item?.paperURL || item?.githubURL}
    >
      {item.title}
    </a>
    <p className='my-[2px]'>{item.description}</p>
    <div className='flex gap-6 text-[#245ab3]'>
      {item.paperURL && (
        <a href={item.paperURL} className='cursor-pointer'>
          [paper]
        </a>
      )}{' '}
      {item.githubURL && (
        <a href={item.paperURL} className='cursor-pointer'>
          [github]
        </a>
      )}
    </div>
  </div>
);

export default research;
