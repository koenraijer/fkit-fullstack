<script lang="ts">
    import { goto } from '$app/navigation';
    import {auth, user, userData, docStore} from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
    import SignUp from '$lib/components/SignUp.svelte';

    // UI
    import * as Card from '$lib/components/ui/card';
    import { Button } from '$lib/components/ui/button';

</script>

{#if $user}
    <Card.Root class="w-full">
        <Card.Header>
        <Card.Title>Sign Up</Card.Title>
        <Card.Description>Enter your information to create an account
        </Card.Description>
        </Card.Header>
        <Card.Content class="my-10">
            <h2>Welcome, <span class="font-bold">{$user.displayName}</span></h2>
            <p>You are already logged in</p>
        </Card.Content>
        <Card.Footer class="border-t px-6 py-4 flex justify-between">
            <Button variant="outline" on:click={() => signOut(auth)}>Sign Out</Button>
            <Button variant="outline" on:click={() => goto('/signup/username')}>Next</Button>
        </Card.Footer>
    </Card.Root>
{:else}
    <SignUp />
{/if}