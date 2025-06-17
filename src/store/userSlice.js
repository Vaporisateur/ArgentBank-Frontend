import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk pour login
export const loginUser = createAsyncThunk(
  "user/loginUser", // Nom de l'action
  async ({ email, password }, { rejectWithValue }) => { // Fonction asynchrone prenant email et mot de passe
    try {
      // Envoi d'une requête POST à l'API de connexion avec les identifiants utilisateur
      const res = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Spécifie le format JSON
        body: JSON.stringify({ email, password }), // Corps de la requête avec email et mot de passe
      });
      // Récupération de la réponse JSON de l'API
      const data = await res.json();
      // Si la réponse n'est pas OK, on rejette avec le message d'erreur de l'API
      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      // Si la connexion réussit, on stocke le token dans le localStorage
      localStorage.setItem("token", data.body.token);
      // On retourne le token pour l'utiliser dans le state Redux
      return data.body.token;
    } catch (err) {
      // En cas d'erreur réseau ou autre, on rejette avec le message d'erreur
      return rejectWithValue(err.message);
    }
  }
);

// Thunk pour récupérer les infos utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile", // Nom de l'action
  async (token, { rejectWithValue }) => { // Fonction asynchrone prenant le token d'authentification
    try {
      // Effectue une requête GET vers l'API pour obtenir le profil utilisateur
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
        },
      });
      // Récupère la réponse JSON
      const data = await res.json();
      // Si la réponse n'est pas OK (statut HTTP hors 200-299), rejette avec le message d'erreur
      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      // Retourne le corps de la réponse (données utilisateur)
      return data.body;
    } catch (err) {
      // En cas d'erreur réseau ou autre, rejette avec le message d'erreur
      return rejectWithValue(err.message);
    }
  }
);

// Thunk pour mettre à jour le nom d'utilisateur
export const updateUserName = createAsyncThunk(
  // Nom de l'action Redux
  "user/updateUserName",
  // Fonction asynchrone qui prend un objet { token, userName }
  async ({ token, userName }, { rejectWithValue }) => {
    try {
      // Envoie une requête HTTP PUT à l'API pour mettre à jour le nom d'utilisateur
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT", // Méthode HTTP PUT pour la mise à jour
        headers: {
          "Content-Type": "application/json", // Indique que le corps est en JSON
          Authorization: `Bearer ${token}`,   // Ajoute le token d'authentification
        },
        body: JSON.stringify({ userName }),   // Corps de la requête avec le nouveau nom d'utilisateur
      });
      const data = await res.json(); // Récupère la réponse JSON de l'API
      if (!res.ok) {
        // Si la réponse n'est pas OK, rejette avec le message d'erreur de l'API
        return rejectWithValue(data.message);
      }
      // Retourne le body de la réponse (données utilisateur mises à jour)
      return data.body;
    } catch (err) {
      // En cas d'erreur réseau ou autre, rejette avec le message d'erreur
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({ // Création d'un "slice" Redux pour gérer l'état utilisateur
  name: "user", // Nom du slice
  initialState: { // État initial du slice
    token: localStorage.getItem("token") || null, // Jeton d'auth récupéré du localStorage ou null
    user: null, // Informations de l'utilisateur (sera rempli après connexion)
    error: null, // Message d'erreur éventuel
    profileFetched: false, // Indique si le profil utilisateur a été récupéré
  },
  reducers: { // Définition des reducers synchrones
    logout: (state) => { // Action de déconnexion
      state.token = null; // Supprime le token de l'état
      state.user = null; // Supprime les infos utilisateur
      state.profileFetched = false; // Réinitialise le statut du profil
      localStorage.removeItem("token"); // Supprime le token du localStorage
    },
  },
  extraReducers: (builder) => { // Gestion des actions asynchrones (thunks)
    builder
      .addCase(loginUser.pending, (state) => { // Quand la connexion commence
        state.error = null; // Réinitialise l'erreur
      })
      .addCase(loginUser.fulfilled, (state, action) => { // Connexion réussie
        state.token = action.payload; // Stocke le token reçu
        state.profileFetched = false; // Le profil n'est pas encore récupéré
      })
      .addCase(loginUser.rejected, (state, action) => { // Connexion échouée
        state.error = action.payload; // Stocke l'erreur reçue
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => { // Profil utilisateur récupéré
        state.user = action.payload; // Met à jour les infos utilisateur
        state.profileFetched = true; // Indique que le profil a été récupéré
      })
      .addCase(updateUserName.fulfilled, (state, action) => { // Mise à jour du nom d'utilisateur réussie
        state.user.userName = action.payload.userName; // Met à jour le nom d'utilisateur
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;