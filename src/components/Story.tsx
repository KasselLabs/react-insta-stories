import React, { useContext } from "react";
import { StoryProps, GlobalCtx } from "./../interfaces";
import GlobalContext from "./../context/Global";

const Story = (props: StoryProps) => {
  const globalContext = useContext<GlobalCtx>(GlobalContext);

  const { width, height, loader, header, storyStyles } = globalContext;

  const rendererMessageHandler = (type: string, data: any) => {
    switch (type) {
      case "UPDATE_VIDEO_DURATION":
        props.getVideoDuration(data.duration);
        return { ack: "OK" as "OK" };
    }
  };

  const getStoryContent = () => {
    let InnerContent = props.story.content;
    let config = { width, height, loader, header, storyStyles };
    return (
      <InnerContent
        action={props.action}
        isPaused={props.playState}
        story={props.story}
        config={config}
        messageHandler={rendererMessageHandler}
        isCurrentStory={props.isCurrentStory}
      />
    );
  };

  const containerVisibilityStyles = props.isCurrentStory
    ? {}
    : {
        opacity: 0,
      };

  return (
    <div style={{ ...styles.storyContainer, ...containerVisibilityStyles }}>
      <div style={{ ...styles.story, width: width, height: height }}>
        {getStoryContent()}
      </div>
    </div>
  );
};

const styles = {
  storyContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  story: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
  },
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
};

export default Story;
