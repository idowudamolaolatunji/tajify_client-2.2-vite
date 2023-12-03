import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import CurrencyInput from "react-currency-input-field";
import { PaystackButton } from "react-paystack";
// import { useDataContext } from '../../context/DataContext';
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const DepositModal = ({ isOpen, onClose }) => {
  // const { getRequest, handleRefetchHelp } = useDataContext();
  const { user } = useAuthContext();

  const [deposit, setDeposit] = useState(null);

  const publicKey = "pk_test_ec63f7d3f340612917fa775bde47924bb4a90af7";
  const amount = deposit * 100; // Remember, set in kobo!

  const componentProps = {
    email: user.email,
    amount,
    metadata: {
      customer_id: user.id,
      funds: deposit,
    },
    publicKey,
    text: "Deposit",
    onSuccess: (transaction) => {
      const toastKey = toast.loading("Verifying Payment...");
      const ref = transaction.reference;

      const verifyPayment = async () => {
        const result = await getRequest(`wallet-deposit/${ref}`);

        if (result.status === "success") {
          console.log("hello");
          toast.update(toastKey, {
            render: "Payment Verified",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          onClose();
          handleRefetchHelp();
        } else {
          toast.update(toastKey, {
            render: "Could Not Verify Payment",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
      };

      verifyPayment();
    },

    onClose: () =>
      toast("Transaction Cancelled", {
        icon: "😢",
      }),
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h1 className="text-2xl text-green-600">Fund Your Wallet</h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <FormControl id="amount">
                <FormLabel>Amount</FormLabel>
                <CurrencyInput
                  prefix={`₦${" "}`}
                  id="input-example"
                  name="input-name"
                  className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                  placeholder="Please enter a number"
                  defaultValue={deposit}
                  value={deposit}
                  decimalsLimit={2}
                  onValueChange={(value, name) => setDeposit(value)}
                />
              </FormControl>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="">
              <FormControl>
                <PaystackButton
                  {...componentProps}
                  className=" py-4 px-8 bg-green-600 rounded-lg font-semibold text-white flex items-center gap-2"
                />
              </FormControl>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DepositModal;
