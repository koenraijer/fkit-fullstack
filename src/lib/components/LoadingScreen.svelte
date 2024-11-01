<script>
    import {LoaderCircle} from 'lucide-svelte'
</script>

<div class="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center p-4">
    <LoaderCircle class="w-6 h-6 sm:w-10 sm:h-10 text-primary animate-spin" />
    <h2 class="text-base sm:text-xl ml-4 font-semibold">
        <slot></slot>
        ...</h2>
</div>