import { useState } from "react";

const InitialData=[
  {
    id:123,
    name:"Jhon Deo",
    img:"https://i.pravatar.cc/150?img=8",
    balance:-7
  },
  {
    id:223,
    name:"Smith",
    img:"https://i.pravatar.cc/150?img=7",
    balance:20
  },
  {
    id:435,
    name:"Thomas",
    img:"https://i.pravatar.cc/150?img=3",
    balance:0
  },
]
export default function App() {
  const [addNew, setaddNew]=useState(false)
  const [Select, setSelect]=useState(null)
  const [NewList, setNewList]=useState(InitialData)
  function AddNow(New){
    setNewList([...NewList,New])
  }
  function AddNewFriend(){
    setaddNew(!addNew)
  }
  function UpdateInfo(Value){
    console.log(Value);
    // Update Data
    setNewList(NewList.map(friend=>friend.id===Select.id? {...friend, balance:Value}:friend))
    console.log(NewList);
  }
  function SelectWindow(Data){
    Data? setSelect(Data): setSelect(null)
    setaddNew(false)
  }
  return (
    <div className="App">
      <div className="conatinar">
      <div className="left">
        <All NewList={NewList} SelectWindow={SelectWindow} Select={Select} AddNewFriend={AddNewFriend}/>
        {!addNew && <Butn Add="Add" WhenCLick={AddNewFriend}>Add Friend</Butn>}
        {addNew && <Form  AddNow={AddNow}/>}
        {addNew && <Butn Add="Add3" WhenCLick={AddNewFriend}>Close</Butn>}
      </div>
        <div className="right">
        {Select && <h2>{`Share bill with ${Select.name}`}</h2>}
        {Select && <Form2 Friend={Select} UpdateInfo={UpdateInfo}/>}
        </div>
      </div>
    </div>
  );
}
function All({NewList, Select, SelectWindow}){
  return(
    <div>
    {NewList.map((x)=><Items Friend={x} Select={Select} SelectWindow={SelectWindow}  key={x.id}/>)}
    </div>
  )
}

function Form2({Friend,UpdateInfo}){
  const [Bill,setBill]=useState("")
  const [Self,setSelf]=useState(0)
  const [Id,setId]=useState(0)
  let FPay=Bill? Bill-Self : ""
  function FormSubmit(e){
    e.preventDefault()
    if(Id===0 || Bill===""){
      return
    }
    if(Self===0 && Id!==1){
      return
    }
    UpdateInfo(Id===1?FPay:-FPay)
    setBill("")
    setSelf(0)
    setId("")
  }
  return(
    <form action="" onSubmit={(e)=>FormSubmit(e)}>
      <div className="Total">
          <label htmlFor="Total">Total Bill:</label>
          <input type="text" id="Total" value={Bill} onChange={(e)=>setBill(Number(e.target.value))}/> 
      </div>
      <div className="YouPay">
          <label htmlFor="YouPay">You Pay:</label>
          <input type="text" id="YouPay" value={Self} onChange={(e)=>{
            setSelf(Number(e.target.value)>Bill? Self:Number(e.target.value))
            }}/> 
      </div>
      <div className="FriendPay">
          <label htmlFor="FriendPay">{`${Friend.name} will Pay`}:</label>
          <input type="text" disabled id="FriendPay" value={FPay}/> 
      </div>
      <div className="WhoPay">
          <label htmlFor="WhoPay">Who will Pay:</label>
          <select name="" id="WhoPay" value={Id} onChange={(e)=>setId(Number(e.target.value))}>
              <option value={0}>Please select</option>
              <option value={1}>You</option>
              <option value={Friend.id}>{Friend.name}</option>
          </select>
      </div>
      <div className="btn">
        <button type="submit">Share Now</button>
      </div>
</form>
  )
}

function Items({Friend,Select,SelectWindow}){
  //Optional Chain
  const Close= Select?.id===Friend.id
  return(<>
      <div className="item">
      <div className="img">
          <img src={Friend.img} width="50" height="50" alt=""></img>
      </div>
      <div className="text">
          <div className="title">
              {Friend.name} 
          </div>
          {Friend.balance<0? <Detail Text={`You owe $${Math.abs(Friend.balance)}`} color="Red"/>:Friend.balance===0? <Detail Text={`You and ${Friend.name} even`} color="Black"/> : <Detail Text={`${Friend.name} owe you $${Math.abs(Friend.balance)} `} color="Green"/> }
      </div>
      {Close? <Butn WhenCLick={()=>SelectWindow(null)}>Close</Butn>:<Butn WhenCLick={()=>{SelectWindow(Friend)}}>Select</Butn>}
</div>
  </>

  ) 
}
function Detail({Text,color}){
  return(
    <div className={`detail ${color}`}>
          {Text}
    </div>
  )
}
function Butn({Add,WhenCLick,children}){
  return(
    <div className={Add?`btn ${Add}`:"btn"}>
    <button onClick={()=>WhenCLick()}>{children}</button>
    </div>
  )
}
function Form({AddNow}){
  const [Name, setName]=useState("")
  const [Img, setImg]=useState("https://i.pravatar.cc/150")
  function Adding(e){
    e.preventDefault()
    if(Name===""){
      return
    }
    let New={id:Date.now(),name:Name, img:Img, balance:0}
    AddNow(New)
    setImg("https://i.pravatar.cc/150")
    setName("")
  }
  return(
    <div className="form">
      <form onSubmit={Adding}>
      <div className="name">
        <label htmlFor="name">Name: </label>
        <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} id="name"/>
    </div>
    <div className="image">
        <label htmlFor="img">Image: </label>
        <input type="text" onChange={(e)=>setImg(e.target.value)} value={Img} id="img"/>
    </div>
    <div className="btn Add2">
    <button type="submit">Add</button>
    </div>
      </form>
</div>
  )
}