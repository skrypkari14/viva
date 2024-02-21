import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdAdd } from "react-icons/io";
import { addDays, format, startOfWeek, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';


const Schedule = () => {
  const [weeks, setWeeks] = useState([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [currentDay, setCurrentDay] = useState(startOfDay(new Date())); // Используем startOfDay для начала дня

  useEffect(() => {
    // Генерация недель от текущей даты
    const generatedWeeks = [];
    for (let i = 0; i < 5; i++) {
      const startDay = addDays(startOfWeek(currentDay), i * 7); // Используем startOfWeek для начала недели
      const week = [];
      for (let j = 0; j < 7; j++) {
        const day = addDays(startDay, j);
        const formattedDay = `${format(day, 'EEE', { locale: ru })}, ${format(day, 'dd')}`;
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
      const className = isSelectedDay ? 'text-purple-600 font-semibold' : 'text-neutral-900 font-semibold';

      return (
        <div key={index} className={`col-span-2 border-y py-5 text-center ${className}`}>
          {day}
        </div>
      );
    });
  };
  const timeArray = Array.from({ length: 16 }, (_, index) => index + 7);
  const initialAppointments = [
    {
      day: 1,
      startHour: 10,
      startMinute: "15",
      endHour: 16,
      endMinute: "45",
      clientName: "Анастасия Иванова",
    },
    {
      day: 1,
      startHour: 8,
      startMinute: "00",
      endHour: 10,
      endMinute: "15",
      clientName: "Анастасия Иванова",
    },
    {
      day: 2,
      startHour: 13,
      startMinute: "00",
      endHour: 15,
      endMinute: "00",
      clientName: "Алексей Петров",
    },
    {
      day: 3,
      startHour: 10,
      startMinute: "00",
      endHour: 15,
      endMinute: "00",
      clientName: "Екатерина Смирнова",
    },
    {
      day: 4,
      startHour: 11,
      startMinute: "00",
      endHour: 12,
      endMinute: "00",
      clientName: "Дмитрий Кузнецов",
    },
  ];
  const [appointments, setAppointment] = useState(initialAppointments);
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-purple-900">Февраль, 2024</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrevDay} className="py-1 px-2 h-10 border border-purple-600 text-purple-900 rounded-lg hover:shadow-xl transition-all"> <IoIosArrowBack /> </button>
          <button className="text-lg h-10 px-2 border border-purple-600 text-purple-900 rounded-lg hover:shadow-xl transition-all">Сегодня</button>
          <button onClick={handleNextDay} className="py-1 px-2 h-10 border border-purple-600 text-purple-900 rounded-lg hover:shadow-xl transition-all"> <IoIosArrowForward /> </button>
        </div>
        <div>
          <button className="flex items-center bg-purple-600 text-white text-lg py-1 px-2 rounded-lg gap-2 hover:shadow-xl transition-all"><IoMdAdd className="text-xl"/>Добавить запись</button>
        </div>
      </div>
      <div className="grid grid-cols-15 pt-5">
        <div className="col-span-1 text-neutral-900 font-semibold border-y py-5 text-center"></div>
        {generateDays()}
      </div>
      <div className="grid grid-cols-15 mt-16">
        {timeArray.map((hour) => (
          <React.Fragment key={hour}>
            <div className=" text-center relative h-16" key={hour}>
              <p className="relative translate-y-[-50%] z-10">{`${hour}:00`}</p>
            </div>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div key={day} className="border-t h-16 col-span-2 relative">
                {appointments.map((appointment, index) => (
                  <div key={`time-${day}-${hour}-${index}`}>
                    {appointment.startHour === hour &&
                    appointment.day === day ? (
                      <div
                        className={`rounded-xl shadow-2xl relative z-10 hover:scale-110 transition-all hover:z-50 w-11/12`}
                        style={{
                          ...generateBlockStyle(index).base,
                          ...calculateHeight(
                            appointment.startHour,
                            appointment.endHour,
                            appointment.endMinute,
                            appointment.startMinute
                          ),
                        }}
                      >
                        <div
                          className={`absolute top-0 rounded-t-xl left-0 right-0 text-white font-normal px-2 text-sm`}
                          style={generateBlockStyle(index).second}
                        >
                          Запись : {appointment.startHour}:
                          {appointment.startMinute}-{appointment.endHour}:
                          {appointment.endMinute}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
