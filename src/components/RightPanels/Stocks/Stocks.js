import { Button, HStack, Select, Text } from "@chakra-ui/react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ERROR } from "../../../store/actions/message";
import { GET_SELECTED_STOCKS, SET_STOCK } from "../../../store/actions/stock";
import PageTitle from "../../common/PageTitle";
import Surface from "../../common/Surface";
import Processing from "../../Processing";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: "black",
  },
  row: {
    color: "white",
  },
});
const Stock = () => {
  const selected_stock = useSelector((state) => state.Stock.selected_stock);
  const allProject = useSelector((state) => state.Project.allProject);
  const project_details = useSelector((state) => state.Project.project_details);
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalNegative, setTotalNegative] = useState(0);
  const [totalNeutral, setTotalNeutral] = useState(0);
  const sentimental = (key) => {
    let news = [];
    let youtube = [];
    let twitter = [];
    let reddit = [];
    console.log(key.name);
    let regexp = new RegExp(key.name, "gi");
    news = project_details.cards.news.filter(
      (item) =>
        regexp.test(item.title.toLowerCase()) ||
        regexp.test(item.description.toLowerCase())
    );
    youtube = project_details.cards.youtube.filter(
      (item) =>
        regexp.test(item.title.toLowerCase()) ||
        regexp.test(item.description.toLowerCase())
    );
    reddit = project_details.cards.reddit.filter(
      (item) =>
        regexp.test(item.title.toLowerCase()) ||
        regexp.test(item.body.toLowerCase())
    );
    twitter = project_details.cards.twitter.filter((item) =>
      regexp.test(item.tweet.toLowerCase())
    );
    console.log(reddit.length, twitter.length, youtube.length, news.length);
    let positive =
      reddit.filter((item) => item.polarity > 0.5).length +
      twitter.filter((item) => item.polarity > 0.5).length +
      youtube.filter((item) => item.polarity > 0.5).length +
      news.filter((item) => item.polarity > 0.5).length;
    let negative =
      reddit.filter((item) => item.polarity < 0.5).length +
      twitter.filter((item) => item.polarity < 0.5).length +
      youtube.filter((item) => item.polarity < 0.5).length +
      news.filter((item) => item.polarity < 0.5).length;
    let neutral =
      reddit.filter((item) => item.polarity === 0.5).length +
      twitter.filter((item) => item.polarity === 0.5).length +
      youtube.filter((item) => item.polarity === 0.5).length +
      news.filter((item) => item.polarity === 0.5).length;

    let data = { id: key.id, name: key.name, positive, negative, neutral };
    return data;
  };
  return (
    <div style={{ margin: 20 }} className="Stocks">
      <PageTitle name="My Stocks" />
      <Processing visible={model} title="Processing" />
      <Surface>
        <HStack alignItems="center" justifyContent="flex-start" w="100%">
          <Select
            placeholder="Select"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            value={keyword}
            style={{ backgroundColor: "#212529" }}
          >
            {allProject.map((project, i) => (
              <option
                style={{ backgroundColor: "#212529" }}
                key={i}
                value={project.keyword}
              >
                {project.keyword}
              </option>
            ))}
          </Select>
          <Button
            variant="solid"
            colorScheme="teal"
            onClick={() => {
              if (project_details) {
                setModel(true);
                dispatch(
                  GET_SELECTED_STOCKS(keyword, (v) => {
                    if (v) {
                      let a = [];
                      let positive = 0;
                      let negative = 0;
                      let neutral = 0;
                      for (var i of v) {
                        let b = sentimental(i);
                        a.push(b);
                        positive = positive + b.positive;
                        negative = negative + b.negative;
                        neutral = neutral + b.neutral;
                      }
                      setTotalNeutral(neutral);
                      setTotalNegative(negative);
                      setTotalPositive(positive);
                      setResult(a);
                    }

                    setModel(false);
                  })
                );
              } else {
                dispatch(ERROR("No Project Found!"));
              }
            }}
          >
            Search
          </Button>
        </HStack>
      </Surface>
      <HStack alignItems="center" w="100%" my={3}>
        <Surface p={2} width="100%">
          <Text fontSize="xl">{totalPositive}</Text>
          <Text fontSize="lg">Positive</Text>
        </Surface>
        <Surface p={2} width="100%">
          <Text fontSize="xl">{totalNegative}</Text>
          <Text fontSize="lg">Negative</Text>
        </Surface>
        <Surface p={2} width="100%">
          <Text fontSize="xl">{totalNeutral}</Text>
          <Text fontSize="lg">Neutral</Text>
        </Surface>
      </HStack>

      <Surface my={5}>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.header}>
              <TableRow>
                <TableCell className={classes.row}>Id</TableCell>
                <TableCell className={classes.row}>Stock</TableCell>
                <TableCell className={classes.row}>Positive</TableCell>
                <TableCell className={classes.row}>Negative</TableCell>
                <TableCell className={classes.row}>Neutral</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((row, i) => (
                <TableRow
                  style={{ cursor: "pointer" }}
                  key={i}
                  onClick={() => {
                    let a = [...selected_stock];
                    if (a.includes(row.name)) {
                      a = a.filter((tag) => tag !== row.name);
                    } else {
                      a.push(row.name);
                    }

                    dispatch(SET_STOCK(a));
                  }}
                >
                  <TableCell component="th" scope="row" className={classes.row}>
                    {row.id}
                  </TableCell>
                  <TableCell className={classes.row}>{row.name}</TableCell>
                  <TableCell className={classes.row}>{row.positive}</TableCell>
                  <TableCell className={classes.row}>{row.negative}</TableCell>
                  <TableCell className={classes.row}>{row.neutral}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Surface>
    </div>
  );
};

export default Stock;
