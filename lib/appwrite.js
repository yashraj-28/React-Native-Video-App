import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.yashraj.videoapp",
  projectId: "670ee947000dec327396",
  databaseId: "670eeaf10014531c520c",
  userCollectionId: "670eeb1f000ac1542b0f",
  videoCollectionId: "670eeb4a00149a2c1eb4",
  storageId: "670eec73000d7a13b891",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw Error;
    }

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    // First, check if there is already an active session
    const currentSession = await account.get(); // Check if a session exists

    console.log("User is already logged in:", currentSession);
    return currentSession; // Return existing session
  } catch (error) {
    // Handle the case where no session is active (user is not logged in)
    if (error.code === 401) {
      // 401 means no active session
      try {
        // Create a new session if not logged in
        const session = await account.createEmailPasswordSession(
          email,
          password
        );
        console.log("Session created successfully:", session);
        return session;
      } catch (sessionError) {
        console.log("Error creating session:", sessionError);
        throw new Error(sessionError.message);
      }
    } else {
      // Other types of errors
      console.log("Error checking existing session:", error);
      throw new Error(error.message);
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
