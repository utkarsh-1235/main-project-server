import { useState, useContext } from "react";
import axiosInstance from "../../Helpers/axiosInstance";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { TableHeader } from "../Table";

import ErrorStrip from "../ErrorStrip";

const TimeScheduleForm = () => {
  const { paperList } = useContext(UserContext);
  const [paper, setPaper] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [internal, setInternal] = useState([]);
  const [id, setId] = useState([]);
  const [error, setError] = useState("");

  const fetchInternal = async (e) => {
    setInternal([]);
    setError("");
    e.preventDefault();
    try {
      // fetching internal record
      const response = await axios.get("/internal/" + paper);
      // saving record id for updating/deleting record
      setId(response.data._id);
      setInternal(response.data.marks);
      setDisabled(true);
      setError("");
    } catch (err) {
      setError(err);
      // incase no record exists
      if (err.response.status === 404) {
        // fetching students list and mapping to add fields
        const response = await axios.get("paper/" + paper);
        const students = response.data.students;
        students.forEach((student) => {
          Object.assign(student, {
           Sub_Code:0,
            CO1: 0,
            CO2: 0,
            CO3: 0,
            CO4: 0,
            CO5: 0,
            CO6:"NA",
          });
        });
        setInternal(students);
        setDisabled(false);
      }
    }
  };

  const addInternalMark = async (e) => {
    e.preventDefault();
    const marks = { id, paper, marks: internal };
    try {
      // adding new internal mark record
      const response = await axios.post("internal/" + paper, marks);
      toast.success(response.data.message);
      setDisabled(true);
      setError("");
      fetchInternal(e);
    } catch (err) {
      // conflict, record already exists
      if (err.response.status === 409) {
        try {
          // updating internal record
          const response = await axios.patch("internal/" + paper, marks);
          toast.success(response.data.message);
          setDisabled(true);
          setError("");
        } catch (err) {
          setError(err);
        }
      } else setError(err);
    }
  };

  const deleteInternalMark = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("internal/" + id);
      toast.success(response.data.message, {
        icon: ({ theme, type }) => <FaTrash />,
      });
      setInternal([]);
    } catch (err) {
      setError(err);
    }
  };

  // updating internal state on "onChange" event.
  const handleFormChange = (e) => {
    // the whole thing is a convoluted mess, but it works.
    // if you have an alternative, DM ;).
    const index = parseInt(e.target.id);
    const value = e.target.value;
    const key = e.target.name;
    const newStudent = internal[index];
    newStudent[key] = value;
    const newInternal = internal.map((student, index) => {
      if (index === e.target.id) {
        return newStudent;
      } else return student;
    });
    setInternal(newInternal);
  };

  return (
    <main className="internal">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        CO Attainment
      </h2>
      <section className="form__head">
        <form className="w-full gap-4 accent-violet-900 md:flex">
          <select
            className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 md:w-1/3"
            placeholder="select paper"
            name="paper"
            id="paper"
            value={paper}
            required
            onChange={(e) => setPaper(e.target.value)}
          >
            <option defaultValue hidden>
              Select Paper
            </option>
            {paperList.map((paper) => (
              <option key={paper._id} value={paper._id}>
                {paper.paper}
              </option>
            ))}
          </select>
          <button
            className="mb-4 h-10 w-auto rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
            type="submit"
            onClick={(e) => fetchInternal(e)}
          >
            Fetch
          </button>
        </form>
      </section>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
      <section className="internal__body">
        <form className="internal__body__form">
          {internal.length ? (
            <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
              <table className="w-full">
                <TableHeader
                  AdditionalHeaderClasses={"text-left"}
                  Headers={[
                    "Sub Code",
                    "Subject",
                    "CO1",
                    "CO2",
                    "CO3",
                    "CO4",
                    "CO5",
                    "CO6",
                  ]}
                />
                <tbody>
                  {internal?.map((student, index) => (
                    <tr
                      key={index}
                      className={
                        // checking whether the student passed (total mark is above 7), bgcolor to represent it.
                        parseInt(student?.CO1) +
                          parseInt(student?.CO2) +
                          parseInt(student?.CO3) +
                          parseInt(student?.CO4)+
                          parseInt(student?.CO5) +
                          parseInt(student?.C6)+
                          
                        7
                          ? "border-t-[1px] border-slate-400 bg-violet-900/50 first:border-none"
                          : "border-t-[1px] border-slate-400 first:border-none"
                      }
                    >
                      {/* <td className="p-2 ">{student.Sub_Code}</td> */}
                      <td className="p-2 ">
                        <input
                          className="w-20 pl-3 "
                          type="string"
                          required
                        
                          disabled={disabled}
                          id={index}
                          name="Sub_Code"
                          value={student.Sub_Code}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-20 pl-3 "
                          type="string"
                          required
                          disabled={disabled}
                          id={index}
                          name="Subject"
                          value={student.Subject}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      
                      <td className="p-2 ">
                        <input
                          className="w-20 pl-3 "
                          type="number"
                          required
                          
                          disabled={disabled}
                          id={index}
                          name="  CO1"
                          value={student.CO1}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-20 pl-3 "
                          type="number"
                          required
                         
                          disabled={disabled}
                          id={index}
                          name="CO2"
                          value={student.CO2}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-20 pl-3 "
                          type="number"
                          required
                         
                          disabled={disabled}
                          id={index}
                          name="CO3"
                          value={student.CO3}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-20 pl-3 "
                          type="number"
                          required
                         
                          disabled={disabled}
                          id={index}
                          name="CO4"
                          value={student.CO4}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-20 pl-3 "
                          type="number"
                          required
                          
                          disabled={disabled}
                          id={index}
                          name="CO5"
                          value={student.CO5}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 ">
                        {/* <input
                          className="w-20 pl-3 "
                          type="number"
                          required
                         
                          disabled={disabled}
                          id={index}
                          name="CO6"
                          value={student.CO6}
                          onChange={(e) => handleFormChange(e)}
                        /> */}NA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          {internal.length && disabled ? (
            <div className="flex gap-4">
              <button
                type="submit"
                className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
                onClick={(e) => setDisabled(false)}
              >
                <FaEdit /> Edit
              </button>
              <button
                type="submit"
                className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-red-700 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-red-700"
                onClick={(e) => deleteInternalMark(e)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ) : (
            ""
          )}
          {internal.length && !disabled ? (
            <button
              type="submit"
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
              onClick={(e) => addInternalMark(e)}
            >
              <FaPlus /> Save
            </button>
          ) : (
            ""
          )}
        </form>
      </section>
    </main>
  );
};

export default TimeScheduleForm;