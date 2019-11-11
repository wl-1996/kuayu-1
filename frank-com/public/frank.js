console.log("frank");

// 方案一：AJAX请求，用frank.com里的js请求qq.com里的friends.json文件：
// const request = new XMLHttpRequest();
// request.open("GET", "http://qq.com:8888/friends.json");
// request.onreadystatechange = () => {
//   if (request.readyState === 4 && request.status === 200) {
//     console.log(request.response);
//   }
// };

// request.send();

// 方案二：用JSONP，用frank.com里的js动态请求qq.com里的friends.js文件，friend.js文件存放的有friends.json的数据；该方法是为了兼容IE
// const random = 'frankJSONPCallbackName'+Math.random()
// console.log(random)
// window[random] = (data)=>{
//   console.log(data)
// }
// const script = document.createElement("script")
// // ?号后面是查询字符串
// script.src = `http://qq.com:8888/friends.js?functionName=${random}`
// script.onload = ()=>{
//   script.remove()
// }
// document.body.appendChild(script)

// 方案二进行封装：
function jsonp(url){
  return new Promise((resolve,reject)=>{
    const random = "frankJSONPCallbackName"+Math.random()
    window[random] = data=>{
      resolve(data)
    }
    const script = document.createElement("script")
    script.src = `${url}?callback=${random}`
    script.onload=()=>{
      script.remove()
    }
    script.onerror=()=>{
      reject()
    }
    document.body.appendChild(script)
  })
}

jsonp('http://qq.com:8888/friends.js')
  .then((data)=>{
    console.log(data)
  })