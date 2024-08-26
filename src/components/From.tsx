
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
  resetSelection: () => void;
  isSharing?: boolean;
};

function From({ date, dateEnd, currentPage, currentMonth, title, description, activeReminder, eventId, resetSelection, isSharing }: FromProps) {
  const { addEvent, updateEventAndRefreshData } = useEvents();
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
        resetSelection()

      } catch (err) {
        
        alert(err);

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
                disabled={isSharing}
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
                disabled={isSharing}
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
                id='reminder'
                className='mr-2 w-[16px] h-[16px]'
                name={field.name}
                disabled={isSharing}
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
          <Label htmlFor='reminder'>
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
                  <PoppoverCalendarField field={field} disabled={isSharing} />
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
                  <PoppoverCalendarField field={field} disabled={isSharing} />
                )
              }}
            />
          </div>
        )}
        {isSharing && (
          <div className="my-3">
            <Label>
              Email dell utente a cui condividere l'evento
            </Label>
            <form.Field
              validatorAdapter={zodValidator()}
              validators={{
                onChange: shareEvent.shape.sharedToEmail,
              }}
              name="userSharedEvent"
              children={(field) => (
                <Input
                  autoFocus={true}
                  className='mt-2'
                  name={field.name}
                  placeholder={"example@domain.com"}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>
        )}
        {isSharing && (
          <div className="">
            <Label>
              Permessi
            </Label>
            <form.Field
              name="permissions"
              validatorAdapter={zodValidator()}
              validators={
                {
                  onChange: shareEvent.shape.permission,
                  onBlur: shareEvent.shape.permission
                }
              }
              children={(field) => (

                <Select
                  defaultValue='all'
                  onValueChange={(e) => field.handleChange(e)}>
                  <SelectTrigger className="w-[180px] mb-3">
                    <SelectValue placeholder="Permissions" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="view">Only view</SelectItem>
                    <SelectItem value="modify">Modify</SelectItem>
                    <SelectItem value="sharable">Share</SelectItem>
                  </SelectContent>
                </Select>
              )}
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