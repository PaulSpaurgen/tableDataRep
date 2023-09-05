import {
  Box,
  useDisclosure,
  Flex,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTransaction } from "../../Context/context";
import { useNavigate } from "react-router-dom";

export default function EditPage() {
  const { transactions, updateTransaction } = useTransaction();
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    TransactionDate: "",
    InvoiceNumber: "",
    Payer: "",
    Payee: "",
    Amount: 0,
    id: 1,
    Status: 1,
  });
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    console.log({ id });
    if (!id) {
      toast({
        title: `Couldn't find id `,
        status: "error",
        isClosable: true,
      });
      return;
    }
    transactions.forEach((val) => {
      if (val.id === Number(id)) {
        setFormData(val);
        return;
      }
    });
  }, []);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: value,
    }));
  };

  const submitChanges = () => {
    const dataToSet = transactions.map((val) => {
      let data = val;
      if (val.id === formData.id) {
        data = formData;
      }
      return data;
    });
    updateTransaction(dataToSet);
    navigate("/");
  };
  return (
    <Flex w="100%" alignItems="center" justifyContent="center" h="100vh">
      <Box
        w="500px"
        p="10"
        borderRadius="lg"
        border="1px"
        borderColor="gray.100"
      >
        <Text fontSize="2xl" mb="6" fontWeight="bold">
          Edit Transaction
        </Text>

        <FormControl>
          <FormLabel>Transaction Date</FormLabel>
          <Input
            type="date"
            value={formData.TransactionDate}
            name="TransactionDate"
            onChange={handelChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel mt="5">Invoice Number</FormLabel>
          <Input
            type="text"
            value={formData.InvoiceNumber}
            name="InvoiceNumber"
            onChange={handelChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel mt="5"> Payer</FormLabel>
          <Input
            type="text"
            value={formData.Payer}
            name="Payer"
            onChange={handelChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel mt="5"> Payee</FormLabel>
          <Input
            type="text"
            value={formData.Payee}
            name="Payee"
            onChange={handelChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel mt="5"> Amount</FormLabel>
          <Input
            type="number"
            value={formData.Amount}
            name="Amount"
            onChange={handelChange}
          />
          <FormHelperText>in Rupees.</FormHelperText>
        </FormControl>
        <Button w="100%" mt="6" colorScheme="facebook" onClick={submitChanges}>
          Submit Changes
        </Button>
      </Box>
    </Flex>
  );
}
