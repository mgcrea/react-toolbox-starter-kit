React component example:

```jsx
<Link to="/about" icon='inbox' label="Inbox" />
```

```
<Link to="/topics" icon='person' active label="Profile" />
```

You can disable an editor by passing a `noeditor` modifier:

```jsx noeditor
<Link>Push Me</Link>
```

To render an example as highlighted source code add a `static` modifier:

```jsx static
import React from 'react';
```

Examples with all other languages are rendered only as highlighted source code, not an actual component:

```html
<Link size="large">Push Me</Link>
```

Any [Markdown](http://daringfireball.net/projects/markdown/) is **allowed** _here_.
