const { default: axios } = require("axios");

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

const getVideos = async (query) => {
  const params = {
    part: "snippet", // Fixed typo
    q: query,
    maxResult: 2, // Fixed plural typo,
    type:'video',
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY, // Use correct env variable
  };

  const resp = await axios.get(YOUTUBE_BASE_URL + "/search", { params });

  return resp.data.items;
};

export default {
  getVideos,
};
