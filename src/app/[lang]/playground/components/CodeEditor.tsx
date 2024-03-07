"use client";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3, faJs } from "@fortawesome/free-brands-svg-icons";
import { IconPlayerPlay, IconX } from "@tabler/icons-react";
import { animate, motion } from "framer-motion";
import { Notification } from "@/components/Notification";
import { useNotification } from "@/app/hooks/useNotification";

const files: {
  [key: string]: { name: string; language: string; value: string };
} = {
  "index.html": {
    name: "index.html",
    language: "html",
    value: "",
  },
  "style.css": {
    name: "style.css",
    language: "css",
    value: "",
  },
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: "",
  },
};

export default function Home({ lang }: { lang: string }) {
  const [fileName, setFileName] = useState("index.html");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  function handleEditorChange(value: string): string {
    return (file.value = value);
  }

  const file = files[fileName];

  useEffect(() => {
    const runBtn = document.getElementById("runCode");
    runBtn?.addEventListener("click", () => {
      setHtmlCode(files["index.html"].value);
      setCssCode(files["style.css"].value);
      setJsCode(files["script.js"].value);
      setOutputWindow(true);
      setTimeout(() => {
        animate("#outputWindow", { opacity: 1, scale: 1 });
      }, 200);
    });
  }, []);

  const [outputWindow, setOutputWindow] = useState(false);

  const notification = useNotification({
    title: "Hola!",
    description: "Descripción de la notificación!",
    type: "success",
    seconds: 4,
  });

  const OutputWindowElement = () => {
    if (outputWindow) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          className={styles.websiteWindow}
          id="outputWindow"
        >
          <div className={styles.buttonBlock}>
            <button
              onClick={() => {
                animate("#outputWindow", { opacity: 0, scale: 0.8 });
                setTimeout(() => {
                  setOutputWindow(false);
                }, 100);
              }}
              className={`${styles.closeButton} text-black`}
              id="closeWindow"
            >
              <motion.span whileTap={{ scale: 0.95 }}>
                <IconX className="text-white fill-white" />
              </motion.span>
            </button>
          </div>
          <iframe
            title="output"
            srcDoc={`
                    <html>
                        <body>${htmlCode}</body>
                        <style>${cssCode}</style>
                        <script>${jsCode}</script>
                    </html>
                `}
            className={styles.outputiframewindow}
          />
        </motion.div>
      );
    } else return null;
  };

  return (
    <div>
      <div>
        <div className={styles.topBar}>
          <button
            className={`${
              fileName === "index.html" && "bg-zinc-700 shadow-md"
            } ${styles.htmlButton} `}
            disabled={fileName === "index.html"}
            onClick={() => {
              setFileName("index.html");
              if (outputWindow) {
                animate("#outputWindow", { opacity: 0 });
                setTimeout(() => {
                  setOutputWindow(false);
                }, 200);
              }
            }}
          >
            <div>
              <FontAwesomeIcon icon={faHtml5} />
            </div>
            index.html
          </button>
          <button
            className={`${
              fileName === "style.css" && "bg-zinc-700 shadow-md"
            } ${styles.cssButton} `}
            disabled={fileName === "style.css"}
            onClick={() => {
              setFileName("style.css");
              if (outputWindow) {
                animate("#outputWindow", { opacity: 0 });
                setTimeout(() => {
                  setOutputWindow(false);
                }, 200);
              }
            }}
          >
            <div>
              <FontAwesomeIcon icon={faCss3} />
            </div>
            style.css
          </button>
          <button
            className={`${
              fileName === "script.js" && "bg-zinc-700 shadow-md"
            } ${styles.jsButton} `}
            disabled={fileName === "script.js"}
            onClick={() => {
              setFileName("script.js");
              if (outputWindow) {
                animate("#outputWindow", { opacity: 0 });
                setTimeout(() => {
                  setOutputWindow(false);
                }, 200);
              }
            }}
          >
            <div>
              <FontAwesomeIcon icon={faJs} />
            </div>{" "}
            script.js
          </button>
          <button className={styles.playButton} id="runCode">
            <div>Run</div> <IconPlayerPlay />
          </button>
        </div>
        <Editor
          height="70vh"
          theme="vs-dark"
          saveViewState={true}
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
          onChange={(value) => handleEditorChange(value!)}
          value={file.value}
        />
      </div>
      <OutputWindowElement />
    </div>
  );
}
