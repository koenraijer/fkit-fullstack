<script lang="ts">
    import { user, userData } from "$lib/firebase";
    import LoadingScreen from "./LoadingScreen.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { toast } from "svelte-sonner";
    import { page } from "$app/stores";
    import { browser } from '$app/environment';
    import { resumeSignup } from "$lib/utils";
    export let settings: boolean = false;
    export let signup: boolean = false;

    // General redirect if user is not logged in
    $: browser && !$user && (toast.error("Oops! You need to log in to see that page."), goto('/login'));

    // Redirect from settings to login if user has not completed signup
    onMount(() => {
        // Redirect to the login page after a short delay
        setTimeout(() => {
            if (settings) {
                if (!$user) {
                  toast.error("Oops! You need to log in to see that page.");
                  goto('/login');
                }
                if (!$userData?.username || !$userData?.passwordLastUpdated) {
                  goto('/login');
                }
            } else if (signup) {
                if (!$user) {
                  toast.error("Oops! You need to log in to see that page.");
                  goto('/login');
                  return
                }
                if ($userData?.signupCompleted) {
                  goto('/login');
                  return;
                }
                if ($page.route.id !== "/signup/username" && !$userData?.username) {
                  goto('/signup/username');
                }
                if ($page.route.id !== "/signup/password" && !$userData?.passwordLastUpdated) {
                    if ($userData?.username) {
                      goto('/signup/password');
                    } else {
                      goto('/signup/username');
                    }
                }
                if ($page.route.id !== "/signup/avatar" && !$userData?.photoURL) {
                    if ($userData?.passwordLastUpdated) {
                      goto('/signup/avatar');
                    } else {
                      goto('/signup/password');
                    }
                }
            } else {
              if (!$user) {
                toast.error("Oops! You need to log in to see this page.");
                goto('/login');
              }
            }
        }, 1000); 
    });
</script>
  
{#if settings}
  {#if $user && $userData?.username && $userData?.passwordLastUpdated}
    <slot />
  {:else}
      <LoadingScreen>
          Hold on, verifying access
      </LoadingScreen>
  {/if}
{:else if signup}
  {#if $page.route.id !== "/signup/username" && !$userData?.username}
      <LoadingScreen>
          Hold on, verifying access
      </LoadingScreen>
  {:else if $page.route.id !== "/signup/password" && !$userData?.passwordLastUpdated && $userData?.username}
      <LoadingScreen>
          Hold on, verifying access
      </LoadingScreen>
  {:else}
    <slot />
  {/if}
{:else}
  {#if $user}
    <slot />
  {:else}
      <LoadingScreen>
          Hold on, verifying access
      </LoadingScreen>
  {/if}
{/if}