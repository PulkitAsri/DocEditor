import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import Mustache from "mustache";
import "./App.css";
import { sectionTemplate, sections } from "./constants";
import DOMPurify from "dompurify";
import { flattenObject } from "./lib/flattenObject";
import _ from "lodash";
import { getReducedSections } from "./lib/getReducedSections";
import { getFilteredSectionData } from "./lib/getFilteredSectionData";

//PARAMS - if we wanted to make a component out of this
/*
@sectionTemplate - the ordering of the sections
@sections- the map that maintains sectionwise html with vairables used in that
*/

//could be generated from sections
const defaultData = {
  appName: `{{appName}}`,
  orgName: `{{orgName}}`,
};

//could be generated for defaultData
const defaultHighlightedData = {
  appName: `<span style="background-color:#fbff0099">{{appName}}</span>`,
  orgName: `<span style="background-color:#fbff0099">{{orgName}}</span>`,
};

const defaultSectionData = getReducedSections({ sections });
console.log(defaultSectionData);

// const getDefaultData

export default function App() {
  const editorRef = useRef(null);
  const [data, setData] = useState(defaultData);
  const [highlightedData, setHighlightedData] = useState(
    defaultHighlightedData
  );
  const [isPreview, setIsPreview] = useState(false);
  const [preview, setPreview] = useState(`{{defaultPreview}}`);
  const [sectionData, setSectionData] = useState(defaultSectionData);

  const putVariables = () => {
    if (editorRef.current) {
      var content = editorRef.current.getContent();
      // console.log(content);
      const rendered = Mustache.render(content, highlightedData);
      console.log("hehehehe", `<div style="padding:2rem">${rendered}</div>`);
      // editorRef.current.setContent(rendered);
      setPreview(`<div style="padding:2rem">${rendered}</div>`);
    }
  };

  const generateTemplate = ({ sectionTemplate }) => {
    const filteredSectionData = getFilteredSectionData({
      sections,
      filter: sectionData,
    });
    console.log(sectionTemplate);
    console.log(filteredSectionData);

    const rendered = Mustache.render(sectionTemplate, filteredSectionData);
    console.log(rendered);
    return rendered;
  };

  useEffect(() => {}, []);

  useEffect(() => {
    Object.keys(flattenObject(data)).forEach((key) => {
      if (data[key] == "") {
        setData((prev) => {
          return {
            ...prev,
            [key]: `{{${key}}}`,
          };
        });
      }
    });

    Object.keys(data).forEach((key) => {
      let value = data[key];
      setHighlightedData((prev) => {
        return {
          ...prev,
          [key]: `<span style="background-color:#fbff0099">${value}</span>`,
        };
      });
    });
  }, [data]);

  useEffect(() => {
    putVariables();
  }, [highlightedData]);

  useEffect(() => {
    putVariables();
  }, [sectionData]);

  return (
    <>
      <div>
        <button className="tab-button" onClick={() => setIsPreview(false)}>
          Editor
        </button>
        <button className="tab-button" onClick={() => setIsPreview(true)}>
          Preview
        </button>
      </div>
      <div className="editor-preview-container">
        <div
          className="editor"
          style={{ display: isPreview ? "none" : "flex" }}
        >
          <Editor
            // height={1000}
            // className="tinyEditor"
            apiKey="to9fhhp8oeub3i91ewmtwbk8kmxw8f58c2am0ehging2b6ek"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={generateTemplate({ sectionTemplate })}
            init={{
              // menubar: false,
              // resize: false,
              icons: "material",
              skin: "small",
              menubar: "insert",
              plugins:
                "mergetags fullpage pagebreak anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes autocorrect typography inlinecss ",
              toolbar:
                "mergetags | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat| export | pagebreak",
              mergetags_list: _.keys(defaultData).map((key) => {
                return { title: key, value: key };
              }),
              mergetags_prefix: "{{{",
              mergetags_suffix: "}}}",
              pagebreak_separator: "<!-- my page break -->",
              content_style: "* { margin: 1rem auto; } ",
              setup: function (editor) {
                editor.on("Paste Change input Undo Redo", function () {
                  // setTemplate(editor.getContent());
                  putVariables();
                });
              },

              // content_css: "/src/editor.css",
            }}
          />
        </div>
        {isPreview && (
          <div
            className="preview"
            // style={{padding}}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preview) }}
          ></div>
        )}
        <div className="form">
          <div>
            {Object.keys(sectionData).map((key) => (
              <div className="checkbox">
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  // value={key}
                  // checked={sectionData[key]}
                  onChange={(e) =>
                    setSectionData((prev) => {
                      return {
                        ...prev,
                        [e.target.name]: !sectionData[e.target.name],
                      };
                    })
                  }
                />
                {key}
              </div>
            ))}
          </div>
          <div>
            {Object.keys(data).map((key) => (
              <label>
                {key}: *use {`{{${key}}}`}
                <input
                  type="text"
                  name={key}
                  // value={key}
                  onChange={(e) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        [e.target.name]: _.escape(e.target.value),
                      };
                    });
                  }}
                />
              </label>
            ))}
          </div>
          <button style={{ height: "40px" }} onClick={() => {}}>
            Generate PDF
          </button>
        </div>
      </div>
    </>
  );
}
