import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DateRange, DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  isDisabled: boolean,
  rangedEvents?: { from: Date, to: Date }[],
  currentSelectedDay?: Date,
  currentSelectedRange?: DateRange | undefined,
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode = "multiple",
  rangedEvents,
  currentSelectedDay,
  currentSelectedRange,
  isDisabled = false,
  ...props
}: CalendarProps) {

    

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className, isDisabled ? "select-none" : "")}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-neutral-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-neutral-400",
        row: "flex w-full mt-2",
        cell: "h-10 w-12 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-neutral-100/50  first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50 dark:[&:has([aria-selected])]:bg-neutral-800",
        day: cn(
          buttonVariants(isDisabled ? { variant: "disabled" } : { variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 ",
          isDisabled ? "cursor-default" : "cursor-pointer",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900",
        day_today: "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50",
        day_outside:
          "day-outside text-neutral-500 opacity-50 aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500 aria-selected:opacity-30 dark:text-neutral-400 dark:aria-selected:bg-neutral-800/50 dark:aria-selected:text-neutral-400",
        day_disabled: "text-neutral-500 opacity-50 dark:text-neutral-400",
        day_range_middle:
          "aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      modifiers={{
        fullRange: rangedEvents!,
        from: rangedEvents?.filter(range => range.from !== undefined).map(range => range.from!) || [],
        to: rangedEvents?.filter(range => range.to !== undefined).map(range => range.to!) || [],
        currentDaySelected: currentSelectedDay!,
        selectedRange: currentSelectedRange!
      }}
      modifiersClassNames={{
        selected: '!bg-blue-400',
        from: '!rounded-l-full',
        to: "!rounded-r-full",
        fullRange: 'bg-gray-400 !w-[47px] !rounded-none',
        selectedRange: '!bg-blue-400 !w-[47px] !rounded-none',
        currentDaySelected: '!bg-[#46b59bbd] text-white',
      }}

      {...props}

    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
