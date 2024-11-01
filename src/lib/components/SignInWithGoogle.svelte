<script lang="ts">
    import {auth, user, userData} from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
    export let goTo = "";
    import { resumeSignup } from '$lib/utils';

    // UI 
    import { toast } from "svelte-sonner";
    import { Button } from "$lib/components/ui/button";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            resumeSignup(user, goTo);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while signing in with Google");
        }
    }
</script>

<Button variant="default" class="bg-[#4285F4] hover:bg-[#0e61ea]" on:click={signInWithGoogle}>
    <slot/>
</Button>
