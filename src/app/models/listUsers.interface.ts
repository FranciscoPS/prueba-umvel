export interface listUsers {
    page: string;
    per_page: string;
    total: string;
    total_pages: string;
    data: Array<user>
}

export interface user {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}