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
    _id?:    string;
    nombre?: string;
    avatar?: string;
    email?:  string;
}
