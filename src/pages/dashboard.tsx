import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiReload,
} from '@mdi/js';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Button from '../components/Button';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/Section/Main';
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton';
import CardBoxWidget from '../components/CardBox/Widget';
import { useSampleClients, useSampleTransactions } from '../hooks/sampleData';
import CardBoxTransaction from '../components/CardBox/Transaction';
import { Client, Transaction } from '../interfaces';
import CardBoxClient from '../components/CardBox/Client';
import CardBox from '../components/CardBox';
import { sampleChartData } from '../components/ChartLineSample/config';
import ChartLineSample from '../components/ChartLineSample';
import TableSampleClients from '../components/Table/SampleClients';
import { getPageTitle } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, getAllDeletedUsers , getAllSubAdmin } from '../stores/adminSlice';

const Dashboard = () => {
  const { clients } = useSampleClients();
  const { transactions } = useSampleTransactions();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllDeletedUsers());
    dispatch(getAllSubAdmin())
  },[]);

  const alldata = useSelector((state) => state?.loggedUser?.allUsers);
  const allDeletedUser = useSelector((state) => state?.loggedUser?.deletedUsers);
  const allSubAdmin = useSelector((state)=> state.loggedUser.allSubAdmin);
  console.log("////", allDeletedUser);

  const Client = alldata && alldata?.size;
  const allDeletedUserdata = allDeletedUser && allDeletedUser?.size;
  const allSubAdminData = allSubAdmin && allSubAdmin.size;
  // console.log(allSubAdminData);

  const clientsListed = clients.slice(0, 4);

  const [chartData, setChartData] = useState(sampleChartData());

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault();
    setChartData(sampleChartData());
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title="Overview"
          main
        ></SectionTitleLineWithButton>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trendLabel="12%"
            trendType="up"
            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={Client}
            label="User"
          />
          <CardBoxWidget
            trendLabel="16%"
            trendType="down"
            trendColor="danger"
            icon={mdiCartOutline}
            iconColor="info"
            number={allDeletedUserdata}
            numberPrefix=""
            label="Deleted User"
          />
          <CardBoxWidget
            trendLabel="Overflow"
            trendType="warning"
            trendColor="warning"
            icon={mdiChartTimelineVariant}
            iconColor="danger"
            number={allSubAdminData}
            numberSuffix=""
            label="Sub Admin"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col justify-between">
            {transactions.map((transaction: Transaction) => (
              <CardBoxTransaction key={transaction.id} transaction={transaction} />
            ))}
          </div>
          <div className="flex flex-col justify-between">
            {clientsListed.map((client: Client) => (
              <CardBoxClient key={client.id} client={client} />
            ))}
          </div>
        </div>

        <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
          <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6">{chartData && <ChartLineSample data={chartData} />}</CardBox>

        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />

        <CardBox hasTable>
          <TableSampleClients />
        </CardBox>
      </SectionMain>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
