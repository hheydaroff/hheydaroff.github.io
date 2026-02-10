---
title: "Turning Information into Knowledge"
date: "2026-02-10"
author: "Hido"
tags: ["ai", "productivity"]
draft: false
---

Your brain has about a hundred billion neurons. They fire electrical impulses and chemical signals to each other along synapses. Neurons that talk often build stronger bonds - more solid [patterns of thought](/posts/2021-01-18-what-does-our-brain-tell-us-about-habits/). Each new piece of information creates new connections. **The more you revisit it, the longer it stays.**

When you encounter something new, the **hippocampus** acts as a staging area. Then the Medial Prefrontal Cortex, the brain's master categorizer, analyzes the incoming information and figures out how it fits into what you already know. To make these categories permanent, your brain moves them from the hippocampus to the **neocortex**. These interconnected thoughts expand our [cognitive plasticity](/posts/2024-12-25-writing-is-challenging/).

Our brains are optimized for categorizing. Better than any tool we have today. But I think I found a setup that comes close - a digital second brain. A personalized knowledge management system that captures, organizes, and retrieves information. **An extended memory.** The idea: receive information, process it, store it, retrieve it when you need it.

## The Chaos Before

I had a chaotic information ecosystem. Bookmarks, Pocket, RSS feeds, Notion, OneNote, Apple Notes, Evernote, Asana, browser extensions - all trying to organize my [notes](/posts/2024-03-03-never-ending-noteapp-txt/), todos, reflections. I wanted an organized collection of my thoughts, ideas, and inputs. **The disorder [kept winning](/posts/2024-03-25-i-am-forgetful/).**

Then I adopted [Claude Code](https://claude.ai/code) as my daily AI assistant for coding, research, and documentation. Moving from clickable tools to a terminal-based app took some adaptation, but now I use it all the time. Then I came across a [LinkedIn post](https://www.linkedin.com/posts/stephango_the-future-is-plain-text-files-its-just-activity-7413229140491010048-tblz/) from Steph, the CEO of Obsidian: *"The future is plain text files. It is just not yet evenly distributed."*

Using [LLMs daily](/posts/2024-12-22-my-wild-ride-with-ai-in-2024/), I realized I could change how I collect information. Drilling through that thought, I ended up building my second brain, **CORTEX**.

## What Is CORTEX

CORTEX stands for **Cognitive Organization & Reflection Through EXtended Intelligence**. I have built it based on three components:

- **[Obsidian](https://obsidian.md)** - a local-first personal note-taking and knowledge base app. It operates on a folder called a "vault." Everything in the vault is text. Cool features: [wikilinks](https://help.obsidian.md/links), [graph view](https://help.obsidian.md/plugins/graph), [Canvas](https://help.obsidian.md/plugins/canvas), and [community plugins](https://help.obsidian.md/community-plugins).
- **[Claude Code](https://claude.ai/code)** - my AI tool that sits on my local system and acts on my vault. Instead of Claude Code, you could use [Claude Cowork](https://claude.com/product/cowork), [OpenAI Codex](https://openai.com/codex/), or [OpenCode](https://opencode.ai). It adds intelligence to the knowledge base.
- **Git** - my choice for syncing notes cross-device and keeping version history. I regularly copy the vault to cloud storage and let git handle the versioning. One can also use the official [Obsidian Sync](https://obsidian.md/sync) feature.

## Capture Fast, Process Later

I follow the [Zettelkasten](https://zettelkasten.de/introduction/) knowledge management method. It builds a web of interconnected ideas through hypertext connectivity between notes. **The core principle: separate capturing from organizing.** These require [different mental states](/posts/2021-07-04-prosoche-reflecting-on-attention/) (creative vs. analytical).

**First**, capture information quick and dirty into fleeting notes. Quick reminders or thoughts, captured in the moment, discarded after processing. No pressure to categorize or format while inspiration strikes. I also use [Obsidian Web Clipper](https://obsidian.md/clipper) to grab content from the web and save it as a temporary note.

**Later**, process the fleeting notes and turn them into permanent notes. During processing, you build wikilinks to other permanent notes. **Wikilinks (`[[]]`) act like synapses**, which is building connections between ideas.

Traditional note-taking creates "write-only memory". Notes are captured but never resurfaced or connected. Zettelkasten promises atomic, linked notes but demands significant manual effort. **This is where [AI completes the picture](/posts/2025-01-04-ai-predictions-2025/).** Using Claude Code, I run batch processing of my unprocessed fleeting notes. The AI routes processed notes into sub-folders: reflections, knowledge, private, work. It also maintains generic notes like `tasks.md`, `OKRs.md`, `MY-PROFILE.md`, `MY-INTERESTS.md`. All my input gets processed and placed where it belongs.

## Synthesize and Reflect the Wisdom

AI assistants are powerful but lack persistent context about *you*, your knowledge, your workflow. CORTEX bridges this gap. Using [agent skills](https://agentskills.io/home), AI understands your vault, your interests, and your workflow patterns. It synthesizes and consolidates information, then reflects it back to you.

**Skills are markdown files with instructions that Claude follows.** No coding required, just prompt engineering.

My core skills:

- `/braindump` - Route captured temporary notes to permanent homes
- `/daily-brief` - Morning intelligence briefing: tasks, tickets, news, reflections
- `/weekly-reflection` - Analyze daily [reflections](/posts/2024-12-30-reflection-2024-year-end/), create a summary, plan the next week
- `/monthly-overview` - Summarize weekly reflections, track habits, monitor [OKR](/posts/2021-02-04-bullet-proof-productivity-with-okrs/) progress
- `/knowledge-consolidation` - Synthesize insights into frameworks, patterns, and mental tools
- `/quiz` - [Active recall](/posts/2024-12-25-prompt-feynman-learning/) reinforcement through random knowledge quizzes

There are more specialized skills for fetching web resources, re-organizing notes, and other tasks. These main skills make my note-taking seamless. It is not perfect, but it does the job and keeps me learning.

**A typical day:**

- **8:30 AM** - Arrive at the office, run `/daily-brief` → see P1 tasks, Jira updates, AI news, a quiz on RAG systems
- **Throughout the day** - Capture meeting notes, article ideas, web clippings, random observations, to-dos
- **5:00 PM** - Run `/braindump` → fleeting notes routed to permanent locations, tasks extracted, reflections generated
- **Sunday evening** - Run `/weekly-reflection` → analyze patterns, celebrate wins, plan next week's priorities
- **Monthly** - Run `/monthly-overview` and `/knowledge-consolidation` → summarize the month, build frameworks, identify emerging patterns

## Expand the Plasticity

One of my hacks for [adopting new routines](/posts/2024-02-11-daily-doses-of-deeds/): **integrate it into my daily workflow and keep it simple.** There is a small upfront setup, but daily usage couldn't be easier. I write my thoughts as rough notes. Once a day I run the AI skills. That's it.

CORTEX is more than a note-taking framework. **It is a workflow layer that orchestrates existing tools to turn information into knowledge.** It knows me and my interests through profile and interests notes. I can add any skill and chain multiple skills into workflows.

**Most importantly: zero lock-in.** If I leave Obsidian, I take my folder to the next tool. No proprietary format. If I switch AI tools, I just point the new one at my vault. No AI dependency. If I want to do everything manually, I can. **No dependency on anything.**

Here is the graph view of my notes, my visual web of interconnected thoughts.
![OBSIDIAN_GRAPH_VIEW](/images/posts/OBSIDIAN_GRAPH_VIEW.png)
![Created_By_Human](/images/posts/created_by_humans.png)