# Notion-like Editor Implementation

This project now includes a rich text editor similar to Notion with the following features:

## Features

### Rich Text Formatting
- **Bold**, *Italic*, <u>Underline</u>, and ==Highlight== text
- Multiple heading levels (H1, H2, H3)
- Text alignment (left, center, right)

### Content Blocks
- Bullet lists and numbered lists
- Task lists with checkboxes
- Blockquotes
- Code blocks with syntax highlighting
- Tables with resizable columns

### Media Support
- Image upload and embedding
- Drag and drop image support
- Automatic image optimization

### Advanced Features
- Link insertion and editing
- Syntax highlighting for code blocks (JavaScript, TypeScript, Python, etc.)
- Real-time preview
- Auto-save drafts
- SEO-friendly slug generation

## Technical Implementation

### Editor: TipTap
- Built on ProseMirror
- Extensible architecture
- React integration
- TypeScript support

### File Storage
- Images uploaded to `/public/uploads/`
- Unique filename generation
- File type validation (JPEG, PNG, GIF, WebP)
- 5MB file size limit

### Database Schema
```prisma
model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   // Rich HTML content
  contentType String   @default("html") // "html" or "markdown"
  excerpt     String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### API Endpoints

#### POST /api/posts
Create a new blog post with rich content:
```json
{
  "title": "Post Title",
  "slug": "post-slug",
  "content": "<p>Rich HTML content</p>",
  "contentType": "html",
  "published": true
}
```

#### POST /api/upload
Upload images for blog posts:
- Accepts FormData with 'file' field
- Returns JSON with 'url' field pointing to uploaded image
- Validates file type and size

## Usage

### Creating Posts
1. Navigate to `/write`
2. Enter title (slug auto-generates)
3. Use the toolbar for rich formatting:
   - **B** for bold, *I* for italic, etc.
   - Click image icon to upload photos
   - Use link icon to add hyperlinks
   - Insert tables, lists, code blocks
4. Save as draft or publish immediately

### Toolbar Features
- **Formatting**: Bold, Italic, Underline, Highlight
- **Headings**: H1, H2, H3
- **Lists**: Bullet, Numbered, Tasks
- **Blocks**: Quote, Code, Table
- **Media**: Images, Links
- **Alignment**: Left, Center, Right

### Keyboard Shortcuts
- `Ctrl/Cmd + B`: Bold
- `Ctrl/Cmd + I`: Italic
- `Ctrl/Cmd + U`: Underline
- `Ctrl/Cmd + K`: Add link
- `Ctrl/Cmd + Shift + H`: Highlight
- `Ctrl/Cmd + Alt + 1/2/3`: Headings
- Type `/` for slash commands (coming soon)

## Migration from Markdown

The system supports both HTML (new) and Markdown (legacy) content:
- New posts use `contentType: "html"`
- Old posts remain as `contentType: "markdown"`
- Display pages automatically detect and render accordingly

## Security Considerations

### File Uploads
- Type validation (images only)
- Size limits (5MB max)
- Unique filenames to prevent conflicts
- Stored in public directory for direct access

### Content Sanitization
- TipTap automatically sanitizes HTML output
- No script tags or dangerous attributes allowed
- Safe for displaying user-generated content

## Deployment Notes

1. Ensure `/public/uploads/` directory exists and is writable
2. Configure environment variables in `.env.local`
3. Run database migrations: `npx prisma migrate dev`
4. For production, consider:
   - CDN for image storage (AWS S3, Cloudinary)
   - Image optimization service
   - Content delivery optimization

## Future Enhancements

- [ ] Slash commands for quick block insertion
- [ ] Collaborative editing
- [ ] More file types (videos, documents)
- [ ] Advanced table features
- [ ] Custom blocks and widgets
- [ ] Export to PDF/Word
- [ ] Comment system
- [ ] Version history
