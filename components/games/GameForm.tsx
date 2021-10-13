import { Box, Button, Input, InputLabel, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface GameFormInput {
  title: string;
  description: string;
}

const GameForm: React.FC = () => {
  const { control, handleSubmit } = useForm<GameFormInput>();

  const onSubmit: SubmitHandler<GameFormInput> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    // <Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => {
          return (
            <>
              {/* <InputLabel>Title</InputLabel> */}
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
              {/* <InputLabel>Description</InputLabel> */}
              <TextField label="Description" {...field} />
            </>
          );
        }}
      />
      <Button type="submit">Create Game</Button>
    </form>
    // </Box>
  );
};

export default GameForm;
