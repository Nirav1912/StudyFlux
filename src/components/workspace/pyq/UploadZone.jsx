import { useRef } from "react";
import { Upload } from "lucide-react";
import { usePYQ } from "../../../context/PYQContext";

export default function UploadZone() {
  const inputRef = useRef();

  const { addFiles } = usePYQ();

  function handleFiles(e) {
    const selected = Array.from(e.target.files);

    addFiles(selected);
  }

  return (
    <div className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-16 text-center">

      <Upload
        size={60}
        className="mx-auto text-red-500 mb-6"
      />

      <h2 className="text-3xl font-bold">
        Upload Previous Year Papers
      </h2>

      <p className="mt-3 text-slate-500">
        Upload multiple PDF files
      </p>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf"
        hidden
        onChange={handleFiles}
      />

      <button
        onClick={() => inputRef.current.click()}
        className="mt-8 px-8 py-4 rounded-2xl bg-red-500 text-white font-bold"
      >
        Select PDFs
      </button>

    </div>
  );
}