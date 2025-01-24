import React from 'react';
import { parseDateString } from '@/utils/date';
import { News as NewsInterface } from '@/interface/news';

const News = ({ news }: { news?: NewsInterface[] }) => {
  return (
    <div className='w-full bg-[#D9D9D9]/20 max-sm:py-4 py-16'>
      <div className='page-x-width'>
        <h1 className='text-2xl font-normal'>News</h1>
        <div className='flex flex-col gap-2'>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`01/24/2025`}</div>
            <div><a href="https://os-world.github.io/" target="_blank" className="underline">OSWorld</a> is used in benchmarking <a href="https://openai.com/index/computer-using-agent/" target="_blank" className="underline">OpenAI Computer-Using Agent (Operator)</a> performance, which scores 38.1% success rate.</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`12/24/2024`}</div>
            <div>Introducing <a href="https://aguvis-project.github.io/" target="_blank" className="underline">Aguvis</a> - A unified vision-based strong agent model for autonomous GUI interaction across web, desktop & mobile platforms.</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`12/15/2024`}</div>
            <div><a href="https://huggingface.co/hkunlp/instructor-large" target="_blank" className="underline">Instructor embeddings</a> recently hit 5 million downloads on huggingface!</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`11/15/2024`}</div>
            <div>6 years after our <a href="https://yale-lily.github.io/spider" target="_blank" className="underline">Yale Spider 1.0</a>, we&apos;re introducing <a href="https://spider2-sql.github.io/" target="_blank" className="underline">Spider 2.0</a>, the real-world enterprise agentic Text-to-SQL workflow challenge in the LLM era!</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`10/23/2024`}</div>
            <div>Excited to see <a href="https://www.anthropic.com/news/3-5-models-and-computer-use" target="_blank" className="underline">Anthropic</a> using our <a href="https://os-world.github.io" target="_blank" className="underline">OSWorld</a> (NeurIPS&apos;24) to benchmark their computer use!</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`04/11/2024`}</div>
            <div>We have released &nbsp;<a href="https://os-world.github.io/" target="_blank" className="underline">OSWorld</a>,&nbsp; A unified, real computer env for multimodal agents to evaluate open-ended computer tasks with arbitrary apps and interfaces on Ubuntu, Windows, & macOS! &nbsp;</div>
          </div>
          
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`10/18/2023`}</div>
            <div>We have released &nbsp;<a href="https://github.com/xlang-ai/OpenAgents" target="_blank" className="underline">💥OpenAgents💥</a>,&nbsp; an open platform designed for language agents in the wild! For more details, you can visit our <a href="https://arxiv.org/abs/2310.10634" target="_blank" className="underline">paper</a> and the <a href="https://github.com/xlang-ai/OpenAgents" target="_blank" className="underline">code</a>! &nbsp;</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`10/13/2023`}</div>
            <div>We have released &nbsp;<a href="https://github.com/OpenLemur/Lemur" target="_blank" className="underline">Lemur70B</a>,&nbsp; 🚀 Open & SOTA Foundation Models for Language Agents! The closest open model to GPT-3.5 on 🤖15 agent tasks🤖! ! Check out our <a href="https://arxiv.org/abs/2310.06830" target="_blank" className="underline">paper</a> and feel free to download and use the model at &nbsp;<a href="https://huggingface.co/OpenLemur" target="_blank" className="underline">HuggingFace</a>!&nbsp;</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`09/28/2023`}</div>
            <div>Introducing <a href="https://text-to-reward.github.io/" target="_blank" className="underline">Text2Reward</a> - Using LLMs to generate dense reward functions from natural language for robotic RL policy training!</div>
          </div>
          {/*<div*/}
          {/*  className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'*/}
          {/*  key="top-news"*/}
          {/*>*/}
          {/*  <div>{`Aug 10, 2023`}</div>*/}
          {/*  <div>The */}
          {/*    &nbsp;<a href="https://chat.xlang.ai/" target="_blank" className="underline">XLang Agent Demos</a>&nbsp; */}
          {/*    are now available. Feel free to check! For more details about the XLang framework, please stay tuned at our*/}
          {/*    &nbsp;<a href="https://www.github.com/xlang-ai/xlang" target="_blank" className="underline">GitHub repo</a>&nbsp;*/}
          {/*    and follow our &nbsp;<a href="https://twitter.com/XLangNLP" target="_blank" className="underline">twitter</a></div>*/}
          {/*</div>*/}
          {/* {news &&
            news.map((n) => (
              <div
                className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
                key={n.description}
              >
                <div>{parseDateString(n.date)}</div>
                <div>{n.description}</div>
              </div>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default News;
