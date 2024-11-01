<script lang="ts">
    import { db, user, userData, auth } from "$lib/firebase";
    import { goto } from "$app/navigation";
    import { doc, getDoc, writeBatch} from "firebase/firestore";  
    import { signOut } from "firebase/auth";
    import { serverTimestamp } from "firebase/firestore";

    // UI
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { toast } from "svelte-sonner";

    // Username
    let username = $userData?.username ?? '';
    let loading = false;
    let isAvailable = false;
    let isCurrent = false;
  
    let debounceTimer: NodeJS.Timeout;
  
    async function  checkAvailability() {
      isAvailable = false;
      clearTimeout(debounceTimer);
  
      loading = true;
  
      debounceTimer = setTimeout(async () => {
          
          const ref = doc(db, "usernames", username); // Make reference to the username document in Firestore
          const exists = await getDoc(ref).then((doc) => doc.exists()); // Check if the document exists
  
          isAvailable = !exists;
          loading = false;
  
      }, 500);
  
    }
  
    async function confirmUsername() {
        const batch = writeBatch(db); 
        batch.set(doc(db, "usernames", username), { uid: $user?.uid });
        batch.set(doc(db, "users", $user!.uid), { 
          username, 
          usernameLastUpdated: serverTimestamp(), 
          passwordLastUpdated: null,
          photoURL: $userData?.photoURL ?? null,
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

        await batch.commit().then(() => {
            toast.success(`Username successfully set to @${username}`);
            goto('/signup/password');
        });

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
    $: isTaken = isValid && !isAvailable && !loading && !isCurrent;
    $: isCurrent = username === $userData?.username;

    // Redirecting
    let redirecting = false;

    $: if ($userData?.username && !redirecting) {
        redirecting = true;
        goto('/signup/password');
    }
  </script>
  
<Card.Root class="">
  <Card.Header>
    <Card.Title class="text-xl">Username</Card.Title>
    <Card.Description>Enter a username for your account. You may update it once every 30 days.</Card.Description>
  </Card.Header>
  <Card.Content class="py-10">
    {#if $userData?.username}
      <p class="my-6">You already have a username. Redirecting to password setup...
      </p>
      <div class="my-10 py-4 px-6 flex items-center justify-start gap-4 border rounded-lg">
          <Avatar.Root class="hidden h-9 w-9 sm:flex">
              <Avatar.Image src={$userData?.photoURL} alt="avatar" />
              <Avatar.Fallback>
                  <img src="/user.jpeg" alt="avatarFallback">
              </Avatar.Fallback>
          </Avatar.Root>
          <div class="flex flex-col gap-1 justify-start w-fit">
              <p class="text-sm font-medium leading-none w-fit">@{$userData?.username}</p>
              <p class="text-muted-foreground text-sm w-fit">{$user?.email}</p>
          </div>
      </div>
    {:else}
      <form class="">
        <Input
          autofocus
          type="text"
          placeholder="Username"
          class="input w-full"
          bind:value={username}
          on:input={checkAvailability}
          on:keydown={preventIllegalCharacters}
        />
        <div class="px-6 py-4">
          {#if loading && isTouched}
            <p class="text-sm">Checking availability...</p>
          {:else if isCurrent && !isTouched} 
            <p class="text-sm">
              This is your current username.
            </p>
          {:else if !isValid && isTouched && !loading}
            <p class="text-destructive text-sm">
              Username must be 3-16 alphanumeric characters.
            </p>
          {:else if isTaken}
            <p class="text-destructive text-sm">
              @{username} is not available... 
            </p>
          {:else if isAvailable && isTouched && isValid && !isCurrent}
            <p class="text-sm">
              @{username} is available!
            </p>
          {/if}
        </div>
      </form>
    {/if}
  </Card.Content>
  <Card.Footer class="border-t px-6 py-4 flex justify-between">
    <Button variant="outline" class="text-muted-foreground" on:click={() => {signOut(auth); goto('/login')}}>Sign Out</Button>
    {#if isAvailable && isValid && !isCurrent && !loading && isTouched} 
      <Button on:click={() => {confirmUsername(); goto("/signup/password")}} variant="default">Confirm</Button>
    {:else}
      <Button  variant="outline" class="!cursor-not-allowed" disabled >Confirm</Button>
    {/if}
  </Card.Footer>
</Card.Root>