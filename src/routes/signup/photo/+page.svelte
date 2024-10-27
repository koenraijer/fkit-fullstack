<script lang="ts">
    import { goto } from "$app/navigation";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { user, userData, storage, db } from "$lib/firebase";
    import { doc, updateDoc } from "firebase/firestore";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

    // UI
    import { Input } from "$lib/components/ui/input";
    import { buttonVariants } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Label } from "$lib/components/ui/label";

    let previewURL: string;
    let uploading = false;
  
    async function upload(e: any) {
      uploading = true;
      const file = e.target.files[0];
      previewURL = URL.createObjectURL(file);
      const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
      const result = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(result.ref);
  
      await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });
      uploading = false;
    }

    async function completeOnboarding() {
      await updateDoc(doc(db, "users", $user!.uid), { signupCompleted: true }); // Update the user's onboarding status
      goto("/"); // Redirect to the home page
    }
  </script>
  
  <AuthCheck>
    <Card.Root class="w-full">
      <Card.Header>
        <Card.Title class="text-xl">Profile Picture</Card.Title>
        <Card.Description>Upload a profile picture for your account.</Card.Description>
      </Card.Header>
      <Card.Content>
        <form class="max-w-screen-md w-full mx-auto">
          <div class="form-control w-full max-w-xs mx-auto text-center">
            <img
              src={previewURL ?? $userData?.photoURL ?? "/user.jpeg"}
              alt="photoURL"
              width="128"
              height="128"
              class="mx-auto rounded-lg mb-8"
            />
            <Label for="photoURL">Picture</Label>
            <Input
              on:change={upload}
              name="photoURL"
              type="file"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              accept="image/png, image/jpeg, image/gif, image/webp"
            />
            {#if uploading}
              <p>Uploading...</p>
              <progress class="progress progress-info w-56 mt-6"></progress>
            {/if}
          </div>
        </form>
      </Card.Content>
      <Card.Footer class="border-t px-6 py-4 flex justify-between">
        <a href="/signup/username" class={buttonVariants({ variant: 'outline' })}>Back</a>
        <button on:click={completeOnboarding} class={buttonVariants({ variant: 'outline' })} class:btn-disabled={!$user}>Finish</button>
      </Card.Footer>
    </Card.Root>
</AuthCheck>