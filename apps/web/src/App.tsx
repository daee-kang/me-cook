import { Component, createEffect, createSignal } from 'solid-js';
import { supabase } from './auth/supabaseClient';
import { AuthSession } from '@supabase/supabase-js';
import Account from './auth/Accounts';
import Auth from './auth/Auth';

const App: Component = () => {
  const [session, setSession] = createSignal<AuthSession | null>(null);

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  });

  return (
    <div class="h-screen w-screen">
      {!session() ? <Auth /> : <Account session={session()!} />}
    </div>
  );
};

export default App;
