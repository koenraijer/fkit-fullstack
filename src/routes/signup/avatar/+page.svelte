<script lang="ts">
    import { goto } from "$app/navigation";
    import { user, userData, storage, db, auth } from "$lib/firebase";
    import { doc, updateDoc } from "firebase/firestore";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    import { signOut } from "firebase/auth";

    // UI
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { LoaderCircle } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import Badge from "$lib/components/ui/badge/badge.svelte";

    // Profile Picture
    let previewURL: string;
    let uploading = false;
    let selectedFile: File;
    let fileInput: HTMLInputElement;
    let previewShown = false;

    async function upload(e: any) {
      uploading = true;
      const file = e.target.files[0];
      previewURL = URL.createObjectURL(file);
      const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
      const result = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(result.ref);
  
      await updateDoc(doc(db, "users", $user!.uid), { photoURL: url }).then(() => {
        toast.success("Avatar updated.");
        uploading = false;
      });
    }

    function triggerFileInput() {
      fileInput.click();
    }

    async function completeOnboarding() {
      await updateDoc(doc(db, "users", $user!.uid), { signupCompleted: true }); // Update the user's onboarding status
      toast.success("Onboarding completed.");
      goto("/"); // Redirect to the home page
    }

  </script>
  
<Card.Root>
  <Card.Header>
    <Card.Title class="text-xl relative">Avatar
    </Card.Title>
    <Card.Description class="">This is your avatar. Click on the avatar to upload a custom one from your files.</Card.Description>
  </Card.Header>
  <Card.Content>
    <Badge variant="outline" class="mb-4 w-fit mx-auto text-[0.5rem] text-muted-foreground"><span class="!text-normal !text-xs">Optional</span></Badge>

    <form class="">
      <div class="">
        <label for="photoURL">
        <Button variant="outline" class="rounded-full w-32 h-32 m-0 p-0" on:click={triggerFileInput}>
          <img
            src={previewURL ?? "/user.jpeg" ?? $userData?.photoURL}
            alt="photoURL"
            width="128"
            height="128"
            class="mx-auto rounded-full p-2 cursor-pointer" 
          />
        </Button>
        </label>
        <input
          bind:this={fileInput}
          name="photoURL"
          type="file"
          class="hidden"
          accept="image/png, image/jpeg, image/gif, image/webp"
          on:change={upload}
        />
      </div>
    </form>
  </Card.Content>
  <Card.Footer class="flex justify-between border-t px-6 py-4">
    <Button variant="outline" class="text-muted-foreground" on:click={() => {signOut(auth); goto('/login')}}>Sign Out</Button>
    <Button on:click={completeOnboarding} variant="default" disabled={uploading}>
      {#if uploading}
      <LoaderCircle class="animate-spin inline mr-1"/>
    {/if}
      Complete
    </Button>
  </Card.Footer>
</Card.Root>