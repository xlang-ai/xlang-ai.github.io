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
            <div>{`December 24, 2024`}</div>
            <div>🔥🔥 Introducing Aguvis - A unified vision-based strong agent model for autonomous GUI interaction across web, desktop & mobile platforms.</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`December 15, 2024`}</div>
            <div>🔥🔥 Instructor embeddings recently hit 5 million downloads on huggingface!</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`November 15, 2024`}</div>
            <div>🔥🔥 6 years after our Yale Spider 1.0, we're introducing Spider 2.0, the real-world enterprise agentic Text-to-SQL workflow challenge in the LLM era!</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`October 23, 2024`}</div>
            <div>🔥🔥 Excited to see <a href="https://www.anthropic.com/news/3-5-models-and-computer-use" target="_blank" className="underline">AnthropicAI</a> using our <a href="https://os-world.github.io" target="_blank" className="underline">OSWorld</a> (NeurIPS'24) to benchmark their computer use!</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`April 11, 2024`}</div>
            <div>🔥🔥 We have released &nbsp;<a href="https://os-world.github.io/" target="_blank" className="underline">OSWorld</a>,&nbsp; A unified, real computer env for multimodal agents to evaluate open-ended computer tasks with arbitrary apps and interfaces on Ubuntu, Windows, & macOS! &nbsp;</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`September 28, 2023`}</div>
            <div>🔥🔥 Introducing Text2Reward - Using LLMs to generate dense reward functions from natural language for robotic RL policy training!</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`Oct 18, 2023`}</div>
            <div>🔥🔥 We have released &nbsp;<a href="https://github.com/xlang-ai/OpenAgents" target="_blank" className="underline">💥OpenAgents💥</a>,&nbsp; an open platform designed for language agents in the wild! For more details, you can visit our <a href="https://arxiv.org/abs/2310.10634" target="_blank" className="underline">paper</a> and the <a href="https://github.com/xlang-ai/OpenAgents" target="_blank" className="underline">code</a>! &nbsp;</div>
          </div>
          <div
            className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
            key="top-news"
          >
            <div>{`Oct 13, 2023`}</div>
            <div>🔥🔥 We have released &nbsp;<a href="https://github.com/OpenLemur/Lemur" target="_blank" className="underline">Lemur70B</a>,&nbsp; 🚀 Open & SOTA Foundation Models for Language Agents! The closest open model to GPT-3.5 on 🤖15 agent tasks🤖! ! Check out our <a href="https://arxiv.org/abs/2310.06830" target="_blank" className="underline">paper</a> and feel free to download and use the model at &nbsp;<a href="https://huggingface.co/OpenLemur" target="_blank" className="underline">HuggingFace</a>!&nbsp;</div>
          </div>
          {/*<div*/}
          {/*  className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'*/}
          {/*  key="top-news"*/}
          {/*>*/}
          {/*  <div>{`Aug 10, 2023`}</div>*/}
          {/*  <div>🔥🔥 The */}
          {/*    &nbsp;<a href="https://chat.xlang.ai/" target="_blank" className="underline">XLang Agent Demos</a>&nbsp; */}
          {/*    are now available. Feel free to check! For more details about the XLang framework, please stay tuned at our*/}
          {/*    &nbsp;<a href="https://www.github.com/xlang-ai/xlang" target="_blank" className="underline">GitHub repo</a>&nbsp;*/}
          {/*    and follow our &nbsp;<a href="https://twitter.com/XLangNLP" target="_blank" className="underline">twitter</a></div>*/}
          {/*</div>*/}
          {news &&
            news.map((n) => (
              <div
                className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
                key={n.description}
              >
                <div>{parseDateString(n.date)}</div>
                <div>{n.description}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default News;
