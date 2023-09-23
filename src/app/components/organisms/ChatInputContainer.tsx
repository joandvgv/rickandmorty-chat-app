"use client";

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function ChatInputContainer(props: Props) {
  const formMethods = useForm({ mode: "all" });

  const onSubmit: SubmitHandler<FieldValues> = async (fieldsData, event) => {
    console.log(fieldsData, event);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="w-full">
        {props.children}
      </form>
    </FormProvider>
  );
}
