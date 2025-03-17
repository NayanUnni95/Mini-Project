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

  const getUser = async () => {
    const result = await supabase.auth.getUser();
    console.log('getUser result: ', result);
    if (result.data && result.data.user) {
      return result.data.user;
    } else {
      return null;
    }
  };

  async function uploadImage(base64String, passkey, name) {
    const user = await getUser();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    // Convert base64 string to Blob
    function base64ToBlob(base64, mimeType) {
      const byteCharacters = atob(base64.split(',')[1]); // Remove metadata
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: mimeType });
    }

    const mimeType = base64String.split(';')[0].split(':')[1]; // Extract MIME type
    const fileBlob = base64ToBlob(base64String, mimeType);
    const fileName = `stego-${Date.now()}.png`; // Unique filename

    // Upload to Supabase Storage
    const filePath = `${user.id}/${fileName}`;
    const { data, error } = await supabase.storage
      .from('stego-images')
      .upload(filePath, fileBlob, {
        contentType: mimeType,
      });

    if (error) {
      console.error('Error uploading image:', error.message);
      return;
    }

    // Get the public URL of the image
    const imageUrl = `${supabase.storageUrl}/storage/v1/object/public/stego-images/${filePath}`;
    console.log('Image URL:', filePath);

    // Store image URL and passkey in Supabase DB
    const { error: dbError } = await supabase.from('stego_images').insert([
      {
        user_id: user.id,
        image_url: imageUrl,
        passkey,
        name: name,
        filePath: filePath,
      },
    ]);

    if (dbError) {
      console.error('Error storing data:', dbError.message);
    } else {
      console.log('Base64 image and passkey stored successfully!');
    }
  }

  const getUserImages = async () => {
    const user = await getUser();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    const { data, error } = await supabase
      .from('stego_images')
      .select('id, image_url, passkey, name, filePath')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching images:', error.message);
      return [];
    }

    return data;
  };

  const updatePasskey = async (imageId, newPasskey) => {
    const user = await getUser();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    const { error } = await supabase
      .from('stego_images')
      .update({ passkey: newPasskey })
      .eq('id', imageId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating passkey:', error.message);
    } else {
      console.log('Passkey updated successfully!');
    }
  };

  const deleteImage = async (imageId, imageUrl) => {
    const user = await getUser();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    // Extract file path from URL
    const filePath = imageUrl.split('/stego-images/')[1];

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('stego-images')
      .remove([filePath]);
    if (storageError) {
      console.error('Error deleting image from storage:', storageError.message);
      return;
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('stego_images')
      .delete()
      .eq('id', imageId)
      .eq('user_id', user.id);
    if (dbError) {
      console.error('Error deleting record:', dbError.message);
    } else {
      console.log('Image and record deleted successfully!');
    }
  };
  const generatePublicUrl = (filePath) => {
    const { data } = supabase.storage
      .from('stego-images')
      .getPublicUrl(filePath);
    // console.log(data.publicUrl);
    return data.publicUrl;
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
      value={{
        session,
        signUpNewUser,
        signInUser,
        signOut,
        getUser,
        uploadImage,
        getUserImages,
        updatePasskey,
        deleteImage,
        generatePublicUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
