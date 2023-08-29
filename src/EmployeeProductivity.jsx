import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Stat,
  StatArrow,
  StatNumber,
} from "@chakra-ui/react";
// Assets
// Custom components

export default function EmployeeProductivity() {
  const boxBg = "#FFF9ED";

  const [workOrderDoc, setworkOrderDoc] = useState([]);
  // const textColor = useColorModeValue("secondaryGray.900", "white");

  //   const getDoc = async () => {
  //     const data = await getDoctype("Work Order", '?fields=["*"]');

  //     if (data) {
  //       setworkOrderDoc(data.data);
  //     }
  //   };

  //   React.useEffect(() => {
  //     console.log("i fire once");

  //     getDoc();
  //     console.log(workOrderDoc);
  //   }, []);

  function getExpiredPlannedDate() {
    // let expiredItem = workOrderDoc.filter((item, i) => {
    //   let today = new Date().toLocaleDateString();
    //   let deliveryEndDate = new Date(
    //     item.planned_end_date
    //   ).toLocaleDateString();
    //   console.log("compare", today > deliveryEndDate);
    //   console.log(today, deliveryEndDate);
    //   return today > deliveryEndDate;
    // });
    // console.log({ expiredItem });
    // return expiredItem.length;
  }

  function getFormattedDate(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]} ${year}`;
  }

  // function getExpiredPlannedDate() {
  //   let expiredItem = workOrderDoc.filter(item => {
  //     let today = new Date();
  //     let deliveryEndDate = new Date(item.planned_end_date);

  //     console.log("compare", today > deliveryEndDate);
  //     console.log(getFormattedDate(today), getFormattedDate(deliveryEndDate));

  //     return today > deliveryEndDate;
  //   });

  //   console.log({ expiredItem });
  //   return expiredItem.length;
  // }

  const dateObject = new Date();

  let date = dateObject.toUTCString().slice(5, 16);

  return (
    <Box
      px={{ base: "10px", sm: "15", md: "25", lg: "30" }}
      width={"100%"}
      py={"0px"}
      rounded={"sm"}
      height="full"
    >
      {/* <Slider {...settings}> */}

      <Flex
        padding={"5px"}
        justifyContent={"space-between"}
        // alignItems={"center"}
        // justifyItems="stretch"
        height="100%"
        flexDirection={{ base: "column" }}
      >
        <Flex alignContent={""} width={{ sm: 1 / 5 }}>
          <Text color="gray.500" fontSize="16px" fontWeight="500" me="5px">
            {date}
          </Text>
        </Flex>
        <Box
          flexWrap="wrap"
          justifyContent={{ base: "center", sm: "space-between" }}
          // flex={2}
          height={{ base: "full" }}
          width={{ base: "100%" }}
          overflowX="auto"
          display={{ sm: "flex" }}
          ml={{ sm: "0px" }}
          flexDirection={{ base: "column", sm: "row" }}
          // gap={"4"}
          // alignContent={"center"}
          alignItems={"center"}
          // height={"90%"}
          // css={{
          //   "&::-webkit-scrollbar": {
          //     height: "8px",
          //   },
          //   "&::-webkit-scrollbar-thumb": {
          //     backgroundColor: "gray.600",
          //     borderRadius: "4px",
          //   },
          //   "&::-webkit-scrollbar-thumb:hover": {
          //     backgroundColor: "gray.800",
          //   },
          // }}
        >
          <Box
            margin={{ base: "0px" }}
            paddingX={"25px"}
            paddingY={"10px"}
            // backgroundColor={"red.100"}
            shadow={"md"}
            rounded={"lg"}
            height={"max-content"}
            // Prevent content from breaking into multiple lines
          >
            <Flex direction={"column"} alignItems={"center"} height="50%">
              <Text
                color="black"
                fontSize={{ base: "10px", sm: "16px" }}
                me="5px"
              >
                {"Work Orders"}
              </Text>
              <Stat>
                <Flex alignItems={"center"} justifyContent={"center"}>
                  {" "}
                  <StatNumber
                    color="green.500"
                    fontSize={{
                      base: "2xl",
                    }}
                  >
                    {/* {workOrderDoc.length} */} 30
                  </StatNumber>
                  <Box marginLeft={"5px"}>
                    <StatArrow type="increase" />
                    9.05%
                  </Box>
                </Flex>
              </Stat>

              <div className="flex flex-row gap-x-2">
                <Box borderRight={"1px solid #dadada"} paddingRight={"5px"}>
                  <Flex align="center" direction={"column"}>
                    <Text color="gray.500" fontSize="14px" me="5px">
                      {"Late "}
                    </Text>
                    <Text color="red.500" fontSize="14px" className="font-bold">
                      {0}
                    </Text>
                  </Flex>
                </Box>

                <Box>
                  <Flex align="center" direction={"column"}>
                    <Text color="gray.500" fontSize="14px" me="5px">
                      {"Affected "}
                    </Text>
                    <Text color="red.500" fontSize="14px" className="font-bold">
                      {3}
                    </Text>
                  </Flex>
                </Box>
              </div>
            </Flex>
          </Box>

          <Box
            margin={{ base: "10px" }}
            paddingX={"25px"}
            paddingY={"10px"}
            // backgroundColor={"red.400"}
            shadow={"md"}
            rounded={"lg"}
            height={"max-content"}
          >
            <Flex direction={"column"} alignItems={"center"}>
              <Text
                color="black"
                fontSize={{ base: "10px", sm: "16px" }}
                me="5px"
              >
                {"Production Target"}
              </Text>
              <Stat>
                <Flex alignItems={"center"} justifyContent={"center"}>
                  {" "}
                  <StatNumber
                    color="red.500"
                    fontSize={{
                      base: "2xl",
                    }}
                  >
                    {"55 %"}
                  </StatNumber>
                  {/* <Box marginLeft={"5px"}>
                    <StatArrow type="increase" />
                    5.05%
                  </Box> */}
                </Flex>
              </Stat>
              <div className="flex flex-row gap-x-2">
                {/* <Box borderRight={"1px solid #dadada"} paddingRight={"5px"}>
                  <Flex align="center" direction={"column"}>
                    <Text color="gray.500" fontSize="14px" me="5px">
                      {"Material "}
                    </Text>
                    <Text color="red.500" fontSize="14px" className="font-bold">
                      {"5 Lakh"}
                    </Text>
                  </Flex>
                </Box>

                <Box Box borderRight={"1px solid #dadada"} paddingRight={"5px"}>
                  <Flex align="center" direction={"column"}>
                    <Text color="gray.500" fontSize="14px" me="5px">
                      {"Labour "}
                    </Text>
                    <Text color="red.500" fontSize="14px" className="font-bold">
                      {"3 Lakh"}
                    </Text>
                  </Flex>
                </Box> */}

                <Box>
                  <Flex align="center" direction={"column"}>
                    <Text color="gray.500" fontSize="14px" me="5px">
                      {"Expected "}
                    </Text>
                    <Text
                      color="green.500"
                      fontSize="14px"
                      className="font-bold"
                    >
                      {"62 %"}
                    </Text>
                  </Flex>
                </Box>
              </div>
            </Flex>
          </Box>

          <Box
            margin={{ base: "10px" }}
            paddingX={"25px"}
            paddingY={"10px"}
            // backgroundColor={"red.400"}
            shadow={"md"}
            rounded={"lg"}
            height={"max-content"}
          >
            <Flex direction={"column"} alignItems={"center"}>
              <Text
                color="black"
                fontSize={{ base: "10px", sm: "16px" }}
                me="5px"
              >
                {"Units Produced"}
              </Text>
              <Stat>
                <Flex alignItems={"center"} justifyContent={"center"}>
                  {" "}
                  <StatNumber
                    color="green.500"
                    fontSize={{
                      base: "2xl",
                    }}
                  >
                    {"4,200"}
                  </StatNumber>
                  <Box marginLeft={"5px"}>
                    <StatArrow type="increase" />
                    5.05%
                  </Box>
                </Flex>
              </Stat>
              <div className="flex flex-row gap-x-2">
                {/* <Box borderRight={"1px solid #dadada"} paddingRight={"5px"}>
                  <Flex align="center" direction={"column"}>
                    <Text color="gray.500" fontSize="14px" me="5px">
                      {"Material "}
                    </Text>
                    <Text color="red.500" fontSize="14px" className="font-bold">
                      {"5 Lakh"}
                    </Text>
                  </Flex>
                </Box> */}

                <Box Box borderRight={"1px solid #dadada"} paddingRight={"5px"}>
                  <Flex align="center" direction={"column"}>
                    <Text color="gray.500" fontSize="14px" me="5px">
                      {"Approved "}
                    </Text>
                    <Text
                      color="green.500"
                      fontSize="14px"
                      className="font-bold"
                    >
                      {"4,000"}
                    </Text>
                  </Flex>
                </Box>

                <Box>
                  <Flex align="center" direction={"column"}>
                    <Text color="gray.500" fontSize="14px" me="5px">
                      {"Rejected (Defect) "}
                    </Text>
                    <Text color="red.500" fontSize="14px" className="font-bold">
                      {"200"}
                    </Text>
                  </Flex>
                </Box>
              </div>
            </Flex>
          </Box>

          <Box
            margin={{ base: "10px" }}
            paddingX={"25px"}
            paddingY={"10px"}
            backgroundColor={boxBg}
            shadow={"md"}
            rounded={"lg"}
            height={"max-content"}
          >
            <Stat>
              {" "}
              <Flex direction={"column"} alignItems={"center"}>
                <Text
                  color="black"
                  fontSize={{ base: "10px", sm: "16px" }}
                  me="5px"
                >
                  {"Workers Productivity"}
                </Text>

                <Flex alignItems={"center"} justifyContent={"center"}>
                  {" "}
                  <StatNumber
                    color="green.500"
                    fontSize={{
                      base: "2xl",
                    }}
                  >
                    {"95 %"}
                  </StatNumber>
                  <Box marginLeft={"5px"}>
                    <StatArrow type="increase" />
                    5.02%
                  </Box>
                </Flex>

                <div className="flex flex-row gap-x-2">
                  <Box borderRight={"1px solid #dadada"} paddingRight={"5px"}>
                    <Flex align="center" direction={"column"}>
                      <Text color="gray.500" fontSize="14px" me="5px">
                        {"Best "}
                      </Text>
                      <div className="flex flex-row">
                        <Text
                          color="black.500"
                          fontSize="14px"
                          fontWeight={700}
                        >
                          {"Nikhil"} &nbsp;
                        </Text>
                        <Text color="green.500" fontSize="14px">
                          <StatArrow type="increase" />
                          {"100%"}
                        </Text>
                      </div>
                    </Flex>
                  </Box>

                  <Box>
                    <Flex align="center" direction={"column"}>
                      <Text color="gray.500" fontSize="14px" me="5px">
                        {"Worst "}
                      </Text>
                      <div className="flex flex-row">
                        <Text
                          color="black.500"
                          fontSize="14px"
                          fontWeight={700}
                        >
                          {"Rahul"} &nbsp;
                        </Text>
                        <Text color="red.500" fontSize="14px">
                          <StatArrow type="decrease" />
                          {"45%"}
                        </Text>
                      </div>
                    </Flex>
                  </Box>
                </div>
              </Flex>
            </Stat>
          </Box>

          <Box
            margin={{ base: "10px" }}
            paddingX={"25px"}
            paddingY={"10px"}
            backgroundColor={boxBg}
            shadow={"md"}
            rounded={"lg"}
            height={"max-content"}
          >
            <Stat>
              {" "}
              <Flex direction={"column"} alignItems={"center"}>
                <Text
                  color="black"
                  fontSize={{ base: "10px", sm: "16px" }}
                  me="5px"
                >
                  {"Raw Material Level"}
                </Text>

                <Flex alignItems={"center"} justifyContent={"center"}>
                  {" "}
                  <StatNumber
                    color="green.500"
                    fontSize={{
                      base: "2xl",
                    }}
                  >
                    {"100 %"}
                  </StatNumber>
                  <Box marginLeft={"5px"}>
                    <StatArrow type="increase" />
                  </Box>
                </Flex>

                <div className="flex flex-row gap-x-2">
                  <Box borderRight={"1px solid #dadada"} paddingRight={"5px"}>
                    <Flex align="center" direction={"column"}>
                      <Text color="gray.500" fontSize="14px" me="5px">
                        {"Critical "}
                      </Text>
                      <div className="flex flex-row">
                        {/* <Text
                          color="black.500"
                          fontSize="14px"
                          fontWeight={700}
                        >
                          {"Steel"} &nbsp;
                        </Text> */}
                        <Text
                          color="red.500"
                          fontSize="14px"
                          fontWeight={"bold"}
                        >
                          {/* <StatArrow type="decrease" /> */}
                          {"20"}
                        </Text>
                      </div>
                    </Flex>
                  </Box>

                  <Box
                    Box
                    borderRight={"1px solid #dadada"}
                    paddingRight={"5px"}
                  >
                    <Flex align="center" direction={"column"}>
                      <Text color="gray.500" fontSize="14px" me="5px">
                        {"Reorder "}
                      </Text>
                      <div className="flex flex-row">
                        {/* <Text
                          color="black.500"
                          fontSize="14px"
                          fontWeight={700}
                        >
                          {"Fabric"} &nbsp;
                        </Text> */}
                        <Text
                          color="orange.500"
                          fontSize="14px"
                          fontWeight={"bold"}
                        >
                          {/* <StatArrow type="decrease" /> */}
                          {"37"}
                        </Text>
                      </div>
                    </Flex>
                  </Box>

                  <Box>
                    <Flex align="center" direction={"column"}>
                      <Text color="gray.500" fontSize="14px" me="5px">
                        {"Ordered "}
                      </Text>
                      <div className="flex flex-row">
                        {/* <Text
                          color="black.500"
                          fontSize="14px"
                          fontWeight={700}
                        >
                          {"Paint"} &nbsp;
                        </Text> */}
                        <Text
                          color="green.500"
                          fontSize="14px"
                          fontWeight={"bold"}
                        >
                          {/* <StatArrow type="decrease" /> */}
                          {"55"}
                        </Text>
                      </div>
                    </Flex>
                  </Box>
                </div>
              </Flex>
            </Stat>
          </Box>

          {/* <Box paddingX={"25px"} backgroundColor="white" rounded={"lg"}>
          <Flex direction={"column"} alignItems={"center"}>
            <Text color="black" fontSize="14px" me="5px">
              {"Raw Material -"}
            </Text>
            <Stat>
              <Flex alignItems={"center"} justifyContent={"center"}>
                {" "}
                <StatNumber
                  color="green.500"
                  fontSize={{
                    base: "2xl",
                  }}
                >
                  {"350"}
                </StatNumber>
                <Box marginLeft={"5px"}>
                  <StatArrow type="increase" />
                  5.05%
                </Box>
              </Flex>
            </Stat>

            <Flex align="center">
              <Text color="gray.500" fontSize="14px" me="5px">
                {"Critical level -"}
              </Text>
              <Text color="red.500" fontSize="14px">
                {50}
              </Text>
            </Flex>
            <Flex align="center">
              <Text color="gray.500" fontSize="14px" me="5px">
                {"Reorder level -"}
              </Text>
              <Text color="red.500" fontSize="14px">
                {5}
              </Text>
            </Flex>
            <Flex align="center">
              <Text color="gray.500" fontSize="14px" me="5px">
                {"Ordered -"}
              </Text>
              <Text color="red.500" fontSize="14px">
                {15}
              </Text>
            </Flex>
          </Flex>
        </Box> */}
        </Box>
      </Flex>
    </Box>
  );
}
