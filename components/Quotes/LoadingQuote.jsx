import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
// import { ConvertApi, ConvertSettings, ConvertDocumentRequest } from 'groupdocs-conversion-cloud'

export const LoadingQuote = ({ handleInc }) => {
  const { file } = useSelector(state => state.quotes.files)

  // const conversion_cloud = require("groupdocs-conversion-cloud");

  
  useEffect(() => {
    (async () => {
      const clientId = "e479bff7-f7ef-4c11-965a-d8954e122eee";
      const clientSecret = "79ca8057a1274c6f3cf736b19bb881bd";
    
      // const convertApi = ConvertApi.fromKeys(clientId, clientSecret);
      // console.log(convertApi);
    
      // let settings = new ConvertSettings();
      // settings.filePath = "";
      // settings.format = "png";
      // settings.outputPath = "ConvertedFiles";
    
      // let result = await convertApi.convertDocument(new ConvertDocumentRequest(settings));
      // console.log(result);
      // const { data } = await axios.post('https://7ad0-77-244-144-26.ngrok-free.app/api/v1/order', { file },
      //  {
        
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // }
      
      // );
      // if (!data) return;
      handleInc(3)
    })();

  }, [file]);

  return (
    <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
      <div className="lds-dual-ring"></div>
      <p>Analyzing your file...</p>
    </div>
  )
}
