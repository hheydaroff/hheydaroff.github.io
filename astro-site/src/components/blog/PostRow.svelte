<script lang="ts">
  interface Props {
    title: string;
    date: Date;
    slug: string;
  }

  let { title, date, slug }: Props = $props();

  let isHovered = $state(false);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
</script>

<a
  href={`/posts/${slug}/`}
  class="group block border-t border-border py-6 transition-colors duration-200 hover:bg-secondary/30"
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
>
  <div class="flex items-center justify-between gap-4 container mx-auto px-4 max-w-3xl">
    <h3 class="text-lg sm:text-xl font-bold uppercase tracking-wide text-foreground group-hover:text-foreground/80 transition-colors duration-200">
      {title}
    </h3>

    <div class="flex items-center gap-4 shrink-0">
      <span
        class="text-sm text-muted-foreground transition-all duration-300
               {isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}"
      >
        {formattedDate}
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-muted-foreground group-hover:text-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        <path d="M7 7h10v10"></path>
        <path d="M7 17 17 7"></path>
      </svg>
    </div>
  </div>
</a>
