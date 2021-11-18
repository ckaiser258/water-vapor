import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Folder } from "../../generated/graphql";

export interface GameFormInput {
  title: string;
  description: string;
  // Record<string, boolean> will let TS know that the resulting object will be { id: boolean } because of the enabled property
  folders: Record<string, boolean>;
}

interface GameFormProps {
  folders: Folder[];
}

const GameForm: React.FC<GameFormProps> = ({ folders }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GameFormInput>();

  const onSubmit: SubmitHandler<GameFormInput> = (data) => {
    // When passing to gql:
    // data.folders.filter((folder) => folder.enabled).map((folder) => folder.id)
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => {
          return (
            <>
              <TextField label="Title" {...field} />
            </>
          );
        }}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => {
          return (
            <>
              <TextField label="Description" {...field} />
            </>
          );
        }}
      />
      {folders.map((folder) => (
        <Controller
          name={`folders.${folder.id}` as const}
          control={control}
          key={folder.id}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label={folder.name}
            />
          )}
        />
      ))}
      <Button type="submit">Create Game</Button>
    </form>
  );
};

export default GameForm;
