import axios  from "axios"

const token = localStorage.getItem("MYtoken")  //給headers做驗證

const form = document.querySelector("#form")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = document.querySelector("#email")
  const user = document.querySelector("#nickname")
  const password = document.querySelector("#password")
  
  if (email.value.trim() !== "" && password.value.trim() !== "")
  {
    const userData = {
      user: {
        email: email.value,
        nickname: user.value,
        password: password.value,
      },
    }

  
    axios.post("https://todoo.5xcamp.us/users", userData)
    .then(( {data} ) => {
      console.log(data);
    })
  }
})


////////////////////////////////////////////////////////////// 
const loginform = document.querySelector("#login_form")

loginform.addEventListener("submit", (e) => {
  e.preventDefault()

  const login_email = document.querySelector("#login_email")
  const login_password = document.querySelector("#login_password")
  

  if (login_email.value.trim() !== "" && login_password.value.trim() !== "")
  {
    const userData = {
      user: {
        email: login_email.value,
        password: login_password.value,
      },
    }

  
    axios.post('https://todoo.5xcamp.us/users/sign_in', userData)
    .then((resp)=>{
      // console.log(resp.headers.authorization);
      const token = resp.headers.authorization 
      // const aa = document.createElement("textarea")
      // aa.value = resp.headers.authorization 
      // loginform.insertAdjacentElement("afterend" , aa)  
      localStorage.setItem("MYtoken", token)
      console.log("登入成功");


document.querySelector("#checkform").addEventListener("submit",(e)=>{
 e.preventDefault()
 const token2 = localStorage.getItem("MYtoken")
 //我是把兩個寫在包在同層      所以token用數字1 2 分開 其實是兩個一樣的東西
    axios.get('https://todoo.5xcamp.us/check', {
        headers: {
          Authorization: token2
        }
      })
      .then(({data}) => {
          document.querySelector("#result").textContent = data.message
        })

      })
    })
  }
})


document.querySelector("#logoutform").addEventListener("submit",(e)=>{
  e.preventDefault()
 

  axios.delete('https://todoo.5xcamp.us/users/sign_out',  {
    headers: {
      Authorization: token
    }
  }) 
  .then((resp) => {
    localStorage.setItem("MYtoken", "")
    console.log(resp);
  }) 
  .catch((err) => {
    console.log(err);
  })
})


document.querySelector("#todoform").addEventListener("submit", (e) =>{
  e.preventDefault()
  
  const todo = document.querySelector("#todo")    
   
  const todoData = {
    todo:{
      content: todo.value.trim(),
    },
  } 

  axios.post('https://todoo.5xcamp.us/todos', todoData, {
    headers: {
      Authorization: token, 
    },
  })
  .then((resp) => {
    
    const li = `<li data-id="${resp.data.id}"><button>X</button>${resp.data.content}<button>修改</button></li>`
    document.querySelector("#UL").insertAdjacentHTML("afterbegin",li)
    e.target.reset()
    console.log(resp);
    
  })

  .then((err) =>{
    console.log(err);
  })

 
})

if (token){
axios.get('https://todoo.5xcamp.us/todos',{
  headers: {
    Authorization: token, 
  }, 
}).then(({data})=>{
  const ul = document.querySelector("#UL")
  data.todos.forEach((todo) =>{
    const li = 
    `<li data-id="${todo.id}">
    <button>X</button>
    ${todo.content}<button>修改</button></li>
    `

    ul.insertAdjacentHTML("beforeend",li)

    // console.log(li);
  })
})
}

document.querySelector("#UL").addEventListener("click",(e)=>{
  if (e.target.nodeName === "BUTTON" && e.target.textContent === "X"){
    const li = e.target.parentElement
    const id = li.dataset.id
    li.remove()

    axios.delete(`https://todoo.5xcamp.us/todos/${id}`,{
      headers: {
      Authorization: token, 
    },
   })
  }


})



document.querySelector("#UL").addEventListener("click",(e)=>{
  if (e.target.nodeName === "BUTTON" && e.target.textContent === "修改"){
    
    const text = document.querySelector("#todo")
    // const li = e.target.parentElement
    const id = li.dataset.id

    const todo = {
      todo: {
        content: text.value,
      }
    }

  axios.put(`https://todoo.5xcamp.us/todos/${id}`,todo,{
    headers: {
      Authorization: token, 
    },
  })  

  
    // li.remove()


  }

  
})







// localStorage.setItem("名稱",值)
// localStorage.getItem("名稱")