---
title: "Building My Portfolio Page, Finally"
date: "2026-03-24"
author: "Hido"
tags: ["ai", "product"]
draft: false
---

## The Portfolio That Never Got Built

My portfolio page sat in the [backlog for years](/posts/2024-02-19-never-ending-todo-list/). Every few months I'd open it, look at it, close it. A classic case of [delayed gratification](/posts/2021-03-30-delayed-gratification-is-it-even-worth-it/) — except I kept skipping the gratification part.

I did not know how to start. Every theme I looked into had issues. Every limitation sent me back to square one. Neither did i have that strong coding skills to create my own UI.

That changed recentl. Not because I learned to code, but because the tools changed.

## Before AI: Theme Jail

Wordpress, Wix, Hugo - I tried all of them. Each made sense until the moment I wanted something slightly different and could not build it using those no-code/low-code tools.

That "slightly something" part was my bottleneck that I couldn't get over. Hacking CSS from Stack Overflow, deploying code I didn't understand, switching themes hoping the next one fit - none of it felt right. It was compromise. And compromise felt wrong for work I'd spent years building.

## The Coding Assistant That Worked (and the Three That Came Before It)

**[Cline/Roo Code](/posts/2025-03-06-ai-web-development-walkyourcalories/)** - my first VSCode coding assistant. Roo improved on Cline. Then came Kilocode and a wave of forks that made me question the whole direction. It became too noisy. Pure [exploration mode](/posts/2021-05-12-exploration-vs-exploitation-which-way-to-go/) — trying everything, committing to nothing.

**Claude Code** — the option that looked like AI driven coding instead of AI assisted coding. It works well, it is built for an average tech savvy, which means it's built for no one in particular. Closed source, no way to customize it, burns tokens faster than I expected. It became expensive and bloated.

**OpenCode** — is an open source alternative to Claude Code, same mental model, and connect to any LLM - both cloud and local ones. Felt like the right direction. It worked fine. But then "fine" became the ceiling again.

**Pi Coding Agent** — this one was different. ~ 300-word system prompt. A minimal agentic loop. Nothing hidden, nothing bloated. The kind of tool where you can read the whole thing in an afternoon and understand exactly what it does. And the magic of it was the extensions. Pi is the foundation, extensions are the lego blocks you can build and add to customize to to be anything you want. That's the unlock. I built the first extension, zero shot, worked. Built the second, did exactly what I expected. Built the third, felt real control. Everything I want became possible.

> The best product isn't the most powerful one. It's the most hackable one.

## Cross-Agent Skills — Write Once, Use Everywhere

Every harness has its own architecture. Each one stores skills in a different directory. Skills in Claude Code don't show up in Pi. Prompts for one tool don't transfer to another. I got tired of duplicating things, so I built a single shared skills repo. One source of truth, mounted into every agent environment. It is not perfect, but it works well.

The [common-agent-skills](https://github.com/hheydaroff/common-agent-skills) tool is the place where alls kills land at. Then I deploy it to each harness's directoy via single script. One repo. One place to edit. One deploy command.

> The skills repo is a force multiplier. The more agents you use, the more valuable it becomes.

## The Devcontainer Sandbox — Full Freedom, Zero Risk

I still do not trust AI that much that I give full access to my local machine. Especially in an enterprise environment the risk is very high. I just read that [Litellm has been comrponised](https://github.com/BerriAI/litellm/issues/24512). A very sophisticated malicious code automatically executes a credential-stealing script every time the Python interpreter starts — no import litellm required. It is a supply chain compromise. Also [AI agents can make irreversible mistakes](/posts/2025-01-14-ai-intern-authority/). Delete the wrong file, overwrite config, leak a secret into a prompt. I have read many disaster cases online. 

My solution: [pi-sandbox](https://github.com/hheydaroff/pi-sandbox) where every project gets a devcontainer. The agent has full root inside the container. Outside it - nothing. What gets mounted in (`read-only`): pi/claude config, skills, extensions. What stays out: secrets, credentials, anything that shouldn't move.

The `secret-guard` extension adds a second layer — it blocks any tool call trying to touch `.pi/.secrets/` and redacts known secret values from every tool result before the LLM ever sees them.

AWS credentials come in as environment variables at runtime. Never baked in.

One `postCreateCommand` and the entire environment is ready. Spin it up, give the agent full freedom, close the container when done.

> I don't want to babysit every action the agent takes. The sandbox lets me not to.

## Building the Portfolio — What This Actually Enabled

My stack is Astro + Svelte. After doing a bit of research, validating against my requirements, and this combo made the most sense. Wouldn't have gone near this stack six months ago.

With the help of `CC` or `pi` it became possible. Described what I wanted. Agent built it. I reviewed. Security scanned. Git committed. Done.

My way of developing has no compromises on layout, no "this feature isn't supported by the theme", no waiting for a plugin update.

The years of Data & AI products I've built and led finally have a [page that looks the way I imagined it](https://heyhido.com/portfolio).

## The Broader Pattern

I can put my [AI driven development](/posts/2026-01-03-On-Building-AI-Powered-Products/) in three layers: a hackable agent, a shared skills repo, a sandboxed environment. That's the whole stack.

It took time to assemble, but now any new project get its way to realization in a short time. Just spin up the container and let it ride.

The portfolio was the goal. But the more interesting thing is what this setup makes possible next.

![Created_By_Human](/images/posts/created_by_humans.png)
