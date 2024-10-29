<script lang="ts">
    import "../app.css";
    import {user, userData} from '$lib/firebase';

    // UI 
    import { Button } from "$lib/components/ui/button";
    import * as HoverCard from "$lib/components/ui/hover-card";
    import { CalendarDays } from 'lucide-svelte';
    import * as Tooltip from "$lib/components/ui/tooltip";

    $user;
    $userData;

</script>

<div class="mx-10 my-4">
    <nav class="w-full">
        <div class="flex justify-between items-center py-4">
            <a href="/" class="text-2xl font-bold uppercase">Fullstack</a>
            <div class="flex w-fit gap-4 items-center">
                {#if $user}

                    <HoverCard.Root>
                        <HoverCard.Trigger><h2 class="font-bold hover:underline">{$userData?.username ? "@" : ""}{$userData?.username ?? ""}</h2></HoverCard.Trigger>
                        <HoverCard.Content class="flex flex-col gap-2">
                            <span>Hi, {$user.displayName ?? $userData?.username ?? "user"}!</span>
                            <span class="text-sm text-neutral-500">
                                <CalendarDays class="w-4 h-4 inline" />
                                Joined October 2024. <!-- {$user?.metadata?.createdAt ? new Date($user.metadata.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ""} --> 
                            </span>
                        </HoverCard.Content>
                    </HoverCard.Root>
                    
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <a href="/dashboard"><img src={$userData?.photoURL ?? "/user.jpeg"} alt="profile" class="rounded-full w-8 h-8" /></a>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <p>Dashboard</p>
                        </Tooltip.Content>
                    </Tooltip.Root>
                {:else}
                    <a href="/signin" class="hover:underline">Sign In</a>
                    <Button variant="default" href="/signup">Sign Up</Button>
                {/if}
            </div>
        </div>
    </nav>
    
    <div class="min-h-screen flex flex-col">
        <slot></slot>
    </div>
</div>