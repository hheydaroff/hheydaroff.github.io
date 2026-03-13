<script lang="ts">
  interface ProjectDetail {
    problem: string;
    flow: string[];
    impact: string;
    stack: string[];
  }

  interface Props {
    title: string;
    description: string;
    tags: string[];
    details: ProjectDetail;
  }

  let { title, description, tags, details }: Props = $props();

  let isHovered = $state(false);
  let isExpanded = $state(false);
</script>

<div
  class="group border-t border-border transition-colors duration-300 hover:bg-secondary/40"
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
>
  <!-- Main Row -->
  <button
    class="w-full text-left py-6 sm:py-8 cursor-pointer"
    onclick={() => isExpanded = !isExpanded}
    aria-expanded={isExpanded}
  >
    <div class="container mx-auto px-4 max-w-5xl">
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-start">
        <!-- Project Name -->
        <div class="sm:col-span-4">
          <h3
            class="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground transition-all duration-300
                   {isHovered ? 'blur-[2px] opacity-70' : ''}"
          >
            {title}
          </h3>
        </div>

        <!-- Description -->
        <div class="sm:col-span-5">
          <p
            class="text-sm sm:text-base text-muted-foreground transition-all duration-300
                   {isHovered ? 'opacity-100 translate-x-0' : 'sm:opacity-0 sm:-translate-x-4'}"
          >
            {description}
          </p>
        </div>

        <!-- Tags + Expand indicator -->
        <div class="sm:col-span-3 flex items-start justify-between gap-2">
          <div class="flex flex-wrap gap-1.5">
            {#each tags as tag}
              <span class="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {tag}
              </span>
              {#if tags.indexOf(tag) < tags.length - 1}
                <span class="text-[10px] sm:text-xs text-border">·</span>
              {/if}
            {/each}
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="shrink-0 mt-1 text-muted-foreground transition-transform duration-300
                   {isExpanded ? 'rotate-180' : ''}"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>
    </div>
  </button>

  <!-- Expanded Detail Panel -->
  <div
    class="overflow-hidden transition-all duration-500 ease-out
           {isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}"
  >
    <div class="container mx-auto px-4 max-w-5xl pb-8 sm:pb-10">
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-6">
        <!-- Left: Problem + Impact -->
        <div class="sm:col-span-4 space-y-6">
          <!-- Problem -->
          <div>
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Problem</span>
            <p class="mt-2 text-sm leading-relaxed text-foreground/80">
              {details.problem}
            </p>
          </div>

          <!-- Impact -->
          <div class="rounded-lg bg-secondary/60 dark:bg-secondary/40 px-4 py-3">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Impact</span>
            <p class="mt-1.5 text-sm font-medium text-foreground">
              {details.impact}
            </p>
          </div>
        </div>

        <!-- Right: Flow + Stack -->
        <div class="sm:col-span-8 space-y-6">
          <!-- Architecture Flow -->
          <div>
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">How it works</span>
            <div class="mt-3 flex flex-wrap items-center gap-y-2">
              {#each details.flow as step, i}
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-2.5 rounded-full border border-border bg-background px-3 py-1.5">
                    <span class="text-[10px] font-bold text-muted-foreground tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span class="text-xs sm:text-sm text-foreground">{step}</span>
                  </div>
                  {#if i < details.flow.length - 1}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-muted-foreground/50 shrink-0 mx-0.5"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  {/if}
                </div>
              {/each}
            </div>
          </div>

          <!-- Tech Stack -->
          <div>
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Tech Stack</span>
            <div class="mt-2 flex flex-wrap gap-1.5">
              {#each details.stack as tech}
                <span class="text-xs font-mono px-2.5 py-1 rounded-md bg-foreground/5 dark:bg-foreground/10 text-foreground/70">
                  {tech}
                </span>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
