import { Alert, Button, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { APIBasic } from '@/services/attendance/maintenance';

const CalendarTable = ({ }: {}) => {
  const [value, setValue] = useState(() => dayjs('2023-06-20'));
  const [blEdit, setBlEdit] = useState(false);
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2023-06-20'));
  const [calendarData, setcalendarData]: any = useState([{
    phyDate: "2023-07-01",
    businessFlag: "0"
  },
  {
    phyDate: "2023-07-02",
    businessFlag: "0"
  },
  {
    phyDate: "2023-07-05",
    businessFlag: "0"
  },
  {
    phyDate: "2023-07-06",
    businessFlag: "0"
  },]);

  const onSelect = (newValue: Dayjs) => {
    if (blEdit) {
      let x = calendarData.findIndex((item) => {
        return item.phyDate == dayjs(newValue).format('YYYY-MM-DD')
      })
      if (x == -1) {
        calendarData.push({ phyDate: `${dayjs(newValue).format('YYYY-MM-DD')}`, businessFlag: '0' })
      } else {
        calendarData.splice(x, 1)
      }
    }
    setValue(newValue);
    setSelectedValue(newValue);
    // for(let i = 0 ; i < calendarData.length;i ++){
    //   if(calendarData[i].phyDate == dayjs(newValue).format('YYYY-MM-DD')){

    //   }
    // }
    // if(dayjs(newValue).format('YYYY-MM-DD'))
    console.log(newValue,'newValue');
    

    // setcalendarData(dayjs(newValue).format('YYYY-MM-DD'))

  };
  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);


  };

  const dateCellRender = (values: any) => {
    const listData = getListData(values);




    return (
      <div style={{ height: '100%' }}>
        {listData.map((item: any) => (
          <div key={item.index} style={item.style}></div>
        ))}
      </div>
    );
  };

  const getListData = (paramDate: Dayjs) => {
    let listData: any = [];
    const obj: any = [
      {
        style: {
          background: '#FFCCCC',
          height: '100%',
        },
      },
    ];
    // console.log(calendarData,'calendarData');

    calendarData.map((item: any) => {
      switch ((dayjs(paramDate).format('YYYY-MM-DD'))) {
        case item.phyDate:
          listData = obj;
          break;
        default:
      }
    })
    return listData || [];
  };

  // const getCurrentMonth = async () => {
  //   let date: any = new Date;
  //   let currentDate = dayjs(date).format('YYYY-MM');
  //   // let { data } = await APIBasic.calendarList(currentDate);
  //   // setcalendarData({ data }.data);
  //   setcalendarData([
  //     {
  //       phyDate: "2023-06-01",
  //       businessFlag: "0"
  //     },
  //     {
  //       phyDate: "2023-06-02",
  //       businessFlag: "0"
  //     },
  //     {
  //       phyDate: "2023-06-05",
  //       businessFlag: "0"
  //     },
  //     {
  //       phyDate: "2023-06-06",
  //       businessFlag: "0"
  //     },
  //   ]);
  // }
  // useEffect(() => {
  //   getCurrentMonth();
  // }, [])

  return <>
    <Button onClick={() => {
      setBlEdit(true)
    }}>编辑</Button>
    <Button onClick={() => {
      setBlEdit(false)
    }}>保存</Button>
    <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
    <Calendar dateCellRender={dateCellRender} onSelect={onSelect} onPanelChange={onPanelChange} />;
  </>

};


export default CalendarTable;
