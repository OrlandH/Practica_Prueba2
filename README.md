npx create-react-app nombre-del-proyecto

npm create vite@latest
npm i react-router-dom
npm i
npm run dev

{todos.map((post: Todo) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.completed}</p>
          </div>
        ))}
