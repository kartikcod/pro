import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, AppBar, Toolbar, Typography, Container, Box, Input } from '@mui/material';
// Custom styling for the editor

const TextEditor = () => {
    const [content, setContent] = useState('');
    const [tabValue, setTabValue] = useState(0); // Added missing state for tabValue

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };
    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  };

    const saveFile = (format) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `document.${format}`;
        link.click();
    };

    const importFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setContent(reader.result);
        };
        reader.readAsText(file);
    };

    return (
        <div className="text-editor-container" >
            <AppBar position="static" color="primary" style={{width:"120%",}} >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Advanced Text Editor
                    </Typography>
                    <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    centered
                    textColor="inherit"
                    indicatorColor="secondary"
                >
                    <Tab label="Home" />
                    <Tab label="About" />
                    <Tab label="Privacy Policy" />
                </Tabs>
                </Toolbar>
               
            </AppBar>

            <Container maxWidth="lg">
                <Box my={4}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box display="flex" gap={2}>
                            <Button variant="contained" color="primary" onClick={() => saveFile('txt')}>
                                Save as .txt
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => saveFile('docx')}>
                                Save as .docx
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => saveFile('pdf')}>
                                Save as .pdf
                            </Button>
                        </Box>
                        <label htmlFor="import-file">
                            <Input
                                id="import-file"
                                type="file"
                                onChange={importFile}
                                style={{ display: 'none' }}
                            />
                            <Button variant="outlined" component="span" style={{marginRight:"20px",}}>
                                Import File
                            </Button>
                        </label>
                    </Box>

                    <Editor
                        apiKey="ec1pirzla83dkzq1e7q3dnxp9r3orit3vrg87qtmoim5fs4z"
                        value={content}
                        onEditorChange={handleEditorChange}
                        init={{
                            height: 500,
                            width:1300,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic underline strikethrough | \
                                alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | \
                                forecolor backcolor | removeformat | help',
                            branding: false,
                        }}
                    />

                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Typography variant="body1">
                            <strong>Word count:</strong> {content.split(' ').filter(Boolean).length}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Character count:</strong> {content.length}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default TextEditor;
