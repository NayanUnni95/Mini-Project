import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/utils/supabaseClient';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  //   console.log(session);

  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
    });
    if (error) {
      console.log('There was an error in signup : ', error);
      return { success: false, error };
    }
    // console.log(data);

    return { success: true, data };
  };

  const signOut = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.log('There was an error in Signout : ', error);
    }
  };

  const signInUser = (email, password) => {
    try {
      const { data, error } = supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log(error);

      console.log('SignIn success : ', data);
      return { success: true, data };
    } catch (error) {
      console.log('There was an error in signin : ', error);
      return { success: false, error };
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signInUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
