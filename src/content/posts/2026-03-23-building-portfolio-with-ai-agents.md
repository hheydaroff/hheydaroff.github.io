---
title: "Building My Portfolio Page, Finally"
date: "2026-03-23"
author: "Hido"
tags: ["ai", "product"]
draft: true
---

## The Portfolio That Never Got Built

I've had a "build my portfolio" task in my backlog for years. Every few months I'd open it, look at it, close it.

The blockers were always the same: either I needed a developer, or I had to pick a theme and live with someone else's design choices.

That changed recently. Not because I learned to code. Because the tools changed.

## Before AI: Theme Jail

Squarespace, Webflow, Hugo themes — I tried them all. They looked fine until the moment I wanted something *slightly* different.

That "slightly different" was always a wall. Either hire someone, hack CSS you don't understand, or compromise.

For a portfolio showing years of Data & AI work I'd led and shaped — compromise felt wrong.

## The Tool That Worked (and the Two That Came Before It)

**Claude Code** — the mainstream option. Works well, built for everyone, which means it's built for no one in particular. Closed source, no way to customize it, burns tokens faster than I expected.

**OpenCode** — same mental model, open source. Felt like the right direction. It worked fine. But "fine" started feeling like a ceiling again.

**Pi Coding Agent** — this one was different. ~300-word system prompt. A minimal agentic loop. Nothing hidden, nothing bloated. The kind of tool where you can read the whole thing in an afternoon and understand exactly what it does. And then — extensions. Add what you need, remove what you don't. That's the unlock.

> The best tool isn't the most powerful one. It's the most hackable one.

## Cross-Agent Skills — Write Once, Use Everywhere

Every agent has its own format. Skills in Claude Code don't work in Pi. Prompts for one tool don't transfer to another.

I got tired of duplicating things, so I built a single shared skills repo — one source of truth, mounted into every agent environment.

The `claude-skills-bridge` extension in Pi handles the rest: it discovers Claude Code skills and loads them into Pi automatically.

Now when I add a new skill — web search, research, documentation — every tool I use gets it immediately.

> The skills repo is a force multiplier. The more agents you use, the more valuable it becomes.

## The Devcontainer Sandbox — Full Freedom, Zero Risk

AI agents can make irreversible mistakes. Delete the wrong file, overwrite config, leak a secret into a prompt. I've seen all of it.

My solution: every project gets a devcontainer. The agent has full root inside the container. Outside it — nothing.

What gets mounted in (read-only): pi config, skills, extensions. What stays out: secrets, credentials, anything that shouldn't move.

The `secret-guard` extension adds a second layer — it blocks any tool call trying to touch `.pi/.secrets/` and redacts known secret values from every tool result before the LLM ever sees them.

AWS credentials come in as environment variables at runtime. Never baked in.

One `postCreateCommand` and the entire environment is ready. Spin it up, give the agent full freedom, and close the laptop.

> I don't want to babysit every action the agent takes. The sandbox lets me not to.

## Building the Portfolio — What This Actually Enabled

Chose Astro + Svelte. Wouldn't have gone near this stack six months ago.

Described what I wanted. Agent built it. I reviewed. Iterated. Done.

No compromises on layout, no "this feature isn't supported by the theme", no waiting for a plugin update.

The years of Data & AI products I've built and led — they finally have a page that looks the way I imagined it.

## The Broader Pattern

Three layers: a hackable agent, a shared skills repo, a sandboxed environment. That's the whole stack.

It took time to assemble, but now any new project gets it in minutes — just spin up the container.

The portfolio was the goal. But the more interesting thing is what this setup makes possible next.

![Created_By_Human](/images/posts/created_by_humans.png)
