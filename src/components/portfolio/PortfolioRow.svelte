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
    image?: string;
  }

  let { title, description, tags, details, image }: Props = $props();

  let isHovered = $state(false);
  let isExpanded = $state(false);
  let mouseX = $state(0);
  let mouseY = $state(0);

  function handleMouseMove(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
</script>

<div
  class="group relative transition-colors duration-300 hover:bg-secondary/40"
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
  onmousemove={handleMouseMove}
>
  <!-- Main Row -->
  <button
    class="w-full text-left py-6 sm:py-8 cursor-pointer"
    onclick={() => isExpanded = !isExpanded}
    aria-expanded={isExpanded}
  >
    <div class="container mx-auto px-4 max-w-5xl">
      <h3
        class="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground transition-all duration-300
               {isHovered ? 'blur-[2px] opacity-70' : ''}"
      >
        {title}
      </h3>
    </div>
  </button>

  <!-- Expanded Detail Panel -->
  <div
    class="overflow-hidden transition-all duration-500 ease-out
           {isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}"
  >
    <div class="container mx-auto px-4 max-w-5xl pb-8 sm:pb-10">
      <!-- Description -->
      <div class="mb-6">
        <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

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

  <!-- Hover Preview Image -->
  {#if image && isHovered && !isExpanded}
    <div
      class="pointer-events-none absolute z-50 w-72 sm:w-96 rounded-lg overflow-hidden shadow-2xl border border-border/50 transition-opacity duration-200"
      style="left: {mouseX + 20}px; top: {mouseY - 100}px;"
    >
      <img src={image} alt="{title} preview" class="w-full h-auto block" />
    </div>
  {/if}
</div>
