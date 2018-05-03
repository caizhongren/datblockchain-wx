// 以下是业务服务器API地址
// 本机开发时使用
// var WxApiRoot = 'http://localhost:8082/wx/';
// 局域网测试使用
 var WxApiRoot = 'http://192.168.1.28:8082/wx/';
// 云平台部署时使用
// var WxApiRoot = 'http://139.199.130.118:8082/wx/';

// 以下是图片存储服务器API地址
// 本机开发时使用
// var StorageApi = 'http://localhost:8081/storage/storage/create';
// 局域网测试时使用
 var StorageApi = 'http://192.168.1.28:8081/storage/storage/create';
// 云平台部署时使用
//var StorageApi = 'http://139.199.130.118:8081/storage/storage/create';


module.exports = {
    IndexUrl: WxApiRoot + 'home/index', //首页数据接口
    AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
    AuthLoginByAccount: WxApiRoot + 'auth/login', //账号登录
    AuthRegister: WxApiRoot + 'auth/register', //账号注册
    AuthReset: WxApiRoot + 'auth/reset', //账号密码重置
    RegionList: WxApiRoot + 'region/list',  //获取区域列表
    ExitLogin: WxApiRoot + 'auth/exitLogin',//退出登录
    StorageUpload: StorageApi,  //图片上传
    GetDictionary: WxApiRoot + 'dictionary/get',//获取字典值
    SaveExcellentPig: WxApiRoot + 'excellent/save',//新增修改种猪信息
    ListExcellentPig: WxApiRoot + 'excellent/list',//查询种猪列表
    DetailExcellentPig: WxApiRoot + 'excellent/detail', //查询种猪详情
    UpdateExcellentPig: WxApiRoot + 'excellent/update',//修改状态
    QrCodeCheck: WxApiRoot + 'qrCode/check',//校验二维码
    ExcellentPigDelete: WxApiRoot + 'excellent/delete',//种猪删除
    ExcellentVaccineAdd: WxApiRoot + 'excellent/vaccine/save',//疫苗新增修改
    ListExcellentVaccine: WxApiRoot + 'excellent/vaccine/list',//疫苗列表
    ListExcellentMatingSow: WxApiRoot + 'excellent/mating/sow',//待配种母猪
    ListExcellentMatingBoar: WxApiRoot + 'excellent/mating/boar',//待配种公猪
    ExcellentPigMatingCheck: WxApiRoot + 'excellent/mating/check',//交配校验族谱
    ExcellentPigMatingAdd: WxApiRoot + 'excellent/mating/save',//配种新增
    ListExcellentPigMating: WxApiRoot + 'excellent/mating/list',//交配列表
    SowDetail: WxApiRoot + 'excellent/mating/sowDetail',//母猪最新配种记录
    ExcellentPigChildbirthSave: WxApiRoot + 'excellent/childbirth/save',//母猪生产保存
    ExcellentPigChildbirthList: WxApiRoot + 'excellent/childbirth/list',//母猪生产列表
    ExcellentPigSowDetail: WxApiRoot + 'excellent/childbirth/sowDetail',//母猪最新生产详情
    OrdinaryPigRegisterSave: WxApiRoot + 'ordinary/save',//个体识别保存
    ChangeCCExcellentPig: WxApiRoot + 'excellent/changeCC',//种猪转栏
};