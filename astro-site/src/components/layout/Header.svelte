<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    currentPath?: string;
  }

  let { currentPath = '/' }: Props = $props();

  let isDark = $state(false);

  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Posts' },
    { href: '/tags', label: 'Tags' },
    { href: '/about', label: 'About' },
    { href: '/now', label: 'Now' },
  ];

  function isActive(href: string, current: string): boolean {
    if (href === '/') {
      return current === '/';
    }
    return current.startsWith(href);
  }
</script>

<header class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto max-w-[calc(100%-2rem)]">
  <nav
    class="flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-full
           bg-white/80 dark:bg-neutral-900/80
           backdrop-blur-md
           border border-border/50
           shadow-lg shadow-black/5 dark:shadow-black/20"
  >
    {#each navLinks as { href, label }}
      <a
        {href}
        class="relative px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap
               {isActive(href, currentPath)
                 ? 'bg-foreground text-background'
                 : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'}"
      >
        {label}
      </a>
    {/each}

    <div class="w-px h-5 sm:h-6 bg-border mx-0.5 sm:mx-1"></div>

    <button
      onclick={toggleTheme}
      class="p-1.5 sm:p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {#if isDark}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      {/if}
    </button>
  </nav>
</header>

<div class="h-20"></div>
