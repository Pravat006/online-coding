
export interface GoogleProfileWithJson {
    id: string;
    displayName: string;
    name?: { familyName: string; givenName: string };
    emails?: Array<{ value: string; verified: boolean }>;
    photos?: Array<{ value: string }>;
    provider: string;
    _raw: string;
    _json: {
        sub?: string;
        name: string;
        email: string;
        email_verified?: boolean;
        picture: string;
        given_name?: string;
        family_name?: string;
        locale?: string;
    };
}

// Type for the authentication callback function
export interface GoogleAuthCallback {
    (
        accessToken: string,
        refreshToken: string,
        profile: GoogleProfileWithJson,
        done: (error: any, user?: any) => void
    ): Promise<void>;
}

// JWT payload structure
export interface JWTPayload {
    userId: string;
    googleToken: string;
    iat?: number;
    exp?: number;
}



// Type for Prisma User model in the callback
export interface UserModel {
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

// Type for the user object stored in req.user after authentication
export interface AuthenticatedUser {
  user:{
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  },
  token: string;
}