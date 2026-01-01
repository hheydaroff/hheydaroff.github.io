<script lang="ts">
  interface Props {
    text: string;
    tokenId: string;
    class?: string;
  }

  let { text, tokenId, class: className = 'mb-4' }: Props = $props();

  let displayText = $state(text);
  let isHovered = $state(false);
  let animationFrame: number | null = null;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const scrambleDuration = 600; // ms
  const iterations = 8;

  function scramble(from: string, to: string) {
    if (animationFrame) cancelAnimationFrame(animationFrame);

    const startTime = performance.now();
    const fromPadded = from.padEnd(Math.max(from.length, to.length));
    const toPadded = to.padEnd(Math.max(from.length, to.length));

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrambleDuration, 1);

      let result = '';
      const maxLen = Math.max(fromPadded.length, toPadded.length);

      for (let i = 0; i < maxLen; i++) {
        const charProgress = Math.max(0, (progress * maxLen - i) / iterations);

        if (charProgress >= 1) {
          result += toPadded[i] || '';
        } else if (charProgress > 0) {
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += fromPadded[i] || '';
        }
      }

      displayText = result.trim();

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        displayText = to;
      }
    }

    animationFrame = requestAnimationFrame(animate);
  }

  function handleMouseEnter() {
    isHovered = true;
    scramble(text, tokenId);
  }

  function handleMouseLeave() {
    isHovered = false;
    scramble(tokenId, text);
  }
</script>

<h1
  class="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight animate-fade-in-up cursor-pointer font-mono {className}"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  {displayText}
</h1>
