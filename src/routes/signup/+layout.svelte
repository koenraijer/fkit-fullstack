<script lang="ts">
    import {page} from '$app/stores';
    import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
    import { buttonVariants } from "$lib/components/ui/button";
</script>

<div class="max-w-md mx-auto">
    <ul class="mt-8">
        <a href="/signup" class="{ buttonVariants({ variant: 'secondary' })} ">Create Account</a>
        <a href="/signup/username" class="{ $page.route.id?.match(/username|photo/g) ? buttonVariants({ variant: 'secondary' }) : buttonVariants({ variant: 'outline' }) }">Choose Username</a>
        <a href="/signup/photo" class="{$page.route.id?.includes("photo") ? buttonVariants({variant: 'secondary'}) : buttonVariants({ variant: 'outline' })}">Upload Photo</a>
    </ul>
    
    <AnimatedRoute>
        <main class="my-8">
            <div class="items-center text-center">
                <slot></slot>
            </div>
        </main>
    </AnimatedRoute>    
</div>
