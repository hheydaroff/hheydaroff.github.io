<script lang="ts">
  import { onMount } from 'svelte';

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
</script>

<header class="border-b border-border">
  <div class="container mx-auto px-4 max-w-3xl">
    <nav class="flex items-center justify-between h-16">
      <!-- Logo / Site title -->
      <a href="/" class="text-xl font-semibold text-foreground hover:text-primary transition-colors">
        Hido
      </a>

      <!-- Navigation links -->
      <div class="flex items-center gap-6">
        <ul class="hidden sm:flex items-center gap-4">
          {#each navLinks as { href, label }}
            <li>
              <a
                {href}
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            </li>
          {/each}
        </ul>

        <!-- Dark mode toggle -->
        <button
          onclick={toggleTheme}
          class="p-2 rounded-md hover:bg-accent transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {#if isDark}
            <!-- Sun icon -->
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
            <!-- Moon icon -->
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
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          {/if}
        </button>

        <!-- Mobile menu button -->
        <button
          class="sm:hidden p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Open menu"
        >
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
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  </div>
</header>
