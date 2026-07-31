import { Trash2, FileText } from "lucide-react";
import { usePYQ } from "../../../context/PYQContext";

export default function UploadedFiles() {
  const { files, removeFile } = usePYQ();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8">

      <h2 className="text-2xl font-bold mb-6">
        Uploaded Papers ({files.length})
      </h2>

      {files.length === 0 ? (
        <p className="text-slate-400">
          No papers uploaded.
        </p>
      ) : (
        <div className="space-y-4">

          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center border rounded-2xl p-5"
            >
              <div className="flex items-center gap-3">

                <FileText className="text-red-500" />

                <div>
                  <p className="font-bold">
                    {file.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>

              <button
                onClick={() => removeFile(index)}
              >
                <Trash2 className="text-red-500" />
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}