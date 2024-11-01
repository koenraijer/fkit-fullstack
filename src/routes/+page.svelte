<script>
    import { user } from "$lib/firebase";

    //UI 
    import { Button } from "$lib/components/ui/button";
  </script>
  
  <svelte:head>
    <title>FULLSTACK - A place for stacks.</title>
    <meta name="description" content="Demo project for the Firebase-SvelteKit, or FKIT stack, based on the Fireship SvelteKit course." />
  </svelte:head>
  
  <main class="flex mx-auto w-fit mt-20">
      <div class="text-center">
        <div class="w-full mx-auto flex flex-col">
          <h1 class="text-4xl font-semibold">Fullstack</h1>
          <p class="py-6 text-2xl">A simple fullstack app.</p>
          {#if !$user}
            <div class="flex w-fit gap-4 items-center mx-auto">
              <Button variant="default" href="/login">Log In / Register</Button>
            </div>
          {/if}
        </div>
      </div>
  </main>
  
  