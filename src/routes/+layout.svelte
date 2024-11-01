<script lang="ts">
    import "../app.css";
    import {user, userData, auth} from '$lib/firebase';
    import {info} from '$lib/info'
    import { signOut} from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    
    // UI 
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { LogOut } from 'lucide-svelte';
    import { Settings } from 'lucide-svelte';
    import { Toaster } from "$lib/components/ui/sonner";
    import * as Avatar from "$lib/components/ui/avatar";
    import { ModeWatcher } from "mode-watcher";
    import LightSwitch from "$lib/components/LightSwitch.svelte";

</script>

<!-- Initialisations -->
<ModeWatcher />
<Toaster closeButton richColors />

<!-- UI -->
<nav class="w-full !z-20 relative p-4 sm:p-6 border-muted-foreground/25 {($page.route.id === "/login" || $page.route.id.includes("/signup")) ? "sm:block hidden" : ""} {($page.route.id === "/login" || $page.route.id.includes("/signup") || $page.route.id === "/") ? "" : "block border-b"}">
    <div class="flex items-center {($page.route.id === '/login' || $page.route.id?.includes('/signup')) ? "justify-end sm:justify-between" : "justify-between"}">
        <div class="{($page.route.id === '/login' || $page.route.id?.includes('/signup')) ? "hidden sm:block" : ""}">
          <a href="/" class="text-2xl font-semibold ">{info.name}</a>
        </div>
        <div class="flex w-fit gap-4 items-center group">
            {#if !$user && !($page.route.id === '/login') && !($page.route.id === '/signup')}
                <Button variant="default" href="/login" class="{($page.route.id === '/login' || $page.route.id?.includes('/signup')) ? "hidden sm:block" : ""}">Log In / Register</Button>
            {:else if $user && $userData?.username && $userData?.passwordLastUpdated}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild let:builder>
                <Button
                  variant="outline"
                  size="icon"
                  class="overflow-hidden rounded-full"
                  builders={[builder]}
                >
                  <Avatar.Root class="rounded-full w-8 h-8">
                      <Avatar.Image src={$userData?.photoURL} alt="avatar" />
                      <Avatar.Fallback>
                          <img src="/user.jpeg" alt="avatarFallback">
                      </Avatar.Fallback>
                  </Avatar.Root>
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                    <div class="py-3 px-4 flex items-center justify-start gap-3">
                        <Avatar.Root class="hidden h-9 w-9 sm:flex">
                            <Avatar.Image src={$userData?.photoURL} alt="avatar" />
                            <Avatar.Fallback>
                                <img src="/user.jpeg" alt="avatarFallback">
                            </Avatar.Fallback>
                        </Avatar.Root>
                        <div class="flex flex-col gap-1 justify-start w-fit">
                            <p class="text-sm font-medium leading-none w-fit">{$userData?.username ? "@" : ""}{$userData?.username ?? $user.displayName}</p>
                            <p class="text-muted-foreground text-sm w-fit">{$user?.email}</p>
                        </div>
                    </div>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <a class="flex justify-between w-full items-center" href="/settings">
                    Settings
                    <DropdownMenu.Shortcut><Settings class="w-4 h-4 text-inherit inline"/>
                    </DropdownMenu.Shortcut>
                  </a>
              </DropdownMenu.Item>
                <DropdownMenu.Item><LightSwitch/></DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <button class="flex justify-between w-full items-center" on:click={() => {signOut(auth); goto('/')}}>
                    <span>Sign Out</span>
                    <DropdownMenu.Shortcut><LogOut class="w-4 h-4 text-inherit inline"/>
                    </DropdownMenu.Shortcut>
                  </button>

                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            {/if}
        </div>
    </div>
</nav>

<div class="max-w-screen overflow-x-hidden">
  <slot></slot>
</div>

