var mapSize = 14;
//14 个单元格,每个单元格的大小等于地图的大小(mapS)/mapSize

var mapS = 500;
//地图的大小

var computerID;
//记录电脑的ID

var judge = true;
//这个方向是否可走

var obstacle = 7;
//障碍物个数（重叠时可小于7）

var up = 0;

var left = 0;

var right = 0;

var down = 0;
//记录四方位上距离电脑的距离

function createMap() {

    var x = Math.round(Math.random() * (mapSize - 3)) + 1;  //行

    var y = Math.round(Math.random() * (mapSize - 3)) + 1;  //列

    //创建地图的函数Math.random() 产生一个[0，1)之间的随机数
    //同时避免直接输的情况，最多会跑到正数或者倒数第2行或者列

    computerID = x + "_" + y;
    //x,y定义在下方故把computerID写在下半部分

    var Shower = document.createElement("table");//创建表格，table为实际名词，以下定义长宽的也是实际意思，设定你的长宽。

    Shower.style.width = mapS + "px";

    Shower.style.height = mapS + "px";

    Shower.border = "5";

    var Lobj = document.createElement("tbody");//新建一个tbody类型的Element节,若删去，表格会变得很小。
    //tbody 元素会为全部表格自动定义，就算表格没有显式定义tbody元素。

    for (var i = 0; i < mapSize; i++) {

        var trobj = document.createElement("tr");

        for (var j = 0; j < mapSize; j++) {

            var tdobj = document.createElement("td");
            //设定行和列

            tdobj.id = i + "_" + j //给其id赋值

            tdobj.onclick = tdClick; //td在上行设置的

            if (i + "_" + j == computerID) {

                tdobj.style.backgroundColor = "blue";//找到一开始随机设定的格子，设定颜色

            }

            trobj.appendChild(tdobj);//一定要把自己添加进去，否则游戏显示为空白

            //document.createElement()是在对象中创建一个对象,与appendChild() 或 insertBefore()方法联合使用。
            //appendChild() 方法在节点的子节点列表末添加新的子节点。insertBefore() 方法在节点的子节点列表任意位置插入新的节点。
        }

        Lobj.appendChild(trobj);

    }

    Shower.appendChild(Lobj);

    document.getElementById("map_div").appendChild(Shower);

    //不过，因为如果您需要查找文档中的一个特定的元素或集合，最有效的方法是 getElementById()和jQueey。可以用该 ID 查找想要的元素。
    //定位到html的map_div上

    for (var i = 0; i < obstacle; i++) {

        var _id = Math.round(Math.random() * (mapSize - 1)) + "_" + Math.round(Math.random() * (mapSize - 1));

        if (document.getElementById(_id).style.backgroundColor == "")

            document.getElementById(_id).style.backgroundColor = "gray";
        //给障碍物颜色赋值
    }

}

//此处为默认随机障碍物

function tdClick() {

    if (this.style.backgroundColor == "") {

        this.style.backgroundColor = "gray";

        up = 0;

        left = 0;

        right = 0;

        down = 0;

        computerXZ();//这个函式在下面

    }

}

function computerXZ() {

    var xy = computerID.split("_");
    //split() 方法用于把一个字符串分割成字符串数组。

    var x = xy[0] - 0;

    var y = xy[1] - 0;

    var mid = (mapSize - 1) / 2;

    //获得中心位置

    //处于左上角，判断走路的方向。||是或的意思，有1为true，都为0为false。

    if (x <= mid && y <= mid) {

        //向上

        if (x <= y) {

            //向上不通,向左走 //false 表示是判断,true 表示行走

            if (!computerUp(x, y, false)) {

                //向左不通，向右走

                if (!computerLeft(x, y, false)) {

                    //向右不通，向下走

                    if (!computerRight(x, y, false)) {

                        //向下不通，向下走(往最长的方向走)

                        if (!computerDown(x, y, false)) {

                            direction(up, left, right, down, x, y)

                        }

                    }

                }

            }

        }

        else  //向左

        {

            if (!computerLeft(x, y, false)) {

                if (!computerUp(x, y, false)) {

                    if (!computerDown(x, y, false)) {

                        if (!computerRight(x, y, false)) {

                            direction(up, left, right, down, x, y)

                        }

                    }

                }

            }

        }

    }

    //右上角(分析向右和向上的最快出口，电脑获得胜利。)

    else if (x <= mid && y >= mid) {

        if (x <= (mapSize - 1 - y)) //向上

        {

            if (!computerUp(x, y, false)) {

                if (!computerRight(x, y, false)) {

                    if (!computerLeft(x, y, false)) {

                        if (!computerDown(x, y, false)) {

                            direction(up, left, right, down, x, y)

                        }

                    }

                }

            }

        }

        else  //向右

        {

            if (!computerRight(x, y, false)) {

                if (!computerUp(x, y, false)) {

                    if (!computerDown(x, y, false)) {

                        if (!computerLeft(x, y, false)) {

                            direction(up, left, right, down, x, y)

                        }

                    }

                }

            }

        }

    }

    //右下角

    else if (x >= mid && y >= mid) {

        if (x >= y) //向下

        {

            if (!computerDown(x, y, false)) {

                if (!computerRight(x, y, false)) {

                    if (!computerLeft(x, y, false)) {

                        if (!computerUp(x, y, false)) {

                            direction(up, left, right, down, x, y)

                        }

                    }

                }

            }

        }

        else  //向右

        {

            if (!computerRight(x, y, false)) {

                if (!computerDown(x, y, false)) {

                    if (!computerUp(x, y, false)) {

                        if (!computerLeft(x, y, false)) {

                            direction(up, left, right, down, x, y)

                        }

                    }

                }

            }

        }

    }

    //左下角

    else if (x >= mid && y <= mid) {

        if ((mapSize - 1 - x) <= y) //向下

        {

            if (!computerDown(x, y, false)) {

                if (!computerLeft(x, y, false)) {

                    if (!computerRight(x, y, false)) {

                        if (!computerUp(x, y, false)) {

                            direction(up, left, right, down, x, y)

                        }

                    }

                }

            }

        }

        else  //向左

        {

            if (!computerLeft(x, y, false)) {

                if (!computerDown(x, y, false)) {

                    if (!computerUp(x, y, false)) {

                        if (!computerRight(x, y, false)) {

                            direction(up, left, right, down, x, y)

                        }

                    }

                }

            }

        }

    }

}

function direction(up, left, right, down, _x, _y) {

    if (up == 0 && left == 0 && right == 0 && down == 0) {

        alert("被抓住了呜呜呜呜！");

        window.location.href = window.location.href;
        //四个方向都被限制住了，即取得胜利
    }
    else {

        var arrayDirection = new Array(up, left, right, down);

        arrayDirection.sort(function (x, y) { return y - x; })

        //对方往离自己(对方)最远的那个障碍物走

        if (up == arrayDirection[0])

            computerUp(_x, _y, true);

        else if (down == arrayDirection[0])

            computerDown(_x, _y, true);

        else if (left == arrayDirection[0])

            computerLeft(_x, _y, true);

        else if (right == arrayDirection[0])

            computerRight(_x, _y, true);

    }

}

//判断是否输了，底下就是判断是否电脑赢了
function isDeath() {

    for (var i = 0; i < mapSize; i++) {

        if (document.getElementById(i + "_" + (mapSize - 1)).style.backgroundColor == "blue" ||

            document.getElementById((mapSize - 1) + "_" + i).style.backgroundColor == "blue" ||

            document.getElementById(i + "_0").style.backgroundColor == "blue" ||

            document.getElementById("0_" + i).style.backgroundColor == "blue") {

            alert("哈哈哈哈哈哈哈哈哈！");

            window.location.href = window.location.href;

        }

    }

}

function computerUp(x, y, mode)//向上走

{

    for (var i = x - 1; i >= 0; i--) {

        if (document.getElementById(i + "_" + y).style.backgroundColor == "") {

            judge = true;

            up++;

        }

        else {

            judge = false;

            break;

        }

    }

    if (judge || mode) {

        document.getElementById(computerID).style.backgroundColor = "";

        document.getElementById((x - 1) + "_" + y).style.backgroundColor = "blue";

        computerID = (x - 1) + "_" + y;

        isDeath();

        return true;

    }

    return false;

}

function computerLeft(x, y, mode)//向左走

{

    for (var i = y - 1; i >= 0; i--) {

        if (document.getElementById(x + "_" + i).style.backgroundColor == "") {

            judge = true;

            left++;

        }

        else {

            judge = false;

            break;

        }

    }

    if (judge || mode) {

        document.getElementById(computerID).style.backgroundColor = "";

        document.getElementById(x + "_" + (y - 1)).style.backgroundColor = "blue";

        computerID = x + "_" + (y - 1);

        isDeath();

        return true

    }

    return false;

}

function computerRight(x, y, mode)//向右走

{

    for (var i = y + 1; i < mapSize; i++) {

        if (document.getElementById(x + "_" + i).style.backgroundColor == "") {

            judge = true;

            right++;

        }

        else {

            judge = false;

            break;

        }

    }

    if (judge || mode) {

        document.getElementById(computerID).style.backgroundColor = "";

        document.getElementById(x + "_" + (y + 1)).style.backgroundColor = "blue";

        computerID = x + "_" + (y + 1);

        isDeath();

        return true

    }

    return false;

}

function computerDown(x, y, mode)//向下走

{

    for (var i = x + 1; i < mapSize; i++) {

        if (document.getElementById(i + "_" + y).style.backgroundColor == "") {

            judge = true;

            down++;

        }

        else {

            judge = false;

            break;

        }

    }

    if (judge || mode) {

        document.getElementById(computerID).style.backgroundColor = "";

        document.getElementById((x + 1) + "_" + y).style.backgroundColor = "blue";

        computerID = (x + 1) + "_" + y;

        isDeath();

        return true;

    }

    return false;

}