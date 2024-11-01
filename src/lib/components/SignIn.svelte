
<script lang="ts">
    import SignInWithGoogle from "$lib/components/SignInWithGoogle.svelte";
    import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signInWithEmailAndPassword } from "firebase/auth";
    import { auth, user } from "$lib/firebase.js";
    import { info } from "$lib/info";
    import { onMount } from 'svelte';
    import { resumeSignup } from "$lib/utils";

    // UI
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { LoaderCircle, WandSparkles, KeyRound, Undo2 } from 'lucide-svelte';
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Accordion from "$lib/components/ui/accordion";
    import { toast } from "svelte-sonner";
    import * as HoverCard from "$lib/components/ui/hover-card";
	import { LinkPreview } from "bits-ui";

    // Magic link
    let email: string = "";
    let loading = false;

    async function sendMagicLink() {
        try {
            loading = true;
            // Validate email
            if (!email) {
                toast.error("Please enter an email address");
                loading = false;
                return;
            }
            // Validate email with regex
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                toast.error("Please enter a valid email address");
                loading = false;
                return;
            }
            await sendSignInLinkToEmail(auth, email, {
                url: window.location.href,
                handleCodeInApp: true,
            }).then(() => {
                // Save email to local storage
                localStorage.setItem("emailForSignIn", email);
            }).finally(() => {
                toast.success(`Magic link sent to ${email}`);
                loading = false;
            });
        } catch (error) {
            console.error(error);
        }
    };

    let dialogOpen: boolean = false;
    
    // Email and password
    let password: string = "";
    let accordionPassword: string = "";

    // Magic link or Password switch
    function switchBetweenMagicLinkAndPassword() {
        if (accordionPassword === "accordionPassword") {
          signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            resumeSignup(user, "/");
          }).catch((error) => {
            console.error(error);
            toast.error("Invalid email or password.");
          });
        } else {
          sendMagicLink();
      }
    }

    let continueWithPassword: boolean = false;

    function switchContinueWithPassword() {
        accordionPassword = !accordionPassword ? "accordionPassword" : "";
        continueWithPassword = !continueWithPassword;
    }
    
    let hovercardOpen: boolean = false;

    // onMount
    onMount(() => {
        // Redirect to resume signup
        if($user) {
            resumeSignup($user, "/");
        }
        // Magic link
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = localStorage.getItem("emailForSignIn");
            if (!email) {
                // click the dialog trigger
                dialogOpen = true;
            }
            if (email) {
                signInWithEmailLink(auth, email, window.location.href)
                    .then((result: any) => {
                        localStorage.removeItem("emailForSignIn"); // Clear email from storage.
                        resumeSignup(result.user, "/"); // Resume signup process
                    })
                    .catch((error: any) => {
                        console.error(error);
                        toast.error("Magic link invalid or outdated.");
                    });
            }
        }
    });
</script>

<div class="fixed inset-0 flex w-full justify-center items-center p-4 sm:p-6 !z-10">
    <Card.Root class="mx-auto max-w-96 w-full">
        <Card.Header>
          <Card.Title class="text-2xl">Login to {info.name}</Card.Title>
          <Card.Description>Select a login method.</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid gap-4">
            <div class="grid gap-2">
                <Label for="email" class="text-muted-foreground">Email</Label>
                <Input id="email" type="email" placeholder="Email" required bind:value={email}/>
            </div>
            <Accordion.Root bind:value={accordionPassword} class="border-0">
                <Accordion.Item value="accordionPassword" class="border-0">
                <Accordion.Content class="overflow-visible border-0">
                    <Label for="password" class="text-muted-foreground">Password</Label>
                    <div class="grid gap-2">
                    <Input id="password" type="password" placeholder="Password" bind:value={password}/>
                    </div>
                </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
            {#if accordionPassword === "accordionPassword"}
                <Button variant="default" class="" on:click={switchBetweenMagicLinkAndPassword}>
                    {#if loading}<LoaderCircle class="animate-spin inline w-4 h-4" />{:else}<KeyRound class="w-4 h-4 inline mr-1"/>{/if}
                    Login with Password
                </Button>
            {:else}
                <Button variant="outline" class="border-purple-500 w-full flex justify-center gap-2 bg-gradient-to-tl from-purple-500 via-purple-700 to-purple-800 text-white hover:text-white hover:bg-gradient-to-br transition-all {accordionPassword !== "accordionPassword" ? "-mt-6 mb-6" : ""}"
                on:click={switchBetweenMagicLinkAndPassword}>
                    {#if loading}<LoaderCircle class="animate-spin inline w-4 h-4 mr-1" />{:else}<WandSparkles class="w-4 h-4 inline mr-1"/>{/if}Send Magic Link
                </Button>
            {/if}
                {#if !continueWithPassword}
                 <Button variant="default" class="" on:click={switchContinueWithPassword}>
                    <KeyRound class="w-4 h-4 inline mr-1"/>
                    Continue with Password
                </Button>
                {:else}
                    <Button variant="outline" class="text-muted-foreground" on:click={switchContinueWithPassword}>
                        <Undo2 class="w-4 h-4 inline mr-1"/>
                        Go back
                    </Button>
                {/if}
            {#if !continueWithPassword}
                <SignInWithGoogle goTo="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" class="w-4 h-4 mr-1 inline"><path d="M228,128a100,100,0,1,1-22.86-63.64,12,12,0,0,1-18.51,15.28A76,76,0,1,0,203.05,140H128a12,12,0,0,1,0-24h88A12,12,0,0,1,228,128Z"></path></svg>
                    Continue with Google
                </SignInWithGoogle>
            {/if}
            <div class="flex items-center justify-end">
                <HoverCard.Root bind:open={hovercardOpen}>
                    <HoverCard.Trigger>
                        <button on:click={() => {hovercardOpen = !hovercardOpen}} class="font-normal inline-block text-xs underline text-muted-foreground">
                            Forgot password?
                        </button>
                    </HoverCard.Trigger>
                    <HoverCard.Content class="" sideOffset={-0.25}>
                        <LinkPreview.Arrow class="!border-border border-t border-l !z-40" size={8}></LinkPreview.Arrow>
                        <p class="text-sm">Log in with the magic link and set a new password in settings.
                        </p>
                    </HoverCard.Content>
                  </HoverCard.Root>
              </div>
            </div>
        </Card.Content>
    </Card.Root>
        <!--
        <Card.Content class="">
            <p class="my-6">You are already logged in.</p>
            <div class="my-10 py-4 px-6 flex items-center justify-start gap-4 border rounded-lg">
                <Avatar.Root class="hidden h-9 w-9 sm:flex">
                    <Avatar.Image src={$userData?.photoURL} alt="avatar" />
                    <Avatar.Fallback>
                        <img src="/user.jpeg" alt="avatarFallback">
                    </Avatar.Fallback>
                </Avatar.Root>
                <div class="flex flex-col gap-1 justify-start w-fit">
                    <p class="text-sm font-medium leading-none w-fit">{$userData?.username ? "@" : ""}{$userData?.username ?? $user.displayName}</p>
                    <p class="text-muted-foreground text-sm w-fit">{$user?.email}</p>
                </div>
            </div>
        </Card.Content>
        <Card.Footer class="border-t px-6 py-4 flex justify-start">
            <Button variant="outline" on:click={() => signOut(auth)}>Sign Out</Button>
        </Card.Footer>
        -->
  </div>
  
  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content class="m-4 sm:m-6">
      <Dialog.Header>
        <Dialog.Title>Verify your email</Dialog.Title>
        <Dialog.Description>
          <Input class="my-4" type="email" placeholder="m@email.com" bind:value={email} />
        </Dialog.Description>
        <Dialog.Close>
          <Button>Confirm</Button>
        </Dialog.Close>
      </Dialog.Header>
    </Dialog.Content>
  </Dialog.Root>