import { HStack, Image, Text, VStack, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import {
  FaCalendarAlt,
  FaCommentAlt,
  FaRedditAlien,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdAccessTime, MdSubject } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import { IoRemoveOutline } from "react-icons/io5";
import { AiFillDislike, AiFillEye, AiFillLike } from "react-icons/ai";
import { HiOutlineTrendingDown, HiOutlineTrendingUp } from "react-icons/hi";
import Surface from "./Surface";

const PostCard = ({ data, type }) => {
  return (
    <div style={{ marginBlock: 7 }}>
      <Surface bg="gray.900">
        <HStack alignItems="center">
          {type === "news" ? (
            <Image
              boxSize="80px"
              alt="Post"
              bg="transparent"
              src={data.urltoimage}
            />
          ) : (
            <Image
              boxSize="80px"
              alt="Post"
              bg="transparent"
              src="https://image.flaticon.com/icons/png/512/1395/1395654.png"
            />
          )}
          <VStack flexGrow={1} alignItems="flex-start">
            {type === "twitter" ? (
              <>
                <Text fontSize="lg" w="80%" align="left">
                  Posted By: {data.username}
                </Text>
                <Text fontSize="sm" color="gray" w="80%" align="left">
                  {data.name}
                </Text>
              </>
            ) : (
              <Text fontSize="lg" w="80%" align="left">
                {data.title}
              </Text>
            )}

            <HStack>
              {type === "news" && (
                <HStack>
                  <IoIosGlobe color="#4A5568" />
                  <Text>
                    <a href={data.url} target="_blank" rel="noreferrer">
                      {data.source}
                    </a>{" "}
                  </Text>
                </HStack>
              )}
              {type === "reddit" && (
                <HStack>
                  <FaRedditAlien color="#FF5722" />
                  <Text>
                    <a href={data.url} target="_blank" rel="noreferrer">
                      Reddit
                    </a>
                  </Text>
                </HStack>
              )}
              {type === "youtube" && (
                <HStack>
                  <FaYoutube color="#FF0000" />
                  <Text>
                    <a href="/" target="_self">
                      YouTube
                    </a>
                  </Text>
                </HStack>
              )}
              {type === "twitter" && (
                <HStack>
                  <FaTwitter color="#1da1f2" />
                  <Text>
                    <a href={data.link} target="_blank" rel="noreferrer">
                      Twitter
                    </a>{" "}
                  </Text>
                </HStack>
              )}
              <HStack spacing="0px">
                {data.polarity > 0 && (
                  <>
                    <HiOutlineTrendingUp color="green" />
                    <Tooltip
                      hasArrow
                      label="Polarity"
                      bg="gray.300"
                      color="black"
                    >
                      <Text color="green">Positive</Text>
                    </Tooltip>
                  </>
                )}
                {data.polarity === 0 && (
                  <>
                    <IoRemoveOutline color="#4A5568" />
                    <Tooltip
                      hasArrow
                      label="Polarity"
                      bg="gray.300"
                      color="black"
                    >
                      <Text color="#4A5568">Neutral</Text>
                    </Tooltip>
                  </>
                )}
                {data.polarity < 0 && (
                  <>
                    <HiOutlineTrendingDown color="red" />
                    <Tooltip
                      hasArrow
                      label="Polarity"
                      bg="gray.300"
                      color="black"
                    >
                      <Text color="red">Negative</Text>
                    </Tooltip>
                  </>
                )}
              </HStack>
              {type === "youtube" && (
                <HStack>
                  <>
                    <AiFillEye color="white" />
                    <Tooltip hasArrow label="Views" bg="gray.300" color="black">
                      <Text color="#4A5568">
                        {Math.round(data.views / 1000)}K+
                      </Text>
                    </Tooltip>
                  </>
                  <>
                    <AiFillLike color="#63B3ED" />
                    <Tooltip hasArrow label="Likes" bg="gray.300" color="black">
                      <Text color="#4A5568">
                        {Math.round(
                          data.liked > 1000 ? data.liked / 1000 : data.liked
                        )}
                        K
                      </Text>
                    </Tooltip>
                  </>
                  <>
                    <AiFillDislike color="red" />
                    <Tooltip
                      hasArrow
                      label="Dislikes"
                      bg="gray.300"
                      color="black"
                    >
                      <Text color="#4A5568">
                        {Math.round(
                          data.disliked > 1000
                            ? data.disliked / 1000
                            : data.disliked
                        )}
                        K
                      </Text>
                    </Tooltip>
                  </>
                  <>
                    <FaCommentAlt color="white" />
                    <Tooltip
                      hasArrow
                      label="Comments"
                      bg="gray.300"
                      color="black"
                    >
                      <Text color="#4A5568">
                        {Math.round(
                          data.comment_count > 1000
                            ? data.comment_count / 1000
                            : data.comment_count
                        )}
                        K+
                      </Text>
                    </Tooltip>
                  </>
                </HStack>
              )}
              {type === "twitter" && (
                <HStack>
                  <>
                    <AiFillLike color="#63B3ED" />
                    <Tooltip hasArrow label="Likes" bg="gray.300" color="black">
                      <Text color="#4A5568">
                        {Math.round(
                          data.nlikes > 1000
                            ? data.nlikes / 1000 + "K"
                            : data.nlikes
                        )}
                      </Text>
                    </Tooltip>
                  </>
                </HStack>
              )}
              {type === "reddit" && (
                <HStack>
                  <>
                    <AiFillEye color="white" />
                    <Tooltip hasArrow label="Score" bg="gray.300" color="black">
                      <Text color="#4A5568">
                        {Math.round(
                          data.score > 1000
                            ? data.score / 1000 + "K+"
                            : data.score
                        )}
                        K+
                      </Text>
                    </Tooltip>
                  </>
                  <>
                    <AiFillLike color="#63B3ED" />
                    <Tooltip hasArrow label="Ups" bg="gray.300" color="black">
                      <Text color="#4A5568">
                        {Math.round(
                          data.ups > 1000 ? data.ups / 1000 : data.ups
                        )}
                        K
                      </Text>
                    </Tooltip>
                  </>
                  <>
                    <AiFillDislike color="red" />
                    <Tooltip hasArrow label="Downs" bg="gray.300" color="black">
                      <Text color="#4A5568">
                        {Math.round(
                          data.downs > 1000 ? data.downs / 1000 : data.downs
                        )}
                        K
                      </Text>
                    </Tooltip>
                  </>
                  <>
                    <FaCommentAlt color="white" />
                    <Tooltip
                      hasArrow
                      label="Comment"
                      bg="gray.300"
                      color="black"
                    >
                      <Text color="#4A5568">
                        {Math.round(
                          data.num_comments > 1000
                            ? data.num_comments / 1000
                            : data.num_comments
                        )}
                        K+
                      </Text>
                    </Tooltip>
                  </>
                </HStack>
              )}
              <HStack>
                <MdSubject color="#e0e0e0" />
                <Tooltip
                  hasArrow
                  label="Subjectivity"
                  bg="gray.300"
                  color="black"
                >
                  <Text>{data.subjectivity.toFixed(2)}</Text>
                </Tooltip>
              </HStack>
            </HStack>
          </VStack>

          {data.date && (
            <>
              <FaCalendarAlt color="#2F855A" fontSize={22} />
              <Text fontSize="md">
                {moment(new Date(data.date)).format("DD-MM-YYYY")}
              </Text>
              <MdAccessTime color="#2F855A" fontSize={22} />
              <Text fontSize="md">
                {moment(new Date(data.date)).format("hh:mm A")}
              </Text>
            </>
          )}
          {data.publishedat && (
            <>
              <FaCalendarAlt color="#2F855A" fontSize={22} />
              <Text fontSize="md">
                {moment(new Date(data.publishedat)).format("DD-MM-YYYY")}
              </Text>
              <MdAccessTime color="#2F855A" fontSize={22} />
              <Text fontSize="md">
                {moment(new Date(data.publishedat)).format("hh:mm A")}
              </Text>
            </>
          )}
        </HStack>
        <div style={{ marginBlock: 12 }}>
          {data.body ? (
            <Text align="left">{data.body}</Text>
          ) : (
            type === "reddit" && <Text align="left">No Description</Text>
          )}
          {data.description ? (
            <Text align="left">{data.description}</Text>
          ) : (
            (type === "youtube" || type === "news") && (
              <Text align="left">No Description</Text>
            )
          )}
          {data.tweet ? (
            <Text align="left">{data.tweet}</Text>
          ) : (
            type === "twitter" && <Text align="left">No Tweet</Text>
          )}
        </div>
      </Surface>
    </div>
  );
};

export default PostCard;
