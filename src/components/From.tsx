
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { zodValidator } from '@tanstack/zod-form-adapter'
import { createEvent, formType, shareEvent } from './../../../sharedTypes.ts'
import { Field, useForm } from '@tanstack/react-form';
import { Button } from './ui/button.tsx';
import { Checkbox } from './ui/checkbox.tsx';
import { DialogTrigger } from './ui/dialog.tsx';
import { useEvents } from '@/hooks/useEvents.ts';
import PoppoverCalendarField from './PoppoverCalendarField.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { sharedEvent } from '@/lib/api.ts';


type FromProps = formType & {
  isSharing?: boolean;
};

function From({ date, dateEnd, currentPage, currentMonth, title, description, activeReminder, eventId, resetSelection, isSharing }: FromProps) {
  const { addEvent, updateEventAndRefreshData } = useEvents(currentMonth || new Date().getMonth());
  const form = useForm({
    defaultValues: {
      title: title || "",
      description: description || "",
      date: date || null,
      dateEnd: dateEnd,
      activeReminder: activeReminder || false,
      userSharedEvent: "",
      permissions: "all"
    },
    async onSubmit({ value }) {
      try {
        if (isSharing && eventId) {
          await sharedEvent(eventId, value.userSharedEvent, value.permissions)
        }
        if (!eventId) {
          await addEvent(value, currentPage!, currentMonth);
        }
        if (!isSharing && eventId) {
          updateEventAndRefreshData(eventId, value, currentPage!, currentMonth);
        }

      } catch (err) {
        
        alert(err);

      }
    }
  });
  return (
    
  )
}

export default From