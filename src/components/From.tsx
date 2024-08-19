
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { zodValidator } from '@tanstack/zod-form-adapter'
import { createEvent, formType } from './../../../sharedTypes.ts'
import { useForm } from '@tanstack/react-form';
import { Button } from './ui/button.tsx';
import { Checkbox } from './ui/checkbox.tsx';
import { DialogTrigger } from './ui/dialog.tsx';
import { useEvents } from '@/hooks/useEvents.ts';
import PoppoverCalendarField from './PoppoverCalendarField.tsx';

type FromProps = formType & {
  resetSelection: () => void;
};

{/*TODO: TI PREGO SISTEMA GLI IMPORT */ }
function From({ date, dateEnd, currentPage, currentMonth, title, description, activeReminder, eventId, resetSelection }: FromProps) {
  const { addEvent, updateEventAndRefreshData } = useEvents();
  const form = useForm({
    defaultValues: {
      title: title || "",
      description: description || "",
      date: date || null,
      dateEnd: dateEnd,
      activeReminder: activeReminder || false,
    },
    async onSubmit({ value }) {
      try {
        if (!eventId) {
          await addEvent(value, currentPage, currentMonth);
        } else {
          updateEventAndRefreshData(eventId, value, currentPage, currentMonth);
          resetSelection()
        }
      } catch (err) {
        console.log(err);
        alert('Evento non aggiunto');

      }
    }
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}>
        <div className="my-3">
          <Label>
            Titolo Evento
          </Label>
          <form.Field
            name="title"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: createEvent.shape.title,
            }}
            children={(field) => (
              <Input
                className='mt-2'
                name={field.name}
                placeholder={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
        </div>
        <div className="my-3">
          <Label>
            Descrizione Evento
          </Label>
          <form.Field
            name="description"
            children={(field) => (
              <Input
                className='mt-2'
                name={field.name}
                placeholder={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
        </div>
        <div className="my-3 flex items-center ">
          <form.Field
            name="activeReminder"
            children={(field) => (
              <Checkbox
                className='mr-2 w-[16px] h-[16px]'
                name={field.name}
                onBlur={field.handleBlur}
                checked={field.state.value}
                onCheckedChange={(checked) => {
                  if (checked === 'indeterminate') {
                    field.handleChange(false);
                  } else {
                    field.handleChange(checked);
                  }

                }}
              />
            )}
          />
          <Label>
            Reminder
          </Label>
        </div>

        {eventId && (
          <div className="my-3">
            <Label>
              Data Inizio
            </Label>
            <form.Field
              name="date"
              children={(field) => {
                return (
                  <PoppoverCalendarField field={field} />
                )
              }}
              
            />
          </div>
        )}
        {eventId && (
          <div className="my-3">
            <Label>
              Data Fine
            </Label>
            <form.Field
              name="dateEnd"
              children={(field) => {
               return (
                <PoppoverCalendarField field={field} />
               )
              }}
            />
          </div>
        )}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <DialogTrigger asChild>
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            </DialogTrigger>

          )}
        />
      </form >
    </div >
  )
}

export default From