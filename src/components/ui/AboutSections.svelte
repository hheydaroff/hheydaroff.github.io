<script>
  let isHoveredRow = null;

  const experience = [
    { company: "smart Europe GmbH", role: "AI Product Manager", period: "2025 – Present", url: "https://www.smart.com" },
    { company: "smart Europe GmbH", role: "Data Product Manager", period: "2022 – 2024", url: "https://www.smart.com" },
    { company: "Mercedes-benz.io", role: "Product Owner, Data Platform", period: "2019 – 2022", url: "https://www.mercedes-benz.io" },
    { company: "Daimler Mobility AG", role: "Data Analyst", period: "2018 – 2019", url: "https://group.mercedes-benz.com/" },
  ];

  const expertise = [
    { label: "AI & GenAI Products", description: "Building AI assistants and GenAI solutions that drive measurable business impact." },
    { label: "Data Platforms", description: "Designing end-to-end data infrastructure from ingestion to self-service analytics." },
    { label: "Product Management", description: "Turning complex data challenges into clear roadmaps with cross-functional teams." },
    { label: "Strategy & Governance", description: "Defining data governance, KPIs, and aligning product vision with business goals." },
  ];

  const sideProjects = [
    { name: "heyhido.com", description: "Personal blog exploring AI, psychology, and technology", url: "https://heyhido.com" },
    { name: "common-agent-skills", description: "Unified agent skills for Pi, Claude Code, Codex", url: "https://github.com/hheydaroff/common-agent-skills" },
    { name: "pi-sandbox", description: "DevContainer sandbox with auto-synced configuration", url: "https://github.com/hheydaroff/pi-sandbox" },
    { name: "claude-sandbox-devcontainer", description: "Claude Code DevContainer sandbox environment", url: "https://github.com/hheydaroff/claude-sandbox-devcontainer" },
    { name: "RooFlow-Cookiecutter", description: "Template for applying RooFlow to Roocode easily", url: "https://github.com/hheydaroff/RooFlow-Cookiecutter" },
  ];
</script>

<!-- Experience -->
<section class="py-16 sm:py-20 animate-fade-in-up animate-delay-200">
  <div class="container mx-auto px-4 max-w-6xl">
    <div class="grid grid-cols-1 md:grid-cols-6 items-baseline mb-1">
      <span class="md:col-span-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Experience</span>
      <span class="hidden md:block md:col-start-6 text-[10px] uppercase tracking-widest text-muted-foreground text-right">Selected roles</span>
    </div>
    <div class="mb-10 border-t border-border"></div>
    <div class="grid grid-cols-1 md:grid-cols-6 gap-y-8 md:gap-0">
      <!-- Left summary -->
      <div class="md:col-span-2 md:pr-16 md:max-w-[280px]">
        <p class="text-sm leading-relaxed text-muted-foreground">
          I turn complex data challenges into strategic advantages. <strong class="font-semibold text-foreground">6+ years building AI & data products</strong> in automotive and tech, from GenAI assistants to enterprise data platforms.
        </p>
      </div>
      <!-- Right: roles table -->
      <div class="md:col-start-3 md:col-span-4 flex flex-col">
        {#each experience as item, i}
          <div
            class="grid grid-cols-1 md:grid-cols-4 py-3 transition-colors duration-200 rounded-sm items-baseline"
            class:hover-row={isHoveredRow === i}
            style={i < experience.length - 1 ? 'border-bottom: 1px solid var(--color-border)' : ''}
            on:mouseenter={() => isHoveredRow = i}
            on:mouseleave={() => isHoveredRow = null}
          >
            <span class="text-sm font-medium text-foreground flex items-center gap-1">
              {#if item.url}
                <a href={item.url} target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 hover:text-muted-foreground transition-colors duration-200">
                  {item.company}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                </a>
              {:else}
                {item.company}
              {/if}
            </span>
            <span class="md:col-span-2 text-sm text-muted-foreground">{item.role}</span>
            <span class="text-xs font-mono text-muted-foreground md:text-right">{item.period}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Expertise -->
<section class="py-16 sm:py-20 animate-fade-in-up animate-delay-300">
  <div class="container mx-auto px-4 max-w-6xl">
    <div class="grid grid-cols-1 md:grid-cols-6 items-baseline mb-1">
      <span class="md:col-span-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Expertise</span>
    </div>
    <div class="mb-10 border-t border-border"></div>
    <div class="grid grid-cols-1 md:grid-cols-6 gap-y-8 md:gap-0">
      <!-- Left tagline -->
      <div class="md:col-span-2 md:pr-8">
        <p class="text-2xl sm:text-3xl leading-relaxed text-muted-foreground">
          I blend product thinking, data engineering, and AI strategy
          <span class="bg-foreground/10 px-1 rounded-sm">to ship real impact.</span>
        </p>
      </div>
      <!-- Right: expertise cards -->
      <div class="md:col-start-3 md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {#each expertise as card}
          <div class="border border-border rounded-lg p-6 transition-colors duration-200 hover:bg-secondary/40">
            <span class="text-sm font-semibold text-foreground block mb-2">{card.label}</span>
            <p class="text-xs leading-relaxed text-muted-foreground">{card.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Side Projects -->
<section class="py-16 sm:py-20 animate-fade-in-up animate-delay-300">
  <div class="container mx-auto px-4 max-w-6xl">
    <div class="grid grid-cols-1 md:grid-cols-6 items-baseline mb-1">
      <span class="md:col-span-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Side Projects</span>
      <span class="hidden md:block md:col-start-6 text-[10px] uppercase tracking-widest text-muted-foreground text-right">Selected work</span>
    </div>
    <div class="mb-10 border-t border-border"></div>
    <div class="grid grid-cols-1 md:grid-cols-6 gap-y-8 md:gap-0">
      <!-- Left summary -->
      <div class="md:col-span-2 md:pr-16 md:max-w-[280px]">
        <p class="text-sm leading-relaxed text-muted-foreground">
          Side projects are my playground. I use them to explore new tools, experiment with ideas, and turn curiosity into something tangible.
        </p>
      </div>
      <!-- Right: projects table -->
      <div class="md:col-start-3 md:col-span-4 flex flex-col">
        {#each sideProjects as project, i}
          <div
            class="grid grid-cols-1 md:grid-cols-4 py-3 gap-y-1 md:gap-y-0 transition-colors duration-200 rounded-sm items-baseline"
            style={i < sideProjects.length - 1 ? 'border-bottom: 1px solid var(--color-border)' : ''}
          >
            <span class="text-sm font-medium text-foreground">{project.name}</span>
            <span class="md:col-span-2 text-sm text-muted-foreground">{project.description}</span>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 md:justify-end"
            >
              Visit
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .hover-row {
    background-color: var(--color-secondary);
    opacity: 0.8;
  }
</style>
