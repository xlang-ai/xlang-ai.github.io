---
title: 'Introducing Lemur: Open Foundation Models for Language Agents'
shortTitle: Lemur Intro
slug: openlemur
date: 08 October 2023
author: XLANG Lab
coverImage: /blog/lemur/overview.jpeg
previewContent: We are excited to announce Lemur, an openly accessible language model optimized for both natural language and coding capabilities to serve as the backbone of versatile language agents.
onlineImage: https://i.imgur.com/m4aI7hW.jpg
twitterLink: https://twitter.com/taoyds/status/1712547761252610076
githubLink: https://github.com/OpenLemur/Lemur
---

TLDR: 🎉 Introducing Lemur-70B & Lemur-70B-Chat: 🚀Open & SOTA Foundation Models for Language Agents! The closest open model to GPT-3.5 on 🤖15 agent tasks🤖!

📄Paper: [http://arxiv.org/abs/2310.06830](http://arxiv.org/abs/2310.06830)

🤗Model: [http://huggingface.co/OpenLemur](http://huggingface.co/OpenLemur)

👩‍💻Code: [https://github.com/OpenLemur/Lemur](https://github.com/OpenLemur/Lemur)

<hr class="solid">

We are excited to announce Lemur, an openly accessible language model optimized for both natural language and coding capabilities to serve as the backbone of versatile language agents. Our preprint [Lemur: Harmonizing Natural Language and Code for Language Agents](https://arxiv.org/abs/2310.06830) shares details on this new model.

As language models continue to evolve from conversational chatbots to functional agents that can act in the real world, they need both strong language understanding and the ability to execute actions. Lemur balances natural language and coding skills to enable agents to follow instructions, reason about tasks, and take grounded actions.

Please find more detailed information here:

- Paper: [Lemur: Harmonizing Natural Language and Code for Language Agents](https://arxiv.org/abs/2310.06830)
- Code: [OpenLemur Repository ](https://github.com/OpenLemur/Lemur)
- Model: [HuggingFace Hub](https://huggingface.co/OpenLemur)

## Why Lemur?
Most existing open source models specialize in either natural language or code. Lemur combines both strengths by:

- Pretraining on a 90B token corpus with 10:1 ratio of code to text
- Instruction tuning on 300K examples covering both text and code

This two-stage training produces state-of-the-art performance averaged across diverse language and coding benchmarks, surpassing other available open source models and narrowing the gap between open-source and commercial models on agent abilities.

<figure style="text-align: center;">  
  <img src="/blog/lemur/pipeline.png" height=20>  
  <figcaption style="text-align: center;">Training Procedure of Lemur Models</figcaption>  
</figure>  

## Testing Lemur's Abilities
We evaluated Lemur across:
- 8 language and code datasets like MMLU, BBH, GSM8K, HumanEval, and Spider to validate balanced capabilities
- 13 interactive agent datasets to test skills like tool usage, adapting to feedback from environment or human, and exploring partially observable digital or physical environments.

<figure style="text-align: center;">  
  <img src="/blog/lemur/agent-skills.png" height=20>  
  <figcaption style="text-align: center;"></figcaption>  
</figure>  


Lemur significantly outperformed other models on agent benchmarks, showcasing its versatility and potential as a foundation for capable agents.

<figure style="text-align: center;">  
  <img src="/blog/lemur/overall-performance.png" height=20>  
  <figcaption style="text-align: center;">Comparison of the foundational and agent capabilities between Lemur and other models.</figcaption>  
</figure>  

<br>

## Moving Research Forward
By open sourcing Lemur and our training corpora, we hope to empower more research into developing capable and controllable agents that can understand instructions and act appropriately. Testing Lemur across diverse agent scenarios gives insights into critical areas like:

- Harmonizing natural language and programming abilities
- Tool usage as an augmentation mechanism
- Adapting behavior based on environment and human feedback
- Reasoning and planning under partial observability in digital and physical environments

There is still much work to be done, but Lemur represents an important step towards open source models that can power the next generation of language agents. We look forward to seeing what the community builds!

You can find more details in our preprint: [Lemur: Harmonizing Natural Language and Code for Language Agents](https://arxiv.org/abs/2310.06830)

## Acknowledgements

The Lemur project is a open collaborative research effort between [XLang Lab](https://xlang.ai) and [Salesforce Research](https://www.salesforceairesearch.com/). We would like to thank Salesforce Research, Google Research, and Amazon AWS for their gift support to this open-source effort!
