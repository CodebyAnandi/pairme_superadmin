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
import { useSampleClients } from '../hooks/sampleData';
import CardBoxTransaction from '../components/CardBox/Transaction';
// import { Client, Transaction } from '../interfaces';
import CardBoxClient from '../components/CardBox/Client';
import CardBox from '../components/CardBox';
import { sampleChartData } from '../components/ChartLineSample/config';
import ChartLineSample from '../components/ChartLineSample';
import TableSampleClients from '../components/Table/SampleClients';
import { getPageTitle } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, getAllDeletedUsers , getAllSubAdmin } from '../stores/adminSlice';
import {fetchReportUser} from '../stores/reportSlice'

const Dashboard = () => {
  const { clients } = useSampleClients();
  // const { transactions } = useSampleTransactions();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllDeletedUsers());
    dispatch(getAllSubAdmin())
    dispatch(fetchReportUser())
  },[]);

  const alldata = useSelector((state) => state?.loggedUser?.allUsers);
  const allDeletedUser = useSelector((state) => state?.loggedUser?.deletedUsers);
  const allSubAdmin = useSelector((state)=> state.loggedUser.allSubAdmin);
  const allReportedUser = useSelector((state)=> state.reportUser.reportUser.Allreports)
  console.log("////", allReportedUser);

  const Client = alldata && alldata?.size;
  const allDeletedUserdata = allDeletedUser && allDeletedUser?.size;
  const allSubAdminData = allSubAdmin && allSubAdmin?.size;
  console.log(allSubAdmin);

  const latestFiveUser = alldata?.data.slice(-5)
  const latestFiveReport = allReportedUser?.slice(-5)
  // console.log("latestFiveUser",latestFiveUser)

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
            trendLabel="User"
            trendType="up"
            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={Client}
            label="User"
          />
          <CardBoxWidget
            trendLabel="Deleted User"
            trendType="down"
            trendColor="danger"
            icon={mdiAccountMultiple}
            iconColor="danger"
            number={allDeletedUserdata}
            numberPrefix=""
            label="Deleted User"
          />
          <CardBoxWidget
            trendLabel="Sub Admin"
            trendType="warning"
            trendColor="warning"
            icon={mdiAccountMultiple}
            iconColor="warning"
            number={allSubAdminData}
            numberSuffix=""
            label="Sub Admin"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
  <div className="flex flex-col justify-between">
    <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title="Latest Five Users"
          main
        ></SectionTitleLineWithButton>
    {latestFiveUser && latestFiveUser?.map((latestUser) => (
      <CardBoxTransaction key={latestUser._id} latestFiveUser={latestUser} />
    ))}
  </div>
  <div className="flex flex-col justify-between">
  <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title="Latest Five Report"
          main
        ></SectionTitleLineWithButton>
    {latestFiveReport && latestFiveReport?.map((latestReport) => (
      <CardBoxClient key={latestReport._id} latestFiveReport={latestReport} />
    ))}
  </div>
</div>

{/* 
        <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
          <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6">{chartData && <ChartLineSample data={chartData} />}</CardBox>

        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />

        <CardBox hasTable>
          <TableSampleClients />
        </CardBox> */}
      </SectionMain>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
