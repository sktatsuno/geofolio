import React from 'react'

export default function CsvReader({ changeHoldingsHandler }){
	const [csvFile, setCsvFile] = React.useState();
	// [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]

	const processCSV = (str, delim=',') => {
			const headers = str.slice(0,str.indexOf('\n')).split(delim);
			const rows = str.slice(str.indexOf('\n')+1).split('\n');

			const newArray = rows.map( row => {
					const values = row.split(delim);
					const eachObject = headers.reduce((obj, header, i) => {
							obj[header] = values[i];
							return obj;
					}, {})
					return eachObject;
			})
			newArray.splice(-1,1)
			console.log(newArray)
			changeHoldingsHandler(newArray)
	}

	const submit = () => {
			const file = csvFile;
			const reader = new FileReader();

			reader.onload = function(e) {
					const text = e.target.result;
					console.log(text);
					processCSV(text)
			}

			reader.readAsText(file);
	}

    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >
            </input>
            <br/>
            <button
								onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)submit()
                }}>
                Submit
            </button>
        </form>
    );

}