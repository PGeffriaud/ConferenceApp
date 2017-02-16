export interface Session {
    id: string;
    title: string;
    confRoom: string;
    desc: string;
    type: string;
    difficulty: number;
    all: boolean;
    lang: string;
    hour: string;
    video: string
    slides: string;
    speakers: string[];
}
