export interface Speaker {
    id: string;
    topspeaker: boolean;
    firstname: string;
    lastname: string;
    image: string;
    category: Category;
    ribon: Ribon;
    company: string;
    about: string;
    socials: Social[];
}

export interface Category {
    class: string;
    title: string;
}

export interface Ribon {
    class: string;
    title: string;
    link: string;
    tile_long: string;
}

export interface Social {
    class: string;
    link: string;
}
