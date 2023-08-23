---
title: 'Lemur: The State-of-the-art Open Pretrained Large Language Models Balancing Text and Code Capabilities'
shortTitle: Lemur Intro
slug: openlemur
date: 24 August 2023
author: XLANG Lab
coverImage: /blog/lemur/lemur-twitter.png
previewContent: In this work, we introduce Lemur and Lemur-chat, the state-of-the-art open pretrained and supervised fine-tuned large language models balancing text and code intelligence.
onlineImage: https://i.imgur.com/ItEokRk.png
twitterLink: https://twitter.com/XLangAI/status/1689723514134446081
githubLink: https://github.com/OpenLemur/Lemur
---

<br>

## Introduction

Open large language models (LLMs) have traditionally been tailored for either textual or code-related tasks, with limited ability to effectively balance both. However, many complex language applications, particularly language model agents, demand systems with a multifaceted skill set encompassing understanding, reasoning, planning, coding, and context grounding. 

In this work, we introduce Lemur and Lemur-chat, the state-of-the-art open pretrained and supervised fine-tuned large language models balancing text and code intelligence.

<br>

## Pretraining and Supervised Fine Tuning

We pretrain Llama 2 on ~100B code-intensive data, followed by supervised fine tuning on ~300K public instructional and dialog data to enhance coding and grounding abilities while maintaining competitive textual reasoning and knowledge performance.

<figure style="display: flex; justify-content: center;">  
  <img src="/blog/lemur/train_procedure.png" width="70%" height="70%">  
</figure>  

<br><br>

## Evaluation

Lemur outperforms other open source language models on coding benchmarks, yet remains competitive textual reasoning and knowledge performance.


<figure style="text-align: center;">  
  <img src="/blog/lemur/base-model.png" height=20>  
  <figcaption style="text-align: center;">Lemur v.s. Other open source pretrained LLMs</figcaption>  
</figure>  

<br>
<br>

Lemur-chat significantly outperforms other open-source supervised fine-tuned models across various dimensions. 


<figure style="text-align: center;">  
  <img src="/blog/lemur/chat-model.png" height=20>  
  <figcaption style="text-align: center;">Lemur v.s. Other open source supervised fine-tuned LLMs and ChatGPT</figcaption>  
</figure>  

<br>

The Lemur project is a collaborative effort between XLang Lab and Salesforce Research. We would like to thank Salesforce Research, Google Research, and Amazon AWS for their gift support to this open-source effort! The open-source model still has a long way to go compared to closed-source models. However, we look forward to Lemur's work becoming a valuable effort in establishing a more powerful and balanced foundation for the open-source model and driving research on agent models.

<br>

## More details and models coming soon. Enjoy!

<br>
