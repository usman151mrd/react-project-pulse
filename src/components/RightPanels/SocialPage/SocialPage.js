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
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import PageTitle from "../../common/PageTitle";
import PostCard from "../../common/PostCard";
import Surface from "../../common/Surface";
import Expenses from "./components/Expenses";
import { Pagination } from "@material-ui/lab";
import LineGraph from "../../common/LineGraph";
import { useHistory } from "react-router-dom";
import { ERROR } from "../../../store/actions/message";
import { MdGraphicEq } from "react-icons/md";
const SocialPage = () => {
  const { state } = useLocation();
  const { name } = useParams();

  const project_details = useSelector((state) => state.Project.project_details);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [tagsArray, setTagsArray] = useState([]);
  const [text, setText] = useState("");
  const [filtration, setFiltration] = useState([]);
  const dispatch = useDispatch();
  const [sub, setSub] = useState(0);
  const [filterForm, setFilterForm] = useState({
    keyword: [],
    sentimental: [],
    subjectivity: 0,
    language: "",
  });
  console.log(filtration);
  const filteredData = (cards) => {
    let data = cards[name];
    let flag = true;
    if (filterForm.keyword.length > 0) {
      flag = false;
      let regexp = new RegExp(filterForm.keyword.join("|", "g"));
      if (name === "news" || name === "youtube") {
        data = data.filter(
          (item) =>
            regexp.test(item.title.toLowerCase()) ||
            regexp.test(item.description.toLowerCase())
        );
      }
      if (name === "reddit") {
        data = data.filter(
          (item) =>
            regexp.test(item.title.toLowerCase()) ||
            regexp.test(item.body.toLowerCase())
        );
      }
      if (name === "twitter")
        data = data.filter((item) => regexp.test(item.tweet.toLowerCase()));
    }
    if (
      filterForm.sentimental.length > 0 &&
      filterForm.sentimental.length < 3
    ) {
      flag = false;
      let datas = [];
      if (filterForm.sentimental.includes("Positive")) {
        datas = data.filter((item) => item.polarity > 0);
      }
      if (filterForm.sentimental.includes("Negative")) {
        datas = datas.concat(data.filter((item) => item.polarity < 0));
      }
      if (filterForm.sentimental.includes("Neutral")) {
        datas = datas.concat(data.filter((item) => item.polarity === 0));
      }
      data = datas;
    }
    if (filterForm.subjectivity > 0) {
      flag = false;
      data = data.filter((item) => item.subjectivity > filterForm.subjectivity);
    }
    if (filterForm.language) {
      flag = false;
      data = data.filter((item) => item.language === filterForm.language);
    }
    if (flag) {
      setFiltration(cards[name]);
      pageNumber(cards[name].length);
    } else {
      setFiltration(data);
      pageNumber(data.length);
    }

    console.log(
      "Data original length:",
      cards[name].length,
      "Filtered Data",
      data.length
    );
  };
  const data = {
    label: project_details?.lineGraph.label,
    [`${name}`]: project_details?.lineGraph[name],
  };
  console.log(project_details);
  useEffect(() => {
    if (!project_details) {
      history.push("/dashboard/project");
    }
  }, []);

  const pageNumber = (total) => {
    console.log("Reddit", total, total % 10);
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
  const handleOnChange = (e, page) => {
    let start = (page - 1) * 10;
    let total =
      start > filtration.length
        ? project_details.cards[name].length
        : start + 9;
    let result = [...project_details.cards[name]];
    console.log(start, total);
    result = result.slice(start, total);
    setFiltration(result);
  };
  useEffect(() => {
    if (project_details) {
      let sum = 0;
      for (var i of project_details.cards[name]) {
        sum = sum + i.subjectivity;
      }
      console.log(sum);
      setSub(sum);
      filteredData(project_details.cards);
    }
  }, [filterForm]);

  if (!project_details) {
    return <Text fontSize="4xl">No Result</Text>;
  } else
    return (
      <div className="tabs">
        <HStack alignItems="center" justifyContent="flex-start" w="100%">
          <div style={{ flexGrow: 1 }}>
            <PageTitle name={state.name} />
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
        <HStack spacing="21px" alignItems="flex-start">
          <Surface width="80%" height={500}>
            <LineGraph data={data} type={name} />
          </Surface>

          <VStack spacing="14px" width="full">
            <Expenses
              data={project_details.sentiment[name]["positive"]}
              title="Positive Sentiment"
            />
            <Expenses
              data={project_details.sentiment[name]["negative"]}
              title="Negative Sentiment"
            />
            <Expenses
              data={project_details.sentiment[name]["neutral"]}
              title="Neutral Sentiment"
            />
            <Expenses data={sub.toFixed(2)} title="Total Subjectivity" />
          </VStack>
        </HStack>
        <Text align="left" fontSize="2xl" my={2}>
          Total Feeds {filtration.length}
        </Text>

        <Surface>
          {filtration.map((item, index) => (
            <PostCard key={index} data={item} type={name} />
          ))}
          <HStack
            alignItems="center"
            justifyContent="flex-end"
            w="100%"
            className={name}
          >
            <Pagination
              count={total}
              color="primary"
              onChange={handleOnChange}
            />
          </HStack>
        </Surface>
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

export default SocialPage;
