<script lang="ts">
    import AuthCheck from '$lib/components/AuthCheck.svelte';
    import {page} from '$app/stores';
  </script>

<AuthCheck settings>
    <main class="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div
            class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
        >
            <h1 class="text-3xl font-semibold col-span-full">Settings</h1>

            <!-- Left columns -->
             <!--
            <nav
                class="text-muted-foreground gap-4 text-sm md:grid hidden"
                data-x-chunk-name="dashboard-04-chunk-0"
                data-x-chunk-description="A sidebar navigation with links to general, security, integrations, support, organizations, and advanced settings."
                data-x-chunk-container="chunk-container after:right-0"
            >
                <a href="/settings" class="text-primary" class:font-semibold={$page.route.id === "/settings"}>General</a>
                <a href="/settings/delete" class="text-primary" class:font-semibold={$page.route.id === "/settings/delete"}>Delete Account</a>
            </nav>
             -->

            <!-- Right columns -->
            <div class="flex flex-col gap-4 col-start-2">
                <slot></slot>
            </div>
        </div>
    </main>
</AuthCheck>