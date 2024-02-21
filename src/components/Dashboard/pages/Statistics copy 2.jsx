import React from "react";
import { FaUsers, FaDollarSign } from "react-icons/fa";
import { BiListCheck, BiLike } from "react-icons/bi";
import { PiBatteryFullFill } from "react-icons/pi";
import RadialChart from "../Charts/Radial";
import { IoMdArrowDropup } from "react-icons/io";
import AreaChart from "../Charts/Area";
import { TbAntennaBars5 } from "react-icons/tb";
import BarChart from "../Charts/Bar";
import PieChart from "../Charts/Pie";
import TableComponent from "../Table/Table";
import LineChart from "../Charts/Line";

const Statistics = () => {
  const data = [
    {
      service: "Услуга 1",
      orderCount: 20,
      averageCheck: 50,
      revenuePercentage: 25,
    },
    {
      service: "Услуга 2",
      orderCount: 15,
      averageCheck: 40,
      revenuePercentage: 20,
    },
    {
      service: "Услуга 3",
      orderCount: 25,
      averageCheck: 60,
      revenuePercentage: 30,
    },
    {
      service: "Услуга 3",
      orderCount: 25,
      averageCheck: 60,
      revenuePercentage: 30,
    },
    {
      service: "Услуга 3",
      orderCount: 25,
      averageCheck: 60,
      revenuePercentage: 30,
    },
    {
      service: "Услуга 3",
      orderCount: 25,
      averageCheck: 60,
      revenuePercentage: 30,
    },
    {
      service: "Услуга 3",
      orderCount: 25,
      averageCheck: 60,
      revenuePercentage: 30,
    },
    {
      service: "Услуга 3",
      orderCount: 25,
      averageCheck: 60,
      revenuePercentage: 30,
    },
    {
      service: "Услуга 3",
      orderCount: 25,
      averageCheck: 60,
      revenuePercentage: 30,
    },
    // ...добавьте свои данные
  ];

  return (
    <div className="grid grid-cols-10 gap-5">
      <div className="grid grid-cols-8 gap-5 col-span-10">
        <div className="py-4 bg-white rounded-[20px] flex items-center pl-5 gap-3 drop-shadow-xl col-span-2">
          <div className="text-4xl text-purple-700 bg-slate-100 p-2 rounded-full">
            <FaUsers></FaUsers>
          </div>
          <div>
            <h3 className="text-gray-400 font-normal">Клиенты</h3>
            <p className="text-purple-900 font-bold text-2xl">203</p>
          </div>
        </div>
        <div className="py-4 bg-white rounded-[20px] flex items-center pl-5 gap-3 drop-shadow-xl col-span-2">
          <div className="text-4xl text-purple-700 bg-slate-100 p-2 rounded-full">
            <BiListCheck></BiListCheck>
          </div>
          <div>
            <h3 className="text-gray-400 font-normal">Заказы</h3>
            <p className="text-purple-900 font-bold text-2xl">2010</p>
          </div>
        </div>
        <div className="py-4 bg-white rounded-[20px] flex items-center pl-5 gap-3 drop-shadow-xl col-span-2">
          <div className="text-4xl text-purple-700 bg-slate-100 p-2 rounded-full">
            <FaDollarSign></FaDollarSign>
          </div>
          <div>
            <h3 className="text-gray-400 font-normal">Доход</h3>
            <p className="text-purple-900 font-bold text-2xl">2300$</p>
          </div>
        </div>
        <div className="py-4 bg-white rounded-[20px] flex items-center pl-5 gap-3 drop-shadow-xl col-span-2">
          <div className="text-4xl text-purple-700 bg-slate-100 p-2 rounded-full">
            <BiLike></BiLike>
          </div>
          <div>
            <h3 className="text-gray-400 font-normal">Оценка клиентов</h3>
            <p className="text-purple-900 font-bold text-2xl">9.8</p>
          </div>
        </div>
      </div>
      <div className="py-5 bg-white rounded-[20px] col-span-7 drop-shadow-xl">
        <div className="ml-4 relative">
          <h3 className="font-bold text-4xl text-purple-900">$649.3</h3>
          <div className="flex items-center mt-2 gap-2 mb-10">
            <p className="text-gray-400 text-sm">Заработано за месяц</p>
            <p className="flex items-center text-sm text-green-500">
              <IoMdArrowDropup /> 2.5%
            </p>
          </div>
          <div className="absolute top-0 right-4 bg-slate-100 text-purple-600 text-4xl rounded-lg ">
            {" "}
            <TbAntennaBars5></TbAntennaBars5>{" "}
          </div>
        </div>
        <AreaChart></AreaChart>
      </div>
      <div className="py-5 bg-white rounded-[20px] col-span-3 drop-shadow-xl">
        <div className="ml-4 relative mr-4">
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">Заказано услуг за месяц</p>
            <p className="flex items-center text-sm text-green-500">
              <IoMdArrowDropup /> 3.5%
            </p>
          </div>
          <h3 className="font-bold text-4xl text-purple-900 mt-2 mb-10">220</h3>
          <BarChart showY={false}></BarChart>
        </div>
      </div>

      <div className="bg-white rounded-[20px] py-5 col-span-4 col-start-1 row-start-4 drop-shadow-xl">
        <div className="flex mx-4 items-center justify-between mb-5">
          <h3 className="text-purple-900 font-semibold text-xl">
            Услуги в выручке
          </h3>
          <p className="text-gray-400 text-sm">За месяц</p>
        </div>
        <PieChart></PieChart>
      </div>
      <div className="bg-white rounded-[20px] py-5 col-span-6 drop-shadow-xl">
        <div className="mx-5 h-full pb-5">
          <h3 className="text-xl text-purple-900 font-semibold">Все услуги</h3>
          <TableComponent data={data} />
        </div>
      </div>
      <div className="bg-white rounded-[20px] py-5 col-span-7 drop-shadow-xl">
        <div className="flex ml-4 justify-between items-center mr-4">
          <h1 className="text-2xl text-purple-900 font-semibold">
            Клиентская активность
          </h1>
          <p className="text-gray-400 text-sm">За Неделю</p>
        </div>
        <div className="bg-main mx-4 rounded-lg mt-4">
          <LineChart></LineChart>
        </div>
      </div>
      <div className="bg-white rounded-[20px] py-5 2xl:col-span-3 drop-shadow-xl xl:col-span-7 xl:row-start-4 2xl:">
        <div className="flex flex-col mx-4 relative">
          <div className="absolute top-0 right-4 bg-slate-100 text-purple-600 text-3xl rounded-lg p-1">
            <PiBatteryFullFill></PiBatteryFullFill>
          </div>
          <h1 className="font-bold text-2xl text-purple-900">Загруженность</h1>
          <p className="text-gray-400 text-sm">На Сегодня</p>
        </div>
        <div className="h-full mt-5">
          <RadialChart></RadialChart>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
