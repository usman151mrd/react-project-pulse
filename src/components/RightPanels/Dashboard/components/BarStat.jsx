import { Text, HStack } from "@chakra-ui/react";
import React from "react";
import {
  FaNewspaper,
  FaRedditAlien,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Sentimental from "../../../common/Sentimental";
import Surface from "../../../common/Surface";

const BarStat = ({ data }) => {
  return (
    <div>
      <Surface w="100%">
        <HStack alignItems="center" justifyContent="flex-start" w="100%">
          <FaNewspaper fontSize={18} />
          <Text fontSize="xl">News</Text>
        </HStack>
        <Sentimental
          positive={data.news["positive"]}
          negative={data.news["negative"]}
        />
        {/*<HStack alignItems="center" justifyContent="flex-start" w="100%">*/}
        {/*  <FaTwitter fontSize={18} />*/}
        {/*  <Text fontSize="xl">Twitter</Text>*/}
        {/*</HStack>*/}
        {/*<Sentimental*/}
        {/*  positive={data.twitter["positive"]}*/}
        {/*  negative={data.twitter["negative"]}*/}
        {/*/>*/}
        <HStack alignItems="center" justifyContent="flex-start" w="100%">
          <FaYoutube fontSize={18} />
          <Text fontSize="xl">YouTube</Text>
        </HStack>
        <Sentimental
          positive={data.youtube["positive"]}
          negative={data.youtube["negative"]}
        />
        <HStack alignItems="center" justifyContent="flex-start" w="100%">
          <FaRedditAlien fontSize={18} />
          <Text fontSize="xl">Reddit</Text>
        </HStack>
        <Sentimental
          positive={data.reddit["positive"]}
          negative={data.reddit["negative"]}
        />
      </Surface>
    </div>
  );
};

export default BarStat;
