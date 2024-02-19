import { useState } from "react";
import { addtask, deletetasklist, updatetaskstatus, editworktaskintodolist } from "./todoSlice";
import "./todo.css"
import { useDispatch, useSelector } from "react-redux";

const Todo = () => {
  var sno = 0;
  const [edittaskbyid, setedittaskbyid] = useState("");
  const [mytask, setmytask] = useState("");
  const mydata = useSelector((state) => state.todo.task);
  const dispatch = useDispatch();
  var [editbutton, seteditbutton] = useState(false)

  console.log(mydata);
  //  for add task
  const addmytask = (mytask) => {
    dispatch(addtask(mytask));
    setmytask("");
  }
  // delete task
  const deletetask = (myid) => {
    dispatch(deletetasklist(myid))
  }

  // update work
  const updatastatus = (e, myid) => {
    // alert(e.target.value);
    // alert("this is the actual id of the target element "+e.target.id);

    const myupdate = {
      myid: myid,
      status: e.target.value
    }
    if (myupdate.status === 'Complete') {
      document.getElementById(`${myid}`).style.color = 'darkgreen';
    }
    else if (myupdate.status === 'Processing') {
      document.getElementById(`${myid}`).style.color = 'red';
    }
    else if (myupdate.status === "Not start") {
      document.getElementById(`${myid}`).style.color = 'black';

    }
    dispatch(updatetaskstatus(myupdate));
  }


  // edit work

  const edittaskname = (workname, workid) => {
    setedittaskbyid(workid);
    seteditbutton(true);
    setmytask(workname)
    // document.getElementById('inputbox').value = workname;
  }

  const editwork = () => {
    const edittaskdata = {
      editworktask: mytask,
      editworktaskbyid: edittaskbyid
    }
    dispatch(editworktaskintodolist(edittaskdata))
    seteditbutton(false);
    setmytask("");
  }


  const ans = mydata.map((key) => {
    sno++;
    return (
      <>
        <tr>
          <td>{sno}</td>
          <td id={key.id}>{key.work}</td>
          <td>
            <button onClick={() => deletetask(key.id)}>Delete</button>
          </td>
          <td>
            <select onChange={(e) => updatastatus(e, key.id)} id={key.id} value={key.status} >
              <option value="Not start">Not start</option>
              <option value="Processing">Processing</option>
              <option value="Complete">Complete</option>
            </select>

          </td>
          <td><button onClick={() => edittaskname(key.work, key.id)}>Edit</button></td>
        </tr>
      </>
    )
  })

  return (
    <>
      <center>
        <span className="Headinginput">{editbutton ? "Edit TASK :" : "Add Task :"}</span>
        <input type="text" value={mytask} onChange={(e) => setmytask(e.target.value)} id="inputbox" />
        <button id="inputbtn" onClick={() => editbutton ? editwork() : addmytask(mytask)}>{editbutton ? "Edit" : "Add"}</button>
      </center>
      <br />
      <div class="table-container">
        <table style={{ margin: "auto" }} border="2" bgcolor="pink" width="500">
          <thead>
            <tr >
              <th>S.NO.</th>
              <th>Tasks</th>
              <th>Delete</th>
              <th>Status</th>
              <th>Edit</th>

            </tr>
          </thead>
          <tbody>
            {ans}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Todo;