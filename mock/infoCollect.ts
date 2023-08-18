import { Request, Response } from 'express';
export default {
  // 支持值为 Object 和 Array
  'POST /api/infoClassPages': (req: Request, res: Response) => {
    res.send({
      success: true,
      data:
        [{
          id: 624748504,
          title: '活动名称一',
          readonly: '活动名称一',
          decs: '这个活动真好玩',
          state: 'open',
          created_at: '1590486176000',
          update_at: '1590486176000',
        },
        {
          id: 624691229,
          title: '活动名称二',
          readonly: '活动名称二',
          decs: '这个活动真好玩',
          state: 'closed',
          created_at: '1590481162000',
          update_at: '1590481162000',
        }]
    });
  },

};
