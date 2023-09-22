"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";
import { FormFieldWrapper } from "@/components/atoms/FormFieldWrapper";

const FIELD_NAME = "message";

export default function ChatInput() {
  const formContext = useFormContext();

  const registration = formContext?.register(FIELD_NAME, {});

  return (
    <FormFieldWrapper name={FIELD_NAME}>
      <Input
        id={FIELD_NAME}
        type="text"
        placeholder="Type a message"
        {...registration}
      />
    </FormFieldWrapper>
  );
}
