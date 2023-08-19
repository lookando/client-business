import { Request, Response } from 'express';
let data = [{
  id: 624748504,
  title: '活动名称1',
  readonly: '活动名称1',
  decs: '这个活动真好玩',
  state: 'open',
  created_at: '1590486176000',
  update_at: '1590486176000',
},
{
  id: 624691229,
  title: '活动名称2',
  readonly: '活动名称2',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
{
  id: 624691224,
  title: '活动名称3',
  readonly: '活动名称3',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
{
  id: 624654229,
  title: '活动名称4',
  readonly: '活动名称4',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
{
  id: 62466544529,
  title: '活动名称5',
  readonly: '活动名称5',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
{
  id: 6246978629,
  title: '活动名称6',
  readonly: '活动名称6',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
{
  id: 624697929,
  title: '活动名称7',
  readonly: '活动名称7',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
{
  id: 624694529,
  title: '活动名称8',
  readonly: '活动名称8',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
{
  id: 62478229,
  title: '活动名称9',
  readonly: '活动名称9',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
{
  id: 624691699,
  title: '活动名称10',
  readonly: '活动名称10',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
{
  id: 624694529,
  title: '活动名称11',
  readonly: '活动名称11',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
{
  id: 624665229,
  title: '活动名称12',
  readonly: '活动名称12',
  decs: '这个活动真好玩',
  state: 'closed',
  created_at: '1590481162000',
  update_at: '1590481162000',
},
]
export default {




  // 支持值为 Object 和 Array
  'POST /api/infoClassPages': (req: Request, res: Response) => {
    const { current, pageSize } = req.body
    let x = (current - 1) * pageSize
    let _data = data.slice(x, x + pageSize)
    res.send({
      success: true,
      total: data.length,
      data: _data,
    });
  },
  // 支持值为 Object 和 Array
  'POST /api/saveInfoClass': (req: Request, res: Response) => {
    const { current, pageSize, dataSource } = req.body
    let x = (current - 1) * pageSize
    let _data = data.slice(x, x + pageSize)

    for (let i = 0; i < dataSource.length; i++) {
     let _has = data.findIndex((item) => {
        return dataSource[i].id == item.id
      })
      // 新增的
      if (_has == -1) {
        data.push(dataSource[i])
      } else {
        // 修改覆盖
        // let has = data.findIndex((item) => {
        //   return dataSource[i].id == item.id
        // })
        // data.splice(has, 1, dataSource[i])
      }
    }

    for(let i= 0;i<_data.length;i++){
      let _has = dataSource.findIndex((item) => {
        return _data[i].id == item.id
      })
        // 删除掉的
        if(_has == -1){
          let _index = data.findIndex((item_1)=>{
            return _data[i].id  == item_1.id
          })
          data.splice(_index,1)

          }else{
            // 修改覆盖
            // data.splice(_has,1,dataSource[i])
          }
    }


    res.send({
      success: true,
      total: data.length,
      data: data,
    });
  },

};
