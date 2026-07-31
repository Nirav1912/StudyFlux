import { createContext, useContext, useState } from "react";
import { extractPDFText } from "../utils/pdfReader";
import { analyzePYQs } from "../services/gemini";

const PYQContext = createContext();

export function PYQProvider({ children }) {
  const [files, setFiles] = useState([]);
const [analysis, setAnalysis] = useState(null);
  async function addFiles(newFiles) {
  const processed = [];

  for (const file of newFiles) {
    const text = await extractPDFText(file);

    processed.push({
      name: file.name,
      size: file.size,
      file,
      text,
    });
  }

  const updatedFiles = [...files, ...processed];

  setFiles(updatedFiles);

  if (updatedFiles.length >= 3) {
    try {
      const result = await analyzePYQs(updatedFiles);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    }
  }
}

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
   <PYQContext.Provider
  value={{
    files,
    addFiles,
    removeFile,
    analysis,
    setAnalysis,
  }}
>
      {children}
    </PYQContext.Provider>
  );
}

export function usePYQ() {
  return useContext(PYQContext);
}