import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

async function decryptData(encryptedData, secretKey) {
  // Split the encrypted data into IV and encrypted text
  const [iv, encryptedText] = encryptedData.split(":");

  // Convert IV from hex to WordArray
  const ivWordArray = CryptoJS.enc.Hex.parse(iv);
  const encryptedWordArray = CryptoJS.enc.Hex.parse(encryptedText);

  // Perform decryption using the secret key
  try {
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedWordArray },
      CryptoJS.enc.Utf8.parse(secretKey), // Convert the key to WordArray
      { iv: ivWordArray }
    );

    // Convert decrypted data to string
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  } catch (err) {
    console.error("Decryption failed:", err);
    return null;
  }
}

// // Decrypt function on the frontend using AES-256-CBC
// async function decryptData(encryptedData, secretKey) {
//   // Split the encrypted data into IV and encrypted text
//   const [iv, encryptedText] = encryptedData.split(":");
//   const ivBuffer = new Uint8Array(Buffer.from(iv, "hex"));
//   const encryptedBuffer = Buffer.from(encryptedText, "hex");

//   // Import the secret key (which must be the same as used in the backend)
//   const key = await window.crypto.subtle.importKey(
//     "raw",
//     new TextEncoder().encode(secretKey), // Convert secret key to bytes
//     { name: "AES-CBC" },
//     false,
//     ["decrypt"]
//   );

//   // Perform the decryption
//   try {
//     const decryptedBuffer = await window.crypto.subtle.decrypt(
//       { name: "AES-CBC", iv: ivBuffer },
//       key,
//       encryptedBuffer
//     );

//     // Convert decrypted bytes to a string and return it
//     return new TextDecoder().decode(decryptedBuffer);
//   } catch (err) {
//     console.error("Decryption failed:", err);
//     return null;
//   }
// }

// export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
//   const response = await fetch(
//     "https://www.internal.cachelabs.io/oauth/profile",
//     {
//       method: "GET",
//       credentials: "include",
//     }
//   );
//   const data = await response.json();
//   return data;
// });

// Create an async thunk for logout

// function with the decryption of the isAdmin value
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetch(
    "https://www.internal.cachelabs.io/oauth/profile",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  // Assuming you have the encrypted isAdmin value in data.user.isAdmin
  const encryptedIsAdmin = data.user.isAdmin;

  // Use the secret key to decrypt the isAdmin field
  const secretKey = "internal-cache-labs@harsh1234567"; // Use the same secret key from the backend
  const decryptedIsAdmin = await decryptData(encryptedIsAdmin, secretKey);

  // Return the user data with decrypted isAdmin field
  const updatedData = {
    ...data,
    user: { ...data.user, isAdmin: decryptedIsAdmin },
  };

  return updatedData;
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const response = await fetch(
    "https://www.internal.cachelabs.io/oauth/logout",
    {
      method: "GET",
    }
  );

  if (response.ok) {
    console.log("Logout failed", response);
  }

  // return response.json();
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
