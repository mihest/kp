'use client'


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Dropdown from '@/app/components/Dropdown'
import dayjs from "dayjs";

export default function Calendar({ align, children, value, setValue, minDate, shouldDisableDate }) {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                {children}
                <div className="flex justify-center ">
                    <span className="text-gray-700 dark:text-gray-300 text-[32px]">
                        {dayjs(value).format('DD')}
                    </span>
                </div>
                <div className="flex justify-center gap-2 text-gray-300">
                    <span>{dayjs(value).locale('ru').format('DD MMMM').split(' ')[1][0].toUpperCase()}{dayjs(value).locale('ru').format('DD MMMM').split(' ')[1].slice(1)}</span>
                    <span>{dayjs(value).format('YYYY')}</span>
                </div>
            </Dropdown.Trigger>
            <Dropdown.Content align={align} width="auto" onClick top>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar value={value}
                                  onChange={ (newValue) => {
                                      setValue(newValue);
                                  }} minDate={minDate}
                                  shouldDisableDate={shouldDisableDate}
                    />

                </LocalizationProvider>
            </Dropdown.Content>
        </Dropdown>
    );
}