<script lang="ts">
    import {auth, user, userData} from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
	import { Button } from "$lib/components/ui/button";
    import { goto } from '$app/navigation';
    export let goTo = "";

    $user;
    $userData;

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        console.log(user)
        if (goTo) {
            goto(goTo);
        }
    }
</script>

<Button variant="outline" on:click={signInWithGoogle}>
    <slot/>
</Button>
