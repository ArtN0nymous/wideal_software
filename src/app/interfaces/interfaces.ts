export interface ResponsePost {
    ok:     boolean;
    pagina: number;
    result: Post[];
}

export interface Post {
    _id?:     string;
    message?: string;
    imgs?:    string[];
    coords?:  string;
    user?:    User;
    created?: Date;
}
export interface User {
    providerId:  string;
    uid:         string;
    displayName?: null|string;
    email:       string|null;
    phoneNumber?: null|string|number;
    photoURL?:    null|string;
    avatar?: string;
}
export interface SingInResponse {
    user:           UserResponse;
    providerId:     null;
    _tokenResponse: TokenResponse;
    operationType:  string;
}

export interface TokenResponse {
    kind:         string;
    idToken:      string;
    email:        string;
    refreshToken: string;
    expiresIn:    string;
    localId:      string;
}

export interface UserResponse {
    uid:             string;
    email:           string;
    emailVerified:   boolean;
    isAnonymous:     boolean;
    providerData:    ProviderDatum[];
    stsTokenManager: StsTokenManager;
    createdAt:       string;
    lastLoginAt:     string;
    apiKey:          string;
    appName:         string;
}

export interface ProviderDatum {
    providerId:  string;
    uid:         string;
    displayName?: null|string;
    email:       string;
    phoneNumber?: null|number|string;
    photoURL?:    null|string;
}

export interface StsTokenManager {
    refreshToken:   string;
    accessToken:    string;
    expirationTime: number;
}
export interface UserProfile {
    following?:     string;
    displayName?:   string;
    url_photo?:     string;
    friends?:       string;
    followme?:      string;
    solicitudes?:   string;
    url_portada?:   string;
    color_portada?: string;
    chats?:         string;
    descripcion?:   string;
    email?:         string;
}
