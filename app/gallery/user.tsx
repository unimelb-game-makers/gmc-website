'use server'

import { redirect } from 'next/navigation'

import { loginWithPassword, logoutUser } from '@/services/games-gallery/auth.service'

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await loginWithPassword(email, password)

    redirect('/gallery')
}

export async function logout() {
    await logoutUser()
    redirect('/gallery')
}

 
