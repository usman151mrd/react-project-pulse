import {
  Box,
  Button,
  Checkbox,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdGraphicEq } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { ERROR } from "../../../store/actions/message";
import { GET_PROJECT_DETAILS_BY_ID } from "../../../store/actions/project";
import BarGraph from "../../common/BarGraph";
import LineGraph from "../../common/LineGraph";
import PageTitle from "../../common/PageTitle";
import PieGraph from "../../common/PieGraph";
import Sentimental from "../../common/Sentimental";
import Surface from "../../common/Surface";
import Loading from "../../Loading";
import BarStat from "./components/BarStat";
import TabsData from "./components/TabsData";
import Task from "./components/Task";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [filterForm, setFilterForm] = useState({
    keyword: [],
    sentimental: [],
    subjectivity: 0,
    language: "",
  });
  const [filtration, setFiltration] = useState({
    youtube: [],
    reddit: [],
    // twitter: [],
    news: [],
  });
  const dispatch = useDispatch();
  const { state } = useLocation();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [tagsArray, setTagsArray] = useState([]);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState([]);
  const filteredData = (cards) => {
    let youtube = cards.youtube;
    let news = cards.news;
    let reddit = cards.reddit;
    // let twitter = cards.twitter;
    let flag = true;
    if (filterForm.keyword.length > 0) {
      flag = false;
      console.log(filterForm.keyword);
      let regexp = new RegExp(filterForm.keyword.join("|", "g"));
      news = news.filter(
        (item) =>
          regexp.test(item.title.toLowerCase()) ||
          regexp.test(item.description.toLowerCase())
      );
      youtube = youtube.filter(
        (item) =>
          regexp.test(item.title.toLowerCase()) ||
          regexp.test(item.description.toLowerCase())
      );
      reddit = reddit.filter(
        (item) =>
          regexp.test(item.title.toLowerCase()) ||
          regexp.test(item.body.toLowerCase())
      );
      // twitter = twitter.filter((item) => regexp.test(item.tweet.toLowerCase()));
    }
    if (
      filterForm.sentimental.length > 0 &&
      filterForm.sentimental.length < 3
    ) {
      flag = false;
      let reddits = [];
      let youtubes = [];
      let newss = [];
      // let twitters = [];
      if (filterForm.sentimental.includes("Positive")) {
        reddits = reddit.filter((item) => item.polarity > 0);
        // twitters = twitter.filter((item) => item.polarity > 0);
        youtubes = youtube.filter((item) => item.polarity > 0);
        newss = news.filter((item) => item.polarity > 0);
      }
      if (filterForm.sentimental.includes("Negative")) {
        reddits = reddits.concat(reddit.filter((item) => item.polarity < 0));
        // twitters = twitters.concat(twitter.filter((item) => item.polarity < 0));
        youtubes = youtubes.concat(youtube.filter((item) => item.polarity < 0));
        newss = newss.concat(news.filter((item) => item.polarity < 0));
      }
      if (filterForm.sentimental.includes("Neutral")) {
        reddits = reddits.concat(reddit.filter((item) => item.polarity === 0));
        // twitters = twitters.concat(
        //   twitter.filter((item) => item.polarity === 0)
        // );
        youtubes = youtubes.concat(
          youtube.filter((item) => item.polarity === 0)
        );
        newss = newss.concat(news.filter((item) => item.polarity === 0));
      }
      youtube = youtubes;
      news = newss;
      // twitter = twitters;
      reddit = reddits;
    }
    if (filterForm.subjectivity > 0) {
      flag = false;
      news = news.filter((item) => item.subjectivity > filterForm.subjectivity);
      // twitter = twitter.filter(
      //   (item) => item.subjectivity > filterForm.subjectivity
      // );
      youtube = youtube.filter(
        (item) => item.subjectivity > filterForm.subjectivity
      );
      reddit = reddit.filter(
        (item) => item.subjectivity > filterForm.subjectivity
      );
    }
    if (filterForm.language) {
      flag = false;
      youtube = youtube.filter((item) => item.language === filterForm.language);
      news = news.filter((item) => item.language === filterForm.language);
      // twitter = twitter.filter((item) => item.language === filterForm.language);
      reddit = reddit.filter((item) => item.language === filterForm.language);
    }
    if (flag) {
      setFiltration(cards);
    } else {
      setFiltration({ news, youtube, reddit });   //Add Twitter Here
    }

    console.log(
      "YouTube Data original length:",
      cards.youtube.length,
      "Filtered Data",
      youtube.length
    );
    console.log(
      "News Data original length:",
      cards.news.length,
      "Filtered Data",
      news.length
    );
    // console.log(
    //   "Twitter Data original length:",
    //   cards.twitter.length,
    //   "Filtered Data",
    //   twitter.length
    // );
    console.log(
      "Reddit Data original length:",
      cards.reddit.length,
      "Filtered Data",
      reddit.length
    );
  };
  useEffect(() => {
    if (state.config) {
      dispatch(
        GET_PROJECT_DETAILS_BY_ID(state.config.id, (v) => {
          if (v) {
            setResult(v);
            filteredData(v.cards);
            setLanguage(v.language);
          }
          setLoading(true);
        })
      );
    } else {
      history.push("/dashboard/project");
    }
  }, []);
  useEffect(() => {
    if (result) {
      filteredData(result.cards);
    }
  }, [filterForm]);

  if (!loading) {
    return <Loading />;
  } else
    return (
      <div>
        {result ? (
          <>
            <HStack alignItems="center" justifyContent="flex-start" w="100%">
              <div style={{ flexGrow: 1 }}>
                <PageTitle name={state.config.title} />
              </div>

              <VStack>
                <Button
                  alignSelf="flex-end"
                  variant="solid"
                  colorScheme="teal"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Filter
                </Button>
                <div>
                  {tagsArray.map((item, i) => (
                    <Tag
                      size="lg"
                      key={i}
                      borderRadius="full"
                      variant="outline"
                      colorScheme="green"
                      m={2}
                    >
                      <TagLabel>{item}</TagLabel>
                    </Tag>
                  ))}
                </div>
              </VStack>
            </HStack>

            <Task data={result.posts} />

            <Stack direction={["column", "row"]} my={7}>
              {/* <GroupedBar data={result.lineGraph} /> */}
              <Surface w="65%">
                <div style={{ width: "100%", height: "81%" }}>
                  <BarGraph data={result.lineGraph} />
                </div>
                <Sentimental
                  positive={result.sentiment["positive sentiment"]}
                  negative={result.sentiment["negative sentiment"]}
                />
              </Surface>

              <div style={{ flexGrow: 1 }}>
                <BarStat data={result.sentiment} />
              </div>
            </Stack>
            <Stack direction={["column", "row"]} my={7} height={500}>
              {/* <MultiAxisLine data={result.lineGraph} /> */}
              <Surface w="65%">
                <LineGraph data={result.lineGraph} />
              </Surface>
              <Surface w="35%">
                {/* <DoughnutChart data={result.posts} /> */}
                <PieGraph data={result.posts} />
              </Surface>
            </Stack>
            <TabsData data={filtration} />
          </>
        ) : (
          <Text align="center" fontSize="6xl">
            No Result
          </Text>
        )}
        <Modal
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Filter Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                variant="filled"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Keyword"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (!filterForm.keyword.includes(text.toLowerCase())) {
                      let a = [...filterForm.keyword];
                      a.push(text.toLowerCase());
                      setFilterForm({
                        ...filterForm,
                        keyword: a,
                      });
                      setText("");
                    } else {
                      dispatch(ERROR("Keyword Already Exist!"));
                    }
                  }
                }}
              />
              {filterForm.keyword.map((item, i) => (
                <Tag
                  size="lg"
                  key={i}
                  borderRadius="full"
                  variant="outline"
                  colorScheme="green"
                  my={3}
                  mx={2}
                >
                  <TagLabel>{item}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      let a = [...filterForm.keyword];
                      a = a.filter((tag) => tag !== item);
                      setFilterForm({ ...filterForm, keyword: a });
                    }}
                  />
                </Tag>
              ))}
              <Text fontSize="lg" my={3}>
                Sentiment
              </Text>

              <HStack spacing={10}>
                <Checkbox
                  size="lg"
                  isChecked={filterForm.sentimental.includes("Positive")}
                  colorScheme="green"
                  onChange={() => {
                    let a = [...filterForm.sentimental];
                    if (!a.includes("Positive")) {
                      a.push("Positive");
                    } else {
                      a = a.filter((tag) => tag !== "Positive");
                    }
                    setFilterForm({ ...filterForm, sentimental: a });
                  }}
                >
                  Positive
                </Checkbox>
                <Checkbox
                  size="lg"
                  colorScheme="red"
                  isChecked={filterForm.sentimental.includes("Negative")}
                  onChange={() => {
                    let a = [...filterForm.sentimental];
                    if (!a.includes("Negative")) {
                      a.push("Negative");
                    } else {
                      a = a.filter((tag) => tag !== "Negative");
                    }
                    setFilterForm({ ...filterForm, sentimental: a });
                  }}
                >
                  Negative
                </Checkbox>
                <Checkbox
                  isChecked={filterForm.sentimental.includes("Neutral")}
                  size="lg"
                  colorScheme="gray"
                  onChange={() => {
                    let a = [...filterForm.sentimental];
                    if (!a.includes("Neutral")) {
                      a.push("Neutral");
                    } else {
                      a = a.filter((tag) => tag !== "Neutral");
                    }
                    setFilterForm({ ...filterForm, sentimental: a });
                  }}
                >
                  Neutral
                </Checkbox>
              </HStack>

              <Text fontSize="lg" my={3}>
                Subjectivity
              </Text>
              <HStack alignItems="center" justifyContent="flex-start" w="100%">
                <Slider
                  aria-label="slider-ex-4"
                  min={0}
                  max={1}
                  step={0.1}
                  defaultValue={0}
                  value={filterForm.subjectivity}
                  onChange={(value) => {
                    setFilterForm({ ...filterForm, subjectivity: value });
                  }}
                >
                  <SliderTrack bg="teal.100">
                    <SliderFilledTrack bg="tomato" />
                  </SliderTrack>
                  <SliderThumb boxSize={6}>
                    <Box color="tomato" as={MdGraphicEq} />
                  </SliderThumb>
                </Slider>
                <Text fontSize="lg">{filterForm.subjectivity}</Text>
              </HStack>
              {/* <Select
                my={3}
                placeholder="Select"
                onChange={(e) => {
                  console.log(e.target.value);
                  if (e.target.value) {
                  }
                  setFilterForm({ ...filterForm, language: e.target.value });
                }}
                value={filterForm.language}
              >
                {language.map((project, i) => (
                  <option key={i} value={project}>
                    {project}
                  </option>
                ))}
              </Select> */}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={() => {
                  let a = [];
                  a = filterForm.keyword;
                  a = a.concat(filterForm.sentimental);
                  if (filterForm.subjectivity > 0) {
                    a.push("Subjectivity: " + filterForm.subjectivity);
                  }
                  if (filterForm.language !== "") {
                    a.push("Language: " + filterForm.language);
                  }

                  setTagsArray(a);
                  setOpen(false);
                }}
              >
                Apply
              </Button>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
};

export default Main;
