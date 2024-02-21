import React, { useState } from "react";

const initialAppointments = [
  { day: 1, startHour: 9, startMinute: "00", endHour: 11, endMinute: "00" },
  { day: 2, startHour: 13, startMinute: "00", endHour: 15, endMinute: "00" },
  { day: 3, startHour: 10, startMinute: "00", endHour: 15, endMinute: "00" },
];

const timeArray = Array.from({ length: 16 * 2 }, (_, index) => ({
  hour: Math.floor(index / 2) + 7,
  minute: index % 2 === 0 ? "00" : "30",
}));

const Schedule = () => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const isCellOccupied = (day, hour, minute) => {
    return appointments.some(
      (appointment) =>
        day === appointment.day &&
        ((hour > appointment.startHour && hour < appointment.endHour) ||
          (hour === appointment.startHour &&
            minute >= appointment.startMinute) ||
          (hour === appointment.endHour && minute <= appointment.endMinute))
    );
  };

  const addAppointment = (day, hour, minute) => {
    let endHour = hour;
    let endMinute = minute === "00" ? "30" : "00";

    if (minute === "30") {
      endHour += 5;
    }

    const newAppointment = {
      day,
      startHour: hour,
      startMinute: minute,
      endHour,
      endMinute,
    };

    setAppointments([...appointments, newAppointment]);
  };

  return (
    <div className="grid grid-cols-15">
      {/* ... Заголовки столбцов */}
      <div className="col-span-1 py-4 bg-purple-800 text-white w-1/2 translate-x-full"></div>
      <div className="col-span-2 py-4 bg-purple-800 text-white">Пн</div>
      <div className="col-span-2 py-4 bg-purple-800 text-white">Вт</div>
      <div className="col-span-2 py-4 bg-purple-800 text-white">Ср</div>
      <div className="col-span-2 py-4 bg-purple-800 text-white">Чт</div>
      <div className="col-span-2 py-4 bg-purple-800 text-white">Пт</div>
      <div className="col-span-2 py-4 bg-purple-800 text-white">Сб</div>
      <div className="col-span-2 py-4 bg-purple-800 text-white">Вс</div>

      {/* Время и записи */}
      {timeArray.map(({ hour, minute }) => (
        <React.Fragment key={`${hour}:${minute}`}>
          {/* Столбец времени */}
          <div
            key={`time-${hour}-${minute}`}
            className="col-span-1 py-3 text-gray-900"
          >{`${hour.toString().padStart(2, "0")}:${minute}`}</div>

          {/* Записи для каждого дня */}
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div
              key={`cell-${day}-${hour}-${minute}`}
              className={`col-span-2 border-b border-gray-300 p-2 relative ${
                isCellOccupied(day, hour, minute)
                  ? "bg-purple-700 border-b-0 w-11/12"
                  : ""
              } `}
              onClick={() => addAppointment(day, hour, minute)}
            >
              {appointments.map((appointment, index) =>(
                <p key={`time-${hour}-${minute}-${index}}`} className="text-white text-sm"> 
                  {appointment.startHour === hour && appointment.startMinute === minute && appointment.day === day ? <div className="font-normal bg-purple-900 absolute p-2 top-0 left-0 right-0 z-10">
                   {`${appointment.startHour}:${appointment.startMinute} - ${appointment.endHour}:${appointment.endMinute}`}
                  </div> : ''}
                </p>
              ))}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Schedule;
