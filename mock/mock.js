import Mock from "mockjs";
import uuid from "uuid";


Mock.Random.boolean();
Mock.Random.string();
Mock.Random.date();
Mock.Random.image();
Mock.Random.color();
Mock.Random.cword();
Mock.Random.cparagraph();
Mock.Random.csentence();

export default{
    checkUsername:Mock.mock({
        'isRepeat|1-2':true
    }),
    login:Mock.mock({
        'userId|1':uuid.v4    
    }),
    orderList:Mock.mock({
        "datalist|10":[{
            orderId:function(){
                return 'order_id_' + uuid.v4();
            },
            name:/[\u4e00-\u9fa5]{5,10}/,
            description:/[\u4e00-\u9fa5_a-zA-Z0-9]{15,}/,
            creatorId:uuid.v4,
            createTime:'@date("yyyy-MM-dd HH:mm:ss")',
            iconImg:function(){
                return Mock.Random.image('200x100',Mock.mock('@color'), '#FFF', 'Mock.js');
            },
            sales:10,
            'isdelete|1-2':true
        }]
    })
};



