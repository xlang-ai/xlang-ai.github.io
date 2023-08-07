---
title: 'Introducing XLang: An Open-source Framework for Building LLM-Powered Agents via Executable Language Grounding'
shortTitle: Demo Release
slug: demo-release
date: 23 July 2023
author: XLANG Lab
coverImage: /demo.png
previewContent: We introduce XLang Agent, an LLM-driven natural language interface to you. We are a group of passionate natural language processing researchers. Driven by our fascination with language technology, we have come together to explore building conversational interfaces powered by large language models.
---

For decades, when people have imagined the distant future, they’ve almost always included a starring role for robots. Robots have been cast as dependable, helpful and even charming. Yet across those same decades, the technology has remained elusive — stuck in the imagined realm of science fiction.

Today, we’re introducing a new advancement in robotics that brings us closer to a future of helpful robots. [Robotics Transformer 2, or RT-2](https://robotics-transformer2.github.io/), is a first-of-its-kind vision-language-action (VLA) model. A [Transformer](https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html)-based model trained on text and images from the web, RT-2 can directly output robotic actions. Just like language models are trained on text from the web to learn general ideas and concepts, RT-2 transfers knowledge from web data to inform robot behavior.

In other words, RT-2 can speak robot.

Because a robot capable of doing general tasks in the world needs to be able to handle complex, abstract tasks in highly variable environments — especially ones it's never seen before.

Unlike chatbots, robots need “grounding” in the real world and their abilities. Their training isn’t just about, say, learning everything there is to know about an apple: how it grows, its physical properties, or even that one purportedly landed on Sir Isaac Newton’s head. A robot needs to be able to recognize an apple in context, distinguish it from a red ball, understand what it looks like, and most importantly, know how to pick it up. - understand the environmental context,  your goal in the context.

RT-2’s ability to transfer information to actions shows promise for robots to more rapidly adapt to novel situations and environments.  In other words, with RT-2, robots are able to learn more like we do — transferring learned concepts to new situations.

Not only does RT-2 show how advances in AI are cascading rapidly into robotics, it shows enormous promise for more general-purpose robots. While there is still a tremendous amount of work to be done to enable helpful robots in human-centered environments, RT-2 shows us an exciting future for robotics just within grasp.
model that learns from both web and robotics data, and translates this knowledge into generalised instructions for robotic control.

High-capacity vision-language models (VLMs) are trained on web-scale datasets, making these systems remarkably good at recognising visual or language patterns and operating across different languages. But for robots to achieve a similar level of competency, they would need to collect robot data, first-hand, across every object, environment, task, and situation.

—-------------

To add an intro…language agents..

## What is XLang?

Executable Language Grounding, or XLang, serves as a bridge, transforming natural language instructions into code or actions executable within real-world environments. Such environments include but are not limited to databases, web applications, and the physical world navigated by robots. Imagine the process as the transmutation of human instructions and questions - expressed in everyday language - into machine-understandable actions and code. The machine then executes these within a specific environment, leading to changes in the state of that environment. This change is observed, results are analyzed, and a further cycle of interaction with humans is initiated.

## Why is it important?

This crucial process lies at the heart of AI/language agents that interact with various real-world environments via natural language and accomplish tangible tasks for us. Recent advances in Executable Language Grounding incorporate techniques such as LLM (Large Language Models) enhanced with neuro-symbolic tools, code generation or semantic parsing, and dialog or interactive systems.

In the current generation of LLMs, we can furnish our models with an assortment of neuro-symbolic tools to enhance their capabilities. Typical inputs to these models could include language from the user, a toolkit brimming with different tools, and a variety of environments. The outcome is an action or code sequence executable within the corresponding environment, often entailing the use of certain tool APIs.

The process of building such agents often demands considerable effort and collaboration from a dedicated team. This is where XLang comes into play. Our objective with XLang is to establish an open-source framework and ecosystem for building and evaluating these powerful LLM-based agents.

## The Motivations and Challenges behind XLang

Our team's initial spark of excitement came when OpenAI announced the release of code interpreters and plugins. These tools represented live demonstrations of many years of our research in areas such as code generation, semantic parsing, and executable language grounding. Unfortunately, we couldn't access these tools to experiment with our ideas for improvements. This limitation prompted us to think ambitiously. What if we developed our own open-source code interpreters and plugins, or even a more general agent system and framework? This would not only benefit our team but also other research labs and companies worldwide. By sharing our work, we believe we can contribute to the growth of research and applications in this direction, allowing more people to perform exciting and interesting work on our open-source system.

Secondly, we saw a need for a unified platform, like Vicuna, to evaluate the performance of various LLMs (Large Language Models) in a neutral manner. We understand that interactive evaluation for LLM-powered agents is complex, but establishing a unified system that real users can access is a critical first step. Setting up agent demos is not as straightforward as connecting a chatbox to an LLM. It requires considerable effort, both in terms of engineering and research. The agents need to interact with their corresponding environments and effect changes in those environments. The system must robustly handle all sorts of situations, appropriately manage different possible execution results, and present these outcomes in the correct manner. Ensuring the robustness and scalability of this interaction cycle is a significant challenge.

Historically, NLP (Natural Language Processing) has lacked practical system demonstrations like those found in robotics or databases, and has instead focused more on testing against static benchmarks. However, with the advent of large models, we believe the time has come to bridge this gap. Similar to the MineDojo framework in embodied AI and the ManiSkill for robotics, setting up such an agent framework necessitates long-term cooperation among many individuals. Our goal is to see the fruits of our research move step by step towards real-world applications that will, in the not-so-distant future, be used by millions.

Our XLang team of about 15 researchers and developers from various backgrounds including NLP, ML, HCI, DB, full-stack development, UI design, and robotics have been working full-time on this project since the end of March. We've invested significant effort in addressing these challenges and minimizing the gap between research and the development of real-world interactive agents. We firmly believe in the value of our work and hope our open-source project will attract more researchers, developers, and designers to contribute to this exciting direction.

## Why Us? Our Journey

The answer to this question is quite straightforward. Our team is deeply interested in this field, and we've always wished for agents that can help people analyze data without coding, and for more natural language-led interaction modes for webs/apps. This was the primary reason why, in March, our team decided within four days of discussing the concept, to congregate in WeWork Shenzhen and commence full-time work on the project. This dedication has continued for more than four months, and we are committed to the long-term development of this project.

Many of our team members, myself included, have been consistently drawn to research problems in this direction. Our team comprises professionals with backgrounds in HCI, DB, NLP, visualization, and ML. We have all conducted extensive work on executable language grounding for building LLM-powered AI agents, specifically natural language interfaces for data in databases and webs/apps. Our research towards this goal includes a continued focus on semantic parsing or code generation.

Throughout this process, we have maintained active collaborations with industry players like Salesforce, Microsoft, Amazon, Facebook, Google, especially in the realm of text-to-SQL. We were also among the pioneers in working with large language models for in-context learning, LLM+tool use, instruction tuning, and retrieval embeddings for LLM. Here are some of our representative works:

- [Binder: Binding Language Models in Symbolic Languages (ICLR 2023)](https://lm-code-binder.github.io/) - One of the earliest works in LLM + tool use/agents, simultaneously with 'ReAct' last October. We proposed the use of LLM to leverage python/sql code interpreters and various API calls (similar to functional calling) to solve complex problems. This work was, unfortunately, under-recognized and under-credited. It proposed the concept of Toolformer and ChatGPT plugins half a year before its time.

- [Instructor Embeddings: One Embedder, Any Task: Instruction-Finetuned Text Embeddings (ACL 2023 Findings)](https://instructor-embedding.github.io/) - This work showcased instruction-finetuned text embeddings/retriever, the SOTA embedding for retrieval, semantic similarity, etc. It's open-source, and superior to OpenAI embeddings! Used in retrieval augmented language models, it achieved over 500k downloads, over 1k stars, and was used in ~500 projects in half a year.

- [Selective Annotation (ICLR 2023)](https://github.com/HKUNLP/icl-selective-annotation) - This work explored how annotation example selection impacts LLM’s in-context learning performance.

- Code Generation and Semantic Parsing: [DS-1000 (ICML 2023)](https://ds1000-code-gen.github.io/) and [Coder-Reviewer Reranking (ICML 2023)](https://arxiv.org/abs/2211.16490) represented recent LLM-based methods and benchmarks for general code generation, e.g., text-to-python. [UnifiedSKG (EMNLP 2022)](https://github.com/HKUNLP/UnifiedSKG) was a unified text-to-text SOTA T5 LM-based framework for 21 structured knowledge grounding tasks. A good summary in the direction before the ChatGPT era.

- [Spider: A Large-Scale Human-Labeled Dataset for Complex and Cross-Domain Semantic Parsing and Text-to-SQL Task (EMNLP 2018)](https://yale-lily.github.io/spider) - This was the most popular complex text-to-SQL benchmark, with over 200 submissions from top research labs, including Google, Facebook, UCB, CMU, UW, and more. It was widely studied not just in NLP but also HCI, VIS, PL, and DB communities.

- Dialog and Interactive Systems: [ICL-DST (EMNLP Findings 2022)](https://github.com/Yushi-Hu/IC-DST) - This was the first work demonstrating LLM’s good performance on dialogue state tracking tasks. Other conversational text-to-code tasks included [SParC (ACL 2019)](https://yale-lily.github.io/sparc), [CoSQL (EMNLP 2019)](https://yale-lily.github.io/cosql), [NL2Interface (NLVIZ 2022)](https://arxiv.org/abs/2209.08834)

More about our research can be found on our homepage. To put it simply, we are a dedicated research team profoundly invested and interested in XLang and LLM-powered AI agents, particularly those related to data and web/app agents. More XLang, code generation, LLM+tool use, and LLM+robotics paper collections can be found in our ACL tutorial on complex reasoning: LLM+tool use.

XLang Agents are advanced conversational interfaces powered by large language models (LLMs). Developed by a team of dedicated natural language processing researchers, XLang Agents utilize a range of tools to enhance their capabilities, serving as user-centric intelligent agents. In this section, we will provide an overview of three sub-demos implemented by XLang Agents:

- Data Agent: By combining code generation with DataTool, Data Copilot introduces a tool-augmented code paradigm. It enables the transformation of user intent, based on data, into actionable insights. This approach pushes the boundaries of traditional coding and tool usage.

- Plugins Agent: XLang Agents employ an intelligent Plugins system that connects to a wide range of real-world applications. With a seamless natural language interface, these plugins effortlessly integrate into your daily life, assisting with tasks such as scheduling meetings, organizing emails, providing recipe recommendations, and finding optimal routes for your commute.

- WeBot: Embark on an exciting journey with the innovative WeBot. Beyond retrieving information, WeBot takes proactive action. It adeptly navigates the complexities of the internet, completing intricate forms, making purchases on your behalf, and even uncovering hidden insights. WeBot prioritizes user interaction, adapting to your needs and ensuring a smooth chat experience. Its interactions are transparent, controllable, and interruptible, ensuring you always remain in control.

By harnessing the power of large language models in conjunction with diverse tools, XLang Agents significantly expand the capabilities of conversational interfaces, offering intelligent assistance that revolves around the user. Engage in a conversation with our XLang Agent to explore its wide-ranging capabilities further!

## What's Next? The Future

Our aim is to build XLang, an open-source ecosystem and community for LLM-powered agents. Our aim is to build an open-source XLang and LLM for agents' ecosystem and community. This release is just the beginning of our XLang open-source journey. In the following months, and beyond, we will be open-sourcing several significant projects, which will include all frameworks, models, demos, code, benchmarks, and more. This has been my consistent approach during my Ph.D. in the open academic community of NLP. We hope that in these particular times in NLP, we can enable more people, rather than just a few large companies or closed start-ups, to participate. We envision these initiatives as the starting point to establish a vivid LLM-powered agents, tool use, and language grounding community, encouraging more people to contribute, develop and perform exciting research based on our work.

- Online demos of XLang Agents
- Agent demo frontend and backend repos for HCI/VIS + NLP research and developers
- Framework package - toolkits, more sophisticated LangChain for LLMs + tool use/actions and LLM-powered agents
- Pretraining actionable and agentic large language models (more donations, OpenAI credits, and computing resource support welcome!)
- Crowdsourcing application-driven evaluation package for evaluating LLM-powered agents
- SOTA methods for LLMs + tool use/actions and LLM-powered agents
- More…

## Acknowledgements

Firstly, I would like to express my gratitude towards Google Research, Amazon AWS, and Salesforce Research. The gift funds and necessary computational resources generously provided by these awards have given us the capability and resources to implement this project. We also appreciate the invaluable advice we received throughout the process.

I also feel fortunate for the year I spent at UWNLP, which is one of the world's top institutions for NLP research. Being in Seattle, a city where so many engaged in NLP have visited or even resided for a while, was a great privilege. During my time there, I managed to catch the earliest shift towards LLM, which allowed me to experience firsthand the changes in NLP. I would like to extend my thanks to Noah Smith, Luke Zettlemoyer, and Mari Ostendorf. The idea of XLang as an executable language grounding came about from a suggestion Luke made during a meeting in his office.

Lastly, I would like to pay tribute to my late Ph.D. advisor, Dragomir Radev. Without him, it's very possible that none of what we are starting today would exist.
