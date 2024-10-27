<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db, user, userData, auth } from "$lib/firebase";
    import { doc, getDoc, writeBatch} from "firebase/firestore";
    import { goto } from "$app/navigation";
    import { signOut} from 'firebase/auth';
    
    // UI
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    
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
  
  
  
  <AuthCheck>
      <Card.Root class="">
        <Card.Header>
          <Card.Title class="text-xl">Username</Card.Title>
          <Card.Description>Enter a username for your account.</Card.Description>
        </Card.Header>
        <Card.Content class="py-10">
          {#if $userData?.username}
            <p class="text-lg">
                Your username is <span class="text-success font-bold"
                >@{$userData.username}</span
                >
            </p>
            <p class="text-sm">(Usernames cannot be changed)</p>
          {:else}
            <form class="" on:submit|preventDefault={confirmUsername}>
              <input
                type="text"
                placeholder="Username"
                class="input w-full"
                bind:value={username}
                on:input={checkAvailability}
                on:keydown={preventIllegalCharacters}
              />
              <div class="my-4 min-h-16 px-8 w-full">
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
          {/if}
        </Card.Content>
        <Card.Footer class="border-t px-6 py-4 flex justify-between">
            <Button href="/signup" variant="outline">Previous</Button>
            <Button href="/signup/photo" variant="outline">Next</Button>
        </Card.Footer>
      </Card.Root>
  </AuthCheck>

