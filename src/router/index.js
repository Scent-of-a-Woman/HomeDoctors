import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import login from '@/components/Login'
// import Dashboard from '@/components/Dashboard'
//签约管理
import list1 from '@/components/sign/list1'
import list from '@/components/sign/list'
import list2 from '@/components/sign/list2'
// import BookCategoryList from '@/components/bookcategory/list'
//计免疫苗
import vlist1 from '@/components/vaccine/list1'
import vlist2 from '@/components/vaccine/list2'
import vlist3 from '@/components/vaccine/list3'
//老年人体检
import olist1 from '@/components/oldman/list1'
import olist2 from '@/components/oldman/list2'
import olist3 from '@/components/oldman/list3'
//社区医院
import introduce from '@/components/hospital/introduce'
import captain from '@/components/hospital/captain'
import teamlist from '@/components/hospital/teamlist'
//队长管理
import flist from '@/components/finance/list'
import flist2 from '@/components/finance/list2'
//团队信息
import teamdetails from '@/components/team/teamdetails'
//个人信息
import account from '@/components/user/account'
// import UserChangePwd from '@/components/user/changepwd'
import subaccount from '@/components/user/subaccount'
// 网格员
import glist from '@/components/grid/list'
// 数据统计
import total from '@/components/count/total'
import details from '@/components/count/details'
// 数据统计
import more from '@/components/more/more'
import demo from '@/components/more/demo'
// 基因检测
import upImg from '@/components/report/list1'
import upDonwn from '@/components/report/list2'
// 用户评价
import ranking from '@/components/point/list1'
import details_point from '@/components/point/list2'
// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)
    //图片加载
import demo1 from '../assets/images/4.png'
import demo2 from '../assets/images/5.png'
import demo3 from '../assets/images/6.png'
import demo4 from '../assets/images/7.png'
import demo5 from '../assets/images/8.png'
import demo6 from '../assets/images/9.png'
import demo7 from '../assets/images/11.png'
import demo8 from '../assets/images/12.png'
import demo9 from '../assets/images/13.png'
import demo10 from '../assets/images/网格员.png'
import demo11 from '../assets/images/total.png'
import point from '../assets/images/point.png'
Vue.use(Router)

let router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/login',
            name: '登录',
            menuShow: "",
            component: Login,
        },
        {
            path: '/',
            component: Home,
            name: '签约管理',
            iconCls: demo1,
            menuShow: "12345679101199",
            children: [
                { path: '/sign/list1/', component: list1, name: '新增', menuShow: "1345" },
                { path: '/sign/list/', component: list, name: '已签约', menuShow: "1345" },
                { path: '/sign/list2/', component: list2, name: '驳回', menuShow: "1345" },
            ]
        },
        {
            path: '/',
            component: Home,
            name: '计免疫苗',
            menuShow: "12345679101199",
            iconCls: demo2,
            children: [
                { path: '/vaccine/list1/', component: vlist1, name: '计免预约', menuShow: "1347" },
                { path: '/vaccine/list2/', component: vlist2, name: '接种完成', menuShow: "1347" },
                { path: '/vaccine/list3/', component: vlist3, name: '疫苗预约失效', menuShow: "1347" }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '老年人体检',
            menuShow: "12345679101199",
            iconCls: demo3,
            children: [
                { path: '/oldman/list1/', component: olist1, name: '体检预约', menuShow: "1346" },
                { path: '/oldman/list2/', component: olist2, name: '体检完成', menuShow: "1346" },
                { path: '/oldman/list3/', component: olist3, name: '体检预约失效', menuShow: "1346" }
            ]
        },
         {
            path: '/',
            component: Home,
            name: '基因检测',
            menuShow: "12345679101199",
            iconCls: demo10,
            children: [
                { path: '/report/list1/', component: upImg, name: '已领取', menuShow: "125" },
                { path: '/report/list2/', component: upDonwn, name: '已完成', menuShow: "125" }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '药品管理',
            menuShow: "12345679101199",
            iconCls: demo4,
            children: []
        },
        {
            path: '/',
            component: Home,
            name: '社区医院',
            menuShow: "12345679101199",
            iconCls: demo5,
            children: [
                { path: '/hospital/introduce/', component: introduce, name: '医院介绍', menuShow: "14" },
                { path: '/hospital/captain', component: captain, name: '医院概况', menuShow: "14" },
                { path: '/hospital/teamlist', component: teamlist, name: '医院列表', menuShow: "13" },
            ]
        },
        {
            path: '/',
            component: Home,
            name: '医生团队',
            menuShow: "12345679101199",
            iconCls: demo6,
            children: [
                { path: '/team/teamdetails', component: teamdetails, name: '团队详情', menuShow: "15" }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '对账管理',
            menuShow: "12345679101199",
            iconCls: demo7,
            children: [
                { path: '/finance/list/', component: flist, name: '用户列表', menuShow: "134911" },
                { path: '/finance/list2/', component: flist2, name: '收款信息', menuShow: "1349101199" }
            ]
        },
         {
            path: '/',
            component: Home,
            name: '用户评价',
            menuShow: "12345679101199",
            iconCls: point,
            children: [
                { path: '/point/list1/', component: ranking, name: '用户评价', menuShow: "1345679101199" },
                { path: '/point/list2/', component: details_point, name: '评价详情', menuShow: "14" },
            ]
        },
        {
            path: '/',
            component: Home,
            name: '个人中心',
            menuShow: "12345679101199",
            iconCls: demo8,
            children: [
                { path: '/user/account/', component: account, name: '账户管理', menuShow: "1345679101199" },
                { path: '/user/subaccount/', component: subaccount, name: '子账户', menuShow: "134" }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '网格员',
            menuShow: "1",
            iconCls: demo10,
            children: [
                { path: '/grid/list/', component: glist, name: '网格员', menuShow: "1" },

            ]
        },
        {
            path: '/',
            component: Home,
            name: '数据统计',
            menuShow: "12345679101199",
            iconCls: demo11,
            children: [
                { path: '/count/total/', component: total, name: '总览', menuShow: "134" },
                { path: '/count/details/', component: details, name: '详情', menuShow: "13" }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '学习课堂',
            menuShow: "12345679101199",
            iconCls: demo9,
            children: [
                { path: '/more/more/', component: more, name: '观看视频', menuShow: "1345679101199" },
                { path: '/more/demo/', component: demo, name: '测试', menuShow: "1" },
            ]
        }
        
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        window.sessionStorage.removeItem('user');
        next()
    } else {
        let user = JSON.parse(window.sessionStorage.getItem('user'))
        if (!user) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})
export default router