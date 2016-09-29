//先是基本函数部分
function swap(arr,index1,index2){
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
//生成随机数组的函数
function createarr(num){
    var testarr = [];
    for(var i=0; i<num; i++){
        testarr[i] = Math.floor(Math.random()*100);
    }
    return testarr;
}
//冒泡排序
function bubbleSort(arr){
    for(var i=0; i<arr.length; i++){
        for(var j = 0; j<arr.length-i-1; j++){
            if(arr[j] > arr[j+1]){
                swap(arr,j,j+1);
            }
        }
    }
    return arr;
}

//选择排序（核心是记录剩余数组最小值的下标）
function selectionSort(arr){
    var minpos;
    for(var i=0; i<arr.length-1; i++){
        minpos = i;
        for(var j=i+1; j<arr.length; j++){
            if(arr[j] < arr[minpos]){//判断是不是小于剩余数组的所有值
                minpos = j;//记录下最小值的位置
            }
            swap(arr,i,minpos);//把最小值交换至排好序部分的最后一位
        }
    }
    return arr;
}

//插入排序 (效率最高)
//外循环将数组元素挨个移动，内循环对外循环中选中的元素及其后的元素进行比较
//其他元素需要右移为插入它们之前的元素腾位置
function insertionSort(arr){
    for(var i=1; i<arr.length; i++){
        var j = i;
        var temp = arr[i];//要引入temp是因为这个i位置的元素是被取出比较的
        while(j>0 && (arr[j-1]>temp)){
            arr[j] = arr[j-1]; //元素右移
            j--;
        }
        arr[j] = temp;
    }
    return arr;
}

//堆排序 升序大根堆  降序小根堆
//headAdjust的含义是把最大值调整至根节点
function headAdjust(elements,pos,len){
    var child = pos*2 + 1;//定位到当前节点的左边的子节点
    //上面这个数量关系是满二叉树的父节点序号与子序号的关系
    while(child < len){//看看左右节点的大小关系，使用较大的child节点来进行后面的处理。
        if(child + 1 < len && elements[child] < elements[child + 1]){
            child += 1;
        }
        //比较当前节点与较大子节点的大小，小于则进行值的交换
        //并定位到当前的子节点上。(定位到小的节点上)
        if(elements[pos] < elements[child]){
            var temp = elements[pos];
            elements[pos] = elements[child];
            pos = child;
            elements[pos] = temp;
            child = pos*2 +1;//开始处理下面的子节点
        }
        else{
            break;
        }
    }
}
//构建堆排序函数
function buildHeap(elements){
    for(var i=elements.length/2; i>=0; i--){//i代表共有多少个这种二叉树单位结构
        headAdjust(elements,i,elements.length);
    }
    for(var i=elements.length-1; i>0; i--){//注意是倒序遍历 一个个元素的弹出 
        swap(elements,i,0)
        headAdjust(elements,0,i);
    }
    return elements;
}

//希尔排序（循环更改比较间隔多次进行插入排序,提高排序效率）
function shellSort(arr){
    var gaps = [5,3,1];
    for(var g=0; g< gaps.length; g++){
        for(var i=1; i<arr.length; i++){
            var j = i;
            var temp = arr[i];//
            while(j >= gaps[g] && (arr[j-gaps[g]]>temp)){
                arr[j] = arr[j-gaps[g]]; //元素右移动态位数
                j -= gaps[g];
            }
            arr[j] = temp;
        }
    }
    return arr;
}
//改进的动态生成间距的希尔排序
function newShellSort(arr){
    var N = arr.length;
    var h = 1;
    while(h < N/3){
        h = 3*h+1;
    }
    while(h >= 1){
        for(var i=h; i<N; i++){
            var j=i;
            var temp = arr[j];
            while(j>=h && (arr[j-h]>temp)){
                arr[j] = arr[j-h];
                j -= h;
            }
            arr[j] = temp;
        }
        h = (h-1)/3;
    }
    return arr;
}


//归并排序(复杂排序中唯一一个稳定的排序)
//将无序的数组拆成N部分进行有序处理 然后合并（逆二分法的感觉）
//首先将数据集拆分成一组只有一个的元素，而后创建一组左右子树来合并单个元素，
//每次合并保存一部分排好序的数据，直到最后组成的这个数组的所有数据完美排序。
function mergeSort(arr){
    if(arr.length < 2){
        return;
    }
    var step = 1;
    var left,right;
    while(step < arr.length){
        left = 0;
        right = step;
        while(right + step <= arr.length){
            mergeArrays(arr,left,left+step,right,right+step);//合并数组操作
            left = right + step;
            right = left + step;
            //左右序号递增step个距离
        }
        if(right < arr.length){
            //如果right+step大于数组的长度，那么剩余的就作为一个数组来合并
            mergeArrays(arr, left, left+step, right, arr.length);
        }
        step *= 2; //step指的是每次合并的数组的长度
    }
    return arr;
}
//下面这个是归并排序的核心操作
function mergeArrays(arr,startLeft,stopLeft,startRight,stopRight){
    var rightArr = new Array(stopRight - startRight + 1);
    var leftArr = new Array(stopLeft - startLeft + 1);
    k = startRight;
    for(var i=0; i<(rightArr.length-1); i++){
        rightArr[i] = arr[k];
        k++;
    }
    k = startLeft;
    for(var i=0; i<(leftArr.length-1); i++){
        leftArr[i] = arr[k];
        k++;
    }
    rightArr[rightArr.length-1] = Infinity;//哨兵值
    rightArr[leftArr.length-1] = Infinity;//哨兵值
    var m = 0;
    var n = 0;
    //下面的for循环逻辑因为每个小的数组都排好序了，因此比较快速
    for(var k = startLeft; k<stopRight; k++){
        if(leftArr[m] <= rightArr[n]){
            arr[k] = leftArr[m];//谁小谁放在新组成的arr前面
            m++;
        }
        else{
            arr[k] = rightArr[n];//谁小谁放在前面
            n++;
        }
    }
}


//快速排序 
//找一个基准值 根据相对于这个值的大小关系来分成两个数组 再合并
function quickSort(arr){
    if(arr.length == 0){
        return [];
    }
    var tmp = arr[0];
    var left = [];
    var right = [];
    for(var i=1; i<arr.length; i++){
        if(arr[i] < tmp){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(tmp,quickSort(right));
}
//随机生成数组的时间测试函数
var arr = createarr(100000);
function timeClc(func,arr0){
    var arr = [];
    for(let i=0; i<arr0.length; i++){
        arr[i] = arr0[i];
    } //这个for循环创建了形参的深度克隆。
    start = new Date().getTime();
    func(arr);
    stop = new Date().getTime();
    console.log(stop-start);
}

timeClc(bubbleSort,arr);
timeClc(selectionSort,arr);
timeClc(insertionSort,arr);
timeClc(quickSort,arr);
timeClc(buildHeap,arr);
timeClc(newShellSort,arr);