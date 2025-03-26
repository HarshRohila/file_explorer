import { useState } from "react";

interface NewFolderFormData {
  folderName: string;
}

interface NewFolderFormProps {
  onSubmit: (formData: NewFolderFormData) => void;
}

function NewFolderForm(props: NewFolderFormProps) {
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    props.onSubmit(formData);
  };

  const [formData, setFormData] = useState<NewFolderFormData>({
    folderName: "",
  });

  return (
    <form className="new-file-form" onSubmit={handleSubmit}>
      📁{" "}
      <input
        type="text"
        placeholder="Folder name"
        onChange={(ev) => {
          setFormData({ folderName: ev.target.value });
        }}
      />
    </form>
  );
}

export { NewFolderForm };
export type { NewFolderFormData };
