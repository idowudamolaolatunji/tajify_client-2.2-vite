import { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Alert,
} from "@chakra-ui/react";
import TransactionHistoryCard from "../../components/cards/TransactionHistoryCard";

const WalletTabs = () => {
  return (
    <>
      <Tabs
        className="w-full "
        variant="unstyled"
        // index={tabIndex}
      >
        <TabList>
          <Tab>
            <p className="text-base ">History</p>
          </Tab>
          <Tab>
            <p className="text-base ">Withdrawals</p>
          </Tab>
        </TabList>
        <TabIndicator
          className="relative"
          mt="-1.5px"
          height="4px"
          bg="blue.500"
          borderRadius="8px"
        />
        <TabPanels>
          <TabPanel>
            <div>
              <div className="h-[150px] flex justify-center items-center"></div>
              <>
                <TransactionHistoryCard />
              </>
            </div>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default WalletTabs;
