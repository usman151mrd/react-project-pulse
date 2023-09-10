import {
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";
import PostCard from "../../../common/PostCard";
import Surface from "../../../common/Surface";
import "./style.css";
const TabsData = ({ data: { reddit, news, youtube, twitter } }) => {
  const [total, setTotal] = useState();
  const [redditData, setRedditData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [youTubeData, setYouTubeData] = useState([]);
  // const [twitterData, setTwitterData] = useState([]);
  useEffect(() => {
    pageNumber(news.length);

    handleNewsOnChange(null, 1);
    // handleTwitterOnChange(null, 1);
    handleYouTubeOnChange(null, 1);
    handleRedditOnChange(null, 1);
  }, [news, reddit, news, youtube]);   //Add Twitter to dependency Array

  const handleNewsOnChange = (e, page) => {
    let start = (page - 1) * 10;
    let total = start > news.length ? news.length : start + 9;
    let result = [];
    result = news.slice(start, total);
    setNewsData(result);
  };

  // const handleTwitterOnChange = (e, page) => {
  //   let start = (page - 1) * 10;
  //   let total = start > twitter.length ? twitter.length : start + 9;
  //   let result = [];
  //   result = twitter.slice(start, total);
  //   console.log(page, start, total, result);
  //   setTwitterData(result);
  // };
  const handleYouTubeOnChange = (e, page) => {
    let start = (page - 1) * 10;
    let total = start > youtube.length ? youtube.length : start + 9;
    let result = [];
    result = youtube.slice(start, total);
    setYouTubeData(result);
  };
  const handleRedditOnChange = (e, page) => {
    let start = (page - 1) * 10;
    let total = start > reddit.length ? reddit.length : start + 9;
    let result = [];
    result = reddit.slice(start, total);
    setRedditData(result);
  };
  const pageNumber = (total) => {
    if (total % 10 !== 0) {
      let t = total % 10;
      t = total - t;
      t = t / 10;
      t = t + 1;
      setTotal(t);
    } else {
      setTotal(total / 10);
    }
  };
  return (
    <div className="tabs">
      <Surface>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab
              _selected={{ color: "white", bg: "facebook.500" }}
              onClick={() => {
                pageNumber(news.length);
              }}
            >
              News
            </Tab>
            {/*<Tab*/}
            {/*  _selected={{ color: "white", bg: "twitter.500" }}*/}
            {/*  onClick={() => {*/}
            {/*    pageNumber(twitter.length);*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Twitter*/}
            {/*</Tab>*/}
            <Tab
              _selected={{ color: "white", bg: "#FF0000" }}
              onClick={() => {
                pageNumber(youtube.length);
              }}
            >
              YouTube
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "#FF5722" }}
              onClick={() => {
                pageNumber(reddit.length);
              }}
            >
              Reddit
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text align="left" fontSize="2xl" my={2}>
                Total Feeds {news.length}
              </Text>
              {newsData.map((item, index) => (
                <PostCard key={index} data={item} type="news" />
              ))}
              <HStack alignItems="center" justifyContent="flex-end" w="100%">
                <Pagination
                  count={total}
                  color="primary"
                  onChange={handleNewsOnChange}
                />
              </HStack>
            </TabPanel>
            {/*<TabPanel>*/}
            {/*  <Text align="left" fontSize="2xl" my={2}>*/}
            {/*    Total Feeds {twitter.length}*/}
            {/*  </Text>*/}
            {/*  {twitterData.map((item, index) => (*/}
            {/*    <PostCard key={index} data={item} type="twitter" />*/}
            {/*  ))}*/}
            {/*  <HStack*/}
            {/*    alignItems="center"*/}
            {/*    justifyContent="flex-end"*/}
            {/*    w="100%"*/}
            {/*    className="twitter"*/}
            {/*  >*/}
            {/*    <Pagination*/}
            {/*      count={total}*/}
            {/*      color="primary"*/}
            {/*      onChange={handleTwitterOnChange}*/}
            {/*    />*/}
            {/*  </HStack>*/}
            {/*</TabPanel>*/}

            <TabPanel>
              <Text align="left" fontSize="2xl" my={2}>
                Total Feeds {youtube.length}
              </Text>
              {youTubeData.map((item, index) => (
                <PostCard key={index} data={item} type="youtube" />
              ))}
              <HStack
                alignItems="center"
                justifyContent="flex-end"
                w="100%"
                className="youtube"
              >
                <Pagination count={total} onChange={handleYouTubeOnChange} />
              </HStack>
            </TabPanel>
            <TabPanel>
              <Text align="left" fontSize="2xl" my={2}>
                Total Feeds {reddit.length}
              </Text>
              {redditData.map((item, index) => (
                <PostCard key={index} data={item} type="reddit" />
              ))}
              <HStack
                alignItems="center"
                justifyContent="flex-end"
                w="100%"
                className="reddit"
              >
                <Pagination count={total} onChange={handleRedditOnChange} />
              </HStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Surface>
    </div>
  );
};

export default TabsData;
