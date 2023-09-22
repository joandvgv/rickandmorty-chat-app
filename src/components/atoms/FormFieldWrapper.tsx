import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { useFormState } from "react-hook-form";

type Props = {
  message: string;
};

function FormFieldError(props: Props) {
  return (
    <p className="ml-1 font-content text-sm text-sv-red">{props.message}</p>
  );
}

type FormFieldWrapperProps = {
  name: string;
  children: ReactNode;
};

export function FormFieldWrapper(props: FormFieldWrapperProps) {
  const formState = useFormState();

  return (
    <div>
      {props.children}
      <ErrorMessage
        name={props.name}
        errors={formState.errors}
        render={(props) => (
          <div className="mt-2 flex items-center">
            <FormFieldError {...props} />
          </div>
        )}
      />
    </div>
  );
}
