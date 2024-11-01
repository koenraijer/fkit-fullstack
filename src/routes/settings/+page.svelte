<script lang="ts">
    import {db, auth, user, userData, storage} from '$lib/firebase';
    import { signOut, updatePassword } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { doc, getDoc, writeBatch, updateDoc, serverTimestamp } from "firebase/firestore";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    import moment from 'moment';

    // UI
    import * as Card from '$lib/components/ui/card';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { LoaderCircle, Upload, History } from 'lucide-svelte';
    import { toast } from 'svelte-sonner';
    import { Badge } from '$lib/components/ui/badge';
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import * as Avatar from '$lib/components/ui/avatar/index.js';

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
      
      if (!isMonthAgo) {
        return;
      }

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
          photoURL: $userData?.photoURL ?? $user?.photoURL ?? null,
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
            console.log(`Username successfully updated to @${username}`);
            toast.success(`Username successfully updated to @${username}`);
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
    $: isMonthAgo = $userData?.usernameLastUpdated ? (daysSince($userData.usernameLastUpdated) > 30) : false;

    // Profile Picture
    let previewURL: string;
    let uploading = false;
    let selectedFile: File;
    let fileInput: HTMLInputElement;
    let previewShown = false;

    function showPreview(e: any) {
        const file = e.target.files[0];
        if (file) {
          previewURL = URL.createObjectURL(file);
          selectedFile = file;
        }
        previewShown = true;
    }

    async function uploadImage() {
      if (!selectedFile) {
        console.error("No file selected for upload.");
        return;
      }
      uploading = true;
      const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
      const result = await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(result.ref);
      await updateDoc(doc(db, "users", $user!.uid), { photoURL: url }).then(() => {
        toast.success("Avatar updated.");
        uploading = false;
        previewShown = false;
      });

    }

    function triggerFileInput() {
      fileInput.click();
    }

    // Days ago
    /**
     * Calculates and returns the integer number of days between the given timestamp and the current date.
     * 
     * @param timestamp - An object representing a point in time with `seconds` and `nanoseconds`.
     * @returns The number of whole days since the given timestamp.
     */
      function daysSince(timestamp: { seconds: number, nanoseconds: number }): number {
        const date = new Date(timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000);
        const parsedDate = moment(date);
        const now = moment();
        const daysDifference = now.diff(parsedDate, 'days');
        return daysDifference;
      }
      
      // Reactive variable to store days since last username update
      $: daysSinceLastUpdate = daysSince($userData?.usernameLastUpdated ?? { seconds: 0, nanoseconds: 0 });

      // Login with password
      let password: string = "";
      let loadingPW: boolean = false;
      let isValidPW: boolean = false;
      let isTouchedPW: boolean = false;

      $: isTouchedPW = password.length > 0;

      function validatePassword(password: string) {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
          minLength: password.length >= minLength,
          hasUppercase,
          hasLowercase,
          hasNumber,
          hasSpecialChar,
        };
      }

      $: validationResults = validatePassword(password);
      $: isValidPW = Object.values(validationResults).every(Boolean);

      async function confirmPassword() {
          loadingPW = true;
          if (isValid && $user) {
              updatePassword($user, password).then(() => {
                updateDoc(doc(db, "users", $user!.uid), { passwordLastUpdated: serverTimestamp()}).then(() => {
                  toast.success("Password set.");
                  loadingPW = false;
              });
            }).catch((error) => {
              console.error(error.message);
              toast.error("An error occurred. Please try again.");
              loadingPW = false;
            });
          }

      }

      // Delete account
      async function deleteAccount() {
        console.log("Deleting account");
        // Delete user
        if ($user && $userData) {
          const batch = writeBatch(db);
          batch.delete(doc(db, "usernames", $userData.username));
          batch.delete(doc(db, "users", $user?.uid));
          try {
            await batch.commit();
            await deleteUser($user);
            console.log("User deleted");
            toast.success("Account deleted.");
            goto('/');
          } catch (error) {
            console.error(error);
            toast.error("Error deleting account.");
          }
        } else {
          toast.error("Error deleting account.");
        }
      }
</script>

  <Card.Root class="w-full">
    <Card.Header>
      <Card.Title class="text-xl">Avatar</Card.Title>
      <Card.Description>This is your avatar. Click on the avatar to upload a custom one from your files.</Card.Description>
    </Card.Header>
    <Card.Content>
      <form class="">
        <div class="mx-auto w-fit">
          <label for="photoURL">
          <Button variant="outline" class="rounded-full w-32 h-32 m-0 p-0 relative" on:click={triggerFileInput}>
            <Avatar.Root class="hidden h-28 w-28 sm:flex">
              <Avatar.Image src={previewURL ?? $userData?.photoURL} alt="avatar" />
              <Avatar.Fallback>
                  <img src="/user.jpeg" alt="avatarFallback">
              </Avatar.Fallback>
          </Avatar.Root>
          </Button>
          </label>
          <input
            bind:this={fileInput}
            name="photoURL"
            type="file"
            class="hidden"
            accept="image/png, image/jpeg, image/gif, image/webp"
            on:change={showPreview}
          />
        </div>
      </form>
    </Card.Content>
    <Card.Footer class="flex justify-end border-t px-6 py-4">
      {#if previewShown}
        <Button variant="default" class="flex gap-1" on:click={uploadImage}>
        {#if uploading}
          <LoaderCircle class="w-4 h-4 mr-1 animate-spin inline"/>
        {:else}
          <Upload class="w-4 h-4 mr-1 inline"/>
        {/if}
          Upload
        </Button>
      {:else}
        <Button variant="outline" class="flex gap-1" on:click={uploadImage} disabled={!previewShown}>
          <Upload class="w-4 h-4 mr-1 inline"/>
          Upload
        </Button>  
      {/if}
    </Card.Footer>
  </Card.Root>
  
  <Card.Root>
      <Card.Header>
      <Card.Title>Username</Card.Title>
      <Card.Description>
          Change your username here.
          {#if $userData?.username}
            Your current username is @{$userData?.username}.
          {:else} 
            You don't currently a username yet.
          {/if}
          {#if daysSinceLastUpdate > 30}
            You can change your username again now ({daysSinceLastUpdate} days ago <History class="inline w-4 h-4 text-inherit"/>).
          {:else}
            You can change your username again in {30 - daysSinceLastUpdate} days.
          {/if}
      </Card.Description>
      </Card.Header>
      <Card.Content>
          <form class="w-2/5">
              <Input
                disabled={!isMonthAgo}
                type="text"
                placeholder="Username"
                class="input w-fit input-bordered"
                bind:value={username}
                on:input={checkAvailability}
                on:keydown={preventIllegalCharacters}
              />
            </form>
      </Card.Content>
      <Card.Footer class="flex justify-between border-t px-6 py-4">
        <div class="">
          {#if loading && isTouched && isMonthAgo}
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
          {:else if isAvailable && isTouched && isValid && !isCurrent && isMonthAgo}
            <p class="text-sm">
              @{username} is available!
            </p>
          {:else if !isMonthAgo && isTouched}
            <p class="text-sm">
              {#if daysSince($userData?.usernameLastUpdated ?? { seconds: 0, nanoseconds: 0 }) > 30}
                You can change your username again now (last changed {daysSince($userData?.usernameLastUpdated ?? { seconds: 0, nanoseconds: 0 })} days ago).
              {:else}
                You can change your username again in {30 - (daysSince($userData?.usernameLastUpdated ?? { seconds: 0, nanoseconds: 0 }))} days.
              {/if}
            </p>
          {/if}
        </div>
          {#if isAvailable && isValid && !isCurrent && !loading && isTouched && isMonthAgo} 
            <Button on:click={confirmUsername} variant="default">Save</Button>
          {:else}
            <Button  variant="outline" class="!cursor-not-allowed" disabled >Save</Button>
          {/if}
      </Card.Footer>
  </Card.Root>

  <Card.Root>
    <Card.Header>
    <Card.Title>Password</Card.Title>
    <Card.Description>
          Change your password here. 
    </Card.Description>
    </Card.Header>
    <Card.Content>
      <form class="">
        <Input
          type="password"
          placeholder="Username"
          class="input w-full"
          bind:value={password}
        />
        <div class="my-4 w-full flex flex-wrap gap-2 transition-colors hover:bg-inherit">
            <Badge variant="secondary" class="{validationResults.minLength ? "bg-green-300" : ""}">8 characters</Badge>
            <Badge variant="secondary" class="{validationResults.hasUppercase ? "bg-green-300" : ""}">1 capital letter</Badge>
            <Badge variant="secondary" class="{validationResults.hasLowercase ? "bg-green-300" : ""}">1 lowercase letter</Badge>
            <Badge variant="secondary" class="{validationResults.hasNumber ? "bg-green-300" : ""}">1 number</Badge>
            <Badge variant="secondary" class="{validationResults.hasSpecialChar ? "bg-green-300" : ""}">1 special character</Badge>
        </div>
      </form>
    </Card.Content>
    <Card.Footer class="flex justify-end border-t px-6 py-4">
        {#if !isValidPW}
          <Button variant="outline" class="cursor-not-allowed" disabled>Save</Button>
        {:else}
          <Button on:click={() => {confirmPassword()}} variant="default">Save</Button>
        {/if}
    </Card.Footer>
</Card.Root>

  <Card.Root>
    <Card.Header>
      <Card.Title>Sign Out</Card.Title>
      <Card.Description>
        Sign out of your account.
      </Card.Description>
    </Card.Header>
    <Card.Content></Card.Content>
    <Card.Footer class="flex justify-end border-t px-6 py-4">
      <Button variant="default" on:click={() => { signOut(auth); goto('/'); }}>Sign Out</Button>
    </Card.Footer>
  </Card.Root>

  <Card.Root>
    <Card.Header>
      <Card.Title>Delete Account</Card.Title>
      <Card.Description>
        Permanently remove your account and all of its contents from this website. This action is not reversible. Please continue with caution.
      </Card.Description>
    </Card.Header>
    <Card.Content>
    </Card.Content>
    <Card.Footer class="flex justify-end border-t px-6 py-4">
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="destructive">Delete Account</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content class="m-4 sm:m-6 w-5/6 mx-auto rounded-lg">
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action on:click={deleteAccount}>Delete Account</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Card.Footer>
  </Card.Root>

