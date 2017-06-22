//保存数据
var db = openDatabase('informationdb','','local database demo',204800);

function save(){
    var user_name = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var score = 0;
    var time = new Date().getTime();
    db.transaction(function(tx){
        tx.executeSql('insert into game values(?,?,?,?)',[user_name,password,score,time],onSuccess,onError);
    });

}
 //sql语句执行成功后执行的回调函数
function onSuccess(tx,rs){
    alert("操作成功");
    window.location.href = "index.html";
}
//sql语句执行失败后执行的回调函数
function onError(tx,error){
    alert("操作失败，失败信息："+ error.message);
}

//将所有存储在sqlLite数据库中的联系人全部取出来
function loadAll(){
    var list = document.getElementById("list");
    db.transaction(function(tx){
        //查询所有联系人记录
        tx.executeSql('select user,score,createtime from game order by score DESC',[],function(tx,rs){
            if(rs.rows.length>0){
                var result = "<table>";
                result += "<tr><th>序号</th><th>用户名</th><th>分数</th><th>用户创建时间</th></tr>";
                for(var i=0;i<rs.rows.length;i++){
                    var row = rs.rows.item(i);
                    //转换时间，并格式化输出
                    var time = new Date();
                    time.setTime(row.createtime);
                    var timeStr = time.format("yyyy-MM-dd hh:mm:ss");
                    //拼装一个表格的行节点
                    result += "<tr><td>"+(i+1)+"</td><td>"+row.user+"</td><td>"+row.score+"</td><td>"+timeStr+"</td></tr>";
                }
                list.innerHTML = result;
            }else{
                list.innerHTML = "目前数据为空，赶紧开始加入联系人吧";
            }
        });
    });
}

Date.prototype.format = function(format)
{
    var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1 ? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
//删除联系人信息
function del(user){
     db.transaction(function(tx){
        //注意这里需要显示的将传入的参数phone转变为字符串类型
        tx.executeSql('delete from game where user=?',[String(user)],onSuccess,onError);
    });
}
function isExist(user) {
    db.transaction(function(tx){
        //注意这里需要显示的将传入的参数phone转变为字符串类型
        tx.executeSql('select * from information where user=?',[String(user)],function (tx,rs) {
            if(rs.rows.length>0)
                return 1;
            else
                return 0;
        });
    });
}
function verify() {
    var user_name = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var currentUser;
    if(!user_name)
        return;
    db.transaction(function (tx) {
        tx.executeSql('select * from game where user=? and password=?', [String(user_name), String(password)], function (tx, rs) {
            if (rs.rows.length > 0) {
                SetCookie(currentUser, user_name);
                window.location.href = "index.html";
            }
            else
                alert("密码错误！");
        })
    });
}