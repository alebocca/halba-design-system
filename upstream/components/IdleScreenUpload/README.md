IdleScreenUpload lets the merchant choose the image or video that the terminals show when idle.

It works at two levels. With `scope="workspace"` it is the default for all terminals. With `scope="store"` it replaces the workspace screen for one store; `usesWorkspace` tells whether the store has its own file, and `onUseWorkspace` goes back to the workspace screen.

It contains the framed preview with a "Show safe areas" toggle, the file requirements, the file in use (name, type, size, pixels, duration), validation errors, and the distribution status ("Downloaded by 3 of 4 terminals" with a progress bar and a failed count).

- The page validates the file and passes messages in `errors`; the component only shows them. Write each message so it says what is wrong and what is needed: "The video lasts 42 s. The maximum is 30 s."
- Requirements: portrait 9:16; image JPG, PNG or WebP up to 5 MB; video MP4 H.264 without audio, up to 30 s and 30 MB, looping without a cut; best at 1080 × 1920 px.
- Without a file the preview shows the default halba screen.
