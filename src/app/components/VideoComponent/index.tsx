import { FC } from "react";
import Video from "next-video";

interface VideoComponentProps {
  key: string;
}

const VideoComponent: FC<VideoComponentProps> = ({ key }) => {
  return <Video src={`https://www.youtube.com/watch?v=${key}`} />;
};

export default VideoComponent;
