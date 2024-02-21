import React from 'react'
import {Tabs, ConfigProvider} from 'antd'
import Schedule from '../Calendar/Schedule'

const initialAppointments1 = [
    {
        date: "2024-02-19",
        startHour: 10,
        startMinute: "15",
        endHour: 16,
        endMinute: "45",
        clientName: "Анастасия Иванова",
    }
];
const initialAppointments2 = [
    {
        date: "2024-02-20",
        startHour: 11,
        startMinute: "15",
        endHour: 16,
        endMinute: "45",
        clientName: "Анастасия Иванова",
    }
];
const initialAppointments3 = [
    {
        date: "2024-02-18",
        startHour: 15,
        startMinute: "15",
        endHour: 16,
        endMinute: "45",
        clientName: "Анастасия Иванова",
    }
];

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Максим',
        children: <Schedule initialAppointments={initialAppointments1}/>,
    },
    {
        key: '2',
        label: 'Анатолий',
        children: <Schedule initialAppointments={initialAppointments2}/>,
    },
    {
        key: '3',
        label: 'Леонид',
        children: <Schedule initialAppointments={initialAppointments3}/>,
    },
];
const Calendar = () => {

  return (
    <div className='bg-white rounded-[20px] p-5 shadow-xl'>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#9333ea',
                    colorBgContainer: '#fff',
                    colorBorder: '#9333ea',
                    colorTextBase: '#6b21a8',
                },
            }}
        >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange}></Tabs>
        </ConfigProvider>
    </div>
  )
}

export default Calendar