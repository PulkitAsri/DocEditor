import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import Mustache from "mustache";
import "./App.css";
import { sectionTemplate, sectionsDefaultMap } from "./constants";
import DOMPurify from "dompurify";
import { flattenObject } from "./lib/flattenObject";
import _ from "lodash";
import { getReducedSections } from "./lib/getReducedSections";
import { getFilteredSectionData } from "./lib/getFilteredSectionData";
import { generateSectionMap } from "./lib/generateSectionMap";

//PARAMS - if we wanted to make a component out of this
/*
@sectionTemplate - the ordering of the sectionsMap
@sectionsMap- the map that maintains sectionwise html with vairables used in that
*/

//could be generated from sectionsMap
const variableDefaultData = {
  appName: `{{appName}}`,
  orgName: `{{orgName}}`,
};

//could be generated for variableDefaultData
const defaultHighlightedData = {
  appName: `<span style="background-color:#fbff0099">{{appName}}</span>`,
  orgName: `<span style="background-color:#fbff0099">{{orgName}}</span>`,
};

const defaultSectionCheckboxData = getReducedSections({ sectionsDefaultMap });
console.log(defaultSectionCheckboxData);

// const getDefaultData

export default function App() {
  const editorRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  //variables
  const [variableData, setVariableData] = useState(variableDefaultData);
  const [highlightedData, setHighlightedData] = useState(
    defaultHighlightedData
  );
  const [sectionCheckboxData, setSectionCheckboxData] = useState(
    defaultSectionCheckboxData
  );
  const [sectionsMap, setSectionsMap] = useState(sectionsDefaultMap);

  const generateTemplate = ({ sectionTemplate }) => {
    console.log("hehehehe reseting template");
    const filteredSectionData = getFilteredSectionData({
      sectionsMap,
      filter: sectionCheckboxData,
    });

    const rendered = Mustache.render(sectionTemplate, filteredSectionData);
    // console.log(rendered);
    return rendered;
  };

  // templates
  const [template, setTemplate] = useState(
    generateTemplate({ sectionTemplate })
  );
  const [preview, setPreview] = useState(`{{defaultPreview}}`);

  const putVarsIntoPreview = () => {
    if (editorRef.current) {
      var content = editorRef.current.getContent();
      // console.log(content);
      const rendered = Mustache.render(content, highlightedData);
      // console.log("hehehehe", `<div style="padding:2rem">${rendered}</div>`);
      // editorRef.current.setContent(rendered);
      setPreview(`<div style="padding:2rem">${rendered}</div>`);
    }
  };

  //onMount
  useEffect(() => {}, []);
  useEffect(() => {
    editorRef.current?.setContent(template);
    putVarsIntoPreview();
  }, [template]);

  // if input fields changes
  useEffect(() => {
    Object.keys(flattenObject(variableData)).forEach((key) => {
      let value = variableData[key];
      // empty=> reset default data with {{variable}}
      if (value === "") {
        setVariableData((prev) => {
          return {
            ...prev,
            [key]: `{{${key}}}`,
          };
        });
      }
      // setHighlighted data(which will further change preview in next useEffect)
      setHighlightedData((prev) => {
        return {
          ...prev,
          [key]: `<span style="background-color:#fbff0099">${value}</span>`,
        };
      });
    });
  }, [variableData]);

  useEffect(() => {
    putVarsIntoPreview();
  }, [highlightedData]);

  useEffect(() => {
    console.log(sectionCheckboxData);
    putVarsIntoPreview();
    const newSectionsMap = generateSectionMap(
      editorRef.current?.getContent() || ""
    );
    setSectionsMap({ ...sectionsMap, ...newSectionsMap });
  }, [sectionCheckboxData]);

  useEffect(() => {
    setTemplate(generateTemplate({ sectionTemplate }));
  }, [sectionsMap]);

  return (
    <>
      <div>
        <button className="tab-button" onClick={() => setShowPreview(false)}>
          Editor
        </button>
        <button className="tab-button" onClick={() => setShowPreview(true)}>
          Preview
        </button>
      </div>
      <div className="editor-preview-container">
        <div
          className="editor"
          style={{ display: showPreview ? "none" : "flex" }}
        >
          <Editor
            // height={1000}
            // className="tinyEditor"
            apiKey="to9fhhp8oeub3i91ewmtwbk8kmxw8f58c2am0ehging2b6ek"
            onInit={(evt, editor) => (editorRef.current = editor)}
            // initialValue={template}
            init={{
              // menubar: false,
              // resize: false,
              icons: "material",
              skin: "small",
              menubar: "insert",
              plugins:
                "importcss mergetags fullpage pagebreak anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes autocorrect typography inlinecss ",
              toolbar:
                "mergetags | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat| export | pagebreak",
              mergetags_list: _.keys(variableDefaultData).map((key) => {
                return { title: key, value: key };
              }),
              mergetags_prefix: "{{{",
              mergetags_suffix: "}}}",
              pagebreak_separator: "<!-- my page break -->",
              // content_style: "* { margin: 1rem auto; } ",
              setup: function (editor) {
                editor.on("Paste Change input Undo Redo", function () {
                  // setTemplate(editor.getContent());
                  putVarsIntoPreview();
                  // console.log("hehehehe", editor.getContent());
                });
              },
              // content_css: "/src/editor.css",
              content_style: `.sectionDiv { border-bottom: 1px solid grey; }`,
            }}
          />
        </div>
        {showPreview && (
          <div
            className="preview"
            // style={{padding}}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preview) }}
          ></div>
        )}
        <div className="form">
          <div>
            {Object.keys(sectionCheckboxData).map((key) => (
              <div className="checkbox">
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  onChange={(e) =>
                    setSectionCheckboxData((prev) => {
                      return {
                        ...prev,
                        [e.target.name]: !sectionCheckboxData[e.target.name],
                      };
                    })
                  }
                />
                {key}
              </div>
            ))}
          </div>
          <div>
            {Object.keys(variableData).map((key) => (
              <label>
                {key}: *use {`{{${key}}}`}
                <input
                  type="text"
                  name={key}
                  // value={key}
                  onChange={(e) => {
                    setVariableData((prev) => {
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
          <button
            style={{ height: "40px" }}
            onClick={() => {
              console.log("hehehehe", editorRef.current.getContent());
            }}
          >
            Generate PDF
          </button>
        </div>
      </div>
    </>
  );
}
