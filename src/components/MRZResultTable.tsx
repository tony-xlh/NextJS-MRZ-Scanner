import "../configure"; // license + CDN engine paths, executed on the client only
import { CodeParser, CodeParserModule } from "dynamsoft-capture-vision-bundle";
import type { ParsedResultItem } from "dynamsoft-capture-vision-bundle";
import { useEffect, useRef, useState } from "react";
import "./MRZResultTable.css"

export interface MRZResultTableProps {
  MRZ:string;
}

interface Field{
  name:string;
  value:string;
}

const MRZResultTable: React.FC<MRZResultTableProps> = (props:MRZResultTableProps) => {
  const initialized = useRef(false);
  const parser = useRef<CodeParser|null>(null);
  const [fields,setFields] = useState<Field[]|null>(null)
  useEffect(()=>{
    const init = async () => {
      initialized.current = true;
      await initCodeParser();
      parse();
    }
    init();
  },[])

  useEffect(()=>{
    parse();
  },[props.MRZ])

  const initCodeParser = async () => {
    await CodeParserModule.loadSpec(["MRTD_TD1_ID","MRTD_TD2_FRENCH_ID","MRTD_TD2_ID","MRTD_TD2_VISA","MRTD_TD3_PASSPORT","MRTD_TD3_VISA"]);
    parser.current = await CodeParser.createInstance();
  }

  const parse = async () => {
    if (parser.current && props.MRZ) {
      let result = await parser.current.parse(props.MRZ);
      let MRZFields = ["documentNumber","passportNumber","issuingState","name","sex","nationality","dateOfExpiry","dateOfBirth"];
      let parsedFields = [];
      for (let index = 0; index < MRZFields.length; index++) {
        const field = MRZFields[index];
        const value = result.getFieldValue(field);
        if (value){
          parsedFields.push({
            name:field,
            value:value
          })
        }
      }
      setFields(parsedFields);
    }else{
      setFields(null);
    }
  }

  return (
    <>
      {!fields && (
        <div>{(props.MRZ && parser.current)?"Parsing...":""}</div>
      )}
      {fields &&(
        <table className="resultTable">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(field =>
              <tr key={field.name}>
                <td>{field.name}</td>
                <td>{field.value}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  )
}

export default MRZResultTable;
