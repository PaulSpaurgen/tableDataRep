import {
  Box,
  chakra,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useTransaction } from "../../Context/context";
import { useState, useEffect } from "react";
import { TbMobiledata } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSackDollar } from "react-icons/fa6";
import {BsGraphUpArrow,BsFillBookmarkFill} from "react-icons/bs"
// TbArrowsTransferUp
//
export default function Home() {
  const { transactions } = useTransaction();
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [usdRate, setUsdRate] = useState(1);
  const [trackSort, setTrackSort] = useState({
    TransactionDate: false,
    InvoiceNumber: false,
    Payer: false,
    Payee: false,
    Amount: false,
    Status: false,
  });
  const navigate = useNavigate();
  console.log({ tableData });
  useEffect(() => {
    setTableData(transactions);
    coverToUsd();
  }, [transactions]);

  const returnActions = () => {
    return (
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          ...
        </MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  const sortData = (key) => {
    let copyOfTableData = JSON.parse(JSON.stringify(tableData));

    if (
      key === "Payer" ||
      key === "Payee" ||
      key === "InvoiceNumber" ||
      key === "TransactionDate"
    ) {
      copyOfTableData = trackSort[`${key}`]
        ? copyOfTableData.sort((a, b) => b[`${key}`].localeCompare(a[`${key}`]))
        : copyOfTableData.sort((a, b) =>
            a[`${key}`].localeCompare(b[`${key}`])
          );
      setTrackSort((prev) => ({
        ...prev,
        [`${key}`]: !trackSort[`${key}`],
      }));
    } else {
      copyOfTableData = trackSort[`${key}`]
        ? copyOfTableData.sort((a, b) => b[`${key}`] - a[`${key}`])
        : copyOfTableData.sort((a, b) => a[`${key}`] - b[`${key}`]);
      setTrackSort((prev) => ({
        ...prev,
        [`${key}`]: !trackSort[`${key}`],
      }));
    }

    console.log({ copyOfTableData });
    setTableData(copyOfTableData);
  };

  const coverToUsd = async () => {
    const options = {
      method: "GET",
      url: "https://v6.exchangerate-api.com/v6/3adc2a83fbc89e82c84a2b38/latest/USD",
    };
    try {
      setIsLoading(true);
      const response = await axios.request(options);
      setIsLoading(false);
      console.log(response.data);
      const conversion_rate = response?.data?.conversion_rates?.INR || 1;
      setUsdRate(conversion_rate);
      //   conversion_rates.INR
      // conversion_rates
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const statusHtml = (val) => {
    return (
      <Flex>
        <Box mr="2">
          <Box
            w="50px"
            p="2px"
            borderRadius="lg"
            bg={val >= 1 ? "blue.900" : "gray.200"}
          />
          {val >= 1 && (
            <Text mt="2" fontSize="xs" color="gray.400">
              First
            </Text>
          )}
        </Box>
        <Box mr="2">
          <Box
            w="50px"
            p="2px"
            borderRadius="lg"
            bg={val >= 2 ? "blue.900" : "gray.200"}
            mr="2"
          />
          {val >= 2 && (
            <Text mt="2" fontSize="sm" color="gray.400">
              Second
            </Text>
          )}
        </Box>

        <Box>
          <Box
            w="50px"
            p="2px"
            borderRadius="lg"
            bg={val >= 3 ? "blue.900" : "gray.200"}
            mr="2"
          />
          {val >= 3 && (
            <Text mt="2" fontSize="sm" color="gray.400">
              Third
            </Text>
          )}
        </Box>
      </Flex>
    );
  };

  return (
    <chakra.div w="100%">
      <Flex justifyContent="center" w="100%" alignItems="center" h="100vh">
        <Box w="fit-content">
          <Flex mb="40px" justifyContent="space-between">
            <Box
              w="100%"
              h="100px"
              borderRadius="10px"
              border="1px"
              borderColor="gray.100"
              mr="8"
              boxShadow="sm"
              bgColor="#F0F1FF"
              p="5"
            >
              <Flex w="100%" h="100%" alignItems="center" >
                <Icon as={FaSackDollar} color="#7A4AFF" fontSize="6xl" mr="4" />
                <Box ml="2">
                  <Text fontSize="4xl" color="#7A4AFF" fontWeight="bold">
                    300K{" "}
                    <chakra.span fontSize="xl" color="black" fontWeight="bold">
                      {" "}
                      USD
                    </chakra.span>
                  </Text>
                  <Text color="#0B9906" mt="-2" fontWeight="bold">
                    1.25% <chakra.span><Icon ml="2" as={BsGraphUpArrow} fontSize="md" /></chakra.span>
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box
              w="100%"
              h="100px"
              borderRadius="10px"
              border="1px"
              borderColor="gray.100"
              mr="8"
              boxShadow="sm"
              bgColor="#F2F2F2"
              p="5"
            >
             <Flex w="100%" h="100%" alignItems="center" >
                <Icon as={BsFillBookmarkFill} color="#7A4AFF" fontSize="6xl" mr="4" />
                <Box ml="2">
                  <Text fontSize="lg" color="#7A4AFF" fontWeight="bold">
                    Total Amount{" "}
                  </Text>
                  <Text fontSize="2xl" mt="2" color="#7A4AFF" fontWeight="bold">
                      200k 
                    <chakra.span fontSize="sm" color="black" fontWeight="bold" ml="2">
                      USD
                    </chakra.span>
                  </Text>
                </Box>
              </Flex>

            </Box>
            <Box
              w="100%"
              h="100px"
              borderRadius="10px"
              border="1px"
              borderColor="gray.100"
              boxShadow="sm"
              bgColor="#F2F2F2"
              p="5"
            >
             <Flex w="100%" h="100%" alignItems="center" >
                <Icon as={BsFillBookmarkFill} color="#7A4AFF" fontSize="6xl" mr="4" />
                <Box ml="2">
                  <Text fontSize="lg" color="#7A4AFF" fontWeight="bold">
                    Previous Cycle{" "}
                  </Text>
                  <Text fontSize="2xl" mt="2" color="#7A4AFF" fontWeight="bold">
                      100k 
                    <chakra.span fontSize="sm" color="black" fontWeight="bold" ml="2">
                      USD
                    </chakra.span>
                  </Text>
                </Box>
              </Flex>

            </Box>
          </Flex>

          {isLoading ? (
            <Flex
              w="100vw"
              justifyContent="center"
              alignItems="center"
              h="50vh"
              zIndex="99999"
            >
              <Spinner size="md" />
            </Flex>
          ) : (
            <TableContainer
              mt="1vh"
              // border="1px"
              borderRadius="5px"
              // p="5"
              pb="5"
              // pt="10"
              // borderColor="gray.100"
              boxShadow="lg"
            >
              <Table variant="simple" size="sm">
                <Thead bgColor="#F2F2F2" fontWeight="bold">
                  <Tr alignItems="center">
                    <Th pb="4" pt="5">
                      Transaction Date{" "}
                      <chakra.span>
                        {" "}
                        <IconButton
                          aria-label="Search database"
                          icon={<TbMobiledata />}
                          size="xs"
                          ml="2"
                          onClick={() => {
                            sortData("TransactionDate");
                          }}
                          variant="outline"
                        />
                      </chakra.span>{" "}
                    </Th>
                    <Th>
                      Invoice Number{" "}
                      <chakra.span>
                        {" "}
                        <IconButton
                          aria-label="Search database"
                          icon={<TbMobiledata />}
                          size="xs"
                          ml="2"
                          onClick={() => {
                            sortData("InvoiceNumber");
                          }}
                          variant="outline"
                        />{" "}
                      </chakra.span>
                    </Th>
                    <Th>
                      Payer{" "}
                      <chakra.span>
                        {" "}
                        <IconButton
                          aria-label="Search database"
                          icon={<TbMobiledata />}
                          size="xs"
                          ml="2"
                          onClick={() => {
                            sortData("Payer");
                          }}
                          variant="outline"
                        />{" "}
                      </chakra.span>
                    </Th>
                    <Th>
                      Payee{" "}
                      <chakra.span>
                        {" "}
                        <IconButton
                          aria-label="Search database"
                          icon={<TbMobiledata />}
                          size="xs"
                          variant="outline"
                          ml="2"
                          onClick={() => {
                            sortData("Payee");
                          }}
                        />{" "}
                      </chakra.span>
                    </Th>
                    <Th>
                      Amount INR{" "}
                      <chakra.span>
                        {" "}
                        <IconButton
                          aria-label="Search database"
                          variant="outline"
                          icon={<TbMobiledata />}
                          size="xs"
                          ml="2"
                          onClick={() => {
                            sortData("Amount");
                          }}
                        />{" "}
                      </chakra.span>
                    </Th>
                    <Th>
                      USD Equivalent{" "}
                      <chakra.span>
                        {" "}
                        <IconButton
                          aria-label="Search database"
                          icon={<TbMobiledata />}
                          size="xs"
                          ml="2"
                          onClick={() => {
                            sortData("Amount");
                          }}
                          variant="outline"
                        />{" "}
                      </chakra.span>
                    </Th>
                    <Th>
                      Status{" "}
                      <chakra.span>
                        {" "}
                        <IconButton
                          aria-label="Search database"
                          icon={<TbMobiledata />}
                          size="xs"
                          ml="2"
                          onClick={() => {
                            sortData("Status");
                          }}
                          variant="outline"
                        />{" "}
                      </chakra.span>
                    </Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody mt="10">
                  {tableData.map((val, index) => (
                    <Tr
                      key={`${index}+${val.id}+${val.TransactionDate}`}
                      cursor="pointer"
                      _hover={{
                        backgroundColor: "blue.50",
                      }}
                      onClick={() => {
                        navigate(`/edit?id=${val.id}`);
                      }}
                    >
                      <Td>{val.TransactionDate}</Td>
                      <Td>{val.InvoiceNumber}</Td>
                      <Td>{val.Payer}</Td>
                      <Td>{val.Payee}</Td>
                      <Td>
                        <b>₹</b>
                        {val.Amount}{" "}
                      </Td>
                      <Td>
                        <b>$</b>
                        {Math.floor(val.Amount / usdRate)}{" "}
                      </Td>
                      <Td>{statusHtml(val.Status)}</Td>
                      <Td>{returnActions()}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Flex>
    </chakra.div>
  );
}
