// data.js
import {
  BiCalendar,
  BiUser,
  BiCrown,
  BiCog,
  BiBarChart,
  BiDollar,
  BiTime,
  BiBasket,
  BiListCheck,
  BiBookmark,
  BiLogOut,
} from "react-icons/bi";

export const sidebarItems = [
  { name: "Статистика", icon: <BiBarChart />, route: "/" },
  { name: "Календарь", icon: <BiCalendar />, route: "/calendar" },
  { name: "Список клиентов", icon: <BiUser />, route: "/clients-list" },
  { name: "История посещений", icon: <BiTime />, route: "/visit-history" },
  { name: "Каталог услуг", icon: <BiBasket />, route: "/services-catalog" },
  { name: "Сотрудники", icon: <BiListCheck />, route: "/employees" },
  { name: "Отчеты по доходам", icon: <BiDollar />, route: "/income-reports" },
  {
    name: "Статистика продаж",
    icon: <BiBarChart />,
    route: "/sales-statistics",
  },
  {
    name: "Управление акциями",
    icon: <BiCrown />,
    route: "/manage-promotions",
  },
  { name: "Добавить скидку", icon: <BiBookmark />, route: "/add-discount" },
  { name: "Настройки профиля", icon: <BiCog />, route: "/profile-settings" },
  { name: "Выйти", icon: <BiLogOut />, route: "/logout" },
];