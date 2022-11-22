import { Grid, Image } from '@mantine/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface IOrderableImageList {
  images: string[];
  form: any;
}

interface IOnDropEnd {
  droppableId: string;
  index: number;
}

const OrderableImageList = ({ images, form }: IOrderableImageList) => {
  const items = images.map((img, i) => (
    <Draggable key={`${i}-image`} index={i} draggableId={`${i}-image`}>
      {(provided) => (
        <Grid.Col 
          span={3} 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Image src={img} alt="Product image" />
        </Grid.Col>
      )}
    </Draggable>
  ));
  
  const reorderImages = (destination: IOnDropEnd | undefined, source: IOnDropEnd) => {
    form.reorderListItem('img_urls', { from: source.index, to: destination?.index });
  };

  return (
    <DragDropContext
        onDragEnd={({ destination, source }) => reorderImages(destination, source)}
    >
      <Droppable droppableId="image-list" direction="horizontal">
        {(provided) => (
          // @ts-ignore
          <Grid {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  )
};

export default OrderableImageList;