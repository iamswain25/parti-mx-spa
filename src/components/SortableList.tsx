import React from "react";
import { Grid, IconButton, makeStyles } from "@material-ui/core";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { Img } from "react-image";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => {
  return {
    padding: { padding: theme.spacing(1) },
    closePic: {
      right: 0,
      top: 0,
      position: "absolute",
      cursor: "pointer",
      width: theme.spacing(3),
      height: theme.spacing(3),
      backgroundColor: "rgba(0, 0, 0, 0.74)",
      borderRadius: 0,
      color: "white",
    },
    img: { objectFit: "cover", width: "100%", height: "100%" },
  };
});
const DragHandle = SortableHandle(({ images, className }: any) => (
  <div className={className}>
    <Img src={images} className={className} />
  </div>
));
const SortableItem = SortableElement(
  (props: { item: any; imageRemove: any; order: number }) => {
    const { item: f, imageRemove, order } = props;
    const classes = useStyles();
    function removeHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      imageRemove(order);
    }
    return (
      <Grid item style={{ width: 76, height: 76, position: "relative" }}>
        <DragHandle images={[f?.preview, f?.uri]} className={classes.img} />
        <IconButton onClick={removeHandler} className={classes.closePic}>
          <CloseIcon color="inherit" />
        </IconButton>
      </Grid>
    );
  }
);

const SortableList = SortableContainer(
  ({ items, imageRemove }: { items: any[]; imageRemove: any }) => {
    const classes = useStyles();
    return (
      <Grid container spacing={1} className={classes.padding}>
        {items.map((item: any, index: number) => (
          <SortableItem
            key={item.uri ?? item.name ?? index}
            order={index}
            index={index}
            item={item}
            imageRemove={imageRemove}
          />
        ))}
      </Grid>
    );
  }
);

export default SortableList;
