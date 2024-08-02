import { Alert, Button, TextInput } from 'flowbite-react';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import React, { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from 'react-router-dom';

function WriteScript() {
  const content = {
    entityMap: {},
    blocks: [
      {
        key: '637gr',
        text: 'Initialized from content state.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  };
  const contentState = convertFromRaw(content);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [textEditorContent, setTextEditorContent] = useState(contentState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Write a crying by the sea script
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="flex-row h-auto scroll">
            <Editor
              onBlur={(e) => {
                console.log(JSON.stringify(textEditorContent, null, 4));
              }}
              onContentStateChange={(content) => {
                setTextEditorContent(content);
              }}
              editorStyle={{ overflowY: 'auto', height: '400px' }}
            />
          </div>

          <Button type="submit" gradientDuoTone="purpleToPink">
            Publish
          </Button>
          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </>
  );
}

export default WriteScript;
