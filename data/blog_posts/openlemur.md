---
title: 'Introducing Lemur: Open Foundation Models for Language Agents'
shortTitle: Lemur Intro
slug: openlemur
date: 08 October 2023
author: XLANG Lab
coverImage: /blog/lemur/lemur-twitter.png
previewContent: In this work, we introduce Lemur and Lemur-chat, the state-of-the-art open pretrained and supervised fine-tuned large language models balancing text and code intelligence.
onlineImage: https://i.imgur.com/ItEokRk.png
twitterLink: https://twitter.com/XLangAI/status/1694376463536128033
githubLink: https://github.com/OpenLemur/Lemur
---

<br>

## Introduction

We introduce Lemur and Lemur-Chat, openly accessible language models optimized for both natural language and coding capabilities to serve as the backbone of versatile language agents. 
The evolution from language chat models to functional language agents demands that models not only master human interaction, reasoning, and planning but also ensure grounding in the relevant environments.
This calls for a harmonious blend of language and coding capabilities in the models.
Lemur and Lemur-Chat are proposed to address this necessity, demonstrating balanced proficiencies in both domains, unlike existing open-source models that tend to specialize in either.
Through meticulous pre-training using a code-intensive corpus and instruction fine-tuning on text and code data, our models achieve state-of-the-art averaged performance across diverse text and coding benchmarks among open-source models.
Comprehensive experiments demonstrate Lemur's superiority over existing open-source models and its proficiency across various agent tasks involving human communication, tool usage, and interaction under fully- and partially- observable environments.
The harmonization between natural and programming languages enables Lemur-Chat to significantly narrow the gap with proprietary models on agent abilities, providing key insights into developing advanced open-source agents adept at reasoning, planning, and operating seamlessly across environments. 

<figure style="text-align: center;">  
  <img src="/blog/lemur/overall-performance.png" height=20>  
  <figcaption style="text-align: center;">Comparison of the foundational and agent capabilities between Lemur-Chat and other open-source pre-trained LLMs.</figcaption>  
</figure>  

<br>

## Pretraining and Supervised Fine Tuning

We continually pre-train Llama-2-70B model on 90B code-intensive data and fine-tune it with 300K examples of instructions to enable the model to harmonize natural language and coding abilities.

<figure style="display: flex; justify-content: center;">  
  <img src="/blog/lemur/pipeline.png" width="70%" height="70%">  
</figure>  

<br><br>

<br>

The Lemur project is a open collaborative research effort between [XLang Lab](https://xlang.ai) and [Salesforce Research](https://www.salesforceairesearch.com/). We would like to thank Salesforce Research, Google Research, and Amazon AWS for their gift support to this open-source effort! The open-source model still has a long way to go compared to closed-source models. However, we look forward to Lemur's work becoming a valuable effort in establishing a more powerful and balanced foundation for the open-source model and driving research on agent models.
