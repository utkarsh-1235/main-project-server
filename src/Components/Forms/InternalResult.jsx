import React, { useState } from 'react';
import { TableHeader } from "../Table";
const DynamicTable = ({ selectedOption }) => {
  // Sample data for the table
  const data = [
    { Student_name: 'Suhail Khan', name: 'Item 1', price: 10 },
    
  ];

  // Filter data based on the selected option
  const filteredData = data.filter(item => item.name.includes(selectedOption));

  if (filteredData.length === 0) {
    return <p>No data available for the selected option.</p>;
  }

  return (
    <main className="internal">
      
      <section className="form__head">
        <form className="w-full gap-4 accent-violet-900 md:flex"></form>
        <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
              <table className="w-full">
      <TableHeader
                  AdditionalHeaderClasses={"text-left"}
                  Headers={[
                    "Student Nmae",
                    "CT1",
                    "CT2",
                  ]}
                />
      <tbody>
      <td className="p-2 ">
                        <input
                          className="w-20 pl-3 "
                          type="string"
                          required

                          name="Sub_Code"
                          
                         
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-20 pl-3 "
                          type="number"
                          
                          
                                                                    />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-20 pl-3 "
                          type="number"
                          required
                          name="CT2"
                          
                         
                        />
                      </td>
                      
                      
        {filteredData.map(item => (
          <tr key={item.id}>
            <td>{item.Student_name}</td>
            <td>{item.name}</td>
            <td>${item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </section>
    </main>
      );
};

const DynamicTableApp = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = event => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
       CT Marks
      </h2>
      <label>
        Select an option:
        <select   className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 md:w-1/3"
            placeholder="select paper"
            name="paper"
            id="paper"
            value={selectedOption}
            required
            
         
        onChange={handleSelectChange}>
          <option value="">-- Select Subject</option>
          <option value="Item 1">Discrete Maths</option>
          <option value="Item 2">Compiler Design</option>
          <option value="Item 3">Cloud Computing</option>
        </select>
      </label>

      {selectedOption && <DynamicTable selectedOption={selectedOption} />}
    </div>
  );
};

export default DynamicTableApp;
