import { useState } from 'react';
import { isBefore, isEqual } from 'date-fns';
import { type ActiveModifiers } from 'react-day-picker';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export const useCalendar = () => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange[]>([{
    from: undefined,
    to: undefined,
  }]);
  const [isUserSelectingRange, setUserSelectingRange] = useState<Boolean>(false);
  const [currentFrom, setCurrentFrom] = useState<Date | undefined>(undefined);

  const handleDayClick = (selectedDay: Date) => {
    if (!isUserSelectingRange) {
      const isSelected = selectedDays.some(day => day.getTime() === selectedDay.getTime());
      if (isSelected) {
        setSelectedDays(selectedDays.filter(day => day.getTime() !== selectedDay.getTime()));
      } else {
        setSelectedDays([...selectedDays, selectedDay]);
      }
    }
  };

  const handleDayClickKeyUp = (selectedDay: Date, a: ActiveModifiers, e: React.KeyboardEvent) => {
    if (e.key == 'Shift' && isUserSelectingRange && currentFrom !== undefined) {
      for (let i = 0; i < selectedRange.length; i++) {
        if (selectedRange[i].from !== undefined && selectedRange[i].to !== undefined && (isEqual(selectedRange[i].from!, currentFrom) && isEqual(selectedRange[i].to!, selectedDay) || isEqual(selectedRange[i].to!, currentFrom) && isEqual(selectedRange[i].from!, selectedDay))) {
          setSelectedRange((prevRanges) => {
            return prevRanges.filter((_, index) => index !== i);
          })
          break;
        }

        if (currentFrom.getTime() === selectedDay.getTime()) {
          setSelectedRange((prev) => {
            const newRange = [...prev]
            newRange[i] = {
              from: undefined,
              to: undefined
            }
            return newRange
          })
          break;
        }
        if (selectedRange[i].to === undefined) {
          setSelectedRange((prev) => {
            const newRange = [...prev]
            newRange[i] = {
              from: currentFrom,
              to: selectedDay
            }
            return newRange
          });
        }
        if (selectedRange[i].to === undefined && isBefore(selectedDay, currentFrom)) {
          setSelectedRange((prev) => {
            const newRange = [...prev]
            newRange[i] = {
              from: selectedDay,
              to: currentFrom
            }
            return newRange
          })
        }
        setSelectedRange((prevRanges) => {
          const newRange = [...prevRanges];
          const lastRange = newRange[newRange.length - 1];
          if (lastRange.from !== undefined && lastRange.to !== undefined) {
            newRange.push({
              from: undefined,
              to: undefined,
            });
          }
          return newRange;
        });
      }
      setCurrentFrom(undefined)
      setUserSelectingRange(false)
    }
  };

  const handleDayClickKeyDown = (selectedDay: Date, activeModifiers: ActiveModifiers, e: React.KeyboardEvent) => {
    if (e.key == 'Shift' && !isUserSelectingRange && currentFrom == undefined) {
      setUserSelectingRange(true)
      setCurrentFrom(selectedDay)
    }
    setSelectedDays(selectedDays.filter(day => day.getTime() !== selectedDay.getTime()));
  }

  return {
    selectedDays,
    selectedRange,
    handleDayClick,
    handleDayClickKeyUp,
    handleDayClickKeyDown
  };
};
