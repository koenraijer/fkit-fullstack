<script lang="ts">
    import { auth, db, user, userData } from "$lib/firebase";
    import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
    import { signOut, updatePassword } from "firebase/auth";

    // UI
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { goto } from "$app/navigation";
    import { toast } from "svelte-sonner";
    import { Badge } from "$lib/components/ui/badge";

    let password = "";
    let loading = false;
    let isValid = false;
    let isTouched = false;

    $: isTouched = password.length > 0;

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
    $: isValid = Object.values(validationResults).every(Boolean);

    async function confirmPassword() {
        loading = true;
        if (isValid && $user) {
            updatePassword($user, password).then(() => {
              updateDoc(doc(db, "users", $user!.uid), { passwordLastUpdated: serverTimestamp()}).then(() => {
                goto("/signup/avatar");
                toast.success("Password set.");
                loading = false;
            });
          }).catch((error) => {
            console.error(error);
            toast.error("An error occurred. Please try again.");
            loading = false;
          });
        }

    }
    

    // Redirect
    let redirecting = false;

    $: if ($userData?.passwordLastUpdated && !redirecting) {
        redirecting = true;
        goto('/signup/avatar');
    }
  </script>
  
<Card.Root class="">
  <Card.Header>
    <Card.Title class="text-xl">Password</Card.Title>
    <Card.Description>Enter a password for your account.</Card.Description>
  </Card.Header>
  <Card.Content class="py-10">
      {#if !$userData?.passwordLastUpdated}
      <form class="">
        <Input
          autofocus
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
      {:else}
        <p class="my-6">You already have a password. Redirecting to avatar setup...</p>
      {/if}
  </Card.Content>
  <Card.Footer class="border-t px-6 py-4 flex justify-between">
      <Button variant="outline" class="text-muted-foreground" on:click={() => {signOut(auth); goto('/login')}}>Sign Out</Button>
      {#if !isValid}
        <Button variant="outline" class="cursor-not-allowed" disabled>Confirm</Button>
      {:else}
        <Button on:click={() => {confirmPassword(); goto('/signup/avatar')}} variant="default">Confirm</Button>
      {/if}
  </Card.Footer>
</Card.Root>

