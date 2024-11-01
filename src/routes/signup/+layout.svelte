<script lang="ts">
    import {page} from '$app/stores';
    import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
    import { buttonVariants } from "$lib/components/ui/button";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
</script>

<AuthCheck signup>
<div class="flex justify-center items-center fixed inset-0 p-4 sm:p-6 max-w-96 w-full h-full max-h-96 my-auto mx-auto">
    <div class="py-4 sm:py-6">
        <ul class="my-8 w-full flex justify-between">
            <li class="
                    { $page.route.id?.match(/username|avatar|password/g) ? `${buttonVariants({ variant: 'secondary' })} hover:bg-secondary` : `${buttonVariants({ variant: 'outline' })} hover:bg-transparent`}
                    {($page.route.id === '/signup/username') ? "border border-muted-foreground" : ""}
                "
            >
                Username
            </li>
            <li class="
                    {$page.route.id?.match(/avatar|password/g) ? `${buttonVariants({ variant: 'secondary' })} hover:bg-secondary` : `${buttonVariants({ variant: 'outline' })} hover:bg-transparent`}
                    {($page.route.id === '/signup/password') ? "border border-muted-foreground" : ""}
                "
            >
                Password
            </li>
            <li class="
                    {$page.route.id?.includes('avatar') ? `${buttonVariants({ variant: 'secondary' })} hover:bg-secondary` : `${buttonVariants({ variant: 'outline' })} hover:bg-transparent`}
                    {($page.route.id === '/signup/avatar') ? "border border-muted-foreground" : ""}
                "
            >
                Avatar
            </li>
        </ul>
        
        <AnimatedRoute>
            <main class="">
                <div class="items-center text-center h-full max-h-96 w-full max-w-96">
                    <slot></slot>
                </div>
            </main>
        </AnimatedRoute>  
    </div>
</div>
</AuthCheck>