create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  user_role text;
begin
  -- Extract the role from app_metadata (defaults to 'user')
  user_role := coalesce(new.raw_app_meta_data->>'role', 'user');

  -- Only create a public Profile if the user is a standard 'user'
  if user_role = 'user' then
    insert into public."Creator" (id, name)
    values (new.id, split_part(new.email, '@', 1));
  end if;

  return new;
end;
$$;