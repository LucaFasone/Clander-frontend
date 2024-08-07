import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { zodValidator } from '@tanstack/zod-form-adapter'
import { createEvent } from './../../../sharedTypes.ts'
import { useForm } from '@tanstack/react-form';
import { Button } from './ui/button.tsx';
import { Checkbox } from './ui/checkbox.tsx';
import { DialogTrigger } from './ui/dialog.tsx';
import { useEvents } from '@/hooks/useEvents.ts';

{/*TODO: TI PREGO SISTEMA GLI IMPORT */ }

function From({ date, dateEnd }: { date: Date, dateEnd: Date | undefined }) {
  const {addEvent } = useEvents();

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      date: date,
      dateEnd: dateEnd,
      activeReminder: false,
    },
    async onSubmit({ value }) {
      try{  
        await addEvent(value);
      } catch(err){
        alert('Evento non aggiunto');

      }
    }

  });
  return (
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
    </form>
  )
}

export default From