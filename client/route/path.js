const path = {
    rootPath:'/',
    dashboard:{
        rootPath:'/dashboard', //概览
        events:{//活动
            rootPath:     '/dashboard/events',
            eventList:    '/dashboard/events/list' ,//活动列表
            eventCreate:     '/dashboard/events/create', //创建活动
            eventDetail:  '/dashboard/events/detail/:eventId' //活动详情
        },
        wares:{ //商品
            rootPath:   "/dashboard/wares",
            waresList:  "/dashboard/wares/list", //商品列表
            waresDetail:"/dashboard/wares/detail/:waresId" //商品详情
        },
        order:{ //订单
            orderRootPath:   "/dashboard/order" ,
            verificationSheetRootpath:  "/dashboard/verificationSheet", 
            orderList:  "/dashboard/order/list" , //订单列表
            orderDetail:"/dashboard/order/detail/:orderId",  //订单详情
            verificationList :  "/dashboard/verificationSheet/list" , //核销单列表，
            verificationDetail : "/dashboard/verificationSheet/detail/:vsId" , //核销单详情，
        },
        prize:{ //开奖管理
            rootPath:'/dashboard/prize',
            openPrizeList:   '/dashboard/prize/openprize/list' ,// 开奖列表
            winnerOfPrizeList:  '/dashboard/prize/prizeuser/list' //中奖用户
        },
        setting:{//系统设置
            rootPath:'/dashboard/setting',
            user: '/dashboard/setting/user', //用户设置
            self: '/dashboard/setting/self', //个人设置
            role: '/dashboard/setting/role', //角色管理
            purview: '/dashboard/setting/purview', //权限管理
            loginLog: '/dashboard/setting/loginLog', //登录日志
            params: '/dashboard/setting/params', //参数设置
        }
    }
};

export default path