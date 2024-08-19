import { format } from "date-fns";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

function PoppoverCalendarField({ field }: { field: any }) {
    return (
        <Popover modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] pl-3 text-left font-normal flex",
                        !field.state.value && "text-muted-foreground"
                    )}
                >
                    {field.state.value ? (
                        format(field.state.value, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    isDisabled={false}
                    onDayClick={(day) => {
                        field.handleChange(day);
                    }}
                    selected={field.state.value}
                    classNames={{
                        months: '',
                        head_row: '',
                        row: 'cursor-default',
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}
export default PoppoverCalendarField