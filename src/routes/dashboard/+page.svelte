<script lang="ts">
    import {db, auth, user, userData} from '$lib/firebase';
    import { signOut} from 'firebase/auth';
    import AuthCheck from '$lib/components/AuthCheck.svelte';
    import { goto } from '$app/navigation';
    import { doc, getDoc, writeBatch} from "firebase/firestore";

    // UI
    import * as Card from '$lib/components/ui/card';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';

    let username = "";
    let loading = false;
    let isAvailable = false;
  
    let debounceTimer: NodeJS.Timeout;
  
    async function  checkAvailability() {
      isAvailable = false;
      clearTimeout(debounceTimer);
  
      loading = true;
  
      debounceTimer = setTimeout(async () => {
          console.log("checking availability of", username);
          
          const ref = doc(db, "usernames", username); // Make reference to the username document in Firestore
          const exists = await getDoc(ref).then((doc) => doc.exists()); // Check if the document exists
  
          isAvailable = !exists;
          loading = false;
  
      }, 500);
  
    }
  
    async function confirmUsername() {
        console.log("confirming username", username);
        const batch = writeBatch(db);
        batch.set(doc(db, "usernames", username), { uid: $user?.uid });
        batch.set(doc(db, "users", $user!.uid), { 
        username, 
        photoURL: $user?.photoURL ?? null,
        published: true,
        bio: 'I am the Walrus',
        links: [
            {
            title: 'Test Link',
            url: 'https://kung.foo',
            icon: 'custom'
            }
        ]
        });

        await batch.commit();

        username = '';
        isAvailable = false;
    }

    function preventIllegalCharacters(event: KeyboardEvent) {
        const key = event.key;
        const isAllowedKey = /^[a-zA-Z0-9]$/.test(key) || 
                            ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(key);

        if (!isAllowedKey) {
            event.preventDefault();
        }
    }
    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
    $: isValid = username?.length > 2 && username.length < 16 && re.test(username);
    $: isTouched = username.length > 0;
    $: isTaken = isValid && !isAvailable && !loading
</script>

<h2 class="card-title mb-8">Dashboard</h2>

<AuthCheck>
    <div class="flex flex-col gap-2">
        <h2>Welcome, {$user?.displayName}</h2>

    {#if $userData?.username}
        <Card.Root
        >
            <Card.Header>
            <Card.Title>Username</Card.Title>
            <Card.Description>
                Change your username here.
            </Card.Description>
            </Card.Header>
            <Card.Content>
                <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
                    <Input
                      type="text"
                      placeholder="Username"
                      class="input w-fit input-bordered"
                      bind:value={username}
                      on:input={checkAvailability}
                      on:keydown={preventIllegalCharacters}
                    />
                    <div class="my-4 min-h-16 w-full">
                      {#if loading}
                        <p class="text-secondary">Checking availability of @{username}...</p>
                      {/if}
                  
                      {#if !isValid && isTouched}
                        <p class="text-error text-sm">
                          must be 3-16 characters long, alphanumeric only
                        </p>
                      {/if}
                  
                      {#if isValid && !isAvailable && !loading}
                        <p class="text-warning text-sm">
                          @{username} is not available
                        </p>
                      {/if}
                  
                      {#if isAvailable}
                        <button class="btn btn-success">Confirm username @{username} </button>
                      {/if}
                    </div>
                  </form>
            </Card.Content>
            <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
            </Card.Footer>
        </Card.Root>
    
          <p class="text-lg">
              Your username is <span class="text-success font-bold"
              >@{$userData.username}</span
              >
          </p>

        <h2>Change Username</h2>
        <button class="btn btn-accent w-fit px-4" on:click={() => { signOut(auth); goto('/'); }}>Sign out</button>
    {/if}
    </div>
</AuthCheck>
