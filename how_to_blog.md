# How to Write and Deploy a Blog Post

This guide will walk you through the process of writing a new blog post and deploying it to your Hugo-based blog.

## Writing a New Blog Post

1. Open your terminal and navigate to your Hugo project directory:
   ```
   cd /Users/hidayat.heydarov/development/hheydaroff.github.io
   ```

2. Create a new blog post using Hugo's built-in command:
   ```
   hugo new posts/YYYY-MM-DD-your-post-title.md
   ```
   Replace YYYY-MM-DD with the current date and "your-post-title" with a slug for your post title.

3. Open the newly created Markdown file in your preferred text editor. You'll find it in the `content/posts/` directory.

4. Edit the front matter at the top of the file. Ensure the `draft` status is set to `false` when you're ready to publish:
   ```yaml
   ---
   author: "Hido"
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   tags: ["tag1", "tag2"]
   draft: false
   ---
   ```

5. Write your blog post content in Markdown format below the front matter.

## Previewing Your Post Locally

1. Run the Hugo server to preview your site:
   ```
   hugo server -D
   ```

2. Open a web browser and go to `http://localhost:1313` to see your site.

3. Make any necessary edits to your post and refresh the browser to see the changes.

## Deploying Your Blog Post

1. Stop the Hugo server (press Ctrl+C in the terminal).

2. Build your site:
   ```
   hugo
   ```

3. Commit your changes to Git:
   ```
   git add .
   git commit -m "Add new blog post: Your Post Title"
   ```

4. Push your changes to GitHub:
   ```
   git push origin main
   ```

5. Your blog will be automatically deployed if you have set up GitHub Actions for deployment. If not, you may need to manually trigger a deployment or follow your hosting provider's instructions.

## Tips for Writing Blog Posts

- Use headings (##, ###) to structure your content.
- Include images with the following syntax:
  ```markdown
  ![Alt text](/path/to/image.jpg)
  ```
- Use code blocks for any code snippets:
  ```markdown
  ```language
  your code here
  ```
  ```
- Link to other posts or external resources:
  ```markdown
  [Link text](URL)
  ```

Remember to proofread your post and ensure all links and images are working before publishing.
