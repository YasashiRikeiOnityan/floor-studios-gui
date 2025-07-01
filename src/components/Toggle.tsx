import { Field, Label, Switch } from '@headlessui/react';

type ToggleProps = {
  enabled: boolean;
  setEnabled: () => void;
  label: string;
}

const Toggle = (props: ToggleProps) => {
  return (
    <Field className="flex items-center">
      <Switch
        checked={props.enabled}
        onChange={props.setEnabled}
        className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-blue-600"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
      <Label as="span" className="ml-3 text-sm cursor-pointer" onClick={props.setEnabled}>
        <span className="font-medium text-gray-900">{props.label}</span>
      </Label>
    </Field>
  )
}

export default Toggle;
