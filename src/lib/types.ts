export type Event = {
    title: string;
    description: string;
    date: Date;
    dateEnd: Date | undefined;
    activeReminder: boolean;
};
export type DatabaseEvents  = {
    date: string;
    id: number;
    title: string;
    activeReminder: boolean | null;
    description: string | null;
    createAt: string | null;
    createBy: string;
    dateEnd: string | null;
}[] | undefined