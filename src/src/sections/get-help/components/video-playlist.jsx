import Box from '@mui/material/Box';

import VideoPlayListCards from 'src/components/video-play-list-card/video-playlist-card';

// ----------------------------------------------------------------------

export function VideoPlayList({ title, list, ...other }) {
  const videoData = [
    { title: 'How to use Pabbly Chatflow', videoId: 'CoIfgN0tfhE', time: '07 Min 23 Sec' },
    { title: 'Video 2', videoId: 'CoIfgN0tfhE', time: '07 Min 23 Sec' },
    { title: 'Video 3', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 4', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 5', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 6', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 7', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 8', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 9', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 10', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 11', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 12', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 13', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 14', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 15', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
    { title: 'Video 16', videoId: 'your-youtube-video-id', time: '07 Min 23 Sec' },
  ];

  return (
    <Box
      sx={{
        mt: 3,
        gap: 3,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
      }}
      {...other}
    >
      {videoData.map((video, index) => (
        <VideoPlayListCards
          key={index}
          Videotitle={video.title}
          buttonText="Watch Now"
          thumbnailimage="Pabbly Broadcast Card.png"
          videoId={video.videoId}
          videoTime={video.time}
        />
      ))}
    </Box>
  );
}
