---
title: "Developing 'Walk Your Calories' with AI-Assisted Coding and Hype Behind it"
date: "2025-03-06"
author: "Hido"
tags: ["ai", "product"]
draft: false
---

Few days ago, I embarked on an exciting journey to develop my first web application from scratch, leveraging the power of AI coding assistants. The experience was enlightening, and I'd like to share my insights on the role of AI in software development, particularly for those considering similar projects.

## The Idea: Walk Your Calories

My project stemmed from a common dilemma: the guilt that follows indulging in a slice (or three) of Bufalina pizza (of [L'Artista in Stuttgart](https://www.lartista-pizza.de)). I often found myself wondering, "How much walking would it take to burn off these calories?" This curiosity led me to create [walkyourcalories.com](https://walkyourcalories.com), an online calculator that determines how many steps you need to take to burn off a specific number of calories, based on your weight and walking pace.

## The Tech Stack and AI Assistant

For this project, I chose a Python Flask backend with HTML and CSS for the frontend. To assist with the coding process, I used [Roo-Code](https://github.com/RooVetGit/Roo-Code), an open-source fork of [Cline](https://github.com/cline/cline) that allows integration with various LLMs. I opted for Claude Sonnet 3.5 as my AI model.

## The Reality of AI-Assisted Development

While AI coding assistants are powerful tools, my experience highlighted that they're not yet a complete replacement for traditional software development skills. Here's why:

1. **UI Design Limitations**: AI tends to generate typical, generic user interfaces. To create a unique and appealing design, I still needed to research layouts, components, and UI elements independently.

2. **Deployment Challenges**: The AI assistant could generate code that ran on `localhost:5000`, but deploying the application to the internet required additional knowledge. Understanding hosting, domain configuration, and server setup was crucial.

3. **Security Considerations**: Implementing HTTPS for secure connections involved learning about nginx, certbot, and Let's Encrypt – topics that required research beyond what the AI could provide.

## The Learning Curve

Despite using an AI assistant, I faced several challenges:

1. Customizing the UI beyond generic templates
2. Configuring a server to host the application (I used Hetzner with Docker)
3. Setting up a domain and ensuring secure HTTPS connections

These hurdles underscored the importance of understanding fundamental web development concepts, even when using AI tools.

## The Future of AI in Development

While AI coding assistants are incredibly helpful, they're not yet a complete solution for product development and launch. Unless one opts for "managed service" AI product development platforms (like [Lovable](https://lovable.dev/?gad_source=1), [Vercel v0](https://v0.dev), or [Bolt](https://bolt.new)), a solid understanding of software development principles remains essential.

## Conclusion

Creating [walkyourcalories.com](https://walkyourcalories.com) was my first experience developing a web application from scratch and bringing it to life. The process taught me that while AI can significantly accelerate development, it doesn't replace the need for fundamental knowledge in web technologies, deployment strategies, and security practices.

As I look forward to working on more ideas, I'm excited about the potential of AI-assisted development. However, I'm also clearly aware of the importance of continually expanding technical skills to make the most of these powerful tools as assistants, rather than fully independent agents.