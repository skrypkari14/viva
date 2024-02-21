import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./Schedule.css";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/ru'
import { IoIosArrowBack, IoIosArrowForward, IoMdAdd } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { addDays, format, startOfWeek, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { FaUser, FaPhone } from "react-icons/fa";
import { Select, ConfigProvider, DatePicker, TimePicker, Calendar, theme, Input, Button } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';


dayjs.locale('ru');
dayjs.extend(duration);


const { TextArea } = Input;

const { Option } = Select;

const Schedule = ({initialAppointments}) => {
  const [weeks, setWeeks] = useState([]);
  // eslint-disable-next-line
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [currentDay, setCurrentDay] = useState(startOfDay(new Date())); // Используем startOfDay для начала дня
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const { token } = theme.useToken();
  const [appointments, setAppointment] = useState(initialAppointments);
  const TodayValue = new Date();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const isToday = () => {
    const today = new Date();
    return (
      today.getDate() === currentDay.getDate() &&
      today.getMonth() === currentDay.getMonth() &&
      today.getFullYear() === currentDay.getFullYear()
    );
  };

  useEffect(() => {
    // Генерация недель от текущей даты
    const generatedWeeks = [];
    for (let i = 0; i < 5; i++) {
      const startDay = addDays(startOfWeek(currentDay), i * 7); // Используем startOfWeek для начала недели
      const week = [];
      for (let j = 0; j < 7; j++) {
        const day = addDays(startDay, j);
        const formattedDay = `${format(day, "EEE", { locale: ru })}, ${format(
          day,
          "dd"
        )}`;
        week.push(formattedDay);
      }
      generatedWeeks.push(week);
    }
    setWeeks(generatedWeeks);
  }, [currentDay]);

  const handleNextDay = () => {
    setCurrentDay((prevDay) => addDays(prevDay, 1));
  };

  const handlePrevDay = () => {
    setCurrentDay((prevDay) => addDays(prevDay, -1));
  };

  const generateDays = () => {
    if (weeks.length === 0) {
      return null;
    }

    return weeks[currentWeekIndex].map((day, index) => {
      const isSelectedDay = index === currentDay.getDay();
      const className = isSelectedDay
        ? "text-purple-600 font-semibold"
        : "text-neutral-900 font-semibold";

      return (
        <div
          key={index}
          className={`col-span-2 border-y py-5 text-center ${className}`}
        >
          {day}
        </div>
      );
    });
  };
  const timeArray = Array.from({ length: 16 }, (_, index) => index + 7);

  const newAppointmentData = {
    clientName: '',
    phoneNumber: '',
    date: '',
    services: [],
    timeHour: '',
    timeMinute: '',
    comments: '',
  };

  const [newAppointment, setNewAppointment] = useState(newAppointmentData);
  const handleTimePick = (value) => {
    const hourValue = value.format('HH');
    console.log(hourValue);
    const minuteValue = value.format('mm');
    console.log(minuteValue);
    setNewAppointment((prevData) => ({
      ...prevData,
      timeHour: hourValue,
      timeMinute: minuteValue
    }))
  }
  const handleInputChange = (name, value) => {
    if (name === 'date'){
      setNewAppointment((prevData) => ({
        ...prevData,
        date: value.format('YYYY-MM-DD'),
      }));
    } else{
      setNewAppointment((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const addNewAppointment = () =>{
      const startInMinutes = parseInt(newAppointment.timeHour, 10) * 60 + parseInt(newAppointment.timeMinute, 10);
      const serviceDurations = {
        service1: 90,
        service2: 60,
      };
      const totalDuration = newAppointment.services.reduce((acc, service) => {
        return acc + (serviceDurations[service] || 0);
      }, 0);
      const endTimeInMinutes = startInMinutes + totalDuration;
      const endHour = Math.floor(endTimeInMinutes / 60);
      const endMinute = endTimeInMinutes % 60;
      console.log(`Начало времени: ${newAppointment.timeHour}:${newAppointment.timeMinute}`);
      console.log(`Конец времени: ${endHour < 10 ? '0' : ''}${endHour}:${endMinute < 10 ? '0' : ''}${endMinute}`);

      let finalEndMinute = `${endMinute < 10 ? '0' : ''}${endMinute}`

      const createdAppointment = {
        date: newAppointment.date,
        startHour: parseInt(newAppointment.timeHour),
        startMinute: newAppointment.timeMinute,
        endHour: endHour,
        endMinute: finalEndMinute,
        clientName: newAppointment.clientName,
      }
      console.log(createdAppointment);
      const createNewAppointment = [...appointments, createdAppointment];
      setAppointment(createNewAppointment);
      console.log(appointments);
      setPopUpOpen(false);
  }

  useEffect(() => {
    console.log(newAppointment);
  }, [newAppointment]);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const colorsArray = [
    { base: "#9333ea", second: "#7e22ce" }, // purple
    { base: "#a855f7", second: "#9333ea" }, // violet
    { base: "#7e22ce", second: "#6b21a8" }, // indigo
  ];
  const getRandomColor = (index) => {
    const randomIndex = index % colorsArray.length;
    return colorsArray[randomIndex];
  };
  const generateBlockStyle = (index) => {
    const { base, second } = getRandomColor(index);
    return {
      base: {
        backgroundColor: base,
      },
      second: {
        backgroundColor: second,
      },
    };
  };
  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };
  const handleDateChange = (value) => {
    let date = value.format('MM-DD-YYYY');
    setCurrentDay(startOfDay(date));
    setIsDatePickerOpen(false);
  };
  const calculateHeight = (startHour, endHour, endMinute, startMinute) => {
    let endMinutes = +endMinute;
    let startMinutes = +startMinute;
    let minuteInPixel = 64 / 60;
    let calculatedHeight = endHour - startHour;
    let finalHeight = calculatedHeight * 64;
    let marginAppointment = 0;

    if (startMinutes !== 0) {
      marginAppointment = startMinutes * minuteInPixel;
    }

    if (endMinutes !== 0 && startMinutes !== 0) {
      return {
        height: `${
          finalHeight + endMinutes * minuteInPixel - marginAppointment
        }px`,
        marginTop: `${marginAppointment}px`,
      };
    } else if (endMinutes !== 0 && startMinutes === 0) {
      return {
        height: `${finalHeight + endMinutes * minuteInPixel}px`,
      };
    } else {
      return {
        height: `${finalHeight}px`,
      };
    }
  };
  return (
    <div>
      {isPopUpOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen backdrop-blur-sm z-50">
        <div className="p-10 md:py-10 md:w-[500px] md:p-0 bg-white border border-purple-500 rounded-xl translate-x-1/2 translate-y-1/2 absolute bottom-1/2 right-1/2">
          <div className="flex text-purple-800 text-xl items-center gap-20 justify-between px-5">
            <h2>Добавить запись</h2>
            <button onClick={() => {
              setPopUpOpen(!isPopUpOpen);
            }}><MdOutlineCancel /></button>
          </div>
          <div className="px-5 py-5 flex items-center justify-between">
            <div className="w-[200px]">
              <label>Имя клиента</label>
              <div className="flex items-center px-2 border-purple-600 border-b-2 gap-2 text-purple-800 py-2">
                <span><FaUser /></span>
                <input onChange={(e) => handleInputChange('clientName', e.target.value)} type="text" className="w-[200px] focus:outline-none focus:ring-0 border-none" />
              </div>
            </div>
            <div className="w-[200px]">
              <label>Контакты клиента</label>
              <div className="flex items-center px-2 border-purple-600 border-b-2 gap-2 text-purple-800 py-2">
                <span><FaPhone /></span>
                <input onChange={(e) => handleInputChange('phoneNumber', e.target.value)} type="number" className="w-[200px] focus:outline-none focus:ring-0 border-none" />
              </div>
            </div>
          </div>
          <div className="px-5 pb-5">
            <ConfigProvider
                theme={{
                  token: {
                    // Seed Token
                    colorPrimary: '#9333ea',

                    // Alias Token
                    colorBgContainer: '#fff',
                    colorBorder: '#9333ea',
                    colorTextBase: '#6b21a8',
                  },
                }}
            >
                <Select
                    mode="multiple"
                    style={{ width: '100%' ,height: '42px'}}
                    placeholder="Выберите услуги"
                    onChange={(values) => handleInputChange('services', values)}
                    maxTagCount={1}
                    showSearch={false}
                >
                  <Option value="service1">Услуга 1</Option>
                  <Option value="service2">Услуга 2</Option>
                  {/* Добавьте другие услуги */}
                </Select>

            </ConfigProvider>
          </div>
          <div className='px-5 flex items-center justify-between'>
            <ConfigProvider
                theme={{
                  token: {
                    // Seed Token
                    colorPrimary: '#9333ea',
                    colorBorder: '#9333ea',
                    colorTextBase: '#6b21a8',
                    algorithm: true,
                  },
                }}
            >
              <DatePicker
                style={{width: '45%', height:'42px'}}
                onChange={(value) => handleInputChange('date', value)}
              />
              <TimePicker
                  style={{width: '45%', height:'42px'}}
                  format="HH:mm"
                  hideDisabledOptions
                  onChange={(value) => handleTimePick(value)}
              />
            </ConfigProvider>
          </div>
          <div className="py-5 px-5">
            <label>Коментарии</label>
            <ConfigProvider
                theme={{
                  token: {
                    // Seed Token
                    colorPrimary: '#9333ea',
                    colorBorder: '#9333ea',
                    colorTextBase: '#6b21a8',
                  },
                }}
            >
              <TextArea onChange={(e) => handleInputChange('comments', e.target.value)}></TextArea>
            </ConfigProvider>
          </div>
          <div className='px-5 flex justify-end gap-5 items-center'>
            <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#9333ea',
                    colorBorder: '#9333ea',
                    colorTextBase: '#6b21a8',
                  },
                }}
            >
              <p className='text-purple-600'>* Запись для Максима.</p>
              <Button type="dashed">Отменить</Button>
              <Button onClick={addNewAppointment}>Сохранить</Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-purple-900">
            {capitalize(format(currentDay, "LLLL, yyyy", { locale: ru }))}
          </h2>
        </div>
        <div className="relative flex items-center gap-2">
          {isDatePickerOpen && (
            <div className="absolute top-12 right-1/2 translate-x-1/2 z-50">
              <div style={wrapperStyle}>
                <ConfigProvider
                    locale={ruRU}
                    theme={{
                      token: {
                        // Seed Token
                        colorPrimary: '#9333ea',

                        // Alias Token
                        colorBgContainer: '#fff',
                        colorTextBase: '#6b21a8',
                      },
                    }}
                >
                  <Calendar fullscreen={false} onChange={handleDateChange} defaultValue={dayjs(TodayValue)} value={dayjs(currentDay)} />
                </ConfigProvider>
              </div>
            </div>
          )}
          <button
            onClick={handlePrevDay}
            className="py-1 px-2 h-10 border border-purple-600 text-purple-900 rounded-lg hover:shadow-xl transition-all"
          >
            {" "}
            <IoIosArrowBack />{" "}
          </button>
          <button
            onClick={toggleDatePicker}
            className="text-lg h-10 w-36 px-2 border border-purple-600 text-purple-900 rounded-lg hover:shadow-xl transition-all"
          >
            {isToday()
              ? "Сегодня"
              : format(currentDay, "EEE, dd.MM", { locale: ru })}
          </button>
          <button
            onClick={handleNextDay}
            className="py-1 px-2 h-10 border border-purple-600 text-purple-900 rounded-lg hover:shadow-xl transition-all"
          >
            {" "}
            <IoIosArrowForward />{" "}
          </button>
        </div>
        <div>
          <button onClick={() => {
            setPopUpOpen(true);
            setIsDatePickerOpen(false);
          }} className="flex items-center bg-purple-600 text-white text-lg py-1 px-2 rounded-lg gap-2 hover:shadow-xl transition-all">
            <IoMdAdd className="text-xl" />
            Добавить запись
          </button>
        </div>
      </div>
      <div className="grid grid-cols-15 pt-5">
        <div className="col-span-1 text-neutral-900 font-semibold border-y py-5 text-center"></div>
        {generateDays()}
      </div>
      <div className="grid grid-cols-15 mt-16">
        {timeArray.map((hour) => (
          <React.Fragment key={hour}>
            <div className="text-center relative h-16" key={hour}>
              <p className="relative translate-y-[-50%] z-10">{`${hour}:00`}</p>
            </div>
            {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
              const currentDayOfWeek = addDays(
                startOfWeek(currentDay),
                dayIndex
              );
              return (
                <div
                  key={dayIndex}
                  className="border-t h-16 col-span-2 relative"
                >
                  {appointments
                    .filter(
                      (appointment) =>
                        appointment.startHour === hour &&
                        appointment.date ===
                          format(currentDayOfWeek, "yyyy-MM-dd")
                    )
                    .map((filteredAppointment, index) => (
                      <div
                        key={`time-${dayIndex}-${hour}-${index}`}
                        className={`rounded-xl shadow-2xl relative z-10 hover:scale-110 transition-all hover:z-50 w-11/12`}
                        style={{
                          ...generateBlockStyle(index).base,
                          ...calculateHeight(
                            filteredAppointment.startHour,
                            filteredAppointment.endHour,
                            filteredAppointment.endMinute,
                            filteredAppointment.startMinute
                          ),
                        }}
                      >
                        <div
                          className={`absolute top-0 rounded-t-xl left-0 right-0 text-white font-normal px-2 text-sm`}
                          style={generateBlockStyle(index).second}
                        >
                          Запись : {filteredAppointment.startHour}:
                          {filteredAppointment.startMinute}-
                          {filteredAppointment.endHour}:
                          {filteredAppointment.endMinute}
                        </div>
                      </div>
                    ))}
                  {/* Ваш код для пустой ячейки (если нужно) */}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
