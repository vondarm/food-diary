import { Stack, styled, SwipeableDrawer } from "@mui/material";
import { onModalDay, useModalDay } from "./data.ts";
import { DayDrawerContent } from "./DrawerContent.tsx";
import { grey } from "@mui/material/colors";

export const DayDrawer = () => {
  const day = useModalDay();

  return (
    <SwipeableDrawer
      onOpen={() => void 0}
      open={Boolean(day)}
      onClose={() => onModalDay(null)}
      anchor={"bottom"}
      disableSwipeToOpen
      slotProps={{
        paper: {
          style: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            alignItems: "center",
          },
        },
      }}
    >
      <Stack alignItems={"center"} direction={"column"} paddingTop={1}>
        <Puller />
      </Stack>
      {day && <DayDrawerContent day={day} />}
    </SwipeableDrawer>
  );
};

const Puller = styled("div")(() => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
}));
