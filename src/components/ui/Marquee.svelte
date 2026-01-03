<script lang="ts">
  interface Props {
    rows?: string[];
  }

  let { rows = [
    "ARCHITECTING THE FUTURE OF INTELLIGENCE",
    "TRANSFORMING DATA INTO STRATEGIC ADVANTAGES",
    "LET'S BUILD THE FUTURE TOGETHER"
  ] }: Props = $props();
</script>

<div class="w-full bg-foreground text-background overflow-hidden select-none">
  {#each rows as text, i}
    <div class="flex whitespace-nowrap py-4 border-t border-background/20 {i === rows.length - 1 ? 'border-b' : ''}">
      <div
        class="flex animate-marquee {i % 2 === 1 ? 'animate-marquee-reverse' : ''}"
        style="animation-duration: {120 + i * 20}s;"
      >
        {#each Array(12) as _}
          <span class="mx-6 sm:mx-10 text-sm sm:text-base font-bold uppercase tracking-widest">{text}</span>
        {/each}
      </div>
      <div
        class="flex animate-marquee {i % 2 === 1 ? 'animate-marquee-reverse' : ''}"
        style="animation-duration: {120 + i * 20}s;"
        aria-hidden="true"
      >
        {#each Array(12) as _}
          <span class="mx-6 sm:mx-10 text-sm sm:text-base font-bold uppercase tracking-widest">{text}</span>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .animate-marquee {
    animation: marquee linear infinite;
  }

  .animate-marquee-reverse {
    animation-direction: reverse;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
