import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Wrap,
  Image,
  Heading,
  Button,
  GridItem,
  Grid,
  WrapItem,
  Flex,
  Text,
  VStack,
  Divider,
  HStack,
  Stack,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Container,
  List,
  Center,
} from "@chakra-ui/react";
// import GuapZlogo from '../../assets/GuapZlogo.png';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import "./CashierDashboard.css";
import axios from "axios";
import { Url } from "../../Pages/Core";
import StoreContext from "../../ContextApi";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CashierDashboard() {
  const [Client, setClient] = useState("");
  const [Employee, setEmployee] = useState("");
  const [AysneRider, setAysneRider] = useState("");
  const [PaymentData, setPaymentData] = useState("");
  const RoleDetails = useContext(StoreContext);

  let CashierObjId = RoleDetails.UserData._id;

  console.log(RoleDetails.UserData._id, "localRole");
  useEffect(() => {
    totalClient();
    totalPayment();
    aysneClient();
    totalRider();
  }, []);

  function aysneClient() {
    axios({
      method: "post",
      url: Url + "/dash/multiFilteredClient",
      // url: Url + "/dash/multiFilteredemployee",
      data: {
        filter: {
          AssignedBy: CashierObjId,
        },
      },
    })
      .then((res) => {
        // console.log(res.data, "razassss");
        setAysneRider(res.data.count);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }

  function totalRider() {
    axios({
      method: "post",
      url: Url + "/dash/multiFilteredemployee",
      data: {
        filter: {
          createdBy: RoleDetails.UserData.createdBy,
        },
      },
    })
      .then((res) => {
        // console.log(res.data.count, "Total Rider");
        setEmployee(res.data);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }

  function totalClient() {
    axios({
      method: "post",
      // url: Url + "/dash/multiFilteredClient",
      url: Url + "/dash/multiFilteredClient",
      data: {
        filter: {
          BelongsTo: RoleDetails.UserData.createdBy,
        },
      },
    })
      .then((res) => {
        console.log(res.data, "Total Client");
        setClient(res.data.count);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }

  function totalPayment() {
    axios({
      method: "post",
      url: Url + "/dash/multiFilteredPayment",
      data: {
        filter: {
          BelongsTo: CashierObjId,
        },
      },
    })
      .then((res) => {
        // console.log(res.data.count, "raza");
        setPaymentData(res.data);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }

  let data = {
    labels: [
      "Cheque",
      "Cash",
      //  'Yellow', 'Green', 'Purple', 'Orange'
    ],
    datasets: [
      {
        // label: '# of Votes',
        data: [
          PaymentData.TotalCheqAmount,
          PaymentData.TotalCashAmount,
          // 12, 19, 3, 5, 2, 3
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let data1 = {
    labels: [
      "Verify",
      "Unverified",
      // 'Yellow', 'Green', 'Purple', 'Orange'
    ],
    datasets: [
      {
        // label: '# of Votes',
        data: [
          // 10,9
          PaymentData.verify,
          PaymentData.Unverified,
          //  3, 5, 2, 3
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Container maxW="container" p="10" rounded="lg" bg="#F0F2F5">
      <Box
        boxShadow="2xl"
        rounded="md"
        padding="5%"
        backgroundColor="#EDF2F7"
        justifyItems="center"
        alignItems="center"
      >
        <Flex justifyContent="space-evenly" alignItems="center">
          <Wrap spacing="60px">
            <WrapItem>
              <Stack
                w="220px"
                h="140px"
                backgroundColor="#8EB9BB"
                borderRadius={20}
              >
                <Text
                  h="70px"
                  backgroundColor="#1A7175"
                  borderTopRadius={20}
                  textAlign="center"
                  p={7}
                  fontSize={23}
                  fontWeight="bold"
                  color="white"
                >
                  Total Clients
                  <Text
                    mt={4}
                    borderBottomRadius={10}
                    textAlign="center"
                    fontSize={35}
                    fontWeight="bold"
                    color="#1A7175"
                  >
                    {Client}
                  </Text>
                </Text>
              </Stack>
            </WrapItem>

            <WrapItem>
              <Stack
                w="220px"
                h="140px"
                backgroundColor="#8EB9BB"
                borderRadius={20}
              >
                <Text
                  h="70px"
                  backgroundColor="#1A7175"
                  borderTopRadius={20}
                  textAlign="center"
                  p={7}
                  fontSize={21}
                  fontWeight="bold"
                  color="white"
                >
                  Assigned Clients
                  <Text
                    mt={4}
                    borderBottomRadius={10}
                    textAlign="center"
                    fontSize={35}
                    fontWeight="bold"
                    color="#1A7175"
                  >
                    {AysneRider}
                  </Text>
                </Text>
              </Stack>
            </WrapItem>

            <WrapItem>
              <Stack
                w="220px"
                h="140px"
                backgroundColor="#8EB9BB"
                borderRadius={20}
              >
                <Text
                  h="70px"
                  backgroundColor="#1A7175"
                  borderTopRadius={20}
                  textAlign="center"
                  p={7}
                  fontSize={23}
                  fontWeight="bold"
                  color="white"
                >
                  Total Riders
                  <Text
                    mt={4}
                    borderBottomRadius={10}
                    textAlign="center"
                    fontSize={35}
                    fontWeight="bold"
                    color="#1A7175"
                  >
                    {Employee?.TotalRider}
                  </Text>
                </Text>
              </Stack>
            </WrapItem>
          </Wrap>
        </Flex>

        <br />
        <br />
        <Center>
          <Box
            backgroundColor="#EDF2F7"
            borderRadius={35}
            boxShadow="xl"
            direction={{ base: "row", sm: "row" }}
            p={2}
          >
            <Text
              textAlign="center"
              fontSize={20}
              fontWeight="bold"
              p={2}
              m={2}
            >
              Total Collection: {PaymentData?.totalAmount}
            </Text>
          </Box>
        </Center>

        <br />
        <br />

        <Flex justifyContent="center" alignItems="center">
          <Wrap
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            rounded="2xl"
          >
            <Card bg="#CFD9E8" borderRadius={20} boxShadow="xl" p={3}>
              <Box bg="#EDF2F7" borderRadius="2xl" width="250px" height="100%">
                <Text textAlign="center" fontSize={22} fontWeight="bold">
                  Cheque/Cash
                </Text>
                <Doughnut data={data} />
              </Box>
            </Card>

            <Card bg="#CFD9E8" borderRadius={20} boxShadow="xl" p={3}>
              <Box bg="#EDF2F7" borderRadius="2xl" width="250px" height="100%">
                <Text textAlign="center" fontSize={22} fontWeight="bold">
                  Verify/Unverified
                </Text>
                <Pie data={data1} />
              </Box>
            </Card>
            {/* 
                        <Card bg="#CFD9E8" borderRadius={20} boxShadow='xl' p={3} w={265}>
                            <Box bg="#EDF2F7" borderRadius="2xl" h="100%" >

                                <VStack>
                                    <Wrap bg="#8EB9BB" borderRadius={5} boxShadow='xl' p={2}>
                                        <Text textAlign="center" fontSize={22} w={100}>Name</Text>
                                        <Text textAlign="center" fontSize={22} w={100}>Amount</Text>
                                    </Wrap>

                                    <Wrap bg="gray.200" borderRadius={5} boxShadow='xl' p={2}>
                                        <Text textAlign="center" fontSize={22} w={100}>Cashier 1</Text>
                                        <Text textAlign="center" fontSize={22} w={100}>2000</Text>
                                    </Wrap>
                                    <Wrap bg="gray.200" borderRadius={5} boxShadow='xl' p={2}>
                                        <Text textAlign="center" fontSize={22} w={100}>Cashier 1</Text>
                                        <Text textAlign="center" fontSize={22} w={100}>2000</Text>
                                    </Wrap>
                                    <Wrap bg="gray.200" borderRadius={5} boxShadow='xl' p={2}>
                                        <Text textAlign="center" fontSize={22} w={100}>Cashier 1</Text>
                                        <Text textAlign="center" fontSize={22} w={100}>4000</Text>
                                    </Wrap>
                                    <Wrap bg="gray.200" borderRadius={5} boxShadow='xl' p={2}>
                                        <Text textAlign="center" fontSize={22} w={100}>Cashier 1</Text>
                                        <Text textAlign="center" fontSize={22} w={100}>4000</Text>
                                    </Wrap>
                                    <Wrap bg="gray.200" borderRadius={5} boxShadow='xl' p={2}>
                                        <Text textAlign="center" fontSize={22} w={100}>Cashier 1</Text>
                                        <Text textAlign="center" fontSize={22} w={100}>5000</Text>
                                    </Wrap>
                                                     </VStack>

                            </Box>
                        </Card> */}
          </Wrap>
        </Flex>
      </Box>
    </Container>
  );
}
