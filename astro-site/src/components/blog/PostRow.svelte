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
  });
</script>

<a
  href={`/posts/${slug}/`}
  class="group block py-2 sm:py-3"
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
>
  <div class="container mx-auto px-4 max-w-5xl">
    <div class="relative inline-flex items-center gap-4">
      <h3
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-foreground transition-all duration-300
               {isHovered ? 'blur-[2px] opacity-70' : ''}"
      >
        {title}
      </h3>

      <span
        class="text-xs sm:text-sm text-muted-foreground transition-all duration-300 whitespace-nowrap
               {isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}"
      >
        {formattedDate}
      </span>
    </div>
  </div>
</a>
