import {z} from "zod";

export type Event = {
    title: string;
    description: string;
    date: Date;
    dateEnd: Date | undefined;
    activeReminder: boolean;
};
export type DatabaseEvents = {
    id: number;
    title: string;
    date: string;
    description: string | null;
    dateEnd: string | null;
    activeReminder: boolean | null;
    sharedTo: string | null;
    sharedFrom: string | null;
    actions: string | null;
} | undefined

export type formType = {
    date?: Date,
    dateEnd?: Date | undefined,
    currentPage?: number | null,
    currentMonth?: number,
    title?: string,
    description?: string,
    activeReminder?: boolean,
    eventId?: number,
    currentYear?: number,
}

export const shareEvent = z.object({
    permission:z.union([z.literal("all"), z.literal("view"),z.literal("modify"),z.literal("sharable")]),
    sharedToEmail: z.string().email().optional(),
})
  