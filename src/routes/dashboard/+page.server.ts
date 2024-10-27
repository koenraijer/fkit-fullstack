import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { user, userData } from '$lib/firebase';

export const load = (async () => {
    // if (!userData && !user) {
    //     redirect(307, '/');
    // } else if (!userData && user) {
    //     redirect(307, '/signup');
    // }
    return {};
}) satisfies PageServerLoad;

