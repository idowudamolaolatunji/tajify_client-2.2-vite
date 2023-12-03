import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardPage from "../../components/cards/CardPage";
import { FaArrowLeft, FaRegMoneyBillAlt } from "react-icons/fa";
import DashCard3 from "../../components/cards/DashCard3";
import DashCard from "../../components/cards/DashCard";
// import { useAuthContext } from "../../context/AuthContext";
// import { useDataContext } from "../../context/DataContext";
import { IoMdAdd } from "react-icons/io";
import WalletTabs from "./WalletTabs";
import DepositModal from "../../components/wallets/DepositModal";
import { toast } from "react-toastify";
// import SubHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";

const Wallet = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  //deposit modal states
  const [showDepositModal, setShowDepositModal] = useState(false);
  const handleCloseDepositModal = () => setShowDepositModal(false);
  const handleOpenDepositModal = () => setShowDepositModal(true);

  return (
    <>
      <Navbar />
      {/* <SubHeader /> */}
      <CardPage>
        <h1 className="mb-4 font-bold lg:text-2xl max-md:text-2xl text-primary flex gap-4 items-center ">
          {/* <FaArrowLeft size={24} onClick={() => navigate(-1)} /> */}
          Wallet
        </h1>

        <div className="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">
          <>
            <DashCard3 />
            <DashCard />
          </>

          <div className="flex-auto max-md:flex justify-around  mt-3">
            <div className="deposit-container mb-4">
              <DepositModal
                isOpen={showDepositModal}
                onClose={handleCloseDepositModal}
              />
              <p className="text-xl text-center mb-2">Deposit</p>
              <div className="deposit-div flex justify-center">
                <div>
                  <div
                    className="px-4 py-4 bg-green-300  rounded-full bg-opacity-30 hover:scale-110 hover:bg-green-400 hover:bg-opacity-100 transition-all duration-300 group"
                    onClick={handleOpenDepositModal}
                  >
                    {/* <div className="px-4 py-4 bg-green-300  rounded-full bg-opacity-30 hover:scale-110 hover:bg-green-400 hover:bg-opacity-100 transition-all duration-300 group" > */}
                    <IoMdAdd
                      className="text-green-500 group-hover:text-white"
                      // size={24}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="withdraw-container">
              <p className="text-xl text-center mb-2">Withdraw</p>
              <div className="withdraw-div flex justify-center">
                <div>
                  <div
                    className="px-4 py-4 bg-red-300  rounded-full bg-opacity-30 hover:scale-110 hover:bg-red-400 hover:bg-opacity-100 transition-all duration-300 group"
                    onClick={() =>
                      toast.error("Action Unavailable, Try again later")
                    }
                  >
                    <IoMdAdd
                      className="text-red-500 group-hover:text-white"
                      // size={24}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <DashCard2 /> */}
        </div>

        <WalletTabs />
      </CardPage>
      {/* </SideBar> */}
    </>
  );
};

export default Wallet;

{
  /* <ModalOverlay /> */
}
{
  /* <ModalContent>
        <ModalHeader>
          <h1 className="text-2xl text-green-600">Add a Comment</h1>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            //   placeholder={`Write your comment, ${user.name}...`}
              size="sm"
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="">
            <Button
              onClick={handleComment}
              colorScheme="green"
              size="sm"
              ml="auto"
            >
              Comment
            </Button>
          </div>
        </ModalFooter>
      </ModalContent> */
}
