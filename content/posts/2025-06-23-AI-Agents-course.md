+++
author = "Hido"
title = "Building and Using AI Agents"
date = "2025-06-23"
tags = [
    "ai"
]
draft = false
+++


## The Future of AI Development

The future of AI development remains uncertain, with numerous possible directions ahead. One thing is clear though: generative AI with LLMs represents a massive wave that will disrupt the entire world. I'm not talking merely about economic impact or automation. I'm referring to the fundamental ways we humans function and interact with our surroundings—our means of engaging with gadgets, gathering information, and solving complex problems.

## My Learning Journey

For the past few months, I've been immersing myself in learning about AI Agents—not just understanding what they are, but also how to build and use them effectively. 

In the simplest terms, I'd describe AI Agents as a group of AI beings that can respond to complex questions or issues by orchestrating their own workflow. They manage the understanding of input, find information on how to solve problems, execute tasks, analyze results, and deliver responses. This represents a significant shift from prompt-based interactions to autonomous, goal-oriented systems.

## The Hugging Face Agents Course

The latest training I undertook was the AI Agents course by Hugging Face. While somewhat generic and relatively shallow, it served as a valuable reinforcement of concepts I'd learned over time. 

This was my first proper experience using HF's own AI Agent Framework, [`smolagent`](https://huggingface.co/docs/smolagents/v1.17.0/en/index), alongside alternative frameworks such as [`llamaindex`](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/) and [`langgraph`](https://langchain-ai.github.io/langgraph/concepts/agentic_concepts/).

## Building Powerful Tools

What makes AI Agents particularly powerful is their capacity to leverage specialized tools. My certification project demonstrated this potential by integrating multiple capabilities:
- Web searching (via Tavily)
- Content crawling (through crawl4ai) 
- Audio processing (with Whisper)
- And several other specialized functions

All these tools were orchestrated by Claude 3.5 Sonnet running on AWS Bedrock. This constellation of skills transformed a language model into a versatile digital assistant capable of navigating both textual and non-textual domains, extending well beyond my knowledge base or instructions.

## My Certification Project

For the certification project, I used [ag2](https://docs.ag2.ai/latest/docs/quick-start/) (a spin-off of Microsoft's autogen), having already built several multi-agent setups using this framework.

In practice, my agent demonstrated impressive capabilities when handling information retrieval and analysis tasks. For instance, when asked "How many studio albums were published by Mercedes Sosa between 2000 and 2009?", the agent executed a sophisticated workflow:

1. First, it conducted a web search for "Mercedes Sosa studio albums 2000-2009 Wikipedia"
2. After analyzing initial search results that mentioned albums like "Cantora" (2009)
3. It then intelligently visited the Wikipedia page directly to verify the information
4. Finally, it compiled the accurate answer: three studio albums during that period (Corazón Libre in 2005, and Cantora 1 & 2 in 2009)

What made this particularly impressive was that the agent automatically determined which tools to use at each step, managed the information gathering process, and produced a precise answer without human intervention. This autonomous chain of reasoning—from search to verification to conclusion—exemplifies the power of AI agents to handle multi-step information tasks.

## The Development Process

Perhaps most illuminating was the development process itself. Despite my limited Python expertise, I successfully created a functional agent system by directing my AI coding assistant, [RooCode]({<ref "/posts/2025-04-06-AI-Back-To-Community.md">}}). We had quite an interesting journey together along the way.

## Key Insights and Limitations

Yet important caveats emerged from this experience:

- **Automation boundaries** remain significant—many scenarios still require human judgment
- **Technical complexity** increases exponentially with system sophistication
- **Context limitations** continue to constrain autonomous AI development

## Implications for Our Professional Future

What does this mean for our professional futures? While AI agents will undoubtedly automate routine cognitive tasks, their limitations underscore the evolving rather than diminishing importance of human expertise. The most valuable skill may not be coding itself, but understanding how to effectively direct and collaborate with increasingly capable digital partners.

## Looking Ahead

As we stand at this technological inflection point, one thing becomes absolutely clear: familiarity with AI orchestration is rapidly becoming as essential as computer literacy was a generation ago. The question isn't whether AI will transform our works and lives, but how effectively we'll adapt to steer it.