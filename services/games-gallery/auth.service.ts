'use server';

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { db } from '@/lib/db'
import { User } from '@/app/generated/prisma'
import { redirect } from 'next/navigation'


async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({name, value, options}) => cookieStore.set(name, value, options))
                    } 
                    catch {

                    }
                },
            }
        }
    )
}

export async function getCurrentUser() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        console.log('No user is logged in:', error)
        return null
    }
  
  return data.user
}

export async function loginWithPassword(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email, password
    })

    if (error) throw new Error(error.message)

    if (error) {
        console.log(error);
        return null
    }
    redirect('/gallery');
    // return data.user
}
//
export async function createUser(email: string, username: string, password: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) throw new Error(error.message)
    if (!data.user) throw new Error("Sign up succeeded but no user was returned");

    await db.creator.create({
        data: {
            user_id: data.user.id,
            name: username,
        }, 
    })

    return data.user
}
//

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/gallery')
}
