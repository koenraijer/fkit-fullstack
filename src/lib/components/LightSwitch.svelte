<script lang="ts">
    import {Sun, Moon} from "lucide-svelte";
   
    import { toggleMode } from "mode-watcher";

  </script>
   
  <button on:click={toggleMode} class="flex justify-between w-full">
    <span>Theme</span>
    <Sun
      class="ml-2 text-muted-foreground h-4 w-4 transition-all dark:inline hidden"
    />
    <Moon
      class="dark:hidden inline ml-2 text-muted-foreground h-4 w-4"
    />
    <span class="sr-only">Toggle theme</span>
  </button>