import { useState } from "react";

interface NewFileFormData {
  fileName: string;
}

interface NewFileFormProps {
  onSubmit: (formData: NewFileFormData) => void;
}

function NewFileForm(props: NewFileFormProps) {
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    props.onSubmit(formData);
  };

  const [formData, setFormData] = useState({ fileName: "" });

  return (
    <form className="new-file-form" onSubmit={handleSubmit}>
      📄{" "}
      <input
        type="text"
        placeholder="File name"
        onChange={(ev) => {
          setFormData({ fileName: ev.target.value });
        }}
      />
    </form>
  );
}

export { NewFileForm };
export type { NewFileFormData };
