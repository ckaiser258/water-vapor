import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Game } from "../../generated/graphql";

export interface FolderFormInput {
  name: string;
  // Record<string, boolean> will let TS know that the resulting object will be { id: boolean } because of the enabled property
  games: Record<string, boolean>;
}

interface FolderFormProps {
  games: Game[];
}

const FolderForm: React.FC<FolderFormProps> = ({ games }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FolderFormInput>({
    defaultValues: {
      // Will need to modify the below for update functionality
      // games: games?.map((game) => ({
      //   id: game.id,
      //   enabled: false,
      //   title: game.title,
      // })),
    },
  });

  const onSubmit: SubmitHandler<FolderFormInput> = (data) => {
    // When passing to gql:
    // data.games.filter((game) => game.enabled).map((game) => game.id)
    console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => {
          return (
            <>
              <TextField label="Name" {...field} />
            </>
          );
        }}
      />
      {games.map((game) => (
        <Controller
          name={`games.${game.id}` as const}
          control={control}
          key={game.id}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label={game.title}
            />
          )}
        />
      ))}
      <Button type="submit">Create Folder</Button>
    </form>
  );
};

export default FolderForm;
